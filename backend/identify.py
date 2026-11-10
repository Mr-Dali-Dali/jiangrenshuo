# -*- coding: utf-8 -*-
"""拍照 / 录音识别：把一个文件交给多模态模型，判断它属于 15 项非遗中的哪一项。

零第三方依赖（标准库 urllib），与 llm_client 共用 OpenAI 兼容的 /chat/completions 协议。

配置（backend/.env 或进程环境变量）：
  IDENTIFY_PROVIDER   llm | mock，默认 llm。mock 返回固定结果，用于没有 Key 时联调前端链路
  IDENTIFY_BASE_URL   / IDENTIFY_API_KEY / IDENTIFY_MODEL   视觉理解模型；缺省回落到 LLM_*
  AUDIO_PROVIDER      audio_llm | asr | mock，默认沿用 IDENTIFY_PROVIDER
  AUDIO_BASE_URL      / AUDIO_API_KEY / AUDIO_MODEL          音频理解模型；缺省回落到 IDENTIFY_*
  ASR_BASE_URL        / ASR_API_KEY / ASR_MODEL              音频转写模型（AUDIO_PROVIDER=asr 时使用）

对外只暴露两个函数：
  identify_image(image_base64, mime) -> dict
  identify_audio(audio_base64, mime) -> dict
返回结构见 _normalize()，字段固定：craft_key / craft_title / certain / confidence / reason / candidates / error
"""
import base64
import json
import os
import re
import uuid
import urllib.error
import urllib.request

import config

# ---------------------------------------------------------------- 15 项的视觉线索
# 只列公认、能靠照片看出来的特征，用于给模型划边界，避免它把相近工艺混为一谈。
CRAFT_SPECS = [
    {"key": "脱胎漆器", "title": "福州脱胎漆器髹饰技艺",
     "cues": "黑推光或朱红漆面、镜面反光；薄胎瓶盘盒；描金、晕金、嵌螺钿、彩绘纹样"},
    {"key": "扎染", "title": "白族扎染技艺",
     "cues": "白棉布上的蓝白花纹，靛蓝层次有晕散；小簇花、蝴蝶、放射几何纹；多为布匹围巾桌布服饰"},
    {"key": "竹编", "title": "东阳竹编",
     "cues": "竹篾经纬交织，可见编织结构；篮筐箱盘、动物或器物造型；竹黄本色或染色竹丝"},
    {"key": "景德镇制瓷", "title": "景德镇手工制瓷技艺",
     "cues": "白瓷胎的碗盘瓶罐；青花蓝白、粉彩、玲珑、颜色釉；可能出现拉坯利坯等制瓷工序"},
    {"key": "宜兴紫砂陶", "title": "宜兴紫砂陶制作技艺",
     "cues": "紫泥朱泥段泥的紫褐砖红米黄，无釉亚光；茶壶茶杯花盆；刻绘、竹节树桩等造型"},
    {"key": "蔚县剪纸", "title": "蔚县剪纸",
     "cues": "纸质剪纸，刀刻后点染，色彩浓烈（品红绿黄蓝）；戏曲人物、花卉、脸谱；不是单色剪影"},
    {"key": "杨柳青木版年画", "title": "杨柳青木版年画",
     "cues": "木版套印再手工彩绘的年画；门神、抱鱼胖娃娃、仕女、戏出；颜色鲜亮线条匀整"},
    {"key": "成都糖画", "title": "糖塑（成都糖画）",
     "cues": "糖浆拉出的平面造型，琥珀金黄、半透明有光泽；龙凤蝴蝶生肖；常插在竹签上"},
    {"key": "南京云锦", "title": "南京云锦木机妆花手工织造技艺",
     "cues": "金线彩绒织锦，妆花工艺；龙纹云纹缠枝莲满地；金碧辉煌、织金闪光；袍料匹料团龙"},
    {"key": "景泰蓝", "title": "景泰蓝制作技艺",
     "cues": "铜胎掐丝珐琅，蓝地为主、掐丝勾边填彩釉、口沿鎏金；瓶尊碗盘；缠枝莲牡丹纹"},
    {"key": "皮影戏", "title": "皮影戏（唐山皮影戏）",
     "cues": "兽皮雕刻的影人，侧脸造型、关节可动、带签子；透光时呈半透明彩色；常在白幕上演出"},
    {"key": "京剧", "title": "京剧",
     "cues": "戏曲扮相：净角脸谱、头面雉鸡翎、蟒袍水袖；舞台剧照或戏装人物"},
    {"key": "古琴艺术", "title": "古琴艺术",
     "cues": "七弦横置长琴，扁平木质琴身（黑漆或原木），面板有白色徽位点"},
    {"key": "中医针灸", "title": "中医针灸",
     "cues": "细长金属针刺入体表；或经络穴位人体模型、艾条、火罐等针灸器具"},
    {"key": "二十四节气", "title": "二十四节气",
     "cues": "节气主题的画面：物候景致、节气插画海报、农事场景、节气与器物组合，本身不是单一器物"},
]

MAX_IMAGE_BYTES = 8 * 1024 * 1024
MAX_AUDIO_BYTES = 20 * 1024 * 1024
IMAGE_MIMES = {"image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"}
AUDIO_MIMES = {"audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/m4a", "audio/mp4",
               "audio/aac", "audio/ogg", "audio/webm", "audio/flac"}

# 声音入口只覆盖这三项：有唱腔、念白、锣鼓、丝弦这类可辨识的听觉特征。
# 其余 12 项（漆器、剪纸、竹编、制瓷……）的辨识依据在形制与工艺痕迹上，靠声音判不准，
# 一律引导回拍照入口，避免把"讲解里提到了竹编"误判成"这是一件竹编"。
AUDIO_CRAFT_KEYS = ["京剧", "皮影戏", "古琴艺术"]


def _cfg(name, fallback_name=None, default=None):
    value = config.get(name)
    if value:
        return value
    if fallback_name:
        return config.get(fallback_name, default)
    return default


def _spec_lines(specs=None):
    specs = specs or CRAFT_SPECS
    return "\n".join("%d. %s（key=%s）：%s" % (i + 1, s["title"], s["key"], s["cues"])
                     for i, s in enumerate(specs))


IDENTIFY_PROMPT = """你是一位非遗图像鉴定助手。请只根据画面里能直接看到的证据判断它属于下面 15 项中的哪一项。

候选清单（key 是唯一允许输出的标识）：
%s

判断规则：
1. 只输出清单里的 key；看不出、画面与非遗无关、或证据不足时，certain 设为 false 并在 reason 里说明缺什么证据。
2. 不要靠猜测填空。相近工艺要区分开，例如：掐丝珐琅蓝地鎏金 vs 铜胎画珐琅；单色剪影 vs 蔚县彩色点染剪纸；紫砂无釉亚光 vs 上釉陶器。
3. reason 用一句中文说明"看到什么特征所以判为这一项"，不超过 40 字，只讲画面证据。
4. candidates 给出另外 1-2 个接近但不选中的 key，没有就给空数组。
5. 严格只输出一个 JSON 对象，不要解释、不要 Markdown 代码块。

输出格式：
{"craft_key":"景泰蓝","certain":true,"confidence":0.86,"reason":"铜胎蓝地掐丝填彩、口沿鎏金、缠枝莲纹","candidates":["景德镇制瓷"]}
不确定时：
{"craft_key":null,"certain":false,"confidence":0.2,"reason":"画面只是室内摆设，看不到工艺特征","candidates":[]}""" % _spec_lines()

AUDIO_SPECS = [s for s in CRAFT_SPECS if s["key"] in AUDIO_CRAFT_KEYS]

AUDIO_PROMPT = """你是一位非遗声音鉴定助手。请根据音频内容判断它属于下面 3 项声音类非遗中的哪一项。

候选清单（key 是唯一允许输出的标识）：
%s

判断规则：
1. 只听可辨识的听觉线索：唱腔、念白、锣鼓、丝弦、说唱韵白、方言与行当。不要因为人声讲解里"提到了"某项手艺就判定它——讲解内容不是判据。
2. 只输出清单里的 key。音频里没有戏曲、曲艺、乐器的声音特征（例如只是环境噪声、说话、工具敲击）时，certain=false，并在 reason 里说明这是声音线索不足。
3. reason 用一句中文说明"听到什么线索所以判为这一项"，不超过 40 字。
4. candidates 给出另外 1 个接近但不选中的 key，没有就给空数组。
5. 严格只输出一个 JSON 对象，不要解释、不要 Markdown 代码块。

输出格式：{"craft_key":"京剧","certain":true,"confidence":0.8,"reason":"西皮唱腔加京胡锣鼓点","candidates":["皮影戏"]}
线索不足时：{"craft_key":null,"certain":false,"confidence":0.1,"reason":"只有室内环境声，没有唱腔或丝弦线索","candidates":[]}""" % _spec_lines(AUDIO_SPECS)


def _title_of(key):
    for s in CRAFT_SPECS:
        if s["key"] == key:
            return s["title"]
    return ""


def _parse_json(text):
    if not text:
        raise ValueError("模型没有返回内容")
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"```\s*$", "", text).strip()
    start, end = text.find("{"), text.rfind("}")
    if start >= 0 and end > start:
        text = text[start:end + 1]
    return json.loads(text)


def _normalize(raw, kind, mock=False):
    key = raw.get("craft_key")
    allowed = AUDIO_CRAFT_KEYS if kind == "audio" else [s["key"] for s in CRAFT_SPECS]
    out_of_scope = None
    if key not in allowed:
        # 音频入口里模型报了工艺类项目：不当成识别结果，改写为"该用拍照"的提示
        if kind == "audio" and key in [s["key"] for s in CRAFT_SPECS]:
            out_of_scope = key
        key = None
    certain = bool(raw.get("certain")) and key is not None
    try:
        confidence = float(raw.get("confidence") or 0)
    except (TypeError, ValueError):
        confidence = 0.0
    confidence = max(0.0, min(1.0, confidence))
    candidates = [c for c in (raw.get("candidates") or []) if c in allowed]
    reason = str(raw.get("reason") or "")[:80]
    if out_of_scope:
        reason = "声音线索指向「%s」，它没有可辨识的听觉特征，请改用拍照识别" % _title_of(out_of_scope)
    return {
        "kind": kind,
        "craft_key": key,
        "craft_title": _title_of(key) if key else "",
        "certain": certain,
        "confidence": confidence,
        "reason": reason,
        "candidates": candidates[:2],
        "out_of_scope": out_of_scope,
        "mock": mock,
        "error": None,
    }


def _mock_result(kind):
    if kind == "audio":
        key = config.get("MOCK_AUDIO_CRAFT_KEY", "京剧")
    else:
        key = config.get("MOCK_CRAFT_KEY", "景泰蓝")
    return _normalize({"craft_key": key, "certain": True, "confidence": 0.9,
                       "reason": "mock 模式的固定结果，仅用于验证前端链路，不代表真实识别", "candidates": []},
                      kind, mock=True)


def _post_json(url, payload, api_key, timeout=60):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + api_key},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "ignore")[:400]
        raise RuntimeError("模型 HTTP %s: %s" % (e.code, body)) from e
    except Exception as e:
        raise RuntimeError("模型调用失败: %s" % e) from e


# 通义千问 3.5/3.6/3.7/3.8 与 Qwen3-VL/Omni 默认开启思考模式：不显式关闭会返回
# reasoning_content、拖长响应，还可能把 JSON 混进思考文本里。命中这些模型时自动关掉。
_THINKING_MODELS = ("qwen3.5", "qwen3.6", "qwen3.7", "qwen3.8", "qwen3-vl", "qwen3-omni", "qwen3.5-omni")


def _chat_content(content, base_url, api_key, model, timeout=60):
    url = base_url.rstrip("/") + "/chat/completions"
    payload = {"model": model, "messages": [{"role": "user", "content": content}],
               "temperature": 0, "max_tokens": 500, "stream": False}
    name = (model or "").lower()
    if any(tag in name for tag in _THINKING_MODELS) and config.get("IDENTIFY_ENABLE_THINKING", "0") != "1":
        payload["enable_thinking"] = False
    data = _post_json(url, payload, api_key, timeout)
    try:
        message = data["choices"][0]["message"]
        text = message.get("content") or ""
        if isinstance(text, list):
            text = "".join(part.get("text", "") for part in text if isinstance(part, dict))
        # 少数模型只把结果写进 reasoning_content，content 为空时兜底取用
        if not text.strip():
            text = message.get("reasoning_content") or ""
        return text
    except (KeyError, IndexError, TypeError) as e:
        raise RuntimeError("模型返回结构异常: %s" % json.dumps(data, ensure_ascii=False)[:300]) from e


def _audio_ext(mime):
    mapping = {"audio/mpeg": "mp3", "audio/mp3": "mp3", "audio/wav": "wav", "audio/x-wav": "wav",
               "audio/m4a": "m4a", "audio/mp4": "m4a", "audio/aac": "aac", "audio/ogg": "ogg",
               "audio/webm": "webm", "audio/flac": "flac"}
    return mapping.get((mime or "").lower(), "mp3")


def _transcribe(audio_bytes, mime):
    """AUDIO_PROVIDER=asr 时：先转写，再把文本交给大模型分类。手工构造 multipart，避免引入额外依赖。"""
    base_url = _cfg("ASR_BASE_URL", "IDENTIFY_BASE_URL", config.get("LLM_BASE_URL"))
    api_key = _cfg("ASR_API_KEY", "IDENTIFY_API_KEY", config.get("LLM_API_KEY"))
    model = _cfg("ASR_MODEL", None, "whisper-1")
    if not (base_url and api_key):
        raise RuntimeError("缺少 ASR 配置：请设置 ASR_BASE_URL / ASR_API_KEY")
    boundary = "----jiangrenshuo" + uuid.uuid4().hex
    parts = []

    def field(name, value):
        parts.append(("--%s\r\nContent-Disposition: form-data; name=\"%s\"\r\n\r\n%s\r\n"
                      % (boundary, name, value)).encode("utf-8"))

    field("model", model)
    parts.append(("--%s\r\nContent-Disposition: form-data; name=\"file\"; filename=\"audio.%s\"\r\n"
                  "Content-Type: %s\r\n\r\n" % (boundary, _audio_ext(mime), mime or "audio/mpeg")).encode("utf-8"))
    parts.append(audio_bytes)
    parts.append(("\r\n--%s--\r\n" % boundary).encode("utf-8"))
    body = b"".join(parts)
    req = urllib.request.Request(
        base_url.rstrip("/") + "/audio/transcriptions",
        data=body,
        headers={"Content-Type": "multipart/form-data; boundary=" + boundary,
                 "Authorization": "Bearer " + api_key},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return (data.get("text") or "").strip()
    except urllib.error.HTTPError as e:
        raise RuntimeError("转写 HTTP %s: %s" % (e.code, e.read().decode("utf-8", "ignore")[:300])) from e
    except Exception as e:
        raise RuntimeError("转写失败: %s" % e) from e


def identify_image(image_base64, mime):
    if not image_base64:
        return {"error": "没有收到图片数据"}
    mime = (mime or "image/jpeg").lower()
    if mime not in IMAGE_MIMES:
        return {"error": "不支持的图片格式：%s" % mime}
    try:
        raw_bytes = base64.b64decode(image_base64, validate=False)
    except Exception:
        return {"error": "图片数据不是合法的 base64"}
    if len(raw_bytes) > MAX_IMAGE_BYTES:
        return {"error": "图片超过 8MB，请压缩后再试"}

    if _cfg("IDENTIFY_PROVIDER", None, "llm").lower() == "mock":
        return _mock_result("image")

    base_url = _cfg("IDENTIFY_BASE_URL", "LLM_BASE_URL")
    api_key = _cfg("IDENTIFY_API_KEY", "LLM_API_KEY")
    model = _cfg("IDENTIFY_MODEL", "LLM_MODEL")
    if not (base_url and api_key and model):
        return {"error": "识别服务未配置：请在前端设置 API 地址后，于 backend/.env 填写 IDENTIFY_BASE_URL / IDENTIFY_API_KEY / IDENTIFY_MODEL"}
    if not api_key.isascii():
        return {"error": "IDENTIFY_API_KEY 里填的还不是真实 Key（含中文字符），请到百炼控制台复制 API-KEY 后粘贴"}
    try:
        text = _chat_content([
            {"type": "text", "text": IDENTIFY_PROMPT},
            {"type": "image_url", "image_url": {"url": "data:%s;base64,%s" % (mime, image_base64)}},
        ], base_url, api_key, model)
        return _normalize(_parse_json(text), "image")
    except Exception as e:
        return {"error": str(e)}


def identify_audio(audio_base64, mime):
    if not audio_base64:
        return {"error": "没有收到音频数据"}
    mime = (mime or "audio/mpeg").lower()
    if mime not in AUDIO_MIMES:
        return {"error": "不支持的音频格式：%s" % mime}
    try:
        raw_bytes = base64.b64decode(audio_base64, validate=False)
    except Exception:
        return {"error": "音频数据不是合法的 base64"}
    if len(raw_bytes) > MAX_AUDIO_BYTES:
        return {"error": "音频超过 20MB，请截短后再试"}

    provider = (_cfg("AUDIO_PROVIDER", "IDENTIFY_PROVIDER", "llm")).lower()
    if provider == "mock":
        return _mock_result("audio")

    try:
        if provider == "asr":
            transcript = _transcribe(raw_bytes, mime)
            if not transcript:
                return {"error": "没有转写出文字，换一段更清楚的音频试试"}
            base_url = _cfg("IDENTIFY_BASE_URL", "LLM_BASE_URL")
            api_key = _cfg("IDENTIFY_API_KEY", "LLM_API_KEY")
            model = _cfg("IDENTIFY_MODEL", "LLM_MODEL")
            text = _chat_content([
                {"type": "text", "text": AUDIO_PROMPT},
                {"type": "text", "text": "转写内容：%s" % transcript[:1500]},
            ], base_url, api_key, model)
            out = _normalize(_parse_json(text), "audio")
            out["transcript"] = transcript[:300]
            return out

        base_url = _cfg("AUDIO_BASE_URL", "IDENTIFY_BASE_URL", config.get("LLM_BASE_URL"))
        api_key = _cfg("AUDIO_API_KEY", "IDENTIFY_API_KEY", config.get("LLM_API_KEY"))
        model = _cfg("AUDIO_MODEL", "IDENTIFY_MODEL", config.get("LLM_MODEL"))
        if not (base_url and api_key and model):
            return {"error": "音频识别未配置：请在 backend/.env 填写 AUDIO_BASE_URL / AUDIO_API_KEY / AUDIO_MODEL"}
        if not api_key.isascii():
            return {"error": "AUDIO_API_KEY 里填的还不是真实 Key（含中文字符），请到百炼控制台复制 API-KEY 后粘贴"}
        ext = _audio_ext(mime)
        # 豆包 / 通义等兼容 OpenAI 音频输入格式；不支持该字段的厂商请改用 AUDIO_PROVIDER=asr
        # 百炼的 input_audio.data 按 URL/data-URI 解析（纯 base64 会报 invalid URL），omni 系列自动加前缀；
        # 其他厂商要加前缀时设 AUDIO_DATA_URI=1
        audio_data = audio_base64
        if config.get("AUDIO_DATA_URI", "0") == "1" or "omni" in (model or "").lower():
            audio_data = "data:audio/%s;base64,%s" % (ext, audio_base64)
        text = _chat_content([
            {"type": "text", "text": AUDIO_PROMPT},
            {"type": "input_audio", "input_audio": {"data": audio_data, "format": ext}},
        ], base_url, api_key, model, timeout=90)
        return _normalize(_parse_json(text), "audio")
    except Exception as e:
        return {"error": str(e)}

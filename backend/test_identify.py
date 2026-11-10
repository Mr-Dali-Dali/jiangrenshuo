# -*- coding: utf-8 -*-
"""识别接口的端到端自测（标准库实现，不依赖 requests）。

用法：
  1. 另开一个终端启动服务： cd backend && python -m uvicorn app:app --port 8000
  2. 运行本脚本：        python test_identify.py
  可用环境变量 IDENTIFY_URL 指定地址，默认 http://127.0.0.1:8000

覆盖：健康检查、照片识别、录音识别（限声音类白名单）、空数据、非法格式。
"""
import base64
import io
import json
import os
import struct
import sys
import urllib.error
import urllib.request
import wave

BASE = os.environ.get("IDENTIFY_URL", "http://127.0.0.1:8000").rstrip("/")
HERE = os.path.dirname(os.path.abspath(__file__))
# 与 identify.py 的 AUDIO_CRAFT_KEYS 保持一致
AUDIO_SCOPE = {"京剧", "皮影戏", "古琴艺术"}
PROJECT = os.path.dirname(HERE)
IMG = os.path.join(PROJECT, "assets", "topics", "jingtailan.jpg")


def post(path, payload):
    req = urllib.request.Request(
        BASE + path,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8", "ignore") or "{}")


def get(path):
    with urllib.request.urlopen(BASE + path, timeout=10) as resp:
        return json.loads(resp.read().decode("utf-8"))


def make_wav():
    """生成 1 秒 440Hz 正弦波（8kHz 单声道 16bit），用于音频接口连通性测试。"""
    buf = io.BytesIO()
    rate = 8000
    with wave.open(buf, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        frames = b"".join(struct.pack("<h", int(6000 * __import__("math").sin(2 * 3.14159 * 440 * i / rate)))
                          for i in range(rate))
        w.writeframes(frames)
    return buf.getvalue()


def main():
    checks = []

    try:
        health = get("/")
        checks.append(("健康检查", True, "provider=%s ready=%s chunks=%s"
                       % (health.get("identify_provider"), health.get("identify_ready"), health.get("chunks"))))
    except Exception as e:
        print("服务未启动或不可达：%s" % e)
        return 1

    if not os.path.exists(IMG):
        print("缺少测试图片：%s" % IMG)
        return 1
    image_b64 = base64.b64encode(open(IMG, "rb").read()).decode("ascii")

    status, body = post("/api/identify", {"image_base64": image_b64, "mime": "image/jpeg"})
    # 真模型下这张图应直接命中景泰蓝；若判成证据不足，只要给了候选也算服务正常
    ok = status == 200 and not body.get("error") and (body.get("craft_key") or body.get("candidates"))
    checks.append(("照片识别", ok, json.dumps(body, ensure_ascii=False)[:220]))

    status, body = post("/api/identify", {"image_base64": "", "mime": "image/jpeg"})
    # 空字符串会被 Pydantic 拦成 422，属于同样正确的拒绝行为
    ok = (status == 200 and bool(body.get("error"))) or status == 422
    checks.append(("空图片被拒", ok, "HTTP %s %s" % (status, str(body.get("error") or body.get("detail"))[:100])))

    status, body = post("/api/identify", {"image_base64": image_b64, "mime": "application/zip"})
    ok = status == 200 and bool(body.get("error"))
    checks.append(("非法格式被拒", ok, str(body.get("error"))[:120]))

    audio_b64 = base64.b64encode(make_wav()).decode("ascii")
    status, body = post("/api/identify-audio", {"audio_base64": audio_b64, "mime": "audio/wav"})
    # 声音入口只允许落在京剧、皮影戏、古琴艺术三项；工艺类必须被拦回。
    # 这段正弦波里没有任何唱腔，真模型返回 craft_key=null 是正确行为，不算失败；
    # 但只要返回了白名单之外的 key，就说明硬约束被击穿了。
    key = body.get("craft_key")
    ok = status == 200 and not body.get("error") and (key is None or key in AUDIO_SCOPE)
    checks.append(("录音识别（限声音类）", ok, json.dumps(body, ensure_ascii=False)[:220]))

    status, body = post("/api/identify-audio", {"audio_base64": audio_b64, "mime": "video/mp4"})
    ok = status == 200 and bool(body.get("error"))
    checks.append(("非法音频格式被拒", ok, str(body.get("error"))[:120]))

    print("\n识别接口自测 @ %s" % BASE)
    print("-" * 78)
    for name, ok, detail in checks:
        print("%s  %-16s %s" % ("PASS" if ok else "FAIL", name, detail))
    print("-" * 78)
    passed = sum(1 for c in checks if c[1])
    print("通过 %d/%d" % (passed, len(checks)))
    return 0 if passed == len(checks) else 1


if __name__ == "__main__":
    sys.exit(main())

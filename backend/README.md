# 匠人说 · 非遗问答后端（RAG）

让大模型"根据知识库内容作答"的最小可运行实现，零第三方依赖核心（纯标准库）。

## 算法流程

```
用户问题
  │
  ▼
[1] 检索 Retriever.search()
      字符 bigram 切词 → BM25 打分 + 元数据加权（项目名/门类/产地/段落名）
      从 614 个知识块中取 top-k（默认 8）
  │
  ▼
[2] Prompt 组装 build_messages()
      每个知识块编号 [n]，附类型/段落/项目名/来源注入 system+user 消息
  │
  ▼
[3] LLM 生成 llm_client.chat()
      OpenAI 兼容 /chat/completions（火山方舟 / DeepSeek / 通义任选）
  │
  ▼
[4] 引用溯源 _extract_sources()
      解析回答中的 [n] → 映射回知识块来源 URL，随答案返回
  │
  ▼
{answer, sources, retrieved}
```

## 目录结构

| 文件 | 职责 |
|---|---|
| `retriever.py` | 检索层：BM25（字符 bigram）+ 元数据加权，加载 `heritage-chunks-v1.json` |
| `prompt.py` | Prompt 模板：角色约束（只依知识库、不编造、编号引用、事实照原文） |
| `llm_client.py` | OpenAI 兼容大模型调用（urllib 实现，Key 只从 .env/环境变量读取） |
| `rag.py` | 主管线：检索 → Prompt → LLM → 引用溯源，输出 `{answer, sources}` |
| `demo.py` | 本地演示脚本（无需装任何依赖） |
| `app.py` | FastAPI 服务：`POST /api/chat` |
| `.env.example` | 大模型配置模板（复制为 `.env` 填写） |

## 快速体验（不装任何依赖）

```powershell
cd "D:\徐智逸的个人文件\创意新媒体开发\功能界面设计\backend"
python demo.py --no-llm "漆扇的历史"      # 看检索 top-k 与即将发给大模型的 Prompt
python demo.py --no-llm --top-k 5 "扎染怎么做"
```

## 完整问答（配置大模型）

1. 复制 `.env.example` 为 `.env`，填入厂商配置（任选其一）：
   - 火山方舟（豆包）：`LLM_BASE_URL=https://ark.cn-beijing.volces.com/api/v3`，`LLM_MODEL=ep-xxx`
   - DeepSeek：`LLM_BASE_URL=https://api.deepseek.com/v1`，`LLM_MODEL=deepseek-chat`
   - 通义：`LLM_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1`，`LLM_MODEL=qwen-plus`
2. 运行：`python demo.py "漆扇的历史"`（或任意问题）

## 启动 HTTP 服务（接前端）

```powershell
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
# 测试：POST http://localhost:8000/api/chat
# body: {"question": "漆扇的历史"}
```

## 识别接口（拍照 / 录音）

`identify.py` 把一张图片或一段音频交给多模态模型，判断它属于 15 项非遗中的哪一项，返回 `craft_key`、`certain`、`confidence`、`reason`、`candidates`。前端据此渲染结果页或候选列表。

| 接口 | 请求体 | 说明 |
|---|---|---|
| `POST /api/identify` | `{"image_base64":"...","mime":"image/jpeg"}` | 图片 ≤ 8MB，支持 jpeg/png/webp/heic |
| `POST /api/identify-audio` | `{"audio_base64":"...","mime":"audio/wav"}` | 音频 ≤ 20MB，支持 mp3/wav/m4a/aac/ogg/webm/flac |
| `GET /` | — | 返回 `identify_provider` 与 `identify_ready` |

配置（`.env`，模板见 `.env.example`）：

```
IDENTIFY_PROVIDER=llm            # llm 真识别；mock 返回固定结果，用于没 Key 时联调
IDENTIFY_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
IDENTIFY_API_KEY=...
IDENTIFY_MODEL=...               # 视觉模型 / 推理接入点
```

音频有两条路径：

- `AUDIO_PROVIDER=asr`：先调 whisper 兼容的 `/audio/transcriptions` 转写，再把文本交给文本模型分类，兼容性最好。
- `AUDIO_PROVIDER=audio_llm`：音频直接进模型的 `input_audio` 字段，一步判断，需要厂商支持音频输入。

**范围限制**：音频入口只判 `AUDIO_CRAFT_KEYS` 里的三项（京剧、皮影戏、古琴艺术），其余 12 项的声音线索不足以辨认，模型报回来也会被丢弃，返回 `craft_key=null` + `out_of_scope=<项目key>` + 一句「请改用拍照识别」。这种情况 `certain` 一定是 `false`，前端据此弹引导而不是展示结果。

自测（另开一个终端先启动服务，默认连 `http://127.0.0.1:8000`）：

```powershell
python test_identify.py
# 覆盖：健康检查 / 照片识别 / 录音识别（校验返回值落在声音类白名单）/ 空数据 / 非法格式
```

浏览器 `MediaRecorder` 产出 `audio/webm`，部分厂商不收该格式；生产环境可在服务端加一步 ffmpeg 转码（`-ar 16000 -ac 1`）。

## 检索策略说明（MVP 阶段）

- **切词**：中文不引入 jieba，用字符 bigram（去停用虚词/标点）。"漆扇的历史" → `漆扇`、`历史`。
- **打分**：BM25（k1=1.2, b=0.75）+ 元数据加权（查询词与项目名/门类/产地重叠 + 0.8/词，命中断落名 + 1.0）。
- **知识块**：来自 `heritage-chunks-v1.json`（614 块：概览 15 / 百科段 75 / 问答 343 / 跟学 15 / 作品 88 / 传承人 78），每块带门类、产地、来源 URL。
- 614 块体量小，全量打分毫秒级；后续可替换为向量检索（嵌入 + 余弦相似度）提升语义召回。

## 已知边界（如实说明）

- M1 为单轮问答；`session_id` 已预留，多轮上下文记忆在 M2 实现。
- 大模型未配置或调用失败时，`/api/chat` 返回 `error` 字段与 `retrieved` 候选块，前端可降级展示"候选内容"而非编造回答。
- 回答中未被大模型引用但确实命中的块不会出现在 sources 中（只返回引用过的）。

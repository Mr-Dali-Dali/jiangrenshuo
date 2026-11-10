# -*- coding: utf-8 -*-
"""FastAPI 服务入口：问答 + 拍照/录音识别

运行方式（需先安装依赖）：
  cd backend
  pip install -r requirements.txt
  uvicorn app:app --host 0.0.0.0 --port 8000

接口：
  POST /api/chat
  请求体 {"question": "漆扇的历史", "session_id": "可选"}
  响应   {"answer": "...", "sources": [...], "session_id": "...", "error": null}

  POST /api/identify          拍照识别（15 项中判一项）
  请求体 {"image_base64": "...", "mime": "image/jpeg"}
  响应   {"craft_key": "景泰蓝", "craft_title": "...", "certain": true, "confidence": 0.86,
          "reason": "...", "candidates": [], "error": null}

  POST /api/identify-audio    录音识别
  请求体 {"audio_base64": "...", "mime": "audio/mpeg"}
  响应结构同上，另可带 transcript

  GET  /                      健康检查：返回问答语料规模与识别模式（真模型 / mock）
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402
from pydantic import BaseModel, Field  # noqa: E402

import config  # noqa: E402
import identify as identify_mod  # noqa: E402
from rag import RAGAnswerer  # noqa: E402

app = FastAPI(title="匠人说 · 非遗问答后端", version="0.1.0")

# CORS：允许前端页面（本地 file:// 或 GitHub Pages 域名）跨域调用
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_answerer = None


def get_answerer():
    global _answerer
    if _answerer is None:
        _answerer = RAGAnswerer()
    return _answerer


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=200, description="用户问题")
    session_id: str | None = Field(None, description="会话 ID（M2 多轮记忆用，M1 可省略）")


class SourceItem(BaseModel):
    chunk_id: str
    craft_name: str
    type: str
    section: str | None = None
    url: str | None = None


class ChatResponse(BaseModel):
    answer: str = ""
    sources: list[SourceItem] = []
    session_id: str | None = None
    error: str | None = None


class IdentifyRequest(BaseModel):
    image_base64: str = Field(..., min_length=1, description="图片的 base64（不含 data: 前缀）")
    mime: str | None = Field(None, description="如 image/jpeg，缺省按 jpeg 处理")


class AudioRequest(BaseModel):
    audio_base64: str = Field(..., min_length=1, description="音频的 base64（不含 data: 前缀）")
    mime: str | None = Field(None, description="如 audio/mpeg，缺省按 mp3 处理")


@app.get("/")
def root():
    answerer = get_answerer()
    vision_ready = bool(
        (config.get("IDENTIFY_PROVIDER", "llm").lower() != "mock")
        and identify_mod._cfg("IDENTIFY_BASE_URL", "LLM_BASE_URL")
        and identify_mod._cfg("IDENTIFY_API_KEY", "LLM_API_KEY")
        and identify_mod._cfg("IDENTIFY_MODEL", "LLM_MODEL")
    )
    return {
        "service": "jiangrenshuo-qa",
        "status": "ok",
        "chunks": len(answerer.retriever.chunks),
        "items": 15,
        "identify_provider": config.get("IDENTIFY_PROVIDER", "llm"),
        "identify_ready": vision_ready,
    }


@app.post("/api/identify")
def identify_image_endpoint(req: IdentifyRequest):
    return identify_mod.identify_image(req.image_base64, req.mime or "image/jpeg")


@app.post("/api/identify-audio")
def identify_audio_endpoint(req: AudioRequest):
    return identify_mod.identify_audio(req.audio_base64, req.mime or "audio/mpeg")


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    out = get_answerer().answer(req.question)
    return ChatResponse(
        answer=out.get("answer") or "",
        sources=[SourceItem(**s) for s in out.get("sources", [])],
        session_id=req.session_id,
        error=out.get("error"),
    )

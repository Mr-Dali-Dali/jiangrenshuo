# -*- coding: utf-8 -*-
"""RAG 主流程（回答算法核心）：

    用户问题
      │
      ▼
  [1] 检索：Retriever.search(question)  →  BM25(bigram) + 元数据加权，取 top-k 知识块
      │
      ▼
  [2] Prompt 组装：build_messages()  →  知识块编号后注入 system/user 消息
      │
      ▼
  [3] LLM 生成：llm_client.chat()  →  大模型依据知识块作答并标注 [n] 引用
      │
      ▼
  [4] 引用溯源：_extract_sources()  →  解析回答中的 [n] → 映射回知识块来源 URL
      │
      ▼
      {answer, sources, retrieved}
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import llm_client  # noqa: E402
from prompt import build_messages  # noqa: E402
from retriever import Retriever  # noqa: E402


class RAGAnswerer:
    def __init__(self, top_k=8):
        self.top_k = top_k
        self.retriever = Retriever()

    def retrieve(self, question, top_k=None):
        """仅检索：返回排序后的知识块（调试/前端预览用）。"""
        return self.retriever.search(question, top_k or self.top_k)

    def answer(self, question, top_k=None, use_llm=True):
        """
        完整问答管线。返回：
        {answer, sources, retrieved, error?}
        - 检索为空：answer 给出兜底提示。
        - use_llm=False：只返回检索结果（无 LLM 时验证检索质量用）。
        - LLM 未配置/失败：answer=None + error 说明 + retrieved 供降级展示。
        """
        results = self.retrieve(question, top_k or self.top_k)
        if not results:
            return {
                "answer": "抱歉，现有知识库中没有找到与「%s」相关的内容。" % question,
                "sources": [],
                "retrieved": [],
            }
        if not use_llm:
            return {"answer": None, "sources": [], "retrieved": results}

        messages = build_messages(question, results)
        try:
            text = llm_client.chat(messages)
        except RuntimeError as e:
            return {"answer": None, "error": str(e), "retrieved": results}

        return {
            "answer": text,
            "sources": self._extract_sources(text, results),
            "retrieved": results,
        }

    def _extract_sources(self, answer, results):
        """解析回答文本中的 [n] 引用编号，映射回知识块来源列表（去重、保持引用顺序）。"""
        cited = set()
        for m in re.finditer(r"\[(\d{1,2})\]", answer):
            n = int(m.group(1))
            if 1 <= n <= len(results):
                cited.add(n)

        sources = []
        for n in sorted(cited):
            r = results[n - 1]
            c = r["chunk"]
            sources.append({
                "chunk_id": c["id"],
                "craft_name": c["craft_name"],
                "type": c["type"],
                "section": c["section"],
                "url": c["sources"][0] if c.get("sources") else None,
            })
        return sources

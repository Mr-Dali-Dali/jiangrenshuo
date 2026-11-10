# -*- coding: utf-8 -*-
"""大模型客户端：调用 OpenAI 兼容的 /chat/completions 接口。

零第三方依赖（标准库 urllib）。三家主流厂商均兼容此格式：
- 火山方舟（豆包）：base_url=https://ark.cn-beijing.volces.com/api/v3，model 填推理接入点 ID（ep-xxx）
- DeepSeek：base_url=https://api.deepseek.com/v1，model=deepseek-chat
- 阿里通义：base_url=https://dashscope.aliyuncs.com/compatible-mode/v1，model=qwen-plus

API Key 只从环境变量 / backend/.env 读取，绝不硬编码进代码。
"""
import json
import os
import urllib.error
import urllib.request

import config


def chat(messages,
         base_url=None,
         api_key=None,
         model=None,
         temperature=None,
         max_tokens=None,
         timeout=90):
    base_url = base_url or config.get("LLM_BASE_URL")
    api_key = api_key or config.get("LLM_API_KEY")
    model = model or config.get("LLM_MODEL")
    temperature = temperature if temperature is not None else float(config.get("LLM_TEMPERATURE", "0.3"))
    max_tokens = max_tokens or int(config.get("LLM_MAX_TOKENS", "1200"))

    if not (base_url and api_key and model):
        raise RuntimeError(
            "缺少大模型配置：请在 backend/.env 或环境变量中设置 LLM_BASE_URL / LLM_API_KEY / LLM_MODEL"
        )

    url = base_url.rstrip("/") + "/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "stream": False,
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + api_key,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data["choices"][0]["message"]["content"]
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "ignore")[:500]
        raise RuntimeError("LLM HTTP %s: %s" % (e.code, body)) from e
    except Exception as e:  # 网络/超时/解析异常统一包装
        raise RuntimeError("LLM 调用失败: %s" % e) from e

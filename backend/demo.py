# -*- coding: utf-8 -*-
"""本地演示脚本（零依赖，无需安装任何包即可运行检索与 Prompt 预览）。

用法：
  python demo.py --no-llm "漆扇的历史"      # 只展示检索结果 + 将发送给大模型的 Prompt
  python demo.py --top-k 5 "扎染怎么做"      # 配置了 .env 后完整问答（未配置则提示）
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from prompt import build_messages  # noqa: E402
from rag import RAGAnswerer  # noqa: E402


def main():
    parser = argparse.ArgumentParser(description="非遗问答 RAG 本地演示")
    parser.add_argument("--no-llm", action="store_true", help="只检索与 Prompt 预览，不调用大模型")
    parser.add_argument("--top-k", type=int, default=8, help="检索返回的候选块数量")
    parser.add_argument("question", nargs="*", help="问题文本（不传则交互输入）")
    args = parser.parse_args()

    question = " ".join(args.question)
    if not question:
        question = input("请输入问题：").strip()
    if not question:
        print("问题不能为空。")
        return

    answerer = RAGAnswerer(top_k=args.top_k)
    results = answerer.retrieve(question)

    print("=" * 64)
    print("问题：%s" % question)
    print("检索 Top-%d：\n" % len(results))
    if not results:
        print("（未检索到相关知识块）")
        return
    for i, r in enumerate(results, 1):
        c = r["chunk"]
        tag = "%s · %s" % (c["type"], c["section"]) if c["section"] else c["type"]
        print("[%d] score=%.3f | %s | %s" % (i, r["score"], c["craft_name"], tag))
        print("    命中词：%s" % ("/".join(r["hit_terms"]) if r["hit_terms"] else "-"))
        print("    " + c["content"][:90].replace("\n", " "))
    print("=" * 64)

    if args.no_llm:
        msgs = build_messages(question, results)
        print("\n== 将发送给大模型的 Prompt ==")
        print("[system] %s..." % msgs[0]["content"][:120])
        print()
        print("[user] %s" % msgs[1]["content"])
        print("\n（--no-llm 模式结束；配置 backend/.env 后可运行完整问答）")
        return

    try:
        out = answerer.answer(question)
    except RuntimeError as e:
        print("运行错误：%s" % e)
        return

    if out.get("answer"):
        print("\n== 回答 ==\n")
        print(out["answer"])
        if out.get("sources"):
            print("\n引用来源：")
            for s in out["sources"]:
                line = " - [%s] %s（%s）" % (s["chunk_id"], s["craft_name"], s["type"])
                if s.get("url"):
                    line += " -> " + s["url"]
                print(line)
    else:
        print("\n未获得回答：%s" % (out.get("error") or "未知错误"))
        print("提示：可先运行 `python demo.py --no-llm \"%s\"` 查看检索与 Prompt 是否正确。" % question)


if __name__ == "__main__":
    main()

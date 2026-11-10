# -*- coding: utf-8 -*-
"""Prompt 组装：把检索到的知识块注入上下文，约束大模型"只依据知识库回答"并给出引用编号。

设计要点：
- system 角色声明规则（只答知识库内容、不编造、标注引用、限字数、事实照原文）；
- 每个知识块按 [n] 编号，附类型/段落/项目名/来源，便于大模型引用与大模型后引用溯源；
- user 消息末尾重申引用格式，降低大模型遗漏编号的概率。
"""

SYSTEM_PROMPT = (
    "你是一位精通中国非物质文化遗产（非遗）的问答助手，服务于「匠人说·非遗生活」App 的传承人问答功能。"
    "你的知识只来源于下方提供的知识库片段，回答规则如下：\n"
    "1. 直接回答用户问题，语言通俗、结构清晰，一般不超过 200 字（需要列举时除外）。\n"
    "2. 只能使用知识库片段中的信息作答；凡引用某片段内容，必须在其后标注对应编号，如 [1][3]。\n"
    "3. 若知识库片段不足以回答问题，请明确回答“根据现有知识库无法回答”，并指出与之最接近、可回答的话题，"
    "严禁编造、推测或使用片段外的信息。\n"
    "4. 不要提及“知识库片段”这类内部术语，以传承人口吻自然作答。\n"
    "5. 涉及年份、批次、人名、编号等事实性信息时，严格按片段原文，不得改写或补全。"
)


def build_messages(question, results):
    """results 为 retriever.search 的返回值（已按分数排序），组装 system+user 两条消息。"""
    blocks = []
    for i, r in enumerate(results, 1):
        c = r["chunk"]
        meta_parts = ["类型：%s" % c["type"]]
        if c["section"]:
            meta_parts.append("段落：%s" % c["section"])
        if c["craft_name"]:
            meta_parts.append("项目：%s" % c["craft_name"])
        src = c["sources"][0] if c.get("sources") else "无来源"
        blocks.append("[%d]（%s；来源：%s）\n%s" % (i, "，".join(meta_parts), src, c["content"]))

    context = "\n\n".join(blocks)
    user_prompt = (
        "以下是检索到的知识库片段：\n\n%s\n\n"
        "用户问题：%s\n\n"
        "请按系统规则回答，凡引用片段内容请使用对应编号 [n]。"
    ) % (context, question)

    return [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt},
    ]

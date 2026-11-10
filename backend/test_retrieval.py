# -*- coding: utf-8 -*-
"""检索质量批量验证：15 项各一题，检查期望项目是否出现在 top-5 / top-8。

用法：python test_retrieval.py
输出：逐题 top-5 命中判定 + 汇总准确率（与期望项目名匹配）。
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from retriever import Retriever  # noqa: E402

# 每题：问题 -> 期望命中的项目名（正式名）
CASES = [
    ("漆扇的历史", "福州脱胎漆器髹饰技艺"),
    ("扎染怎么做", "白族扎染技艺"),
    ("东阳竹编能做什么", "东阳竹编"),
    ("景德镇瓷器为什么有名", "景德镇手工制瓷技艺"),
    ("紫砂壶的保养", "宜兴紫砂陶制作技艺"),
    ("蔚县剪纸有什么特色", "蔚县剪纸"),
    ("杨柳青年画怎么做", "杨柳青木版年画"),
    ("成都糖画的糖怎么熬", "糖塑（成都糖画）"),
    ("南京云锦值钱吗", "南京云锦木机妆花手工织造技艺"),
    ("景泰蓝怎么制作", "景泰蓝制作技艺"),
    ("唐山皮影有什么特点", "皮影戏（唐山皮影戏）"),
    ("京剧是什么时候入选非遗的", "京剧"),
    ("古琴怎么学", "古琴艺术"),
    ("针灸能治什么病", "中医针灸"),
    ("二十四节气有哪些", "二十四节气"),
]


def main():
    r = Retriever()
    hit_top1 = hit_top5 = hit_top8 = 0
    print("%-34s | %-22s | top1 | top5 | top8" % ("问题", "期望项目"))
    print("-" * 96)
    for question, expect in CASES:
        res = r.search(question, top_k=8)
        names = [x["chunk"]["craft_name"] for x in res]
        t1 = names[0] == expect if names else False
        t5 = expect in names[:5]
        t8 = expect in names
        hit_top1 += t1
        hit_top5 += t5
        hit_top8 += t8
        mark = "  " if names and names[0] == expect else "✗ "
        print("%-34s | %-22s | %-4s | %-4s | %-4s %s" % (
            question, expect, "✓" if t1 else "-", "✓" if t5 else "-",
            "✓" if t8 else "-", "" if t1 else ("top5=%s" % (names[:3] if not t5 else names[0]))))

    n = len(CASES)
    print("-" * 96)
    print("Top-1 命中: %d/%d (%.0f%%)" % (hit_top1, n, 100.0 * hit_top1 / n))
    print("Top-5 命中: %d/%d (%.0f%%)" % (hit_top5, n, 100.0 * hit_top5 / n))
    print("Top-8 命中: %d/%d (%.0f%%)" % (hit_top8, n, 100.0 * hit_top8 / n))


if __name__ == "__main__":
    main()

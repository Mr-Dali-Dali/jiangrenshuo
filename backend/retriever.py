# -*- coding: utf-8 -*-
"""检索层：零依赖 BM25（字符 bigram 切词）+ 元数据加权。

中文分词不引入 jieba：对查询与片段做"字符 bigram"切词（去掉停用虚词与标点），
bigram 命中即可捕捉"漆扇的历史""顾景舟"这类查询的语义片段。
614 个片段体量小，全量打分耗时在毫秒级，适合 MVP；后续可平滑替换为向量检索。
"""
import json
import math
import os

CHUNKS_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "heritage-chunks-v1.json",
)

# 中文虚词单字：出现在 bigram 中即整条丢弃（避免"的""了"污染词项）
_STOP_CHARS = set("的了在是和就有又与及或个之而但不也还都一个这那些你我他她它们么呢吧啊哦嗯吗上下中里外前后")
# 标点与空白
_PUNCT = set("，。！？；：、“”‘’（）《》【】〈〉…—·　 \t\n\r,.;!?:\"'()<>[]{}/\\|@#$%^&*_+-=~`")

# 别名映射（查询改写）：App 页面/口语叫法 → 知识库正式项目名。
# "漆扇的历史"若不做此映射，将因"漆扇"一词在知识库正文中几乎不出现而召回失败。
ALIASES = {
    "漆扇": "福州脱胎漆器髹饰技艺",
    "脱胎漆器": "福州脱胎漆器髹饰技艺",
    "漆器": "福州脱胎漆器髹饰技艺",
    "扎染": "白族扎染技艺",
    "染布": "白族扎染技艺",
    "竹编": "东阳竹编",
    "制瓷": "景德镇手工制瓷技艺",
    "瓷器": "景德镇手工制瓷技艺",
    "陶瓷": "景德镇手工制瓷技艺",
    "紫砂": "宜兴紫砂陶制作技艺",
    "紫砂壶": "宜兴紫砂陶制作技艺",
    "剪纸": "蔚县剪纸",
    "年画": "杨柳青木版年画",
    "糖画": "糖塑（成都糖画）",
    "糖塑": "糖塑（成都糖画）",
    "云锦": "南京云锦木机妆花手工织造技艺",
    "织锦": "南京云锦木机妆花手工织造技艺",
    "景泰蓝": "景泰蓝制作技艺",
    "掐丝珐琅": "景泰蓝制作技艺",
    "皮影": "皮影戏（唐山皮影戏）",
    "古琴": "古琴艺术",
    "针灸": "中医针灸",
    "节气": "二十四节气",
}

# 查询意图词表：命中后对相应类型/段落的块加权（轻量意图路由，无额外依赖）
_INTENT_HISTORY = ["历史", "起源", "来历", "由来", "怎么来", "谁发明", "创始人", "源流", "发展"]

# 跨项目问题里，每个被点名项目至少保留的块数（避免资料多的项目挤占全部名额）
PER_CRAFT_MIN = 3
_INTENT_STEPS = ["怎么做", "如何做", "怎么做", "步骤", "流程", "制作", "工艺", "工序", "教程", "跟学", "学习", "方法"]
_INTENT_INHERITORS = ["谁", "传承人", "大师", "传人", "代表人物", "师承", "徒弟", "名家"]
_INTENT_WORKS = ["代表", "作品", "名作", "有名", "经典", "巅峰", "镇店"]


def tokenize(text):
    """字符 bigram 切词；文本短于 2 个有效字符时退回 unigram。"""
    cleaned = [ch for ch in text if ch not in _PUNCT and not ch.isspace()]
    if len(cleaned) == 0:
        return []
    if len(cleaned) == 1:
        return [cleaned[0]]
    tokens = []
    for i in range(len(cleaned) - 1):
        a, b = cleaned[i], cleaned[i + 1]
        if a in _STOP_CHARS or b in _STOP_CHARS:
            continue
        tokens.append(a + b)
    return tokens


class Retriever:
    """BM25 检索器：构造时一次性加载片段并预计算词频/文档频率。"""

    def __init__(self, chunks_path=CHUNKS_PATH):
        with open(chunks_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.chunks = data["chunks"]
        n = len(self.chunks)

        # 预计算每块 bigram 词频、长度、全局文档频率
        self.tf = []
        self.lens = []
        self.df = {}
        for c in self.chunks:
            toks = tokenize(c["content"])
            counter = {}
            for t in toks:
                counter[t] = counter.get(t, 0) + 1
            self.tf.append(counter)
            self.lens.append(len(toks))
            for t in set(counter):
                self.df[t] = self.df.get(t, 0) + 1

        self.n = n
        self.avgdl = sum(self.lens) / n if n else 1.0
        self.k1 = 1.2
        self.b = 0.75
        self.idf = {t: math.log((n - df + 0.5) / (df + 0.5) + 1.0) for t, df in self.df.items()}
        self.craft_names = sorted({c["craft_name"] for c in self.chunks if c.get("craft_name")})

    def _bm25(self, q_tokens, idx):
        score = 0.0
        tf_map = self.tf[idx]
        dl = self.lens[idx]
        denom_base = self.k1 * (1 - self.b + self.b * dl / self.avgdl)
        for t in q_tokens:
            tf_t = tf_map.get(t, 0)
            if tf_t == 0:
                continue
            idf_t = self.idf.get(t, 0.0)
            score += idf_t * (tf_t * (self.k1 + 1)) / (tf_t + denom_base)
        return score

    def _meta_boost(self, question, q_tokens, chunk):
        """元数据加权：查询词与项目名/门类/产地重叠越多、命中断落名，分越高。"""
        meta_tokens = set(tokenize(
            (chunk["craft_name"] or "") + (chunk["category"] or "") + (chunk["origin"] or "")
        ))
        overlap = sum(1 for t in set(q_tokens) if t in meta_tokens)
        boost = 0.8 * overlap
        if chunk["section"] and chunk["section"] in question:
            boost += 1.0
        return boost

    def _expand_query(self, question):
        """查询改写：原词 + 别名映射的正式项目名 bigram，合并为查询词集合。"""
        tokens = set(tokenize(question))
        for alias, formal in ALIASES.items():
            if alias in question:
                tokens.update(tokenize(formal))
        return list(tokens)

    def _name_hit(self, question, craft_name):
        """项目名命中：query 直接含正式名，或含映射到该正式名的别名。"""
        if craft_name and craft_name in question:
            return True
        for alias, formal in ALIASES.items():
            if alias in question and formal == craft_name:
                return True
        return False

    def _intent_boost(self, question, chunk):
        """意图加权：问题含"历史/怎么做/谁/作品"等意图词时，对应类型块加分。"""
        boost = 0.0
        is_ency = chunk["type"] == "encyclopedia"
        for kw in _INTENT_HISTORY:
            if kw in question:
                if is_ency and chunk["section"] == "源流":
                    boost = max(boost, 2.5)
                elif chunk["type"] == "qa":
                    boost = max(boost, 0.8)
        for kw in _INTENT_STEPS:
            if kw in question:
                if chunk["type"] == "craft_steps":
                    boost = max(boost, 4.0)
                elif is_ency and chunk["section"] == "工艺":
                    boost = max(boost, 2.0)
        for kw in _INTENT_INHERITORS:
            if kw in question:
                if chunk["type"] == "inheritors":
                    boost = max(boost, 2.5)
        for kw in _INTENT_WORKS:
            if kw in question:
                if chunk["type"] == "works":
                    boost = max(boost, 2.5)
        return boost

    def _preferred_types(self, question):
        """问题意图对应的块型：跨项目补块时优先补这些，保证对比的是同一类材料。"""
        if any(kw in question for kw in _INTENT_STEPS):
            return [("craft_steps", None), ("encyclopedia", "工艺")]
        if any(kw in question for kw in _INTENT_HISTORY):
            return [("encyclopedia", "源流")]
        if any(kw in question for kw in _INTENT_INHERITORS):
            return [("inheritors", None)]
        if any(kw in question for kw in _INTENT_WORKS):
            return [("works", None)]
        return []

    def search(self, question, top_k=8):
        """返回按分数降序的检索结果列表。"""
        q_tokens = self._expand_query(question)
        if not q_tokens:
            return []
        scored = []
        for idx, c in enumerate(self.chunks):
            base = self._bm25(q_tokens, idx)
            boost = self._meta_boost(question, q_tokens, c)
            boost += self._intent_boost(question, c)
            if self._name_hit(question, c["craft_name"]):
                boost += 3.0
            # base 为 0 但意图/名称命中时仍允许进入（如跟学步骤块中不含项目名）
            if base <= 0 and boost <= 0:
                continue
            scored.append((base + boost, idx))
        scored.sort(key=lambda x: -x[0])

        picked = scored[:top_k]

        # 一个问题点名多个项目时，给资料少的项目保底名额。
        # 否则资料多的项目会占满 top_k，"A 和 B 有什么区别"这类问题拿不到另一方的材料，
        # 模型只能回答"知识库未提供"——即使该项目的工艺段其实在库里。
        mentioned = [name for name in self.craft_names if self._name_hit(question, name)]
        if len(mentioned) >= 2:
            preferred = self._preferred_types(question)
            picked_idx = {idx for _, idx in picked}
            extra = []
            for name in mentioned:
                owned = [(s, i) for s, i in scored if self.chunks[i]["craft_name"] == name and s > 0]
                kept = sum(1 for _, i in owned if i in picked_idx)
                # 先补与问题意图同类的块，保证对比的是"工艺 vs 工艺"
                for s, i in owned:
                    if kept >= PER_CRAFT_MIN or not preferred:
                        break
                    if i in picked_idx:
                        continue
                    c = self.chunks[i]
                    if not any((t is None or c["type"] == t) and (sec is None or c["section"] == sec) for t, sec in preferred):
                        continue
                    extra.append((s, i))
                    picked_idx.add(i)
                    kept += 1
                # 仍不够再按分数补
                for s, i in owned:
                    if kept >= PER_CRAFT_MIN:
                        break
                    if i in picked_idx:
                        continue
                    extra.append((s, i))
                    picked_idx.add(i)
                    kept += 1
            if extra:
                picked = sorted(picked + extra, key=lambda x: -x[0])

        results = []
        for score, idx in picked:
            c = self.chunks[idx]
            results.append({
                "chunk": c,
                "score": round(score, 3),
                "hit_terms": [t for t in q_tokens if t in self.tf[idx]],
            })
        return results

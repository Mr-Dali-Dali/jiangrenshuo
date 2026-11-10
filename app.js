const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const crafts = {
  脱胎漆器: { "title": "福州脱胎漆器髹饰技艺", "category": "传统技艺 · 福建福州", "description": "布胎上层层刷漆磨亮，轻得能飘起来，亮得能照见人。2006年入选第一批国家级非物质文化遗产名录（项目编号Ⅷ-54）。", "maker": "代表性传承人 · 郑益坤", "art": "fan-art", "symbol": "扇", "photo": "./assets/topics/tuoqi-qishan.jpg", "encyclopedia": "【源流】福州脱胎漆器髹饰技艺由清代乾隆年间福州府侯官县（今福州）漆艺人沈绍安（1767—1835，字仲康）创立。沈绍安早年为油漆匠，相传他在修复县衙匾额时发现，木胎已经朽烂，而里层用夏布裱褙的漆灰底坯却完好坚固，由此受到唐代夹纻技艺启发，复原创制出“脱胎”技法，实现了漆器从木胎到布胎的飞跃，因此福州工艺美术界至今仍以“沈绍安”三字作为脱胎漆器的正宗代表。（来源：福州市人民政府、中国文联）<br/><br/>【工艺】制作时采用布坯或木坯，经上灰、打磨、髹饰、黑推光、色推光等工序后，再用彩漆晕金、锦纹、朱漆描金、台花嵌螺钿等技法加以装饰。因技艺精良、品种繁多、造型巧妙、色彩绚丽，自1898年以来，福州脱胎漆器先后在巴黎、多伦多、柏林、伦敦、美国费城的世界博览会上获奖。（来源：中国非遗网）<br/><br/>【名作】近现代名家辈出。1949年后，沈氏兰记漆器店改制为脱胎漆器公司，著名漆艺家李芝卿、高秀泉在设计与髹饰艺术上取得新突破。国家级传承人郑益坤以金鱼题材著称，其《金鱼盘》陈列于人民大会堂福建厅。历史上荷叶瓶、竹根瓶、提篮观音等曾连夺多届国际博览会奖章，被誉为“珍贵黑宝石”“东方珍品”。（来源：央视网、福建省文物局、福州市政协）<br/><br/>【地位】福州脱胎漆器与北京景泰蓝、景德镇瓷器并称“中国传统工艺三宝”，也是福州“榕城三绝”之一。2006年经国务院批准列入第一批国家级非物质文化遗产名录，项目编号Ⅷ-54，申报地区为福建省福州市，保护单位为福州市漆艺研究会。（来源：中国非遗网）<br/><br/>【现状】在市场经济冲击下，福州第一、第二脱胎漆器厂曾相继倒闭，“印锦”“台花”等技法一度失传，面临人亡艺绝的困境。近年来随着非遗系统性保护推进，郑益坤、黄时忠、郑修钤等国家级传承人工作室、闽江学院美术学院等教学力量重新集结，漆艺以“东方黑宝石”的形象在文旅融合中焕新。（来源：中国非遗网、央视网）", "steps": [{"title": "塑胎翻模", "description": "先用泥土或石膏塑出想要的器物外形，再在外层翻制出可拆开的模具，作为后续裱布的依据。", "tip": "胎模角度没留好，后面布就剥不下来，硬撕会扯破。"}, {"title": "裱布脱胎", "description": "在模具表面刷一层生漆，贴上裁剪好的夏布，反复刷漆贴布数层，等漆半干后脱去内胎。", "tip": "布要贴平不能有气泡和褶皱，脱胎才会轻薄均匀。"}, {"title": "上灰打底", "description": "在布胎表面刮上几层瓦灰或漆灰，每层干后都要仔细打磨平整，把凹凸填平。", "tip": "灰刮太厚易开裂，每遍别贪多，薄刮多遍才稳。"}, {"title": "髹涂底漆", "description": "在打磨好的胎上反复髹刷黑推光漆，每刷一遍就要进阴房阴干、再打磨，通常要髹涂很多层。", "tip": "漆房太干或太脏都会让漆面起粒、发白，温湿度要控好。"}, {"title": "推光装饰", "description": "用细瓦灰、植物油反复推擦漆面直到镜面般光亮，再用彩漆描金、嵌螺钿画上纹样。", "tip": "推光太用力会磨穿底层露白，力道要均匀慢慢来。"}] },
  扎染: { "title": "白族扎染技艺", "category": "传统技艺·织造印染 · 云南大理", "description": "先用针线扎紧布，丢进蓝靛缸里，拆开就是蓝天白云。2006年入选第一批国家级非物质文化遗产名录（项目编号Ⅷ-26）。", "maker": "代表性传承人 · 张仕绅", "art": "tie-dye", "symbol": "✳", "photo": "./assets/topics/zharan.jpg", "encyclopedia": "【源流】白族扎染技艺古称“绞缬”，是我国古老的纺织品染色技艺，主要流传于云南大理白族自治州大理市周城村及巍山彝族回族自治县一带，其中以周城白族扎染最为著名，周城被文化部命名为“民族扎染之乡”。据史书记载，东汉时期大理地区就有染织之法；唐贞元十六年，南诏舞队到长安献艺，所着舞衣“裙襦鸟兽草木，文以八彩杂革”即为扎染而成。明清时期洱海白族地区染织技艺已达很高水平，出现染布行会，明朝洱海卫红布、清代喜洲布和大理布均名噪一时。（来源：中国非遗网）<br/><br/>【工艺】扎染一般以棉白布或棉麻混纺白布为原料，染料主要是植物蓝靛，云南民间俗称板蓝根。主要步骤有画刷图案、绞扎、浸泡、染布、蒸煮、晒干、拆线、碾布等，技术关键是绞扎手法和染色技艺，染缸、染棒、晒架、石碾是主要工具。染缸液体在碱性环境下经发酵把靛蓝还原为可溶性“靛白”，布浸入时呈黄绿，提出接触空气后由黄变绿、由绿变蓝，反复浸染氧化便能层层加深。（来源：中国非遗网、中科院长春应化所）<br/><br/>【名作】白族扎染品种多样，图案多为自然形小纹样，分布均匀、寓意吉祥。传统花型从捏花、小蝴蝶、毛毛虫发展到“福禄寿喜”“花鸟鱼虫”等系列，产品由匹布、床单扩展到窗帘、门帘、桌布、围巾、背包、服饰等。段银开、段树坤夫妇创办的璞真扎染博物馆收集整理了1800多种传统图案；张翰敏创办的“蓝续”扎染把传统手艺与现代审美结合，产品远销荷兰等地。（来源：云南省非遗网、大理州政府）<br/><br/>【地位】一千多种纹样是千百年来白族历史文化的缩影，折射出白族民情风俗与审美情趣，具有重要美学价值和实用功能。2006年列入第一批国家级非物质文化遗产名录，项目编号Ⅷ-26，申报地区为云南省大理市，保护单位为大理市非物质文化遗产保护管理所。（来源：中国非遗网）<br/><br/>【现状】产业化趋势曾使部分传统技艺走向退化，植物染料板蓝根一度供不应求。如今周城形成以“璞真”“蓝续”为龙头、把扎花缝纫工序分发给周边妇女居家就业的产业生态，并通过“非遗+旅游”的体验游、研修课程走向国内外市场，传承人队伍从张仕绅到段银开、张翔等世代相袭。（来源：光明网、大理州政府）", "steps": [{"title": "画稿定位", "description": "把白布铺平，用粉笔或针线在布面上画出想要的小纹样，定好扎花的位置。", "tip": "画太密太挤，染完花会连成一片，留白要给足呼吸空间。"}, {"title": "绞扎打结", "description": "按画好的图案，用针线把布一针针收紧、打结，把要留白的部位紧紧扎死。", "tip": "扎得不紧不牢，染液就会渗进去，花纹边缘就糊掉了。"}, {"title": "入缸浸染", "description": "把扎好的布先浸水打湿，再放进蓝靛染缸里反复浸透、提出氧化，蓝度要一层一层加深。", "tip": "一次泡太久颜色发死发乌，要“浸一浸、晾一晾”反复几次才透亮。"}, {"title": "清洗蒸煮", "description": "染好后把布取出，用清水反复漂洗去掉浮色，再略作蒸煮固色、晾晒。", "tip": "浮色没洗干净就拆线，颜色会晕到白花上，变脏。"}, {"title": "拆线碾平", "description": "等布干透，小心把扎线一根根剪开抽掉，露出蓝白花纹，再用碾石碾平。", "tip": "拆线别贪快剪到布，线结要找准再剪，别把成品划破。"}] },
  竹编: { "title": "东阳竹编", "category": "传统技艺 · 浙江东阳", "description": "毛竹劈成发丝，在指尖一上一下，就编出整只动物。2008年作为“竹编”项目扩展项目列入第二批国家级非物质文化遗产名录（官方类别传统美术，编号Ⅶ-51）。", "maker": "代表性传承人 · 何福礼", "art": "weave-art", "symbol": "▧", "photo": "./assets/topics/zhubian.jpg", "encyclopedia": "【源流】东阳竹编是流传于浙江东阳的传统竹编工艺。浙江竹编工艺品生产集中在东阳、嵊州一带，尤其是东阳，素有“百工之乡”“工艺美术之乡”的美誉。1958年到1978年期间，东阳竹编厂并入东阳木雕厂，竹编与木雕共同生产、互相交流，在题材、造型、设色、趣味、风格等多方面都取得长足发展，也培养出何福礼等一批名家。（来源：中国非遗网）<br/><br/>【工艺】东阳竹编以立体编织为主，与平面编织技艺相结合，手工剖篾细如发线、柔如蚕丝，精编细作、逼真传神。它选当地毛竹，经锯竹、刮青、劈丝、抽篾等工序把竹料剖成细丝，再按经纬穿插编织。产品分两大类：一类是篮、筐、箱、箩、箕、篓、笠等生活器具，以实用为主；一类是立体陈设与建筑装饰，以艺术欣赏为主，并与烫金、印花、刻镂、竹丝镶嵌等装饰技艺结合。（来源：中国非遗网）<br/><br/>【名作】东阳竹编擅长编织立体人物、动物及传统竹篮等器皿。1984年2月完成的竹编屏风《九龙壁》长6.19米、高2.68米，由姚振华设计、蔡平义绘图、冯洁生塑坯、何福礼处理编织技法，投工万余、历时一年，是东阳竹编的里程碑作品。当代胡正仁以七星提篮、八角竹编花篮、竹丝镶嵌屏风等精品，把竹编推向实用、审美与收藏兼具的艺术高度。（来源：中国林科院期刊、东阳市政府）<br/><br/>【地位】东阳竹编造型生动、色彩典雅，具有浓郁民间美术特征和较高艺术价值、民间工艺研究价值。在国家级名录中归“竹编”项目（官方类别为传统美术，编号Ⅶ-51），2008年作为第二批国家级非物质文化遗产扩展项目列入名录，申报地区为浙江省东阳市，保护单位为东阳市木雕家居产业协会。（来源：中国非遗网）<br/><br/>【现状】东阳竹编曾面临传承人老龄化、青年学艺者偏少、后继乏人的困境。近年来通过非遗工坊、祖孙三代传习、与七所院校合作教学以及随工美团队出访意、法、德、日、美等国展演，何福礼、胡正仁、卢光华、何红兵等国家级、省级传承人队伍不断壮大。（来源：中国非遗网、金华市文旅局）", "steps": [{"title": "选料劈竹", "description": "选冬伐、节长肉厚的毛竹，锯段刮去青皮，再把竹筒劈成宽窄一致的竹条。", "tip": "嫩竹含水多易虫蛀变形，要选老成的冬竹并先做阴干处理。"}, {"title": "抽丝刮篾", "description": "把竹条层层剖开、刮薄，分成粗细均匀的细丝，是决定能否编出精细作品的关键。", "tip": "篾厚薄不匀，编出来松紧不一，刀要稳、每片都刮到一样。"}, {"title": "起底定型", "description": "按器型先用几根主篾摆好骨架、十字交叉起底，固定住整体形状。", "tip": "底没摆正对不齐，后面越编越歪，起底就要拉准中心线。"}, {"title": "经纬编织", "description": "纵篾作经、横篾作纬，一上一下穿插编织，随造型加减篾丝做出弧度和立体轮廓。", "tip": "每根篾要压得一样紧，忽松忽密会鼓包、纹路错乱。"}, {"title": "收口修饰", "description": "编到口沿处把多余篾头收进缝里压紧，再修整边缘、装上提手或配件。", "tip": "篾头没收紧会扎手、散口，结尾要逐根压牢藏好。"}] },
  京剧: { "title": "京剧", "category": "传统戏剧 · 北京（全国）", "description": "生旦净丑唱念做打，两百年打磨出的国粹。2006年入选第一批国家级非物质文化遗产名录，2010年入选人类非遗代表作名录。", "maker": "代表性传承人 · 梅葆玖", "art": "sound-art", "symbol": "♪", "photo": "", "encyclopedia": "【源流】京剧又称平剧、京戏、国剧，是中国影响最大的戏曲剧种。清乾隆五十五年（1790年）起，三庆、四喜、春台、和春四大徽班陆续进京，与来自湖北的汉调艺人合作，同时接受昆曲、秦腔的部分剧目、曲调和表演方法，又吸收一些地方民间曲调，经不断交流融合最终形成京剧。（来源：中国非遗网、中国戏曲学院）<br/><br/>【工艺】京剧在文学、表演、音乐、舞台美术上都有一套规范化程式：唱腔属板式变化体，以西皮、二簧为主要声腔；伴奏分文场（京胡为主）和武场（鼓板为主）；脚色分生、旦、净、丑等行当，表演讲究唱、念、做、打。（来源：中国非遗网 ihchina.cn）<br/><br/>【名作】京剧以历史故事为主要演出内容，传统剧目约1300多个，常演者在三四百个以上。《贵妃醉酒》《霸王别姬》《四郎探母》《白蛇传》《穆桂英挂帅》等家喻户晓。（来源：中国非遗网）<br/><br/>【地位】京剧有“国剧”之称，以梅兰芳命名的京剧表演体系被视为东方戏剧表演体系代表。2006年列入第一批国家级非物质文化遗产名录，保护单位为北京京剧院；2010年11月列入联合国教科文组织人类非物质文化遗产代表作名录。（来源：中国非遗网）", "steps": [{"title": "认一认行当", "description": "先分清生、旦、净、丑四个行当，听一段各行当的代表唱段，选一个想体验的角色。", "tip": "不用勉强模仿声线，先找到让你觉得“有意思”的行当。"}, {"title": "学咬字归韵", "description": "挑一句念白，用京剧的湖广音、中州韵念一遍，注意字头和字尾的收音。", "tip": "先慢念把每个字念圆，再加速，不要一上来就抢节奏。"}, {"title": "跟唱一句腔", "description": "找一段西皮或二簧的慢板，跟着录音小声跟唱一句，注意拖腔和尺寸。", "tip": "先哼旋律不唱词，把音高找准了再加字。"}, {"title": "走一个身段", "description": "学一个基本动作：云手、山膀或圆场，体会“手眼身法步”的配合。", "tip": "身段讲究“逢动必圆”，手臂动作要走弧线不要直来直去。"}, {"title": "连成小片段", "description": "把念白、唱腔和身段连起来，完整演一小段，录下来给自己看看。", "tip": "第一次录一定不满意，别急着否定，隔天再看会进步很多。"}] },
  皮影戏: { "title": "皮影戏（唐山皮影戏）", "category": "传统戏剧 · 河北唐山", "description": "驴皮刻出小人儿，灯光一照在白布上又唱又打。2006年列入第一批国家级非物质文化遗产名录，2011年随“皮影戏”入选人类非遗代表作名录。", "maker": "代表性传承人 · 齐永衡", "art": "sound-art", "symbol": "◎", "photo": "", "encyclopedia": "【源流】皮影戏是用兽皮或纸板剪制形象、借灯光照射在白色幕布上表演故事的戏曲形式，至晚在宋代已经成熟盛行。唐山皮影又称滦州影、乐亭影、驴皮影，通常认为初创于明代末期、盛行于清末民国初年，迄今已有400多年历史。（来源：中国非遗网、新华网河北频道）<br/><br/>【工艺】传统影人多用驴皮，先刮去毛血加工成半透明状，再经刮皮浆皮、拓样雕刻、着色涂油、拼钉装杆几道工序制成；人物造型分生、小、大、鬓、丑等行当，均为侧影。演出时影人安上三根竹扦，衬着白纸“亮子”，靠灯光投影表演。（来源：中国非遗网 ihchina.cn）<br/><br/>【名作】唐山皮影的剧本叫“影卷”，现存至少500多部，其中连台本130多部，常演剧目有《五锋会》《二度梅》《青云剑》等。（来源：中国非遗网）<br/><br/>【地位】唐山皮影以唱功见长，为板腔体。2006年列入第一批国家级非物质文化遗产名录，保护单位为唐山市群众艺术馆；2011年随“皮影戏”整体列入联合国教科文组织人类非物质文化遗产代表作名录。（来源：中国非遗网 ihchina.cn）", "steps": [] },
  古琴艺术: { "title": "古琴艺术", "category": "传统音乐 · 全国（多琴派传承）", "description": "七根弦一按一挑，弹出中国人三千年的心事。2003年入选联合国教科文组织人类口头和非物质遗产代表作名录（2008年自动纳入人类非物质文化遗产代表作名录）；2008年列入第二批国家级非物质文化遗产名录（各琴派）。", "maker": "代表性传承人 · 李祥霆", "art": "sound-art", "symbol": "♪", "photo": "", "encyclopedia": "【源流】古琴又称“琴”“七弦琴”，别称“绿绮”“丝桐”，是中国最古老的弹拨乐器之一。以考古资料证实，其作为乐器的形制至迟到汉代已经发展完备。琴、棋、书、画并称文人“四艺”，而琴居四艺之首，被古人视为修身养性、调和情志的“君子之器”。<br/><br/>【工艺】古琴七弦、十三徽，左手按弦走音、右手拨弦取声，讲究“走手音”与余韵。斫琴极重选材，面板多取存放多年的老杉或梧桐，底板用梓木等硬木；槽腹成形后反复披麻、髹涂生漆、调鹿角霜做灰胎，再安岳山、徽位、上弦。好琴历经岁月会生出蛇腹断、流水断等断纹，音色愈显苍润。<br/><br/>【名作】传世名琴以唐琴为尊。故宫博物院藏“九霄环佩”传为盛唐雷氏世家雷威所斫伏羲式。代表琴曲有《流水》《梅花三弄》《潇湘水云》《阳关三叠》等。晚唐曹柔创减字谱，以减笔汉字记录弦位、徽位与左右手指法。<br/><br/>【地位】2003年11月，古琴入选联合国教科文组织第二批人类口头和非物质遗产代表作名录，2008年自动纳入人类非物质文化遗产代表作名录；同年古琴艺术（含虞山、广陵、金陵、诸城、岭南、浙派、梅庵等琴派）列入第二批国家级非物质文化遗产名录，申报与保护单位为中国艺术研究院。<br/><br/>【现状】如今琴社琴馆渐多、青年琴人辈出，故宫等机构仍以传世唐琴登台演奏，斫琴与打谱并行，古琴正从文人书斋走向大众舞台。", "steps": [] },
};
crafts['漆扇'] = crafts['脱胎漆器']; // 兼容旧数据：过去以“漆扇”记录的手账条目仍可正常打开

/* ---------- 15 项非遗知识库：话题识别 + 本地检索 ---------- */
const KB_ITEMS = (window.HERITAGE_KB_15 && Array.isArray(window.HERITAGE_KB_15.items)) ? window.HERITAGE_KB_15.items : [];
const KB_ALIAS = [];
KB_ITEMS.forEach(item => (item.aliases || [item.name]).forEach(alias => KB_ALIAS.push({ alias, item })));
KB_ALIAS.sort((a, b) => b.alias.length - a.alias.length); // 长别名优先，避免“瓷”“琴”这类短词截胡

// 每项配一张能一眼认出的实拍图，话题列表、识别结果、手账缩略图共用
const KB_ICONS = {
  '脱胎漆器': './assets/topics/tuoqi-pan.jpg',
  '扎染': './assets/topics/zharan.jpg',
  '竹编': './assets/topics/zhubian.jpg',
  '景德镇制瓷': './assets/topics/jingdezhen.jpg',
  '宜兴紫砂陶': './assets/topics/zisha.jpg',
  '蔚县剪纸': './assets/topics/yuxian-jianzhi.jpg',
  '杨柳青木版年画': './assets/topics/yangliuqing.jpg',
  '成都糖画': './assets/topics/tanghua.jpg',
  '南京云锦': './assets/topics/yunjin.jpg',
  '景泰蓝': './assets/topics/jingtailan.jpg',
  '皮影戏': './assets/topics/piying.jpg',
  '京剧': './assets/topics/jingju.jpg',
  '古琴艺术': './assets/topics/guqin.jpg',
  '中医针灸': './assets/topics/zhenjiu.jpg',
  '二十四节气': './assets/topics/jieqi.jpg'
};
const iconOf = item => (item ? (KB_ICONS[item.craftKey] || KB_ICONS[item.short] || '') : '');

// 前端只手工录了六项，其余用知识库字段补齐，15 项才能都进手账、看百科、被问到
KB_ITEMS.forEach(item => {
  const key = item.craftKey || item.short;
  if (crafts[key]) { if (!crafts[key].photo) crafts[key].photo = iconOf(item); return; }
  crafts[key] = {
    title: item.name,
    category: `${item.category} · ${item.origin.replace(/·/g, '')}`,
    description: `${item.summary}。${item.status}`,
    maker: '国家级非遗代表性项目',
    art: 'weave-art',
    symbol: '◆',
    photo: iconOf(item),
    encyclopedia: item.encyclopedia,
    steps: item.steps || []
  };
});

// 从一句自然语言里认出说的是哪一项非遗；认不出返回 null
function detectCraft(text) {
  const source = String(text || '');
  for (const entry of KB_ALIAS) {
    if (entry.alias && source.includes(entry.alias)) return entry.item;
  }
  return null;
}
const craftKeyOf = item => (item && (item.craftKey || item.short)) || '';

// 问句与库内问答按字符 bigram 重合度打分，再叠加实词命中与意图加权
const KB_STOP = /怎么|怎样|什么|为什么|为何|哪些|哪个|多少|可以|能|会|要|该|都|也|还|的|了|是|有|在|和|与|吗|呢|啊|呀|我|你|它|这|那/g;
function kbClean(text) {
  return String(text).replace(/[\s，。！？、：；（）()《》〈〉“”‘’"'·…—\-,.!?:;]/g, '').replace(KB_STOP, '');
}
function kbBigrams(text) {
  const clean = kbClean(text);
  const set = new Set();
  for (let i = 0; i < clean.length - 1; i += 1) set.add(clean.slice(i, i + 2));
  return set;
}
// 项目名自身的词（“糖画”“京剧”）几乎出现在每条问答里，不能算作命中，否则权重全加一遍
function kbNameGrams(item) {
  const set = new Set();
  [item.name, item.short].concat(item.aliases || []).forEach(name => {
    const clean = kbClean(name);
    for (let i = 0; i < clean.length - 1; i += 1) set.add(clean.slice(i, i + 2));
  });
  return set;
}
const KB_INTENTS = [
  { ask: /怎么做|怎么制作|做法|工艺|工序|步骤|流程|做出来/, key: /步骤|工序|流程|几道|怎么做|制作过程|工艺/ },
  { ask: /历史|起源|由来|最早|多久|哪年|什么时候/, key: /最早|历史|起源|由来|哪年|年代|时候/ },
  { ask: /传承人|谁在做|大师|师傅|徒弟|传人|流派/, key: /传承人|传人|师傅|徒弟|大师|流派/ },
  { ask: /作品|代表作|名作|藏品|剧目|唱段|演什么/, key: /作品|代表作|名作|藏品|剧目|戏|曲目/ },
  { ask: /保护|现状|困难|未来|还有人做/, key: /保护|现状|困难|面临|未来/ },
  { ask: /治疗|治|疗效|管用|有用|适应|主治|调理/, key: /治疗|治|疗效|适应|内病外治|病|调理/ },
  { ask: /保养|养护|存放|保存|清洁|开壶|养壶/, key: /保养|养护|养壶|开壶|存放|保存|清洁/ }
];
function pickQA(item, question) {
  const user = kbBigrams(question);
  const userClean = kbClean(question);
  const nameGrams = kbNameGrams(item);
  let pair = null, best = 0, exact = false;
  (item.qa || []).forEach(candidate => {
    const base = kbBigrams(candidate.q);
    const candidateClean = kbClean(candidate.q);
    let hit = 0;
    user.forEach(bg => { if (base.has(bg)) hit += 1; });
    // Dice 系数：短问句只碰上一两个 bigram 时不会虚高，避免答错条目
    const score = (2 * hit) / ((user.size + base.size) || 1);
    let wordBonus = 0;
    for (let i = 0; i <= userClean.length - 2; i += 1) {
      const word = userClean.slice(i, i + 2);
      if (!nameGrams.has(word) && candidateClean.includes(word)) { wordBonus = 0.35; break; }
    }
    let intentBonus = 0;
    KB_INTENTS.forEach(intent => {
      if (intent.ask.test(question) && intent.key.test(candidate.q)) intentBonus = Math.max(intentBonus, 0.4);
    });
    const total = score + wordBonus + intentBonus;
    if (total > best) { best = total; pair = candidate; exact = wordBonus > 0; }
  });
  return { pair, score: best, exact };
}
// 库里没写“怎么做”的问答时，退回百科【工艺】段或跟学步骤
function craftProcess(item) {
  const text = String(item.encyclopedia || '').replace(/<br\/>/g, '\n');
  const seg = text.match(/【工艺】([\s\S]*?)(?=【|$)/);
  if (seg && seg[1].trim()) return seg[1].replace(/（来源[^）]*）/g, '').trim();
  // 没有单独【工艺】段时，从百科里挑一句讲做法的，别把整篇甩给用户
  const sentences = text.replace(/【[^】]+】/g, '。').split('。').map(line => line.trim()).filter(Boolean);
  const craft = sentences.find(line => /制作|工序|雕刻|剪制|刮皮|掐丝|织造|熬糖|绣制/.test(line) && line.length > 12);
  return craft ? `${craft}。` : '';
}
function kbPrompts(item, asked) {
  const pool = (item.qa || []).map(candidate => candidate.q).filter(q => q !== asked && q.length <= 20);
  const picks = [];
  pool.slice().sort(() => Math.random() - 0.5).forEach(prompt => { if (picks.length < 2 && !picks.includes(prompt)) picks.push(prompt); });
  return picks;
}
function renderKBAnswer(item, question) {
  const clean = question.replace(/^(看了|问了|做了) · /, '');
  const { pair, score, exact } = pickQA(item, clean);
  let text = '';
  // 问“有哪些代表作/作品”时给清单，比只答其中一件更贴题
  if (/有什么代表|有哪些代表|代表作品|代表作有|有哪些作品|名作有|经典剧目|有哪些经典|最出名/.test(clean) && (item.works || []).length) {
    text = `${item.name}的代表作品有：<br/><br/>${item.works.map((work, index) => `${index + 1}. ${work.name}${work.description ? `——${String(work.description).replace(/。$/, '')}` : ''}`).join('<br/>')}。`;
  }
  // 问“还有谁在做”且没有精确问答时，直接列传承谱系
  if (!text && /传承人|谁在做|谁在传|有哪些大师|谱系|几代/.test(clean) && (item.inheritors || []).length && score < 0.45) {
    text = `${item.name}的代表性传承人有：<br/><br/>${item.inheritors.map(person => `${person.name}（${person.batch || '批次未查到'}${person.region ? `，${person.region}` : ''}）`).join('<br/>')}。`;
  }
  // 问“怎么做”时直接给流程：跟学步骤优先，没有步骤才退回百科【工艺】段
  if (/怎么做|怎么制作|做法|工艺|工序|步骤|流程|做出来|怎么剪|怎么刻|怎么织|怎么染|怎么画|怎么烧|怎么绣|怎么熬|怎么捏|怎么雕/.test(clean)) {
    const stepsText = (item.steps && item.steps.length)
      ? `${item.name}的手艺一般分 ${item.steps.length} 步：${item.steps.map((step, index) => `${index + 1}. ${step.title}：${String(step.description).replace(/。$/, '')}`).join('；')}。`
      : craftProcess(item);
    if (stepsText) text = stepsText;
  }
  if (!text) text = (pair && score >= 0.45) ? pair.a : `${item.summary}。${item.status}`;
  const sources = (item.sources || []).slice(0, 3).map(url => `<p>${url}</p>`).join('') || '<p>知识库：heritage-knowledge-15-v2.json</p>';
  return `<div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人 · ${item.short}</small><div class="bubble">${text}</div><details class="sources"><summary>参考资料 · ${(item.sources || []).length} 条</summary>${sources}</details></div></div>`;
}
function renderKBList() {
  const rows = KB_ITEMS.map((item, index) => `${String(index + 1).padStart(2, '0')}　${item.name}　·　${item.origin}`).join('<br/>');
  return `<div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人 · 知识库</small><div class="bubble">我这儿收了 15 项国家级非遗，按名录顺序排开是这些：<br/><br/>${rows}</div><details class="sources"><summary>知识库 · 15 项 / 343 条问答</summary><p>项目名称、编号、传承人与问答均核对自中国非遗网（ihchina.cn）、UNESCO 与地方文旅部门公开资料。想细聊哪一项，直接说名字就行。</p></details></div></div>`;
}
let lessonSteps = crafts.扎染.steps;

const defaultEntries = [
  { id: 'e1', kind: '看了', title: '看了 · 福州脱胎漆器髹饰技艺', detail: '轻得能飘起来的脱胎小秘密', art: 'fan-art', symbol: '扇', date: '今天 14:20', craft: '脱胎漆器' },
  { id: 'e2', kind: '问了', title: '问了 · 扎染为什么有深浅？', detail: '传承人聊蓝白纹样的由来', art: 'tie-dye', symbol: '✳', date: '今天 13:46', craft: '扎染' },
  { id: 'e3', kind: '做了', title: '做了 · 我的第一块扎染方巾', detail: '完成了 5 个跟学步骤', art: 'tie-dye', symbol: '✳', date: '昨天 16:08', craft: '扎染' },
  { id: 'e4', kind: '看了', title: '看了 · 东阳竹编', detail: '经纬之间的生活巧思', art: 'weave-art', symbol: '▧', date: '10 月 24 日', craft: '竹编' },
  { id: 'e5', kind: '问了', title: '问了 · 脱胎漆器为什么那么轻？', detail: '从一层布漆壳说起', art: 'fan-art', symbol: '扇', date: '10 月 23 日', craft: '脱胎漆器' },
  { id: 'e6', kind: '看了', title: '看了 · 白族扎染技艺', detail: '一针一线留下自然纹样', art: 'tie-dye', symbol: '✳', date: '10 月 22 日', craft: '扎染' }
];
let entries;
try { entries = JSON.parse(localStorage.getItem('artisan-journal') || 'null') || defaultEntries; } catch { entries = [...defaultEntries]; }
// 旧版本手账里的“漆扇”改挂到正式项目名下：漆扇是文创体验产品，名录里录入的是福州脱胎漆器髹饰技艺
if (Array.isArray(entries)) entries.forEach(entry => {
  if (entry.craft === '漆扇') entry.craft = '脱胎漆器';
  if (typeof entry.title === 'string') entry.title = entry.title.replace(/福州漆扇|漆扇/g, '脱胎漆器');
});
let activeFilter = '全部';
let currentCraft = '扎染';
let currentResultCraft = '脱胎漆器';
let currentStep = 0;
let stepAttempts = 0;
let chatTurns = 0;
let chatCraft = null; // 当前对话焦点：随便问为 null，命中某项目后固定下来
let recognitionTimer;
let toastTimer;

function persist() {
  try { localStorage.setItem('artisan-journal', JSON.stringify(entries)); } catch { /* storage may be unavailable */ }
  renderJournal();
}
function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 2400);
}
function navigate(tab) {
  const screen = $(`#${tab}Screen`);
  if (!screen) return;
  $$('.screen').forEach(item => item.classList.toggle('active', item === screen));
  $$('.tab').forEach(item => item.classList.toggle('active', item.dataset.tab === tab));
  $('#appMain').scrollTo({ top: 0, behavior: 'smooth' });
  if (tab === 'journal') renderJournal();
  if (tab === 'chat') setTimeout(() => $('#chatInput').focus({ preventScroll: true }), 280);
}
function showModal(markup) {
  $('#modalContent').innerHTML = `<div class="modal-grip"></div>${markup}`;
  $('#modal').classList.remove('hidden');
  $('#modal').addEventListener('click', closeModalOnBackdrop, { once: true });
}
function closeModal() {
  clearTimeout(recognitionTimer);
  if (recorder && recorder.state !== 'inactive') {
    try { recorderStream?.getTracks().forEach(track => track.stop()); } catch {}
    recorder = null;
  }
  if (recordingClock) { clearInterval(recordingClock); recordingClock = null; recordingSeconds = 0; }
  $('#modal').classList.add('hidden');
}
function closeModalOnBackdrop(event) {
  if (event.target === $('#modal') || event.target.closest('.modal-close')) closeModal();
  else $('#modal').addEventListener('click', closeModalOnBackdrop, { once: true });
}
function addEntry(kind, craft, title, detail) {
  const item = crafts[craft] || { title: craft || '非遗', category: '非遗 · 知识库', art: 'weave-art', symbol: '◆' };
  entries.unshift({ id: `e${Date.now()}`, kind, craft, title: `${kind} · ${title || item.title}`, detail: detail || item.category, art: item.art, symbol: item.symbol, date: '刚刚' });
  persist();
}
const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
function resultModal(craft, source = 'sample', meta = null) {
  const item = crafts[craft] || crafts.脱胎漆器;
  currentResultCraft = crafts[craft] ? craft : '脱胎漆器';
  const label = source === 'audio' ? '录音识别' : source === 'photo' ? '照片识别' : source === 'manual' ? '手动选择' : '识别示例';
  const head = meta ? (meta.mock ? `${label} · 联调模式` : `${label} · AI 判断 ${Math.round((meta.confidence || 0) * 100)}%`) : `${label} · 演示模式`;
  const why = meta && meta.reason
    ? `<p style="margin:12px 0 0;padding:10px 12px;border-radius:12px;background:#f2f7fa;font-size:12.5px;line-height:1.65;color:#4a6472">判断依据：${esc(meta.reason)}</p>`
    : '';
  showModal(`<div class="modal-top"><span>${head}</span><button class="modal-close" aria-label="关闭">×</button></div><div class="result-art ${item.art}" style="background-image:url('${item.photo}')">${item.photo ? '' : item.symbol}</div><span class="eyebrow">WE FOUND A CRAFT</span><h2 class="result-title">这是 · ${item.title}</h2><p class="result-desc">${item.description}</p>${why}<div class="result-meta"><span>${item.category}</span><span>${item.maker}</span></div><div class="result-actions"><button data-result-action="百科">查看百科<small>了解来处</small></button><button data-result-action="问答">问传承人<small>继续聊聊</small></button><button data-result-action="跟学">我也要试试<small>动手体验</small></button></div>`);
  addEntry('看了', craft, item.title, source === 'audio' ? '用声音认识一门非遗' : '认识一件非遗手艺');
}
function identify(craft, source = 'sample') {
  clearTimeout(recognitionTimer);
  showModal(`<div class="modal-top"><span>正在辨认作品</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame">⌾</div><p class="demo-copy">匠人正在从纹样与做法里寻找线索…</p>`);
  recognitionTimer = setTimeout(() => resultModal(craft, source), 950);
}

/* ---------- 拍照 / 录音识别：调用后端，连不上时明确退回演示 ---------- */
// 后端地址优先级：URL 参数 ?api= > localStorage('artisan-api-base') > 本机 8000 端口
// 分享给别人时把地址拼在链接里即可，如 .../index.html?api=https://xxx.trycloudflare.com
function resolveApiBase() {
  const fromQuery = new URLSearchParams(location.search).get('api');
  if (fromQuery) {
    try {
      const u = new URL(fromQuery);
      if (u.protocol === 'https:' || u.protocol === 'http:') {
        localStorage.setItem('artisan-api-base', u.origin);
        return u.origin.replace(/\/+$/, '');
      }
    } catch (err) { /* 参数不合法就忽略，继续走下面的回退 */ }
  }
  return (localStorage.getItem('artisan-api-base') || 'http://127.0.0.1:8000').replace(/\/+$/, '');
}
const IDENTIFY_API = resolveApiBase();

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result || '');
      const comma = raw.indexOf(',');
      resolve(comma >= 0 ? raw.slice(comma + 1) : raw);
    };
    reader.onerror = () => reject(reader.error || new Error('读取文件失败'));
    reader.readAsDataURL(file);
  });
}

async function callIdentify(path, file, key) {
  const base64 = await fileToBase64(file);
  const res = await fetch(IDENTIFY_API + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [key]: base64, mime: file.type || '' })
  });
  const data = await res.json().catch(() => ({ error: '识别服务返回内容无法解析' }));
  if (!res.ok) throw new Error(data.error || `识别服务 HTTP ${res.status}`);
  if (data.error) throw new Error(data.error);
  return data;
}

function showRecognizing(title, art, copy) {
  clearTimeout(recognitionTimer);
  showModal(`<div class="modal-top"><span>${title}</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame ${art === '♪' ? 'sound-art' : ''}">${art}</div><p class="demo-copy">${copy}</p>`);
}

function finishIdentify(data, source) {
  clearTimeout(recognitionTimer);
  if (!data.certain || !data.craft_key) {
    if (source === 'audio') { showAudioNoMatch(data.reason); return; }
    openCandidates(data.candidates, data.reason);
    return;
  }
  resultModal(data.craft_key, source, { reason: data.reason, confidence: data.confidence, mock: !!data.mock });
}

// 录音入口只覆盖声音类非遗（京剧、皮影戏、古琴艺术），其余项目引导回拍照
function showAudioNoMatch(reason) {
  const msg = esc(reason || '这段声音里没有唱腔、锣鼓或丝弦的线索。');
  showModal(`<div class="modal-top"><span>AUDIO · 没找到声音类非遗</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame sound-art">♪</div><p class="demo-copy">${msg}<br><span style="color:#94a7ab">录音只辨京剧、皮影戏、古琴艺术三类；漆器、剪纸、竹编这类要靠形制与工艺痕迹判断，拍下来更准。</span></p><div class="choice-sheet"><button class="choice-option" id="audioToPhoto"><span class="option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8.5a2 2 0 0 1 2-2h1.4l1.1-2h7l1.1 2H18a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13.2" r="3"/></svg></span><span class="option-copy"><strong>改用拍照识别</strong><small>对准作品主体拍一张</small></span><b>→</b></button></div>`);
  const btn = $('#audioToPhoto');
  if (btn) btn.addEventListener('click', () => { closeModal(); setTimeout(() => $('#photoGalleryInput').click(), 60); });
}

function fallbackIdentify(source, error) {
  const pool = source === 'audio' ? audioCrafts : ['脱胎漆器', '扎染', '竹编'];
  const craft = pool[Math.floor(Math.random() * pool.length)];
  const raw = (error && error.message) || '';
  console.warn('[identify] 未连上识别服务，退回演示结果：', raw);
  let tip = '未连上识别服务，本次按演示结果展示';
  if (raw.indexOf('未配置') >= 0) tip = '识别服务还没配置模型，本次按演示结果展示';
  else if (raw.indexOf('Key') >= 0 || raw.indexOf('KEY') >= 0) tip = 'API Key 还没填对，本次按演示结果展示';
  else if (raw.indexOf('HTTP') >= 0) tip = '识别服务返回了错误，本次按演示结果展示';
  toast(tip);
  resultModal(craft, source, null);
}

async function identifyImageFile(file) {
  showRecognizing('正在辨认作品', '⌾', '匠人正在从纹样与做法里寻找线索…');
  try {
    finishIdentify(await callIdentify('/api/identify', file, 'image_base64'), 'photo');
  } catch (error) {
    fallbackIdentify('photo', error);
  }
}

async function identifyAudioFile(file) {
  showRecognizing('正在辨认声音', '♪', '匠人正从旋律、唱腔与演奏里寻找线索…');
  try {
    finishIdentify(await callIdentify('/api/identify-audio', file, 'audio_base64'), 'audio');
  } catch (error) {
    fallbackIdentify('audio', error);
  }
}

function openCandidates(names, reason) {
  const list = (Array.isArray(names) ? names : []).filter(name => crafts[name]);
  const picks = list.length ? list : ['脱胎漆器', '扎染', '竹编'];
  const title = list.length ? '这件作品有点特别' : '没认出这是哪一项';
  const note = reason
    ? `<p class="result-desc">${esc(reason)}</p>`
    : `<p class="result-desc">这张图里能看到的线索还不够明确，选一个最接近的继续了解，或者用文字描述让传承人帮你看看。</p>`;
  const retry = list.length ? '' : '<p class="result-desc">换个更近、更清楚的角度重拍一次，命中率会高很多。</p>';
  showModal(`<div class="modal-top"><span>IDENTIFY · 可能的手艺</span><button class="modal-close" aria-label="关闭">×</button></div><h2 class="result-title">${title}</h2>${note}${retry}${picks.map(name => {
    const item = crafts[name];
    return `<button class="candidate" data-candidate="${name}"><span class="candidate-art ${item.art}" style="background-image:url('${item.photo}')">${item.photo ? '' : item.symbol}</span><span><strong>${item.title}</strong><small>${item.category}</small></span><b>→</b></button>`;
  }).join('')}<button class="delete-link" id="noMatchBtn">都不太像？用文字描述，让传承人帮你看看</button>`);
}
function updateStep() {
  const step = lessonSteps[currentStep];
  $('#lessonName').textContent = step.title;
  $('#lessonDesc').textContent = step.description;
  $('#lessonTip').textContent = step.tip;
  $('#lessonCraft').textContent = currentCraft === '扎染' ? '扎染体验' : `${currentCraft}体验`;
  $('#stepCount').textContent = `第 ${currentStep + 1} 步 · 共 ${lessonSteps.length} 步`;
  $('#stepNumber').textContent = String(currentStep + 1).padStart(2, '0');
  const item = crafts[currentCraft] || crafts.扎染;
  $('#lessonVisual').style.backgroundImage = `linear-gradient(160deg,rgba(18,34,48,.18),rgba(18,34,48,.05)),url('${item.photo}')`;
  $('#stepTrack').innerHTML = lessonSteps.map((_, index) => `${index ? `<span class="step-link ${index <= currentStep ? 'done' : ''}"></span>` : ''}<button type="button" class="step-dot ${index < currentStep ? 'done' : index === currentStep ? 'current' : ''}" data-step="${index}" aria-label="跳到第 ${index + 1} 步">${index < currentStep ? '✓' : index + 1}</button>`).join('');
  $('#lessonFeedback').classList.add('hidden');
  $('#checkStep').onclick = null;
  $('#checkStep').querySelector('strong').textContent = '拍好啦，让匠人看看';
  $('#checkStep').disabled = false;
  $('#checkStep').style.opacity = '1';
}
function startLesson(course = '扎染方巾') {
  const hit = detectCraft(course);
  const key = hit ? craftKeyOf(hit) : /竹/.test(course) ? '竹编' : '扎染';
  const own = crafts[key] && crafts[key].steps;
  if (!own || !own.length) {
    toast(`${(crafts[key] && crafts[key].title) || key}这一类暂时没有整理出动手步骤，可以先问问它的来历`);
    return;
  }
  currentCraft = key;
  lessonSteps = own;
  currentStep = Number(localStorage.getItem(`lesson-step-${currentCraft}`) || 0);
  if (currentStep >= lessonSteps.length) currentStep = 0;
  $('#courseList').classList.add('hidden');
  $('#lessonView').classList.remove('hidden');
  updateStep();
  $('#learnScreen').scrollTo?.(0, 0);
  $('#appMain').scrollTo({ top: 0, behavior: 'smooth' });
}
function mockStepCheck() {
  const button = $('#checkStep');
  button.disabled = true;
  button.style.opacity = '.65';
  button.querySelector('strong').textContent = '匠人正在看你的作品…';
  setTimeout(() => {
    stepAttempts += 1;
    const feedback = $('#lessonFeedback');
    feedback.classList.remove('hidden', 'good', 'mid', 'bad');
    if (stepAttempts % 3 === 1) {
      feedback.classList.add('mid');
      feedback.innerHTML = `<strong>有个小地方可以调整</strong><br />${lessonSteps[currentStep].tip} 调整好可以再拍一次。`;
      button.disabled = false;
      button.style.opacity = '1';
      button.querySelector('strong').textContent = '再拍一次，让匠人看看';
    } else {
      feedback.classList.add('good');
      feedback.innerHTML = '<strong>这一步做得很稳！</strong><br />动作到位，松紧也合适。我们继续下一步吧。';
      button.querySelector('strong').textContent = '已通过 · 继续下一步';
      button.disabled = false;
      button.style.opacity = '1';
      button.onclick = advanceStep;
    }
  }, 1100);
}
function advanceStep() {
  $('#checkStep').onclick = null;
  $('#checkStep').querySelector('strong').textContent = '拍好啦，让匠人看看';
  if (currentStep < lessonSteps.length - 1) {
    currentStep += 1;
    stepAttempts = 0;
    try { localStorage.setItem(`lesson-step-${currentCraft}`, String(currentStep)); } catch {}
    updateStep();
    $('#lessonVisual').classList.add('pulse');
    setTimeout(() => $('#lessonVisual').classList.remove('pulse'), 550);
    return;
  }
  try { localStorage.removeItem(`lesson-step-${currentCraft}`); } catch {}
  addEntry('做了', currentCraft, `我的第一件${currentCraft}作品`, '完成了全部跟学步骤');
  $('#statWorks').textContent = String(Number($('#statWorks').textContent) + 1);
  showModal(`<div class="modal-top"><span>A SMALL MASTERPIECE</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame">✳</div><span class="eyebrow">你完成了一件手艺</span><h2 class="result-title">把耐心，染成了喜欢的样子。</h2><p class="result-desc">每一道纹路都只属于你。作品和这段跟学旅程已经收进手账。</p><button class="modal-primary" id="finishLesson">收进我的手账</button>`);
  $('#modalContent').addEventListener('click', event => { if (event.target.id === 'finishLesson') { closeModal(); $('#courseList').classList.remove('hidden'); $('#lessonView').classList.add('hidden'); navigate('journal'); } });
}
function jumpToStep(index) {
  if (index < 0 || index >= lessonSteps.length) return;
  if (index === currentStep) return;
  currentStep = index;
  stepAttempts = 0;
  try { localStorage.setItem(`lesson-step-${currentCraft}`, String(currentStep)); } catch {}
  updateStep();
  $('#appMain').scrollTo({ top: 0, behavior: 'smooth' });
  toast(index > 0 ? `已跳到第 ${index + 1} 步` : '回到第一步');
}
function renderJournal() {
  const visible = entries.filter(entry => activeFilter === '全部' || entry.kind === activeFilter);
  $('#timeline').innerHTML = visible.length ? visible.map(entry => { const item = crafts[entry.craft] || { photo: '', art: 'weave-art', symbol: '◆' }; return `<div class="timeline-entry" data-entry="${entry.id}"><span class="timeline-thumb" style="background:#dbe7ef url('${item.photo}') center/cover no-repeat"></span><div class="timeline-text"><span class="tag">${entry.kind}</span><strong>${entry.title}</strong><small>${entry.detail}</small></div><span class="timeline-date">${entry.date}</span><button class="entry-more" aria-label="更多">···</button></div>`; }).join('') : '<div class="empty-state">这一类足迹还没有，去发现一门手艺吧。</div>';
  $('#statKinds').textContent = String(new Set(entries.map(entry => entry.craft)).size);
  $('#statWorks').textContent = String(entries.filter(entry => entry.kind === '做了').length);
  $('#statQuestions').textContent = String(entries.filter(entry => entry.kind === '问了').length);
}
function showEntry(id) {
  const entry = entries.find(item => item.id === id);
  if (!entry) return;
  const item = crafts[entry.craft] || { title: entry.craft, encyclopedia: '这项手艺的资料还在整理中，可以先问它的来历和做法。', photo: '', art: 'weave-art', symbol: '◆' };
  const askQuestion = String(entry.title).replace(/^(看了|问了|做了) · /, '');
  const kbItem = KB_ITEMS.find(candidate => craftKeyOf(candidate) === entry.craft);
  const askBody = kbItem ? (((pickQA(kbItem, askQuestion).pair || {}).a) || kbItem.summary) : '传承人说：这门手艺的细节还在整理，可以先问它的来历和做法。';
  const body = entry.kind === '问了' ? askBody : entry.kind === '做了' ? '跟着步骤完成了手作。手艺需要一点耐心，你已经把它变成了自己的作品。' : item.encyclopedia;
  showModal(`<div class="modal-top"><span>${entry.date} · ${entry.kind}</span><button class="modal-close" aria-label="关闭">×</button></div><div class="detail-photo ${entry.art}" style="background-image:url('${item.photo}')">${item.photo ? '' : entry.symbol}</div><h2 class="result-title">${entry.title.replace(/^(看了|问了|做了) · /, '')}</h2><p class="detail-copy">${body}</p><button class="modal-primary" data-entry-action="${entry.kind === '问了' ? '问答' : entry.kind === '做了' ? '跟学' : '百科'}" data-entry-id="${entry.id}">继续探索</button><button class="delete-link" id="deleteEntry" data-id="${entry.id}">删除这条足迹</button>`);
}
function renderAnswer(question) {
  const text = question.toLowerCase();
  let answer;
  if (/脱胎|漆|髹|扇|水面/.test(text)) {
    if (/为什么叫|名字|由来/.test(text)) answer = { direct: '因为它先用泥胎、木模或石膏塑出外形，裱上夏布和漆灰，等干硬后把里面的胎脱掉，只剩一层布漆壳，所以叫“脱胎”。', extra: '这门手艺由清代福州漆艺人沈绍安创立，他受唐代夹纻技法启发复原了脱胎做法，让漆器从木胎变成轻薄的布胎。', source: '参考：福州脱胎漆器髹饰技艺（Ⅷ-54）· 非遗知识库' };
    else if (/花纹|纹样|图案|装饰|描金|螺钿/.test(text)) answer = { direct: '花纹是在髹涂、推光后的漆面上做的：用彩漆晕金、朱漆描金、台花嵌螺钿等技法一层层装点，推得越亮，最后光亮如镜。', extra: '漆面要先用生漆反复髹涂、每层阴干打磨，再用细瓦灰推光，花纹才挂得住、也才显得通透。', source: '参考：福州脱胎漆器髹饰技艺（Ⅷ-54）· 非遗知识库' };
    else if (/轻|重/.test(text)) answer = { direct: '它不用厚重的木胎：先用泥胎、木模或石膏塑出外形，裱上夏布和漆灰，干硬后把里面的胎脱掉，只剩一层轻巧的布漆壳，所以轻得能飘起来。', extra: '脱掉胎之后，靠一层层髹漆、打磨、推光来保证强度和亮度，每刷一遍都要阴干再磨，最后用细瓦灰和植物油推出镜面光。', source: '参考：福州脱胎漆器髹饰技艺（Ⅷ-54）· 非遗知识库' };
    else answer = { direct: '福州脱胎漆器要经过塑胎、裱布、上灰、髹漆、推光几道大工序，一件成品往往要做上几个月。', extra: '先用泥胎或木模塑形、裱上夏布和漆灰，干后脱去内胎，再反复髹漆打磨，最后推光、描金装饰。', source: '参考：福州脱胎漆器髹饰技艺（Ⅷ-54）· 非遗知识库' };
  }
  else if (/扎|染|蓝|靛/.test(text)) answer = { direct: '扎染的蓝白花纹，来自“先扎后染”：线扎紧的地方染料进不去，拆开后就留下白色。', extra: '蓝靛是一种从植物中提取的染料。布料接触空气后颜色会慢慢变蓝，所以染色时常要反复浸染。', source: '参考：白族扎染技艺（Ⅷ-26）· 非遗知识库' };
  else if (/竹|编/.test(text)) answer = { direct: '竹编要先把竹子剖成粗细均匀的篾条，再一上一下交错编起来。', extra: '“篾”就是把竹子剖开、刮薄后得到的细长竹片。篾条粗细会影响作品的纹样和软硬。', source: '参考：东阳竹编（Ⅶ-51）· 非遗知识库' };
  else if (/非遗|手艺|传承|传统/.test(text)) answer = { direct: '非遗，就是一代代人传下来、至今还在生活里使用和实践的文化与手艺。', extra: '它不只是老物件，也包括节庆、表演、技艺和人们一起守护的知识。', source: '参考：联合国教科文组织非遗知识 · mock 摘要' };
  else answer = { direct: '我暂时没找到能可靠回答这个问题的非遗资料。你可以告诉我在哪看到它，或描述一下它的样子和用途。', extra: '补充更多线索后，我会帮你从对应的传统技艺里继续找答案。', source: '当前问题未匹配到可靠资料' };
  return `<div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人 · 直接回答</small><div class="bubble">${answer.direct}<br /><br />${answer.extra}</div><details class="sources"><summary>参考资料 · 1 条</summary><p>${answer.source}</p></details></div></div>`;
}
function setChatTopic(item) {
  $('#chatTopic').textContent = item ? `非遗 · ${item.short}` : '非遗 · 随便问';
}
function showCraftPicker() {
  const row = (id, title, meta, active, icon, fallback) => {
    const artStyle = icon
      ? `background:#eef3f6 url('${icon}') center/cover no-repeat`
      : 'background:#eef3f6;color:#3f7d9b;font-size:16px';
    return `<button class="candidate" data-kb-topic="${id}"><span class="candidate-art" style="${artStyle}">${icon ? '' : fallback}</span><span><strong>${title}</strong><small>${meta}</small></span><b>${active ? '✓' : '→'}</b></button>`;
  };
  const freeRow = row('__free', '非遗 · 随便问', '不锁定项目，说到哪一项我就切到哪一项', !chatCraft, '', '随');
  const rows = KB_ITEMS.map(item => row(item.id, item.name, `${item.category} · ${item.origin}`, !!chatCraft && chatCraft.id === item.id, iconOf(item), (item.short || '◆').slice(0, 1))).join('');
  showModal(`<div class="modal-top"><span>TOPICS · 换个话题</span><button class="modal-close" aria-label="关闭">×</button></div><h2 class="result-title">想聊哪一项？</h2><p class="result-desc">15 项国家级非遗都在库里。选“随便问”就什么都不锁定，你提到哪项我就切到哪项。</p><div style="max-height:54vh;overflow:auto;-webkit-overflow-scrolling:touch">${freeRow}${rows}</div>`);
}
function sendQuestion(question) {
  const clean = question.trim();
  if (clean.length < 4) { toast('再多说一点点，我更容易帮你找到线索'); return; }

  // 先看这句话里提到了哪一项，命中就把“正在聊”切过去
  const mentioned = detectCraft(clean);
  if (mentioned) { chatCraft = mentioned; setChatTopic(mentioned); }
  const focus = mentioned || chatCraft;

  if (!focus && !/非遗|手艺|传统|文化|传承|技艺|匠/.test(clean) && chatTurns === 0) {
    $('#chatMessages').insertAdjacentHTML('beforeend', `<div class="message user"><div class="bubble-wrap"><div class="bubble">${escapeHTML(clean)}</div></div></div><div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人</small><div class="bubble">这个问题好像和非遗手艺没有直接关系。我主要聊传统技艺、节庆和传承故事。可以告诉我你在哪看到的，或者描述一下作品吗？</div></div></div>`);
    return;
  }
  if (chatTurns >= 5) { toast('这一轮已经聊了 5 个问题，开个新对话继续吧'); return; }
  chatTurns += 1;
  const messages = $('#chatMessages');
  messages.querySelector('.suggestions')?.remove();
  messages.insertAdjacentHTML('beforeend', `<div class="message user"><div class="bubble-wrap"><div class="bubble">${escapeHTML(clean)}</div></div></div><div class="typing message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>${focus ? `${focus.short}的传承人正在想一想…` : '传承人正在想一想…'}</small></div></div>`);
  messages.scrollTop = messages.scrollHeight;
  setTimeout(() => {
    messages.querySelector('.typing')?.remove();
    const wantsList = !focus && /哪些|都有|多少项|列表|有哪/.test(clean) && /非遗|项目|手艺/.test(clean);
    messages.insertAdjacentHTML('beforeend', wantsList ? renderKBList() : focus ? renderKBAnswer(focus, clean) : renderAnswer(clean));
    const prompts = focus ? kbPrompts(focus, clean) : ['这 15 项国家级非遗都有哪些？', '非遗和普通老物件有什么区别？'];
    if (prompts.length) {
      messages.insertAdjacentHTML('beforeend', `<div class="suggestions"><span>接下来还可以问</span>${prompts.map(prompt => `<button class="suggestion">${prompt}</button>`).join('')}</div>`);
    }
    messages.scrollTop = messages.scrollHeight;
    addEntry('问了', focus ? craftKeyOf(focus) : '非遗', clean.length > 15 ? `${clean.slice(0, 15)}…` : clean, focus ? `和传承人聊${focus.short}` : '和传承人聊非遗');
  }, 760);
}
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
function shareCard() {
  const kinds = new Set(entries.map(entry => entry.craft)).size;
  const works = entries.filter(entry => entry.kind === '做了').length;
  const questions = entries.filter(entry => entry.kind === '问了').length;
  showModal(`<div class="modal-top"><span>YOUR HERITAGE CARD · 01 / 03</span><button class="modal-close" aria-label="关闭">×</button></div><div class="share-card"><span class="eyebrow">我的非遗手账</span><h2>和手艺相遇的日子</h2><p>每一次好奇，都让老手艺离我更近一点。</p><div class="share-stats"><div><strong>${kinds}</strong><small>解锁门类</small></div><div><strong>${works}</strong><small>完成手作</small></div><div><strong>${questions}</strong><small>问过问题</small></div></div><span class="eyebrow">匠人说 · 让非遗走进日常</span></div><button class="modal-primary" id="copyShare">复制分享文案</button><button class="text-button" id="nextCard" style="width:100%">换一款卡片样式　↻</button>`);
  const card = $('.share-card', $('#modalContent'));
  $('#modalContent').addEventListener('click', async event => {
    if (event.target.id === 'copyShare') {
      const text = `我在匠人说解锁了 ${kinds} 个非遗门类，完成 ${works} 件手作，和传承人聊了 ${questions} 个问题。每一次好奇，都让老手艺离我更近一点。`;
      try { await navigator.clipboard.writeText(text); toast('分享文案已复制'); } catch { toast(text); }
    }
    if (event.target.id === 'nextCard') {
      const looks = ['linear-gradient(145deg,#dcecf0,#f1e5d4)', 'linear-gradient(145deg,#e6e8d9,#d4e7e7)', 'linear-gradient(145deg,#f0dfd2,#e9eee5)'];
      card.style.background = looks[(Number(card.dataset.look || 0) + 1) % looks.length];
      card.dataset.look = String((Number(card.dataset.look || 0) + 1) % looks.length);
      $('.modal-top span', $('#modalContent')).textContent = `YOUR HERITAGE CARD · 0${Number(card.dataset.look) + 1} / 03`;
    }
  });
}

$$('.tab').forEach(button => button.addEventListener('click', () => navigate(button.dataset.tab)));
$$('[data-go]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.go === 'learn') { $('#lessonView').classList.add('hidden'); $('#courseList').classList.remove('hidden'); }
  navigate(button.dataset.go);
}));
$('#cameraBtn').addEventListener('click', showPhotoChoice);
$('#uploadBtn').addEventListener('click', showPhotoChoice);
$('#photoCaptureInput').addEventListener('change', handlePhoto);
$('#photoGalleryInput').addEventListener('change', handlePhoto);
$('#audioMethodBtn').addEventListener('click', showAudioPanel);
$('#audioInput').addEventListener('change', event => {
  const file = event.target.files && event.target.files[0];
  event.target.value = '';
  if (file) identifyAudioFile(file);
});
function handlePhoto(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  event.target.value = '';
  identifyImageFile(file);
}
function showPhotoChoice() {
  showModal(`<div class="modal-top"><span>识别方式</span><button class="modal-close" aria-label="关闭">×</button></div><div class="choice-sheet"><div class="sheet-title">用照片认识非遗</div><div class="sheet-sub">选择一张清晰呈现作品主体的照片</div><button class="choice-option" id="choiceCapture"><span class="option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8.5a2 2 0 0 1 2-2h1.4l1.1-2h7l1.1 2H18a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13.2" r="3"/></svg></span><span class="option-copy"><strong>现场拍照</strong><small>对准身边的非遗作品拍摄</small></span><b>→</b></button><button class="choice-option" id="choiceGallery"><span class="option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4" width="17" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.6"/><path d="M6 17.5 10.2 13l3 3 2.4-2.3 2.4 2.7"/></svg></span><span class="option-copy"><strong>从相册选择</strong><small>上传图库中的作品照片</small></span><b>→</b></button></div>`);
  $('#modalContent').addEventListener('click', event => {
    if (event.target.id === 'choiceCapture') { closeModal(); setTimeout(() => $('#photoCaptureInput').click(), 60); }
    if (event.target.id === 'choiceGallery') { closeModal(); setTimeout(() => $('#photoGalleryInput').click(), 60); }
  });
}
const audioCrafts = ['古琴艺术', '京剧', '皮影戏'];
let recorder = null, recorderStream = null, recorderChunks = [], recordingClock = null, recordingSeconds = 0;
function showAudioPanel() {
  showModal(`<div class="modal-top"><span>AUDIO · 用声音认识非遗</span><button class="modal-close" aria-label="关闭">×</button></div><div class="recorder-panel"><div class="record-stage"><span class="record-ring"></span><button class="record-btn" id="recordToggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/></svg><strong>开始录音</strong><small>对准声音来源</small></button></div><div class="wave-bars hidden" id="waveBars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="recorder-timer hidden" id="recordTimer">00:00</div><p class="recorder-hint">录下一段唱腔、念白、锣鼓或丝弦。这条路只辨京剧、皮影戏、古琴艺术，其他手艺请用拍照识别。</p><button class="recorder-file" id="audioFileBtn">或从文件选择一段音频</button><div class="recorder-meta">支持 MP3、WAV、M4A · 仅用于本次识别</div></div>`);
  $('#recordToggle').addEventListener('click', toggleRecording);
  $('#audioFileBtn').addEventListener('click', () => $('#audioInput').click());
}
function toggleRecording() {
  const btn = $('#recordToggle');
  if (btn.classList.contains('disabled')) return;
  if (!recorder || recorder.state === 'inactive') {
    startRecording(btn);
  } else {
    stopRecording();
  }
}
async function startRecording(btn) {
  const mic = document.querySelector('.record-btn svg');
  const wave = $('#waveBars'), timer = $('#recordTimer');
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
    recorderStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    toast('无法访问麦克风，可改用文件上传音频');
    btn.disabled = true; btn.classList.add('disabled'); btn.querySelector('strong').textContent = '麦克风不可用';
    return;
  }
  recorderChunks = [];
  const captureMime = (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) ? 'audio/webm' : '';
  recorder = captureMime ? new MediaRecorder(recorderStream, { mimeType: captureMime }) : new MediaRecorder(recorderStream);
  recorder.ondataavailable = event => { if (event.data.size) recorderChunks.push(event.data); };
  recorder.onstop = () => {
    recorderStream.getTracks().forEach(track => track.stop());
    recorder = null;
    btn.classList.remove('recording');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/></svg><strong>再录一次</strong><small>录音已完成</small>';
    clearInterval(recordingClock); recordingSeconds = 0;
    wave.classList.add('hidden'); timer.classList.add('hidden');
    if (recorderChunks.length) {
      const type = captureMime || 'audio/webm';
      const file = new File([new Blob(recorderChunks, { type })], 'recording.webm', { type });
      identifyAudioFile(file);
    } else {
      toast('这段录音没有采到声音，再试一次吧');
    }
  };
  recorder.start();
  recordingSeconds = 0;
  btn.classList.add('recording');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/></svg><strong>停止录音</strong><small>再点一下完成</small>';
  wave.classList.remove('hidden'); timer.classList.remove('hidden');
  recordingClock = setInterval(() => {
    recordingSeconds += 1;
    $('#recordTimer').textContent = String(Math.floor(recordingSeconds / 60)).padStart(2, '0') + ':' + String(recordingSeconds % 60).padStart(2, '0');
  }, 1000);
}
function stopRecording() {
  if (recorder && recorder.state !== 'inactive') recorder.stop();
}
$$('[data-sample]').forEach(button => button.addEventListener('click', () => identify(button.dataset.sample)));
$$('[data-craft]').forEach(button => button.addEventListener('click', () => { navigate('learn'); startLesson(`${button.dataset.craft}体验`); }));
$$('[data-course]').forEach(button => button.addEventListener('click', () => startLesson(button.dataset.course)));
$('#backCourses').addEventListener('click', () => { $('#lessonView').classList.add('hidden'); $('#courseList').classList.remove('hidden'); });
$('#checkStep').addEventListener('click', mockStepCheck);
$('#stepPhotoInput').addEventListener('change', event => { if (event.target.files?.length) mockStepCheck(); event.target.value = ''; });
$('#lessonVisual').addEventListener('click', () => $('#stepPhotoInput').click());
$('#demoBtn').addEventListener('click', () => showModal(`<div class="modal-top"><span>慢动作演示 · 第 ${currentStep + 1} 步</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame">${currentCraft === '扎染' ? '✳' : (crafts[currentCraft] || crafts.扎染).symbol}</div><p class="demo-copy">先看手势，再跟着自己的节奏试一试。</p><button class="modal-primary modal-close">我知道啦</button>`));
$('#stepTrack').addEventListener('click', event => {
  const dot = event.target.closest('.step-dot');
  if (dot) jumpToStep(Number(dot.dataset.step));
});
$('#skipStep').addEventListener('click', () => { if (currentStep < lessonSteps.length - 1) { currentStep += 1; updateStep(); } else toast('已经是最后一步啦'); });
$('#sendBtn').addEventListener('click', () => { const input = $('#chatInput'); const value = input.value; input.value = ''; $('#charCount').textContent = '0'; sendQuestion(value); });
$('#chatInput').addEventListener('input', event => { $('#charCount').textContent = String(event.target.value.length); event.target.style.height = 'auto'; event.target.style.height = `${Math.min(event.target.scrollHeight, 100)}px`; });
$('#chatInput').addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); $('#sendBtn').click(); } });
$('#chatMessages').addEventListener('click', event => { const button = event.target.closest('.suggestion'); if (button) sendQuestion(button.textContent); });
$('#newChatBtn').addEventListener('click', () => { chatTurns = 0; chatCraft = null; setChatTopic(null); $('#chatMessages').innerHTML = '<div class="day-divider">今天 · 新的对话</div><div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人</small><div class="bubble">我们从一门新手艺开始吧。你最近对什么感到好奇？</div></div></div>'; toast('已经为你开启新的对话'); });
$('#topicBtn').addEventListener('click', showCraftPicker);
$('#journalFilters').addEventListener('click', event => { const button = event.target.closest('button[data-filter]'); if (!button) return; activeFilter = button.dataset.filter; $$('#journalFilters button').forEach(item => item.classList.toggle('selected', item === button)); renderJournal(); });
$('#timeline').addEventListener('click', event => { const entry = event.target.closest('.timeline-entry'); if (entry) showEntry(entry.dataset.entry); });
$('#shareBtn').addEventListener('click', shareCard);
let installPromptEvent = null;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPromptEvent = event;
  $('#installBtn').hidden = false;
});
$('#installBtn').addEventListener('click', async () => {
  if (!installPromptEvent) {
    toast('请使用浏览器菜单中的“添加到主屏幕”');
    return;
  }
  installPromptEvent.prompt();
  await installPromptEvent.userChoice;
  installPromptEvent = null;
  $('#installBtn').hidden = true;
});
window.addEventListener('appinstalled', () => {
  $('#installBtn').hidden = true;
  toast('匠人说已添加到主屏幕');
});
$('#nativeShareBtn').addEventListener('click', async () => {
  const shareData = { title: '匠人说 · 非遗生活', text: '来认识身边的非遗手艺，跟着传承人一起体验。', url: location.href };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') toast('分享暂不可用，请复制浏览器地址'); }
    return;
  }
  try {
    await navigator.clipboard.writeText(location.href);
    toast('应用链接已复制，可以发给朋友了');
  } catch {
    toast('复制浏览器地址栏里的链接，分享给朋友');
  }
});
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
$('#modalContent').addEventListener('click', () => {});
$('#modal').addEventListener('click', event => {
  if (event.target === $('#modal') || event.target.closest('.modal-close')) { closeModal(); return; }
  const kbTopic = event.target.closest('[data-kb-topic]');
  if (kbTopic) {
    if (kbTopic.dataset.kbTopic === '__free') {
      chatCraft = null;
      setChatTopic(null);
      closeModal();
      $('#chatMessages').insertAdjacentHTML('beforeend', `<div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人 · 随便聊</small><div class="bubble">好，不锁定项目了。你直接说想聊的手艺，或者说说你看到的东西，我来自动认。</div></div></div>`);
      $('#chatMessages').scrollTop = $('#chatMessages').scrollHeight;
      toast('已切回随便问');
      return;
    }
    const picked = KB_ITEMS.find(item => item.id === kbTopic.dataset.kbTopic);
    if (picked) {
      chatCraft = picked;
      setChatTopic(picked);
      closeModal();
      $('#chatMessages').insertAdjacentHTML('beforeend', `<div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人 · ${picked.short}</small><div class="bubble">我们聊聊${picked.name}吧。你想先知道它的来历、做法，还是现在还有谁在做？</div></div></div>`);
      $('#chatMessages').scrollTop = $('#chatMessages').scrollHeight;
      toast(`已切到${picked.name}`);
    }
    return;
  }
  const candidate = event.target.closest('[data-candidate]');
  if (candidate) { const name = candidate.dataset.candidate; resultModal(name, 'manual'); return; }
  if (event.target.id === 'noMatchBtn') { closeModal(); navigate('chat'); $('#chatInput').value = '我看到一件不太确定的手工艺品，能帮我辨认吗？'; $('#charCount').textContent = String($('#chatInput').value.length); return; }
  const action = event.target.closest('[data-result-action]');
  if (action) {
    const label = action.dataset.resultAction;
    const matched = crafts[currentResultCraft] ? currentResultCraft : '脱胎漆器';
    const kbItem = KB_ITEMS.find(item => craftKeyOf(item) === matched) || null;
    closeModal();
    if (label === '问答') { chatCraft = kbItem; setChatTopic(kbItem); navigate('chat'); $('#chatInput').value = `我想了解${kbItem ? kbItem.short : matched}是怎么做出来的？`; $('#charCount').textContent = String($('#chatInput').value.length); }
    else if (label === '跟学') { navigate('learn'); startLesson(`${matched}体验`); }
    else { const item = crafts[matched]; showModal(`<div class="modal-top"><span>CRAFT NOTES · 百科</span><button class="modal-close" aria-label="关闭">×</button></div><div class="detail-photo ${item.art}" style="background-image:url('${item.photo}')">${item.photo ? '' : item.symbol}</div><h2 class="result-title">${item.title}</h2><p class="detail-copy">${item.encyclopedia}</p><div class="result-actions"><button data-result-action="问答">问传承人<small>继续聊聊</small></button><button data-result-action="跟学">我也要试试<small>动手体验</small></button></div>`); }
    return;
  }
  const detailAction = event.target.closest('[data-entry-action]');
  if (detailAction) {
    const label = detailAction.dataset.entryAction;
    const entry = entries.find(item => item.id === detailAction.dataset.entryId);
    const craft = (entry && crafts[entry.craft]) ? entry.craft : '';
    const kbItem = KB_ITEMS.find(item => craftKeyOf(item) === craft) || null;
    closeModal();
    if (label === '跟学') { navigate('learn'); startLesson(`${craft || '扎染'}体验`); }
    else if (label === '问答') { chatCraft = kbItem; setChatTopic(kbItem); navigate('chat'); $('#chatInput').value = `我想了解${kbItem ? kbItem.short : craft || '这门手艺'}是怎么做出来的？`; $('#charCount').textContent = String($('#chatInput').value.length); }
    else { const item = crafts[craft] || { art: 'weave-art', symbol: '◆', photo: '', title: craft || '非遗', encyclopedia: '这项手艺的资料还在整理中，可以先问它的来历和做法。' }; showModal(`<div class="modal-top"><span>CRAFT NOTES · 百科</span><button class="modal-close" aria-label="关闭">×</button></div><div class="detail-photo ${item.art}" style="background-image:url('${item.photo}')">${item.photo ? '' : item.symbol}</div><h2 class="result-title">${item.title}</h2><p class="detail-copy">${item.encyclopedia}</p><div class="result-actions"><button data-result-action="问答">问传承人<small>继续聊聊</small></button><button data-result-action="跟学">我也要试试<small>动手体验</small></button></div>`); }
    return;
  }
  if (event.target.id === 'deleteEntry') {
    const entry = entries.find(item => item.id === event.target.dataset.id);
    entries = entries.filter(item => item.id !== event.target.dataset.id);
    closeModal();
    persist();
    toast(entry?.kind === '做了' ? '足迹已删除，已点亮的徽章会保留' : '这条足迹已删除');
  }
});
renderJournal();

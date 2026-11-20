# Red Dusk — Goodbye Forever

在 Remotion Studio 选择 `RedDuskGoodbyeForever`。成片是 [red-dusk-goodbye-forever.mp4](../../../out/red-dusk-goodbye-forever.mp4)，1920 × 1080，30 fps。英国篇保留了独立的 `HerMostLoyalResistance` 合成。 [英国篇归档](../hmmlr/README.md)

## 音乐与剪辑

全片使用用户提供的 [《Goodbye Forever》合成器版](../../../reference/hoi4mainthemeallies.ogg)。原始 OGG 为 44.1 kHz 双声道，标记时长 270.117755 秒。画面按 30 fps 向上取整为 8,104 帧。开头的静音、第一声合成器和末尾余响均保留。

- 对实际音轨以 22.05 kHz 分析单声道，计算 2,048 点 Hann 窗的谱通量、分频能量和重音间隔。结果含 1,430 个候选音头与每秒 10 点的能量曲线。 [分析脚本](analysis/analyze-audio.mjs) · [完整频段数据](analysis/audio-profile.json) · [候选音头](analysis/onset-candidates.json)
- 主脉冲约每 0.499 秒一拍，折合约 120.3 BPM。0.998 秒与 0.748 秒的音头间隔也贯穿主体。剪辑从实际音头中标出 44 个切点和 176 个镜头内部重音。 [剪辑时间与转场](analysis/edit-cues.json)
- 约 1:20 起，中频合成器层逐步增厚，1:36–2:02 的低频和中频密度较高。3:16–3:44 的中频相对收敛，给空楼、福罗斯和《天鹅湖》留出呼吸。3:44.310 后，把回到前景的中频落在紧急状态公告上。最后一组明显的脉冲落在 4:22.064，之后让波形和散落的碎屑随余响一起沉下去。

从项目目录运行 `node src/films/red-dusk/analysis/analyze-audio.mjs` 可以复跑频谱和候选音头分析。`edit-cues.json` 保存人工选取的画面切点，`scenes/` 下是分段可编辑的动画。

## 画面与叙事

示波器是全片反复出现的图形。前段的指针、齿轮和送纸机构共用一套脉冲。联盟中央和共和国的两个讯号随后各走各的，临到解体，连纸张的边界和排版也不能保持原位。画面由原创 SVG 图形、逐帧路径、排版、遮罩和分层转场组成，文字以俄语为主。切尔诺贝利、阿拉木图十二月事件和波罗的海人链镜头使用相应地区的名称。

| 成片时间 | 画面 |
| --- | --- |
| 0:00–0:49.557 | 调试信号、计划系统、公开性、切尔诺贝利与普里皮亚季疏散 |
| 0:49.557–1:23.560 | 空货架、配给票、兑换卢布、两种柜台、工厂与「暴风雪」号 |
| 1:23.560–2:09.556 | 阿富汗撤军、阿拉木图、波罗的海人链、柏林墙、华约与城市抗议 |
| 2:09.556–3:01.308 | 人民代表大会、俄罗斯共和国主权宣言、联盟条约草案、公投、罢工与报刊 |
| 3:01.308–3:44.310 | 两套电话信号、研究机构账本、莫斯科、福罗斯、《天鹅湖》和中断的电视 |
| 3:44.310–4:07.557 | 国家紧急状态委员会、莫斯科街头、俄罗斯共和国苏维埃大厦及八月政变失败 |
| 4:07.557–4:30.118 | 苏联解体、文书失序、「ПРОЩАЙ НАВСЕГДА」与余响 |

政变失败和 1991 年 12 月解体是叙事落点。齿轮、波形、十五个散开的单元、扯裂的纸和故障界面是象征性画面。文书内容和标牌是为影片制作的简写与插画。

## 史料与素材

- 公开性与改革演说、切尔诺贝利的苏联电视讲话。 [联合国档案，戈尔巴乔夫在联大的发言](https://digitallibrary.un.org/record/54974/files/A_43_PV.72-EN.pdf) · [联合国档案，切尔诺贝利讲话](https://digitallibrary.un.org/record/691255/files/CD_732_AppendixI_Vol.II-EN.pdf)
- 阿富汗撤军、十二月事件、波罗的海人链和柏林墙。 [联合国档案](https://digitallibrary.un.org/record/54208?ln=en) · [哈萨克斯坦国家图书馆](https://nblib.library.kz/elib/library.kz/VIRTUALNIE%20VISTAVKI/%D0%94%D0%B5%D0%BA%D0%B0%D0%B1%D1%80%D1%8C1986-2016.pdf) · [联合国教科文组织世界记忆档案](https://www.unesco.org/en/memory-world/baltic-way-human-chain-linking-three-states-their-drive-freedom) · [德国联邦档案馆](https://www.bundesarchiv.de/themen-entdecken/online-entdecken/storys/die-stasi-im-jahr-1989/november-1989/)
- 苏联国家银行兑换 50 与 100 卢布纸币记录、合作社法和「暴风雪」号飞行资料。 [俄罗斯央行档案](https://www.cbr.ru/Content/Document/File/48222/ArchivalFonds_012.pdf) · [俄罗斯国家图书馆](https://search.rsl.ru/ru/record/01001426964) · [「暴风雪」号首航记录](https://www.buran.ru/htm/firstext.htm)
- 俄罗斯共和国主权宣言和 3 月公投。 [总统图书馆，主权宣言](https://www.prlib.ru/history/619308) · [总统图书馆，公投照片](https://www.prlib.ru/item/405919)
- 八月政变、大厦内发布的文告、电视转播及街头旗帜。 [紧急状态委员会文书影印](https://gkchp.sssr.su/gkchp.pdf) · [叶利钦档案，苏维埃大厦文告](https://yeltsin.ru/archive/paperwork/18276/) · [叶利钦档案，广播与路障](https://yeltsin.ru/news/polnaya-versiya-radiopriemniki-na-barrikadah/) · [八月现场照片与三色旗档案](https://yeltsin.ru/news/avgust-91go/)
- 苏联终止存在的正式文件。 [俄罗斯国家档案馆，苏联成立与解体](https://statearchive.ru/468) · [最高苏维埃《公报》1991 年第 52 期](https://vedomosti.sssr.su/1991/52/)
- Oswald、Golos Text 和 PT Mono 使用本地字体文件，并附有 SIL Open Font License。 [Oswald](fonts/oswald-OFL.txt) · [Golos Text](fonts/golostext-OFL.txt) · [PT Mono](fonts/ptmono-OFL.txt)

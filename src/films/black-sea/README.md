# Salt on Glass · 玻璃上的盐

2041 年 9 月的黑海。第一天，一只搪瓷杯在塞瓦斯托波尔的码头上晃动。第二天，海峡对岸一杯刚倒好的茶溅上窗台。最后，搬空的房间只留下一圈盐和一张复诊单。

[播放英语字幕全长 MP4](../../../out/black-sea-vessel-of-sin-en.mp4)

影片共 25 个镜头，1920 × 1080，30 fps，4526 帧。片名、地点日期和叙事字幕统一使用英语。法国医院的吊牌与总理桌牌用法语，莫斯科会议桌上的书面异议与寻人告示用俄语，土耳其诊所和采样瓶用土耳其语。配乐使用项目提供的完整双声道录音，全长 2 分 30.867 秒。[Vessel of Sin](../../../reference/Vessel%20of%20Sin.mp3)

## 音乐与剪辑

先将全曲解码，用 2048 点 Hann 窗测量四个频段的正向频谱通量，记录了 506 个起音候选。主要脉动间隔约 0.858 秒，细分约 0.429 秒，相当于每分钟约 70 拍或 140 拍。在四个八度的 48 个半音上比较音高能量与变化方向，12.6 秒的滑动窗口显示相隔约 54.9 秒的两段旋律有持续的相似性。剪辑据此选择两段各约 27.44 秒的长句，并把进入点落在原曲的实际起音上。[频段与节拍](analysis/audio-profile.json) · [起音位置](analysis/onset-candidates.json) · [旋律匹配](analysis/phrase-matches.json)

| 原曲时间 | 剪辑 |
| --- | --- |
| 0:00.000–0:27.438 | 值勤、伤员后送与留在桌上的异议。撤离仍然可行，法国总理批准首次核使用。 |
| 0:27.438–0:54.875 | 第一遍长句。9 月 17 日，法国对塞瓦斯托波尔苏联海军保障区使用一枚核武器。由杯沿反光切入损毁的工棚、担架和寻人处。 |
| 0:54.875–1:22.293 | 热线接通，车站有人避难。苏方内部意见分歧，克拉夫佐娃总统亲自授权一次有限回击。土耳其居民照常倒茶。 |
| 1:22.293–1:49.731 | 旋律再现。9 月 18 日，苏联对土耳其达达尼尔—马尔马拉地区法国远征保障区回击一次。镜头留在当地诊所，再转向英国的戒备决定和法苏停止核行动。 |
| 1:49.731–2:24.003 | 两岸取样、清理、逐人登记和安置。常规战争仍在继续，复诊单被留在窗边。 |
| 2:24.003–2:30.867 | 末次起音后，潮线和杯口的盐圈陪伴原曲自然衰减。 |

两个事件的地平线、杯沿和液面采用相近的节奏。担架的帘子、窗框、书页和水面成为转场的边缘。雨痕、尘带、衣袖、吊灯、茶水与波浪各有独立运动。[逐镜时间和动作重音](analysis/edit.json) · [节拍分析程序](analysis/analyze.mjs) · [旋律分析程序](analysis/phrases.mjs)

## 设定与画面

法国与苏联各使用一枚核武器，设定中的单次当量为 20–50 kt。两地分别有数千人死亡、更多人受伤。英国首相维持高度戒备并拒绝使用核武器。两国停止核行动，救护、寻人、环境监测和重新安置延续数年。镜头中的居民、港口、诊所和物件是为影片绘制的虚构场景。[世界观说明](../../../../../story/nato-csto/AGENTS.md) · [黑海与第三次核危机](../../../../../story/nato-csto/setting/黑海与第三次核危机.md)

莫斯科室内使用设定仓库的苏联旗帜，法国三色旗在场景内绘制。字体使用本地的 Spectral 和 Source Sans 3。[原始旗帜](../../../../../story/nato-csto/assets/flag/Flag_of_the_Soviet_Union.svg) · [Spectral 字体许可](fonts/spectral-OFL.txt) · [Source Sans 3 字体许可](fonts/source-sans-OFL.txt)

## 重放与导出

在 Remotion Studio 中选择 `BlackSeaVesselOfSin`。从项目根目录可以重算分析并单独导出此片。

```sh
node src/films/black-sea/analysis/analyze.mjs
node src/films/black-sea/analysis/phrases.mjs
./node_modules/.bin/remotion render src/index.ts BlackSeaVesselOfSin out/black-sea-vessel-of-sin-en.mp4 --codec=h264 --crf=17 --jpeg-quality=96 --audio-codec=aac --audio-bitrate=256k --color-space=bt709
```

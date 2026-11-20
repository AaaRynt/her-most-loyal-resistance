# Her Most Loyal Resistance

以《The New Order: Last Days of Europe》中的英国与 HMMLR 为背景的全长动态图形短片。影片以 React、TypeScript、Remotion 和原创 SVG 制作，1920 × 1080，30 fps，共 5,301 帧。全长成片位于 [out/her-most-loyal-resistance-full.mp4](../../../out/her-most-loyal-resistance-full.mp4)。

## 全曲剪辑

原声从 00:00.000 播放至 02:56.678，保留双声道和源曲尾部的自然衰减。画面以 30 fps 覆盖原声，视频时长为 02:56.700。

完整音轨按 22,050 Hz 解码为单声道用于分析。使用 2,048 点 Hann 窗和 220 个采样步长测量四个频段的能量与正向频谱通量。鼓段主要周期约 0.559 秒。38 个镜头按实际起音或曲段变化衔接。海浪、收音机和尾声的运动幅度使用实测频段能量或响度。

| 源曲时间 | 画面 |
| --- | --- |
| 00:00.000 | 海岸版画逐渐显影，接入舰队与海峡 |
| 00:17.770 | 第一轮鼓声进入，履带横切海图 |
| 00:22.768 | 长统靴压过伦敦 |
| 00:27.208 | 黑鹰的斜影掠过宫墙，落在爱德华八世的王座上 |
| 00:36.098 | 伯明翰钢厂，接入德资接管的英国市场 |
| 00:53.878 | 配给簿、打孔票和粮店队伍 |
| 01:10.540 | 鼓点退开，转向加拿大的伊丽莎白二世 |
| 01:14.710 | 迈克尔·富特的周二广播 |
| 01:19.988 | 鼓点回归，地下网络加速 |
| 01:34.984 | 地下印刷、反殖民传单、收音机和工厂城镇 |
| 01:52.764 | 街头抗议，随后出现左翼抵抗标语 |
| 02:00.546 | 钟面、铁闸和悬而未决的选票 |
| 02:27.215 | 履带、黑鹰和铁丝网在碎版中叠合 |
| 02:31.655 | 片名逐行压印 |
| 02:41.653 | 最后一张印版折起 |
| 02:46.102 | 回到海岸，画面随原声自然收束 |

- [audio-profile.json](analysis/audio-profile.json) 保存原曲校验值、每 100 ms 的频段数据和分段周期性。
- [onset-candidates.json](analysis/onset-candidates.json) 保存候选起音的位置、强度和频段通量。
- [edit-cues.json](analysis/edit-cues.json) 保存采用的源曲时间。[score.ts](score.ts) 换算画面帧，[Composition.tsx](Composition.tsx) 编排镜头与转场。
- 可用 `node src/films/hmmlr/analysis/analyze-audio.mjs` 重算分析数据。脚本使用项目已有的 Remotion FFmpeg。

## 设定与素材

- 音乐使用项目提供的 [her_most_loyal_resistance.ogg](assets/her_most_loyal_resistance.ogg)。
- 占领、德国企业控制、配给及流亡广播以本地 `TNO_United_Kingdom_l_english.yml` 中的 `ENG_The_Channel_desc`、`ENG_German_Corporate_Dominance_0_desc`、`ENG_across_the_barren_pastures_desc`、`ENG_rationing_measures_desc`、`postcw.13.d` 和 `britain_intros.6.d` 为依据。流亡王室与左翼阵营参考 `TNO_Canada_l_english.yml` 的 `tno_CAN_queen_in_exile_desc` 及 `TNO_United_Kingdom_l_english.yml` 的 FEN 派系条目。
- 审查条、监视之眼和街头传单借用了《1984》与《V 字仇杀队》的视觉气氛。片中图形均以原创矢量绘制，文字为英文和德文。
- [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)、[Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) 和 [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) 来自 Google Fonts。字库与 SIL Open Font License 文本位于 [fonts](fonts)。

## 预览与导出

```sh
npm run dev
npm run lint
```

在 Remotion Studio 选择 `HerMostLoyalResistance`。从项目目录重新导出全长版可运行以下命令。

```sh
./node_modules/.bin/remotion render src/index.ts HerMostLoyalResistance out/her-most-loyal-resistance-full.mp4 --codec=h264 --crf=17 --jpeg-quality=96 --audio-codec=aac --audio-bitrate=256k --color-space=bt709
```

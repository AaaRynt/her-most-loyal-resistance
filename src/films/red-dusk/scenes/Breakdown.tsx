import {
  c,
  Dial,
  Field,
  Figure,
  InkGrain,
  Lattice,
  noise,
  polar,
  range,
  Ribbon,
  Stamp,
  Text,
  TowerBlock,
  Trace,
} from "../art";
import { useMotion } from "../score";

function Handset({
  x,
  y,
  angle,
  fill,
  cord,
  f,
}: {
  x: number;
  y: number;
  angle: number;
  fill: string;
  cord: string;
  f: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path
        d="M -339 50 Q -340 -30 -264 -95 Q -160 -160 15 -157 Q 219 -149 333 -42 L 334 52 L 263 106 L 177 71 L 162 -4 Q 40 -75 -154 -29 L -181 52 L -273 116 Z"
        fill={fill}
        stroke={c.bone}
        strokeWidth="4"
      />
      <path
        d="M -286 -12 Q -236 -115 -3 -118 Q 169 -110 271 -35 M -310 38 L -269 68 L -200 39 M 189 37 L 256 62 L 307 26"
        fill="none"
        stroke={c.cream}
        strokeWidth="2.5"
        opacity=".53"
      />
      <path
        d={`M -303 78 C -413 ${151 + 14 * Math.sin(f * 0.08)} -394 222 -292 238 S -200 327 -436 379`}
        fill="none"
        stroke={cord}
        strokeWidth="12"
      />
      <path
        d={`M -303 78 C -413 ${151 + 14 * Math.sin(f * 0.08)} -394 222 -292 238 S -200 327 -436 379`}
        fill="none"
        stroke={c.bone}
        strokeWidth="3"
        strokeDasharray="3 9"
        strokeDashoffset={-f * 0.6}
        opacity=".72"
      />
    </g>
  );
}

export function Phones() {
  const { f, step, hit, beat, phase } = useMotion("phones");
  const gap = step(2, 44, 12);
  return (
    <Field fill="#555943">
      <path
        d={`M 0 0 H ${907 + 253 * gap} L ${915 - 238 * gap} 1080 H 0 Z`}
        fill="#b39f74"
      />
      <path
        d={`M 1920 0 V 1080 H ${919 - 238 * gap} L ${913 + 244 * gap} 0 Z`}
        fill="#3f5862"
      />
      <Lattice color={c.coal} spacing={37} opacity={0.28} line />
      <Handset
        x={565 - 141 * gap}
        y={571 - 42 * hit(1)}
        angle={-19 + 9 * gap}
        fill="#553e31"
        cord="#a57952"
        f={f}
      />
      <Handset
        x={1387 + 61 * gap}
        y={462 + 81 * gap - 31 * hit(2)}
        angle={153 - 19 * gap}
        fill="#232e33"
        cord="#809788"
        f={-f}
      />
      <Trace
        x={122}
        y={787}
        width={797 - 137 * gap}
        amplitude={35 + 53 * beat}
        f={f}
        color="#914036"
        thickness={4.8}
      />
      <Trace
        x={985 + 101 * gap}
        y={737}
        width={817 - 101 * gap}
        amplitude={39 + 51 * hit(2)}
        f={-f * 1.27}
        color={c.cream}
        seed={4}
        thickness={4.3}
      />
      <Text x={117} y={213} size={49} face="mono" color={c.coal}>
        СОЮЗ
      </Text>
      <Text x={1809} y={213} size={49} face="mono" color={c.cream} anchor="end">
        РЕСПУБЛИКИ
      </Text>
      <path
        d={`M 106 934 H ${789 - 173 * gap} M ${1029 + 138 * gap} 934 H 1811`}
        stroke={c.cream}
        strokeWidth="2.7"
        opacity={0.66 + 0.1 * phase}
      />
      <InkGrain opacity={0.17} />
    </Field>
  );
}

export function Balances() {
  const { f, step, hit, phase, audio } = useMotion("balances");
  const fract = step(2, 41, 14);
  return (
    <Field fill="#405359">
      <Lattice color={c.cream} spacing={33} opacity={0.23} angle={19} line />
      <path d="M 0 844 L 1920 514 V 1080 H 0 Z" fill="#263837" />
      <g
        transform={`translate(${864 + 97 * phase} ${550 + 12 * hit(3)}) rotate(${-9 + 6 * fract})`}
      >
        <path
          d="M -612 -392 H 753 V 358 H -612 Z"
          fill="#a4a98d"
          stroke={c.coal}
          strokeWidth="5"
        />
        <path
          d="M -573 -360 H 707 V 318 H -573 Z"
          fill="none"
          stroke="#5d6f5e"
          strokeWidth="2.6"
        />
        <Text x={-536} y={-251} size={99} color={c.coal} fit={732}>
          СМЕТА НИИ
        </Text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const off = (i % 2 ? 1 : -1) * (52 + 12 * i) * step(i % 4, 29, 10);
          return (
            <g key={i} transform={`translate(${off} ${-168 + 43 * i})`}>
              <path
                d="M -536 0 H 661 M -45 -15 V 30 M 224 -16 V 30"
                stroke="#4a635d"
                strokeWidth="2"
              />
              <path
                d={`M -519 17 H ${-184 + 82 * noise(i)} M 262 17 h ${164 + 106 * noise(i + 9)}`}
                stroke="#647363"
                strokeWidth="2.6"
                strokeDasharray="9 9"
              />
            </g>
          );
        })}
        <path
          d={`M -482 278 H 365 L ${521 + 97 * fract} ${253 - 209 * fract}`}
          fill="none"
          stroke={c.rust}
          strokeWidth={6 + 6 * hit(2)}
        />
      </g>
      <Dial
        x={1573}
        y={381}
        radius={241}
        turn={-18 + 135 * fract + 26 * audio.middle}
        body="#273c41"
        color={c.bone}
      />
      <Trace
        x={121}
        y={929}
        width={1628}
        amplitude={33 + 51 * fract}
        f={-f}
        color={c.amber}
      />
      <InkGrain color={c.cream} opacity={0.24} />
    </Field>
  );
}

const nightBlocks = range(11).map((i) => ({
  x: 53 + 179 * i,
  y: 401 + noise(i * 21) * 248,
  w: 126 + noise(i + 83) * 54,
  h: 299 + noise(i * 28) * 167,
}));
const staticLines = range(24);
export function Night() {
  const { f, step, hit, audio, phase } = useMotion("night");
  const power = step(2, 41, 14);
  const down = step(3, 33);
  return (
    <Field fill="#17262f">
      <path d="M 0 0 H 1920 V 494 L 0 683 Z" fill="#2f4c54" />
      <path d="M 0 887 L 1920 736 V 1080 H 0 Z" fill="#233736" />
      <g transform={`translate(${181 - 229 * phase} ${-106 + 108 * down})`}>
        {nightBlocks.map(({ x, y, w, h }, i) => (
          <TowerBlock
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            fill={i % 2 ? "#3d504b" : "#344548"}
            slots={4}
            seed={i + 25}
            lit={0.24 + (1 - step(i % 4, 28, 12)) * 0.43 + 0.13 * audio.bass}
          />
        ))}
      </g>
      {range(11).map((i) => (
        <path
          key={i}
          d={`M ${-223 + i * 227 + 97 * power} 1080 L 1119 767`}
          stroke="#8c9f8b"
          strokeWidth="1.8"
          opacity=".37"
        />
      ))}
      <path
        d={`M ${481 + 772 * power} 138 L ${1024 + 382 * power} 145 L ${1698 - 124 * down} 951 L ${703 - 144 * down} 965 Z`}
        fill="#c6a474"
        opacity={0.084 + 0.075 * hit(2)}
      />
      <Trace
        x={112}
        y={873}
        width={1686}
        f={f}
        amplitude={10 + 32 * audio.middle + 26 * hit(3)}
        color={c.amber}
      />
      <Text x={114} y={219} size={71} color={c.cream} tracking={6}>
        МОСКВА
      </Text>
      <Text x={120} y={279} size={32} face="mono" color={c.bone}>
        АВГУСТ 1991
      </Text>
      <InkGrain opacity={0.16} />
    </Field>
  );
}

export function Foros() {
  const { f, step, hit, phase } = useMotion("foros");
  const locked = step(2, 44, 15);
  const close = step(3, 37, 12);
  return (
    <Field fill="#493e38">
      <path d="M 0 0 H 1920 V 488 L 0 750 Z" fill="#796454" />
      <Lattice color={c.cream} spacing={31} opacity={0.16} angle={135} line />
      <g
        transform={`translate(${893 + 116 * phase} ${548 - 21 * hit(2)}) skewY(-5)`}
      >
        <path
          d="M -632 -395 H 632 V 390 H -632 Z"
          fill="#272e31"
          stroke={c.sand}
          strokeWidth="10"
        />
        <path d="M -576 -343 H 579 V 334 H -576 Z" fill="#849082" />
        <path
          d="M -576 11 Q -282 -177 41 -36 T 579 -95 V 333 H -576 Z"
          fill="#455e60"
        />
        <Figure
          x={37}
          y={14}
          scale={2.03}
          index={2}
          color={c.coal}
          outline="#b5aca0"
          facing={-1}
        />
        <path d="M -576 313 H 579 V 363 H -576 Z" fill="#5f5242" />
        <path
          d={`M -576 -343 H ${-601 + 586 * locked} V 335 H -576 Z M ${592 - 570 * close} -343 H 581 V 335 H ${592 - 570 * close} Z`}
          fill="#5b5143"
          stroke="#8c7555"
          strokeWidth="4"
        />
        {range(15).map((i) => (
          <path
            key={i}
            d={`M -573 ${-319 + i * 43} h ${580 * locked} M 574 ${-319 + i * 43} h ${-552 * close}`}
            stroke={c.sand}
            strokeWidth="2.1"
            opacity=".65"
          />
        ))}
        <path
          d="M 0 -343 V 331 M -576 -33 H 579"
          stroke={c.coal}
          strokeWidth="6.2"
        />
      </g>
      <path
        d={`M 112 911 H ${487 - 71 * locked} M ${608 + 43 * locked} 911 H 1775`}
        stroke={c.red}
        strokeWidth="4.8"
        fill="none"
      />
      <Stamp x={112} y={124} width={479} fill={c.coal} ink={c.cream}>
        ФОРОС · 18.08.1991
      </Stamp>
      <InkGrain opacity={0.22 + 0.03 * Math.sin(f * 0.08)} />
    </Field>
  );
}

const pages = ["18", "19", "20"];
export function Calendar() {
  const { f, step, hit, phase } = useMotion("calendar");
  const flip = step(1, 39, 13);
  const stop = step(3, 34, 10);
  return (
    <Field fill="#4a5a50">
      <path d="M 0 0 H 1920 V 368 L 0 893 Z" fill="#958460" />
      <Lattice color={c.cream} spacing={30} opacity={0.26} angle={118} />
      {pages.map((day, i) => {
        const shed = step(i, 44, 13);
        return (
          <g
            key={day}
            transform={`translate(${393 + 448 * i + (i === 2 ? 79 : -57) * flip} ${531 + 30 * hit(i) + 178 * shed * stop * (i % 2 ? -1 : 1)}) rotate(${-15 + i * 7 + 18 * shed * stop * (i - 1)})`}
          >
            <path
              d="M -184 -303 H 186 V 313 H -184 Z"
              fill={c.coal}
              opacity=".36"
              transform="translate(19 18)"
            />
            <path
              d="M -184 -303 H 186 V 313 H -184 Z"
              fill={i === 1 ? "#d6b384" : "#c7b994"}
              stroke={c.coal}
              strokeWidth="3.1"
            />
            <path
              d="M -181 -260 H 182 M -181 223 H 182"
              stroke="#6d5a43"
              strokeWidth="3.1"
            />
            <Text
              x={0}
              y={-199}
              size={35}
              face="mono"
              color={c.coal}
              anchor="middle"
            >
              АВГУСТ
            </Text>
            <Text
              x={0}
              y={123}
              size={253}
              color={i === 1 ? c.rust : c.coal}
              anchor="middle"
            >
              {day}
            </Text>
            <path
              d={`M -166 242 H ${130 - 241 * shed * stop}`}
              stroke={c.rust}
              strokeWidth="9"
            />
          </g>
        );
      })}
      <Trace
        x={116}
        y={930}
        width={1687}
        f={f}
        amplitude={19 + 26 * phase + 48 * hit(3)}
        color={c.amber}
      />
      <InkGrain opacity={0.19} />
    </Field>
  );
}

function Dancer({
  x,
  y,
  beat,
  f,
  scale,
  shade,
}: {
  x: number;
  y: number;
  beat: number;
  f: number;
  scale: number;
  shade: string;
}) {
  const tip = Math.sin(f * 0.058) * 37;
  const handLeft = polar(194, 226 + tip - 21 * beat);
  const handRight = polar(193, 310 - tip + 23 * beat);
  const toe = polar(251, 38 + tip * 0.85);
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${7 * Math.sin(f * 0.032) - 3 * beat}) scale(${scale})`}
      fill={shade}
    >
      <path
        d={`M -19 52 Q -17 147 -65 263 L -85 288 L -72 298 L -40 268 Q 20 183 26 84 L ${toe[0]} ${toe[1] + 80} l 20 -10 L 47 55 Z`}
      />
      <path d="M -29 -122 Q -9 -153 20 -127 L 31 -89 L 18 -60 L 25 49 H -27 L -20 -50 L -39 -94 Z" />
      <path
        d={`M -22 -103 Q -114 ${-70 + tip} ${handLeft[0]} ${handLeft[1] - 67} M 21 -105 Q 91 ${-111 - tip} ${handRight[0]} ${handRight[1] - 65}`}
        fill="none"
        stroke={shade}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx="0" cy="-156" r="24" />
      <circle cx="-18" cy="-176" r="11" />
      <path
        d={`M -23 17 Q -103 ${17 - tip} -194 52 Q -98 ${74 + tip * 0.5} -10 65 Q 94 91 201 51 Q 67 2 19 16 Z`}
      />
      <path
        d="M -138 49 Q -28 38 129 51 M -89 58 L -22 26 L 8 65 L 51 39 L 129 55"
        fill="none"
        stroke="#71837b"
        strokeWidth="2"
        opacity=".87"
      />
    </g>
  );
}

export function Ballet() {
  const { f, step, hit, beat, phase } = useMotion("ballet");
  const shadow = step(2, 37, 14);
  return (
    <Field fill="#24363e">
      <path d="M 0 0 H 1920 V 1080 H 0 Z" fill="#213037" />
      <path
        d="M 216 129 H 1660 L 1734 199 V 914 L 1670 975 H 226 L 169 914 V 198 Z"
        fill="#778077"
        stroke={c.bone}
        strokeWidth="4"
      />
      <svg x="255" y="172" width="1400" height="742" viewBox="0 0 1400 742">
        <path d="M 0 0 H 1400 V 742 H 0 Z" fill="#3c5259" />
        <path d="M 0 652 Q 650 543 1400 589 V 767 H 0 Z" fill="#3a4140" />
        <ellipse
          cx={754 - 202 * shadow}
          cy={353 + 5 * beat}
          rx={374 + 29 * beat}
          ry={318}
          fill="#c5c49d"
          opacity={0.39 - 0.14 * shadow}
        />
        <Dancer
          x={953 - 335 * phase}
          y={357 + 22 * hit(0)}
          f={-f * 0.73}
          beat={beat}
          scale={0.89}
          shade="#879c8f"
        />
        <Dancer
          x={522 + 244 * phase}
          y={376 - 30 * hit(2)}
          f={f}
          beat={beat}
          scale={1.07}
          shade="#ede4c2"
        />
        {staticLines.map((i) => (
          <path
            key={i}
            d={`M 0 ${i * 34 + 13 * (f % 5)} H 1400`}
            stroke={c.coal}
            strokeWidth={i % 6 === 0 ? 2.6 : 1.1}
            opacity={0.28 + 0.34 * shadow}
          />
        ))}
        <path
          d={`M 0 ${743 - 117 * shadow} H 1400 V 742 H 0 Z`}
          fill="#283d43"
          opacity={0.82 * shadow}
        />
      </svg>
      <Stamp x={294} y={210} width={421} fill="#283b40" ink={c.cream}>
        ЛЕБЕДИНОЕ ОЗЕРО
      </Stamp>
      <InkGrain opacity={0.2} />
    </Field>
  );
}

export function Carrier() {
  const { f, step, beat, phase, audio } = useMotion("carrier");
  const failure = step(2, 42, 12);
  const tear = step(3, 37, 8);
  return (
    <Field fill="#273842">
      <Lattice color={c.mint} spacing={29} opacity={0.18} line />
      {staticLines.map((i) => {
        const x =
          -177 +
          noise(i * 3 + 55) * 462 * (1 + tear) +
          (i % 2 === 0 ? -1 : 1) * 97 * failure;
        const height = 36 + stroke(i);
        const y = 7 + i * 48 + Math.sin(i * 0.48 + f * 0.07) * 18 * tear;
        return (
          <path
            key={i}
            d={`M ${x} ${y} h ${1513 + noise(i * 6) * 599} v ${height} h ${-1513 - noise(i * 6) * 599} Z`}
            fill={i % 5 === 1 ? "#7d6049" : i % 3 === 0 ? "#3f5c61" : "#263c45"}
            opacity={0.63 + noise(i * 21) * 0.28}
          />
        );
      })}
      <Trace
        x={117}
        y={683}
        width={1681}
        amplitude={82 + 152 * failure + 55 * audio.air}
        f={f * 1.8}
        color={c.amber}
        thickness={3.1}
      />
      <Trace
        x={117}
        y={738}
        width={1681}
        amplitude={32 + 151 * tear + 22 * beat}
        f={-f}
        color={c.red}
        seed={33}
        thickness={3.6}
      />
      <Ribbon
        x={116 - 77 * tear}
        y={265 + 41 * beat}
        width={1115}
        height={152}
        tilt={-4 + 3 * tear}
        flop={34 * failure}
        color={c.coal}
      />
      <Text
        x={149 - 34 * tear}
        y={361}
        size={93}
        color={c.cream}
        fit={900}
        opacity={0.92 - 0.21 * tear}
      >
        ЭФИР ПРЕРВАН
      </Text>
      <path
        d={`M 117 ${905 - 28 * beat} h ${1571 - 413 * phase}`}
        stroke={c.cream}
        strokeWidth="3"
        strokeDasharray="16 6 4 6"
        opacity=".64"
      />
      <InkGrain opacity={0.18 + 0.12 * tear} />
    </Field>
  );
}

function stroke(i: number) {
  return Math.round(noise(i * 5 + 6) * 13);
}

import {
  c,
  Dial,
  Field,
  InkGrain,
  Lattice,
  noise,
  polar,
  PunchTape,
  range,
  Ribbon,
  Stamp,
  Text,
  TowerBlock,
  Trace,
} from "../art";
import { ease, useMotion } from "../score";

const bars = [
  c.bone,
  "#a18454",
  "#7d8a6e",
  "#61786f",
  "#476172",
  "#9e5240",
  "#a78771",
];
const scans = range(20);

export function Signal() {
  const { f, beat, audio, step, phase } = useMotion("signal");
  const turn = step(1, 32, 8);
  const y = 601 - 243 * turn;
  return (
    <Field fill="#192b32">
      <path d="M 0 0 H 1920 V 1080 H 0 Z" fill={c.coal} />
      <Lattice color={c.mint} spacing={30} opacity={0.24} line />
      <path
        d="M 96 144 H 1810 V 936 H 96 Z"
        fill="#444c45"
        stroke={c.bone}
        strokeWidth="2.2"
      />
      <path d="M 119 169 H 1787 V 911 H 119 Z" fill="#202e33" />
      <svg x="128" y="181" width="1650" height="715" viewBox="0 0 1650 715">
        {bars.map((fill, i) => {
          const sway = (i % 2 === 0 ? 1 : -1) * (1.7 * f + 54 * beat);
          return (
            <path
              key={fill}
              d={`M ${i * 239 - 13} ${-51 + sway * (1 - turn)} h 240 v 376 h -240 Z`}
              fill={fill}
              opacity={0.34 + 0.64 * step(0, 26, 18)}
            />
          );
        })}
        {scans.map((i) => (
          <path
            key={i}
            d={`M 0 ${i * 37} H 1650`}
            stroke={i % 5 === 0 ? c.cream : c.coal}
            strokeWidth={i % 5 === 0 ? 2.2 : 1.3}
            opacity=".36"
          />
        ))}
        <path
          d={`M 0 ${y} H 1650 V ${y + 217} H 0 Z`}
          fill="#273b42"
          opacity=".83"
        />
        <Dial
          x={1040 + 154 * turn}
          y={382}
          radius={291}
          turn={-96 + 173 * phase + 18 * beat}
          color="#e2d1a4"
        />
        <Trace
          x={33}
          y={503}
          width={1564}
          f={f}
          amplitude={18 + 85 * audio.middle + 27 * beat}
          color={c.amber}
          thickness={3.8}
        />
        <Text x={44} y={132 + 42 * turn} size={37} face="mono" color={c.pale}>
          ПРОБНЫЙ СИГНАЛ
        </Text>
        <path
          d={`M ${51 + 931 * phase} 692 h 478`}
          stroke={c.cream}
          strokeWidth="4"
          opacity=".74"
        />
      </svg>
      <InkGrain color={c.cream} />
    </Field>
  );
}

const pins = range(15);
export function Union() {
  const { f, step, beat, phase, audio } = useMotion("union");
  const lock = step(2, 38, 13);
  const center = 1300 - 170 * lock;
  return (
    <Field fill="#b7a078">
      <path d="M 0 0 H 1920 V 383 L 815 697 L 0 647 Z" fill="#e0cea3" />
      <path d="M 961 1080 L 1920 217 V 1080 Z" fill="#59685c" />
      <Lattice color={c.coal} spacing={49} opacity={0.25} line />
      <g transform={`translate(${center} 544) rotate(${-25 + 36 * phase})`}>
        {[417, 365, 270, 184].map((r, i) => (
          <circle
            key={r}
            r={r - i * 16 * beat}
            fill={i === 2 ? "#293e45" : "none"}
            stroke={i % 2 ? c.cream : c.coal}
            strokeWidth={i === 0 ? 6 : 2}
            opacity={i === 2 ? 0.87 : 0.66}
          />
        ))}
        {pins.map((i) => {
          const [x, y] = polar(385 + 21 * audio.bass, 24 * i);
          const [ox, oy] = polar(507 + 71 * lock, 24 * i + 10 * lock);
          return (
            <g key={i}>
              <path
                d={`M 0 0 L ${x} ${y} L ${ox} ${oy}`}
                stroke="#514e3b"
                strokeWidth="2.2"
                opacity=".47"
              />
              <circle
                cx={x}
                cy={y}
                r={13 + (i % 3 === 0 ? 6 * beat : 0)}
                fill={i % 3 === 0 ? c.rust : c.cream}
                stroke={c.coal}
                strokeWidth="1.7"
              />
            </g>
          );
        })}
        <Dial
          x={0}
          y={0}
          radius={161}
          turn={2.1 * f}
          color={c.cream}
          pointer={c.amber}
        />
      </g>
      <path
        d={`M 0 770 H ${718 + 107 * lock} L ${1050 + 137 * lock} 984 H 0 Z`}
        fill="#293b40"
      />
      <Text x={112} y={196} size={29} face="mono" color={c.coal}>
        ЕДИНАЯ СИСТЕМА
      </Text>
      <Text x={101} y={688 - 13 * beat} size={402} color={c.coal} tracking={-6}>
        СССР
      </Text>
    </Field>
  );
}

const planSlots = range(7);
export function Plan() {
  const { f, step, phase, hit, beat } = useMotion("plan");
  const stamp = step(1, 23, 6);
  return (
    <Field fill="#252b29">
      <path d="M 0 168 L 1920 37 V 932 L 0 1080 Z" fill="#727557" />
      <Lattice color={c.cream} spacing={24} opacity={0.17} angle={42} line />
      {planSlots.map((i) => {
        const dx = 97 + 287 * i;
        const fall = step(i % 4, 25, 13);
        return (
          <g
            key={i}
            transform={`translate(${dx} ${285 + 31 * i + 132 * (1 - fall)}) rotate(-6)`}
          >
            <rect
              width={240}
              height={539}
              fill={i % 3 ? "#b9a778" : "#ddc999"}
              stroke="#4e543f"
              strokeWidth="3"
            />
            <path
              d="M 27 51 H 211 M 27 83 H 201"
              stroke={c.coal}
              strokeWidth="3"
              opacity=".46"
            />
            {range(14).map((j) => (
              <path
                key={j}
                d={`M 27 ${127 + 23 * j} h ${67 + 135 * noise(i * 29 + j)}`}
                stroke="#675840"
                opacity=".72"
                strokeDasharray={j % 3 ? "9 6" : "none"}
                strokeWidth="2.4"
              />
            ))}
            <path d="M 24 492 H 214" stroke={c.rust} strokeWidth="5" />
          </g>
        );
      })}
      <PunchTape
        x={-117}
        y={839 - 39 * phase}
        width={2234}
        height={151}
        angle={-11}
        phase={f * 4 + 20 * beat}
        color="#baa776"
        density={0.54}
      />
      <g
        transform={`translate(${103 + 419 * stamp} ${289 - 32 * hit(1)}) rotate(${-8 + 11 * stamp})`}
      >
        <path d="M 0 0 H 1030 V 167 H 0 Z" fill={c.rust} />
        <Text x={37} y={123} size={102} color={c.cream} tracking={3}>
          ГОСПЛАН
        </Text>
      </g>
      <InkGrain opacity={0.13} />
    </Field>
  );
}

const plates = [
  { x: 0, y: 165, w: 775, h: 675, dx: -167, dy: 38, color: "#a98e61" },
  { x: 577, y: 39, w: 810, h: 540, dx: -46, dy: -107, color: "#dac79a" },
  { x: 1256, y: 305, w: 684, h: 721, dx: 128, dy: 29, color: "#4b6664" },
  { x: 273, y: 759, w: 1180, h: 347, dx: 75, dy: 107, color: "#873f34" },
];
export function Reform() {
  const { f, step, hit, beat, phase } = useMotion("reform");
  const click = step(2, 32, 12);
  return (
    <Field fill={c.coal}>
      {plates.map(({ x, y, w, h, dx, dy, color }, i) => {
        const up = step(i, 39, 10);
        return (
          <g
            key={x}
            transform={`translate(${x + dx * up} ${y + dy * up + 18 * hit(i)})`}
          >
            <path d={`M 0 4 L ${w} -62 V ${h} L 0 ${h + 62} Z`} fill={color} />
            <path
              d={`M 20 24 L ${w - 23} -35 M 21 ${h + 29} L ${w - 23} ${h - 29}`}
              stroke={c.cream}
              opacity=".61"
              strokeWidth="2.4"
            />
            {range(12).map((j) => (
              <path
                key={j}
                d={`M ${112 + 51 * j} 11 v ${50 + 22 * (j % 4)}`}
                stroke={c.coal}
                strokeWidth="1.8"
                opacity=".43"
              />
            ))}
          </g>
        );
      })}
      <Lattice color={c.coal} spacing={45} opacity={0.14} angle={20} />
      <path
        d={`M 0 ${525 - 51 * click} L 1920 ${380 + 84 * click} V ${659 + 32 * click} L 0 ${790 - 67 * click} Z`}
        fill="#272e31"
      />
      <g
        transform={`translate(${103 + 60 * (1 - click)} ${594 - 21 * beat}) rotate(${-6 + 5 * click})`}
      >
        <Text x={0} y={0} size={218} fit={1510} weight={700} color={c.cream}>
          ПЕРЕСТРОЙКА
        </Text>
        <path
          d={`M 3 44 h ${1390 * ease(f, 2, 52)}`}
          stroke={c.red}
          strokeWidth="7"
        />
      </g>
      <Stamp x={118} y={128} width={211} fill={c.coal} ink={c.cream}>
        1985–1991
      </Stamp>
      <InkGrain opacity={0.15 + 0.12 * phase} />
    </Field>
  );
}

export function Glasnost() {
  const { step, phase, beat } = useMotion("glasnost");
  const peel = step(1, 33, 8);
  const reveal = step(2, 31, 14);
  return (
    <Field fill="#d7c196">
      <path d="M 0 0 H 1920 V 1080 H 0 Z" fill="#e6d4af" />
      <path d="M 1294 0 H 1920 V 1080 H 1155 Z" fill="#9c7850" />
      <g
        transform={`translate(${-101 + 142 * phase} ${44 - 57 * phase}) rotate(-5 960 540)`}
      >
        {range(19).map((i) => {
          const y = 198 + i * 43;
          const open = step(i % 4, 24, 6);
          return (
            <g key={i}>
              <path
                d={`M 86 ${y} H ${921 - (i % 3) * 104} M 1028 ${y - 6} H ${1798 - (i % 4) * 22}`}
                fill="none"
                stroke="#63533b"
                strokeWidth="2.7"
                strokeDasharray="19 8 7 6"
                opacity=".71"
              />
              <path
                d={`M 86 ${y - 13} h ${(1 - open) * (568 + noise(i) * 308)} v 25 H 86 Z`}
                fill={c.coal}
              />
              <path
                d={`M ${1014 + open * 714} ${y - 17} H 1810 V ${y + 7} h ${-796 + open * 714} Z`}
                fill="#503832"
                opacity=".83"
              />
            </g>
          );
        })}
      </g>
      <path
        d={`M ${107 - 508 * (1 - peel)} 396 L 1810 ${356 + 29 * peel} L 1819 679 L 114 721 Z`}
        fill="#813d32"
        opacity={0.65 + 0.35 * peel}
      />
      <Text
        x={156}
        y={621 - 15 * beat}
        size={229}
        color={c.cream}
        fit={1364}
        opacity={0.38 + 0.62 * reveal}
      >
        ГЛАСНОСТЬ
      </Text>
      <InkGrain color={c.coal} opacity={0.31} />
    </Field>
  );
}

const portraitPath =
  "M -180 18 L -162 -98 Q -149 -181 -53 -209 Q 49 -228 122 -174 L 151 -129 L 157 -64 L 178 -20 L 157 5 L 161 37 L 145 66 L 98 83 L 96 144 L 197 188 L 275 441 H -267 L -214 221 L -130 166 L -118 75 Z";
export function Portrait() {
  const { f, step, beat, phase } = useMotion("portrait");
  const unfold = step(1, 32, 10);
  const fragment = step(2, 29, 16);
  return (
    <Field fill="#293c45">
      <path d="M 0 0 H 1920 V 583 L 0 812 Z" fill="#698077" />
      <path d="M 1083 0 H 1920 V 1080 H 925 Z" fill="#454b40" />
      <Lattice color={c.cream} spacing={31} opacity={0.22} />
      <Dial
        x={1312 - 110 * phase}
        y={534}
        radius={416 + 16 * beat}
        turn={-62 + 108 * phase}
        color="#cfba8c"
      />
      <g
        transform={`translate(${1319 - 88 * unfold} ${416 - 21 * beat}) scale(${1.25 + 0.11 * fragment})`}
      >
        <path
          d={portraitPath}
          fill={c.rust}
          transform={`translate(${31 + 17 * beat} 19)`}
        />
        <path d={portraitPath} fill="#cab68e" />
        <path
          d="M -180 18 L -162 -98 Q -145 -181 -53 -209 Q -12 -216 24 -209 Q -67 -186 -73 -146 Q -72 -109 -49 -80 L -75 -55 L -83 15 L -111 52 L -118 75 Z"
          fill="#464c43"
        />
        <path
          d="M 66 -172 l 25 3 l 14 14 l -3 21 l -22 -8 l -8 -18 l -18 0 Z"
          fill="#985649"
          opacity=".87"
        />
        <path
          d="M 70 -68 L 114 -74 L 129 -66 M 104 30 H 151 M 111 57 L 143 49"
          stroke="#484436"
          fill="none"
          strokeWidth="3.3"
        />
        <path
          d="M -113 110 L -6 223 L 96 137 L 161 164 L 237 278 L 278 441 H -267 L -221 239 L -174 179 Z"
          fill="#263138"
        />
        <path
          d="M -114 111 L -6 223 L 96 137 L 53 288 L -3 258 L -51 286 Z"
          fill="#ded0a6"
        />
        <path
          d="M -6 228 L 15 258 L -2 288 L 29 421 H -33 L -24 286 L -39 257 Z"
          fill={c.rust}
        />
      </g>
      <path
        d={`M 0 ${871 - 151 * fragment} L 1920 ${713 + 100 * fragment} V 1080 H 0 Z`}
        fill="#1e2b30"
        opacity=".86"
      />
      <Trace
        x={108}
        y={735}
        width={704}
        amplitude={20 + 29 * beat}
        f={f}
        color={c.amber}
      />
      <Text x={110} y={458} size={32} face="mono" color={c.cream}>
        СОЮЗНЫЙ ЦЕНТР
      </Text>
      <Text x={101} y={621 - 11 * beat} size={169} color={c.cream} fit={783}>
        ГОРБАЧЁВ
      </Text>
      <InkGrain opacity={0.23} />
    </Field>
  );
}

const plume = range(25);
export function Reactor() {
  const { f, phase, step, hit, beat } = useMotion("reactor");
  const breakaway = step(1, 42, 5);
  const surge = step(2, 48, 15);
  return (
    <Field fill="#223730">
      <path d="M 0 0 H 1920 V 670 L 0 842 Z" fill="#3f5143" />
      <path d="M 0 945 L 1920 639 V 1080 H 0 Z" fill="#655941" />
      <Lattice color="#cbbd87" spacing={38} opacity={0.29} line />
      <Dial
        x={1405}
        y={535 - 18 * beat}
        radius={402}
        turn={-52 + 163 * breakaway + 22 * beat}
        color="#aa9967"
        pointer={c.red}
      />
      <g transform={`translate(${1010 - 103 * surge} ${559 + 18 * hit(1)})`}>
        <path d="M -262 26 H 628 V 325 H -262 Z" fill="#9b9068" />
        <path d="M -262 26 L -145 -77 H 754 L 628 26 Z" fill="#c4b47b" />
        <path d="M 628 26 L 754 -77 V 222 L 628 325 Z" fill="#4a5142" />
        <path
          d="M -193 2 V -120 H -143 V 2 M 461 1 V -147 H 530 V 1"
          fill="#4c5342"
        />
        <path
          d="M -242 137 H 601 M -244 223 H 602"
          stroke={c.coal}
          strokeWidth="5.5"
          opacity=".72"
        />
        {range(11).map((i) => (
          <path
            key={i}
            d={`M ${-235 + 75 * i} 65 H ${-203 + 75 * i} V 106 h -32 Z`}
            fill={i % 4 < 2 ? "#534b36" : "#322e28"}
          />
        ))}
        <path
          d={`M 136 -37 L 190 72 L 159 122 L ${215 + 49 * breakaway} 274`}
          stroke="#30302a"
          strokeWidth={3 + 9 * breakaway}
          fill="none"
        />
      </g>
      <g opacity={0.35 + 0.43 * breakaway}>
        {plume.map((i) => {
          const p = (f * 0.008 + i * 0.077) % 1;
          const x = 1176 + ((i % 3) - 1) * 58 + 586 * p * surge;
          const y = 540 - 637 * p;
          const s = (17 + 61 * noise(i * 3 + 10)) * (0.55 + p);
          return (
            <path
              key={i}
              d={`M ${x - s} ${y + 5} l ${s * 0.57} ${-s * 0.4} l ${s} ${-s * 0.17} l ${s * 0.47} ${s * 0.43} l ${-s * 0.51} ${s * 0.36} Z`}
              fill={i % 4 === 0 ? "#a79a62" : "#65725a"}
              opacity={p * (1 - p) * 2.07}
            />
          );
        })}
      </g>
      <Stamp x={112} y={132} width={454} fill={c.coal} ink={c.cream}>
        ЧОРНОБИЛЬСЬКА АЕС
      </Stamp>
      <Text x={103} y={686 - 19 * beat} size={212} color={c.cream} fit={463}>
        БЛОК 4
      </Text>
      <Text x={118} y={759} size={35} face="mono" color={c.amber}>
        26.04.1986
      </Text>
      <Trace
        x={116}
        y={862}
        width={511}
        amplitude={18 + 109 * breakaway * (1 - phase)}
        color={c.red}
        f={f}
      />
    </Field>
  );
}

const apartments = [
  { x: 167, y: 353, w: 299, h: 419 },
  { x: 432, y: 257, w: 263, h: 473 },
  { x: 720, y: 346, w: 231, h: 429 },
  { x: 959, y: 207, w: 258, h: 538 },
  { x: 1312, y: 256, w: 307, h: 529 },
  { x: 1650, y: 385, w: 276, h: 407 },
];
export function Evacuation() {
  const { step, beat, phase } = useMotion("evacuation");
  const leave = step(2, 51, 15);
  return (
    <Field fill="#797f68">
      <path d="M 0 0 H 1920 V 416 L 0 663 Z" fill="#b9aa80" />
      <path d="M 0 859 L 1920 710 V 1080 H 0 Z" fill="#293c40" />
      <g transform={`translate(${81 - 205 * phase} 0) skewX(-7)`}>
        {apartments.map(({ x, y, w, h }, i) => (
          <TowerBlock
            key={x}
            x={x}
            y={y}
            width={w}
            height={h}
            fill={i % 2 ? "#394748" : "#485c56"}
            light={c.cream}
            lit={(1 - step(i % 4, 41, 18)) * 0.63}
            slots={5}
            seed={i + 4}
          />
        ))}
      </g>
      <path
        d="M 0 900 L 1920 783 M 0 1006 L 1920 862"
        stroke={c.cream}
        strokeWidth="3.3"
        opacity=".49"
      />
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          transform={`translate(${-392 + i * 542 + (1 - i * 0.12) * (230 + 1581 * leave)} ${871 - i * 24 - 43 * leave}) rotate(-4) scale(${1 - i * 0.081})`}
        >
          <path
            d="M 0 -137 H 434 L 481 -113 V 41 H 0 Z"
            fill={i % 2 ? "#744d3b" : "#9d7950"}
            stroke={c.bone}
            strokeWidth="2"
          />
          <path d="M 14 -112 H 455 L 460 -45 H 14 Z" fill="#253b41" />
          {range(7).map((j) => (
            <path
              key={j}
              d={`M ${66 + 56 * j} -111 V -45`}
              stroke={c.bone}
              strokeWidth="2.6"
              opacity=".62"
            />
          ))}
          <circle
            cx="105"
            cy="33"
            r="38"
            fill={c.coal}
            stroke={c.bone}
            strokeWidth="2"
          />
          <circle
            cx="389"
            cy="33"
            r="38"
            fill={c.coal}
            stroke={c.bone}
            strokeWidth="2"
          />
        </g>
      ))}
      <Ribbon
        x={-24}
        y={157 + 10 * beat}
        width={777}
        height={118}
        flop={22 - 40 * leave}
        tilt={-4}
        color="#2b3b37"
      />
      <Text x={112} y={233} size={80} color={c.cream}>
        ПРИПЯТЬ
      </Text>
      <InkGrain opacity={0.18} />
    </Field>
  );
}

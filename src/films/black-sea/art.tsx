import { useContext, useId, type ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { between, clamp, count, fmt, random, SceneLength, wave } from "./score";

export const ink = {
  night: "#152644",
  deep: "#213858",
  navy: "#304c74",
  indigo: "#414b79",
  lapis: "#3e6c96",
  sea: "#508c9c",
  glass: "#86b5be",
  mist: "#bdd2d2",
  milk: "#f4ead5",
  white: "#fff4d8",
  violet: "#8c86a6",
  lilac: "#b2a5ba",
  rose: "#b97c83",
  peach: "#e3ac87",
  brass: "#c99456",
};
export function Plate({
  children,
  base = ink.night,
}: {
  children: ReactNode;
  base?: string;
}) {
  return (
    <svg className="sea-plate" viewBox="0 0 1920 1080" aria-hidden="true">
      <rect width="1920" height="1080" fill={base} />
      {children}
    </svg>
  );
}
export function Wash({
  colors,
  x = 0,
  y = 0,
  w = 1920,
  h = 1080,
  side = false,
  alpha = 1,
}: {
  colors: string[];
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  side?: boolean;
  alpha?: number;
}) {
  const id = useId();
  return (
    <>
      <defs>
        <linearGradient
          id={id}
          x1="0%"
          y1="0%"
          x2={side ? "100%" : "0%"}
          y2={side ? "0%" : "100%"}
        >
          {colors.map((col, i) => (
            <stop key={i} offset={i / (colors.length - 1)} stopColor={col} />
          ))}
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={`url(#${id})`}
        opacity={alpha}
      />
    </>
  );
}
export function Bloom({
  x,
  y,
  rx,
  ry,
  color = ink.milk,
  opacity = 0.7,
}: {
  x: number;
  y: number;
  rx: number;
  ry: number;
  color?: string;
  opacity?: number;
}) {
  const id = useId();
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop stopColor={color} />
          <stop offset=".42" stopColor={color} stopOpacity=".52" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={x}
        cy={y}
        rx={rx}
        ry={ry}
        fill={`url(#${id})`}
        opacity={opacity}
      />
    </>
  );
}
export function Etch({
  d,
  fill = "none",
  line = ink.mist,
  spacing = 10,
  angle = -24,
  opacity = 0.36,
  weight = 1.3,
}: {
  d: string;
  fill?: string;
  line?: string;
  spacing?: number;
  angle?: number;
  opacity?: number;
  weight?: number;
}) {
  const id = useId();
  return (
    <>
      <defs>
        <pattern
          id={id}
          width={spacing}
          height={spacing * 7}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          <path
            d={`M 0 -2 Q 1 ${spacing * 2} 0 ${spacing * 4} T 0 ${spacing * 7 + 2}`}
            stroke={line}
            strokeWidth={weight}
            fill="none"
          />
        </pattern>
      </defs>
      <path d={d} fill={fill} />
      <path d={d} fill={`url(#${id})`} opacity={opacity} />
    </>
  );
}
export function Letter({
  x,
  y,
  size,
  children,
  fill = ink.milk,
  serif = false,
  italic = false,
  weight,
  space = 0,
  anchor = "start",
  alpha = 1,
}: {
  x: number;
  y: number;
  size: number;
  children: ReactNode;
  fill?: string;
  serif?: boolean;
  italic?: boolean;
  weight?: number;
  space?: number;
  anchor?: "start" | "middle" | "end";
  alpha?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      opacity={alpha}
      fontFamily={
        serif || italic
          ? '"Sea Spectral", Georgia, serif'
          : '"Sea Source Sans 3", Arial, sans-serif'
      }
      fontStyle={italic ? "italic" : "normal"}
      fontWeight={weight ?? (serif || italic ? 500 : 400)}
      letterSpacing={space}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}
export function Caption({
  x = 109,
  y = 877,
  lines,
  head,
  light = true,
  f = 30,
  size = 45,
  anchor = "start",
}: {
  x?: number;
  y?: number;
  lines: string[];
  head?: string;
  light?: boolean;
  f?: number;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  const color = light ? ink.white : ink.night;
  const length = useContext(SceneLength);
  const end = 1 - between(useCurrentFrame(), length - 12, length - 1);
  const show = between(f, -3, 22);
  return (
    <g transform={`translate(0 ${(1 - show) * 16})`} opacity={show * end}>
      {head && (
        <Letter
          x={x}
          y={y - 58}
          size={27}
          fill={color}
          space={3}
          weight={600}
          anchor={anchor}
        >
          {head}
        </Letter>
      )}
      {lines.map((line, i) => (
        <Letter
          key={line}
          x={x}
          y={y + i * (size * 1.16)}
          size={size}
          fill={color}
          serif
          anchor={anchor}
        >
          {line}
        </Letter>
      ))}
    </g>
  );
}
export function Ropes({
  x,
  y,
  width,
  bend,
  f,
  colors = [ink.navy, ink.glass],
  size = 11,
}: {
  x: number;
  y: number;
  width: number;
  bend: number;
  f: number;
  colors?: string[];
  size?: number;
}) {
  const d = `M 0 0 Q ${width * 0.47} ${bend + wave(f, 0.024) * 9} ${width} 0`;
  return (
    <g transform={`translate(${x} ${y})`} fill="none" strokeLinecap="round">
      <path d={d} stroke={colors[0]} strokeWidth={size} />
      <path
        d={d}
        stroke={colors[1]}
        strokeWidth={size * 0.64}
        strokeDasharray={`2 ${size * 1.07}`}
      />
    </g>
  );
}
export function Motes({
  f,
  n = 48,
  color = ink.milk,
  drift = 1,
  alpha = 0.41,
  seed = 0,
}: {
  f: number;
  n?: number;
  color?: string;
  drift?: number;
  alpha?: number;
  seed?: number;
}) {
  return (
    <g fill={color} opacity={alpha}>
      {count(n).map((i) => {
        const j = i + seed * 3;
        const x =
          ((random(j * 13 + 1) * 2030 +
            f * (0.28 + random(j * 7) * 0.85) * drift +
            4060) %
            2030) -
          55;
        const y =
          ((random(j * 7 + 3) * 1190 +
            f * 0.18 * drift +
            23 * wave(f, 0.015, j)) %
            1190) -
          55;
        const r = 0.9 + random(j * 37) * 2.6;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={r * 1.6}
            ry={r}
            opacity={0.21 + 0.79 * random(j + 8)}
          />
        );
      })}
    </g>
  );
}

const ripples = count(144).map((i) => ({
  x: random(i * 13 + 1),
  y: random(i * 71 + 5),
  w: random(i * 19 + 2),
  q: random(i * 29),
}));
export function Surface({
  f,
  horizon = 529,
  night = false,
  wind = 1,
  light = 0,
}: {
  f: number;
  horizon?: number;
  night?: boolean;
  wind?: number;
  light?: number;
}) {
  const H = 1082 - horizon;
  const horizonInk = night ? "#8194ae" : "#b1d4ce";
  const water = night
    ? ["#536e88", "#334f72", "#1e385c"]
    : ["#8bb2b7", "#4d8c9f", "#2e5978"];
  return (
    <g>
      <Wash y={horizon} h={H} colors={water} />
      {count(11).map((i) => {
        const p = (i + 0.48) / 11,
          y = horizon + H * p * p;
        const amplitude = (2 + 19 * p * p) * wind;
        const pts = count(34).map((j) => {
          const x = j * 64 - 62;
          const v =
            wave(f, 0.022 + i * 0.0008, x * 0.005 + i * 0.73) * 0.58 +
            wave(f, -0.015, x * 0.013 - i * 0.57) * 0.31 +
            wave(f, 0.018, x * 0.025 + i) * 0.11;
          return `${fmt(x)},${fmt(y + v * amplitude)}`;
        });
        return (
          <path
            key={i}
            d={`M ${pts.join(" L ")} l 0 ${3 + p * 16} Q 1140 ${y + amplitude * 1.55} -62 ${y + 7 + p * 16} Z`}
            fill={i % 3 === 0 ? horizonInk : ink.deep}
            opacity={0.115 + 0.1 * p}
          />
        );
      })}
      {[0, 1, 2].map((layer) => {
        const d = ripples
          .filter((_, i) => i % 3 === layer)
          .map((r) => {
            const p = r.y * r.y;
            const x =
              ((r.x * 2130 + f * (0.09 + p * 0.54) * wind) % 2130) - 105;
            const y =
              horizon +
              5 +
              p * (H - 7) +
              wave(f, 0.026 + r.q * 0.012, r.x * 27) * p * 7;
            const length = (9 + 69 * r.w) * (p * 0.79 + 0.24);
            return `M ${fmt(x)} ${fmt(y)} q ${fmt(length * 0.41)} ${fmt(-1 - p * 3)} ${fmt(length)} ${fmt(-0.3 + wave(f, 0.025, r.q * 18) * p * 2)}`;
          })
          .join(" ");
        return (
          <path
            key={layer}
            d={d}
            stroke={layer === 0 ? ink.milk : layer === 1 ? ink.glass : ink.navy}
            strokeWidth={1.2 + layer * 0.72}
            opacity={0.49 + light * 0.18}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
      <path
        d={`M 0 ${horizon} Q 620 ${horizon - 2} 1070 ${horizon + 1} T 1920 ${horizon - 1}`}
        fill="none"
        stroke={ink.milk}
        strokeWidth="2"
        opacity=".75"
      />
    </g>
  );
}
export function Hills({
  f = 0,
  y = 510,
  side = 0,
  night = false,
}: {
  f?: number;
  y?: number;
  side?: number;
  night?: boolean;
}) {
  const pts = (i: number, amp: number, shift: number) =>
    count(33)
      .map((j) => {
        const x = j * 70 - 124,
          a =
            wave(x + shift, 0.003, side) * 0.48 +
            wave(x, 0.0079, i + side) * 0.28 +
            random(j + 43 * i + side) * 0.24;
        return `${x},${fmt(y - amp * (a + 0.68))}`;
      })
      .join(" L ");
  return (
    <g transform={`translate(${-12 * wave(f, 0.004)} 0)`}>
      <path
        d={`M ${pts(1, 126, 160)} V ${y + 40} H -190 Z`}
        fill={night ? "#60738e" : "#a7a8ba"}
        opacity=".78"
      />
      <path
        d={`M ${pts(2, 70, 865)} V ${y + 39} H -190 Z`}
        fill={night ? "#415876" : "#8197aa"}
      />
      <path
        d={`M ${pts(3, 29, 442)} V ${y + 37} H -190 Z`}
        fill={night ? "#354765" : "#617f96"}
      />
    </g>
  );
}
export function Crane({
  x,
  y,
  s = 1,
  f = 0,
  lean = 0,
  inkColor = ink.deep,
}: {
  x: number;
  y: number;
  s?: number;
  f?: number;
  lean?: number;
  inkColor?: string;
}) {
  const cable = wave(f, 0.031, x) * 6;
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      stroke={inkColor}
      strokeLinejoin="round"
    >
      <Etch
        d="M -66 0 L -40 -104 H 30 L 56 0 H 33 L 15 -62 H -20 L -39 0 Z"
        fill={inkColor}
        line={ink.glass}
        spacing={7}
        opacity={0.42}
      />
      <g transform={`rotate(${lean} 0 -98)`}>
        <path
          d="M -49 -108 H 30 L 42 -132 L 25 -145 H -14 L -28 -130 H -54 Z"
          fill={inkColor}
        />
        <path
          d="M -6 -138 L 9 -222 L 24 -217 L 24 -136 M 11 -220 L 153 -278 L 163 -266 L 27 -175 Z"
          fill="none"
          strokeWidth="5"
        />
        <path
          d="M 11 -218 L 23 -198 L 13 -183 L 24 -168 L 2 -148 M 32 -225 l 20 20 7 -31 22 11 12 -28 22 10 8 -25 23 8"
          strokeWidth="3"
          fill="none"
        />
        <path
          d={`M 158 -270 Q ${162 + cable} -210 ${160 + cable} -146 q -3 9 -10 4`}
          strokeWidth="2.5"
          fill="none"
        />
        <path d="M -10 -134 H 21 V -143 H 0 Z" fill={ink.glass} stroke="none" />
      </g>
    </g>
  );
}
export function Vessel({
  x,
  y,
  s = 1,
  f = 0,
  dark = false,
}: {
  x: number;
  y: number;
  s?: number;
  f?: number;
  dark?: boolean;
}) {
  const body = dark ? ink.night : ink.navy;
  return (
    <g
      transform={`translate(${x} ${y + 3 * wave(f, 0.032, x)}) scale(${s}) rotate(${wave(f, 0.025, x) * 0.72})`}
    >
      <path
        d="M -224 -35 Q -140 -21 161 -31 L 234 -57 Q 221 -9 188 7 L -178 13 Q -205 1 -224 -35 Z"
        fill={body}
      />
      <path
        d="M -202 -11 Q 32 1 211 -25"
        fill="none"
        stroke={ink.peach}
        strokeWidth="5"
      />
      <Etch
        d="M -149 -38 V -76 H -98 V -125 H -29 V -105 H 17 V -43 Z"
        fill={ink.mist}
        line={ink.navy}
        spacing={8}
      />
      <path
        d="M -133 -57 h 139 M -90 -98 h 57"
        stroke={ink.deep}
        strokeWidth="9"
        strokeDasharray="9 6"
      />
      <path
        d="M -76 -125 v -45 m -9 23 h 38 M 52 -36 v -67 m -25 63 25 -59 76 56"
        fill="none"
        stroke={body}
        strokeWidth="4"
      />
      <path
        d="M -233 17 Q -58 35 89 24 T 262 2"
        stroke={ink.glass}
        strokeWidth="3"
        fill="none"
      />
    </g>
  );
}
export function Quayside({
  x = 0,
  y = 572,
  s = 1,
  f,
  broken = 0,
}: {
  x?: number;
  y?: number;
  s?: number;
  f: number;
  broken?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M -90 -26 L 170 -56 L 305 -47 L 425 -64 L 605 -53 L 822 -65 L 1027 -42 L 1209 -45 L 1349 -32 L 1514 -44 L 1743 -28 L 2020 -36 V 14 H -90 Z"
        fill={ink.navy}
      />
      {count(12).map((i) => {
        const w = 54 + random(i + 13) * 70,
          h = 26 + random(i * 5) * 48,
          px = i * 148 - 60;
        return (
          <g
            key={i}
            transform={`translate(${px} ${-35 - random(i + 2) * 18}) rotate(${i % 4 === 0 ? broken * 9 : 0})`}
          >
            <path
              d={`M 0 0 V ${-h} L ${w * 0.55} ${-h - 13} L ${w} ${-h} V 0 Z`}
              fill={i % 2 ? ink.deep : ink.lapis}
            />
            <path
              d={`M 9 ${-h * 0.55} h ${w - 20}`}
              stroke={ink.mist}
              strokeWidth="4"
              strokeDasharray="4 8"
              opacity=".71"
            />
          </g>
        );
      })}
      <Crane x={332} y={-26} s={0.68} f={f} lean={-22 * broken} />
      <Crane x={630} y={-28} s={0.95} f={f + 22} lean={32 * broken} />
      <Crane x={1118} y={-21} s={0.74} f={f + 33} lean={-7 * broken} />
      <path
        d="M -100 0 Q 375 9 735 2 T 1510 -2 T 2020 -2"
        stroke={ink.mist}
        strokeWidth="3"
        fill="none"
      />
    </g>
  );
}
export function SkyWater({
  f,
  h = 542,
  night = false,
  side = 0,
  rough = 1,
}: {
  f: number;
  h?: number;
  night?: boolean;
  side?: number;
  rough?: number;
}) {
  return (
    <>
      <Wash
        colors={
          night
            ? ["#202c50", "#58627f", "#beb1af"]
            : ["#7296b2", "#a8c1cc", "#f0d2af"]
        }
        y={0}
        h={h + 12}
      />
      <Bloom
        x={side ? 1370 : 422}
        y={h - 40}
        rx={809}
        ry={260}
        color={night ? ink.lilac : ink.white}
        opacity={night ? 0.39 : 0.6}
      />
      <Hills y={h} f={f} side={side} night={night} />
      <Surface f={f} horizon={h} night={night} wind={rough} />
    </>
  );
}
export function RainGlass({
  f,
  seed = 0,
  area = 1920,
  amount = 39,
  opacity = 0.5,
}: {
  f: number;
  seed?: number;
  area?: number;
  amount?: number;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {count(amount).map((i) => {
        const n = seed + i * 13.41,
          x = random(n) * area;
        const y =
          ((random(n + 12) * 1250 + f * (0.25 + random(n + 5) * 2.6)) % 1240) -
          72;
        const l = 6 + random(n + 6) * 55;
        return (
          <path
            key={i}
            d={`M ${fmt(x)} ${fmt(y - l)} q 1 15 -2 ${fmt(l)} c -.5 5 4 7 4 2`}
            fill="none"
            stroke={i % 3 === 0 ? ink.navy : ink.white}
            strokeWidth={i % 4 === 0 ? 2.4 : 1.3}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}
export function Shade({
  x = 0,
  y = 0,
  width = 1920,
  height = 1080,
  up = false,
  alpha = 0.56,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  up?: boolean;
  alpha?: number;
}) {
  const id = useId();
  return (
    <>
      <defs>
        <linearGradient
          id={id}
          x1="0%"
          y1={up ? "100%" : "0%"}
          x2="0%"
          y2={up ? "0%" : "100%"}
        >
          <stop stopColor={ink.night} stopOpacity="0" />
          <stop offset="1" stopColor={ink.night} stopOpacity={clamp(alpha)} />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={width} height={height} fill={`url(#${id})`} />
    </>
  );
}

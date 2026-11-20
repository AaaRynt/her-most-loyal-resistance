import { useId } from "react";
import { Bloom, Etch, ink } from "./art";
import { count, fmt, random, wave } from "./score";

export function Person({
  x,
  y,
  s = 1,
  face = 1,
  f = 0,
  walk = 0,
  pose = "rest",
  armLift = 1,
  coat = ink.navy,
  skin = "#b69088",
  hat = false,
  bag = false,
  seed = 0,
}: {
  x: number;
  y: number;
  s?: number;
  face?: number;
  f?: number;
  walk?: number;
  pose?: "rest" | "carry" | "reach" | "watch";
  armLift?: number;
  coat?: string;
  skin?: string;
  hat?: boolean;
  bag?: boolean;
  seed?: number;
}) {
  const gait = Math.sin(f * 0.088 + seed * 2) * walk;
  const shoulder = wave(f, 0.037, seed) * 2;
  const armTurn =
    pose === "rest" ? -gait * 9 : wave(f, 0.04, seed) * 2 + (1 - armLift) * 65;
  const sleeve =
    pose === "carry"
      ? "M 24 -133 Q 42 -126 48 -96 L 73 -85 L 72 -73 L 33 -77 Q 21 -85 14 -111 Z"
      : pose === "reach"
        ? "M 24 -139 Q 39 -141 54 -160 L 72 -181 L 85 -176 L 64 -140 L 36 -112 L 16 -118 Z"
        : pose === "watch"
          ? "M 23 -137 Q 43 -141 56 -157 L 43 -184 L 54 -192 L 77 -161 Q 81 -145 45 -113 L 24 -110 Z"
          : "M 23 -134 Q 37 -131 43 -112 L 47 -69 L 38 -38 L 25 -43 L 29 -80 L 16 -113 Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s * face} ${s})`}>
      <g transform={`translate(0 ${Math.abs(gait) * -2.7})`}>
        <path
          d={`M -24 -56 Q -30 -31 ${-37 - 7 * gait} -8 L ${-71 - 15 * gait} 38 l 10 8 ${27 + 18 * gait} -26 L -6 -45 Z`}
          fill={ink.deep}
        />
        <path
          d={`M 4 -53 L 24 -50 L ${20 + 9 * gait} -5 L ${31 + 22 * gait} 34 l -3 8 -13 0 L ${-2 + gait * 9} 2 Z`}
          fill={coat}
        />
        <path
          d={`M ${-69 - 14 * gait} 34 q -7 8 -6 15 h 33 q 2 -4 -5 -7 l -10 -5 Z M ${14 + 21 * gait} 35 v 13 h 36 q 0 -7 -14 -9 l -5 -5 Z`}
          fill={ink.night}
        />
        <g transform={`rotate(${shoulder} 0 -130)`}>
          <path
            d="M -18 -155 Q -40 -135 -34 -103 L -46 -54 Q -25 -41 6 -44 L 34 -51 L 23 -91 Q 28 -115 18 -139 L 6 -153 Z"
            fill={coat}
            stroke={ink.deep}
            strokeWidth="2.8"
          />
          <path
            d="M -25 -137 Q -18 -119 -21 -88 L -32 -58 M -11 -145 Q -2 -131 -1 -110 L 3 -55 M 17 -94 l -9 13"
            stroke={ink.mist}
            strokeOpacity=".54"
            strokeWidth="2"
            fill="none"
          />
          <path d="M -15 -163 l 3 18 q 9 10 21 -3 l -3 -16 Z" fill={skin} />
          <path
            d="M -25 -181 Q -27 -208 -8 -214 Q 16 -219 24 -200 L 24 -190 l 7 9 -7 3 q -2 13 -13 16 l -10 -1 -9 8 -12 -7 Z"
            fill={skin}
            stroke={ink.deep}
            strokeWidth="1.7"
          />
          <path
            d="M -26 -179 Q -37 -209 -14 -220 Q 6 -228 18 -215 L 25 -203 Q 14 -208 5 -200 L -5 -197 L -9 -180 l -8 7 -1 10 -10 -3 Z"
            fill={ink.deep}
          />
          <path
            d="M 14 -195 l 7 -1 M 21 -178 l 5 -1"
            stroke={ink.deep}
            strokeWidth="1.8"
            fill="none"
          />
          {hat && (
            <g>
              <path
                d="M -31 -196 Q -36 -225 -6 -230 Q 17 -232 24 -209 L 34 -203 Q 1 -201 -29 -188 Z"
                fill={ink.glass}
                stroke={ink.deep}
                strokeWidth="2.5"
              />
              <path
                d="M -21 -211 Q -12 -223 1 -224"
                fill="none"
                stroke={ink.white}
                strokeWidth="2.3"
              />
            </g>
          )}
          <path
            d="M -17 -153 l 7 21 15 -14 14 12 -6 -18"
            fill={ink.glass}
            opacity=".66"
          />
          <g transform={`rotate(${armTurn} 21 -133)`}>
            <path d={sleeve} fill={coat} stroke={ink.deep} strokeWidth="3" />
            {pose === "carry" ? (
              <path d="M 69 -86 q 11 -5 18 0 l 5 4 -8 7 -14 2 Z" fill={skin} />
            ) : pose === "reach" ? (
              <path
                d="M 69 -181 l 7 -14 6 -5 0 11 9 -7 -3 12 -8 10 Z"
                fill={skin}
              />
            ) : pose === "watch" ? (
              <path
                d="M 44 -183 l -10 -7 -11 1 -1 -7 19 -3 13 9 Z"
                fill={skin}
              />
            ) : (
              <path d="M 27 -43 l 9 3 -3 12 -7 6 -4 -6 Z" fill={skin} />
            )}
          </g>
          {bag && (
            <g>
              <path
                d="M 12 -145 Q -7 -114 -30 -70"
                fill="none"
                stroke={ink.peach}
                strokeWidth="4"
              />
              <path
                d="M -48 -76 Q -31 -81 -16 -72 L -14 -43 Q -37 -40 -51 -48 Z"
                fill={ink.rose}
                stroke={ink.deep}
                strokeWidth="3"
              />
              <path d="M -48 -70 q 12 10 31 4" stroke={ink.peach} fill="none" />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}

export function Hand({
  x,
  y,
  s = 1,
  angle = 0,
  mirror = 1,
  glove = false,
  f = 0,
}: {
  x: number;
  y: number;
  s?: number;
  angle?: number;
  mirror?: number;
  glove?: boolean;
  f?: number;
}) {
  const color = glove ? "#9fb8bc" : "#d7aa93",
    shadow = glove ? ink.lapis : "#a27275";
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${mirror * s} ${s})`}
    >
      <path
        d="M 385 8 C 326 9 300 7 258 -8 C 209 -28 184 -37 146 -43 L 74 -47 Q 53 -48 32 -35 L -13 -9 Q -26 1 -16 8 Q -9 14 5 9 L 59 -13 L 99 -16 L 54 5 L 5 32 Q -6 39 0 47 Q 7 56 23 50 L 83 28 L 108 22 L 74 43 L 44 64 Q 36 72 45 79 Q 52 83 64 78 L 113 54 L 130 46 L 107 66 Q 96 76 105 83 Q 114 88 129 79 L 182 49 C 216 70 250 82 281 72 L 386 95 Z"
        fill={color}
        stroke={ink.deep}
        strokeWidth="3.4"
      />
      <path
        d="M 86 -15 Q 124 -32 149 -25 M 100 23 Q 125 11 147 7 M 128 45 Q 151 32 162 19 M 179 49 Q 197 35 212 36 M 254 -3 Q 230 22 245 44"
        fill="none"
        stroke={shadow}
        strokeWidth="2.4"
      />
      <path
        d="M 16 -13 q 6 -5 12 -3 M 16 37 l 10 -4 M 63 66 l 9 -4"
        stroke={ink.milk}
        strokeWidth="3"
        opacity=".76"
        fill="none"
      />
      <g transform={`translate(${wave(f, 0.023) * 1.8} 0)`}>
        <Etch
          d="M 331 -21 Q 355 -11 380 -19 L 755 -85 L 790 152 L 351 116 Q 320 74 331 -21 Z"
          fill={glove ? ink.lapis : ink.indigo}
          line={ink.mist}
          spacing={9}
          angle={22}
          opacity={0.42}
        />
        <path
          d="M 335 -15 Q 317 55 352 108 M 352 -17 Q 336 48 366 109"
          stroke={ink.mist}
          strokeWidth="3.3"
          fill="none"
        />
      </g>
    </g>
  );
}

export function Enamel({
  x,
  y,
  s = 1,
  tilt = 0,
  f = 0,
  surge = 0,
}: {
  x: number;
  y: number;
  s?: number;
  tilt?: number;
  f?: number;
  surge?: number;
}) {
  const body = useId(),
    top = useId();
  const roll = wave(f, 0.046) * 1.5 + surge;
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${tilt} 0 176)`}>
      <defs>
        <linearGradient id={body} x2="1" y2=".12">
          <stop stopColor="#7f9aa8" />
          <stop offset=".24" stopColor="#d4dfd8" />
          <stop offset=".52" stopColor="#f2e8cf" />
          <stop offset=".83" stopColor="#b5c9ca" />
          <stop offset="1" stopColor="#66859d" />
        </linearGradient>
        <clipPath id={top}>
          <ellipse cy="0" rx="117" ry="29" />
        </clipPath>
      </defs>
      <path
        d="M 99 38 C 196 -18 216 59 181 117 Q 152 155 100 142"
        fill="none"
        stroke={ink.deep}
        strokeWidth="24"
      />
      <path
        d="M 102 38 C 190 -9 204 56 174 109 Q 151 141 105 142"
        fill="none"
        stroke={ink.mist}
        strokeWidth="13"
      />
      <path
        d="M -125 0 C -123 46 -113 119 -105 163 C -98 201 93 207 104 168 L 124 0 Z"
        fill={`url(#${body})`}
        stroke={ink.deep}
        strokeWidth="4"
      />
      <path
        d="M -117 31 Q -12 70 115 32 M -106 153 Q -25 187 103 159"
        stroke={ink.lapis}
        strokeOpacity=".74"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M -104 48 Q -99 80 -95 100 M -87 113 l 3 28 M 83 52 q 6 65 -5 94"
        stroke={ink.white}
        strokeWidth="6.2"
        fill="none"
        opacity=".64"
      />
      <path
        d="M -80 151 l 12 -5 7 6 16 -4 3 6 -11 7 -17 -1 -9 4 Z M 92 67 l 6 -4 -2 5 -7 4 Z"
        fill={ink.deep}
        opacity=".83"
      />
      <ellipse
        rx="126"
        ry="33"
        fill={ink.navy}
        stroke={ink.deep}
        strokeWidth="3"
      />
      <ellipse rx="117" ry="26" fill="#7a9ba8" />
      <g clipPath={`url(#${top})`}>
        <path
          d={`M -127 ${6 + roll} C -53 ${-13 - roll} 24 ${5 + roll * 0.75} 129 ${5 - roll} V 44 H -127 Z`}
          fill={ink.sea}
        />
        <path
          d={`M -99 ${7 + roll} Q -40 ${-3 - roll} 28 7 T 110 ${7 - roll}`}
          stroke={ink.white}
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <path
        d="M -124 -2 Q -122 -31 -23 -33 M 24 -32 Q 94 -31 119 -13"
        stroke={ink.white}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M -102 172 Q -24 194 95 173"
        fill="none"
        stroke={ink.indigo}
        strokeWidth="5"
      />
    </g>
  );
}
export function TeaGlass({
  x,
  y,
  s = 1,
  tilt = 0,
  f = 0,
  surge = 0,
}: {
  x: number;
  y: number;
  s?: number;
  tilt?: number;
  f?: number;
  surge?: number;
}) {
  const glass = useId(),
    tea = useId(),
    shape = useId();
  const d =
    "M -72 0 C -79 33 -68 60 -51 91 C -34 122 -40 135 -56 162 Q -70 193 -48 208 Q 0 228 48 207 Q 66 191 55 165 C 41 136 35 121 51 92 C 67 63 79 33 72 0 Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <linearGradient id={glass}>
          <stop stopColor="#8faab8" stopOpacity=".85" />
          <stop offset=".26" stopColor={ink.white} stopOpacity=".55" />
          <stop offset=".56" stopColor="#d3d5cf" stopOpacity=".25" />
          <stop offset=".83" stopColor={ink.mist} stopOpacity=".75" />
          <stop offset="1" stopColor={ink.lapis} stopOpacity=".88" />
        </linearGradient>
        <linearGradient id={tea}>
          <stop stopColor="#864f50" />
          <stop offset=".34" stopColor="#db9461" />
          <stop offset=".62" stopColor="#bf7053" />
          <stop offset="1" stopColor="#6f4050" />
        </linearGradient>
        <clipPath id={shape}>
          <path d={d} />
        </clipPath>
      </defs>
      <ellipse cy="213" rx="148" ry="37" fill={ink.navy} />
      <ellipse
        cy="204"
        rx="149"
        ry="34"
        fill={ink.milk}
        stroke={ink.lapis}
        strokeWidth="4"
      />
      <ellipse
        cy="205"
        rx="96"
        ry="22"
        fill="none"
        stroke={ink.glass}
        strokeWidth="3"
      />
      {count(15).map((i) => {
        const a = (i * 2 * Math.PI) / 15;
        return (
          <path
            key={i}
            d="M -9 0 Q 0 -9 12 0 Q 2 8 -9 0 Z"
            fill={i % 3 === 0 ? ink.rose : ink.lapis}
            transform={`translate(${Math.cos(a) * 125} ${204 + Math.sin(a) * 25}) rotate(${Math.sin(a) * 13})`}
          />
        );
      })}
      <g transform={`rotate(${tilt} 0 204)`}>
        <path
          d={d}
          fill={`url(#${glass})`}
          stroke={ink.navy}
          strokeWidth="3.3"
        />
        <g clipPath={`url(#${shape})`}>
          <path
            d={`M -82 ${59 + surge} Q -16 ${46 - surge} 12 55 T 87 ${52 - surge} V 206 Q -2 224 -82 205 Z`}
            fill={`url(#${tea})`}
            opacity=".94"
          />
          <path
            d={`M -82 ${59 + surge} Q -16 ${46 - surge} 12 55 T 87 ${52 - surge}`}
            stroke={ink.peach}
            strokeWidth="4"
            fill="none"
          />
          {count(4).map((i) => (
            <path
              key={i}
              d={`M ${-34 + i * 16} 177 q ${11 * wave(f, 0.021, i)} -12 5 -25`}
              fill="none"
              stroke={ink.brass}
              opacity=".34"
              strokeWidth="3"
            />
          ))}
        </g>
        <ellipse
          rx="72"
          ry="17"
          fill={ink.glass}
          fillOpacity=".18"
          stroke={ink.milk}
          strokeWidth="3"
        />
        <path
          d="M -57 15 Q -61 52 -42 75 M -43 156 q -10 20 -7 29 M 45 88 Q 33 116 43 141 M 61 18 l -1 13"
          fill="none"
          stroke={ink.white}
          strokeWidth="5.4"
          strokeLinecap="round"
          opacity=".89"
        />
        <path
          d="M -45 204 Q 1 220 48 202"
          fill="none"
          stroke={ink.milk}
          strokeWidth="3.5"
        />
      </g>
    </g>
  );
}
export function Bed({
  x,
  y,
  s = 1,
  f = 0,
  blanket = ink.glass,
  patient = true,
}: {
  x: number;
  y: number;
  s?: number;
  f?: number;
  blanket?: string;
  patient?: boolean;
}) {
  const breath = wave(f, 0.039) * 2.3;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M -174 5 L -134 70 L 137 70 L 175 3 M -149 13 l 266 52 M 147 12 L -111 69"
        fill="none"
        stroke={ink.lapis}
        strokeWidth="8"
      />
      {[-132, 135].map((v) => (
        <g key={v}>
          <circle cx={v} cy="81" r="16" fill={ink.night} />
          <circle cx={v} cy="81" r="8" fill={ink.mist} />
          <path
            d={`M ${v - 5} 83 l 11 -6`}
            stroke={ink.deep}
            strokeWidth="3"
            transform={`rotate(${f * 5} ${v} 81)`}
          />
        </g>
      ))}
      <path
        d="M -227 -5 Q -231 -14 -219 -18 L 184 -18 Q 211 -14 211 -5 L 206 5 H -227 Z"
        fill={ink.milk}
        stroke={ink.deep}
        strokeWidth="3"
      />
      <path
        d="M -220 -26 Q -205 -48 -163 -51 Q -123 -49 -111 -27 Z"
        fill={ink.mist}
      />
      {patient && (
        <g transform={`translate(0 ${breath})`}>
          <path
            d="M -191 -43 Q -197 -67 -178 -74 Q -156 -84 -144 -72 l 8 10 14 5 -5 9 6 5 -6 7 -27 3 Z"
            fill={ink.peach}
            stroke={ink.deep}
            strokeWidth="2"
          />
          <path
            d="M -193 -42 Q -211 -67 -185 -80 Q -163 -89 -145 -73 Q -172 -73 -175 -52 L -182 -41 Z"
            fill={ink.deep}
          />
          <path
            d="M -125 -55 Q -91 -78 -50 -60 C -11 -55 25 -49 83 -42 Q 130 -51 160 -40 L 193 -20 L 176 -8 L -132 -11 Z"
            fill={blanket}
            stroke={ink.lapis}
            strokeWidth="2.6"
          />
          <path
            d="M -97 -57 q 18 21 15 42 M -44 -53 q 22 12 19 32 M 72 -40 l 27 15 M 110 -38 q 15 2 23 9"
            fill="none"
            stroke={ink.milk}
            opacity=".72"
            strokeWidth="2.4"
          />
        </g>
      )}
      <path
        d="M -224 0 V -42 q -1 -11 10 -11 M 204 -5 V -35 q 1 -5 9 -5"
        fill="none"
        stroke={ink.deep}
        strokeWidth="5"
      />
    </g>
  );
}
export function Key({
  x,
  y,
  s = 1,
  angle = 0,
  color = ink.brass,
}: {
  x: number;
  y: number;
  s?: number;
  angle?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
      <path
        d="M 12 -7 H 111 L 119 -2 v 10 h -12 v 12 H 95 v -6 H 83 v -8 H 13 Z"
        fill={color}
        stroke={ink.deep}
        strokeWidth="2"
      />
      <path
        d="M -24 -26 Q 7 -33 18 -12 Q 30 16 6 28 Q -10 38 -27 24 Q -48 6 -33 -14 Z M -20 -10 Q -33 3 -20 14 Q -9 23 2 12 Q 12 0 1 -10 Q -10 -18 -20 -10 Z"
        fill={color}
        fillRule="evenodd"
        stroke={ink.deep}
        strokeWidth="2"
      />
      <path
        d="M 13 -4 H 107 M -29 -12 Q -20 -25 -9 -24"
        stroke={ink.milk}
        opacity=".79"
        strokeWidth="2"
        fill="none"
      />
    </g>
  );
}
export function Drapery({
  x,
  y,
  w,
  h,
  f,
  color = ink.mist,
  alpha = 0.9,
  swing = 1,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  f: number;
  color?: string;
  alpha?: number;
  swing?: number;
}) {
  const sag = wave(f, 0.031, x) * w * 0.057 * swing;
  const hem = count(19)
    .map(
      (i) =>
        `${fmt(w - (i * w) / 18 + sag * (1 - i / 18))} ${fmt(h + wave(i, 0.998, f * 0.027) * 10)}`,
    )
    .join(" L ");
  return (
    <g transform={`translate(${x} ${y})`} opacity={alpha}>
      <path
        d={`M 0 0 H ${w} Q ${w - sag * 1.2} ${h * 0.49} ${w + sag} ${h} L ${hem} Q ${-sag} ${h * 0.54} 0 0 Z`}
        fill={color}
      />
      {count(11).map((i) => {
        const u = (i + 0.15) / 11,
          px = u * w;
        return (
          <path
            key={i}
            d={`M ${px} 0 C ${px + 16} ${h * 0.32} ${px - 28 - sag} ${h * 0.68} ${px + sag * u} ${h + wave(i, 0.8, f * 0.027) * 8}`}
            fill="none"
            stroke={i % 3 ? ink.lapis : ink.white}
            strokeOpacity={i % 3 ? 0.21 : 0.49}
            strokeWidth={i % 3 ? 2.9 : 5.2}
          />
        );
      })}
    </g>
  );
}
export function SaltRing({
  x,
  y,
  rx,
  ry,
  p = 1,
  f = 0,
  color = ink.milk,
}: {
  x: number;
  y: number;
  rx: number;
  ry: number;
  p?: number;
  f?: number;
  color?: string;
}) {
  const d = count(112)
    .map((i) => {
      const a = (i / 111) * Math.PI * 2 * p + 0.25;
      const radius =
        1 + 0.017 * Math.sin(a * 11) + 0.009 * Math.sin(a * 17 + 0.62);
      return `${i ? "L" : "M"} ${fmt(x + Math.cos(a) * rx * radius)} ${fmt(y + Math.sin(a) * ry * radius)}`;
    })
    .join(" ");
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth="2.8" opacity=".62" />
      {count(77).map((i) => {
        const a = random(i * 7 + 8) * Math.PI * 2;
        if (a > p * 2 * Math.PI) return null;
        const n = 0.975 + random(i * 4) * 0.065;
        return (
          <path
            key={i}
            d="M -2 -1 L 2 -3 L 4 1 L -1 3 Z"
            fill={color}
            opacity={0.25 + 0.55 * random(i + 4) + 0.1 * wave(f, 0.025, i)}
            transform={`translate(${x + Math.cos(a + 0.25) * rx * n} ${y + Math.sin(a + 0.25) * ry * n}) rotate(${i * 69}) scale(${0.6 + random(i * 5) * 1.2})`}
          />
        );
      })}
    </g>
  );
}
export function Lamp({
  x,
  y,
  s = 1,
  lit = 0.8,
}: {
  x: number;
  y: number;
  s?: number;
  lit?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Bloom
        x={0}
        y={24}
        rx={98}
        ry={84}
        color={ink.peach}
        opacity={lit * 0.45}
      />
      <path d="M 0 -130 V -28" stroke={ink.deep} strokeWidth="4" />
      <path
        d="M -52 0 Q -43 -27 -7 -34 h 14 Q 40 -28 52 0 Z"
        fill={ink.lapis}
        stroke={ink.deep}
        strokeWidth="2.7"
      />
      <ellipse
        cy="0"
        rx="52"
        ry="10"
        fill={ink.white}
        opacity={0.47 + lit * 0.48}
      />
    </g>
  );
}

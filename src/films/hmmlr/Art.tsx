import { useId, type CSSProperties, type ReactNode } from "react";
import { Interactive } from "remotion";

export const ink = "#131c1d";
export const paper = "#ebe0be";
export const sand = "#c3ae79";
export const brass = "#d9a952";
export const rust = "#aa4635";
export const teal = "#193840";
export const sea = "#82a5a6";

export function Board({ children }: { children: ReactNode }) {
  return (
    <svg className="full" viewBox="0 0 1920 1080" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Register({
  x,
  y,
  size = 13,
}: {
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    >
      <circle r={size * 0.42} />
      <path d={`M ${-size} 0 H ${size} M 0 ${-size} V ${size}`} />
    </g>
  );
}

export function FrameRule({ color }: { color: string }) {
  return (
    <g
      style={{ color }}
      opacity=".57"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M 104 168 V 116 H 156 M 1764 116 H 1816 V 168 M 104 920 V 964 H 156 M 1764 964 H 1816 V 920 M 104 935 H 1816" />
      <Register x={1816} y={935} size={12} />
    </g>
  );
}

export function Hatch({
  color,
  opacity = 0.14,
  scale = 12,
  angle = 35,
}: {
  color: string;
  opacity?: number;
  scale?: number;
  angle?: number;
}) {
  const id = useId();
  return (
    <g opacity={opacity}>
      <defs>
        <pattern
          id={id}
          width={scale}
          height={scale}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          <path d={`M 0 1 H ${scale}`} stroke={color} strokeWidth="1.5" />
          <path
            d={`M 0 ${scale * 0.6} H ${scale * 0.45}`}
            stroke={color}
            strokeWidth=".6"
          />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill={`url(#${id})`} />
    </g>
  );
}

export function Caption({
  children,
  x = 119,
  y = 137,
  color = paper,
}: {
  children: string;
  x?: number;
  y?: number;
  color?: string;
}) {
  return (
    <Interactive.Div
      name={children}
      className="mono"
      style={{ position: "absolute", left: x, top: y, color }}
    >
      {children}
    </Interactive.Div>
  );
}

export function Type({
  name,
  children,
  style,
  face = "condensed",
}: {
  name: string;
  children: ReactNode;
  style: CSSProperties;
  face?: "condensed" | "serif";
}) {
  return (
    <Interactive.Div
      name={name}
      className={face}
      style={{ position: "absolute", ...style }}
    >
      {children}
    </Interactive.Div>
  );
}

const rosettes = Array.from({ length: 5 }, (_, ring) => {
  const points = Array.from({ length: 289 }, (_, i) => {
    const angle = (i / 288) * Math.PI * 2;
    const radius = 85 + 8 * Math.cos(angle * 20 + ring * 0.21) + 1.4 * ring;
    return `${(radius * Math.cos(angle)).toFixed(2)} ${(radius * Math.sin(angle)).toFixed(2)}`;
  });
  return `M ${points.join(" L ")} Z`;
});

const ticks = Array.from({ length: 60 }, (_, i) => i * 6);

export function Seal({
  x,
  y,
  radius,
  rotation = 0,
}: {
  x: number;
  y: number;
  radius: number;
  rotation?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation}) scale(${radius / 100})`}
      fill="none"
      stroke="currentColor"
    >
      <circle r="100" strokeWidth=".8" />
      <circle r="105" strokeWidth=".28" />
      <circle r="71" strokeWidth=".42" />
      <circle r="67" strokeWidth=".32" strokeDasharray="1 1.4" />
      {rosettes.map((d) => (
        <path key={d} d={d} strokeWidth=".42" />
      ))}
      {ticks.map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle})`}
          d={angle % 30 === 0 ? "M 0 -100 V -107" : "M 0 -100 V -103"}
          strokeWidth=".6"
        />
      ))}
    </g>
  );
}

export function Crown({
  x,
  y,
  scale,
}: {
  x: number;
  y: number;
  scale: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) translate(-150 -100)`}
      stroke="currentColor"
      strokeWidth="2.8"
      fill="none"
      strokeLinecap="square"
      strokeLinejoin="round"
    >
      <path d="M 60 154 Q 150 144 240 154 L 232 173 Q 150 184 68 173 Z M 73 179 Q 150 189 227 179 L 224 187 Q 150 199 76 187 Z" />
      <path d="M 63 147 L 42 110 Q 67 106 85 134 Q 112 129 103 101 Q 130 107 150 138 Q 170 107 197 101 Q 188 129 215 134 Q 233 106 258 110 L 237 147 Z" />
      <path d="M 53 100 C 31 77 63 46 92 53 C 107 27 140 49 150 60 C 160 49 193 27 208 53 C 237 46 269 77 247 100 M 72 112 C 50 79 74 66 94 69 C 116 55 135 71 143 94 M 228 112 C 250 79 226 66 206 69 C 184 55 165 71 157 94 M 143 60 L 150 126 L 157 60" />
      <path d="M 150 24 C 136 24 136 45 150 45 C 164 45 164 24 150 24 Z M 150 7 V 24 M 140 14 H 160 M 138 35 H 162 M 150 26 V 44" />
      {[82, 104, 127, 150, 173, 196, 218].map((cx) => (
        <path key={cx} d={`M ${cx - 4} 163 l 4 -4 l 4 4 l -4 4 Z`} />
      ))}
    </g>
  );
}

const treadOffsets = Array.from({ length: 22 }, (_, i) => i * 104 - 1144);

export function Tread({
  x,
  y,
  angle,
  phase,
  scale = 1,
  color = ink,
}: {
  x: number;
  y: number;
  angle: number;
  phase: number;
  scale?: number;
  color?: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
      fill={color}
    >
      <path
        d="M -106 -1300 h 18 v 2600 h -18 Z M 88 -1300 h 18 v 2600 h -18 Z"
        opacity=".58"
      />
      {treadOffsets.map((offset) => (
        <g key={offset} transform={`translate(0 ${offset + (phase % 104)})`}>
          <path d="M -127 -42 L -76 -42 L -43 -27 H 43 L 76 -42 H 127 V -6 L 84 13 L 44 1 H -44 L -84 13 L -127 -6 Z" />
          <path
            d="M -125 14 L -72 19 L -45 32 H 46 L 72 19 L 125 14 V 34 L 72 49 L 45 43 H -45 L -72 49 L -125 34 Z"
            opacity=".74"
          />
          <path
            d="M -67 -28 V -16 H -53 V -26 Z M 67 -28 V -16 H 53 V -26 Z M -4 13 H 4 V 28 H -4 Z"
            fill={paper}
            opacity=".37"
          />
        </g>
      ))}
    </g>
  );
}

const bootPath =
  "M 46 10 L 168 10 L 158 117 Q 155 164 174 221 L 189 246 Q 198 258 226 260 L 250 269 Q 281 283 284 307 L 283 326 L 271 335 H 229 L 220 343 H 147 L 123 333 L 71 340 L 44 332 L 38 312 L 44 275 Q 54 232 52 184 L 44 94 Z";

export function Boot({
  x,
  y,
  scale,
  angle,
  color,
  ghost = false,
}: {
  x: number;
  y: number;
  scale: number;
  angle: number;
  color: string;
  ghost?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale}) translate(-162 -328)`}
    >
      <path d={bootPath} fill={color} />
      <path
        d="M 41 316 L 70 326 H 128 L 155 333 L 226 331 L 274 321 M 58 29 Q 107 36 157 29 M 56 45 Q 103 55 152 45 M 68 51 Q 79 151 74 208 Q 75 255 59 281 M 135 46 Q 123 125 139 195 Q 149 228 165 251 L 177 290 M 58 275 Q 99 254 163 252 M 170 278 Q 212 263 249 286"
        stroke={ghost ? ink : sand}
        strokeWidth="3"
        opacity=".72"
        fill="none"
      />
      <path
        d="M 42 333 L 66 342 L 89 340 L 95 347 H 119 L 124 341 L 147 354 H 168 L 172 346 L 191 354 H 215 L 218 347 L 243 351 L 268 344 L 281 332 L 283 320 L 271 332 H 227 L 211 340 H 154 L 127 331 H 70 L 43 318 Z"
        fill={color}
      />
      <path
        d="M 91 73 L 117 74 M 93 87 L 116 88 M 94 101 L 115 102 M 176 293 L 190 293 M 157 311 L 266 311"
        stroke={ghost ? ink : sand}
        strokeWidth="2"
        opacity=".56"
      />
    </g>
  );
}

const flightFeathers = [
  [0, 13, 435, -151, 39],
  [3, 25, 405, -70, 39],
  [9, 37, 369, 7, 36],
  [11, 54, 327, 73, 34],
  [13, 70, 283, 118, 32],
  [16, 87, 233, 150, 30],
  [22, 97, 183, 164, 24],
  [30, 108, 131, 170, 21],
];

export function Eagle({
  x,
  y,
  scale,
  fold,
  color,
  engraved = true,
}: {
  x: number;
  y: number;
  scale: number;
  fold: number;
  color: string;
  engraved?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color}>
      {[-1, 1].map((side) => (
        <g
          key={side}
          transform={`scale(${side * (1 - 0.36 * fold)} 1) translate(37 -50) rotate(${-43 * fold})`}
        >
          <path d="M 0 -4 C 63 -42 152 -61 253 -99 L 416 -166 L 374 -64 L 283 36 L 87 113 L 6 114 Z" />
          {flightFeathers.map(([x1, y1, x2, y2, width]) => (
            <path
              key={x2}
              d={`M ${x1} ${y1} Q ${x2 * 0.6} ${y2 + 35} ${x2} ${y2} L ${x2 - 25} ${y2 + width} Q ${x2 * 0.62} ${y2 + 56} ${x1 + 13} ${y1 + 31} Z`}
            />
          ))}
          <path
            d="M 30 9 Q 170 -23 405 -146 M 44 29 Q 196 3 322 -66 M 56 57 Q 146 51 238 13 M 61 82 Q 145 77 189 43"
            fill="none"
            stroke={sand}
            strokeWidth="2.2"
            opacity={engraved ? 0.47 : 0}
          />
        </g>
      ))}
      <path d="M -71 5 Q -58 -49 -29 -80 L -10 -114 L 4 -136 Q 20 -145 43 -135 L 51 -128 L 79 -123 L 75 -100 L 50 -107 L 39 -82 L 61 -45 L 77 12 L 53 66 L 72 135 L 42 119 L 54 153 L 25 139 L 16 174 L 0 152 L -16 174 L -25 139 L -54 153 L -42 120 L -72 135 L -55 67 Z" />
      <path
        d="M 29 -122 l 12 1 l -7 7 Z M -29 -31 Q -45 20 -30 72 M 30 -31 Q 45 20 30 72 M -13 72 L 0 124 L 13 72"
        stroke={sand}
        strokeWidth="2.5"
        fill="none"
        opacity={engraved ? 0.7 : 0}
      />
    </g>
  );
}

const barbs = Array.from({ length: 27 }, (_, i) => i * 99 - 105);

export function Wire({
  y,
  angle,
  phase,
  tension,
  color,
  thickness = 5,
}: {
  y: number;
  angle: number;
  phase: number;
  tension: number;
  color: string;
  thickness?: number;
}) {
  const waveHeight = 16 * (1 - tension) + 2.5;
  const wireY = (x: number) => waveHeight * Math.sin((x + phase) * 0.013);
  const cord = Array.from({ length: 82 }, (_, i) => {
    const x = -271 + i * 33;
    return `${i === 0 ? "M" : "L"} ${x} ${wireY(x).toFixed(2)}`;
  }).join(" ");
  return (
    <g
      transform={`translate(960 ${y}) rotate(${angle}) translate(-960 0)`}
      stroke={color}
      fill="none"
    >
      <path d={cord} strokeWidth={thickness + 2} />
      <path
        d={cord}
        strokeWidth={thickness / 2}
        transform="translate(0 9)"
        opacity=".68"
      />
      {barbs.map((point) => {
        const x = point + (phase % 99);
        return (
          <path
            key={point}
            d="M -18 -4 Q -6 12 11 5 L 34 -17 L 16 9 L 24 25 L 2 7 L -22 27 L -7 1 L -27 -18 Z"
            transform={`translate(${x} ${wireY(x)})`}
            fill={color}
            stroke="none"
          />
        );
      })}
    </g>
  );
}

export function DockTower({
  x,
  y,
  scale,
  color,
}: {
  x: number;
  y: number;
  scale: number;
  color: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color}>
      <path d="M -61 0 V -305 H -80 V -329 H -57 V -442 H -42 V -480 L 0 -575 L 42 -480 V -442 H 57 V -329 H 80 V -305 H 61 V 0 Z" />
      <path d="M -266 0 V -150 H -234 V -195 L -215 -223 L -196 -195 V -171 H -152 V -217 L -136 -255 L -120 -220 V -181 H -55 V 0 Z M 57 0 V -190 H 117 V -209 L 131 -232 L 145 -208 V -187 H 179 V -211 L 194 -255 L 212 -211 V -200 H 253 V -169 H 296 V 0 Z" />
      <circle
        cy="-381"
        r="34"
        stroke={paper}
        strokeWidth="3"
        fill="none"
        opacity=".79"
      />
      <path
        d="M 0 -402 v 21 l 15 14 M -22 -313 V -144 M 0 -313 V -144 M 22 -313 V -144 M -211 -145 V -45 M -159 -154 V -40 M -109 -153 V -40 M 104 -151 V -40 M 147 -151 V -40 M 199 -151 V -40 M 240 -151 V -40"
        stroke={paper}
        strokeWidth="2"
        fill="none"
        opacity=".47"
      />
    </g>
  );
}

const gearRim = Array.from({ length: 96 }, (_, i) => {
  const angle = (i / 96) * 2 * Math.PI;
  const radius = i % 4 === 0 || i % 4 === 3 ? 87 : 100;
  return `${(radius * Math.cos(angle)).toFixed(1)},${(radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

export function Gear({
  x,
  y,
  radius,
  rotation,
  color,
}: {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  color: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${radius / 100}) rotate(${rotation})`}
    >
      <polygon
        points={gearRim}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="miter"
      />
      <circle r="72" fill="none" stroke={color} strokeWidth="2" />
      <circle r="28" fill="none" stroke={color} strokeWidth="4.5" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle})`}
          d="M -9 -31 L -15 -69 H 15 L 9 -31 Z M -5 -77 H 5"
          fill={color}
          stroke={color}
          strokeWidth="1.4"
        />
      ))}
      <path
        d="M 0 -19 V 19 M -19 0 H 19"
        stroke={color}
        strokeWidth="2"
        opacity=".85"
      />
    </g>
  );
}

export function Figure({
  x,
  y,
  scale,
  color,
  detail,
  style = 0,
  raised = false,
}: {
  x: number;
  y: number;
  scale: number;
  color: string;
  detail: string;
  style?: number;
  raised?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d={
          style % 2 === 0
            ? "M -21 -41 Q -27 -67 -6 -76 Q 22 -82 27 -61 L 27 -51 L 34 -43 L 26 -39 L 23 -24 H 8 L 8 -5 L -18 -5 L -15 -24 Z"
            : "M -23 -42 Q -28 -66 -7 -76 Q 12 -82 25 -63 L 30 -51 L 34 -44 L 27 -41 Q 25 -24 13 -21 L 8 -4 H -20 L -17 -28 Z"
        }
        fill={color}
      />
      {style % 3 === 0 && (
        <path
          d="M -27 -58 L -23 -68 Q -5 -82 18 -71 L 27 -61 L 46 -56 L 31 -50 L -27 -52 Z"
          fill={detail}
        />
      )}
      <path
        d="M -20 -9 L 10 -12 L 25 2 L 48 10 L 68 97 L 57 110 H 45 L 45 166 L -53 166 L -51 109 L -66 108 L -73 100 L -53 20 L -36 4 Z"
        fill={color}
      />
      <path
        d="M -21 -8 L -9 19 L 11 -8 M -8 21 V 150 M -35 65 L -48 118 M 39 63 L 45 114 M -1 51 L 16 55 H 34"
        stroke={detail}
        strokeWidth="2.6"
        fill="none"
        opacity=".61"
      />
      {raised && (
        <path
          d="M 44 24 L 61 -25 L 58 -75 L 66 -102 L 80 -110 L 95 -97 L 90 -67 L 97 -19 L 73 49 Z"
          fill={color}
        />
      )}
    </g>
  );
}

import { useId, type ReactNode } from "react";

export const c = {
  coal: "#171c23",
  night: "#202a33",
  blue: "#314c5c",
  teal: "#496965",
  mint: "#a0b8a5",
  cream: "#eee1bd",
  bone: "#d3c39d",
  sand: "#b99967",
  amber: "#e2aa57",
  rust: "#923a32",
  red: "#bf503e",
  pale: "#f6ead0",
};

export const range = (length: number) => Array.from({ length }, (_, i) => i);
export const noise = (i: number) => {
  const n = Math.sin(i * 34.454 + 9.47) * 43758.5453;
  return n - Math.floor(n);
};

export function Field({
  children,
  fill = c.coal,
}: {
  children: ReactNode;
  fill?: string;
}) {
  return (
    <svg className="rd-field" viewBox="0 0 1920 1080" role="presentation">
      <rect width="1920" height="1080" fill={fill} />
      {children}
    </svg>
  );
}

export function Lattice({
  color = c.bone,
  spacing = 54,
  opacity = 0.21,
  angle = 0,
  line = false,
}: {
  color?: string;
  spacing?: number;
  opacity?: number;
  angle?: number;
  line?: boolean;
}) {
  const id = useId();
  return (
    <>
      <defs>
        <pattern
          id={id}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          {line ? (
            <path
              d={`M 0 0 H ${spacing} M 0 0 V ${spacing}`}
              fill="none"
              stroke={color}
              strokeWidth="1.3"
            />
          ) : (
            <path d="M -5 0 H 5 M 0 -5 V 5" stroke={color} strokeWidth="1.2" />
          )}
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill={`url(#${id})`} opacity={opacity} />
    </>
  );
}

const scratches = range(23)
  .map((i) => {
    const x = noise(i * 2) * 300;
    const y = noise(i * 5 + 8) * 180;
    const length = 3 + noise(i + 30) * 16;
    return `M ${x.toFixed(1)} ${y.toFixed(1)} l ${length.toFixed(1)} -2`;
  })
  .join(" ");

export function InkGrain({
  color = c.cream,
  opacity = 0.18,
}: {
  color?: string;
  opacity?: number;
}) {
  const id = useId();
  return (
    <>
      <defs>
        <pattern
          id={id}
          width="300"
          height="180"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(13)"
        >
          <path d={scratches} fill="none" stroke={color} strokeWidth="1.1" />
          <path
            d="M 21 15 h 242 M 87 101 h 111 M 15 140 h 143"
            stroke={color}
            strokeWidth=".5"
            opacity=".5"
          />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill={`url(#${id})`} opacity={opacity} />
    </>
  );
}

export function Text({
  x,
  y,
  size,
  children,
  color = c.cream,
  face = "display",
  weight = 690,
  tracking,
  opacity = 1,
  anchor = "start",
  fit,
}: {
  x: number;
  y: number;
  size: number;
  children: ReactNode;
  color?: string;
  face?: "display" | "text" | "mono";
  weight?: number;
  tracking?: number;
  opacity?: number;
  anchor?: "start" | "middle" | "end";
  fit?: number;
}) {
  return (
    <text
      className={`rd-${face}`}
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      fontWeight={face === "mono" ? 400 : weight}
      opacity={opacity}
      textAnchor={anchor}
      letterSpacing={tracking ?? (face === "mono" ? 2.1 : 0)}
      textLength={fit}
      lengthAdjust={fit ? "spacingAndGlyphs" : undefined}
    >
      {children}
    </text>
  );
}

export function Stamp({
  x,
  y,
  width,
  height = 61,
  children,
  fill = c.cream,
  ink = c.coal,
  size = 27,
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  children: string;
  fill?: string;
  ink?: string;
  size?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M 0 0 H ${width} v ${height} H 0 Z`} fill={fill} />
      <Text
        x={18}
        y={height / 2 + size * 0.31}
        size={size}
        face="mono"
        color={ink}
        tracking={1.25}
      >
        {children}
      </Text>
    </g>
  );
}

export const polar = (r: number, degrees: number) => {
  const a = (degrees * Math.PI) / 180;
  return [
    Math.round(Math.cos(a) * r * 100) / 100,
    Math.round(Math.sin(a) * r * 100) / 100,
  ];
};

const dialTicks = range(72)
  .map((i) => {
    const [a, b] = polar(i % 6 === 0 ? 80 : 87, i * 5);
    const [x, y] = polar(95, i * 5);
    return `M ${a} ${b} L ${x} ${y}`;
  })
  .join(" ");

export function Dial({
  x,
  y,
  radius,
  turn,
  color = c.bone,
  body = "none",
  pointer = c.red,
}: {
  x: number;
  y: number;
  radius: number;
  turn: number;
  color?: string;
  body?: string;
  pointer?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${radius / 100})`}>
      <circle r="101" fill={body} stroke={color} strokeWidth="1.35" />
      <path
        d={dialTicks}
        fill="none"
        stroke={color}
        strokeWidth=".72"
        opacity=".85"
      />
      <circle
        r="73"
        fill="none"
        stroke={color}
        strokeWidth=".41"
        strokeDasharray="2 2"
      />
      <path
        d="M 0 -73 V -67 M 0 73 V 67 M -73 0 H -67 M 73 0 H 67"
        fill="none"
        stroke={color}
        strokeWidth="1.7"
      />
      <path
        d="M -2.2 17 L -.8 -72 L 1.1 -78 L 2.7 17 Z"
        fill={pointer}
        transform={`rotate(${turn})`}
      />
      <circle
        r="6"
        fill={body === "none" ? c.coal : body}
        stroke={pointer}
        strokeWidth="2.3"
      />
    </g>
  );
}

const wheelShape = range(96)
  .map((i) => polar(i % 4 === 0 || i % 4 === 3 ? 88 : 99, i * 3.75).join(","))
  .join(" ");
const wheelSlots = range(6).map((i) => i * 60);

export function Wheel({
  x,
  y,
  r,
  turn,
  color = c.bone,
  hub = c.coal,
}: {
  x: number;
  y: number;
  r: number;
  turn: number;
  color?: string;
  hub?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r / 100}) rotate(${turn})`}>
      <polygon
        points={wheelShape}
        fill={hub}
        stroke={color}
        strokeWidth="3.8"
      />
      <circle r="75" fill="none" stroke={color} strokeWidth="1.7" />
      {wheelSlots.map((a) => (
        <path
          key={a}
          d="M -10 -32 L -19 -72 H 18 L 9 -31 Z"
          fill={color}
          opacity=".74"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="23" fill={hub} stroke={color} strokeWidth="3.4" />
      <circle r="10" fill={color} />
    </g>
  );
}

export function Trace({
  x,
  y,
  width,
  amplitude,
  f,
  color = c.amber,
  angle = 0,
  thickness = 3,
  seed = 1,
}: {
  x: number;
  y: number;
  width: number;
  amplitude: number;
  f: number;
  color?: string;
  angle?: number;
  thickness?: number;
  seed?: number;
}) {
  const d = range(75)
    .map((i) => {
      const p = i / 74;
      const v =
        Math.sin(i * 0.27 + f * 0.064 + seed) * 0.55 +
        Math.sin(i * 0.79 - f * 0.07 + seed) * 0.27 +
        Math.sin(i * 1.5 - f * 0.045) * 0.13;
      const taper = 0.48 + 0.52 * Math.sin(Math.PI * p);
      return `${i ? "L" : "M"} ${(width * p).toFixed(1)} ${(v * amplitude * taper).toFixed(1)}`;
    })
    .join(" ");
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={thickness}
      fill="none"
      transform={`translate(${x} ${y}) rotate(${angle})`}
    />
  );
}

export function PunchTape({
  x,
  y,
  width,
  height = 160,
  angle = 0,
  phase = 0,
  color = c.bone,
  ink = c.coal,
  density = 0.52,
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  angle?: number;
  phase?: number;
  color?: string;
  ink?: string;
  density?: number;
}) {
  const cells = Math.ceil(width / 46);
  const scroll = ((phase % 46) + 46) % 46;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M 0 0 H ${width} V ${height} H 0 Z`} fill={color} />
      <path
        d={`M 0 ${height * 0.14} H ${width} M 0 ${height * 0.84} H ${width}`}
        stroke={ink}
        strokeWidth="1.7"
        opacity=".52"
      />
      {range(cells).map((i) => (
        <g key={i} transform={`translate(${i * 46 + scroll - 17} 0)`}>
          {range(5).map((j) => (
            <circle
              key={j}
              cx="0"
              cy={height * (0.24 + 0.13 * j)}
              r={j === 2 ? 3.6 : 5.4}
              fill={ink}
              opacity={
                j === 2 ||
                noise(i * 19 + j * 7 + Math.floor(phase / 46)) < density
                  ? 0.84
                  : 0.12
              }
            />
          ))}
        </g>
      ))}
    </g>
  );
}

const faceShapes = [
  "M -24 -33 Q -33 -61 -18 -74 Q -3 -89 18 -77 L 29 -60 L 30 -47 L 38 -39 L 31 -31 L 25 -20 L 8 -17 L 10 -3 H -25 L -20 -23 Z",
  "M -23 -35 Q -35 -69 -5 -81 Q 21 -87 29 -63 L 29 -53 L 37 -39 L 29 -35 L 31 -27 L 21 -18 L 5 -16 L 5 -3 H -23 L -21 -20 Z",
  "M -26 -32 Q -35 -69 -4 -82 Q 19 -86 30 -66 L 34 -54 L 30 -48 L 38 -39 L 33 -35 L 28 -34 L 31 -24 Q 15 -14 8 -13 L 8 -1 H -23 L -19 -25 Z",
];

export function Figure({
  x,
  y,
  scale = 1,
  color = c.coal,
  outline = c.bone,
  index = 0,
  facing = 1,
  raised = false,
  step = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  outline?: string;
  index?: number;
  facing?: number;
  raised?: boolean;
  step?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${facing * scale} ${scale})`}>
      <path d={faceShapes[index % 3]} fill={color} />
      {index % 4 === 0 && (
        <path
          d="M -26 -60 L -24 -73 L -7 -82 L 21 -79 L 35 -65 L 47 -61 L 31 -54 H -26 Z"
          fill={outline}
          opacity=".72"
        />
      )}
      {index % 4 === 1 && (
        <path
          d="M -31 -30 Q -43 -66 -19 -78 Q 7 -92 26 -74 L 30 -64 L 16 -58 L -6 -53 L -15 -28 L -9 -13 L -24 -9 Z"
          fill={outline}
          opacity=".66"
        />
      )}
      <path
        d="M -23 -7 L 11 -6 L 28 5 L 53 18 L 74 97 L 59 110 L 43 103 L 48 154 H -53 L -47 103 L -61 107 L -74 96 L -55 24 L -37 10 Z"
        fill={color}
      />
      <path
        d={`M -44 141 H -4 L ${-4 + step * 12} 204 H ${-26 + step * 12} Z M 8 142 H 43 L ${27 - step * 11} 204 H ${8 - step * 11} Z`}
        fill={color}
      />
      <path
        d="M -28 1 L -14 26 L 10 -1 M -12 26 V 140 M -37 59 L -47 96 M 36 60 L 43 101"
        fill="none"
        stroke={outline}
        opacity=".44"
        strokeWidth="2.3"
      />
      {raised && (
        <path
          d="M 44 22 L 67 -29 L 61 -74 L 74 -101 L 88 -111 L 97 -98 L 89 -71 L 104 -19 L 71 50 Z"
          fill={color}
        />
      )}
    </g>
  );
}

export function Ribbon({
  x,
  y,
  width,
  height,
  tilt = 0,
  flop = 0,
  color = c.red,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  tilt?: number;
  flop?: number;
  color?: string;
}) {
  return (
    <path
      d={`M 0 0 Q ${width * 0.46} ${-flop} ${width} ${flop * 0.4} L ${width - 12} ${height + flop * 0.4} Q ${width * 0.5} ${height + flop} 0 ${height} Z`}
      fill={color}
      transform={`translate(${x} ${y}) rotate(${tilt})`}
    />
  );
}

const blockWindows = range(20);
export function TowerBlock({
  x,
  y,
  width,
  height,
  slots = 4,
  fill = c.night,
  light = c.amber,
  lit = 0.38,
  seed = 0,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  slots?: number;
  fill?: string;
  light?: string;
  lit?: number;
  seed?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M 0 0 H ${width} V ${height} H 0 Z`} fill={fill} />
      <path
        d={`M ${width} 0 l ${width * 0.26} -29 v ${height + 29} h ${-width * 0.26} Z`}
        fill={c.coal}
        opacity=".52"
      />
      <path
        d={`M 0 0 l ${width * 0.25} -29 H ${width * 1.26} L ${width} 0 Z`}
        fill={c.bone}
        opacity=".43"
      />
      {blockWindows.map((i) => {
        const px = ((i % slots) + 0.4) * (width / slots);
        const py =
          21 +
          (Math.floor(i / slots) * (height - 25)) /
            Math.ceil(blockWindows.length / slots);
        return (
          <rect
            key={i}
            x={px}
            y={py}
            width={(width / slots) * 0.408}
            height="13.5"
            fill={light}
            opacity={noise(seed * 37 + i) < lit ? 0.71 : 0.105}
          />
        );
      })}
    </g>
  );
}

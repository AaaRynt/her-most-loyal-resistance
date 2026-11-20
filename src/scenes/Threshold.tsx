import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  FrameRule,
  Gear,
  Hatch,
  Type,
  brass,
  ink,
  paper,
  rust,
  sand,
  teal,
} from "../Art";
import { accents, cue, ease, scoreAt, since, strike } from "../score";

const clockTicks = Array.from({ length: 60 }, (_, i) => i);
const romans = [
  { word: "XII", x: 0, y: -257 },
  { word: "III", x: 246, y: 19 },
  { word: "VI", x: 0, y: 284 },
  { word: "IX", x: -257, y: 19 },
];

export function Clock() {
  const f = useCurrentFrame();
  const shiftAt = since("clockShift", "clock");
  const breakAt = since("clockBreak", "clock");
  const shock = accents(f, "clock", ["clock", "clockShift", "clockBreak"], 9);
  const pull = ease(f, shiftAt - 14, breakAt + 19);
  const { bass } = scoreAt(f + cue("clock"));
  const turn = f * 0.8 + 23 * pull + 6 * shock;
  return (
    <section className="scene" style={{ background: "#3b4034" }}>
      <Board>
        <path d="M 0 0 H 1920 V 219 L 371 850 L 0 776 Z" fill="#796342" />
        <path d="M 0 1080 V 955 L 1920 271 V 1080 Z" fill="#283f3d" />
        <Hatch color={paper} opacity={0.21} angle={134} scale={16} />
        <Gear
          x={420 + 169 * pull}
          y={744}
          radius={325}
          rotation={-turn * 1.53}
          color="#927452"
        />
        <g
          transform={`translate(${1250 - 149 * pull + 21 * shock} ${527 + 13 * shock}) scale(${1 + shock * 0.041 + bass * 0.018})`}
        >
          <circle r="445" fill="#1d2d2c" stroke={sand} strokeWidth="3.2" />
          <circle r="410" fill="#cdb581" stroke={rust} strokeWidth="7" />
          <circle r="331" fill="#bda776" stroke="#5c5045" strokeWidth="2.2" />
          {clockTicks.map((i) => (
            <path
              key={i}
              transform={`rotate(${i * 6})`}
              d={i % 5 === 0 ? "M 0 -389 V -348" : "M 0 -389 V -370"}
              fill="none"
              stroke={ink}
              strokeWidth={i % 5 === 0 ? 7 : 2.4}
            />
          ))}
          {romans.map(({ word, x, y }) => (
            <text
              key={word}
              x={x}
              y={y}
              textAnchor="middle"
              fill={ink}
              fontSize="54"
              fontFamily="Instrument Serif"
            >
              {word}
            </text>
          ))}
          <g transform={`rotate(${72 + turn * 0.33})`}>
            <path
              d="M -12 47 L -9 -102 L 0 -223 L 10 -102 L 12 47 Z"
              fill="#322f29"
            />
          </g>
          <g transform={`rotate(${-17 + turn * 1.2})`}>
            <path
              d="M -7 46 L -5 -246 L 0 -319 L 6 -246 L 7 46 Z"
              fill="#803b31"
            />
          </g>
          <circle r="25" fill={ink} stroke={brass} strokeWidth="4" />
          <circle r="8" fill={rust} />
        </g>
        <path
          d={`M 0 1080 V ${1142 - 143 * pull} L 1920 ${1099 - 392 * pull} V 1080 Z`}
          fill={ink}
          fillOpacity=".88"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>Westminster</Caption>
    </section>
  );
}

const ironGrate = Array.from({ length: 8 }, (_, i) => i);

export function Gate() {
  const f = useCurrentFrame();
  const liftAt = since("gateLift", "gate");
  const turnAt = since("gateTurn", "gate");
  const clearAt = since("gateClear", "gate");
  const pull = ease(f, liftAt - 12, clearAt + 16);
  const kick = accents(
    f,
    "gate",
    ["gate", "gateLift", "gateTurn", "gateClear"],
    8,
  );
  const slit = ease(f, turnAt - 14, turnAt + 30);
  return (
    <section className="scene" style={{ background: "#4e3c31" }}>
      <Board>
        <path d="M 0 0 H 1920 V 1080 H 0 Z" fill="#304540" />
        <path d="M 115 1080 L 756 644 H 1165 L 1796 1080 Z" fill="#a38558" />
        <path
          d="M 816 163 H 1104 L 1318 971 H 617 Z"
          fill="#b3a677"
          opacity={0.37 + 0.43 * slit}
        />
        <path
          d="M 960 631 L 198 1080 M 960 631 L 610 1080 M 960 631 L 1317 1080 M 960 631 L 1702 1080"
          stroke={paper}
          strokeWidth="3"
          opacity=".68"
        />
        <Hatch color={paper} opacity={0.18} angle={169} scale={17} />
        {[1, -1].map((side) => (
          <g
            key={side}
            transform={`translate(${960 + side * (58 + 680 * pull + 28 * kick)} ${8 * kick}) scale(${side} 1) skewY(${-1.5 - 4.3 * slit})`}
          >
            <path
              d="M -3 91 H 996 V 974 H -3 Z"
              fill="#39443a"
              stroke={sand}
              strokeWidth="6"
            />
            <path
              d="M 18 118 H 996 V 947 H 18 Z"
              fill="#202c2c"
              stroke="#846d4c"
              strokeWidth="2"
            />
            {ironGrate.map((i) => (
              <g key={i}>
                <path
                  d={`M ${i * 128 + 15} 120 h 57 V 941 h -57 Z`}
                  fill={i % 3 === 0 ? "#ad9060" : "#5b6251"}
                />
                <path
                  d={`M ${i * 128 + 41} 161 V 901`}
                  stroke={paper}
                  strokeWidth="2.3"
                  opacity=".43"
                />
              </g>
            ))}
            <path
              d="M 18 232 H 969 M 18 811 H 969"
              stroke={brass}
              strokeWidth="11"
              opacity=".71"
            />
            <path
              d="M 0 528 L 86 463 H 181 V 607 H 85 L 0 572 Z"
              fill={ink}
              stroke={sand}
              strokeWidth="4"
            />
            <circle
              cx="111"
              cy="535"
              r="31"
              fill="#9d623d"
              stroke={paper}
              strokeWidth="2.3"
            />
          </g>
        ))}
        <FrameRule color={paper} />
      </Board>
      <Caption>At the threshold</Caption>
    </section>
  );
}

const ballotEdges = [
  { dx: 143, dy: 56, angle: 9, fill: "#716a50" },
  { dx: 60, dy: 29, angle: -7, fill: "#a29970" },
  { dx: 0, dy: 0, angle: 0, fill: "#e0d0a2" },
];
const choices = [-81, 7, 95];

export function Ballot() {
  const f = useCurrentFrame();
  const foldAt = since("ballotFold", "ballot");
  const markAt = since("ballotMark", "ballot");
  const fallAt = since("ballotFall", "ballot");
  const aerial = ease(f, 0, foldAt + 14);
  const disperse = ease(f, foldAt - 8, markAt + 17);
  const drop = ease(f, fallAt - 9, since("tear", "ballot") + 8);
  const pressure = strike(f, markAt, 8) + 0.72 * strike(f, fallAt, 6);
  return (
    <section className="scene" style={{ background: "#91815c" }}>
      <Board>
        <path d="M 0 0 H 1920 V 645 L 0 418 Z" fill="#beac79" />
        <path d="M 1920 210 L 1050 1080 H 1920 Z" fill="#705939" />
        <Hatch color={ink} opacity={0.18} angle={60} scale={14} />
        {ballotEdges.map(({ dx, dy, angle, fill }, i) => (
          <g
            key={fill}
            transform={`translate(${1038 + dx + (i - 1) * 106 * disperse} ${659 + dy - 96 * aerial + 256 * drop + 11 * pressure}) rotate(${angle - 9 * (1 - aerial) + (i - 1) * 10 * disperse})`}
          >
            <path
              d="M -456 -294 H 456 V 294 H -456 Z"
              fill={fill}
              stroke="#554832"
              strokeWidth="2.7"
            />
            <path
              d="M -427 -263 H 427 V 259 H -427 Z"
              fill="none"
              stroke={ink}
              strokeWidth="1.8"
              opacity=".61"
            />
            {i === 2 && (
              <>
                <path
                  d="M -377 -173 H 382 M -377 191 H 382"
                  fill="none"
                  stroke={rust}
                  strokeWidth="4"
                />
                {choices.map((y) => (
                  <g key={y}>
                    <path
                      d={`M -358 ${y} h 61 v 56 h -61 Z`}
                      fill="none"
                      stroke={ink}
                      strokeWidth="3.1"
                    />
                    <path
                      d={`M -257 ${y + 12} H 314 M -257 ${y + 43} H 208`}
                      stroke="#786c4c"
                      strokeWidth="2.3"
                    />
                  </g>
                ))}
                <path
                  d="M -387 -255 H 385"
                  stroke={ink}
                  strokeWidth="2.1"
                  strokeDasharray="2 9"
                />
                <text
                  x="250"
                  y="90"
                  fill={rust}
                  fontFamily="Instrument Serif"
                  fontWeight="400"
                  fontSize="188"
                  transform="rotate(-11 250 90)"
                  opacity={ease(f, markAt, markAt + 18)}
                >
                  ?
                </text>
              </>
            )}
          </g>
        ))}
        <FrameRule color={ink} />
      </Board>
      <Type
        name="Who speaks for England?"
        face="serif"
        style={{
          left: 118,
          top: 137,
          fontSize: 102,
          color: ink,
          opacity: 0.54 + 0.46 * aerial,
          translate: `${-24 * (1 - aerial)}px 0`,
        }}
      >
        Who speaks for England?
      </Type>
    </section>
  );
}

const tornPaper = [
  {
    poly: "-4,111 437,139 516,361 441,516 563,722 421,958 -12,981",
    x: -323,
    y: 117,
    angle: -9,
  },
  {
    poly: "437,139 816,119 934,269 826,463 958,601 874,827 921,920 421,958 563,722 441,516 516,361",
    x: -168,
    y: 166,
    angle: 8,
  },
  {
    poly: "816,119 1288,125 1201,378 1325,540 1185,729 1312,934 921,920 874,827 958,601 826,463 934,269",
    x: 8,
    y: -247,
    angle: -11,
  },
  {
    poly: "1288,125 1695,82 1590,334 1663,486 1549,724 1667,941 1312,934 1185,729 1325,540 1201,378",
    x: 228,
    y: 177,
    angle: 6,
  },
  {
    poly: "1695,82 1932,123 1932,905 1667,941 1549,724 1663,486 1590,334",
    x: 291,
    y: -70,
    angle: -14,
  },
];

export function Tear() {
  const f = useCurrentFrame();
  const cutAt = since("tearOpen", "tear");
  const ripAt = since("tearRip", "tear");
  const fallAt = since("tearFall", "tear");
  const spread = ease(f, cutAt - 10, fallAt + 16);
  const hit = strike(f, ripAt, 7) + 0.7 * strike(f, fallAt, 8);
  return (
    <section className="scene" style={{ background: "#23372e" }}>
      <Board>
        <path d="M 0 0 H 1920 V 454 L 0 809 Z" fill="#7a4836" />
        <path d="M 0 1080 V 724 L 1920 372 V 1080 Z" fill={teal} />
        <Hatch color={paper} opacity={0.23} angle={137} scale={12} />
        <path
          d={`M 114 799 L 473 668 L 933 ${633 - 71 * spread} L 1405 503 L 1806 493`}
          stroke={brass}
          strokeWidth={3 + 2 * hit}
          opacity=".8"
          fill="none"
          strokeDasharray="11 7"
        />
        {tornPaper.map(({ poly, x, y, angle }, i) => {
          const split = ease(f, cutAt + i * 4, fallAt + 20 + i * 3);
          return (
            <g
              key={poly}
              transform={`translate(${x * split + (i - 2) * 17 * hit} ${y * split - 31 * hit}) rotate(${angle * spread} 960 548)`}
            >
              <defs>
                <clipPath id={`torn-order-${i}`}>
                  <polygon points={poly} />
                </clipPath>
              </defs>
              <g clipPath={`url(#torn-order-${i})`}>
                <rect
                  x="0"
                  y="0"
                  width="1920"
                  height="1080"
                  fill={i % 2 ? "#d3b789" : "#e1cba0"}
                />
                <path
                  d="M 106 272 H 1807 M 109 766 H 1803 M 111 824 H 1807"
                  stroke="#7d6749"
                  strokeWidth="3"
                  strokeDasharray="26 6 11 5"
                />
                <path
                  d="M 125 372 H 1611 L 1729 416 V 686 H 126 Z"
                  fill="#884137"
                />
                <text
                  x="206"
                  y="617"
                  fill={paper}
                  fontFamily="Barlow Condensed"
                  fontWeight="800"
                  fontSize="252"
                >
                  CURFEW
                </text>
              </g>
              <polygon
                points={poly}
                fill="none"
                stroke="#f1dbad"
                strokeWidth="2.8"
              />
            </g>
          );
        })}
        <FrameRule color={paper} />
      </Board>
    </section>
  );
}

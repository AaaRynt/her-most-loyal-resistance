import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  Figure,
  FrameRule,
  Gear,
  Hatch,
  Register,
  Type,
  brass,
  ink,
  paper,
  sand,
} from "../Art";
import { accents, cue, ease, ramp, scoreAt, since, strike } from "../score";

const crowd = Array.from({ length: 28 }, (_, i) => {
  const row = Math.floor(i / 10);
  return {
    id: i,
    x: 44 + (i % 10) * 207 - row * 77 + ((i * 53) % 77),
    y: 543 + row * 152 + ((i * 67) % 67),
    scale: 0.64 + row * 0.43 + ((i * 13) % 5) * 0.061,
    coat: ["#81917a", "#705e47", "#413a31", "#263b3c", "#20292b"][i % 5],
  };
});

const placards = [
  {
    x: 435,
    y: 440,
    width: 318,
    height: 123,
    angle: -10,
    text: ["BREAD"],
    at: "protestSigns",
    fill: paper,
    color: ink,
  },
  {
    x: 1115,
    y: 353,
    width: 514,
    height: 224,
    angle: 6,
    text: ["BREAD AND", "FREEDOM"],
    at: "protestRaise",
    fill: "#d3b57d",
    color: ink,
  },
  {
    x: 1578,
    y: 477,
    width: 380,
    height: 137,
    angle: -7,
    text: ["FAIR WAGES"],
    at: "protestMarch",
    fill: "#845044",
    color: paper,
  },
] as const;

export function Protest() {
  const f = useCurrentFrame();
  const entrance = ease(f, 0, 34);
  const advanceAt = since("protestMarch", "protest");
  const surge = ease(f, advanceAt - 8, since("workers", "protest") + 6);
  const impact = accents(
    f,
    "protest",
    ["protest", "protestSigns", "protestRaise", "protestMarch"],
    8,
  );
  const { bass } = scoreAt(f + cue("protest"));
  return (
    <section className="scene" style={{ background: "#756e51" }}>
      <Board>
        <path d="M 0 0 H 1920 V 445 L 1034 668 L 0 417 Z" fill="#b2a274" />
        <path
          d="M 0 405 L 827 513 L 1853 331 L 1920 413 V 1080 H 0 Z"
          fill="#4d6257"
        />
        <path
          d="M 0 256 L 422 348 L 425 447 L 0 361 Z M 1920 168 L 1569 278 V 419 L 1920 317 Z"
          fill="#48483d"
        />
        <Hatch color={paper} angle={125} opacity={0.24} scale={14} />
        <path
          d="M 773 0 H 826 L 778 578 H 709 Z M 984 0 H 1118 L 1127 497 L 1015 562 Z"
          fill="#3d4740"
          opacity=".32"
        />
        <g
          transform={`translate(${-68 * surge} ${66 * (1 - entrance) + 17 * impact}) scale(${1 + 0.054 * surge + 0.008 * bass})`}
        >
          {crowd.slice(0, 10).map(({ id, x, y, scale, coat }) => (
            <Figure
              key={id}
              x={x + 19 * surge}
              y={y}
              scale={scale}
              color={coat}
              detail={sand}
              style={id}
            />
          ))}
          {placards.map(
            ({ x, y, width, height, angle, text, at, fill, color }, i) => {
              const on = since(at, "protest");
              const lift = ease(f, on - 15 * i, on + 25);
              const push = strike(f, on, 6);
              return (
                <g
                  key={at}
                  transform={`translate(${x + 28 * surge * i} ${y + 254 * (1 - lift) - 19 * push}) rotate(${angle + (i - 1) * 6 * surge})`}
                  opacity={0.38 + lift * 0.62}
                >
                  <path d={`M -9 0 H 11 V ${392 + 16 * i} H -9 Z`} fill={ink} />
                  <path
                    d={`M ${-width / 2} ${-height / 2} h ${width} v ${height} h ${-width} Z`}
                    fill={fill}
                    stroke={ink}
                    strokeWidth="4"
                  />
                  <path
                    d={`M ${19 - width / 2} ${12 - height / 2} H ${width / 2 - 20}`}
                    stroke={color}
                    strokeWidth="2.4"
                    opacity=".57"
                  />
                  {text.map((line, index) => (
                    <text
                      key={line}
                      x="0"
                      y={text.length === 1 ? 30 : -14 + 83 * index}
                      textAnchor="middle"
                      fill={color}
                      fontFamily="Barlow Condensed"
                      fontWeight="800"
                      fontSize={text.length === 1 ? 84 : 95}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            },
          )}
          {crowd.slice(10).map(({ id, x, y, scale, coat }) => (
            <Figure
              key={id}
              x={x + Math.sin(id) * 41 * surge}
              y={y - 5 * (id % 3) * impact}
              scale={scale}
              color={id > 19 ? "#172729" : coat}
              detail={sand}
              style={id}
              raised={id % 4 === 0}
            />
          ))}
        </g>
        <path d="M 0 1030 L 1920 930 V 1080 H 0 Z" fill={ink} />
        <FrameRule color={paper} />
      </Board>
      <div
        style={{
          position: "absolute",
          left: 107,
          top: 128,
          width: 424,
          height: 52,
          background: ink,
        }}
      />
      <Caption x={124} y={137}>
        Street demonstration
      </Caption>
    </section>
  );
}

function WorkersMark({ turn, inkColor }: { turn: number; inkColor: string }) {
  return (
    <g transform={`rotate(${turn})`} fill={inkColor}>
      <path d="M -20 -205 C 108 -191 192 -90 182 31 C 172 160 60 224 -64 192 C -110 180 -148 153 -168 117 C -133 138 -96 144 -54 130 C 41 103 105 10 82 -86 C 66 -148 23 -184 -20 -205 Z" />
      <path d="M -146 -77 L -70 -157 L 55 -157 L 91 -122 L 34 -59 L -4 -63 L 151 104 L 117 138 L -44 -37 L -74 -4 Z" />
      <path d="M -131 116 L -95 90 L -63 136 L -145 223 L -180 194 Z" />
    </g>
  );
}

export function Workers() {
  const f = useCurrentFrame();
  const emblemAt = since("workersStar", "workers");
  const stampAt = since("workersStamp", "workers");
  const unfold = ease(f, 0, 26);
  const mark = ease(f, emblemAt - 8, emblemAt + 18);
  const hit = strike(f, emblemAt, 7) + 0.9 * strike(f, stampAt, 8);
  const flutter = Math.sin(f * 0.085) * 29;
  return (
    <section className="scene" style={{ background: "#442d2b" }}>
      <Board>
        <path
          d={`M 0 391 L 1920 ${32 + 100 * unfold} V 1080 L 0 1080 Z`}
          fill="#793930"
        />
        <path
          d={`M 0 499 Q 772 ${337 + flutter} 1235 386 L 1920 ${209 + flutter} V 932 L 0 1080 Z`}
          fill="#913c32"
        />
        <path
          d={`M 0 643 Q 836 ${433 + flutter} 1331 484 L 1920 ${332 + flutter} M 0 775 Q 881 ${694 + flutter} 1252 622 L 1920 ${459 + flutter}`}
          fill="none"
          stroke="#d49762"
          strokeWidth="4"
          opacity=".38"
        />
        <Hatch color={paper} angle={132} opacity={0.26} scale={16} />
        <Gear
          x={1454}
          y={514}
          radius={328 + 19 * hit}
          rotation={-23 + 29 * unfold}
          color="#aa6047"
        />
        <g
          transform={`translate(${1461 - 76 * mark} ${506 - 16 * hit}) scale(${0.64 + 0.32 * mark + 0.04 * hit})`}
          opacity={0.35 + 0.65 * mark}
        >
          <WorkersMark turn={-26 + 19 * mark} inkColor="#381f20" />
          <g transform="translate(-12 -12)">
            <WorkersMark turn={-26 + 19 * mark} inkColor="#e5bf79" />
          </g>
        </g>
        <g style={{ color: brass }} opacity={0.67 + 0.2 * hit}>
          <Register x={1384} y={506} size={14} />
          <path
            d="M 118 832 H 1058 M 118 852 H 936"
            stroke="currentColor"
            strokeWidth="2.2"
            opacity=".68"
          />
        </g>
        <FrameRule color={paper} />
      </Board>
      <Caption>Left Resistance · CPGB</Caption>
      <Type
        name="Workers unite"
        style={{
          left: 114 + 11 * hit,
          top: 350 - 14 * hit,
          fontSize: 211,
          color: paper,
          lineHeight: 0.78,
          translate: `${-61 * (1 - unfold)}px 0`,
          opacity: ramp(f, 0, 12),
          textShadow: "5px 7px #512b27",
        }}
      >
        WORKERS
        <br />
        UNITE
      </Type>
    </section>
  );
}

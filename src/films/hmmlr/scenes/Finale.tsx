import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  Crown,
  DockTower,
  Eagle,
  Figure,
  FrameRule,
  Gear,
  Hatch,
  Register,
  Seal,
  Tread,
  Type,
  Wire,
  brass,
  ink,
  paper,
  rust,
  sand,
  sea,
  teal,
} from "../Art";
import { accents, cue, ease, ramp, scoreAt, since, strike } from "../score";

const roads = [
  {
    x: 403,
    color: "#bdaa78",
    from: "convergeFirst",
    bend: 486,
    blade: "royal",
  },
  {
    x: 964,
    color: "#92503b",
    from: "convergeSecond",
    bend: -5,
    blade: "labour",
  },
  {
    x: 1500,
    color: "#46645e",
    from: "convergeThird",
    bend: -518,
    blade: "street",
  },
] as const;

export function Converge() {
  const f = useCurrentFrame();
  const pullAt = since("convergeSecond", "converge");
  const end = since("divided", "converge");
  const join = ease(f, pullAt - 5, end + 6);
  const beat = accents(
    f,
    "converge",
    ["converge", "convergeFirst", "convergeSecond", "convergeThird"],
    7,
  );
  return (
    <section className="scene" style={{ background: "#252e2a" }}>
      <Board>
        <path d="M 0 0 H 1920 V 458 L 960 592 L 0 401 Z" fill="#384e46" />
        <path d="M 0 986 L 1920 748 V 1080 H 0 Z" fill="#816447" />
        <Hatch color={paper} opacity={0.17} angle={122} scale={13} />
        {roads.map(({ x, color, from, bend, blade }, i) => {
          const answer = since(from, "converge");
          const stream = ease(f, answer - 10, answer + 26);
          const shove = strike(f, answer, 7);
          const movingX = x + bend * 0.38 * join + shove * (i - 1) * 31;
          const centerY = 454 + 20 * shove + 83 * join;
          return (
            <g key={blade}>
              <path
                d={`M ${x - 215} -100 L ${x + 163} -100 L ${movingX + 178} ${centerY + 178} L ${960 + 63 * (i - 1)} 1055 L ${900 + 53 * (i - 1)} 1055 L ${movingX - 188} ${centerY + 171} Z`}
                fill={color}
                opacity={0.45 + 0.43 * stream}
              />
              <path
                d={`M ${x - 89} 60 L ${movingX} ${centerY} L 969 1031`}
                stroke={paper}
                strokeWidth={3.7 + beat}
                opacity={0.26 + 0.49 * stream}
                fill="none"
                strokeDasharray="28 8 8 8"
                strokeDashoffset={-95 * stream}
              />
              <g
                transform={`translate(${movingX} ${centerY}) scale(${1 - 0.22 * join + 0.09 * shove})`}
                style={{ color: paper }}
              >
                {blade === "royal" && <Crown x={0} y={-17} scale={1.11} />}
                {blade === "labour" && (
                  <Gear
                    x={-4}
                    y={-12}
                    radius={164}
                    rotation={-f * 0.54}
                    color={paper}
                  />
                )}
                {blade === "street" && (
                  <Figure
                    x={0}
                    y={-34}
                    scale={1.13}
                    style={2}
                    color={paper}
                    detail={teal}
                  />
                )}
                <path
                  d="M -169 203 H 164"
                  stroke={paper}
                  strokeWidth="2.1"
                  opacity=".77"
                />
              </g>
            </g>
          );
        })}
        <g style={{ color: brass }} opacity=".66">
          <Seal
            x={960}
            y={834 - 89 * join}
            radius={271 + 17 * beat}
            rotation={-36 + 33 * join}
          />
          <Register x={960} y={834 - 89 * join} />
        </g>
        <FrameRule color={paper} />
      </Board>
    </section>
  );
}

const observers = [
  { x: 1061, y: 246, r: 131 },
  { x: 1473, y: 426, r: 242 },
  { x: 1138, y: 741, r: 190 },
  { x: 1820, y: 712, r: 117 },
];

export function Night() {
  const f = useCurrentFrame();
  const lookAt = since("divideOne", "divided");
  const shutAt = since("divideTwo", "divided");
  const lastAt = since("divideThree", "divided");
  const shift = ease(f, lookAt - 12, shutAt + 25);
  const expose = ease(f, shutAt - 9, lastAt + 22);
  const impact = accents(
    f,
    "divided",
    ["divided", "divideOne", "divideTwo", "divideThree"],
    8,
  );
  return (
    <section className="scene" style={{ background: "#17272a" }}>
      <Board>
        <path d="M 0 0 H 1920 V 1019 L 1280 809 L 0 528 Z" fill="#2c413d" />
        <path
          d={`M ${822 + 200 * shift} 0 L 1851 0 L 1920 1080 L ${1062 - 270 * expose} 1080 Z`}
          fill="#836149"
          opacity=".61"
        />
        <Hatch color={paper} opacity={0.17} angle={115} scale={13} />
        <DockTower
          x={924 - 156 * expose}
          y={1002}
          scale={1.32}
          color="#52645b"
        />
        {observers.map(({ x, y, r }, i) => {
          const side = i % 2 ? 1 : -1;
          const blink = strike(f, shutAt + i * 3, 5);
          return (
            <g
              key={x}
              transform={`translate(${x + side * 128 * shift} ${y + 27 * impact * side}) scale(${r / 210} ${(r / 210) * (1 - 0.67 * blink)})`}
              opacity={(0.78 - i * 0.12) * (0.72 + 0.28 * expose)}
            >
              <path
                d="M -206 0 C -89 -143 86 -143 206 0 C 84 135 -89 135 -206 0 Z"
                fill="#162527"
                stroke={sand}
                strokeWidth="3.5"
              />
              <path
                d="M -167 5 Q 0 -136 169 5"
                fill="none"
                stroke={brass}
                strokeWidth="3.1"
                opacity=".72"
              />
              <circle
                cx={-35 + 84 * shift}
                r="72"
                fill="#8e6249"
                stroke={brass}
                strokeWidth="2.4"
              />
              <circle cx={-35 + 84 * shift} r="31" fill={ink} />
              <path
                d={`M ${-56 + 84 * shift} -18 h 16 v 10 h -16 Z`}
                fill={paper}
                opacity=".75"
              />
            </g>
          );
        })}
        <path
          d={`M 135 878 L 735 ${736 - 110 * expose} L 1787 758`}
          fill="none"
          stroke={rust}
          strokeWidth={3.4 + impact}
          opacity=".66"
        />
        <FrameRule color={paper} />
      </Board>
      <Type
        name="The night before"
        face="serif"
        style={{
          left: 113 - 32 * shift,
          top: 347 + 11 * impact,
          fontSize: 183,
          color: paper,
          lineHeight: 0.82,
          clipPath: `inset(0 ${99 - 99 * ease(f + 5, 0, 28)}% -29px 0)`,
          textShadow: "4px 5px #263532",
        }}
      >
        The night
        <br />
        before
      </Type>
    </section>
  );
}

const shards = [
  {
    path: "M 0 0 H 700 L 548 722 L 0 850 Z",
    dx: -496,
    dy: -141,
    color: "#324f49",
  },
  {
    path: "M 700 0 H 1500 L 1374 412 L 548 722 Z",
    dx: 92,
    dy: -392,
    color: "#ac8354",
  },
  {
    path: "M 1500 0 H 1920 V 921 L 1374 412 Z",
    dx: 403,
    dy: -57,
    color: "#523831",
  },
  {
    path: "M 0 850 L 548 722 L 1374 412 L 1580 1080 H 0 Z",
    dx: -261,
    dy: 342,
    color: "#844337",
  },
  {
    path: "M 1374 412 L 1920 921 V 1080 H 1580 Z",
    dx: 410,
    dy: 215,
    color: "#c0a470",
  },
];

export function Collision() {
  const f = useCurrentFrame();
  const one = since("collisionOne", "collision");
  const two = since("collisionTwo", "collision");
  const three = since("collisionThree", "collision");
  const charge = ease(f, one - 16, two + 14);
  const breakOut = ease(f, three - 11, since("title", "collision") + 7);
  const hit = accents(
    f,
    "collision",
    ["collision", "collisionOne", "collisionTwo", "collisionThree"],
    7,
  );
  const { bass } = scoreAt(f + cue("collision"));
  return (
    <section className="scene" style={{ background: "#182d30" }}>
      <Board>
        <Hatch color={paper} opacity={0.21} angle={140} />
        {shards.map(({ path, dx, dy, color }) => (
          <path
            key={path}
            d={path}
            fill={color}
            opacity={0.71 + 0.09 * hit}
            transform={`translate(${dx * (0.3 * (1 - charge) + breakOut)} ${dy * (0.19 * (1 - charge) + breakOut)})`}
          />
        ))}
        <g opacity={0.25 + 0.19 * charge}>
          <Tread
            x={1540 - 261 * breakOut}
            y={604}
            angle={36 - 19 * charge}
            phase={f * 9.2 + 28 * hit}
            scale={1.76}
          />
        </g>
        <g opacity={(0.74 - 0.56 * breakOut) * (1 - 0.1 * hit)}>
          <Eagle
            x={950 - 30 * charge + 92 * breakOut}
            y={555 - 97 * breakOut}
            scale={1.64 + 0.19 * bass}
            fold={0.17 + 0.54 * breakOut}
            color="#172423"
          />
        </g>
        <g style={{ color: brass }} opacity={0.43 + 0.32 * breakOut}>
          <Seal
            x={933 + 80 * breakOut}
            y={520}
            radius={316 + 126 * breakOut + 22 * hit}
            rotation={-15 + 35 * charge + 54 * breakOut}
          />
          <Register x={933 + 80 * breakOut} y={520} size={20} />
        </g>
        <Wire
          y={821 - 243 * breakOut}
          angle={-13 + 7 * charge}
          phase={38 * hit + 11 * f}
          tension={charge}
          color="#d1ad75"
          thickness={3.3}
        />
        <path
          d={`M 118 ${929 - 220 * breakOut} L 1804 ${830 + 84 * breakOut}`}
          stroke={paper}
          strokeWidth={2.4 + hit}
          opacity=".53"
        />
        <FrameRule color={paper} />
      </Board>
    </section>
  );
}

export function Impression() {
  const f = useCurrentFrame();
  const liftAt = since("codaLift", "coda");
  const foldAt = since("codaFold", "coda");
  const end = since("shoreReturn", "coda");
  const lift = ease(f, liftAt - 16, foldAt + 16);
  const fold = ease(f, foldAt - 4, end + 18);
  const { levelDb } = scoreAt(f + cue("coda"));
  const echo = ramp(levelDb, -39, -15);
  return (
    <section className="scene" style={{ background: "#152930" }}>
      <Board>
        <path d="M 0 0 H 1920 V 297 L 0 734 Z" fill="#2d4141" />
        <Hatch color={sea} opacity={0.15} angle={128} scale={16} />
        <g
          transform={`translate(${971 + 243 * fold} ${589 - 53 * lift}) skewX(${-8 + 12 * fold}) rotate(${-5 + 18 * fold}) scale(${1 - 0.42 * fold})`}
          opacity={0.53 + 0.47 * echo}
        >
          <path
            d="M -702 -304 H 702 V 304 H -702 Z"
            fill="#162423"
            opacity=".71"
            transform="translate(29 20)"
          />
          <path d="M -702 -304 H 702 V 304 H -702 Z" fill="#aa9b73" />
          <path
            d={`M -702 -304 H 702 L 702 ${96 - 403 * lift} L -702 ${304 - 211 * lift} Z`}
            fill="#dfcd9b"
          />
          <path
            d={`M -702 ${304 - 211 * lift} L 702 ${96 - 403 * lift}`}
            stroke={brass}
            strokeWidth="4.2"
          />
          <g style={{ color: "#325251" }} opacity={0.34 + 0.42 * echo}>
            <Seal
              x={72}
              y={-2}
              radius={216 + 37 * fold}
              rotation={-26 + 35 * lift}
            />
            <Crown x={72} y={-10} scale={0.87} />
          </g>
          <path
            d="M -634 -257 H 651 M -633 257 H 652"
            stroke="#5b6250"
            strokeWidth="2.2"
            strokeDasharray="13 5"
            opacity=".82"
          />
        </g>
        <path
          d={`M 113 878 H ${1807 - 428 * fold}`}
          stroke={brass}
          strokeWidth="1.7"
          opacity={0.53 + 0.36 * echo}
        />
      </Board>
      <Caption x={121} y={139} color={sand}>
        The last impression
      </Caption>
    </section>
  );
}

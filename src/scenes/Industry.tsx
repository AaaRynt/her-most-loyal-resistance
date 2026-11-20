import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  Eagle,
  FrameRule,
  Gear,
  Hatch,
  Type,
  brass,
  ink,
  paper,
  sand,
  sea,
} from "../Art";
import { accents, cue, ease, ramp, scoreAt, since, strike } from "../score";

const steelSparks = Array.from({ length: 31 }, (_, i) => ({
  angle: -0.19 - ((i * 43) % 97) * 0.022,
  speed: 46 + ((i * 97) % 360),
  lift: -7 + ((i * 37) % 55) * 0.27,
}));

export function Works() {
  const f = useCurrentFrame();
  const impact = accents(
    f,
    "works",
    ["works", "worksPress", "worksSparks", "worksClose"],
    8,
  );
  const { bass } = scoreAt(f + cue("works"));
  const cut = ease(
    f,
    since("worksClose", "works") - 12,
    since("market", "works"),
  );
  const sparkAt = since("worksSparks", "works");
  const spark = ramp(f, sparkAt, sparkAt + 34);
  return (
    <section className="scene" style={{ background: "#222d2c" }}>
      <Board>
        <path d="M 0 0 H 1920 V 410 L 1254 689 L 0 596 Z" fill="#40534b" />
        <path d="M 0 754 L 1920 654 V 1080 H 0 Z" fill="#8c6240" />
        <Hatch color={paper} opacity={0.16} scale={10} angle={127} />
        <path d="M 0 808 H 1920 V 1080 H 0 Z" fill="#322c27" />
        <path d="M 84 794 H 1815 V 824 H 84 Z" fill={sand} />
        <g transform={`translate(${-124 * cut} ${12 * impact})`}>
          <Gear
            x={1389}
            y={445}
            radius={382}
            rotation={f * 0.91}
            color="#ba9d64"
          />
          <Gear
            x={942}
            y={664}
            radius={186}
            rotation={-f * 1.83}
            color="#c67d50"
          />
        </g>
        <path
          d={`M 1235 -60 H 1582 V ${672 + 26 * impact} H 1518 L 1468 ${734 + 26 * impact} H 1351 L 1303 ${671 + 26 * impact} H 1235 Z`}
          fill={ink}
          stroke="#998357"
          strokeWidth="4"
        />
        <path
          d={`M 1326 0 V ${577 + 26 * impact} M 1482 0 V ${580 + 26 * impact}`}
          stroke={sea}
          strokeWidth="3"
          opacity=".61"
        />
        {steelSparks.map(({ angle, speed, lift }, i) => {
          const x = 1405 + Math.cos(angle) * speed * spark;
          const y =
            789 + Math.sin(angle) * speed * spark + speed * spark * spark * 0.2;
          return (
            <path
              key={speed}
              d={`M ${x} ${y} l ${-Math.cos(angle) * (13 + lift)} ${-Math.sin(angle) * (13 + lift)}`}
              stroke={i % 3 === 0 ? paper : brass}
              strokeWidth={1.9 + lift * 0.12}
              opacity={f < sparkAt ? 0 : (1 - spark) * 0.85}
            />
          );
        })}
        <path
          d={`M 116 654 H 794 L 946 ${763 + 6 * bass}`}
          fill="none"
          stroke={brass}
          strokeWidth="2.4"
          opacity=".79"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>The industrial Midlands</Caption>
      <Type
        name="Birmingham"
        style={{
          left: 111,
          top: 408,
          fontSize: 204,
          color: paper,
          translate: `${-33 * cut}px ${8 * impact}px`,
        }}
      >
        BIRMINGHAM
      </Type>
    </section>
  );
}

const companyLabels = [
  {
    name: "I.G. FARBEN",
    at: "market",
    x: 166,
    y: 335,
    width: 1250,
    angle: -4,
    color: "#843e31",
    type: paper,
  },
  {
    name: "SIEMENS",
    at: "marketSiemens",
    x: 435,
    y: 506,
    width: 1210,
    angle: 4,
    color: "#263b3b",
    type: paper,
  },
  {
    name: "VOLKSWAGEN",
    at: "marketVW",
    x: 303,
    y: 686,
    width: 1322,
    angle: -3,
    color: "#a27342",
    type: ink,
  },
] as const;
const marketCells = Array.from({ length: 48 }, (_, i) => ({
  x: 74 + (i % 8) * 226,
  y: 214 + Math.floor(i / 8) * 119,
  i,
}));

export function Market() {
  const f = useCurrentFrame();
  const stampAt = since("marketStamp", "market");
  const seized = ease(f, stampAt - 14, stampAt + 22);
  const jolt = strike(f, stampAt, 7);
  return (
    <section className="scene" style={{ background: "#c5b486" }}>
      <Board>
        <path d="M 0 0 H 1920 V 331 L 0 657 Z" fill="#ded2a7" />
        <path d="M 940 1080 L 1920 275 V 1080 Z" fill="#a2895e" />
        <Hatch color={ink} opacity={0.16} scale={13} angle={33} />
        {marketCells.map(({ x, y, i }) => {
          const locked = ease(
            f,
            16 + (i % 8) * 9 + Math.floor(i / 8) * 3,
            28 + (i % 8) * 9 + Math.floor(i / 8) * 3,
          );
          return (
            <g key={i} opacity={0.54 - (i % 3) * 0.04}>
              <rect
                x={x}
                y={y}
                width={194}
                height={87}
                fill={ink}
                fillOpacity={0.08 + locked * 0.51}
                stroke="#6d6048"
                strokeWidth="1.6"
              />
              <path
                d={`M ${x + 16} ${y + 18} h ${31 + 108 * locked} M ${x + 16} ${y + 68} h ${60 + 34 * locked}`}
                stroke={locked > 0.5 ? paper : ink}
                strokeWidth="2.2"
              />
            </g>
          );
        })}
        <FrameRule color={ink} />
      </Board>
      <Caption color={ink}>German corporate control</Caption>
      <Type
        name="The British market"
        face="serif"
        style={{ left: 112, top: 203, fontSize: 116, color: ink }}
      >
        The British market
      </Type>
      {companyLabels.map(({ name, at, x, y, width, angle, color, type }, i) => {
        const on = since(at, "market");
        const enter = ease(f + 3, on, on + 18);
        const bounce = strike(f, on, 5);
        return (
          <div
            key={at}
            style={{
              position: "absolute",
              left:
                x + (i % 2 ? 1550 : -1430) * (1 - enter) + 41 * jolt * (i - 1),
              top: y + 15 * bounce,
              width,
              height: 153,
              background: color,
              color: type,
              borderTop: `4px solid ${type}`,
              borderBottom: `2px solid ${type}`,
              rotate: `${angle * (0.49 + 0.51 * (1 - seized))}deg`,
              opacity: enter,
              clipPath: "polygon(0 2%,99.9% 0,99.2% 97%,.2% 100%)",
            }}
          >
            <Type name={name} style={{ top: 12, left: 33, fontSize: 144 }}>
              {name}
            </Type>
          </div>
        );
      })}
    </section>
  );
}

const decreeRows = [365, 398, 478, 515, 551, 590, 633, 675, 712, 782, 818, 854];

export function Decree() {
  const f = useCurrentFrame();
  const sealAt = since("decreeSeal", "decree");
  const closeAt = since("decreeClose", "decree");
  const nightAt = since("decreeNight", "decree");
  const sealed = ease(f, sealAt - 7, sealAt + 22);
  const clamp = ease(f, closeAt, nightAt + 15);
  const hit = strike(f, sealAt, 6) + 0.72 * strike(f, closeAt, 7);
  const sweep = ease(f, nightAt - 4, nightAt + 29);
  return (
    <section className="scene" style={{ background: "#7d7258" }}>
      <Board>
        <path d="M 0 0 H 1920 V 1080 H 0 Z" fill="#706b56" />
        <Hatch color={ink} angle={118} opacity={0.29} scale={17} />
        <g
          transform={`translate(${75 - 96 * clamp} ${19 * hit}) rotate(${-5 + 6 * clamp} 981 520)`}
        >
          <path
            d="M 300 101 H 1638 L 1680 964 H 338 Z"
            fill="#312b25"
            opacity=".44"
            transform="translate(43 30)"
          />
          <path d="M 303 104 H 1636 L 1677 947 H 337 Z" fill="#dfcea3" />
          <path
            d="M 336 139 H 1602 L 1634 915 H 371 Z"
            fill="none"
            stroke="#736044"
            strokeWidth="1.8"
          />
          <g opacity={0.35 + 0.39 * sealed}>
            <Eagle
              x={1319}
              y={284}
              scale={0.39 + 0.02 * hit}
              fold={0.14}
              color="#634b3b"
            />
          </g>
          <path
            d="M 431 327 H 1497"
            stroke={ink}
            strokeWidth="3.4"
            opacity=".58"
          />
          {decreeRows.map((y, i) => {
            const x = 432 + (i % 3) * 16;
            const width = 614 + ((i * 71) % 310);
            return (
              <g key={y}>
                <path
                  d={`M ${x} ${y} h ${width}`}
                  stroke={ink}
                  opacity=".45"
                  strokeDasharray="34 9 14 9 54 12"
                  strokeWidth="2.5"
                />
                {i % 3 !== 1 && (
                  <path
                    d={`M ${x} ${y - 5} h ${width * clamp * (i % 2 ? 0.82 : 0.57)} v 13 h ${-width * clamp * (i % 2 ? 0.82 : 0.57)} Z`}
                    fill="#232c28"
                  />
                )}
              </g>
            );
          })}
          <path
            d="M 435 882 H 844 M 1152 882 H 1512"
            stroke="#796957"
            strokeWidth="2"
          />
        </g>
        <path
          d={`M 0 1080 V ${1170 - 351 * sweep} L 1920 ${1384 - 504 * sweep} V 1080 Z`}
          fill="#222d2c"
        />
        <FrameRule color={paper} />
      </Board>
      <div
        style={{
          position: "absolute",
          left: 439 + 27 * hit,
          top: 421 + 19 * hit,
          width: 1034,
          height: 228,
          rotate: `${-6 + 10 * clamp}deg`,
          background: "#813d32",
          color: paper,
          opacity: sealed,
          border: `5px double ${paper}`,
          scale: 1 + 0.07 * hit,
        }}
      >
        <Type name="Curfew" style={{ top: 19, left: 42, fontSize: 214 }}>
          CURFEW
        </Type>
      </div>
      <Caption x={117} y={136}>
        Emergency order
      </Caption>
    </section>
  );
}

const railSleepers = Array.from({ length: 16 }, (_, i) => i);
const wagonRibs = Array.from({ length: 8 }, (_, i) => i * 66);

export function Rail() {
  const f = useCurrentFrame();
  const roll = ramp(f, 0, since("ration", "rail") + 3);
  const shunt = accents(f, "rail", ["railSwitch", "railCross", "railClose"], 8);
  const close = ease(
    f,
    since("railClose", "rail") - 8,
    since("ration", "rail"),
  );
  const lead = -560 + 2077 * roll + 20 * shunt;
  return (
    <section className="scene" style={{ background: "#2c3e3d" }}>
      <Board>
        <path
          d="M 0 0 H 1920 V 668 L 1354 542 L 547 660 L 0 568 Z"
          fill="#8b8f70"
        />
        <path
          d="M 0 379 L 724 442 L 1300 413 L 1920 476 V 619 H 0 Z"
          fill="#5d7469"
        />
        <Hatch color={paper} angle={164} opacity={0.18} />
        <g fill="none" stroke={paper} opacity=".61">
          <path
            d="M -108 959 L 1294 552 L 1950 542 M -88 1080 L 1475 633 L 1950 612"
            strokeWidth="5"
          />
          <path
            d="M -180 1007 L 1354 583 L 1970 572 M -24 1080 L 1504 664 L 1970 650"
            strokeWidth="1.5"
          />
          {railSleepers.map((i) => {
            const x = i * 142 - ((f * 3.7) % 142);
            const y = 1086 - x * 0.29;
            return (
              <path
                key={i}
                d={`M ${x - 65} ${y - 164} l 92 176`}
                strokeWidth="3.2"
              />
            );
          })}
        </g>
        <g transform={`translate(${lead} ${722 - roll * 157}) rotate(-10)`}>
          {[0, -560, -1120].map((x, i) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <path
                d="M 0 -228 H 508 L 547 -210 V 28 H 0 Z"
                fill={i % 2 ? "#534638" : "#313a36"}
                stroke="#b69c69"
                strokeWidth="2.4"
              />
              <path d="M 0 -228 H 508 L 547 -210 L 37 -205 Z" fill="#93815d" />
              {wagonRibs.map((l) => (
                <path
                  key={l}
                  d={`M ${26 + l} -192 V -7`}
                  stroke={sand}
                  strokeWidth="2"
                  opacity=".5"
                />
              ))}
              <path d="M 40 -137 H 494 V -92 H 40 Z" fill="#795a3c" />
              <path
                d="M 21 -24 H 524"
                stroke={paper}
                strokeWidth="3"
                opacity=".51"
              />
              <circle
                cx="117"
                cy="22"
                r="40"
                fill={ink}
                stroke="#97835a"
                strokeWidth="3"
              />
              <circle
                cx="449"
                cy="22"
                r="40"
                fill={ink}
                stroke="#97835a"
                strokeWidth="3"
              />
            </g>
          ))}
        </g>
        <path
          d={`M 1463 ${661 - 22 * shunt} V 229 H 1577 V 257 H 1517 V ${719 - 39 * close} Z`}
          fill={ink}
          stroke={brass}
          strokeWidth="2.4"
          opacity=".88"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption color={ink}>Midlands rail yards</Caption>
    </section>
  );
}

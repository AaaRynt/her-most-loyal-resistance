import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  FrameRule,
  Hatch,
  Register,
  Seal,
  Type,
  brass,
  ink,
  paper,
  sand,
  sea,
  teal,
} from "../Art";
import {
  accents,
  cue,
  duration,
  ease,
  ramp,
  scoreAt,
  since,
  strike,
} from "../score";

const shore =
  "M 1002 114 L 1082 106 L 1105 154 L 1162 165 L 1144 213 L 1214 240 L 1204 273 L 1161 310 L 1178 354 L 1239 393 L 1224 434 L 1262 483 L 1245 524 L 1299 576 L 1315 626 L 1408 645 L 1452 691 L 1430 724 L 1463 764 L 1410 811 L 1290 818 L 1203 864 L 1124 866 L 1070 903 L 1004 893 L 940 908 L 870 894 L 930 853 L 962 804 L 1030 792 L 1072 742 L 1024 718 L 985 734 L 921 707 L 997 655 L 1000 610 L 1056 587 L 1041 563 L 1084 530 L 1040 478 L 979 493 L 948 471 L 990 433 L 956 399 L 994 331 L 950 297 L 975 263 L 946 240 L 986 192 L 965 155 Z";
const waterLines = Array.from({ length: 27 }, (_, index) => index);

function Swell({
  frame,
  amplitude,
  y = 620,
  color = sea,
  opacity = 0.5,
}: {
  frame: number;
  amplitude: number;
  y?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <g fill="none" stroke={color} opacity={opacity}>
      {waterLines.map((line) => {
        const height = y + line * 24;
        const lift = Math.sin(frame * 0.038 + line * 0.24) * amplitude;
        return (
          <path
            key={line}
            strokeWidth={line % 5 === 0 ? 2.3 : 1.1}
            d={`M -100 ${height - lift * 0.24} Q 255 ${height + lift} 640 ${height - 0.22 * lift} T 1400 ${height + 0.36 * lift} T 2040 ${height - 0.35 * lift}`}
          />
        );
      })}
    </g>
  );
}

export function Island() {
  const f = useCurrentFrame();
  const { bass, levelDb } = scoreAt(f);
  const flare = strike(f, cue("openingAttack"), 17);
  const sweep = ease(f, cue("openingAttack") - 20, cue("openingRule") + 30);
  const appear = ease(f + 3, 0, 41);
  const depth = ramp(f, 0, cue("fleet"));
  return (
    <section className="scene" style={{ background: "#101e26" }}>
      <Board>
        <defs>
          <clipPath id="island-relief">
            <path d={shore} />
          </clipPath>
        </defs>
        <path d="M 0 0 H 1920 V 560 L 902 798 L 0 672 Z" fill="#1c3540" />
        <Hatch color={sea} opacity={0.15} scale={16} angle={123} />
        <Swell
          frame={f}
          amplitude={41 + bass * 40}
          y={569}
          opacity={0.45 * appear}
        />
        <g
          opacity={0.25 + 0.6 * appear}
          transform={`translate(${152 - 60 * sweep} ${-24 + 16 * depth}) rotate(${-10 + 9 * depth} 1215 510) scale(${0.971 + 0.03 * flare})`}
        >
          <path
            d={shore}
            transform="translate(18 16)"
            fill="#9d7048"
            opacity=".77"
          />
          <path d={shore} fill="#a6ab8b" stroke="#e3d3a0" strokeWidth="2.2" />
          <g
            clipPath="url(#island-relief)"
            fill="none"
            stroke={teal}
            opacity=".64"
          >
            {waterLines.map((line) => (
              <path
                key={line}
                d={`M 787 ${71 + 39 * line} Q 1018 ${126 + 28 * line} ${1461 - 24 * line} ${8 + 51 * line}`}
                strokeWidth={line % 3 === 0 ? 4 : 1.8}
              />
            ))}
          </g>
        </g>
        <g style={{ color: brass }} opacity={0.34 + flare * 0.33}>
          <Seal
            x={1249}
            y={506}
            radius={410 + 20 * flare}
            rotation={-21 + f * 0.13}
          />
          <Register x={1272} y={706} size={16} />
        </g>
        <path
          d="M 118 748 H 483 L 648 664 H 1799"
          fill="none"
          stroke={brass}
          strokeWidth={2 + flare * 1.4}
          opacity={0.63 + 0.23 * ramp(levelDb, -27, -12)}
          strokeDasharray="1"
          pathLength="1"
          strokeDashoffset={1 - sweep}
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>Britain</Caption>
      <Type
        name="An island"
        face="serif"
        style={{
          top: 354,
          left: 122,
          fontSize: 201,
          color: paper,
          translate: `${-26 * (1 - appear)}px ${19 * (1 - appear)}px`,
          opacity: appear,
        }}
      >
        An island
      </Type>
    </section>
  );
}

function Vessel({
  x,
  y,
  scale,
  hull,
  angle,
}: {
  x: number;
  y: number;
  scale: number;
  hull: string;
  angle: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <path
        d="M -401 0 H 235 L 399 -32 L 363 22 L 298 66 H -355 Z"
        fill={hull}
      />
      <path
        d="M -342 27 H 351 M -283 9 H 276"
        fill="none"
        stroke={sand}
        opacity=".67"
        strokeWidth="2.1"
      />
      <path
        d="M -240 -4 V -29 H -174 V -51 H -132 V -31 H -72 V -87 H -42 V -106 H -17 V -73 H 69 V -15 H 118 V -47 H 201 V -12 H 251 V 7 H -240 Z"
        fill={hull}
      />
      <path
        d="M -30 -96 V -168 M -62 -137 H 13 M 97 -8 V -97 M 79 -76 H 120 M -217 -21 L -268 -36 M 191 -41 L 250 -66"
        fill="none"
        stroke={hull}
        strokeWidth="4.1"
      />
      <path
        d="M 21 -68 V -31 M 37 -68 V -33 M 52 -68 V -33 M -146 -43 V -29 M -114 -29 H -76"
        fill="none"
        stroke={sand}
        strokeWidth="2"
        opacity=".6"
      />
      <path
        d="M -396 73 C -244 50 -189 99 -98 82 S 58 63 162 77 S 320 61 437 67"
        stroke={paper}
        strokeWidth="3.1"
        fill="none"
        opacity=".64"
      />
    </g>
  );
}

export function Fleet() {
  const f = useCurrentFrame();
  const strikeWake = accents(f, "fleet", ["fleetWake", "fleetTurn"], 13);
  const glide = ramp(f, 0, since("channel", "fleet"));
  const { bass } = scoreAt(f + cue("fleet"));
  const flight = ease(
    f,
    since("fleetTurn", "fleet") - 11,
    since("channel", "fleet"),
  );
  return (
    <section className="scene" style={{ background: "#b8aa83" }}>
      <Board>
        <path d="M 0 0 H 1920 V 433 L 1202 485 L 0 381 Z" fill="#ded1a6" />
        <path d="M 0 680 L 1920 505 V 1080 H 0 Z" fill="#546f6e" />
        <path
          d={`M 0 972 L 1920 ${677 + 83 * flight} V 1080 H 0 Z`}
          fill={teal}
        />
        <Hatch color={ink} opacity={0.16} scale={15} angle={173} />
        <g style={{ color: "#665e49" }} opacity=".53">
          <Seal
            x={1470 + 74 * glide}
            y={451}
            radius={340}
            rotation={-16 + 19 * glide}
          />
        </g>
        <Vessel
          x={596 + 152 * glide}
          y={529}
          scale={0.65}
          angle={-5}
          hull="#526260"
        />
        <Vessel
          x={1340 + 105 * glide}
          y={499}
          scale={0.55}
          angle={-7}
          hull="#536660"
        />
        <Vessel
          x={708 + 354 * glide}
          y={713 + 9 * strikeWake}
          scale={1.48 + 0.11 * flight + 0.04 * bass}
          angle={-6 + 3 * flight}
          hull={ink}
        />
        <Swell
          frame={f + 72}
          y={757}
          amplitude={53 + 30 * strikeWake}
          color={paper}
          opacity={0.41}
        />
        <FrameRule color={ink} />
      </Board>
      <Caption color={ink}>The Royal Navy</Caption>
    </section>
  );
}

export function Outbound() {
  const f = useCurrentFrame();
  const { bass, treble } = scoreAt(f + cue("outbound"));
  const push = accents(f, "outbound", ["wakeOne", "wakeTwo", "wakeLast"], 11);
  const end = since("exile", "outbound");
  const travel = ramp(f, 0, end + 7);
  const hold = ease(f, end - 31, end + 5);
  const wake = "M -36 868 C 383 891 589 485 971 569 S 1442 672 1954 351";
  return (
    <section className="scene" style={{ background: "#253f47" }}>
      <Board>
        <path
          d="M 0 0 H 1920 V 210 L 1488 322 L 1177 256 L 802 385 L 0 256 Z"
          fill="#132c37"
        />
        <path
          d={`M 0 942 L 287 771 L 568 862 L 965 773 L 1328 887 L 1920 ${762 - 90 * hold} V 1080 H 0 Z`}
          fill="#172f32"
        />
        <Swell
          frame={f + 72}
          amplitude={42 + 22 * bass + 18 * push}
          y={491}
          opacity={0.41}
        />
        <Hatch color={sea} opacity={0.13} scale={17} />
        <g style={{ color: paper }} opacity={0.38 + 0.18 * treble}>
          <Seal
            x={781 + 584 * travel}
            y={545 - 44 * hold}
            radius={153 + 177 * hold}
            rotation={-35 + 44 * travel}
          />
        </g>
        <path
          d={wake}
          fill="none"
          stroke={brass}
          strokeWidth={3 + 2 * push}
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - ease(f, 0, end)}
          opacity=".72"
        />
        <path
          d={wake}
          fill="none"
          stroke={paper}
          strokeWidth="1.3"
          strokeDasharray="8 12"
          strokeDashoffset={-5 * f}
          opacity=".41"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>The far shore</Caption>
    </section>
  );
}

export function ShoreReturn() {
  const f = useCurrentFrame();
  const { levelDb } = scoreAt(f + cue("shoreReturn"));
  const end = duration - cue("shoreReturn");
  const fall = ramp(f, 0, end - 1);
  const drift = ease(f, 0, end - 2);
  const sound = ramp(levelDb, -83, -30);
  const last = 1 - ramp(f, end - 28, end - 1);
  return (
    <section className="scene" style={{ background: "#111c23" }}>
      <Board>
        <g opacity={(0.4 + 0.6 * sound) * last}>
          <path
            d={`M 0 1080 V 743 L 402 650 L 705 692 L 1098 530 L 1280 560 L 1522 493 L 1765 480 L 1920 ${434 + 21 * drift} V 1080 Z`}
            fill="#263f44"
          />
          <path
            d={`M 0 776 L 480 693 L 719 722 L 1097 576 L 1268 605 L 1530 516 L 1787 506 L 1920 ${455 + 21 * drift}`}
            fill="none"
            stroke="#829990"
            strokeWidth="2"
          />
          <Swell
            frame={f + 165}
            amplitude={11 + 39 * sound}
            y={660}
            color={sea}
            opacity={0.35 + 0.23 * sound}
          />
          <g style={{ color: brass }} opacity={0.34 + 0.41 * sound}>
            <Seal
              x={1280 + 58 * drift}
              y={523 + 31 * drift}
              radius={190 - 48 * fall}
              rotation={25 * fall}
            />
            <Register x={1280 + 58 * drift} y={523 + 31 * drift} />
          </g>
          <path
            d="M 112 877 H 1787"
            stroke={brass}
            strokeWidth="1.8"
            strokeOpacity=".62"
            strokeDasharray="1"
            pathLength="1"
            strokeDashoffset={-fall * 0.81}
          />
        </g>
      </Board>
    </section>
  );
}

import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  Figure,
  FrameRule,
  Hatch,
  Register,
  Seal,
  brass,
  ink,
  paper,
  rust,
  sand,
  teal,
} from "../Art";
import { accents, ease, since, strike } from "../score";

const coupons = [
  { x: 476, text: "BREAD", at: "rationPunch", fill: "#9c523e" },
  { x: 938, text: "SUGAR", at: "rationTear", fill: "#3b615c" },
  { x: 1400, text: "FUEL", at: "rationTurn", fill: "#9a733e" },
] as const;

export function Ration() {
  const f = useCurrentFrame();
  const slide = ease(f, 0, 33);
  const end = since("queue", "ration");
  const split = ease(f, end - 37, end + 2);
  const impact = accents(
    f,
    "ration",
    ["rationPunch", "rationTear", "rationTurn"],
    7,
  );
  return (
    <section className="scene" style={{ background: "#65634e" }}>
      <Board>
        <Hatch color={paper} angle={141} opacity={0.23} scale={15} />
        <path d="M 0 812 L 1920 482 V 1080 H 0 Z" fill="#343c36" />
        <g
          transform={`translate(${-169 * (1 - slide) + 22 * impact} ${55 * (1 - slide) + 11 * impact}) rotate(${-7 + 5 * split} 960 535)`}
        >
          <path
            d="M 271 190 H 1705 V 900 H 271 Z"
            fill={ink}
            opacity=".55"
            transform="translate(42 36)"
          />
          <path d="M 271 190 H 1705 V 900 H 271 Z" fill="#d9c8a0" />
          <path
            d="M 298 216 H 1678 V 874 H 298 Z"
            fill="none"
            stroke={ink}
            strokeWidth="2"
          />
          <path
            d="M 298 417 H 1678 M 298 452 H 1678 M 298 792 H 1678"
            fill="none"
            stroke="#5e5640"
            strokeWidth="2.1"
          />
          <text
            x="322"
            y="386"
            fill={ink}
            fontFamily="Barlow Condensed"
            fontWeight="800"
            fontSize="160"
          >
            RATION BOOK
          </text>
          <g style={{ color: "#886845" }} opacity=".59">
            <Seal x={1489} y={336} radius={111} rotation={8 + 17 * split} />
          </g>
          {coupons.map(({ x, text, at, fill }, i) => {
            const stamp = since(at, "ration");
            const lift = ease(f, stamp, stamp + 27);
            const jolt = strike(f, stamp, 6);
            return (
              <g
                key={text}
                transform={`translate(${x + 42 * lift * (i - 1)} ${589 + 159 * lift + 23 * jolt}) rotate(${(i - 1) * 9 * lift})`}
              >
                <path
                  d="M -160 -106 H 160 L 173 -91 V 98 L 162 110 H -172 V -95 Z"
                  fill={fill}
                  opacity={1 - 0.32 * lift}
                />
                <path
                  d="M -147 -82 H 147 V 82 H -147 Z"
                  stroke={paper}
                  strokeWidth="1.7"
                  fill="none"
                  opacity=".62"
                />
                <path
                  d="M -156 -101 H 158 M -160 105 H 158"
                  stroke={paper}
                  strokeWidth="2.5"
                  strokeDasharray="2 9"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fill={paper}
                  fontFamily="Barlow Condensed"
                  fontWeight="800"
                  fontSize="97"
                >
                  {text}
                </text>
                <path
                  d="M -117 49 H 117"
                  stroke={paper}
                  strokeWidth="2"
                  opacity=".7"
                />
                <circle
                  cx={-109 + 18 * i}
                  cy="-57"
                  r={12 * lift}
                  fill="#d9c8a0"
                />
              </g>
            );
          })}
          <path
            d="M 333 832 H 709 M 1250 832 H 1641"
            stroke="#716a52"
            strokeWidth="2"
          />
        </g>
        <FrameRule color={paper} />
      </Board>
    </section>
  );
}

const queue = [
  { x: 235, y: 673, s: 1.4, color: "#23322e" },
  { x: 425, y: 657, s: 1.27, color: "#322f29" },
  { x: 604, y: 636, s: 1.2, color: "#2b3834" },
  { x: 764, y: 608, s: 1.11, color: "#463e32" },
  { x: 925, y: 586, s: 1.01, color: "#2a3331" },
  { x: 1078, y: 567, s: 0.92, color: "#493f33" },
  { x: 1213, y: 542, s: 0.9, color: "#303a33" },
  { x: 1337, y: 521, s: 0.82, color: "#252d29" },
];

function Basket({
  x,
  y,
  scale,
  full,
}: {
  x: number;
  y: number;
  scale: number;
  full: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M -15 5 Q 0 -35 21 4"
        stroke={sand}
        strokeWidth="3"
        fill="none"
      />
      {full && (
        <path
          d="M -20 9 Q -23 -19 13 -16 Q 34 -15 26 9 Z"
          fill={brass}
          stroke="#663b2e"
          strokeWidth="2.7"
        />
      )}
      <path
        d="M -34 1 H 35 L 26 37 H -26 Z"
        fill="#9e7147"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d="M -27 12 H 28 M -25 23 H 26 M -16 5 V 32 M -2 5 V 33 M 12 5 V 33"
        stroke={sand}
        strokeWidth="1.3"
      />
    </g>
  );
}

export function Queue() {
  const f = useCurrentFrame();
  const stepAt = since("queueMove", "queue");
  const windowAt = since("queueWindow", "queue");
  const handAt = since("queueHand", "queue");
  const step = ease(f, stepAt - 2, stepAt + 38);
  const unveil = ease(f, windowAt, windowAt + 22);
  const hand = ease(f, handAt, handAt + 26);
  const move = accents(f, "queue", ["queue", "queueMove", "queueHand"], 8);
  const post = ease(f, handAt + 10, since("postmark", "queue") + 7);
  return (
    <section className="scene" style={{ background: "#8e9072" }}>
      <Board>
        <path d="M 0 0 H 1920 V 557 L 914 786 L 0 621 Z" fill="#b3a680" />
        <path
          d="M 0 443 L 607 347 L 1331 366 L 1920 287 V 0 H 0 Z"
          fill="#667d75"
        />
        <path d="M 0 940 L 1920 716 V 1080 H 0 Z" fill="#4d6159" />
        <Hatch color={paper} opacity={0.19} angle={153} scale={15} />
        <path d="M 1259 277 L 1783 203 V 800 L 1259 893 Z" fill="#574b3a" />
        <path
          d="M 1330 414 L 1728 363 V 687 L 1330 754 Z"
          fill="#242e2c"
          stroke="#80705a"
          strokeWidth="4"
        />
        <path
          d="M 1356 545 L 1716 489 M 1356 647 L 1716 591"
          stroke="#a59368"
          strokeWidth="6.2"
          opacity=".72"
        />
        <path
          d="M 1582 513 Q 1586 486 1620 482 L 1651 477 Q 1676 477 1678 499 L 1678 521 L 1582 538 Z"
          fill={brass}
          opacity={1 - hand}
        />
        <path
          d={`M 1330 414 L 1728 363 L 1728 ${643 - 216 * unveil} L 1330 ${731 - 217 * unveil} Z`}
          fill="#493e33"
          stroke="#ae8a56"
          strokeWidth="2.7"
        />
        <path d="M 1282 310 L 1763 250 L 1763 335 L 1282 398 Z" fill={ink} />
        <text
          x="1307"
          y="382"
          fill={paper}
          fontFamily="Barlow Condensed"
          fontSize="53"
          fontWeight="800"
          transform="rotate(-7 1285 343)"
        >
          RATION OFFICE
        </text>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M 117 892 Q 686 ${887 - i * 33} 1280 ${745 - i * 17}`}
            stroke={sand}
            strokeWidth={i === 1 ? 2.3 : 1.1}
            fill="none"
            opacity=".64"
          />
        ))}
        <g transform={`translate(${-58 * post} ${8 * move})`}>
          {[...queue].reverse().map(({ x, y, s, color }, i) => {
            const localStep = Math.max(0, step - i * 0.041);
            const advance = (84 - i * 4) * localStep;
            const vertical = 5 * Math.sin(localStep * 4) * (1 + i * 0.035);
            const basket = i === 0 ? 112 * hand : 0;
            return (
              <g key={x}>
                <path
                  d={`M ${x + advance - 45} ${y + 156 * s} l ${156 * s} 7 l 48 18 l ${-167 * s} -6 Z`}
                  fill="#363c36"
                  opacity=".41"
                />
                <Figure
                  x={x + advance}
                  y={y + vertical}
                  scale={s}
                  color={color}
                  detail={sand}
                  style={i}
                />
                {i % 2 === 0 && (
                  <Basket
                    x={x + advance + 65 * s + basket}
                    y={y + vertical + 101 * s - 10 * hand * (i === 0 ? 1 : 0)}
                    scale={s * 0.88}
                    full={i === 0 && hand > 0.5}
                  />
                )}
              </g>
            );
          })}
        </g>
        <FrameRule color={paper} />
      </Board>
      <Caption>Food shortages</Caption>
    </section>
  );
}

const addressLines = [296, 324, 352, 401, 435, 469];

export function Postmark() {
  const f = useCurrentFrame();
  const foldAt = since("postFold", "postmark");
  const stampAt = since("postStamp", "postmark");
  const fold = ease(f, foldAt - 4, foldAt + 25);
  const seal = ease(f, stampAt, stampAt + 20);
  const hit = strike(f, stampAt, 8);
  const leave = ease(f, stampAt + 17, since("outbound", "postmark") + 3);
  return (
    <section className="scene" style={{ background: teal }}>
      <Board>
        <path d="M 0 0 H 1920 V 386 L 978 594 L 0 251 Z" fill="#31575b" />
        <path d="M 0 938 L 1920 630 V 1080 H 0 Z" fill="#182c33" />
        <Hatch color={paper} opacity={0.19} angle={135} scale={22} />
        <g
          transform={`translate(${981 + 148 * leave} ${553 - 60 * leave + 13 * hit}) rotate(${-12 + 10 * fold - 2 * leave}) scale(${1 - 0.11 * leave}) translate(-565 -351)`}
        >
          <path
            d="M 0 0 H 1130 V 694 H 0 Z"
            fill={ink}
            opacity=".42"
            transform="translate(23 19)"
          />
          <path d="M 0 0 H 1130 V 694 H 0 Z" fill="#d5c397" />
          <path
            d="M 0 693 L 469 308 L 565 379 L 680 298 L 1130 693 Z"
            fill="#bc9e71"
            stroke="#745e45"
            strokeWidth="2"
          />
          <path
            d={`M 0 0 H 1130 L 610 ${86 + 346 * fold} Q 565 ${110 + 343 * fold} 509 ${82 + 346 * fold} Z`}
            fill="#ecdcb2"
            stroke="#967452"
            strokeWidth="2.8"
          />
          {addressLines.map((y, i) => (
            <path
              key={y}
              d={`M 96 ${y} h ${191 + ((i * 57) % 150)}`}
              stroke="#8b7454"
              strokeWidth={1.6 + (i % 2)}
              strokeDasharray="24 4 13 6"
              opacity={0.6 * (1 - seal * 0.53)}
            />
          ))}
          <g
            opacity={seal}
            style={{ color: "#884134" }}
            transform={`translate(${-23 * hit} ${-14 * hit})`}
          >
            <Seal
              x={849}
              y={203}
              radius={133 + 18 * hit}
              rotation={-22 + 33 * seal}
            />
            <path
              d="M 882 174 Q 949 147 1085 174 M 888 204 Q 959 176 1091 201 M 890 231 Q 950 203 1085 231"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <Register x={851} y={207} size={18} />
          </g>
          <path
            d="M 27 653 H 1104"
            stroke={rust}
            strokeWidth="3.7"
            opacity=".67"
            strokeDasharray="37 16"
          />
        </g>
        <FrameRule color={paper} />
      </Board>
      <Caption>Across the water</Caption>
    </section>
  );
}

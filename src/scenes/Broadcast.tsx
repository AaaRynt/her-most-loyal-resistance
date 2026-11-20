import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  Figure,
  FrameRule,
  Gear,
  Hatch,
  Type,
  brass,
  ink,
  paper,
  rust,
  sand,
  sea,
} from "../Art";
import { accents, cue, ease, ramp, scoreAt, since } from "../score";

const printLines = Array.from({ length: 10 }, (_, i) => i);
const movingSheets = [0, 1, 2, 3, 4];

export function Leaflets() {
  const f = useCurrentFrame();
  const feed = since("leafletFeed", "leaflets");
  const burst = since("leafletBurst", "leaflets");
  const flip = since("leafletFlip", "leaflets");
  const pull = ease(f, feed - 11, burst + 19);
  const hit = accents(
    f,
    "leaflets",
    ["leaflets", "leafletFeed", "leafletBurst", "leafletFlip"],
    7,
  );
  const send = ease(f, burst - 9, flip + 24);
  return (
    <section className="scene" style={{ background: "#273833" }}>
      <Board>
        <path d="M 0 1080 V 603 L 1920 478 V 1080 Z" fill="#666548" />
        <Hatch color={paper} opacity={0.18} angle={125} />
        <Gear
          x={1493}
          y={254}
          radius={251}
          rotation={-1.84 * f}
          color="#957b52"
        />
        <Gear
          x={1793}
          y={538}
          radius={171}
          rotation={2.6 * f}
          color="#9b6746"
        />
        {movingSheets.map((i) => {
          const spread = ease(f, burst + i * 3, flip + 16 + i * 4);
          return (
            <path
              key={i}
              d="M -341 -159 L 340 -160 L 353 168 L -345 168 Z"
              transform={`translate(${982 + 95 * i * spread} ${679 + 39 * i - 58 * i * spread}) rotate(${-6 + 4 * i * spread})`}
              fill={i % 2 ? "#d1bb8a" : "#b8a277"}
              stroke={ink}
              strokeWidth="2.1"
              opacity={send * 0.81}
            />
          );
        })}
        <g
          transform={`translate(${459 + 76 * pull + 625 * send} ${461 + 92 * pull + 40 * send + 13 * hit}) skewX(${-14 + 12 * send}) rotate(${-4 + 5 * send})`}
        >
          <path
            d="M -340 -184 H 382 L 407 296 H -360 Z"
            fill="#ead8aa"
            stroke="#827052"
            strokeWidth="3"
          />
          <path
            d="M -314 -144 H 349 L 360 265 H -328 Z"
            fill="none"
            stroke={ink}
            strokeWidth="1.8"
            opacity=".87"
          />
          <text
            x="-282"
            y="-54"
            fill={ink}
            fontFamily="Barlow Condensed"
            fontWeight="800"
            fontSize="138"
            opacity={pull}
          >
            FREE PRESS
          </text>
          <path
            d="M -279 -23 H 292 M -279 198 H 306"
            stroke={rust}
            strokeWidth="6"
            opacity={pull}
          />
          {printLines.map((i) => (
            <path
              key={i}
              d={`M ${i < 5 ? -282 : 17} ${16 + (i % 5) * 32} h ${224 - ((i * 23) % 63)}`}
              stroke={ink}
              strokeWidth="3.4"
              strokeDasharray="27 7 16 8"
              opacity={pull * 0.63}
            />
          ))}
        </g>
        <path
          d={`M 0 0 H 1920 V ${309 + 25 * hit} L 1080 ${346 + 29 * hit} L 0 ${294 + 26 * hit} Z`}
          fill="#1c2728"
        />
        <path
          d={`M 0 ${294 + 26 * hit} L 1080 ${346 + 29 * hit} L 1920 ${309 + 25 * hit}`}
          stroke={sand}
          strokeWidth="7"
          fill="none"
        />
        <path
          d={`M 0 ${277 + 18 * hit} L 1080 ${324 + 29 * hit} L 1920 ${290 + 25 * hit}`}
          stroke={paper}
          strokeWidth="1.6"
          opacity=".66"
          fill="none"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>Underground printing</Caption>
    </section>
  );
}

const wallRows = Array.from({ length: 10 }, (_, i) => i);
const wallBlocks = Array.from({ length: 8 }, (_, i) => i);

export function StreetPrint() {
  const f = useCurrentFrame();
  const pasteAt = since("streetPaste", "streetPrint");
  const passAt = since("streetPass", "streetPrint");
  const end = since("receivers", "streetPrint");
  const put = ease(f, pasteAt - 11, pasteAt + 24);
  const rip = ease(f, since("streetWall", "streetPrint") - 7, end + 3);
  const stamp = accents(
    f,
    "streetPrint",
    ["streetPaste", "streetPass", "streetWall"],
    6,
  );
  const walk = ramp(f, passAt - 20, end + 22);
  return (
    <section className="scene" style={{ background: "#665f4d" }}>
      <Board>
        <path d="M 0 0 L 1920 176 V 956 L 0 1080 Z" fill="#83755a" />
        <path d="M 1493 0 H 1920 V 1080 H 1560 L 1458 839 Z" fill="#384f48" />
        <Hatch color={paper} opacity={0.29} angle={147} scale={19} />
        <g
          stroke="#504f40"
          fill="none"
          strokeWidth="2.2"
          opacity=".75"
          transform={`translate(${-93 * rip} 0) skewY(4)`}
        >
          {wallRows.map((row) => (
            <g key={row}>
              <path d={`M 0 ${row * 101} H 1501`} />
              {wallBlocks.map((cell) => (
                <path
                  key={cell}
                  d={`M ${cell * 218 + (row % 2) * 93} ${row * 101} v 101`}
                />
              ))}
            </g>
          ))}
        </g>
        <g
          transform={`translate(${492 + 107 * put - 128 * rip} ${247 + 21 * stamp}) rotate(${-5 + 6 * put})`}
        >
          <path
            d="M 0 8 L 814 0 L 829 568 L 7 585 Z"
            fill="#372d26"
            opacity=".47"
            transform="translate(23 16)"
          />
          <path d="M 0 8 L 814 0 L 829 568 L 7 585 Z" fill="#ae9870" />
          <path
            d={`M 1 8 L ${820 * put} 0 L ${829 * put} 438 L ${744 * put} 499 L ${536 * put} 541 L ${373 * put} 513 L ${260 * put} 588 L 7 585 Z`}
            fill="#e9d5a4"
          />
          <path
            d={`M 16 435 L ${771 * put} 420 M 21 465 L ${675 * put} 453`}
            stroke={rust}
            strokeWidth="5"
            opacity={put}
          />
          <text
            x="57"
            y="207"
            fill={ink}
            fontFamily="Barlow Condensed"
            fontWeight="800"
            fontSize="159"
            opacity={put}
          >
            WHO OWNS
          </text>
          <text
            x="57"
            y="384"
            fill={ink}
            fontFamily="Barlow Condensed"
            fontWeight="800"
            fontSize="174"
            opacity={put}
          >
            BRITAIN?
          </text>
        </g>
        <g opacity=".91">
          <Figure
            x={-180 + 2310 * walk}
            y={782 - 37 * walk}
            scale={2.35}
            color={ink}
            detail="#616856"
            style={2}
          />
          <Figure
            x={2120 - 1948 * walk}
            y={807 + 30 * walk}
            scale={1.78}
            color="#273431"
            detail="#777a5b"
            style={0}
          />
        </g>
        <FrameRule color={paper} />
      </Board>
    </section>
  );
}

const receiverPanel = [
  { x: 486, y: 414, offset: 0, at: "receivers" },
  { x: 1426, y: 414, offset: 21, at: "receiversOne" },
  { x: 486, y: 725, offset: 35, at: "receiversTwo" },
  { x: 1426, y: 725, offset: 53, at: "receiversThree" },
] as const;
const tunerTicks = Array.from({ length: 29 }, (_, i) => i);

function Receiver({
  x,
  y,
  level,
  active,
  phase,
}: {
  x: number;
  y: number;
  level: number;
  active: number;
  phase: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.45 + active * 0.55}>
      <path
        d="M -347 -124 H 289 L 341 -101 V 133 H -347 Z"
        fill="#714f36"
        stroke="#a38558"
        strokeWidth="3"
      />
      <path d="M -326 -103 H 321 V 111 H -326 Z" fill="#313c35" />
      <path
        d="M -299 -66 H 198 V -7 H -299 Z"
        fill="#a28a58"
        stroke={paper}
        strokeOpacity=".66"
        strokeWidth="2"
      />
      {tunerTicks.map((i) => (
        <path
          key={i}
          d={`M ${-280 + i * 16} -57 v ${i % 4 === 0 ? 34 : 19}`}
          stroke={ink}
          strokeWidth="2.1"
        />
      ))}
      <path
        d={`M ${-99 + 124 * phase} -64 V -10`}
        stroke={active > 0.78 ? "#f6c276" : rust}
        strokeWidth="5.2"
      />
      {[22, 39, 54, 69, 84].map((row) => (
        <path
          key={row}
          d={`M -276 ${row} h ${438 - 34 * level}`}
          stroke={sand}
          strokeWidth="4"
          opacity=".63"
        />
      ))}
      <circle
        cx="249"
        cy="44"
        r="36"
        fill={ink}
        stroke={brass}
        strokeWidth="3"
      />
      <path
        d={`M 249 44 l ${17 * phase - 8} -18`}
        stroke={paper}
        strokeWidth="2.3"
      />
    </g>
  );
}

export function Receivers() {
  const f = useCurrentFrame();
  const fill = ease(f, 0, since("manchester", "receivers"));
  const drive = accents(
    f,
    "receivers",
    ["receivers", "receiversOne", "receiversTwo", "receiversThree"],
    8,
  );
  const trace = Array.from({ length: 94 }, (_, i) => {
    const { mids, treble } = scoreAt(
      Math.max(0, f + cue("receivers") - (93 - i) * 3),
    );
    return `${i === 0 ? "M" : "L"} ${114 + i * 18.25} ${(566 + 41 * (mids - 0.6) + Math.sin(i * 0.32 + f * 0.1) * (6 + 31 * treble)).toFixed(1)}`;
  }).join(" ");
  return (
    <section className="scene" style={{ background: "#223b3c" }}>
      <Board>
        <path d="M 0 0 H 1920 V 304 L 0 541 Z" fill="#19292d" />
        <path d="M 0 915 L 1920 817 V 1080 H 0 Z" fill="#2f4845" />
        <Hatch color={sea} opacity={0.17} angle={90} scale={13} />
        {receiverPanel.map(({ x, y, offset, at }, i) => {
          const local = since(at, "receivers");
          const active = ease(f, local, local + 23);
          const read = scoreAt(Math.max(0, f + cue("receivers") - offset));
          return (
            <Receiver
              key={at}
              x={x + (i % 2 ? 66 : -65) * (1 - fill)}
              y={y + 7 * drive}
              active={active}
              level={read.mids}
              phase={Math.sin((f - offset) * 0.043) * 0.43 + 0.48}
            />
          );
        })}
        <path
          d={trace}
          stroke={brass}
          strokeWidth={2.5 + drive}
          fill="none"
          opacity={0.67 + 0.2 * fill}
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>The broadcast spreads</Caption>
    </section>
  );
}

const millWindows = Array.from({ length: 48 }, (_, i) => ({
  x: 577 + 108 * (i % 12),
  y: 613 + 61 * Math.floor(i / 12),
  i,
}));
const chimneys = [698, 852, 1043, 1263, 1454, 1638];

export function Manchester() {
  const f = useCurrentFrame();
  const { treble } = scoreAt(f + cue("manchester"));
  const sound = accents(
    f,
    "manchester",
    ["millWhistle", "millWindows", "millCrowd"],
    9,
  );
  const windows = since("millWindows", "manchester");
  const push = ramp(f, 0, since("protest", "manchester") + 7);
  const rise = ease(
    f,
    since("millCrowd", "manchester") - 9,
    since("protest", "manchester") + 8,
  );
  return (
    <section className="scene" style={{ background: "#405552" }}>
      <Board>
        <path d="M 0 0 H 1920 V 394 L 895 607 L 0 556 Z" fill="#8d8c66" />
        <path d="M 0 924 L 1920 704 V 1080 H 0 Z" fill="#283f40" />
        <Hatch color={paper} opacity={0.25} angle={150} scale={18} />
        <g transform={`translate(${-181 * push} ${59 * rise})`}>
          <path
            d="M 392 902 V 639 L 501 639 V 562 L 583 562 L 583 524 L 701 471 L 707 569 H 823 L 879 509 L 941 575 H 1103 L 1151 501 L 1227 583 H 1405 L 1496 525 L 1561 582 H 1814 V 902 Z"
            fill="#2a3a38"
          />
          {chimneys.map((x, i) => (
            <g key={x}>
              <path
                d={`M ${x} 581 l 14 ${-241 - (i % 3) * 41} h 49 l 10 ${241 + (i % 3) * 41} Z`}
                fill="#273733"
              />
              <path
                d={`M ${x + 14} ${322 - (i % 3) * 41} q ${40 + sound * 34} -64 ${118 + push * 85} -84 t ${325 + rise * 70} -87`}
                fill="none"
                stroke={sand}
                strokeWidth={4.2 - (i % 2)}
                opacity={0.19 + 0.31 * treble}
              />
            </g>
          ))}
          {millWindows.map(({ x, y, i }) => (
            <path
              key={i}
              d={`M ${x} ${y} h 26 v 24 h -26 Z`}
              fill={brass}
              opacity={
                (0.18 +
                  0.63 *
                    ease(f, windows - (i % 5) * 3, windows + 15 + (i % 9))) *
                (i % 7 === 0 ? 0.32 : 0.8)
              }
            />
          ))}
          <path
            d="M 363 855 H 1915 M 387 881 H 1918"
            stroke={paper}
            strokeWidth="2.2"
            opacity=".49"
          />
        </g>
        <path
          d={`M 111 ${765 + 67 * rise} C 604 680 1092 581 1788 495`}
          fill="none"
          stroke={brass}
          strokeWidth={2.8 + sound}
          strokeDasharray="32 7 12 4"
          strokeDashoffset={-f * 3.5}
          opacity=".64"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>The factory towns</Caption>
      <Type
        name="Manchester"
        style={{
          left: 114,
          top: 239,
          fontSize: 186,
          color: paper,
          translate: `${-26 * rise}px ${12 * sound}px`,
          textShadow: "4px 5px #4a5544",
        }}
      >
        MANCHESTER
      </Type>
    </section>
  );
}

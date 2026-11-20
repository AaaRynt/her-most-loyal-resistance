import { useCurrentFrame } from "remotion";
import {
  Board,
  Boot,
  Caption,
  Crown,
  DockTower,
  Eagle,
  FrameRule,
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
  sea,
  teal,
} from "../Art";
import { cue, ease, ramp, scoreAt, since, strike } from "../score";

const contourRows = Array.from({ length: 24 }, (_, i) => i);
const contourPoints = Array.from({ length: 45 }, (_, i) => i * 45 - 24);
const cliffs =
  "M 219 1116 C 608 909 696 819 795 738 L 959 689 L 1044 626 L 1150 601 L 1199 528 L 1329 515 L 1411 439 L 1531 423 L 1618 340 L 1764 316 L 1857 274 L 1950 298 V 1116 Z";
const flameBreak =
  "M 1086 429 L 1184 481 L 1224 555 L 1362 576 L 1445 693 L 1590 702 L 1804 906 L 1920 917";

export function Channel() {
  const f = useCurrentFrame();
  const { bass, treble } = scoreAt(f + cue("channel"));
  const riseAt = since("tideRise", "channel");
  const shoreAt = since("shoreStrike", "channel");
  const rise = ease(f, riseAt, riseAt + 42);
  const fold = ease(f, since("tideFold", "channel"), shoreAt + 14);
  const kick = strike(f, shoreAt, 12);
  const title = ease(f + 4, 0, 24);
  return (
    <section
      className="scene"
      style={{
        background: `linear-gradient(155deg,${ink},${teal} 66%,#253d39)`,
      }}
    >
      <Board>
        <defs>
          <clipPath id="channel-coast">
            <path d={cliffs} />
          </clipPath>
        </defs>
        <Hatch color={sea} opacity={0.13} angle={119} />
        <g
          transform={`translate(${-112 * rise + 78 * kick} ${-27 * rise}) rotate(${-2 * rise} 1440 650)`}
        >
          <path d={cliffs} fill="#557676" opacity=".52" />
          <path
            d={cliffs}
            fill="none"
            stroke={paper}
            strokeWidth="2"
            opacity=".62"
          />
          <g
            clipPath="url(#channel-coast)"
            stroke={paper}
            fill="none"
            opacity=".44"
            strokeWidth="1.2"
          >
            {contourRows.map((i) => (
              <path
                key={i}
                d={`M ${430 + 36 * i} 1100 Q ${1020 + 29 * i} ${977 - 16 * i} ${923 + 41 * i} 564 T ${1700 + i * 25} -102`}
              />
            ))}
          </g>
          <path
            d={flameBreak}
            stroke={brass}
            strokeWidth={2.7 + 5 * kick}
            strokeDasharray="10 8"
            fill="none"
            opacity={0.64 * fold}
          />
        </g>
        <g fill="none" stroke={sea}>
          {contourRows.map((i) => {
            const y = 628 + 19 * i;
            const phase = f * 0.057 + i * 0.17;
            const d = contourPoints
              .map(
                (x, index) =>
                  `${index === 0 ? "M" : "L"} ${x} ${(y + Math.sin(x / 178 + phase) * (9 + bass * 15 + fold * 5) * (1 + i * 0.03)).toFixed(1)}`,
              )
              .join(" ");
            return (
              <path
                key={i}
                d={d}
                strokeWidth={i % 4 === 0 ? 2.4 : 1}
                opacity={0.19 + treble * 0.28}
              />
            );
          })}
        </g>
        <g style={{ color: brass }} opacity={0.42 + 0.25 * fold}>
          <Seal
            x={1458 - 65 * fold}
            y={444 + 11 * kick}
            radius={226 + 29 * rise}
            rotation={-13 + f * 0.19}
          />
          <Register x={1458 - 65 * fold} y={444} size={17} />
          <path
            d="M 120 828 H 687 L 777 751 H 1810"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeDasharray={`${28 + 32 * fold} 12`}
            strokeDashoffset={-f * 2.3}
          />
        </g>
        <FrameRule color={paper} />
      </Board>
      <Caption>Dover Strait</Caption>
      <Type
        name="The Channel"
        style={{
          top: 265,
          left: 112 - 54 * kick,
          color: paper,
          fontSize: 217,
          clipPath: `polygon(0 0,${102 * title}% 0,${97 * title}% 100%,0 100%)`,
        }}
      >
        <span style={{ fontSize: 126, color: brass, lineHeight: 0.94 }}>
          THE
        </span>
        <br />
        CHANNEL
      </Type>
    </section>
  );
}

export function Invasion() {
  const f = useCurrentFrame();
  const { bass } = scoreAt(f + cue("theCrossing"));
  const first = since("treadOne", "theCrossing");
  const next = since("treadTwo", "theCrossing");
  const last = since("treadThree", "theCrossing");
  const lurch =
    strike(f, 0, 6) +
    strike(f, first, 5) +
    strike(f, next, 6) +
    strike(f, last, 5);
  const approach = ramp(f, 0, since("london", "theCrossing"));
  const expose = ease(f + 6, 0, 21);
  const angle = 36 - 16 * ease(f, next, next + 28);
  return (
    <section className="scene" style={{ background: "#b4a272", color: ink }}>
      <Board>
        <Hatch color={ink} opacity={0.2} scale={17} />
        <path d="M 0 0 H 1920 V 142 L 612 190 L 0 357 Z" fill="#dcca91" />
        <path
          d={`M 1920 208 L ${845 - 180 * approach} 1080 H 1920 Z`}
          fill="#9a603c"
          opacity={0.52 + 0.12 * lurch}
        />
        <path
          d="M 660 1080 L 1588 -30 H 1687 L 794 1080 Z"
          fill={ink}
          opacity=".15"
        />
        <Tread
          x={1260 - 230 * approach - 24 * lurch}
          y={565 + 20 * lurch}
          angle={angle}
          phase={f * 7.5 + 30 * lurch}
          scale={1.12 + 0.15 * approach}
        />
        <Tread
          x={1680 - 214 * approach - 24 * lurch}
          y={605 + 20 * lurch}
          angle={angle}
          phase={f * 7.5 + 30 * lurch + 12}
          scale={1.12 + 0.15 * approach}
        />
        <path
          d="M 100 764 L 1580 643 L 1801 688 V 823 L 101 882 Z"
          fill={ink}
        />
        <path
          d="M 100 763 L 1580 642 L 1801 686"
          stroke={brass}
          strokeWidth="4"
          fill="none"
          opacity=".64"
        />
        <g fill="none" stroke={paper} strokeWidth="2" opacity=".61">
          <path d="M 121 288 H 582 L 642 347 M 121 329 H 478" />
          <path d="M 1540 784 H 1760 M 1600 757 H 1760" />
        </g>
        <FrameRule color={ink} />
      </Board>
      <Caption color={ink}>The German invasion</Caption>
      <Type
        name="Operation Sealion"
        style={{
          left: 114 + 8 * lurch,
          top: 459 - 17 * lurch,
          fontSize: 260,
          color: ink,
          clipPath: `inset(0 ${100 - 100 * expose}% -20px 0)`,
          textShadow: `${8 * lurch}px ${11 * lurch}px 0 rgba(170,70,53,${0.55 * lurch})`,
        }}
      >
        SEALION
      </Type>
      <Caption x={126} y={797} color={paper}>
        The Channel breached
      </Caption>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 75,
          width: 1920,
          height: 8,
          background: brass,
          opacity: 0.28 * bass,
        }}
      />
    </section>
  );
}

const footfalls = [
  { at: "london", x: 1386, y: 735, scale: 1.63, angle: -14 },
  { at: "bootOne", x: 1713, y: 944, scale: 1.46, angle: -22 },
  { at: "bootTwo", x: 1240, y: 892, scale: 1.93, angle: -8 },
  { at: "firstImpression", x: 1578, y: 921, scale: 2.51, angle: -16 },
  { at: "bootThree", x: 1494, y: 910, scale: 2.43, angle: -11 },
] as const;

export function Occupation() {
  const f = useCurrentFrame();
  const stamp = since("firstImpression", "london");
  const kick =
    strike(f, stamp, 8) + 0.5 * strike(f, since("bootThree", "london"), 6);
  const establish = ease(f, 9, 39);
  const press = ease(f, stamp, stamp + 30);
  return (
    <section className="scene" style={{ background: "#dfd0a7", color: ink }}>
      <Board>
        <Hatch color={ink} opacity={0.15} scale={10} angle={122} />
        <path d="M 794 -20 L 1920 -20 V 1080 H 566 Z" fill="#a49c77" />
        <path
          d={`M ${890 - 81 * press} -10 L 1590 -10 L 1220 1080 H 899 Z`}
          fill="#c9bb89"
        />
        <DockTower
          x={1160 - 115 * press}
          y={933}
          scale={1.2 + 0.13 * establish}
          color="#566261"
        />
        <path d="M 0 932 H 1920" stroke={ink} strokeWidth="3" opacity=".6" />
        {footfalls.map(({ at, x, y, scale, angle }, i) => {
          const start = since(at, "london");
          const foot = ease(f, start - 9, start);
          const up = ease(f, start + 16, start + 34);
          const landed = strike(f, start, 5);
          const opacity = ramp(f, start - 8, start) * (1 - 0.85 * up);
          return (
            <g
              key={at}
              opacity={opacity}
              transform={`translate(${15 * landed} ${11 * landed})`}
            >
              <Boot
                x={x - 38 * up}
                y={y - (1 - foot) * 560 - up * 176}
                scale={scale * (1 - 0.07 * up)}
                angle={angle + 14 * (1 - foot) - 9 * up}
                color={i % 2 === 0 ? ink : "#614739"}
              />
              <path
                d={`M ${x - 205 - 240 * landed} ${y + 25} h ${340 + 410 * landed}`}
                stroke={rust}
                strokeWidth={7 * landed}
                opacity={landed}
              />
            </g>
          );
        })}
        <path
          d="M 0 0 H 96 V 1080 H 0 Z M 1824 0 H 1920 V 1080 H 1824 Z"
          fill={ink}
          opacity=".1"
        />
        <path
          d={`M 118 700 H ${849 - 141 * press} L ${950 - 81 * press} 764 H 119`}
          fill="none"
          stroke={rust}
          strokeWidth={3 + 3 * kick}
        />
        <FrameRule color={ink} />
      </Board>
      <Caption color={ink}>Under German occupation</Caption>
      <Type
        name="London"
        style={{
          left: 113 + 8 * kick,
          top: 392 - 13 * kick,
          fontSize: 236,
          color: ink,
          translate: `${-46 * (1 - establish)}px 0`,
          opacity: 0.45 + 0.55 * establish,
        }}
      >
        LONDON
      </Type>
    </section>
  );
}

const throneChamber =
  "M 722 840 V 438 C 722 224 955 84 1281 84 C 1581 84 1830 240 1830 438 V 840 Z";
const throneSilhouette =
  "M 1008 855 L 1034 718 L 1005 686 V 553 H 1101 L 1106 325 Q 1287 204 1469 325 L 1475 553 H 1571 V 685 L 1541 718 L 1568 855 H 1479 L 1443 770 H 1135 L 1097 855 Z";

export function Collaboration() {
  const f = useCurrentFrame();
  const spreadAt = since("eagleFold", "edward");
  const titleAt = since("eagleText", "edward");
  const clampAt = since("eagleClamp", "edward");
  const { bass } = scoreAt(f + cue("edward"));
  const spread = ease(f, spreadAt - 13, spreadAt + 24);
  const claim = ease(f, clampAt - 12, clampAt + 20);
  const recoil = strike(f, spreadAt, 7) + 0.52 * strike(f, clampAt, 8);
  const text = ease(f, titleAt - 17, titleAt + 21);
  const castX = 1021 + 341 * spread + 71 * claim;
  const castY = 351 + 119 * spread + 33 * claim + 11 * recoil;

  return (
    <section className="scene" style={{ background: "#c3aa78", color: ink }}>
      <Board>
        <defs>
          <clipPath id="edward-arch">
            <path d={throneChamber} />
          </clipPath>
          <clipPath id="edward-chair">
            <path d={throneSilhouette} />
          </clipPath>
          <filter
            id="edward-penumbra"
            x="-20%"
            width="140%"
            y="-20%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <g
            id="edward-cast"
            transform={`translate(${castX} ${castY}) rotate(${-18 + 5 * claim}) skewX(-21) scale(1 .91)`}
          >
            <Eagle
              x={0}
              y={0}
              scale={1.52 + 0.18 * spread + 0.04 * bass}
              fold={0.83 - 0.81 * spread + 0.17 * claim}
              color="#1c211f"
              engraved={false}
            />
          </g>
        </defs>
        <path d="M 0 0 H 1920 V 438 L 1194 544 L 0 316 Z" fill="#dbc796" />
        <path d="M 689 0 H 1920 V 1080 H 654 L 725 681 Z" fill="#9f855d" />
        <path d="M 730 840 H 1920 V 1080 H 569 Z" fill="#77644c" />
        <Hatch color={ink} angle={32} opacity={0.19} scale={15} />
        <path
          d={throneChamber}
          fill="#d7bd87"
          stroke="#8b704d"
          strokeWidth="8"
        />
        <g clipPath="url(#edward-arch)">
          <path
            d="M 722 180 L 1840 349 L 1840 831 L 722 475 Z"
            fill="#a4845a"
          />
          <path
            d="M 760 555 L 1805 647 M 791 385 L 1801 447"
            stroke="#b09161"
            strokeWidth="2.8"
            opacity=".51"
          />
          <path
            d="M 835 242 V 850 M 910 167 V 850 M 1649 166 V 844 M 1731 233 V 857"
            stroke="#f1d6a2"
            strokeWidth="5.2"
            opacity=".58"
          />
          <path
            d={`M 719 105 L 1104 67 L ${1840 - 97 * claim} 567 L 1843 773 Z`}
            fill="#f3dba7"
            opacity=".21"
          />
          <use
            href="#edward-cast"
            opacity={0.37 + 0.24 * spread}
            filter="url(#edward-penumbra)"
          />
        </g>
        <path
          d="M 882 841 H 1664 L 1741 887 H 836 Z"
          fill="#997e58"
          stroke="#4a4337"
          strokeWidth="3"
        />
        <path
          d="M 842 887 H 1737 L 1797 925 H 786 Z"
          fill="#625b46"
          stroke="#c7ab75"
          strokeWidth="2.4"
        />
        <path
          d={throneSilhouette}
          fill="#714f39"
          stroke="#dfbd80"
          strokeWidth="5.5"
        />
        <path
          d="M 1128 546 V 344 Q 1287 239 1447 344 V 546 Z M 1132 652 H 1444 L 1466 714 H 1111 Z"
          fill="#844937"
          stroke="#c19d65"
          strokeWidth="3.6"
        />
        <path
          d="M 1059 586 H 1132 V 628 H 1065 L 1053 669 H 1027 V 594 Z M 1443 586 H 1518 L 1549 594 V 669 H 1521 L 1509 628 H 1443 Z"
          fill="#a47a4b"
          stroke="#d8b879"
          strokeWidth="2.8"
        />
        <g style={{ color: "#f2d59a" }} opacity=".94">
          <Crown x={1287} y={413} scale={0.79} />
          <path
            d="M 1179 518 H 1395 M 1191 510 H 1383"
            stroke="currentColor"
            strokeWidth="2"
            opacity=".59"
          />
        </g>
        <g clipPath="url(#edward-chair)">
          <use
            href="#edward-cast"
            transform="translate(-18 38)"
            opacity={0.49 + 0.3 * spread + 0.07 * claim}
          />
        </g>
        <path
          d="M 1130 736 H 1445 M 1072 728 L 1049 825 M 1504 728 L 1527 825"
          fill="none"
          stroke="#c7a06c"
          strokeWidth="2.4"
          opacity=".62"
        />
        <path
          d={`M 115 717 H ${120 + 498 * text} L ${640 + 42 * text} ${763 + 8 * recoil}`}
          fill="none"
          stroke="#754f36"
          strokeWidth="4.2"
        />
        <FrameRule color={ink} />
      </Board>
      <Caption color={ink}>The crown under occupation</Caption>
      <Type
        name="Edward VIII"
        face="serif"
        style={{
          top: 337 + 16 * (1 - text),
          left: 114 - 27 * (1 - text),
          fontSize: 196,
          color: ink,
          lineHeight: 0.82,
          clipPath: `inset(0 ${100 - 100 * text}% -26px 0)`,
        }}
      >
        Edward
        <br />
        VIII
      </Type>
      <Caption x={121} y={765} color={ink}>
        Collaboration government
      </Caption>
    </section>
  );
}

const wireRows = [216, 402, 574, 755, 940];

export function Blockade() {
  const f = useCurrentFrame();
  const one = since("wireOne", "occupied");
  const two = since("wireTwo", "occupied");
  const closing = since("shutter", "occupied");
  const clamped = ease(f, two - 7, closing + 20);
  const jerk =
    strike(f, one, 8) + 0.7 * strike(f, two, 7) + 0.85 * strike(f, closing, 7);
  const show = ease(f + 4, 0, 28);
  return (
    <section className="scene" style={{ background: "#172a2c" }}>
      <Board>
        <Hatch color={sea} opacity={0.23} angle={135} scale={13} />
        <g
          transform={`translate(${-78 * clamped} 0) scale(${1 + 0.04 * jerk})`}
        >
          <DockTower x={1387} y={1001} scale={1.46} color="#4e6966" />
          <path
            d="M 793 918 H 1811 M 809 887 H 1801"
            stroke={sea}
            strokeWidth="2"
            opacity=".44"
          />
        </g>
        <path
          d={`M 0 ${716 - 95 * clamped} L 1920 ${210 + 95 * clamped} V 393 L 0 909 Z`}
          fill="#0d1c20"
          opacity=".70"
        />
        {wireRows.map((y, i) => (
          <g key={y} opacity={i === 2 ? 0.9 : 0.42 + i * 0.07}>
            <Wire
              y={y - (i - 2) * 47 * clamped + (i % 2 ? 1 : -1) * 21 * jerk}
              angle={-14 + 5 * i - 11 * clamped}
              phase={f * (i + 2) * 2.1 + 34 * jerk}
              tension={clamped}
              color={i === 2 ? brass : "#9a9c79"}
              thickness={i === 2 ? 5 : 3.4}
            />
          </g>
        ))}
        <FrameRule color={paper} />
      </Board>
      <Caption>Occupied London</Caption>
      <Type
        name="Besetzt"
        style={{
          left: 121 - 29 * clamped,
          top: 585 + 8 * jerk,
          fontSize: 220,
          color: "#e5b176",
          rotate: "-7deg",
          opacity: show,
          clipPath: `inset(${100 - 100 * show}% 0 -12px 0)`,
        }}
      >
        BESETZT
      </Type>
    </section>
  );
}

import { useId } from "react";
import {
  c,
  Field,
  InkGrain,
  Lattice,
  noise,
  PunchTape,
  range,
  Text,
  Trace,
  Wheel,
} from "../art";
import { ease, ramp, useMotion } from "../score";

const spokes = [
  [28, 32],
  [302, -82],
  [598, 15],
  [978, -44],
  [1272, 53],
  [1710, -30],
  [1940, 137],
  [1806, 388],
  [2049, 622],
  [1835, 889],
  [1950, 1122],
  [1592, 1196],
  [1250, 1018],
  [866, 1210],
  [486, 1043],
  [112, 1164],
  [-82, 856],
  [68, 615],
  [-65, 388],
  [54, 185],
] as const;
const shardColors = [c.rust, c.blue, c.coal, c.teal, c.bone, c.red, c.sand];

export function FailedCoup() {
  const m = useMotion("branch");
  const clip = useId();
  const tear = ease(m.f, 0, 37) + m.step(1, 46) * 0.25;
  const split = m.step(2, 30) * 94;
  return (
    <Field fill="#2b262d">
      <defs>
        <clipPath id={clip}>
          <path d="M 304 169 L 1563 122 L 1606 824 L 375 913 L 318 496 Z" />
        </clipPath>
      </defs>
      <path
        d="M -130 724 L 921 102 L 1953 0 V 122 L 753 294 L -80 813 Z"
        fill={c.red}
        opacity=".56"
      />
      <Lattice color={c.amber} spacing={48} line opacity={0.23} angle={18} />
      <g opacity=".47">
        <Trace
          x={-42}
          y={251}
          width={2022}
          amplitude={106 + m.audio.bass * 76}
          f={m.f * 1.94}
          color={c.amber}
          thickness={5}
        />
        <Trace
          x={-42}
          y={896}
          width={2022}
          amplitude={121 + m.audio.middle * 88}
          f={-m.f * 2.09}
          color={c.mint}
          thickness={4}
        />
      </g>
      {spokes.map(([x, y], i) => {
        const [nx, ny] = spokes[(i + 1) % spokes.length];
        const speed = 0.08 + noise(i + 81) * 0.28;
        const punch = m.hit(i % 4, 11) * 30;
        const dx = (x - 928) * tear * speed;
        const dy = (y - 525) * tear * speed;
        const pointX = 805 + noise(i * 3) * 279;
        const pointY = 427 + noise(i * 7 + 3) * 269;
        return (
          <g
            key={i}
            transform={`translate(${dx + punch * (i % 2 === 0 ? 1 : -1)} ${dy}) rotate(${(noise(i * 8) - 0.5) * 33 * tear} ${x} ${y})`}
          >
            <path
              d={`M ${x} ${y} L ${nx} ${ny} L ${pointX} ${pointY} Z`}
              fill={shardColors[i % shardColors.length]}
              stroke={c.coal}
              strokeWidth={2 + tear * 7}
              opacity={0.44 + noise(i + 10) * 0.29}
            />
            <path
              d={`M ${x + (pointX - x) * 0.03} ${y + (pointY - y) * 0.03} L ${pointX} ${pointY}`}
              stroke={c.bone}
              opacity=".65"
              strokeWidth="2"
              strokeDasharray="12 6 3 6"
            />
          </g>
        );
      })}
      <g
        transform={`translate(${m.phase * 33 - m.hit(0) * 27} ${m.hit(0) * 36}) rotate(${2.2 - m.phase * 3.4} 960 520)`}
      >
        <path
          d="M 298 183 L 1580 146 L 1631 852 L 371 948 L 292 486 Z"
          fill="#1c1f28"
        />
        <path
          d="M 304 169 L 1563 122 L 1606 824 L 375 913 L 318 496 Z"
          fill={c.cream}
        />
        <g clipPath={`url(#${clip})`}>
          <path
            d="M 275 389 L 1702 366 V 451 L 280 481 Z M 275 764 L 1702 732 V 765 L 280 793 Z"
            fill={c.rust}
          />
          <path
            d="M 427 242 H 1509 M 427 814 H 1526"
            stroke={c.rust}
            strokeWidth="4"
            strokeDasharray="21 7 5 7"
          />
          <Text x={426} y={315} size={34} color={c.rust} face="mono">
            21 АВГУСТА 1991
          </Text>
          <Text x={423} y={473} size={136} color={c.coal}>
            ПУТЧ
          </Text>
          <Text x={418} y={686} size={173} fit={1055} color={c.coal}>
            ПРОВАЛИЛСЯ
          </Text>
          {range(7).map((i) => (
            <rect
              key={i}
              x={1126 + i * 51}
              y={276}
              width="27"
              height="55"
              fill={c.rust}
              opacity={0.24 + m.hit(i % 4) * 0.57}
            />
          ))}
        </g>
        <path
          d={`M 1144 137 l -44 ${35 + split * 0.26} 66 39 -98 57 29 42 -156 79`}
          fill="none"
          stroke={c.rust}
          strokeWidth={4 + split * 0.026}
        />
        <path
          d="M 120 850 L 341 707 L 435 776 L 236 951 Z"
          fill={c.rust}
          transform={`translate(${-split * 0.79} ${split * 0.38})`}
        />
        <path
          d="M 1532 693 L 1720 664 L 1868 800 L 1545 865 Z"
          fill={c.blue}
          transform={`translate(${split * 0.93} ${-split * 0.49})`}
        />
      </g>
      {range(29).map((i) => {
        const angle = noise(i * 11) * Math.PI * 2;
        const r = 405 + noise(i * 6) * 540 + tear * 90;
        const burst = m.hit(i % 4, 10);
        const x = 960 + Math.cos(angle) * (r + burst * 107);
        const y = 532 + Math.sin(angle) * r * 0.62;
        return (
          <path
            key={i}
            d="M -38 -3 L 32 -10 L 20 3 L -21 9 Z"
            fill={i % 2 ? c.amber : c.cream}
            opacity={0.15 + burst * 0.48}
            transform={`translate(${x} ${y}) rotate(${i * 62 + m.f * (i % 2 ? -0.35 : 0.38)})`}
          />
        );
      })}
      <InkGrain opacity={0.23} />
    </Field>
  );
}

export function Dissolution() {
  const m = useMotion("result");
  const left = useId();
  const right = useId();
  const spread = ease(m.f, 0, 46) * 0.69 + m.step(2, 21) * 0.31;
  const rip = m.step(3, 21);
  const tear =
    "M 1077 0 L 1037 292 L 1055 399 L 1002 445 L 1054 561 L 1009 619 L 1030 760 L 982 1080";
  const sheet = (
    <>
      <path
        d="M 302 368 L 1614 337 L 1640 741 L 314 775 L 264 578 Z"
        fill={c.coal}
        opacity=".90"
      />
      <path
        d="M 277 353 L 1611 323 L 1622 703 L 294 744 L 246 562 Z"
        fill={c.cream}
      />
      <path
        d="M 282 395 L 1568 363 M 305 686 L 1591 658"
        stroke={c.rust}
        strokeWidth="6"
      />
      <Text x={356} y={465} size={31} face="mono" color={c.rust}>
        26 ДЕКАБРЯ 1991
      </Text>
      <Text x={341} y={629} size={173} fit={1199} color={c.coal}>
        РАСПАД СССР
      </Text>
      <path
        d="M 292 716 L 603 679 L 677 722 L 451 755 Z M 1518 336 L 1611 323 L 1654 406 L 1555 385 Z"
        fill={c.rust}
      />
    </>
  );
  return (
    <Field fill="#20272e">
      <defs>
        <clipPath id={left}>
          <path d={`${tear} H 0 V 0 Z`} />
        </clipPath>
        <clipPath id={right}>
          <path d={`${tear} H 1920 V 0 Z`} />
        </clipPath>
      </defs>
      <Lattice color={c.mint} spacing={63} opacity={0.27} angle={-9} />
      <path
        d="M 0 57 H 1920 M 0 1016 H 1920 M 83 0 V 1080 M 1838 0 V 1080"
        stroke={c.sand}
        strokeWidth="4"
        opacity=".5"
      />
      {range(15).map((i) => {
        const theta = ((i * 24 - 90) * Math.PI) / 180;
        const radius =
          370 + spread * (209 + noise(i + 6) * 180) + m.hit(i % 4) * 33;
        const x = 960 + Math.cos(theta) * radius * 1.35;
        const y = 537 + Math.sin(theta) * (radius * 0.7);
        const sideX = 960 + Math.cos(theta) * 211;
        const sideY = 536 + Math.sin(theta) * 147;
        const ink = [c.sand, c.blue, c.rust, c.teal, c.cream][i % 5];
        const h = 55 + (i % 3) * 24;
        return (
          <g key={i}>
            <path
              d={`M ${sideX} ${sideY} L ${(x + sideX) / 2} ${y} H ${x}`}
              fill="none"
              stroke={ink}
              strokeWidth="4"
              strokeDasharray="18 6"
              strokeDashoffset={i * 11 - m.f * 3}
              opacity={0.82 - spread * 0.52}
            />
            <g
              transform={`translate(${x} ${y}) rotate(${noise(i * 5 + 12) * 20 - 10 + (noise(i + 2) - 0.5) * spread * 70})`}
            >
              <path
                d={`M -108 ${-h} L 88 ${-h - 4} L 116 ${15 + (i % 3) * 9} L -92 ${46 + (i % 2) * 13} Z`}
                fill={ink}
                stroke={c.sand}
                strokeWidth="2"
              />
              <path
                d="M -74 -36 H 66 M -74 -24 H 39 M -76 13 H 73"
                fill="none"
                stroke={c.coal}
                strokeWidth="2.6"
                opacity=".74"
              />
              <Text x={-75} y={4} size={24} face="mono" color={c.coal}>
                {String(i + 1).padStart(2, "0")}
              </Text>
              <rect
                x="66"
                y="-24"
                width="12"
                height="19"
                fill={c.coal}
                opacity={0.51 + m.hit(i % 4) * 0.24}
              />
            </g>
          </g>
        );
      })}
      <g
        transform={`translate(${-39 + m.hit(0) * 45 + m.phase * 15} ${m.hit(1) * 14}) rotate(-4 960 533)`}
      >
        {rip === 0 ? (
          sheet
        ) : (
          <>
            <g
              transform={`translate(${-96 * rip} ${91 * rip}) rotate(${-8 * rip} 1034 520)`}
              clipPath={`url(#${left})`}
            >
              {sheet}
            </g>
            <g
              transform={`translate(${159 * rip} ${-118 * rip}) rotate(${13 * rip} 1034 520)`}
              clipPath={`url(#${right})`}
            >
              {sheet}
            </g>
          </>
        )}
      </g>
      <InkGrain opacity={0.31} />
    </Field>
  );
}

const fragmentNames = [
  "СВЯЗЬ",
  "РАСПРЕДЕЛЕНИЕ",
  "АРХИВ",
  "ЭФИР",
  "ЗАВОД",
  "ГОСБАНК",
  "ПРОТОКОЛ",
  "КАНАЛ ЗАКРЫТ",
  "НЕ ПРИНЯТО",
  "НЕТ ДАННЫХ",
  "ОЧЕРЕДЬ",
  "ВЕЩАНИЕ",
];
const cardPositions = [
  [81, 73, 510, -9],
  [529, 99, 435, 8],
  [985, 53, 452, -11],
  [1410, 118, 511, 10],
  [-45, 416, 436, 10],
  [364, 393, 521, -9],
  [858, 426, 570, 7],
  [1390, 443, 500, -8],
  [0, 736, 511, -10],
  [488, 742, 491, 9],
  [945, 737, 459, -8],
  [1452, 757, 503, 9],
] as const;

export function Aftermath() {
  const m = useMotion("imprint");
  const shear = 44 + 123 * m.phase;
  return (
    <Field fill="#21242c">
      <Lattice color={c.red} spacing={44} line angle={17} opacity={0.34} />
      <g
        transform={`translate(${-71 + m.hit(0) * 97 - m.phase * 110} 0) rotate(-14 960 540)`}
      >
        <rect x="-300" y="354" width="2450" height="372" fill={c.rust} />
        <Text x={306} y={682} size={423} fit={1356} color={c.coal}>
          СССР
        </Text>
        <path
          d="M -160 524 H 2220"
          stroke={c.red}
          strokeWidth="15"
          strokeDasharray="155 31 3 8 28 79"
          strokeDashoffset={m.f * 6}
        />
      </g>
      {cardPositions.map(([x, y, w, a], i) => {
        const sign = i % 2 ? -1 : 1;
        const punch = m.hit((i + 1) % 4, 8);
        const age = (ease(m.f, i * 3, 28 + i * 3) * ((i % 3) + 1)) / 3;
        const dx =
          sign * shear * age +
          sign * (punch * 67 + Math.sin(m.f * 0.126 + i * 49) * 34);
        const dy =
          ((i % 3) - 1) * m.phase * 98 +
          Math.cos(m.f * 0.13 + i * 31) * 44 -
          punch * 51;
        const ink = [c.bone, c.teal, c.red, c.night, c.amber, c.blue][i % 6];
        const type =
          i % 6 === 1 || i % 6 === 3 || i % 6 === 5 ? c.cream : c.coal;
        return (
          <g
            key={i}
            transform={`translate(${x + dx} ${y + dy}) rotate(${a + sign * age * shear * 0.09 + punch * sign * 19})`}
          >
            <path
              d={`M 0 0 H ${w - 57} l 43 15 -9 32 23 41 -38 19 20 70 -35 59 L 8 233 -15 146 Z`}
              fill={ink}
              stroke={c.coal}
              strokeWidth={5 + punch * 4}
            />
            <path
              d={`M 22 24 H ${w - 70} M 22 114 H ${w - 108} M 22 203 H ${w - 95}`}
              stroke={type}
              strokeWidth="2"
              fill="none"
              opacity=".61"
            />
            <Text x={26} y={87} size={44} color={type}>
              {fragmentNames[i]}
            </Text>
            {i % 3 === 0 ? (
              <Trace
                x={25}
                y={160}
                width={w - 96}
                amplitude={24 + 42 * m.audio.middle}
                f={m.f * (i % 2 ? -2 : 1.84)}
                color={type}
                seed={i}
              />
            ) : (
              range(12).map((j) => (
                <path
                  key={j}
                  d={`M ${23 + (j * (w - 98)) / 12} 186 v ${-11 - noise(j * 17 + i * 31) * 44 - punch * 16}`}
                  stroke={type}
                  strokeWidth={j % 3 === 0 ? 8 : 4}
                  opacity={0.39 + noise(i + j) * 0.4}
                />
              ))
            )}
            <path
              d={`M ${w - 71} 13 l -47 53 29 31 -52 59 12 40 -33 55`}
              fill="none"
              stroke={c.coal}
              strokeWidth="4.5"
            />
          </g>
        );
      })}
      <g
        transform={`translate(${-160 + m.phase * 460} ${831 - m.phase * 241 - m.hit(3) * 149}) rotate(-22)`}
      >
        <PunchTape
          x={0}
          y={0}
          width={2260}
          height={74}
          phase={m.f * 6}
          angle={0}
          color={c.coal}
          ink={c.amber}
        />
      </g>
      {range(23).map((i) => {
        const x =
          ((noise(i * 31) * 1930 + m.f * (1 + noise(i * 29) * 5)) % 2130) - 100;
        const y =
          noise(i * 11 + 4) * 1020 +
          Math.sin(m.f * 0.05 + i) * 40 +
          100 * m.hit(i % 4);
        return (
          <path
            key={i}
            d="M -67 6 L 39 -8 L 84 -2 L -6 8 Z"
            fill={i % 4 === 0 ? c.cream : c.coal}
            opacity={0.27 + m.hit(i % 4) * 0.56}
            transform={`translate(${x} ${y}) rotate(${i * 40 + m.f * 0.6})`}
          />
        );
      })}
      <InkGrain opacity={0.31} />
    </Field>
  );
}

export function Goodbye() {
  const m = useMotion("title");
  const stagger = ease(m.f, 8, 55);
  const knock = m.hit(2, 11) * 31 + m.hit(3, 9) * 7;
  const offset = 118 - 122 * ease(m.f, 0, 36) + knock;
  return (
    <Field fill="#1c2027">
      <Lattice opacity={0.24} spacing={57} color={c.red} />
      {spokes.map(([x, y], i) => {
        const [nx, ny] = spokes[(i + 1) % spokes.length];
        const ex = (x - 960) * (m.phase * 0.22) + m.hit(i % 4, 10) * 32;
        const ey = (y - 540) * (m.phase * 0.18) - m.hit(i % 4, 10) * 33;
        return (
          <path
            key={i}
            d={`M ${x + ex} ${y + ey} L ${nx + ex} ${ny + ey} L ${650 + noise(i * 5) * 634} ${459 + noise(i + 4) * 169} Z`}
            fill={shardColors[(i + 3) % shardColors.length]}
            opacity={0.19 + noise(i + 2) * 0.2 + m.hit(i % 4) * 0.12}
            stroke={c.coal}
            strokeWidth="9"
          />
        );
      })}
      <path
        d={`M -62 ${912 - stagger * 123} L 1923 ${284 - stagger * 123} L 1954 ${566 - stagger * 122} L -42 ${1065 - stagger * 156} Z`}
        fill={c.rust}
        stroke={c.red}
        strokeWidth="3"
      />
      <path
        d="M -15 231 L 563 148 L 527 253 L 0 399 Z M 1920 692 L 1392 798 L 1434 851 L 1920 830 Z"
        fill={c.coal}
        opacity=".77"
      />
      <g transform={`translate(${offset} ${-knock * 0.17}) rotate(-5 930 550)`}>
        <path
          d="M 289 206 L 1660 222 M 223 833 L 1599 849"
          fill="none"
          stroke={c.sand}
          strokeWidth="5"
          strokeDasharray="38 10 4 10"
          opacity=".81"
        />
        <Text
          x={282 + knock}
          y={483}
          size={281}
          fit={1155}
          color={c.coal}
          opacity={0.74}
        >
          ПРОЩАЙ
        </Text>
        <Text x={273} y={467} size={281} fit={1155} color={c.pale}>
          ПРОЩАЙ
        </Text>
        <g
          transform={`translate(${(1 - stagger) * 557 - knock} ${(1 - stagger) * -34})`}
          opacity={0.19 + stagger * 0.81}
        >
          <Text x={403} y={748} size={219} fit={1225} color={c.coal}>
            НАВСЕГДА
          </Text>
          <Text x={396} y={733} size={219} fit={1225} color={c.cream}>
            НАВСЕГДА
          </Text>
        </g>
        <path
          d="M 272 790 H 1612"
          stroke={c.sand}
          opacity=".73"
          strokeWidth="3"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - stagger}
        />
      </g>
      <InkGrain opacity={0.32} />
    </Field>
  );
}

export function Afterglow() {
  const m = useMotion("afterglow");
  const glow = useId();
  const collapse = ease(m.f, 0, m.length * 0.68);
  const dark = ramp(m.f, m.length * 0.65, m.length * 0.96);
  const level = ramp(m.audio.db, -84, -40);
  const persistence = Math.pow(1 - dark, 0.84) * (0.37 + level * 0.63);
  return (
    <Field fill="#15191e">
      <defs>
        <radialGradient id={glow}>
          <stop stopColor={c.teal} stopOpacity=".8" />
          <stop offset=".54" stopColor={c.blue} stopOpacity=".36" />
          <stop offset="1" stopColor={c.night} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={960 + collapse * 80}
        cy={550 + collapse * 35}
        rx={910 - collapse * 460}
        ry={540 - collapse * 286}
        fill={`url(#${glow})`}
        opacity={persistence}
      />
      <g opacity={persistence}>
        <path
          d="M 681 678 L 967 529 L 1254 610 L 1013 825 Z M 956 489 L 1228 282 L 1342 342 L 1249 390 L 1273 451 L 1130 527 Z"
          fill={c.blue}
          opacity={0.53}
        />
        <path
          d="M 682 678 L 967 529 L 1254 610 M 1254 610 L 1013 825 L 682 678 M 956 489 L 1228 282 L 1342 342"
          fill="none"
          stroke={c.sand}
          strokeWidth="3"
          opacity=".69"
        />
        <Wheel
          x={1015}
          y={573}
          r={121}
          turn={collapse * 63}
          color={c.teal}
          hub={c.night}
        />
        <Trace
          x={301 + collapse * 342}
          y={552}
          width={1303 - collapse * 654}
          amplitude={8 + level * 88}
          f={m.f}
          color={c.amber}
          thickness={4}
        />
        <path
          d={`M ${301 + collapse * 342} 553 H ${1604 - collapse * 312}`}
          stroke={c.bone}
          strokeDasharray="3 17"
          opacity=".51"
        />
        {range(19).map((i) => {
          const x =
            noise(i * 27) * 1870 + Math.sin(m.f * 0.006 + i) * 85 * collapse;
          const y = noise(i * 17 + 50) * 1050 + collapse * noise(i + 4) * 177;
          return (
            <path
              key={i}
              d="M -26 0 L 8 -7 L 16 6 L -5 13 Z"
              fill={i % 3 ? c.mint : c.red}
              opacity={0.15 + noise(i + 70) * 0.46}
              transform={`translate(${x} ${y}) rotate(${i * 40 + collapse * 70})`}
            />
          );
        })}
        <InkGrain opacity={0.19} />
      </g>
      <rect width="1920" height="1080" fill="#101418" opacity={dark * 0.74} />
    </Field>
  );
}

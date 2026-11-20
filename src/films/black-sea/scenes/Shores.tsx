import { useId } from "react";
import {
  Bloom,
  Caption,
  Etch,
  Hills,
  ink,
  Letter,
  Motes,
  Plate,
  Quayside,
  RainGlass,
  Ropes,
  Shade,
  SkyWater,
  Surface,
  Vessel,
  Wash,
} from "../art";
import {
  Bed,
  Drapery,
  Enamel,
  Hand,
  Person,
  SaltRing,
  TeaGlass,
} from "../objects";
import { between, count, random, useShot, wave, type Motion } from "../score";

function DustBank({
  x,
  y,
  f,
  growth,
  warm = false,
}: {
  x: number;
  y: number;
  f: number;
  growth: number;
  warm?: boolean;
}) {
  const dust = useId();
  const ridge =
    "M -703 8 Q -650 5 -592 -13 Q -550 -34 -514 -22 C -462 -26 -452 -68 -403 -61 Q -376 -85 -338 -68 C -314 -81 -300 -120 -264 -114 Q -245 -149 -207 -133 C -172 -130 -192 -163 -135 -159 Q -100 -191 -66 -164 C -44 -161 -20 -207 20 -197 Q 54 -218 100 -183 C 139 -193 161 -155 197 -159 Q 238 -188 276 -152 Q 305 -165 335 -130 C 369 -136 369 -102 408 -105 Q 467 -115 494 -76 Q 533 -84 577 -55 Q 642 -58 703 -20 L 798 21 L -720 40 Z";
  return (
    <g
      transform={`translate(${x + growth * (warm ? -69 : 47)} ${y}) scale(${0.42 + growth * 0.81} ${0.02 + growth * (warm ? 1.01 : 1.19)})`}
      opacity={growth * 0.96}
    >
      <defs>
        <linearGradient
          id={dust}
          x1="0"
          y1="0"
          x2="0.18"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor={warm ? "#a28489" : "#8e829b"} />
          <stop offset=".42" stopColor={warm ? "#a08b96" : "#79758b"} />
          <stop offset=".9" stopColor={warm ? "#626b82" : "#4e637d"} />
          <stop
            offset="1"
            stopColor={warm ? "#717d8c" : "#677a8c"}
            stopOpacity=".62"
          />
        </linearGradient>
      </defs>
      <path
        d={ridge}
        transform={`translate(${28 + wave(f, 0.012) * 12} -8) scale(1.09 .98)`}
        fill={warm ? "#c29d98" : "#a99aa8"}
        opacity=".70"
      />
      <path d={ridge} fill={`url(#${dust})`} />
      <path
        d="M -579 -13 Q -505 -37 -450 -20 T -321 -52 Q -275 -61 -247 -49 M -299 -88 Q -229 -121 -184 -96 T -73 -111 M -15 -153 Q 36 -174 78 -149 Q 105 -132 142 -142 M 183 -79 Q 250 -104 299 -82 T 400 -69 M 418 -41 Q 474 -59 535 -35"
        transform={`translate(${-14 + wave(f, 0.019) * 13} ${wave(f, 0.022) * 4})`}
        fill="none"
        stroke={warm ? "#c6aaad" : "#ada3b4"}
        strokeWidth="3.5"
        opacity=".58"
      />
      <path
        d="M -640 11 Q -514 -17 -455 -9 Q -392 -24 -347 -16 Q -272 -39 -208 -26 Q -139 -54 -79 -34 Q -16 -61 69 -44 Q 141 -65 226 -40 Q 315 -51 398 -26 Q 519 -36 641 4 L 685 22 H -647 Z"
        fill={warm ? "#676a7c" : "#475d74"}
        opacity=".48"
      />
    </g>
  );
}

function ReflectedLight({
  m,
  turkey,
  h,
}: {
  m: Motion;
  turkey: boolean;
  h: number;
}) {
  const rise = between(m.f, -2, 7);
  const glow = rise * Math.exp(-Math.max(0, m.f - 7) / 30);
  const center = turkey ? 1253 : 1440;
  const ash = between(m.f, 7, 98);
  const spread = between(m.f, -2, 32);
  return (
    <g>
      <rect
        width="1920"
        height={h + 2}
        fill={turkey ? "#735f78" : "#4c5373"}
        opacity={ash * 0.24}
      />
      <DustBank x={center} y={h + 4} f={m.f} growth={ash} warm={turkey} />
      <g opacity={glow}>
        <path
          d={`M -50 ${h - 11} L ${center - 128} ${h - 30} L ${center + 192} ${h - 61} L 1980 ${h - 25} L 1980 ${h + 26} L ${center + 280} ${h + 9} L -50 ${h + 13} Z`}
          fill="#fff1ca"
          opacity=".78"
        />
        <path
          d={`M ${center - 18} ${h} L ${center + 630} ${h - 353} L ${center + 958} ${h - 328} Z M ${center + 23} ${h - 3} L ${center - 800} ${h - 139} L ${center - 910} ${h - 257} Z`}
          fill="#fff1d2"
          opacity=".33"
        />
        <Bloom
          x={center}
          y={h - 23}
          rx={644}
          ry={235}
          color="#fffceb"
          opacity={1}
        />
      </g>
      <Bloom
        x={center}
        y={h - 5}
        rx={465 + 592 * spread}
        ry={173 + 115 * spread}
        color="#fff2c9"
        opacity={0.94 * glow}
      />
      <path
        d={`M ${center - 790 * spread} ${h + 1} Q ${center - 158} ${h - 9 - 16 * glow} ${center + 642 * spread} ${h} Q ${center + 38} ${h + 13} ${center - 790 * spread} ${h + 4} Z`}
        fill="#fff2cb"
        opacity={glow}
      />
      <g opacity={glow * 0.89}>
        {count(24).map((i) => {
          const py = h + 8 + Math.pow(i / 25, 1.39) * 257;
          const w = (407 - i * 11) * (0.55 + random(i + 32) * 0.48);
          const x = center - w * 0.48 + 27 * wave(m.f, 0.033, i);
          return (
            <path
              key={i}
              d={`M ${x} ${py} q ${w * 0.44} ${-2 - i * 0.11} ${w} -1 q ${-w * 0.36} ${4 + i * 0.16} ${-w * 0.79} 3 Z`}
              fill={i % 3 === 0 ? ink.white : ink.peach}
            />
          );
        })}
      </g>
      <rect width="1920" height={h + 16} fill="#ebcbad" opacity={glow * 0.24} />
    </g>
  );
}

function ShoreDate({ m, turkey }: { m: Motion; turkey: boolean }) {
  const title = turkey ? "The Dardanelles" : "Sevastopol";
  return (
    <g
      transform={`translate(0 ${(1 - between(m.f, 0, 28)) * 10})`}
      opacity={between(m.f, 0, 21)}
    >
      <Letter
        x={112}
        y={108}
        size={31}
        fill={ink.night}
        space={2.4}
        weight={600}
      >
        {turkey ? "18 SEPTEMBER 2041  ·  TURKEY" : "17 SEPTEMBER 2041"}
      </Letter>
      <Letter x={105} y={212} size={99} serif fill={ink.night}>
        {title}
      </Letter>
      <Letter x={113} y={263} size={33} fill={ink.deep}>
        {turkey
          ? "Sea of Marmara · French expeditionary support district"
          : "Soviet naval support district"}
      </Letter>
    </g>
  );
}

export function FirstLight() {
  const m = useShot("firstLight");
  const change = between(m.f, 1, 45);
  const swing = 23 * Math.exp(-m.f / 37) * Math.sin(m.f * 0.174);
  return (
    <Plate>
      <Wash colors={["#7f8daa", "#c5c4cc", "#e2c7ad"]} h={552} />
      <Hills y={543} side={2} f={m.f} />
      <Surface f={m.f + 450} horizon={540} wind={1.23} />
      <Quayside x={-140 - 33 * m.p} y={545} s={0.88} f={m.f} />
      <ReflectedLight m={m} turkey={false} h={537} />
      <g transform={`translate(${-32 * m.p} 0)`}>
        <path
          d="M -100 835 C 645 697 1336 699 2020 644 V 1100 H -100 Z"
          fill="#526780"
        />
        <Etch
          d="M -100 886 Q 872 706 2020 691 V 1105 H -100 Z"
          line={ink.glass}
          spacing={11}
          angle={66}
          opacity={0.31}
        />
        <path
          d="M -100 895 L 2020 699 M -165 1039 L 2035 745"
          stroke={ink.deep}
          strokeWidth="8"
        />
        <path
          d={`M -100 952 L 1130 733 L 1214 755 L ${237 - 253 * change} 1000 Z`}
          fill={ink.indigo}
          opacity=".75"
        />
        <path
          d="M -42 1054 L 1501 717 L 1585 697 L 283 1080 H -42 Z"
          fill="#f3daa6"
          opacity={0.68 * Math.exp(-Math.abs(m.f - 9) / 16)}
        />
        <g transform={`translate(24 ${-change * 3})`}>
          <Person
            x={1587}
            y={659}
            s={1.14}
            f={m.f}
            pose="watch"
            armLift={between(m.f, 0, 18)}
            hat
            coat={ink.deep}
          />
          <Person
            x={1781}
            y={646}
            s={0.83}
            f={m.f + 17}
            face={-1}
            coat={ink.navy}
            hat
          />
        </g>
        <Ropes
          x={1330}
          y={705}
          width={785}
          bend={166}
          f={m.f * 1.3}
          size={16}
        />
        <ellipse
          cx={1159 - 39 * change}
          cy="917"
          rx={244 + 77 * change}
          ry="40"
          fill={ink.night}
          opacity=".52"
        />
        <Enamel
          x={1164 + change * 17}
          y={651}
          s={1.36}
          f={m.f}
          surge={swing}
          tilt={-4 + swing * 0.22}
        />
        {count(12).map((i) => {
          const t = between(m.f, 8 + i * 0.7, 53 + i);
          const height = Math.sin(t * Math.PI) * (62 + i * 6);
          return (
            <ellipse
              key={i}
              cx={1050 - i * 6 - t * (60 + 7 * i)}
              cy={657 - height + t * t * 127}
              rx={2 + (i % 3)}
              ry={5 + (i % 4)}
              fill={ink.milk}
              opacity={between(m.f, 8, 15) * (1 - t) * 0.78}
            />
          );
        })}
      </g>
      <Shade y={705} height={375} alpha={0.94} />
      <ShoreDate m={m} turkey={false} />
      <Caption
        x={113}
        y={989}
        size={48}
        f={m.f - 21}
        lines={["France struck the port with one nuclear weapon."]}
      />
      <Motes f={m.f} seed={7} drift={1.6} n={52} alpha={0.25 + change * 0.23} />
    </Plate>
  );
}

const brokenFrame =
  "M -120 -75 H 290 L 275 38 L 178 132 L 137 125 L 92 226 L 71 184 L 35 388 L -60 477 Z";
function BrokenWorkshop({ f }: { f: number }) {
  return (
    <g transform="translate(1498 682)">
      <path
        d="M -205 30 L -193 -130 L -129 -156 L -105 -102 L -53 -136 L -19 -68 L 39 -78 L 76 -46 L 112 -70 L 145 -48 L 163 -167 L 222 -180 L 245 -213 L 315 -205 L 345 -282 L 485 -324 L 523 50 Z"
        fill="#66738a"
      />
      <Etch
        d="M 175 23 L 197 -154 L 223 -171 L 257 -152 L 305 -191 L 351 -243 L 450 -280 L 481 29 Z"
        line={ink.mist}
        spacing={13}
        angle={67}
        opacity={0.46}
      />
      <path
        d="M -219 38 L -204 -193 L -158 -212 L -50 -161 L 123 -108 M -164 -212 L -119 -121 L -70 -146 L -30 -79 M -37 -156 L 16 -100 L 64 -125 L 97 -84 M 127 -83 L 156 -231 L 254 -258 L 324 -286 L 406 -302 L 493 -326 M 175 -234 L 211 -164 L 243 -253 L 273 -197 L 324 -283 L 366 -227 L 405 -300 M 366 -225 L 394 30"
        fill="none"
        stroke={ink.deep}
        strokeWidth="13"
        strokeLinejoin="bevel"
      />
      <path
        d="M -209 -195 L -159 -215 L -48 -165 L 126 -111 M 164 -237 L 314 -288 L 490 -330"
        fill="none"
        stroke={ink.glass}
        strokeWidth="4"
      />
      <path
        d="M -253 37 L -179 1 L -132 3 L -102 -36 L -50 -20 L -20 -40 L 42 -14 L 94 -30 L 142 -63 L 175 -47 L 215 -62 L 259 -16 L 373 -51 L 443 10 L 511 -16 V 51 H -253 Z"
        fill={ink.deep}
      />
      <g transform={`rotate(${wave(f, 0.027) * 5} 48 -131)`}>
        <path
          d="M 48 -131 q 13 37 4 70 l 1 12"
          stroke={ink.night}
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M 35 -39 q 4 -18 20 -16 q 16 2 21 14 l -2 5 Z"
          fill={ink.lapis}
          stroke={ink.deep}
          strokeWidth="3"
        />
        <ellipse cx="55" cy="-37" rx="15" ry="3" fill={ink.mist} />
      </g>
    </g>
  );
}

export function BrokenPort() {
  const m = useShot("brokenPort"),
    shift = m.p * 102;
  return (
    <Plate>
      <SkyWater f={m.f} h={631} night rough={1.17} />
      <Quayside
        x={-154 - shift * 0.55}
        y={633}
        s={1.19}
        f={m.f}
        broken={0.89}
      />
      <path
        d="M 0 722 L 687 660 L 714 897 L 817 901 L 828 690 L 991 669 L 1017 786 L 1166 754 L 1180 654 L 1278 648 L 1339 733 L 1524 685 L 1571 621 L 1920 604 V 1080 H 0 Z"
        fill={ink.navy}
      />
      <DustBank x={1183} y={613} f={m.f + 194} growth={0.82} />
      <g transform={`translate(${-shift} 0)`}>
        <BrokenWorkshop f={m.f} />
        <Etch
          d="M -90 966 L 441 719 L 612 737 L 715 681 L 819 700 L 849 777 L 1221 741 L 1125 832 L 839 851 L 639 981 L -90 1091 Z"
          fill="#778595"
          line={ink.mist}
          angle={37}
          spacing={8}
          opacity={0.48}
        />
        <path
          d="M -35 883 L 407 690 L 605 721 L 819 669 M 58 960 L 532 770 L 652 786"
          stroke={ink.glass}
          strokeWidth="9"
          fill="none"
        />
        {count(12).map((i) => {
          const x = 120 + i * 108,
            y = 799 + random(i + 92) * 123;
          return (
            <path
              key={i}
              d="M -48 15 L -4 -12 L 37 -8 L 61 -23 L 38 14 Z"
              fill={[ink.deep, ink.glass, ink.indigo, ink.lilac][i % 4]}
              transform={`translate(${x} ${y}) rotate(${i * 9 - 47}) scale(${0.6 + random(i) * 1.1})`}
            />
          );
        })}
        <Person
          x={1036 + 54 * m.p}
          y={696}
          s={0.67}
          f={m.f}
          walk={0.55}
          hat
          coat={ink.deep}
        />
        <Person
          x={1292 - 41 * m.p}
          y={750}
          s={0.75}
          f={m.f + 23}
          pose="reach"
          coat={ink.lapis}
        />
      </g>
      <g transform={`translate(${31 - 37 * m.p} ${wave(m.f, 0.026) * 5})`}>
        <Etch
          d={brokenFrame}
          fill={ink.deep}
          line={ink.glass}
          spacing={10}
          opacity={0.32}
        />
        <path
          d="M 225 -10 Q 327 171 511 196 T 803 395 Q 829 424 856 430"
          fill="none"
          stroke={ink.night}
          strokeWidth="5"
          transform={`rotate(${wave(m.f, 0.033) * 1.6} 225 0)`}
        />
        <path
          d="M 1821 -34 Q 1744 185 1734 298 L 1695 270 L 1651 413 L 1648 348 L 1603 450"
          fill="none"
          stroke={ink.mist}
          strokeWidth="4.4"
        />
      </g>
      <Motes f={m.f} seed={9} drift={2.2} n={73} alpha={0.63} />
    </Plate>
  );
}

export function Lift() {
  const m = useShot("lift"),
    travel = 528 * m.p;
  return (
    <Plate>
      <Wash colors={["#7e869d", "#b9b4bb", "#8c94a1"]} />
      <path
        d="M -100 433 Q 206 333 570 372 L 780 318 L 982 332 L 999 367 L 1318 352 L 1449 284 L 1552 307 L 1811 263 L 2010 286 V 755 H -100 Z"
        fill="#73869a"
      />
      <g transform={`translate(${-48 * m.p} 0)`}>
        <path
          d="M -60 600 L 163 478 L 224 501 L 374 432 L 451 454 L 565 417 L 805 475 L 900 435 L 1077 449 L 1404 387 L 1658 394 L 2032 349 V 1080 H -60 Z"
          fill="#506c86"
        />
        <path d="M -25 795 Q 814 574 1988 539 V 1088 H -25 Z" fill="#8299a4" />
        {count(10).map((i) => (
          <path
            key={i}
            d={`M ${-176 + i * 219} ${1011 - i * 19} q 150 -11 244 -46`}
            fill="none"
            stroke={ink.mist}
            opacity=".56"
            strokeWidth="5"
          />
        ))}
        <Ropes x={-100} y={275} width={1210} bend={240} f={m.f} size={7} />
      </g>
      <g transform={`translate(${-187 + travel} ${wave(m.f, 0.081) * 5})`}>
        <Person
          x={574}
          y={705}
          s={1.17}
          f={m.f}
          walk={0.85}
          hat
          pose="carry"
          coat={ink.mist}
        />
        <Bed x={965} y={697} s={1.33} f={m.f} blanket={ink.lilac} />
        <Person
          x={1368}
          y={700}
          s={1.18}
          f={m.f + 30}
          face={-1}
          walk={-0.82}
          pose="carry"
          coat={ink.navy}
        />
        <path
          d="M 610 630 Q 677 635 726 649 M 1189 645 l 88 -24"
          stroke={ink.deep}
          strokeWidth="8"
          fill="none"
        />
      </g>
      <path
        d="M -160 1063 C 486 911 1075 1016 2013 830 L 2030 1119 H -160 Z"
        fill={ink.deep}
      />
      <Motes f={m.f} n={56} drift={1.3} seed={2} />
    </Plate>
  );
}
export function SearchRoom() {
  const m = useShot("search");
  return (
    <Plate>
      <Wash colors={["#b0aabd", "#9daabc", "#647e97"]} />
      <g transform={`translate(${-46 * m.p} 0)`}>
        <path d="M 1004 56 H 1805 V 668 H 1004 Z" fill={ink.lapis} />
        <Wash x={1023} y={75} w={765} h={571} colors={["#8ba5b9", "#d0c6bd"]} />
        <path
          d="M 1397 72 V 650 M 1020 332 H 1790"
          stroke={ink.deep}
          strokeWidth="10"
        />
        <RainGlass f={m.f} seed={8} area={1730} amount={22} opacity={0.3} />
        <Drapery
          x={1640}
          y={31}
          w={257}
          h={715}
          f={m.f}
          color={ink.mist}
          swing={1.4}
        />
        <path
          d="M -100 705 Q 928 652 2010 664 V 1100 H -100 Z"
          fill="#9593a5"
        />
        <path
          d="M -50 820 L 2010 679 M 606 1090 L 1534 667"
          stroke={ink.lilac}
          strokeWidth="5"
        />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${100 + i * 337} ${570 - i * 9})`}>
            <path
              d="M -11 -55 Q -19 -116 39 -119 L 207 -124 Q 241 -123 249 -80 L 260 95 L 216 99 L 200 28 L 38 40 L 18 119 H -9 L 8 25 Z"
              fill={i % 2 ? ink.navy : ink.sea}
              stroke={ink.deep}
              strokeWidth="4"
            />
            <path
              d="M 22 -47 Q 123 -61 227 -58 M 27 1 Q 105 -18 231 -9"
              stroke={ink.glass}
              fill="none"
              strokeWidth="4"
            />
          </g>
        ))}
      </g>
      <g
        transform={`translate(${1293 - 148 * m.turn(0, 42)} ${745 + m.p * 21}) rotate(${6 - 4 * m.p})`}
      >
        <path d="M -256 -181 L 78 -218 L 108 34 L -235 67 Z" fill={ink.milk} />
        <path d="M -232 -157 L 57 -187 L 78 10 L -218 43 Z" fill={ink.lapis} />
        <path
          d="M -228 -34 Q -129 -106 66 -63 L 77 8 L -218 43 Z"
          fill={ink.glass}
        />
        <path
          d="M -116 20 q -23 -24 -12 -63 q 1 -14 15 -20 q -13 -26 5 -43 q 21 -16 37 0 q 18 22 1 43 q 31 24 27 76 Z"
          fill={ink.deep}
        />
        <Hand x={25} y={-9} s={1.34} angle={-14} f={m.f} />
      </g>
      <Shade y={756} height={324} alpha={0.9} />
      <Caption
        x={107}
        y={979}
        size={44}
        f={m.f}
        lines={["Families waited for news of the missing."]}
      />
    </Plate>
  );
}

function KitchenWindow({ m, after = false }: { m: Motion; after?: boolean }) {
  const h = 481;
  return (
    <>
      <Wash
        colors={
          after
            ? ["#ad9caa", "#dad0c9", "#e9be9e"]
            : ["#a7b8c4", "#c9c7cd", "#e8c5a4"]
        }
        h={h + 5}
      />
      <Hills y={h} side={19} f={m.f} />
      <Surface f={m.f + 316} horizon={h} wind={after ? 1.13 : 0.77} />
      <Vessel x={426 + 14 * m.p} y={h + 80} s={0.52} f={m.f} />
      <g transform={`translate(${1613 - 19 * m.p} ${h + 7}) scale(.65)`}>
        <path
          d="M -244 69 Q -133 6 13 14 L 77 -24 L 122 -38 L 183 -14 L 219 -53 L 282 -27 L 330 -72 L 468 -34 V 110 H -244 Z"
          fill="#7f8193"
        />
        {count(6).map((i) => (
          <g key={i} transform={`translate(${i * 81 - 30} ${4 - i * 6})`}>
            <path
              d="M -14 0 V -41 L 22 -66 L 55 -48 V 3 Z"
              fill={i % 2 ? ink.lilac : ink.mist}
            />
            <path
              d="M -21 -37 L 20 -67 L 64 -47"
              fill="none"
              stroke={ink.rose}
              strokeWidth="6"
            />
          </g>
        ))}
      </g>
      {after && <ReflectedLight m={m} turkey h={h} />}
      <path
        d="M -70 809 Q 687 714 1992 744 L 1992 1082 H -70 Z"
        fill={after ? "#7f7587" : "#b39b9c"}
      />
      <path
        d="M -30 833 Q 987 728 1990 769"
        fill="none"
        stroke={ink.mist}
        strokeWidth="7"
      />
      {after && (
        <path
          d="M 1340 760 L 1704 742 L 951 1090 H 111 Z M 1771 744 L 1856 751 L 1490 1090 H 1192 Z"
          fill={ink.indigo}
          opacity={0.23 + 0.42 * Math.exp(-Math.abs(m.f - 12) / 26)}
        />
      )}
      <Etch
        d="M -41 864 Q 827 771 1990 793 V 1090 H -41 Z"
        line={ink.lilac}
        spacing={13}
        angle={77}
        opacity={0.43}
      />
    </>
  );
}

export function TeaRoom() {
  const m = useShot("teaRoom");
  const pour =
    between(m.f, 16, 63) * (1 - between(m.f, m.length - 60, m.length - 22));
  const kettleX = 1502 + 102 * (1 - pour),
    kettleY = 393 - 73 * pour,
    angle = -10 - 20 * pour;
  const radians = (angle * Math.PI) / 180;
  const tipX = kettleX - 183 * Math.cos(radians) - 2 * Math.sin(radians);
  const tipY = kettleY - 183 * Math.sin(radians) + 2 * Math.cos(radians);
  return (
    <Plate>
      <KitchenWindow m={m} />
      <g transform={`translate(${-47 * m.p} 0)`}>
        <path
          d="M 1711 -20 V 761 H 1760 V -20 M 0 86 Q 998 133 1920 53"
          fill="none"
          stroke={ink.lapis}
          strokeWidth="16"
        />
        <Drapery
          x={-65}
          y={-40}
          w={356}
          h={712}
          f={m.f}
          color={ink.mist}
          swing={1.25}
        />
        <ellipse
          cx={1210}
          cy={884}
          rx={291}
          ry={40}
          fill={ink.indigo}
          opacity=".36"
        />
        <TeaGlass
          x={1187}
          y={624}
          s={1.15}
          f={m.f}
          surge={wave(m.f, 0.049) * 2}
        />
        <g transform={`translate(${kettleX} ${kettleY}) rotate(${angle})`}>
          <path
            d="M 189 -12 Q 230 -24 271 -35 L 616 3 L 646 142 L 269 63 Q 223 49 185 37 Z"
            fill={ink.indigo}
            stroke={ink.deep}
            strokeWidth="4"
          />
          <Etch
            d="M 252 -27 L 283 -31 L 291 66 L 252 62 L 237 21 Z"
            line={ink.mist}
            spacing={7}
            angle={78}
            opacity={0.63}
          />
          <path
            d="M 256 -18 Q 230 -18 216 -26 Q 199 -39 180 -36 L 158 -28 L 148 -12 Q 150 -2 159 -7 L 169 -17 L 185 -18 L 191 -1 L 175 27 Q 180 41 197 47 Q 213 57 233 44 L 260 43 Z"
            fill="#c69a85"
            stroke={ink.deep}
            strokeWidth="3"
          />
          <path
            d="M -56 15 C -115 22 -112 87 -102 113 Q -64 161 27 155 C 123 156 148 104 127 48 Q 113 8 62 -4 Z"
            fill="#879bad"
            stroke={ink.deep}
            strokeWidth="5"
          />
          <path
            d="M -71 42 Q -144 55 -160 2 L -183 2 Q -169 78 -102 108 Z"
            fill={ink.mist}
            stroke={ink.deep}
            strokeWidth="4"
          />
          <path
            d="M 107 12 q 40 -60 70 -13 q 34 61 -38 90"
            stroke={ink.deep}
            strokeWidth="15"
            fill="none"
          />
          <path
            d="M 185 -19 Q 165 -27 158 -10 Q 154 -1 160 4 Q 166 7 170 -3 L 180 -7 M 190 -5 Q 171 -8 168 5 Q 167 14 173 15 L 185 4 M 194 8 Q 177 9 177 18 Q 177 27 185 24 L 196 16"
            stroke="#c39683"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cy="2"
            rx="66"
            ry="16"
            fill={ink.glass}
            stroke={ink.deep}
            strokeWidth="4"
          />
          <path
            d="M -47 -7 q 11 -21 30 -21 h 29 l 25 16"
            stroke={ink.deep}
            strokeWidth="4"
            fill={ink.mist}
          />
        </g>
        <path
          d={`M ${tipX} ${tipY} Q ${tipX - 96} ${tipY + 9} 1189 670`}
          fill="none"
          stroke="#c78c62"
          strokeWidth={4 + pour * 4}
          opacity={pour * 0.9}
        />
        <SaltRing x={716} y={861} rx={122} ry={27} color={ink.milk} f={m.f} />
      </g>
      <Shade y={814} height={266} alpha={0.74} />
      <Letter x={108} y={985} size={44} italic>
        Morning tea
      </Letter>
    </Plate>
  );
}

export function SecondLight() {
  const m = useShot("secondLight"),
    turn = between(m.f, 2, 43);
  const echo = 23 * Math.exp(-m.f / 38) * Math.sin(m.f * 0.174);
  return (
    <Plate>
      <KitchenWindow m={m} after />
      <g transform={`translate(${-17 * m.p} 0)`}>
        <path
          d={`M 1720 -20 L ${1709 + 7 * turn} 756 H 1758 L 1773 -20 Z`}
          fill={ink.navy}
        />
        <Drapery
          x={1638 - 58 * turn}
          y={-35}
          w={361}
          h={711}
          f={m.f + 33}
          swing={2.2 + Math.abs(echo) * 0.1}
          color={ink.mist}
          alpha={0.88}
        />
        <ellipse
          cx={1100 + 29 * turn}
          cy={877}
          rx={299 + 55 * turn}
          ry="38"
          fill={ink.indigo}
          opacity=".43"
        />
        <TeaGlass
          x={1130 + 17 * turn}
          y={611}
          s={1.23}
          tilt={1 + echo * 0.26 + turn * 2}
          f={m.f}
          surge={echo * 1.09}
        />
        <path
          d={`M 969 871 C 905 ${894 + 13 * turn} 757 ${853 + 17 * turn} 709 904 Q 662 930 787 929 C 856 931 907 907 987 896 Z`}
          fill="#a56d64"
          opacity={0.61 * between(m.f, 9, 84)}
        />
        <g
          transform={`translate(${1240 + 131 * turn} ${869 - 18 * turn}) rotate(${10 + 21 * turn})`}
        >
          <path
            d="M 0 0 q 7 -11 17 -4 l 108 7 q 34 -18 53 -7 q 16 12 -4 20 q -22 9 -46 -3 L 16 8 Q 5 11 0 0 Z"
            fill={ink.mist}
            stroke={ink.navy}
            strokeWidth="3"
          />
        </g>
        <g opacity={between(m.f, 9, 59) * 0.72}>
          <path
            d="M 1698 222 l -97 89 -63 13 -58 85 -95 53 M 1544 323 l -18 -85 -57 -29 M 1480 406 l -12 77 24 47"
            stroke={ink.navy}
            strokeWidth="2.7"
            fill="none"
          />
        </g>
      </g>
      <Shade y={802} height={278} alpha={0.89} />
      <ShoreDate m={m} turkey />
      <Caption
        x={109}
        y={992}
        size={47}
        f={m.f - 21}
        lines={["The Soviet Union answered with one nuclear strike."]}
      />
      <Motes f={m.f} n={46} seed={13} drift={1.1} />
    </Plate>
  );
}

function ClinicCare({ f }: { f: number }) {
  const breathe = wave(f, 0.052) * 2.2,
    settle = between(f, 14, 77);
  return (
    <g transform="translate(1092 754) scale(1.16)">
      <ellipse
        cx="-54"
        cy="102"
        rx="245"
        ry="22"
        fill={ink.indigo}
        opacity=".44"
      />
      <path
        d="M -57 5 L 53 -15 L 100 12 L 91 70 L -61 82 L -79 44 Z"
        fill={ink.lapis}
        stroke={ink.deep}
        strokeWidth="3"
      />
      <path
        d="M -30 -23 Q -51 0 -89 12 Q -114 22 -109 46 L -100 87 L -78 88 L -77 41 L -12 32 L 25 10 Z"
        fill={ink.navy}
        stroke={ink.deep}
        strokeWidth="3"
      />
      <path
        d="M -10 -19 Q -4 -1 -17 21 L -53 49 L -55 85 L -33 87 L -22 60 L 25 40 Q 53 17 43 -11 Z"
        fill="#69768e"
        stroke={ink.deep}
        strokeWidth="3"
      />
      <path
        d="M -103 80 L -79 82 L -76 95 L -111 98 L -135 94 Q -135 85 -103 80 Z M -55 81 L -33 83 L -28 94 L -60 99 L -84 96 Q -89 88 -55 81 Z"
        fill={ink.night}
      />
      <g
        transform={`translate(0 ${breathe}) rotate(${-4 - settle * 2} 18 -94)`}
      >
        <path
          d="M -9 -126 Q -31 -124 -43 -91 L -49 -37 L -61 -8 Q -16 15 44 5 L 56 -23 L 46 -88 Q 38 -126 16 -133 Z"
          fill={ink.lilac}
          stroke={ink.deep}
          strokeWidth="3.5"
        />
        <path
          d="M 6 -149 L 24 -151 L 25 -127 Q 10 -121 -1 -127 Z"
          fill="#c29482"
        />
        <path
          d="M -13 -177 Q 12 -200 31 -179 L 40 -157 L 33 -140 Q 26 -128 13 -131 L -3 -139 L -9 -149 L -21 -154 L -14 -162 Z"
          fill="#c49a86"
          stroke={ink.deep}
          strokeWidth="2.5"
        />
        <path
          d="M -16 -161 Q -23 -187 -5 -194 Q 13 -206 33 -192 Q 56 -178 44 -153 L 36 -140 L 27 -149 L 23 -172 Q 3 -170 -7 -178 Z"
          fill={ink.deep}
        />
        <path
          d="M -9 -155 l 8 2 M -10 -144 l 7 1"
          stroke={ink.deep}
          strokeWidth="2.2"
          fill="none"
        />
        <path
          d="M -13 -121 L 26 -66 L -40 -56 L -59 -76 L -48 -89 L -28 -78 L 18 -77 L -22 -117 Z"
          fill={ink.milk}
          stroke={ink.lapis}
          strokeWidth="2.5"
        />
        <path
          d="M 39 -106 Q 56 -101 45 -75 L 25 -46 Q 15 -40 2 -44 L -28 -53 L -26 -65 L 14 -65 L 29 -96 Z"
          fill="#887f9e"
          stroke={ink.deep}
          strokeWidth="3"
        />
      </g>
      <g
        transform={`translate(${-173 + settle * 8} ${-3 + wave(f, 0.039) * 2}) rotate(${4 + settle * 4} -14 -75)`}
      >
        <path
          d="M -33 -34 Q -68 -19 -84 12 L -112 51 L -103 69 L -81 69 L -42 21 L -4 4 L 5 -28 Z"
          fill={ink.deep}
        />
        <path
          d="M 0 -27 Q 11 12 -12 30 L -49 54 L -22 80 L -39 95 L -82 65 Q -93 52 -72 35 L -46 2 Z"
          fill={ink.navy}
          stroke={ink.deep}
          strokeWidth="4"
        />
        <path
          d="M -114 54 L -91 61 L -91 75 L -136 80 L -145 75 Z M -38 83 L -22 76 Q 1 85 7 94 L -13 98 L -41 95 Z"
          fill={ink.night}
        />
        <path
          d="M -33 -115 Q -56 -102 -59 -66 L -64 -24 Q -33 -4 15 -19 L 24 -28 L 15 -72 L -3 -106 Z"
          fill={ink.sea}
          stroke={ink.deep}
          strokeWidth="3"
        />
        <path
          d="M -21 -116 L -9 -133 L 9 -124 L 10 -105 L -1 -98 Z"
          fill="#b98f80"
        />
        <path
          d="M -36 -151 Q -35 -169 -11 -173 Q 10 -174 16 -151 L 24 -140 L 19 -136 Q 15 -118 1 -120 Q -16 -122 -22 -131 Z"
          fill="#b98f80"
          stroke={ink.deep}
          strokeWidth="2.5"
        />
        <path
          d="M -38 -141 Q -47 -157 -35 -170 Q -34 -186 -14 -184 Q -1 -188 11 -176 L 24 -159 L 28 -151 Q 2 -159 -18 -145 L -31 -132 Z"
          fill={ink.mist}
          stroke={ink.deep}
          strokeWidth="3"
        />
        <path
          d="M -12 -98 Q 5 -108 19 -84 L 37 -57 L 82 -64 L 89 -55 L 44 -34 Q 33 -30 22 -38 L -2 -60 Z"
          fill={ink.sea}
          stroke={ink.deep}
          strokeWidth="3"
        />
        <path
          d="M 81 -65 l 14 -9 l 8 0 -5 6 11 0 3 4 -13 10 -13 2 Z"
          fill="#bd9680"
        />
        <path
          d="M 1 -118 L -7 -101 L -26 -93 M -35 -78 L -34 -31"
          stroke={ink.mist}
          strokeWidth="2.5"
          fill="none"
        />
      </g>
      <path
        d={`M -84 -60 Q -44 ${-52 + breathe} -28 -69 L -13 -77 Q -3 -66 -6 -46 L 2 -4 Q 17 17 20 28 Q -23 30 -52 15 L -74 -1 Z`}
        fill="#a89ab3"
        stroke={ink.mist}
        strokeWidth="2.5"
      />
      <path
        d="M -66 -41 Q -51 -9 -26 8 M -34 -41 Q -27 -21 -22 -15"
        fill="none"
        stroke={ink.indigo}
        strokeWidth="2"
        opacity=".64"
      />
    </g>
  );
}

export function Marmara() {
  const m = useShot("marmara");
  const hanging = wave(m.f, 0.032) * 4;
  return (
    <Plate>
      <Wash colors={["#b6a4b5", "#d7b4ab", "#98a9ae"]} />
      <SkyWater f={m.f} h={611} side={12} rough={0.95} />
      <DustBank x={1226} y={599} f={m.f + 171} growth={0.84} warm />
      <g transform={`translate(${-14 - m.p * 19} 0)`}>
        <path
          d="M -13 449 L 170 380 L 224 482 L 193 602 L 226 640 L 174 848 L -13 918 Z"
          fill="#738e9b"
          stroke={ink.deep}
          strokeWidth="5"
        />
        <path
          d="M 51 440 L 138 410 L 179 511 L 155 828 L 63 853 Z"
          fill={ink.indigo}
          stroke={ink.mist}
          strokeWidth="4"
        />
        <path
          d="M 118 426 L 138 417 L 173 524 L 164 766 L 103 721 Z"
          fill="#556d89"
        />
      </g>
      <path
        d="M 0 0 H 495 L 463 86 L 424 76 L 369 234 L 323 207 L 233 338 L 278 410 L 202 558 L 137 543 L 117 826 H 0 Z M 1920 0 H 1799 L 1753 168 L 1773 181 L 1748 381 L 1772 405 L 1716 605 L 1801 719 L 1689 851 H 1920 Z"
        fill={ink.indigo}
      />
      <Etch
        d="M 0 0 H 341 L 282 84 L 243 53 L 157 202 L 92 215 L 65 441 L 0 537 Z"
        fill="#9a94a8"
        line={ink.mist}
        spacing={8}
      />
      <path
        d="M -40 915 L 353 747 L 664 772 L 718 739 L 860 763 L 991 719 L 1221 756 L 1240 696 L 1487 726 L 1694 648 L 1970 686 V 1090 H -40 Z"
        fill="#73879a"
      />
      <g transform="translate(2 513) skewY(-8)" opacity=".85">
        {count(11).map((i) => (
          <g
            key={i}
            transform={`translate(${(i % 3) * 44} ${Math.floor(i / 3) * 44})`}
          >
            <rect
              x="0"
              y="0"
              width="43"
              height="43"
              fill={i % 2 ? ink.mist : "#a2b5bb"}
              stroke={ink.lapis}
              strokeWidth="1.5"
            />
            <path
              d="M 21 4 Q 32 14 22 21 Q 11 14 21 4 Z M 21 39 Q 12 28 21 22 Q 31 29 21 39 Z M 3 21 Q 12 13 20 21 Q 12 29 3 21 Z M 39 21 Q 31 13 23 21 Q 31 29 39 21 Z"
              fill={ink.lapis}
            />
          </g>
        ))}
      </g>
      <g transform={`translate(${-47 * m.p} 0)`}>
        {count(29).map((i) => {
          const x = random(i + 6) * 2010,
            y = 876 + random(i * 9 + 34) * 168;
          return (
            <g
              key={i}
              transform={`translate(${x} ${y}) rotate(${random(i * 13) * 83 - 35})`}
            >
              <path
                d="M -31 -8 L 9 -20 L 38 -3 L 17 12 L -30 9 Z"
                fill={i % 3 === 0 ? ink.mist : ink.lapis}
              />
              <path
                d="M -19 -4 q 20 -7 36 4"
                stroke={ink.glass}
                strokeWidth="3"
                fill="none"
              />
            </g>
          );
        })}
        <ClinicCare f={m.f} />
        <Person
          x={1480 - m.p * 104}
          y={817}
          s={0.91}
          f={m.f + 70}
          walk={0.56}
          face={-1}
          bag
          coat={ink.deep}
        />
      </g>
      <g transform={`translate(399 -40) rotate(${hanging})`}>
        <path
          d="M 0 0 q -43 163 -4 246 l -12 75"
          fill="none"
          stroke={ink.deep}
          strokeWidth="6"
        />
        <path
          d="M -174 306 L 157 295 L 162 384 L -177 402 Z"
          fill={ink.glass}
          stroke={ink.deep}
          strokeWidth="4"
        />
        <Letter x={-152} y={363} size={43} fill={ink.deep} serif>
          Sağlık ocağı
        </Letter>
      </g>
      <Motes f={m.f} n={75} seed={24} drift={2.1} alpha={0.55} />
    </Plate>
  );
}

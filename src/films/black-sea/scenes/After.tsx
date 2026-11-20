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
  RainGlass,
  Ropes,
  Shade,
  SkyWater,
  Surface,
  Wash,
} from "../art";
import { Drapery, Hand, Key, Person, SaltRing } from "../objects";
import { between, clamp, count, random, useShot, wave } from "../score";

function Sample({
  x,
  y,
  s,
  f,
  legend,
  full = 1,
  soil = false,
}: {
  x: number;
  y: number;
  s: number;
  f: number;
  legend: string;
  full?: number;
  soil?: boolean;
}) {
  const wall = useId(),
    clip = useId();
  const jar =
    "M -43 -188 H 44 V -146 C 44 -124 85 -122 88 -85 L 91 79 Q 88 105 1 108 Q -82 109 -91 83 L -88 -80 C -86 -120 -46 -125 -43 -146 Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <linearGradient id={wall}>
          <stop stopColor={ink.lapis} stopOpacity=".80" />
          <stop offset=".24" stopColor={ink.milk} stopOpacity=".47" />
          <stop offset=".57" stopColor={ink.glass} stopOpacity=".29" />
          <stop offset="1" stopColor={ink.lapis} stopOpacity=".78" />
        </linearGradient>
        <clipPath id={clip}>
          <path d={jar} />
        </clipPath>
      </defs>
      <ellipse
        cx="27"
        cy="110"
        rx="123"
        ry="19"
        fill={ink.deep}
        opacity=".32"
      />
      <path
        d={jar}
        fill={`url(#${wall})`}
        stroke={ink.deep}
        strokeWidth="3.5"
      />
      <g clipPath={`url(#${clip})`}>
        {soil ? (
          <>
            <path
              d="M -98 33 Q -64 3 -41 12 L -19 3 L 5 8 L 29 -4 Q 56 -8 94 15 V 119 H -98 Z"
              fill="#98755f"
            />
            <path
              d="M -95 65 Q -48 37 7 47 T 94 27 L 94 117 H -95 Z"
              fill="#795f62"
            />
            {count(34).map((i) => (
              <ellipse
                key={i}
                cx={random(i + 33) * 176 - 88}
                cy={28 + random(i + 81) * 69}
                rx={1 + random(i + 3) * 4}
                ry={2}
                fill={i % 3 ? ink.peach : ink.night}
                opacity=".65"
              />
            ))}
          </>
        ) : (
          <>
            <path
              d={`M -100 ${43 - 63 * full} Q -30 ${38 - 63 * full + wave(f, 0.045) * 5} 26 ${44 - 63 * full} T 102 ${42 - 63 * full} V 118 H -100 Z`}
              fill={ink.sea}
              opacity=".76"
            />
            <path
              d={`M -100 ${43 - 63 * full} Q -30 ${38 - 63 * full + wave(f, 0.045) * 5} 26 ${44 - 63 * full} T 102 ${42 - 63 * full}`}
              stroke={ink.milk}
              strokeWidth="2"
              fill="none"
            />
          </>
        )}
      </g>
      <path
        d="M -48 -192 Q 0 -206 49 -193 V -164 Q -1 -154 -47 -165 Z"
        fill={ink.navy}
        stroke={ink.deep}
        strokeWidth="3"
      />
      <path
        d="M -40 -183 H 43"
        stroke={ink.glass}
        strokeWidth="10"
        strokeDasharray="2 6"
      />
      <path
        d="M -79 -54 Q -11 -67 61 -55 L 63 20 Q -16 33 -80 15 Z"
        fill={ink.milk}
      />
      <Letter
        x={-9}
        y={-9}
        size={22}
        fill={ink.deep}
        weight={600}
        anchor="middle"
      >
        {legend}
      </Letter>
      <path
        d="M -74 -87 l -2 22 M 70 -67 v 111 M -67 61 v 13"
        fill="none"
        stroke={ink.white}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}
export function Survey() {
  const m = useShot("survey");
  return (
    <Plate>
      <Wash colors={["#a5c2c4", "#d5d6cb", "#9bb8b9"]} side />
      <path d="M -70 714 L 637 558 L 1994 589 V 1080 H -70 Z" fill="#84a6ac" />
      <g transform={`translate(${-49 * m.p} 0)`}>
        <Etch
          d="M 447 678 L 1289 563 L 1811 796 L 872 991 Z"
          fill="#527a8d"
          line={ink.mist}
          opacity={0.44}
          spacing={9}
          angle={69}
        />
        <path
          d="M 426 654 L 1264 549 L 1815 765 L 879 945 Z M 466 661 L 877 905 L 1733 755 L 1266 565 Z"
          fillRule="evenodd"
          fill={ink.mist}
          stroke={ink.navy}
          strokeWidth="3"
        />
        <Sample
          x={1364}
          y={605}
          s={0.92}
          f={m.f + 15}
          legend="Kıyı suyu"
          full={0.63}
        />
        <Sample x={1017} y={702} s={1.46} f={m.f} legend="Su numunesi" />
        <Sample x={1530} y={772} s={0.95} f={m.f + 53} legend="Toprak" soil />
      </g>
      <g
        transform={`translate(${-68 + 99 * m.turn(0, 44)} ${-14 + 21 * m.turn(1, 36)})`}
      >
        <Hand x={610} y={634} s={1.35} mirror={-1} angle={11} glove f={m.f} />
        <path
          d="M 592 633 L 775 606 Q 781 603 789 608 L 803 620 L 791 631 L 602 650 Z"
          fill={ink.mist}
          stroke={ink.navy}
          strokeWidth="4"
        />
        <ellipse cx="797" cy="615" rx="14" ry="10" fill={ink.lapis} />
      </g>
      <Letter x={111} y={145} size={38} fill={ink.navy} italic>
        Environmental monitoring
      </Letter>
      <Caption
        x={106}
        y={269}
        size={64}
        f={m.f}
        light={false}
        lines={["Water and soil samples"]}
      />
      <Motes f={m.f} n={36} seed={3} alpha={0.36} />
    </Plate>
  );
}

export function Clearance() {
  const m = useShot("clearance"),
    lift = between(m.f, 6, 122);
  return (
    <Plate>
      <Wash colors={["#869daf", "#c3c3c1", "#d3b79f"]} />
      <Hills y={636} f={m.f} side={8} />
      <Surface f={m.f} horizon={623} wind={0.78} />
      <path
        d="M 0 865 L 449 728 L 657 749 L 706 687 L 912 738 L 982 680 L 1111 692 L 1344 625 L 1466 665 L 1582 598 L 1642 631 L 1920 555 V 1080 H 0 Z"
        fill="#738897"
      />
      <g transform={`translate(${-35 * m.p} 0)`}>
        {count(12).map((i) => {
          const x = i * 168 - 45,
            y = 842 + wave(i, 0.8) * 42;
          return (
            <g
              key={i}
              transform={`translate(${x} ${y}) rotate(${random(i + 4) * 32 - 15})`}
            >
              <Etch
                d="M -72 32 L -54 -30 L 16 -42 L 89 -9 L 66 22 L 16 30 Z"
                fill={[ink.lapis, ink.lilac, ink.mist][i % 3]}
                line={ink.navy}
                opacity={0.31}
                spacing={8}
              />
            </g>
          );
        })}
        <g
          transform={`translate(${889 + m.p * 92} ${566 - 118 * lift}) rotate(${-14 + lift * 9})`}
        >
          <path
            d="M -199 -24 L -87 -334 L 121 -351 L 276 -47"
            fill="none"
            stroke={ink.deep}
            strokeWidth="6"
          />
          <path
            d="M -87 -334 L 16 -603 L 121 -351"
            fill="none"
            stroke={ink.navy}
            strokeWidth="6"
          />
          <Etch
            d="M -466 -44 L 347 -64 L 438 -33 L 388 -3 L 166 3 L 127 31 L -62 9 L -109 23 L -395 29 L -469 4 Z"
            fill={ink.mist}
            line={ink.lapis}
            opacity={0.7}
            spacing={12}
          />
          <path
            d="M -394 26 l -37 29 -49 2 M 363 -55 l 92 -36 34 5"
            stroke={ink.deep}
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M -214 -52 L -182 25 M 247 -64 l 35 68"
            stroke={ink.brass}
            strokeWidth="13"
          />
        </g>
        <Person
          x={416 + 45 * m.p}
          y={780}
          s={1.06}
          f={m.f}
          pose="reach"
          coat={ink.sea}
          hat
        />
        <Person
          x={1379 - 70 * m.p}
          y={794}
          s={1.13}
          f={m.f + 34}
          walk={0.42}
          face={-1}
          coat={ink.lilac}
          hat
          bag
        />
        <path
          d="M -40 1012 Q 824 814 1960 941 V 1080 H -40 Z"
          fill={ink.deep}
        />
        <Ropes x={-53} y={945} width={760} bend={136} f={m.f} size={17} />
      </g>
      <Shade y={863} height={217} alpha={0.64} />
      <Caption
        x={109}
        y={983}
        size={42}
        f={m.f}
        lines={["Military and civilian engineers cleared the rubble."]}
      />
      <Motes f={m.f} n={58} seed={21} />
    </Plate>
  );
}

export function Records() {
  const m = useShot("records");
  return (
    <Plate>
      <Wash colors={["#797d9b", "#a6a3af", "#c8bcb4"]} side />
      <g transform={`translate(${1 - m.p * 49} ${m.p * 10})`}>
        <path
          d="M 806 51 L 1728 100 L 1844 752 L 851 720 Z"
          fill={ink.deep}
          opacity=".46"
        />
        <path d="M 781 31 L 1706 72 L 1806 712 L 822 684 Z" fill={ink.mist} />
        <path
          d="M 800 52 L 1683 91 L 1772 681 L 845 661 Z"
          fill="#758798"
          stroke={ink.lapis}
          strokeWidth="4"
        />
        <g transform="translate(1308 153) rotate(5)">
          <path d="M -6 -8 H 321 L 334 151 L -12 172 Z" fill={ink.milk} />
          <Letter x={10} y={32} size={23} fill={ink.navy}>
            Оценка каждого взрыва
          </Letter>
          <Letter x={8} y={111} size={60} serif fill={ink.deep}>
            20–50 кт
          </Letter>
        </g>
        {[
          [922, 209],
          [1135, 215],
          [950, 347],
          [1179, 356],
          [1468, 485],
          [948, 547],
          [1197, 552],
        ].map(([x, y], i) => {
          return (
            <g
              key={i}
              transform={`translate(${x} ${y}) rotate(${-6 + (i % 3) * 4 + wave(m.f, 0.024, i * 6) * 0.7})`}
            >
              <path
                d="M -49 -22 L 88 -26 L 92 48 L -45 51 Z"
                fill={i % 3 === 0 ? ink.lilac : ink.milk}
                opacity=".91"
              />
              <path
                d="M -31 -2 q 24 -5 80 -3 m -77 13 h 54 m -55 12 l 80 -4"
                stroke={ink.lapis}
                strokeWidth="1.8"
                fill="none"
              />
              <circle cx="12" cy="-20" r="4" fill={ink.brass} />
            </g>
          );
        })}
      </g>
      <g
        transform={`translate(${117 + 71 * m.turn(1, 35)} ${180 - 15 * m.p}) rotate(-6 245 300)`}
      >
        <path
          d="M -45 24 L 436 -33 L 526 338 L 22 415 Z"
          fill={ink.deep}
          opacity=".4"
        />
        <path d="M -52 -1 L 427 -47 L 503 315 L 8 385 Z" fill={ink.milk} />
        <Letter x={15} y={107} size={60} fill={ink.deep} serif>
          Розыск
        </Letter>
        <Letter x={23} y={160} size={32} fill={ink.navy}>
          продолжается
        </Letter>
        <Key x={112} y={251} s={1.65} angle={-11} />
        <path
          d="M 86 244 Q -5 207 32 151 T -60 45"
          fill="none"
          stroke={ink.rose}
          strokeWidth="3"
        />
      </g>
      <path d="M -35 768 Q 861 695 1950 776 V 1107 H -35 Z" fill={ink.deep} />
      <Caption
        x={113}
        y={872}
        size={52}
        f={m.f}
        lines={["Thousands died on each shore.", "Even more were wounded."]}
      />
      <Motes f={m.f} n={29} seed={11} alpha={0.34} />
    </Plate>
  );
}

export function Migration() {
  const m = useShot("migration"),
    pane = useId();
  return (
    <Plate>
      <Wash colors={["#52667e", "#8e94a5", "#a99aab"]} />
      <defs>
        <clipPath id={pane}>
          <path d="M 35 47 Q 40 27 70 27 L 1857 55 Q 1892 55 1889 92 L 1854 658 L 49 677 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${pane})`}>
        <Wash colors={["#8ba7b5", "#cfcbc4", "#879aa5"]} />
        <g transform={`translate(${-206 * m.p} 0)`}>
          <Hills f={m.f} y={477} side={5} />
        </g>
        <g transform={`translate(${-775 * m.p} 0)`}>
          {count(17).map((i) => {
            const x = i * 177 - 113,
              y = 525 + wave(i, 1.7) * 27;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path
                  d="M -60 27 V -32 L -5 -67 L 58 -36 V 27 Z"
                  fill={i % 3 ? ink.lapis : ink.lilac}
                />
                <path
                  d="M -42 -15 h 77"
                  fill="none"
                  stroke={ink.mist}
                  strokeWidth="10"
                  strokeDasharray="10 15"
                />
              </g>
            );
          })}
        </g>
        <path
          d="M -50 467 l 2360 -24 M -93 487 l 2211 -23"
          fill="none"
          stroke={ink.deep}
          opacity=".60"
          strokeWidth="3"
        />
        {count(7).map((i) => (
          <path
            key={i}
            d={`M ${i * 497 - 1550 * m.p} 323 l 7 369`}
            stroke={ink.navy}
            strokeWidth="10"
          />
        ))}
        <RainGlass f={m.f} seed={22} amount={58} opacity={0.45} />
      </g>
      <path
        d="M 37 48 Q 42 25 70 26 L 1861 54 Q 1896 54 1889 96 L 1853 663 L 49 684 Z M 629 34 L 619 678 M 1300 44 L 1278 673"
        fill="none"
        stroke={ink.deep}
        strokeWidth="22"
      />
      <path d="M 0 771 Q 907 659 1920 716 V 1080 H 0 Z" fill={ink.navy} />
      <g
        transform={`translate(${wave(m.f, 0.024) * 7} ${wave(m.f, 0.078) * 3.1})`}
      >
        <Person x={472} y={741} s={1.26} f={m.f + 83} coat={ink.lilac} bag />
        <Person
          x={721}
          y={763}
          s={1.02}
          f={m.f}
          face={-1}
          pose="carry"
          coat={ink.sea}
        />
        <Person
          x={1444}
          y={754}
          s={1.58}
          f={m.f + 14}
          pose="watch"
          coat={ink.deep}
          face={-1}
        />
        <g transform="translate(837 777) rotate(-4)">
          <path
            d="M -159 -2 Q -165 -27 -132 -35 L 114 -31 Q 145 -28 153 -9 L 174 112 Q 172 133 147 140 L -110 148 Q -140 144 -148 123 Z"
            fill="#ab7d83"
            stroke={ink.deep}
            strokeWidth="5"
          />
          <path
            d="M -52 -36 q -6 -46 42 -47 q 45 -3 49 47 M -95 -20 l 20 152 M 82 -24 l 18 152"
            stroke={ink.peach}
            strokeWidth="8"
            fill="none"
          />
          <path d="M 55 -36 l -15 39 49 21 10 -53 Z" fill={ink.milk} />
        </g>
      </g>
      <Shade y={826} height={254} alpha={0.89} />
      <Caption
        x={110}
        y={990}
        f={m.f}
        size={44}
        lines={["Displaced families looked for new homes."]}
      />
    </Plate>
  );
}
function Lorry({
  x,
  y,
  s = 1,
  f,
}: {
  x: number;
  y: number;
  s?: number;
  f: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M -106 -42 Q -103 -64 -82 -66 L 22 -65 L 30 -19 L 43 -22 L 47 -52 L 86 -52 L 109 -29 L 119 -22 L 118 -5 H -107 Z"
        fill={ink.deep}
      />
      <path d="M 55 -46 H 80 L 92 -30 H 54 Z" fill={ink.glass} />
      <path
        d="M -96 -47 h 110 m -108 31 h 110"
        fill="none"
        stroke={ink.lapis}
        strokeWidth="3"
      />
      {[-67, 75].map((v) => (
        <g key={v} transform={`translate(${v} -4) rotate(${f * 5})`}>
          <circle r="14" fill={ink.night} />
          <circle r="6" fill={ink.lapis} />
          <path d="M -5 0 H 5" stroke={ink.mist} strokeWidth="1.6" />
        </g>
      ))}
    </g>
  );
}
export function CarryOn() {
  const m = useShot("carryOn");
  return (
    <Plate>
      <Wash colors={["#8290a8", "#b4acb8", "#d7bcab"]} />
      <Hills f={m.f} y={655} side={27} />
      <g transform={`translate(${-31 * m.p} 0)`}>
        <path d="M -70 546 L 2005 364 L 2016 433 L -65 632 Z" fill={ink.navy} />
        {count(7).map((i) => (
          <path
            key={i}
            d={`M ${i * 349 - 66} ${584 - i * 30} l 25 5 -5 339 -37 13 Z`}
            fill={ink.navy}
          />
        ))}
        <path
          d="M -44 508 L 1998 330 M -55 522 L 2003 343"
          fill="none"
          stroke={ink.deep}
          strokeWidth="4"
        />
        {count(38).map((i) => (
          <path
            key={i}
            d={`M ${i * 56 - 54} ${509 - i * 4.88} v 37`}
            stroke={ink.deep}
            strokeWidth="3"
          />
        ))}
        {count(6).map((i) => {
          const x = i * 461 - 262 + m.p * 446;
          return (
            <Lorry
              key={i}
              x={x}
              y={538 - x * 0.089}
              f={m.f + i * 18}
              s={0.66 + (5 - i) * 0.027}
            />
          );
        })}
      </g>
      <path
        d="M 0 811 Q 348 726 752 737 L 1004 692 L 1310 724 L 1521 634 L 1777 662 L 1920 614 V 1080 H 0 Z"
        fill="#687f8d"
      />
      <g transform={`translate(${-94 * m.p} 0)`}>
        <path
          d="M 102 953 L 400 830 L 801 855 L 1051 803 L 1246 817 L 1504 758 L 1988 819 V 1087 H 102 Z"
          fill={ink.deep}
        />
        <Person
          x={1130 + 36 * m.p}
          y={798}
          s={0.75}
          f={m.f}
          hat
          walk={0.32}
          coat={ink.mist}
        />
        <Person
          x={1408 - 35 * m.p}
          y={804}
          s={0.83}
          f={m.f + 30}
          hat
          face={-1}
          pose="carry"
          coat={ink.navy}
        />
        <path
          d="M 965 792 L 1291 759 L 1453 793 L 1118 837 Z"
          fill={ink.glass}
        />
      </g>
      <Shade y={815} height={265} alpha={0.9} />
      <Caption
        x={109}
        y={987}
        f={m.f}
        size={47}
        lines={["The conventional war continued."]}
      />
    </Plate>
  );
}

export function Salt() {
  const m = useShot("salt");
  return (
    <Plate>
      <Wash colors={["#8e8ca6", "#b8adba", "#dbc0a9"]} side />
      <g transform={`translate(${44 - 73 * m.p} 0)`}>
        <path d="M 84 -20 H 848 V 689 H 84 Z" fill={ink.navy} />
        <Wash
          x={109}
          y={0}
          w={714}
          h={662}
          colors={["#829eb5", "#d8cdc6", "#a9c5c0"]}
        />
        <path
          d="M 108 484 Q 206 457 339 471 Q 554 392 823 420 V 661 H 108 Z"
          fill={ink.lapis}
          opacity=".49"
        />
        <path
          d="M 457 -26 V 670 M 94 285 L 832 282"
          stroke={ink.navy}
          strokeWidth="10"
        />
        <Drapery
          x={73}
          y={-14}
          w={183}
          h={694}
          f={m.f}
          color={ink.mist}
          alpha={0.87}
          swing={1.55}
        />
        <path
          d="M 1014 129 Q 1010 112 1030 113 L 1611 92 Q 1636 90 1635 105 L 1632 145 L 1019 173 Z"
          fill={ink.navy}
        />
        {count(4).map((i) => (
          <path
            key={i}
            d={`M ${1098 + i * 144} ${146 - i * 5} q -8 40 21 42 q 32 2 28 -35`}
            fill="none"
            stroke={ink.brass}
            strokeWidth="8"
          />
        ))}
        <path
          d="M 1410 205 Q 1434 173 1478 182 L 1524 223 L 1568 384 L 1540 403 L 1514 362 L 1528 540 Q 1471 565 1391 547 L 1392 372 L 1362 417 L 1330 403 L 1374 240 Z"
          fill={ink.indigo}
        />
        <path
          d="M 1430 202 L 1453 242 L 1484 201 M 1454 242 L 1452 523 M 1392 375 L 1409 313"
          stroke={ink.lilac}
          strokeWidth="3"
          fill="none"
        />
        <path d="M -65 837 Q 962 677 2002 705 V 1080 H -65 Z" fill="#8b929c" />
        <SaltRing x={784} y={855} rx={159} ry={47} f={m.f} color={ink.milk} />
        <g
          transform={`translate(${1204 - 91 * m.turn(0, 56)} ${787 + 32 * m.turn(1, 38)}) rotate(-8)`}
        >
          <path d="M -26 -30 H 301 V 99 L 12 126 Z" fill={ink.milk} />
          <Letter x={-1} y={17} size={27} fill={ink.navy}>
            Повторный приём
          </Letter>
          <path
            d="M 9 44 H 255 M 12 76 H 155"
            stroke={ink.glass}
            strokeWidth="2"
          />
        </g>
        <Key
          x={1225 - 32 * m.turn(2, 32)}
          y={879 + 4 * wave(m.f, 0.039)}
          angle={-19}
          s={1.05}
        />
      </g>
      <Bloom
        x={604 + 60 * m.p}
        y={488}
        rx={445}
        ry={315}
        color={ink.milk}
        opacity={0.25}
      />
      <Shade y={897} height={183} alpha={0.75} />
      <Caption
        x={109}
        y={1005}
        size={43}
        f={m.f - 19}
        lines={["Survivors would need care for years."]}
      />
      <Motes f={m.f} seed={16} n={56} drift={0.49} alpha={0.62} />
    </Plate>
  );
}

export function Coda() {
  const m = useShot("coda"),
    open = between(m.f, 0, 49);
  const tail = between(m.p, 0.61, 1);
  const ringLum = clamp((m.db + 70) / 42);
  return (
    <Plate>
      <SkyWater f={m.f * 0.51} h={641} side={24} rough={0.48} />
      <Wash colors={["#8b93ab", "#d9c4bf", "#e9caac"]} h={508} alpha={0.54} />
      <Drapery
        x={1629 + open * 103}
        y={-35}
        w={291}
        h={719}
        f={m.f * 0.63}
        swing={1.5}
        color={ink.milk}
        alpha={0.42}
      />
      <g transform={`translate(${-34 * m.p} ${11 * m.p})`}>
        <SaltRing
          x={1416}
          y={520}
          rx={268}
          ry={225}
          p={0.61 + open * 0.35}
          f={m.f}
          color={ink.milk}
        />
        <SaltRing
          x={1485}
          y={531}
          rx={214}
          ry={185}
          p={0.49 + open * 0.36}
          f={m.f * 0.62}
          color={ink.glass}
        />
        <Bloom
          x={1386}
          y={567}
          rx={447}
          ry={272}
          color={ink.milk}
          opacity={0.13 + ringLum * 0.12}
        />
      </g>
      <g
        opacity={0.54 + open * 0.46}
        transform={`translate(${(1 - open) * -21} 0)`}
      >
        <Letter x={105} y={440} size={135} serif fill={ink.night}>
          Salt on Glass
        </Letter>
        <Letter x={118} y={516} size={41} italic fill={ink.deep}>
          17–18 September 2041
        </Letter>
      </g>
      <Motes f={m.f * 0.65} n={42} drift={0.6} alpha={0.49} />
      <rect width="1920" height="1080" fill={ink.night} opacity={tail * 0.96} />
    </Plate>
  );
}

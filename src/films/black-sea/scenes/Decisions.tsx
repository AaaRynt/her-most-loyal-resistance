import { useId } from "react";
import sovietFlag from "../soviet-flag.svg";
import {
  Bloom,
  Caption,
  Etch,
  ink,
  Letter,
  Motes,
  Plate,
  RainGlass,
  Shade,
  SkyWater,
  Vessel,
  Wash,
} from "../art";
import { Drapery, Hand, Lamp, Person } from "../objects";
import { between, count, random, useShot, wave } from "../score";

export function Hotline() {
  const m = useShot("hotline");
  const move = between(m.f, 4, 55);
  return (
    <Plate>
      <Wash colors={["#334264", "#575977", "#a48d99"]} side />
      <Bloom
        x={794}
        y={301}
        rx={709}
        ry={427}
        color={ink.lilac}
        opacity={0.52}
      />
      <path
        d="M -84 318 Q 582 197 1050 265 T 2010 174 M -84 350 Q 589 238 1058 299 T 2010 213"
        stroke={ink.glass}
        strokeWidth="3.6"
        fill="none"
        opacity=".45"
      />
      <g transform={`translate(${121 - m.p * 30} 150) rotate(-8 820 430)`}>
        <path
          d="M 58 278 L 937 198 Q 984 195 998 233 L 1103 586 Q 1113 626 1060 645 L 189 738 Q 148 744 131 705 L 29 333 Q 21 297 58 278 Z"
          fill={ink.night}
          opacity=".56"
          transform="translate(17 25)"
        />
        <Etch
          d="M 58 266 L 937 186 Q 984 183 998 221 L 1103 574 Q 1113 614 1060 633 L 189 726 Q 148 732 131 693 L 29 321 Q 21 285 58 266 Z"
          fill="#536a83"
          line={ink.lapis}
          spacing={7}
          angle={34}
          opacity={0.56}
        />
        <path
          d="M 128 330 L 917 259 Q 932 258 942 277 L 976 399 L 169 484 Z"
          fill={ink.deep}
          stroke={ink.mist}
          strokeWidth="3"
        />
        <Letter x={194} y={404} size={48} fill={ink.mist} italic>
          Ligne ouverte
        </Letter>
        {count(4).map((i) => {
          const y = 543 + i * 24;
          return (
            <path
              key={i}
              d={`M 233 ${y} l 626 -65`}
              stroke={ink.deep}
              strokeWidth="6"
              strokeDasharray="2 10"
            />
          );
        })}
        {count(24).map((i) => {
          const h =
            5 + (0.5 + 0.5 * wave(m.f, 0.068, i * 0.62)) * (12 + m.air * 35);
          return (
            <path
              key={i}
              d={`M ${575 + i * 12.3} ${385 - i * 0.99 - h} v ${h}`}
              stroke={ink.glass}
              strokeWidth="4.3"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <g
        transform={`translate(${1275 - 56 * move} ${227 - 39 * move}) rotate(${11 - 13 * move})`}
      >
        <path
          d="M 38 91 C 96 62 154 98 174 154 C 204 236 185 349 151 406 Q 143 427 116 430 l -58 -4 Q 30 416 44 380 l 33 -57 C 104 248 99 217 62 183 L 8 151 Q -8 136 8 115 Z"
          fill={ink.deep}
          stroke={ink.mist}
          strokeWidth="4"
        />
        <path
          d="M 31 107 Q 85 86 119 123 M 103 398 l 31 -17"
          fill="none"
          stroke={ink.glass}
          strokeWidth="5"
        />
        <path
          d={`M 96 426 C ${29 - 62 * move} 555 255 612 208 779`}
          fill="none"
          stroke={ink.deep}
          strokeWidth="11"
        />
        <Hand x={95} y={274} s={0.78} f={m.f} angle={-19} />
      </g>
      <Shade y={715} height={365} alpha={1} />
      <Caption
        x={110}
        y={901}
        size={45}
        f={m.f}
        lines={[
          "Paris announced a pause in nuclear operations.",
          "Moscow waited for confirmation.",
        ]}
      />
    </Plate>
  );
}

export function Shelter() {
  const m = useShot("shelter");
  return (
    <Plate>
      <Wash colors={["#5c7892", "#9cabb9", "#d5bec0"]} />
      <g transform={`translate(${-82 * m.p} 0)`}>
        {count(8).map((i) => {
          const x = i * 281 - 100;
          return (
            <g key={i}>
              <path
                d={`M ${x} -64 q 14 231 57 306 l -12 ${369 - i * 7} h 40 l 12 ${-374 + i * 7} q 17 -89 177 -189 V 8 q -147 72 -197 197 q -23 -99 -15 -269 Z`}
                fill={i % 2 ? ink.navy : ink.deep}
                opacity=".84"
              />
              <path
                d={`M ${x + 65} 220 Q ${x + 103} 105 ${x + 273} 25`}
                stroke={ink.glass}
                strokeWidth="6"
                fill="none"
              />
            </g>
          );
        })}
        <path d="M -75 684 L 2077 531 V 1090 H -75 Z" fill="#74869c" />
        <path
          d="M -96 685 L 2088 526 M -78 829 L 2082 590"
          stroke={ink.mist}
          strokeWidth="4"
        />
        {count(12).map((i) => (
          <path
            key={i}
            d={`M ${-289 + i * 211} 1090 L ${322 + i * 156} ${652 - i * 8}`}
            fill="none"
            stroke={ink.navy}
            opacity=".49"
            strokeWidth="3"
          />
        ))}
        {count(8).map((i) => {
          const x =
            206 + i * 223 + (i % 2 === 0 ? 1 : -1) * m.p * (23 + 11 * i);
          return (
            <Person
              key={i}
              x={x}
              y={646 - i * 11 + random(i + 4) * 25}
              s={0.6 + random(i + 9) * 0.34}
              face={i % 3 === 1 ? -1 : 1}
              f={m.f + i * 13}
              walk={i % 3 ? 0.32 : 0.69}
              bag={i % 2 === 0}
              coat={[ink.indigo, ink.navy, ink.lilac][i % 3]}
              seed={i}
            />
          );
        })}
      </g>
      <g transform={`translate(${-76 * m.p} 0)`}>
        <Person
          x={1270}
          y={854}
          s={1.47}
          f={m.f}
          pose="carry"
          coat={ink.deep}
          bag
          face={-1}
        />
        <Person
          x={1032 + 18 * m.p}
          y={877}
          s={0.82}
          f={m.f}
          pose="reach"
          coat={ink.rose}
        />
        <path
          d="M 1229 789 Q 1316 774 1391 794 L 1408 896 Q 1334 912 1241 901 Z"
          fill={ink.navy}
          stroke={ink.mist}
          strokeWidth="3"
        />
        <path
          d="M 1280 792 q -6 -37 37 -35 q 23 0 25 30"
          stroke={ink.peach}
          strokeWidth="5"
          fill="none"
        />
      </g>
      <Motes f={m.f} n={31} seed={4} alpha={0.27} />
    </Plate>
  );
}

export function Cabinet() {
  const m = useShot("cabinet");
  const clip = useId();
  return (
    <Plate>
      <Wash colors={["#6d7095", "#9891aa", "#aba6b2"]} side />
      <g transform={`translate(${71 - 65 * m.p} 0)`}>
        <path d="M 591 -92 H 1738 L 1664 571 L 651 632 Z" fill={ink.deep} />
        <defs>
          <clipPath id={clip}>
            <path d="M 631 -17 H 1690 L 1633 539 L 678 589 Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clip})`}>
          <Wash
            x={603}
            y={-14}
            w={1130}
            h={665}
            colors={["#657391", "#c5b5b5"]}
          />
          <path
            d="M 638 402 Q 865 367 1052 388 L 1124 348 L 1197 372 L 1268 328 L 1355 353 L 1497 317 L 1564 349 L 1691 311 V 628 H 638 Z"
            fill={ink.navy}
            opacity=".65"
          />
          <RainGlass f={m.f} area={1750} seed={9} amount={67} opacity={0.5} />
          <path
            d="M 996 -50 L 1010 622 M 1358 -42 L 1331 579 M 657 220 L 1690 192"
            stroke={ink.deep}
            strokeWidth="10"
          />
        </g>
        <image
          href={sovietFlag}
          x="166"
          y="231"
          width="232"
          height="116"
          opacity=".79"
        />
        <path
          d="M 166 231 H 398 V 347 H 166 Z"
          fill={ink.indigo}
          opacity=".30"
        />
        <path
          d="M 155 359 H 414"
          stroke={ink.mist}
          strokeWidth="5"
          opacity=".65"
        />
        <Person
          x={1521}
          y={642}
          s={1.7}
          f={m.f + 10}
          face={-1}
          coat={ink.indigo}
        />
        <Person x={568} y={667} s={1.46} f={m.f} coat={ink.deep} />
        <path
          d="M 94 722 Q 405 516 1029 532 Q 1637 520 1874 674 L 1874 826 Q 1336 986 319 917 L 75 813 Z"
          fill="#596581"
          stroke={ink.deep}
          strokeWidth="5"
        />
        <path
          d="M 143 743 Q 857 927 1798 726"
          stroke={ink.mist}
          opacity=".62"
          strokeWidth="5"
          fill="none"
        />
        <path d="M 862 626 L 1120 605 l 75 89 -271 33 Z" fill={ink.lilac} />
        <g transform="translate(892 647) rotate(-5)">
          <Letter x={0} y={0} size={23} fill={ink.deep} weight={600}>
            Особое мнение
          </Letter>
          <path
            d="M 8 15 h 155 m -147 16 h 119"
            fill="none"
            stroke={ink.navy}
            strokeWidth="2.4"
          />
        </g>
        <Drapery
          x={1611}
          y={-34}
          w={307}
          h={687}
          f={m.f + 34}
          color={ink.lilac}
          alpha={0.73}
        />
      </g>
      <Shade y={694} height={386} alpha={0.93} />
      <Caption
        x={108}
        y={917}
        f={m.f}
        head="MOSCOW"
        size={43}
        lines={["Moscow saw the strike", "as an attack on Soviet soil."]}
      />
    </Plate>
  );
}

export function President() {
  const m = useShot("president");
  const breath = wave(m.f, 0.028) * 3;
  return (
    <Plate>
      <Wash colors={["#263955", "#4f537b", "#99859a"]} side />
      <g opacity=".65">
        <path
          d="M 475 -81 L 736 -81 L 311 1014 L 19 1095 Z M 1123 -26 L 1276 -12 L 842 1090 L 650 1090 Z"
          fill={ink.lilac}
          opacity=".39"
        />
        {count(14).map((i) => (
          <path
            key={i}
            d={`M ${600 + i * 89 + m.p * 50} -64 l -478 1224`}
            stroke={i % 3 ? ink.lilac : ink.glass}
            strokeWidth={i % 3 ? 3 : 10}
            strokeOpacity=".40"
          />
        ))}
      </g>
      <g
        transform={`translate(${1295 - 45 * m.p} ${446 + breath}) scale(1.21) rotate(${-3 + between(m.f, 24, 100) * 4.8})`}
      >
        <path
          d="M 23 130 Q -34 157 -86 165 C -159 188 -201 270 -242 480 H 369 Q 309 289 277 222 C 252 171 174 148 121 130 Z"
          fill={ink.navy}
          stroke={ink.deep}
          strokeWidth="4"
        />
        <Etch
          d="M 20 137 L -77 170 L -144 253 L -83 239 L -93 288 L -7 385 L 24 247 Z M 120 139 L 220 177 L 271 269 L 189 243 L 206 293 L 115 381 L 55 229 Z"
          fill={ink.indigo}
          line={ink.glass}
          spacing={8}
          angle={-21}
          opacity={0.47}
        />
        <path
          d="M -16 89 L -3 157 L 46 208 L 127 154 L 112 81 Z"
          fill="#be9693"
        />
        <path
          d="M -107 -136 C -91 -211 2 -249 81 -216 C 147 -193 166 -120 151 -54 L 140 4 Q 126 43 117 94 L 87 139 L 30 151 Q -24 148 -56 122 L -69 94 Q -92 92 -99 76 L -99 57 L -118 50 L -111 19 Q -145 16 -144 4 L -114 -51 L -116 -83 Z"
          fill="#d4aaa1"
          stroke={ink.deep}
          strokeWidth="3.2"
        />
        <path
          d="M -95 -176 Q -28 -260 84 -224 Q 155 -199 174 -119 Q 216 -130 229 -90 Q 244 -42 214 -13 Q 179 18 156 3 Q 140 80 119 98 L 103 69 C 132 23 120 -9 109 -27 C 88 -53 96 -100 70 -128 L 50 -126 Q 1 -148 -38 -152 L -101 -119 L -121 -78 Q -143 -127 -95 -176 Z"
          fill={ink.deep}
        />
        {count(12).map((i) => (
          <path
            key={i}
            d={`M ${-110 + i * 14} ${-137 - (i % 3) * 10} Q ${24 + i * 9} ${-243 + i * 2} ${130 + i * 3} ${-129 + i * 7}`}
            stroke={i % 3 === 0 ? ink.mist : ink.lilac}
            opacity={0.45 - i * 0.015}
            strokeWidth={i % 3 === 0 ? 2.3 : 1.4}
            fill="none"
          />
        ))}
        <path
          d="M -107 -65 q 17 -12 43 -9 M -109 -43 q 16 -5 26 -2 M -104 60 q 14 5 26 2 M -42 108 q 32 16 68 7 M 99 -27 q -13 -18 -23 6 q -3 22 13 25"
          fill="none"
          stroke="#825f72"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M -102 -47 l 9 1" stroke={ink.night} strokeWidth="4" />
        <path
          d="M 84 8 q -1 12 7 14 q 12 -1 10 -12"
          fill="none"
          stroke={ink.milk}
          strokeWidth="3.3"
        />
        <path
          d="M -2 150 L 43 197 L 115 148 L 124 173 L 79 222 L 44 207 L 17 220 L -16 166 Z"
          fill={ink.mist}
        />
        <path d="M 127 254 l 73 26 -65 14 Z" fill={ink.rose} opacity=".8" />
      </g>
      <Shade y={713} height={367} alpha={0.95} />
      <Caption
        x={107}
        y={812}
        size={55}
        f={m.f}
        lines={[
          "President Kravtsova authorized",
          "one retaliatory nuclear strike.",
        ]}
      />
      <Motes f={m.f} n={24} seed={12} alpha={0.21} />
    </Plate>
  );
}

export function London() {
  const m = useShot("london"),
    close = between(m.f, 40, 131);
  return (
    <Plate>
      <Wash colors={["#243754", "#4b5c7c", "#9ca1af"]} />
      <g transform={`translate(${-19 * m.p} 0)`}>
        <path
          d="M 0 488 L 167 444 L 310 448 L 339 394 L 384 397 L 431 450 H 544 V 420 H 585 L 611 437 L 694 425 V 299 L 718 270 L 723 222 L 739 269 L 758 298 V 422 L 908 432 L 998 403 L 1199 422 L 1302 376 L 1397 406 L 1512 387 L 1662 420 L 1793 351 L 1941 396 V 655 H 0 Z"
          fill="#314564"
        />
        {count(50).map((i) => (
          <rect
            key={i}
            x={i * 41}
            y={465 + random(i) * 32}
            width={5 + random(i + 4) * 9}
            height="4"
            fill={ink.peach}
            opacity={0.18 + 0.52 * random(i + 8)}
          />
        ))}
        <path
          d="M -42 508 H 1970 M -40 542 Q 1031 501 1951 518"
          fill="none"
          stroke={ink.lilac}
          strokeWidth="2"
        />
        <RainGlass f={m.f} seed={13} amount={100} opacity={0.56} />
        <path
          d="M 0 0 H 1920 V 39 H 0 Z M 326 -29 h 25 v 630 h -25 Z M 1053 -25 h 20 v 627 h -20 Z M 1813 -31 h 36 v 610 h -36 Z"
          fill={ink.deep}
        />
      </g>
      <path d="M 0 636 Q 1026 519 1920 553 V 1080 H 0 Z" fill="#434e6d" />
      <Bloom
        x={1430}
        y={669}
        rx={542}
        ry={250}
        color={ink.peach}
        opacity={0.59}
      />
      <g
        transform={`translate(${1107 - 38 * m.p} ${604 + 4 * wave(m.f, 0.022)}) rotate(-6)`}
      >
        <path
          d="M 31 23 L 574 -13 L 617 185 L 59 240 Z"
          fill={ink.deep}
          opacity=".68"
        />
        <path
          d="M 0 0 L 548 -29 L 590 163 L 44 213 Z"
          fill={ink.navy}
          stroke={ink.glass}
          strokeWidth="3"
        />
        <path d="M 29 9 L 525 -17 L 561 143 L 61 193 Z" fill={ink.mist} />
        <path
          d="M 61 78 l 379 -21 M 74 105 l 258 -14"
          fill="none"
          stroke={ink.lapis}
          strokeWidth="3"
        />
        <path
          d={`M 0 0 L 547 -30 L ${509 + 79 * close} ${-172 + 333 * close} L ${-57 + 100 * close} ${-148 + 356 * close} Z`}
          fill={ink.indigo}
          stroke={ink.lilac}
          strokeWidth="3"
        />
        {close > 0.69 && (
          <Letter
            x={81}
            y={110}
            size={38}
            serif
            fill={ink.mist}
            alpha={between(close, 0.69, 1)}
          >
            Cabinet Office
          </Letter>
        )}
      </g>
      <Lamp x={1581} y={221} s={1.3} lit={0.86} />
      <Shade y={730} height={350} alpha={0.91} />
      <Caption
        x={109}
        y={867}
        head="LONDON"
        size={46}
        f={m.f}
        lines={[
          "Britain stayed on full alert.",
          "Its prime minister declined to authorize a nuclear strike.",
        ]}
      />
    </Plate>
  );
}

export function Limits() {
  const m = useShot("limits");
  return (
    <Plate>
      <SkyWater f={m.f + 210} h={478} night side={11} rough={0.84} />
      <g transform={`translate(${155 + m.p * 210} ${wave(m.f, 0.03) * 4})`}>
        <Vessel x={730} y={621} s={1.56} f={m.f} dark />
        <path
          d="M 552 502 Q 623 483 691 501 L 696 543 L 552 548 Z"
          fill={ink.milk}
        />
        <path
          d="M 608 501 h 14 v 12 h 13 v 12 h -13 v 14 h -14 v -14 h -13 v -12 h 13 Z"
          fill={ink.rose}
        />
      </g>
      <g transform={`translate(${-71 * m.p} 0)`}>
        <path
          d="M -150 933 Q 278 839 507 865 T 1097 827 T 2100 778 V 1090 H -150 Z"
          fill={ink.deep}
          opacity=".71"
        />
        {count(10).map((i) => (
          <path
            key={i}
            d={`M ${-165 + i * 139} ${905 + wave(m.f, 0.025, i) * 11} q 202 -80 399 -25 t 353 -5`}
            stroke={i % 3 ? ink.sea : ink.mist}
            opacity=".49"
            strokeWidth={(i % 3) + 1.6}
            fill="none"
          />
        ))}
      </g>
      <Shade y={786} height={294} alpha={0.77} />
      <Caption
        x={110}
        y={906}
        f={m.f}
        size={45}
        lines={[
          "Paris and Moscow halted nuclear strikes.",
          "There was no third detonation.",
        ]}
      />
      <Motes f={m.f} n={26} seed={15} alpha={0.25} />
    </Plate>
  );
}

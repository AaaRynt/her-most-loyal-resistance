import { useId } from "react";
import {
  Bloom,
  Caption,
  Crane,
  Etch,
  Hills,
  ink,
  Letter,
  Motes,
  Plate,
  Quayside,
  Ropes,
  Shade,
  SkyWater,
  Vessel,
  Wash,
} from "../art";
import { Bed, Drapery, Enamel, Hand, Lamp, Person, SaltRing } from "../objects";
import { between, count, random, useShot, wave } from "../score";

export function Soundings() {
  const m = useShot("soundings");
  const bob = wave(m.f, 0.026) * 11;
  return (
    <Plate>
      <SkyWater f={m.f} h={604} />
      <g transform={`translate(${20 - m.p * 96} ${-3 * m.p})`}>
        <Vessel x={1253 + m.p * 68} y={601} s={0.63} f={m.f} />
        <Crane x={1848} y={597} s={0.44} f={m.f} inkColor="#6d8195" />
      </g>
      {count(9).map((i) => {
        const x = 149 + i * 167 + m.p * 59;
        return (
          <path
            key={i}
            d={`M ${x} ${194 + Math.sin(i) * 34} q 9 -5 16 1 q 8 -9 18 -8`}
            stroke={ink.navy}
            strokeWidth={1.6 + (i % 3) * 0.4}
            fill="none"
            opacity=".55"
            transform={`translate(0 ${wave(m.f, 0.036, i) * 11})`}
          />
        );
      })}
      <g
        transform={`translate(${1390 - m.p * 88} ${780 + bob}) rotate(${-7 + wave(m.f, 0.018) * 3})`}
      >
        <Ropes
          x={-288}
          y={70}
          width={1050}
          bend={287}
          f={m.f}
          size={42}
          colors={[ink.deep, ink.glass]}
        />
        <path
          d="M -125 181 Q -163 102 -112 75 Q -90 62 -90 28 L -71 -49 Q -14 -76 58 -54 L 80 29 Q 83 57 115 76 Q 157 105 113 180 Q 5 224 -125 181 Z"
          fill={ink.rose}
          stroke={ink.deep}
          strokeWidth="5"
        />
        <Etch
          d="M -125 181 Q -158 119 -126 89 Q -8 145 127 87 Q 145 126 113 180 Q -1 223 -125 181 Z"
          fill={ink.navy}
          line={ink.glass}
          spacing={8}
          angle={-20}
        />
        <ellipse
          cy="-48"
          rx="68"
          ry="22"
          fill={ink.peach}
          stroke={ink.deep}
          strokeWidth="5"
        />
        <path
          d="M -21 -57 q -12 -29 6 -40 q 24 -12 33 10 l 6 32"
          fill="none"
          stroke={ink.deep}
          strokeWidth="12"
        />
        <path
          d="M -87 14 Q -35 43 70 16"
          fill="none"
          stroke={ink.milk}
          strokeWidth="7"
          opacity=".67"
        />
        <path
          d="M -110 82 q 15 17 32 9 M 33 61 l 12 -7 -2 9"
          fill="none"
          stroke={ink.peach}
          strokeWidth="4"
        />
      </g>
      <g opacity={0.92} transform={`translate(${45 - 52 * m.p} 0)`}>
        <path
          d="M 0 937 Q 187 889 348 932 T 731 947 T 1170 971 T 1624 956 T 1971 955 V 1090 H 0 Z"
          fill={ink.deep}
          opacity=".59"
        />
        {count(6).map((i) => (
          <path
            key={i}
            d={`M -80 ${963 + i * 14} q 193 -63 372 -22 t 391 22 t 420 8 t 444 -7 t 515 -6`}
            stroke={ink.glass}
            strokeWidth={(i % 3) + 1.1}
            fill="none"
            opacity={0.54 - i * 0.035}
            transform={`translate(${wave(m.f, 0.024, i) * 21} 0)`}
          />
        ))}
      </g>
      <g transform={`translate(${(1 - between(m.f, 0, 44)) * -29} 0)`}>
        <Letter x={108} y={301} size={40} fill={ink.night} space={3.6}>
          SEPTEMBER 2041
        </Letter>
        <Letter x={100} y={440} size={140} serif fill={ink.night}>
          The Black Sea
        </Letter>
      </g>
      <Motes f={m.f} n={30} alpha={0.24} />
    </Plate>
  );
}

export function Quay() {
  const m = useShot("quay");
  const x = 108 - m.p * 164;
  return (
    <Plate>
      <SkyWater f={m.f} h={454} rough={0.82} />
      <Quayside x={-212 - m.p * 37} y={460} s={0.85} f={m.f} />
      <Vessel x={1262 + m.p * 79} y={535} s={0.79} f={m.f} />
      <path d="M -100 714 L 2010 575 L 2025 718 L -95 927 Z" fill={ink.navy} />
      <Etch
        d="M -95 750 L 2010 630 V 1111 H -95 Z"
        fill="#72889b"
        line={ink.milk}
        spacing={14}
        opacity={0.22}
      />
      {count(11).map((i) => (
        <path
          key={i}
          d={`M ${-260 + i * 232 - m.p * 91} 1090 L ${322 + i * 201 - m.p * 75} ${742 - i * 10}`}
          stroke={ink.deep}
          strokeWidth="3"
          opacity=".64"
        />
      ))}
      <g transform={`translate(${x} 0)`}>
        <path
          d="M -116 825 Q 164 850 414 732 T 966 683"
          fill="none"
          stroke={ink.night}
          strokeWidth="27"
        />
        <path
          d="M -116 825 Q 164 850 414 732 T 966 683"
          fill="none"
          stroke={ink.glass}
          strokeWidth="16"
          strokeDasharray="4 18"
        />
        <Person
          x={784 + m.p * 173}
          y={631}
          s={0.94}
          f={m.f}
          walk={0.96}
          hat
          pose="rest"
          coat={ink.indigo}
        />
        <Person
          x={1485 - m.p * 77}
          y={566}
          s={0.64}
          f={m.f + 29}
          walk={0.47}
          face={-1}
          coat={ink.sea}
        />
        <g transform={`translate(330 ${695 + m.beat * 2})`}>
          <path
            d="M -151 109 Q -116 67 -73 59 L -59 -58 Q -77 -85 -90 -96 Q -85 -122 5 -126 Q 91 -129 116 -101 Q 121 -85 98 -73 L 81 49 Q 124 72 146 98 L 152 121 Q -10 167 -151 129 Z"
            fill={ink.deep}
            stroke={ink.night}
            strokeWidth="5"
          />
          <ellipse
            cx="13"
            cy="-104"
            rx="105"
            ry="25"
            fill={ink.lapis}
            stroke={ink.mist}
            strokeWidth="3"
          />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M ${-82 - i * 2} ${-41 + i * 23} q 105 36 187 -8`}
              stroke={i % 2 ? ink.glass : ink.mist}
              strokeWidth="14"
              fill="none"
            />
          ))}
        </g>
        <Enamel
          x={1129}
          y={729}
          s={0.76}
          f={m.f}
          tilt={-2 + wave(m.f, 0.025) * 0.6}
        />
      </g>
      <Ropes
        x={-180}
        y={179}
        width={2450}
        bend={176}
        f={m.f}
        size={9}
        colors={[ink.navy, ink.mist]}
      />
      <Motes f={m.f} n={28} seed={2} />
    </Plate>
  );
}

export function Ward() {
  const m = useShot("ward");
  return (
    <Plate>
      <Wash colors={["#748ca6", "#a7b9c1", "#657f92"]} />
      <path d="M 0 0 H 1920 L 1192 406 H 774 Z" fill="#9aabb7" />
      <path d="M 0 1080 L 776 557 H 1182 L 1920 1080 Z" fill="#7b95a3" />
      {count(6).map((i) => {
        const k = (i + 0.5) / 6,
          lo = 1 - k * 0.82;
        return (
          <g
            key={i}
            transform={`translate(${963 + 35 * m.p} 484) scale(${lo})`}
          >
            <path
              d="M -1060 590 v -1155 H 1058 V 590"
              stroke={i % 2 ? ink.mist : ink.navy}
              strokeWidth={12}
              strokeOpacity={0.54}
              fill="none"
            />
            <path
              d="M -388 -526 h 755"
              stroke={ink.milk}
              strokeWidth="14"
              opacity=".73"
            />
          </g>
        );
      })}
      <g transform={`translate(${-m.p * 83} 0)`}>
        <Drapery x={20} y={-73} w={275} h={898} f={m.f} alpha={0.86} />
        <Drapery
          x={611}
          y={187}
          w={135}
          h={423}
          f={m.f + 40}
          alpha={0.87}
          color={ink.glass}
        />
        <Drapery
          x={1305}
          y={81}
          w={273}
          h={608}
          f={m.f + 64}
          alpha={0.86}
          color={ink.mist}
        />
        <Bed x={1361 - m.p * 46} y={635} s={0.63} f={m.f} blanket={ink.lilac} />
        <Person
          x={1130}
          y={577 + wave(m.f, 0.029) * 2}
          s={0.6}
          f={m.f}
          pose="carry"
          coat={ink.lapis}
        />
        <Bed x={701 + m.p * 268} y={799} s={1.47} f={m.f} blanket={ink.sea} />
        <Person
          x={354 + m.p * 240}
          y={771}
          s={1.25}
          f={m.f}
          walk={0.78}
          pose="carry"
          coat={ink.mist}
          hat
        />
      </g>
      <Shade y={770} height={310} alpha={0.92} />
      <g
        transform={`translate(${1288 - m.p * 21} 208) rotate(${-1 + wave(m.f, 0.024) * 0.38} 170 0)`}
      >
        <path
          d="M 24 -216 V -7 M 355 -216 V -7"
          stroke={ink.navy}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M -9 -10 H 388 V 52 H -9 Z"
          fill={ink.mist}
          stroke={ink.navy}
          strokeWidth="3"
        />
        <path d="M 11 4 V 39" stroke={ink.rose} strokeWidth="5" />
        <Letter x={25} y={32} size={37} fill={ink.deep} weight={600}>
          Évacuation sanitaire
        </Letter>
      </g>
      <Caption
        x={117}
        y={986}
        size={43}
        lines={["French field hospitals were full."]}
        f={m.f}
      />
    </Plate>
  );
}

export function Dissent() {
  const m = useShot("dissent"),
    clip = useId();
  const slip = between(m.f, 10, 65);
  return (
    <Plate base={ink.navy}>
      <Wash colors={["#383e65", "#707088", "#b79694"]} side />
      <Bloom x={544} y={250} rx={885} ry={553} color="#c7cdd3" opacity={0.58} />
      <g
        transform={`translate(${94 + m.p * 73} ${135 - 16 * m.p}) rotate(-7 490 390)`}
      >
        <path
          d="M 46 69 Q 507 59 1017 7 L 1103 669 L 119 779 Z"
          fill={ink.deep}
          opacity=".62"
        />
        <path
          d="M 12 42 L 1024 -12 L 1094 630 Q 615 696 90 730 Z"
          fill={ink.lilac}
        />
        <path d="M 26 23 L 990 -34 L 1047 605 L 75 694 Z" fill={ink.mist} />
        <path
          d="M -2 5 L 950 -53 L 1015 573 Q 637 647 51 668 Z"
          fill={ink.milk}
        />
        <Letter x={88} y={136} size={72} serif fill={ink.deep}>
          Évacuer les blessés
        </Letter>
        <path d="M 91 160 L 901 108" stroke={ink.sea} strokeWidth="3" />
        {count(8).map((i) => (
          <path
            key={i}
            d={`M 102 ${230 + i * 37} q 140 4 218 -8 t 195 -12 t ${153 + (i % 3) * 53} -8`}
            stroke={i % 3 === 0 ? ink.indigo : ink.sea}
            strokeWidth={i % 3 === 0 ? 3.5 : 2}
            strokeDasharray="35 8 12 6 19 7"
            opacity=".52"
            fill="none"
          />
        ))}
        <defs>
          <clipPath id={clip}>
            <rect x="76" y="269" height="224" width={920 * slip} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clip})`}>
          <path
            d="M 88 419 Q 72 314 259 304 C 500 284 637 303 607 372 Q 585 423 222 432 Q 127 431 99 411"
            fill="none"
            stroke={ink.rose}
            strokeWidth="6"
          />
        </g>
        <SaltRing x={844} y={461} rx={84} ry={64} color={ink.brass} f={m.f} />
      </g>
      <Hand
        x={1392 - 185 * slip}
        y={419 + 32 * m.p}
        s={1.2}
        angle={-17}
        f={m.f}
      />
      <Shade y={755} height={325} alpha={0.81} />
      <Caption
        x={112}
        y={991}
        size={43}
        f={m.f}
        lines={["The wounded could still be evacuated."]}
      />
    </Plate>
  );
}

export function Paris() {
  const m = useShot("paris");
  return (
    <Plate>
      <Wash colors={["#788aa6", "#a3a5b7", "#e8bb9e"]} />
      <Hills f={m.f} y={520} side={6} />
      <g transform={`translate(${-52 * m.p} 0)`}>
        {count(17).map((i) => {
          const h = 70 + random(93 + i) * 114;
          return (
            <g key={i}>
              <path
                d={`M ${i * 122 - 160} 565 v ${-h} l 21 -20 h 87 l 19 15 v ${h + 30} Z`}
                fill={i % 3 ? ink.lapis : ink.navy}
                opacity=".65"
              />
              <path
                d={`M ${i * 122 - 146} ${555 - h + 26} h 94`}
                stroke={ink.milk}
                strokeWidth="7"
                strokeDasharray="8 10"
                opacity=".65"
              />
            </g>
          );
        })}
        <path
          d="M 114 -48 L 97 669 M 539 -44 L 523 578 M 1052 -42 L 1035 545 M 1613 -38 L 1602 581"
          stroke={ink.deep}
          strokeWidth="19"
        />
        <path
          d="M -50 265 Q 938 189 2119 228"
          stroke={ink.mist}
          strokeWidth="8"
          fill="none"
        />
      </g>
      <Etch
        d="M 0 672 C 432 494 1523 460 1920 610 V 1080 H 0 Z"
        fill="#52516b"
        line={ink.lilac}
        angle={84}
        spacing={12}
        opacity={0.3}
      />
      <path
        d="M -24 671 C 481 493 1450 459 1950 611"
        fill="none"
        stroke={ink.peach}
        strokeWidth="8"
      />
      <g transform="translate(766 503)">
        <ellipse cy="38" rx="43" ry="8" fill={ink.deep} />
        <path d="M 0 34 V -144" stroke={ink.deep} strokeWidth="4" />
        {["#526787", ink.milk, "#b37881"].map((color, i) => {
          const dx = i * 41,
            y = (u: number) => wave(m.f, 0.046, u * 0.045) * 6 + u * 0.08;
          return (
            <path
              key={color}
              d={`M ${dx} ${-139 + y(dx)} Q ${dx + 21} ${-139 + y(dx + 21)} ${dx + 41} ${-139 + y(dx + 41)} v 54 Q ${dx + 21} ${-85 + y(dx + 21)} ${dx} ${-85 + y(dx)} Z`}
              fill={color}
            />
          );
        })}
      </g>
      <g
        transform={`translate(${1076 - 32 * m.p} ${586 - 16 * m.turn(1)}) rotate(8)`}
      >
        <path
          d="M 0 20 L 440 31 L 480 195 L -27 170 Z"
          fill={ink.deep}
          opacity=".45"
        />
        <path d="M 2 2 L 436 23 L 478 174 L -26 153 Z" fill={ink.mist} />
        <path d="M 2 2 L 20 -4 L 440 15 L 436 23 Z" fill={ink.white} />
        <Letter x={35} y={81} size={32} fill={ink.deep} serif>
          Premier ministre
        </Letter>
        <path d="M 36 100 l 295 16" stroke={ink.sea} strokeWidth="2" />
      </g>
      <Hand
        x={1557 - 174 * m.turn(0, 34)}
        y={671 + 22 * m.turn(2, 30)}
        s={1.08}
        angle={-11}
        f={m.f}
      />
      <Lamp x={654} y={97} s={0.73} lit={0.63} />
      <Shade y={699} height={381} alpha={0.82} />
      <Caption
        x={108}
        y={858}
        head="PARIS · SIXTH REPUBLIC"
        size={48}
        f={m.f}
        lines={[
          "France’s prime minister authorized",
          "the first nuclear strike.",
        ]}
      />
      <Motes f={m.f} n={22} seed={3} alpha={0.27} />
    </Plate>
  );
}

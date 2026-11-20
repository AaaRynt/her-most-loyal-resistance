import { useId } from "react";
import {
  c,
  Dial,
  Field,
  Figure,
  InkGrain,
  Lattice,
  noise,
  range,
  Ribbon,
  Text,
  Trace,
} from "../art";
import { ease, useMotion } from "../score";

export function Decree() {
  const m = useMotion("decree");
  const paper = 174 * (1 - ease(m.f, 0, 32)) - m.phase * 61;
  return (
    <Field fill="#32282a">
      <Lattice color={c.red} angle={-12} spacing={55} opacity={0.23} />
      <path
        d="M 0 147 L 1920 17 V 230 L 0 358 Z M 0 945 L 1920 718 V 1080 H 0 Z"
        fill={c.coal}
      />
      {range(4).map((i) => (
        <g
          key={i}
          transform={`translate(${128 + i * 32 + m.step(i, 25) * 35} ${181 + i * 74}) rotate(-8)`}
        >
          <path
            d="M 0 0 H 415 V 69 H 0 Z"
            fill={i === 2 ? c.rust : c.night}
            stroke={c.sand}
            strokeWidth="2"
          />
          <Text x={25} y={44} size={23} face="mono" color={c.bone}>
            {["ПОСТАНОВЛЕНИЕ", "ОБРАЩЕНИЕ", "ЧРЕЗВЫЧАЙНОЕ", "ПОЛОЖЕНИЕ"][i]}
          </Text>
          <rect
            x="362"
            y="24"
            width="25"
            height="19"
            fill={i === 2 ? c.amber : c.rust}
            opacity={0.48 + m.hit(i) * 0.46}
          />
        </g>
      ))}
      <g
        transform={`translate(${560 + m.step(2, 34) * 33} ${119 + paper}) rotate(${-4 + m.phase * 2})`}
      >
        <rect x="34" y="42" width="1047" height="775" fill="#181a21" />
        <path d="M 0 0 H 1028 L 1053 34 V 775 H 0 Z" fill={c.bone} />
        <path
          d="M 32 31 H 996 M 32 742 H 1019 M 932 0 L 952 28 H 1028"
          fill="none"
          stroke={c.rust}
          strokeWidth="4"
        />
        <Text x={68} y={91} size={27} face="mono" color={c.coal}>
          МОСКВА · 19 АВГУСТА 1991
        </Text>
        <Text x={63} y={377} size={284} color={c.coal}>
          ГКЧП
        </Text>
        <path
          d="M 67 416 H 979"
          stroke={c.rust}
          strokeWidth="7"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - m.step(0, 32, 12)}
        />
        <Text x={68} y={498} size={43} tracking={6} color={c.coal}>
          ПОСТАНОВЛЕНИЕ № 1
        </Text>
        {range(7).map((i) => (
          <rect
            key={i}
            x="71"
            y={538 + i * 24}
            width={
              (612 + noise(i + 80) * 207) * ease(m.f, 41 + i * 4, 69 + i * 4)
            }
            height="4"
            fill={c.rust}
            opacity={0.3 + i * 0.04}
          />
        ))}
        <g
          transform={`translate(${880 + m.hit(1) * 18} ${494 - m.hit(1) * 48}) rotate(-16)`}
          opacity={m.step(1, 10)}
        >
          <circle r="119" fill="none" stroke={c.rust} strokeWidth="9" />
          <circle
            r="103"
            fill="none"
            stroke={c.rust}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M -79 1 H 77 M 0 -76 V 76 M -53 -54 L 54 55 M 53 -54 L -53 54"
            stroke={c.rust}
            strokeWidth="8"
          />
          <circle r="57" fill={c.bone} stroke={c.rust} strokeWidth="4" />
          <Text x={0} y={15} size={48} color={c.rust} anchor="middle">
            № 1
          </Text>
        </g>
      </g>
      <g
        transform={`translate(${84 - m.phase * 105} ${920 - 28 * m.hit(3)}) rotate(-9)`}
      >
        <rect width="1430" height="115" fill={c.rust} />
        <Trace
          x={15}
          y={57}
          width={1370}
          amplitude={26 + m.audio.middle * 34}
          f={m.f * 1.9}
          color={c.cream}
        />
      </g>
      <InkGrain opacity={0.28} />
    </Field>
  );
}

function ArmoredSilhouette({
  x,
  y,
  scale,
  f,
}: {
  x: number;
  y: number;
  scale: number;
  f: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M -164 -50 H 156 L 183 -21 L 157 11 H -152 L -181 -14 Z"
        fill={c.coal}
        stroke={c.sand}
        strokeWidth="3"
      />
      <path
        d="M -147 -102 H 123 L 169 -58 H -166 Z M -78 -142 H 51 L 106 -109 H -104 Z M 36 -140 L 223 -167 L 226 -156 L 46 -125 Z"
        fill={c.coal}
        stroke={c.sand}
        strokeWidth="2.5"
      />
      <path
        d="M -159 -39 H 158 L 172 -20 L 150 1 H -148 L -168 -18 Z"
        fill="none"
        stroke={c.sand}
        strokeWidth="4"
        strokeDasharray="7 8"
        strokeDashoffset={-f * 2}
      />
      {range(7).map((i) => (
        <g
          key={i}
          transform={`translate(${i * 41 - 122} -16) rotate(${f * 4})`}
        >
          <circle r="13" fill={c.sand} opacity=".68" />
          <path d="M -9 0 H 9 M 0 -9 V 9" stroke={c.coal} strokeWidth="3" />
        </g>
      ))}
      <path
        d="M -112 -88 H -42 M 94 -90 H 120"
        stroke={c.red}
        strokeWidth="7"
      />
    </g>
  );
}

export function Moscow() {
  const m = useMotion("moscow");
  const glow = useId();
  return (
    <Field fill={c.rust}>
      <defs>
        <linearGradient id={glow} x2="0" y2="1">
          <stop stopColor="#35252b" />
          <stop offset=".62" stopColor="#873c36" />
          <stop offset="1" stopColor="#ce704c" />
        </linearGradient>
      </defs>
      <rect width="1920" height="784" fill={`url(#${glow})`} />
      <path
        transform={`translate(${m.phase * 98} ${-m.hit(0) * 12})`}
        d="M -400 290 L 562 58 L 678 87 L -400 371 Z M -245 447 L 908 133 L 986 189 L -300 474 Z"
        fill={c.amber}
        opacity=".19"
      />
      <Lattice color={c.amber} opacity={0.29} spacing={62} />
      <g transform={`translate(${-m.phase * 94} ${m.hit(2) * 12})`}>
        <circle
          cx="1497"
          cy="358"
          r={236 + m.phase * 46}
          fill={c.amber}
          opacity=".69"
        />
        <path
          d="M -50 728 V 474 H 137 V 452 H 453 V 527 H 575 V 485 H 681 V 713 Z M 720 650 V 399 H 778 V 355 L 860 286 L 884 253 L 914 285 L 1018 364 V 404 H 1086 V 674 Z M 1100 694 V 457 H 1243 V 407 H 1379 V 721 Z"
          fill="#432b33"
        />
        <path
          d="M 1150 763 V 419 H 1203 V 348 H 1223 V 298 L 1312 176 L 1326 81 L 1340 177 L 1424 297 V 350 H 1452 V 419 H 1508 V 763 Z"
          fill={c.coal}
        />
        <path
          d="M 1211 354 H 1447 M 1160 423 H 1499 M 1161 600 H 1498 M 1226 299 H 1419 M 1265 185 H 1388"
          stroke={c.rust}
          strokeWidth="7"
        />
        <path
          d="M 1326 38 L 1335 59 H 1358 L 1340 73 L 1347 94 L 1326 81 L 1306 94 L 1312 73 L 1294 59 H 1317 Z"
          fill={c.red}
        />
        <Dial
          x={1326}
          y={509}
          radius={60}
          turn={-52 + m.f * 0.091}
          color={c.sand}
          body={c.coal}
        />
        <path d="M -35 617 H 1996 V 799 H -35 Z" fill={c.coal} />
        <path d="M -35 643 H 1996" stroke={c.rust} strokeWidth="7" />
        {range(23).map((i) => (
          <path
            key={i}
            d={`M ${i * 92 - 52} 622 v -38 h 22 l 11 12 l 11 -12 h 24 v 38 Z`}
            fill={c.coal}
          />
        ))}
      </g>
      <path d="M 0 794 L 1920 677 V 1080 H 0 Z" fill="#23252b" />
      <path
        d="M -80 978 L 2020 765 M -65 1055 L 2020 813 M 422 1110 L 1930 867"
        stroke={c.rust}
        strokeWidth="7"
      />
      {range(13).map((i) => (
        <path
          key={i}
          d={`M ${i * 175 - 250 - m.phase * 185} ${1001 - i * 12} l 49 -4 -24 19 -45 4 Z`}
          fill={c.amber}
          opacity=".37"
        />
      ))}
      <ArmoredSilhouette
        x={1660 - m.phase * 480}
        y={798}
        scale={0.64}
        f={m.f}
      />
      <ArmoredSilhouette
        x={1335 - m.phase * 775}
        y={964}
        scale={1.26}
        f={m.f}
      />
      <Text x={94} y={153} size={80}>
        МОСКВА
      </Text>
      <Text x={97} y={199} size={26} face="mono" color={c.bone}>
        19.08.1991
      </Text>
      <InkGrain opacity={0.28} />
    </Field>
  );
}

export function WhiteHouse() {
  const m = useMotion("whitehouse");
  const tilt = -1.5 + m.phase * 1.5;
  const wave = Math.sin(m.f * 0.142) * 27;
  return (
    <Field fill="#49626b">
      <Lattice color={c.mint} spacing={59} line opacity={0.22} />
      <path
        d="M -200 749 L 934 127 L 1262 127 L 346 843 Z M 1208 808 L 2020 282 L 2020 544 L 1580 888 Z"
        fill={c.mint}
        opacity=".21"
      />
      <g
        transform={`translate(${692 - m.phase * 87} ${m.hit(1) * 8}) rotate(${tilt} 411 748)`}
      >
        <path
          d="M 0 624 H 998 V 802 H 0 Z M 93 523 H 915 V 689 H 93 Z"
          fill={c.bone}
        />
        <path d="M 253 220 L 348 169 H 766 L 678 220 Z" fill={c.pale} />
        <path d="M 253 219 H 678 V 627 H 253 Z" fill={c.cream} />
        <path d="M 678 219 L 766 169 V 581 L 678 637 Z" fill={c.sand} />
        {range(17).map((i) => (
          <g key={i}>
            <path
              d={`M ${263 + i * 24} 240 h 8 V 616 h -8 Z`}
              fill={c.blue}
              opacity=".81"
            />
            {range(8).map((j) => (
              <rect
                key={j}
                x={262 + i * 24}
                y={251 + j * 46}
                width="10"
                height="4"
                fill={c.amber}
                opacity={noise(i * 8 + j) < 0.26 + m.phase * 0.23 ? 0.9 : 0.16}
              />
            ))}
          </g>
        ))}
        <path
          d="M 44 723 H 955 M 44 759 H 955 M 93 563 H 915 M 93 600 H 915"
          stroke={c.blue}
          strokeWidth="6"
          strokeDasharray="3 14"
        />
        <path d="M 459 206 V 92" stroke={c.coal} strokeWidth="5" />
        <Ribbon
          x={462}
          y={94}
          width={93}
          height={42}
          tilt={-2}
          flop={Math.sin(m.f * 0.109) * 11}
          color={c.red}
        />
        <path d="M 462 94 L 476 93 V 135 L 462 136 Z" fill={c.blue} />
      </g>
      <path d="M 0 838 L 1920 744 L 1920 1080 H 0 Z" fill={c.night} />
      <path
        d="M -170 933 L 2140 799 M -160 978 L 2130 861"
        stroke={c.blue}
        strokeWidth="37"
      />
      <g transform={`translate(${616 + m.phase * 72} 0)`}>
        <ArmoredSilhouette x={0} y={892} scale={1.02} f={0} />
        <Figure
          x={-13}
          y={574 - m.hit(1) * 18}
          scale={1.01}
          color={c.coal}
          outline={c.bone}
          index={1}
          raised
        />
        <path
          d="M 18 555 L 107 540 L 122 603 L 36 614 Z"
          fill={c.cream}
          transform={`rotate(${Math.sin(m.f * 0.14) * 6} 28 570)`}
        />
        <path
          d="M 37 567 l 67 -12 M 43 581 l 63 -11 M 44 594 l 63 -10"
          stroke={c.rust}
          strokeWidth="2"
        />
      </g>
      {range(17).map((i) => (
        <Figure
          key={i}
          x={i * 122 - 13 + Math.sin(m.f * 0.025 + i) * 32}
          y={954 + (i % 3) * 34 + m.hit(i % 4) * 14}
          scale={0.58 + noise(i + 21) * 0.56}
          color={i % 5 === 0 ? c.blue : c.coal}
          outline={c.bone}
          index={i}
          raised={i % 5 === 3}
          facing={i < 9 ? 1 : -1}
        />
      ))}
      <g
        transform={`translate(${1515 + Math.sin(m.f * 0.037) * 27} 861) rotate(${-13 + Math.sin(m.f * 0.066) * 7})`}
      >
        <path d="M 0 135 V -204" stroke={c.coal} strokeWidth="9" />
        {[c.pale, c.blue, c.red].map((color, i) => (
          <path
            key={color}
            fill={color}
            transform={`translate(3 ${-202 + i * 40})`}
            d={`M 0 0 Q 114 ${-wave} 239 ${wave * 0.34} v 41 Q 114 ${41 - wave} 0 41 Z`}
          />
        ))}
      </g>
      <Text x={93} y={165} size={76}>
        ДОМ СОВЕТОВ
      </Text>
      <Text x={98} y={220} size={33} face="mono" color={c.pale}>
        РСФСР
      </Text>
      <InkGrain />
    </Field>
  );
}

export function Standoff() {
  const m = useMotion("standoff");
  const clip = useId();
  const seam =
    978 +
    Math.sin(m.phase * 11) * 105 +
    246 * m.hit(1, 11) -
    195 * m.hit(2, 12);
  return (
    <Field fill={c.rust}>
      <defs>
        <clipPath id={clip}>
          <path
            d={`M ${seam + 189} 0 H 1920 V 1080 H ${seam - 202} L ${seam - 112} 720 L ${seam - 154} 667 L ${seam + 51} 374 L ${seam + 9} 309 Z`}
          />
        </clipPath>
      </defs>
      <Lattice spacing={38} angle={23} opacity={0.35} />
      <g
        transform={`translate(${-m.phase * 117 + m.hit(1) * 51} ${m.hit(0) * 31}) rotate(-12 560 540)`}
      >
        <Text
          x={172}
          y={403}
          size={274}
          fit={768}
          color={c.coal}
          opacity={0.65}
        >
          ПРИКАЗ
        </Text>
        <Text x={165} y={607} size={164} color={c.pale}>
          ГКЧП
        </Text>
        <path
          d="M -25 645 H 1090 M -12 699 H 1152 M 51 748 H 1067"
          stroke={c.bone}
          opacity=".63"
          strokeWidth="5"
        />
        <Text x={171} y={805} size={29} face="mono">
          КАНАЛ I
        </Text>
      </g>
      <g clipPath={`url(#${clip})`}>
        <rect width="1920" height="1080" fill={c.teal} />
        <Lattice spacing={52} angle={-13} color={c.bone} line opacity={0.27} />
        <g
          transform={`translate(${m.phase * 80 - m.hit(2) * 76} ${-m.hit(2) * 48}) rotate(9 1420 537)`}
        >
          <Trace
            x={900}
            y={306}
            width={935}
            amplitude={104 + m.audio.middle * 82}
            color={c.mint}
            f={m.f * 2.2}
            thickness={6}
          />
          <Text x={1075} y={606} size={141} color={c.pale}>
            ОТКАЗ
          </Text>
          <Text x={1088} y={667} size={26} face="mono" color={c.pale}>
            КАНАЛ II
          </Text>
          <path
            d="M 1072 703 H 1815 M 1057 724 H 1882"
            stroke={c.bone}
            opacity=".76"
            strokeWidth="4"
          />
        </g>
      </g>
      <path
        d={`M ${seam + 182} 0 L ${seam + 2} 309 L ${seam + 44} 374 L ${seam - 161} 667 L ${seam - 119} 720 L ${seam - 209} 1080`}
        fill="none"
        stroke={c.amber}
        strokeWidth="5"
        strokeDasharray="25 5 4 5"
        strokeDashoffset={-m.f * 2.6}
      />
      <g transform={`translate(0 ${m.hit(3) * 28})`}>
        <path d="M 0 989 L 1920 785 V 1080 H 0 Z" fill={c.coal} />
        {range(21).map((i) => (
          <g
            key={i}
            transform={`translate(${i * 100 - 30 + Math.sin(m.f * 0.079 + i) * 18} ${1001 - i * 9 + (i % 4) * 31})`}
          >
            <Figure
              x={0}
              y={0}
              color={c.coal}
              outline={i % 2 ? c.cream : c.sand}
              index={i}
              scale={0.57 + noise(i + 20) * 0.72}
              raised={i % 3 === 2}
              facing={i < 10 ? 1 : -1}
            />
          </g>
        ))}
      </g>
      <InkGrain opacity={0.29} />
    </Field>
  );
}

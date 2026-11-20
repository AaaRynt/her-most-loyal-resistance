import {
  c,
  Dial,
  Field,
  Figure,
  InkGrain,
  Lattice,
  noise,
  polar,
  range,
  Ribbon,
  Stamp,
  Text,
  Trace,
} from "../art";
import { ease, useMotion } from "../score";

export function Withdrawal() {
  const { f, phase, step, beat } = useMotion("withdrawal");
  const cross = step(1, 57, 21);
  const far = step(3, 35, 12);
  return (
    <Field fill="#ab996c">
      <path
        d="M 0 0 H 1920 V 472 L 1689 415 L 1501 485 L 1373 421 L 992 573 L 805 439 L 558 506 L 347 368 L 0 520 Z"
        fill="#c7b487"
      />
      <path
        d="M 0 654 L 390 461 L 875 640 L 1177 550 L 1621 353 L 1920 391 V 1080 H 0 Z"
        fill="#607268"
      />
      <path d="M 0 875 L 1920 588 V 1080 H 0 Z" fill="#38555c" />
      <Lattice color={c.cream} spacing={56} opacity={0.15} angle={162} />
      <path
        d="M -35 886 L 1951 545 L 1962 589 L -41 960 Z"
        fill="#363934"
        stroke="#b4a67b"
        strokeWidth="3.5"
      />
      {range(16).map((i) => (
        <path
          key={i}
          d={`M ${i * 138 - 50} ${872 - i * 22} v ${233 - i * 4}`}
          stroke={c.coal}
          strokeWidth={14 - i * 0.51}
          opacity=".66"
        />
      ))}
      <path
        d="M -30 885 L 1946 543 M -30 916 L 1948 576"
        stroke={c.cream}
        strokeWidth="2"
        opacity=".61"
      />
      {range(9).map((i) => {
        const x = -332 + i * 157 + (416 + 1363 * cross) * (1 - i * 0.018);
        const y = 885 - x * 0.172;
        return (
          <Figure
            key={i}
            x={x}
            y={y - 107 + 6 * beat * Math.sin(i)}
            scale={0.67 - i * 0.024}
            index={i + 2}
            color={i % 3 === 0 ? "#576251" : "#333b34"}
            outline={c.sand}
            step={Math.sin(f * 0.16 + i)}
          />
        );
      })}
      <Trace
        x={68}
        y={1007}
        width={1850}
        amplitude={16 + 24 * far}
        f={f}
        color={c.mint}
        angle={-4}
      />
      <Stamp x={115} y={134} width={320} fill={c.coal} ink={c.cream}>
        ФЕВРАЛЬ 1989
      </Stamp>
      <Text x={110} y={345} size={133} color={c.coal} fit={956}>
        ВЫВОД ВОЙСК
      </Text>
      <Text x={119} y={408} size={32} face="mono" color={c.coal}>
        АФГАНИСТАН
      </Text>
      <InkGrain color={c.cream} opacity={0.15 + 0.08 * phase} />
    </Field>
  );
}

const snow = range(78).map((i) => ({
  x: noise(i * 3 + 71) * 2000,
  y: noise(i * 17 + 39) * 1080,
  size: 1.2 + noise(i * 13) * 3.1,
  rate: 0.23 + noise(i * 29) * 1.5,
}));
const almaCrowd = range(23);

export function Alma() {
  const { f, step, hit, phase } = useMotion("alma");
  const rise = step(1, 42, 10);
  const cutoff = step(2, 29, 12);
  return (
    <Field fill="#465964">
      <path
        d="M 0 0 H 1920 V 420 L 1517 379 L 1270 441 L 1007 338 L 638 461 L 245 366 L 0 415 Z"
        fill="#7d8e88"
      />
      <path d="M 0 813 L 1920 611 V 1080 H 0 Z" fill="#819084" />
      <g transform={`translate(${-78 * phase} -23) skewY(-4)`}>
        <path
          d="M 493 356 H 1908 V 747 H 493 Z"
          fill="#3e4d53"
          stroke={c.bone}
          strokeWidth="3"
        />
        {range(20).map((i) => (
          <path
            key={i}
            d={`M ${510 + i * 69} 380 h 18 V 726 h -18 Z`}
            fill="#abb19b"
            opacity={i % 3 === 0 ? 0.72 : 0.38}
          />
        ))}
        <path
          d="M 475 462 H 1918 M 479 572 H 1919 M 475 697 H 1919"
          stroke={c.coal}
          strokeWidth="3.2"
        />
      </g>
      {almaCrowd.map((i) => {
        const row = Math.floor(i / 9);
        return (
          <Figure
            key={i}
            x={32 + (i % 9) * 214 - row * 36 + noise(i) * 84 + 36 * rise * row}
            y={737 + 134 * row - 31 * hit(1)}
            scale={0.62 + row * 0.38 + noise(i * 17) * 0.15}
            index={i}
            color={row === 0 ? "#596862" : i % 2 ? "#3a4544" : "#253239"}
            outline="#92998b"
            step={0.7 * Math.sin(i + rise * 11)}
            raised={i % 7 === 2}
          />
        );
      })}
      <path
        d={`M ${2047 - 1574 * cutoff} 0 L 1920 0 V 1080 H ${2288 - 1291 * cutoff} Z`}
        fill="#202932"
        opacity={0.18 + 0.51 * cutoff}
      />
      <Ribbon
        x={104}
        y={165}
        width={1035}
        height={208}
        color="#633c36"
        flop={28 * rise}
        tilt={-4}
      />
      <Text x={122} y={311 - 11 * hit(2)} size={144} color={c.cream} fit={861}>
        ЖЕЛТОҚСАН
      </Text>
      <Text x={121} y={428} size={32} face="mono" color={c.cream}>
        АЛМА-АТА · ДЕКАБРЬ 1986
      </Text>
      {snow.map(({ x, y, rate, size }, i) => (
        <circle
          key={i}
          cx={(x + f * rate) % 2000}
          cy={(y + f * rate * 0.68) % 1080}
          r={size}
          fill={c.pale}
          opacity={0.23 + noise(i + 98) * 0.42}
        />
      ))}
      <InkGrain opacity={0.15} />
    </Field>
  );
}

const links = range(17);
export function Baltic() {
  const { f, step, beat, phase } = useMotion("baltic");
  const join = step(1, 39, 12);
  const draw = step(2, 52, 15);
  return (
    <Field fill="#779186">
      <path d="M 0 0 H 1920 V 356 L 969 629 L 0 372 Z" fill="#b3bc9f" />
      <path d="M 0 1080 V 876 L 1920 547 V 1080 Z" fill="#3e5e64" />
      <Lattice color={c.coal} spacing={44} opacity={0.21} angle={44} line />
      <path
        d={`M -60 857 Q 456 ${794 - 87 * join} 949 691 T 1984 ${506 - 59 * draw}`}
        fill="none"
        stroke={c.cream}
        strokeWidth="4.3"
        opacity=".77"
      />
      <path
        d={`M -11 914 Q 414 ${811 - 55 * join} 957 765 T 1978 ${552 - 57 * draw}`}
        fill="none"
        stroke="#9f5241"
        strokeDasharray="15 8 7 8"
        strokeDashoffset={-f * 3.6}
        strokeWidth="3.9"
      />
      {links.map((i) => {
        const x = 99 + i * 108 - 46 * phase;
        const y = 723 - i * 16 + 43 * Math.sin(i * 0.34) - 16 * join;
        const size = 1.17 - i * 0.024;
        return (
          <g key={i}>
            <Figure
              x={x}
              y={y}
              scale={size}
              color={i % 3 === 0 ? "#353c36" : "#2b4547"}
              outline={c.bone}
              index={i}
              facing={i % 2 ? -1 : 1}
            />
            <path
              d={`M ${x + 26} ${y + 34} L ${x + 57} ${y + 45 - 18 * join} L ${x + 101} ${y + 39 - 21 * join} `}
              stroke={i % 3 === 1 ? "#725047" : "#283e40"}
              strokeWidth={15 - i * 0.26}
              fill="none"
              strokeLinecap="round"
              opacity={0.65 + 0.35 * draw}
            />
            <circle
              cx={x + 59}
              cy={y + 45 - 18 * join}
              r={3.7 + 2.7 * beat}
              fill={c.amber}
            />
          </g>
        );
      })}
      <Text x={110} y={265} size={150} fit={1295} color={c.coal}>
        БАЛТИЙСКИЙ ПУТЬ
      </Text>
      <Text x={121} y={332} size={31} face="mono" color={c.coal}>
        23.08.1989 · EESTI / LATVIJA / LIETUVA
      </Text>
      <InkGrain color={c.coal} opacity={0.23} />
    </Field>
  );
}

const panels = range(12).map((i) => ({
  i,
  x: i * 174 - 81,
  y: 235 + (i % 3) * 8,
  col: ["#69746a", "#a09a7d", "#b0a180", "#858778"][i % 4],
}));
export function Wall() {
  const { f, step, hit, beat, phase } = useMotion("wall");
  const gate = step(2, 45, 12);
  return (
    <Field fill="#456071">
      <path d="M 0 0 H 1920 V 324 L 926 563 L 0 437 Z" fill="#b0a884" />
      <path d="M 0 1080 V 769 L 1920 715 V 1080 Z" fill="#273e44" />
      <Lattice color={c.cream} spacing={38} opacity={0.19} angle={122} />
      {panels.map(({ i, x, y, col }) => {
        const crack = step(i % 4, 42, 14);
        return (
          <g
            key={i}
            transform={`translate(${x + 42 * (i < 6 ? -1 : 1) * gate} ${y + (92 + noise(i * 19) * 218) * crack}) rotate(${(noise(i) - 0.49) * 23 * crack} 65 566)`}
          >
            <path
              d="M 0 0 L 150 2 L 173 603 L -21 617 Z"
              fill={col}
              stroke="#5f665e"
              strokeWidth="3"
            />
            <path
              d="M 8 16 h 133 m -125 35 h 110 M 11 573 H 147"
              stroke={c.pale}
              strokeWidth="2.7"
              opacity=".58"
            />
            <path
              d={`M 29 209 q 34 ${-56 + i * 8} 72 -17 t 27 115 M 82 232 l -47 110 l 60 -29`}
              stroke={i % 2 ? c.rust : "#315269"}
              strokeWidth="7"
              fill="none"
              opacity=".7"
            />
            <path
              d="M 103 361 l -19 31 l 25 33 l -51 49"
              stroke="#4f5c56"
              strokeWidth="2"
              fill="none"
            />
          </g>
        );
      })}
      <path
        d={`M 0 716 H ${780 - 138 * gate} L ${902 + 167 * gate} 888 L 1920 842 V 1080 H 0 Z`}
        fill="#2b3f43"
        opacity=".68"
      />
      <Trace
        x={122}
        y={871}
        width={1663}
        amplitude={18 + 43 * beat}
        f={f}
        color={c.amber}
        thickness={3.6}
      />
      <Stamp x={111} y={122} width={356} fill={c.coal} ink={c.cream}>
        БЕРЛИН · 09.11.1989
      </Stamp>
      <Text
        x={109}
        y={782 - 29 * hit(3)}
        size={180}
        color={c.cream}
        opacity={0.52 + 0.48 * gate}
        tracking={3}
      >
        СТЕНА
      </Text>
      <InkGrain opacity={0.22 + 0.06 * phase} />
    </Field>
  );
}

const pacts = range(7);
export function Pact() {
  const { f, step, phase, beat } = useMotion("pact");
  const drift = step(2, 59, 12);
  return (
    <Field fill="#253139">
      <path d="M 0 0 H 1920 V 440 L 0 711 Z" fill="#504f46" />
      <path d="M 0 930 L 1920 600 V 1080 H 0 Z" fill="#763f34" />
      <Lattice color={c.bone} spacing={46} opacity={0.26} angle={21} line />
      <g transform="translate(1238 534)">
        {[388, 323, 266].map((r, i) => (
          <circle
            key={r}
            r={r}
            fill="none"
            stroke={c.sand}
            strokeWidth={i === 1 ? 4 : 1.9}
            opacity={0.61 - 0.38 * drift}
            strokeDasharray={i === 1 ? "10 7" : "none"}
          />
        ))}
        {pacts.map((i) => {
          const [x, y] = polar(
            324 + (72 + noise(i * 11) * 178) * drift,
            i * (360 / 7) - 35 + 35 * phase + i * 9 * drift,
          );
          const loose = step(i % 4, 35, 13);
          return (
            <g
              key={i}
              transform={`translate(${x} ${y}) rotate(${-22 + 45 * loose - 4 * i})`}
            >
              <path
                d="M -79 -67 H 76 V 68 H -79 Z"
                fill={i % 3 ? "#a29267" : c.rust}
                stroke={c.cream}
                strokeWidth="2.2"
              />
              <path
                d="M -60 -43 H 54 V 47 H -60 Z M -50 0 H 46 M 0 -32 V 36"
                fill="none"
                stroke={c.coal}
                strokeWidth="2.2"
              />
            </g>
          );
        })}
        <Dial
          x={0}
          y={0}
          radius={167 - 28 * drift}
          turn={f * 0.53 + 79 * drift}
          color={c.cream}
          pointer={c.red}
        />
      </g>
      <Text x={112} y={453 - 12 * beat} size={120} color={c.cream} fit={635}>
        ВАРШАВСКИЙ
      </Text>
      <Text x={112} y={588 - 12 * beat} size={151} color={c.cream} fit={634}>
        ДОГОВОР
      </Text>
      <path
        d={`M 116 647 H ${764 - 210 * drift}`}
        stroke={c.red}
        strokeWidth="9"
      />
      <InkGrain opacity={0.16} />
    </Field>
  );
}

const march = range(33).map((i) => ({
  x: (i % 11) * 194 - 69 + noise(i) * 84,
  y: 604 + Math.floor(i / 11) * 159 + noise(i + 324) * 85,
  scale: 0.71 + Math.floor(i / 11) * 0.39 + noise(i * 17) * 0.19,
  col: ["#586b62", "#534a3a", "#454c45", "#24373d", "#2a3032"][i % 5],
}));
const signs = [
  { x: 353, y: 352, rot: -9, label: "ГЛАСНОСТЬ" },
  { x: 960, y: 331, rot: 3, label: "ВЫБОР" },
  { x: 1476, y: 407, rot: -6, label: "ПЕРЕМЕНЫ" },
];

export function Square() {
  const { f, step, phase, beat, hit } = useMotion("square");
  const marchOn = step(2, 54, 16);
  const lift = step(1, 27, 9);
  return (
    <Field fill="#9b8a60">
      <path d="M 0 0 H 1920 V 292 L 1114 606 L 0 424 Z" fill="#cfba87" />
      <path d="M 0 376 L 1073 518 L 1920 285 V 1080 H 0 Z" fill="#5e7263" />
      <path
        d="M 0 231 L 398 328 V 461 L 0 386 Z M 1920 147 L 1524 317 V 433 L 1920 293 Z"
        fill="#4f554b"
      />
      <Lattice color={c.cream} spacing={30} opacity={0.23} angle={142} line />
      <g
        transform={`translate(${-159 * marchOn} ${19 * beat}) scale(${1 + 0.06 * marchOn})`}
      >
        {march.slice(0, 11).map(({ x, y, scale, col }, i) => (
          <Figure
            key={i}
            x={x + 43 * marchOn}
            y={y}
            scale={scale}
            color={col}
            index={i}
            outline={c.sand}
          />
        ))}
        {signs.map(({ x, y, rot, label }, i) => {
          const up = step(i, 34, 7);
          return (
            <g
              key={label}
              transform={`translate(${x + 44 * marchOn * i} ${y + (1 - up) * 193 - 19 * hit(i)}) rotate(${rot + (i - 1) * 5 * lift})`}
            >
              <path d="M -7 0 H 9 V 517 H -7 Z" fill={c.coal} />
              <rect
                x="-217"
                y="-58"
                width="435"
                height="140"
                fill={i === 2 ? "#984b38" : c.bone}
                stroke={c.coal}
                strokeWidth="3"
              />
              <Text
                x={0}
                y={31}
                size={79}
                color={i === 2 ? c.cream : c.coal}
                anchor="middle"
                fit={label.length > 7 ? 366 : undefined}
              >
                {label}
              </Text>
            </g>
          );
        })}
        {march.slice(11).map(({ x, y, scale, col }, i) => (
          <Figure
            key={i}
            x={x + Math.sin(i) * 95 * marchOn}
            y={y - 19 * hit(i % 3)}
            scale={scale}
            color={col}
            outline={c.bone}
            index={i + 11}
            raised={i % 4 === 1}
            step={Math.sin(f * 0.092 + i) * 0.78}
          />
        ))}
      </g>
      <path d="M 0 1034 L 1920 971 V 1080 H 0 Z" fill="#203239" />
      <Stamp x={116} y={126} width={222} fill={c.coal} ink={c.cream}>
        МИТИНГ
      </Stamp>
      <InkGrain color={c.coal} opacity={0.18 + 0.1 * phase} />
    </Field>
  );
}

const rails = range(14);
export function Metro() {
  const { f, step, phase, hit, audio } = useMotion("metro");
  const drive = step(2, 49, 16);
  return (
    <Field fill="#1e2930">
      <path
        d="M 0 0 H 1920 L 982 489 Z M 0 1080 H 1920 L 982 489 Z"
        fill="#3b555b"
      />
      <g opacity=".6">
        {rails.map((i) => {
          const p = ((f * 0.007 + i * 0.091) % 1) ** 2.21;
          return (
            <path
              key={i}
              d={`M ${981 - p * 1198} ${489 - p * 571} H ${982 + p * 1103} V ${489 + p * 706} H ${980 - p * 1198} Z`}
              stroke={i % 3 ? "#8e9c84" : c.bone}
              strokeWidth={1.7 + 9 * p}
              fill="none"
              opacity={p * 0.9}
            />
          );
        })}
      </g>
      <path
        d="M 482 1080 L 968 492 M 1251 1080 L 1016 493"
        stroke={c.sand}
        strokeWidth="5"
      />
      <g
        transform={`translate(${1098 + 512 * drive} ${558 + 31 * hit(1)}) scale(${0.45 + 0.62 * ease(f, 0, 116)})`}
      >
        <path
          d="M -393 -358 H 397 L 459 -276 V 292 L 381 358 H -385 L -458 298 V -272 Z"
          fill="#688681"
          stroke={c.cream}
          strokeWidth="4.4"
        />
        <path
          d="M -358 -290 H 349 V -92 H -358 Z"
          fill="#23343b"
          stroke={c.coal}
          strokeWidth="4"
        />
        <path
          d="M -248 -274 H -112 V -110 H -248 Z M -77 -274 H 91 V -110 H -77 Z M 114 -274 H 239 V -110 H 114 Z"
          fill="#8aa396"
          opacity=".49"
        />
        <path
          d="M -444 18 H 442 V 109 H -444 Z"
          fill="#495c55"
          stroke={c.bone}
          strokeWidth="2"
        />
        <circle
          cx="-261"
          cy="65"
          r="35"
          fill={c.amber}
          opacity={0.38 + 0.55 * audio.bass}
        />
        <circle
          cx="260"
          cy="65"
          r="35"
          fill={c.amber}
          opacity={0.38 + 0.55 * audio.bass}
        />
        <path
          d="M -369 218 H 369 M -311 255 H 309"
          stroke={c.coal}
          strokeWidth="15"
        />
      </g>
      <path
        d={`M 0 0 H ${125 + 280 * phase} L ${290 + 110 * phase} 1080 H 0 Z`}
        fill="#161f24"
      />
      <Stamp x={115} y={131} width={196} fill={c.cream} ink={c.coal}>
        МЕТРО
      </Stamp>
      <InkGrain opacity={0.22} />
    </Field>
  );
}

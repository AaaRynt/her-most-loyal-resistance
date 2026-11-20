import {
  c,
  Dial,
  Field,
  Figure,
  InkGrain,
  Lattice,
  noise,
  polar,
  PunchTape,
  range,
  Stamp,
  Text,
  Trace,
  Wheel,
} from "../art";
import { ease, useMotion } from "../score";

const rows = [442, 373, 304, 233, 165];
export function Congress() {
  const { f, step, beat, phase, audio } = useMotion("congress");
  const turn = step(2, 43, 11);
  return (
    <Field fill="#454943">
      <path d="M 0 0 H 1920 V 422 L 884 683 L 0 530 Z" fill="#827b60" />
      <Lattice color={c.cream} opacity={0.19} spacing={43} angle={18} />
      <g
        transform={`translate(${1281 - 217 * turn} ${541 + 16 * beat}) rotate(${-15 + 16 * turn})`}
      >
        {rows.map((r, i) => (
          <g key={r}>
            <path
              d={`M ${-r} -98 A ${r} ${r} 0 1 0 ${r} -98 L ${r - 20} -98 A ${r - 20} ${r - 20} 0 1 1 ${-r + 20} -98 Z`}
              fill={i % 2 ? "#526059" : "#6d715d"}
              opacity=".8"
            />
            {range(28 - i * 4).map((j) => {
              const count = 28 - i * 4;
              const a = -10 + j * (200 / (count - 1));
              const [x, y] = polar(r - 8, a);
              const active =
                noise(i * 41 + j * 13) <
                0.28 + 0.54 * step(i % 4, 28, 10) + audio.air * 0.11;
              return (
                <circle
                  key={j}
                  cx={x}
                  cy={y}
                  r={6 + 1.4 * beat}
                  fill={active ? (i % 3 === 0 ? c.amber : c.bone) : "#384842"}
                  opacity={active ? 0.85 : 0.55}
                />
              );
            })}
          </g>
        ))}
        <path
          d="M -206 -212 H 206 L 218 -92 H -219 Z"
          fill={c.rust}
          stroke={c.cream}
          strokeWidth="3"
        />
        <path d="M -140 -146 H 137" stroke={c.bone} strokeWidth="2.8" />
        <circle
          r="67"
          fill="none"
          stroke={c.bone}
          strokeDasharray="3 8"
          strokeWidth="2.5"
        />
      </g>
      <Text x={114} y={255} size={95} color={c.cream}>
        СЪЕЗД
      </Text>
      <Text x={116} y={333} size={58} fit={557} color={c.cream}>
        НАРОДНЫХ ДЕПУТАТОВ
      </Text>
      <Trace
        x={117}
        y={866}
        width={722 - 107 * turn}
        amplitude={32 + 21 * beat}
        f={f}
        color={c.amber}
      />
      <InkGrain opacity={0.22 + 0.05 * phase} />
    </Field>
  );
}

export function Sovereignty() {
  const { f, step, beat, phase } = useMotion("sovereignty");
  const press = step(1, 38, 13);
  return (
    <Field fill="#5c7061">
      <path d="M 0 0 H 1920 V 575 L 0 913 Z" fill="#b0a47c" />
      <path d="M 1452 0 H 1920 V 1080 H 1015 Z" fill="#405653" />
      <Lattice color={c.coal} spacing={37} opacity={0.19} angle={15} line />
      <g
        transform={`translate(${1018 + 142 * press} ${525 + 16 * beat}) rotate(${-11 + 7 * press})`}
      >
        <path
          d="M -588 -338 H 604 V 340 H -588 Z"
          transform="translate(48 43)"
          fill="#3f4e44"
          opacity=".61"
        />
        <path
          d="M -588 -338 H 604 V 340 H -588 Z"
          fill="#d4c69e"
          stroke={c.coal}
          strokeWidth="4"
        />
        <path
          d="M -558 -307 H 574 V 310 H -558 Z"
          stroke="#524d38"
          strokeWidth="1.7"
          fill="none"
        />
        <Text x={-498} y={-174} size={92} color={c.coal} fit={912}>
          СУВЕРЕНИТЕТ РСФСР
        </Text>
        {range(13).map((i) => (
          <path
            key={i}
            d={`M -498 ${-99 + i * 27} h ${800 + noise(i * 19) * 207}`}
            stroke={c.coal}
            opacity=".57"
            strokeWidth="3.1"
            strokeDasharray={i % 4 === 0 ? "none" : "23 8 13 7"}
            strokeDashoffset={-f * 0.55}
          />
        ))}
        <path
          d={`M -425 ${270 - 17 * press} C -278 237 -152 249 -119 209 C -104 151 -183 296 -48 245 S 128 264 228 233`}
          fill="none"
          stroke={c.rust}
          strokeWidth="5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - press}
        />
      </g>
      <Stamp x={117} y={126} width={343} fill={c.coal} ink={c.cream}>
        12 ИЮНЯ 1990
      </Stamp>
      <PunchTape
        x={-126 + 93 * phase}
        y={997}
        width={2314}
        height={124}
        angle={-7}
        phase={f * 5.1}
        color="#394b49"
        ink={c.cream}
        density={0.35}
      />
    </Field>
  );
}

function Profile({
  x,
  y,
  scale,
  other,
}: {
  x: number;
  y: number;
  scale: number;
  other: boolean;
}) {
  const head = other
    ? "M -152 30 Q -194 -24 -164 -102 Q -131 -189 -24 -173 L 70 -155 L 111 -126 L 136 -65 L 157 -40 L 133 -14 L 148 14 L 135 46 L 98 66 L 98 104 L 147 139 L 206 304 H -227 L -197 144 L -117 105 L -104 61 Z"
    : "M -161 21 L -155 -62 Q -153 -164 -65 -183 Q 25 -201 93 -156 L 117 -110 L 122 -58 L 147 -24 L 132 7 L 139 37 L 109 64 L 76 66 L 72 120 L 169 149 L 232 302 H -231 L -199 163 L -111 95 L -104 60 Z";
  return (
    <g
      transform={`translate(${x} ${y}) scale(${(other ? -1 : 1) * scale} ${scale})`}
    >
      <path d={head} fill={other ? "#bcbba0" : "#cdb488"} />
      <path
        d={
          other
            ? "M -156 9 Q -190 -47 -165 -105 Q -138 -176 -59 -188 L 28 -181 L 88 -159 L 115 -130 L 65 -132 L 27 -144 L -37 -133 L -56 -87 L -103 -67 L -113 6 Z"
            : "M -158 0 L -155 -62 Q -153 -164 -65 -183 L -18 -188 Q -91 -157 -91 -110 L -88 -53 L -116 -10 Z"
        }
        fill={other ? "#e0d6ae" : "#526559"}
      />
      <path
        d="M -132 100 L -41 169 L 81 102 L 167 141 L 223 302 H -231 L -210 178 Z"
        fill={other ? "#313e3f" : "#443a34"}
      />
      <path
        d="M -140 101 L -42 169 L 83 99 L 13 232 L -40 207 L -87 230 Z"
        fill="#d3c398"
      />
      <path
        d="M -38 170 L -16 200 L -28 226 L 3 302 H -68 L -54 225 L -65 199 Z"
        fill={c.rust}
      />
      <path
        d="M 58 -76 Q 89 -82 110 -67 M 88 30 L 125 23"
        stroke="#493f36"
        strokeWidth="3.6"
        fill="none"
      />
      {!other && (
        <path
          d="M 63 -150 l 22 9 l 8 18 l -11 5 l -21 -12 Z"
          fill={c.rust}
          opacity=".67"
        />
      )}
    </g>
  );
}

export function Rivals() {
  const { f, hit, step, beat, phase } = useMotion("rivals");
  const split = step(1, 42, 12);
  const relay = step(2, 49, 8);
  return (
    <Field fill="#273c48">
      <path
        d={`M 0 0 H ${904 + 242 * split} L ${1032 - 233 * split} 1080 H 0 Z`}
        fill="#685548"
      />
      <path d="M 0 876 L 1920 708 V 1080 H 0 Z" fill="#233034" />
      <Lattice color={c.cream} spacing={28} opacity={0.25} angle={17} />
      <Dial
        x={533}
        y={491}
        radius={367}
        turn={-27 + 171 * phase}
        color="#b19969"
      />
      <Dial
        x={1455}
        y={515}
        radius={349}
        turn={52 - 194 * phase}
        color="#a9a989"
      />
      <Profile
        x={513 + 111 * split}
        y={493 - 22 * hit(1)}
        scale={1.29 + 0.11 * split}
        other={false}
      />
      <Profile
        x={1476 - 89 * relay}
        y={506 - 21 * hit(2)}
        scale={1.25 + 0.15 * relay}
        other
      />
      <path
        d={`M ${855 + 101 * split} 176 L ${964 + 74 * relay} 431 L ${879 + 77 * split} 551 L ${1034 - 112 * relay} 894`}
        fill="none"
        stroke={c.amber}
        strokeWidth={3.7 + 2 * beat}
      />
      <Trace
        x={117}
        y={778}
        width={823}
        amplitude={14 + 38 * beat}
        f={f}
        color={c.red}
      />
      <Trace
        x={997}
        y={752}
        width={798}
        amplitude={20 + 47 * beat}
        f={-f}
        color={c.mint}
        seed={4}
      />
      <Text x={114} y={219} size={92} color={c.cream}>
        ГОРБАЧЁВ
      </Text>
      <Text x={1813} y={219} size={92} color={c.cream} anchor="end">
        ЕЛЬЦИН
      </Text>
      <Text x={117} y={274} size={31} face="mono" color={c.cream}>
        СОЮЗНЫЙ ЦЕНТР
      </Text>
      <Text x={1809} y={274} size={31} face="mono" color={c.cream} anchor="end">
        РСФСР
      </Text>
      <InkGrain opacity={0.19} />
    </Field>
  );
}

export function Treaty() {
  const { f, step, beat, phase } = useMotion("treaty");
  const bend = step(2, 39, 4);
  const ink = step(1, 35, 5);
  return (
    <Field fill="#72684e">
      <path d="M 0 0 H 1920 V 458 L 0 791 Z" fill="#a48d61" />
      <Lattice color={c.coal} spacing={45} opacity={0.34} angle={135} line />
      <g
        transform={`translate(${1066 - 106 * bend} ${536 + 11 * beat}) rotate(${-8 + 4 * bend})`}
      >
        <path
          d="M -627 -371 H 615 L 663 350 H -638 Z"
          fill={c.coal}
          opacity=".32"
          transform="translate(25 29)"
        />
        <path d="M -627 -371 H 615 L 663 350 H -638 Z" fill="#ded0a6" />
        <path
          d="M -598 -341 H 587 L 630 318 H -607 Z"
          fill="none"
          stroke="#766445"
          strokeWidth="2.1"
        />
        <Text x={-538} y={-179} size={102} fit={1061} color={c.coal}>
          СОЮЗНЫЙ ДОГОВОР
        </Text>
        {range(12).map((i) => (
          <path
            key={i}
            d={`M -540 ${-91 + i * 26} h ${867 - ((i * 63) % 221)}`}
            stroke={c.coal}
            strokeWidth="2.8"
            opacity=".59"
            strokeDasharray="15 7 48 7"
          />
        ))}
        <path
          d="M -524 241 h 343 M 91 241 h 341"
          stroke={c.coal}
          strokeWidth="2.8"
          opacity=".72"
        />
        <g
          transform={`translate(${-337 + 163 * ink} ${33 - 39 * bend}) rotate(${-21 + 16 * ink})`}
        >
          <path
            d="M 0 0 H 526 V 175 H 0 Z"
            fill="none"
            stroke={c.rust}
            strokeWidth={5 + 3 * beat}
          />
          <Text x={28} y={128} size={106} color={c.rust}>
            ПРОЕКТ
          </Text>
        </g>
        <path
          d={`M ${-117 + 449 * bend} -373 L ${426 + 129 * bend} 350 H 663 L 615 -371 Z`}
          fill="#71573d"
          opacity={0.51 * bend}
        />
      </g>
      <path
        d={`M 0 ${919 - 244 * phase} L 1920 932 V 1080 H 0 Z`}
        fill="#383e37"
        opacity=".51"
      />
      <InkGrain color={c.coal} opacity={0.21 + Math.min(0.5, f * 0.002)} />
    </Field>
  );
}

export function Ballot() {
  const { step, hit, phase, beat } = useMotion("ballot");
  const close = step(3, 32, 13);
  return (
    <Field fill="#394c49">
      <path d="M 0 0 H 1920 V 611 L 0 872 Z" fill="#647263" />
      <Lattice color={c.cream} opacity={0.24} spacing={37} line />
      {[0, 1, 2].map((i) => {
        const press = step(i, 42, 10);
        return (
          <g
            key={i}
            transform={`translate(${871 + i * 103 + (i - 1) * 164 * press} ${557 - i * 41 + 179 * close + 19 * hit(i)}) rotate(${-9 + i * 7 + (i - 1) * 17 * press})`}
          >
            <path
              d="M -462 -294 H 462 V 293 H -462 Z"
              fill={["#a99870", "#c2b48c", "#e0d1a6"][i]}
              stroke={c.coal}
              strokeWidth="3.2"
            />
            <path
              d="M -439 -268 H 438 V 266 H -439 Z"
              stroke="#5f5d45"
              fill="none"
              strokeWidth="2"
            />
            {i === 2 && (
              <>
                <Text x={-394} y={-114} size={77} fit={780} color={c.coal}>
                  СОХРАНИТЬ СОЮЗ?
                </Text>
                <path
                  d="M -404 -66 H 404 M -404 188 H 404"
                  stroke={c.rust}
                  strokeWidth="3.7"
                />
                <path
                  d="M -330 -4 h 76 v 74 h -76 Z M 83 -4 h 76 v 74 H 83 Z"
                  fill="none"
                  stroke={c.coal}
                  strokeWidth="3.1"
                />
                <Text x={-213} y={61} size={64} color={c.coal}>
                  ДА
                </Text>
                <Text x={201} y={61} size={64} color={c.coal}>
                  НЕТ
                </Text>
                <path
                  d={`M -399 102 H ${369 - 293 * press} M -399 134 H ${253 - 133 * press}`}
                  stroke={c.coal}
                  strokeWidth="2.5"
                  opacity=".38"
                />
              </>
            )}
          </g>
        );
      })}
      <path
        d={`M 0 ${1086 - 251 * close} L 1920 ${1001 - 191 * close} V 1080 H 0 Z`}
        fill={c.coal}
      />
      <Stamp x={115} y={126} width={374} fill={c.coal} ink={c.cream}>
        17 МАРТА 1991
      </Stamp>
      <Trace
        x={119}
        y={947}
        width={1602}
        amplitude={18 + 19 * beat + 12 * phase}
        f={phase * 270}
        color={c.amber}
      />
    </Field>
  );
}

const stones = range(25);
export function Miners() {
  const { f, step, phase, beat } = useMotion("miners");
  const stop = step(2, 37, 11);
  const carry = ease(f, 0, 180);
  return (
    <Field fill="#272c2a">
      <path
        d="M 0 0 H 1920 L 1470 403 L 1059 367 L 770 636 L 0 483 Z"
        fill="#424d43"
      />
      <path d="M 0 1080 V 922 L 1920 559 V 1080 Z" fill="#4b4937" />
      <Lattice color={c.cream} spacing={25} angle={24} opacity={0.23} />
      <Wheel
        x={1499}
        y={535}
        r={279}
        turn={2 * f - 116 * stop}
        color="#a0925c"
      />
      <path
        d={`M -21 743 L 1712 ${528 - 27 * stop} L 1745 ${618 - 20 * stop} L 0 862 Z`}
        fill="#77715b"
        stroke={c.coal}
        strokeWidth="5"
      />
      {stones.map((i) => {
        const x = ((i * 101 + f * 4.1 - 390 * stop) % 1980) - 42;
        const y = 734 - x * 0.124;
        const w = 19 + 53 * noise(i * 13);
        return (
          <path
            key={i}
            d={`M ${x - w} ${y} l ${w * 0.52} ${-35 - noise(i) * 29} l ${w * 0.7} 1 l ${w * 0.37} 28 l ${-w * 0.38} 19 Z`}
            fill={i % 3 ? "#353a32" : "#584f3c"}
            stroke="#a09166"
            strokeWidth="1.2"
            opacity=".81"
          />
        );
      })}
      {range(7).map((i) => (
        <Figure
          key={i}
          x={313 + i * 238 - 41 * carry}
          y={810 - i * 7 + 15 * beat}
          scale={1.42 + i * 0.028}
          color="#202e2d"
          outline="#b29258"
          index={4 * i}
          raised={i === 3 || i === 4}
          step={Math.sin(f * 0.07 + i) * 0.43}
        />
      ))}
      <path
        d={`M 0 0 H 1920 V ${105 + 232 * stop} L 0 ${284 - 183 * stop} Z`}
        fill={c.coal}
        opacity=".72"
      />
      <Text x={118} y={242 - 18 * beat} size={110} color={c.cream}>
        ЗАБАСТОВКА
      </Text>
      <InkGrain color={c.mint} opacity={0.19 + 0.05 * phase} />
    </Field>
  );
}

export function Telegraph() {
  const { f, step, hit, beat, audio } = useMotion("telegraph");
  const release = step(2, 36, 16);
  return (
    <Field fill="#262f38">
      <path d="M 0 0 H 1920 V 331 L 0 559 Z" fill="#5f6253" />
      <Lattice color={c.cream} spacing={24} opacity={0.18} angle={25} line />
      <Wheel x={1435} y={496} r={269} turn={1.69 * f} color="#a78054" />
      <Wheel x={1474} y={704} r={154} turn={-3.1 * f} color="#81987d" />
      {[0, 1, 2].map((i) => {
        const shift = step(i, 40, 9);
        return (
          <PunchTape
            key={i}
            x={-437 + 204 * shift}
            y={340 + i * 187 - 55 * hit(i)}
            width={2080 - 218 * i}
            height={123 + 17 * i}
            angle={-7 + 7 * i + (i - 1) * 18 * release}
            phase={f * (4.4 + i * 0.82) + 53 * hit(i)}
            color={["#c3a675", "#a07b52", "#8d503b"][i]}
            ink={c.coal}
            density={0.39 + 0.19 * audio.bass}
          />
        );
      })}
      <path
        d={`M 107 ${877 - 45 * release} H 1200 L 1513 720 H 1795`}
        fill="none"
        stroke={c.cream}
        strokeWidth={2.2 + 2.4 * beat}
        strokeDasharray="8 7"
        opacity=".67"
      />
      <Stamp x={114} y={127} width={309} fill={c.coal} ink={c.cream}>
        ТЕЛЕГРАФ
      </Stamp>
      <InkGrain opacity={0.18} />
    </Field>
  );
}

const papers = [
  { x: 98, y: 274, angle: -9, word: "ПОРЯДОК", fill: "#d6bd90" },
  { x: 563, y: 142, angle: 6, word: "РЕФОРМЫ", fill: "#c1a167" },
  { x: 971, y: 376, angle: -4, word: "СУВЕРЕНИТЕТ", fill: "#9f5342" },
];
export function Papers() {
  const { f, step, hit, beat, phase } = useMotion("papers");
  const tear = step(3, 33, 13);
  return (
    <Field fill="#4a5045">
      <path d="M 0 0 H 1920 V 411 L 0 681 Z" fill="#828062" />
      <Lattice color={c.cream} spacing={21} opacity={0.27} angle={123} />
      {papers.map(({ x, y, angle, word, fill }, i) => {
        const enter = step(i, 39, 15);
        return (
          <g
            key={word}
            transform={`translate(${x + (i === 1 ? 181 : -134) * (1 - enter) + (i - 1) * 234 * tear} ${y + 167 * (1 - enter) + 21 * hit(i)}) rotate(${angle + (i - 1) * 12 * tear})`}
          >
            <path
              d="M 0 0 H 789 L 819 719 H -5 Z"
              fill={c.coal}
              opacity=".42"
              transform="translate(24 21)"
            />
            <path
              d="M 0 0 H 789 L 819 719 H -5 Z"
              fill={fill}
              stroke={c.coal}
              strokeWidth="3.5"
            />
            <path
              d="M 26 33 H 764 M 29 239 H 779"
              stroke={c.coal}
              strokeWidth={4 + 2 * beat}
              opacity=".75"
            />
            <Text
              x={34}
              y={175}
              size={112}
              fit={686}
              color={i === 2 ? c.pale : c.coal}
            >
              {word}
            </Text>
            {range(19).map((j) => (
              <path
                key={j}
                d={`M ${29 + (j > 9 ? 386 : 0)} ${301 + (j % 10) * 31} h ${256 + noise(j * 17 + i * 39) * 92}`}
                stroke={i === 2 ? c.pale : c.coal}
                strokeWidth="2.4"
                strokeDasharray="54 7 23 8"
                opacity=".55"
              />
            ))}
            <path
              d={`M ${79 + 527 * tear} 0 L 816 ${275 + 351 * tear} V 714 H ${352 + 206 * tear} Z`}
              fill="#493d32"
              opacity={0.27 * tear}
            />
          </g>
        );
      })}
      <Trace
        x={97}
        y={944}
        width={1699}
        amplitude={29 + 36 * tear}
        f={f}
        color={c.amber}
      />
      <InkGrain color={c.coal} opacity={0.13 + 0.13 * phase} />
    </Field>
  );
}

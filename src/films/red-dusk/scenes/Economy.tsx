import {
  c,
  Dial,
  Field,
  Figure,
  InkGrain,
  Lattice,
  noise,
  PunchTape,
  range,
  Stamp,
  Text,
  Trace,
  Wheel,
} from "../art";
import { useMotion } from "../score";

const queue = range(11).map((i) => ({
  i,
  x: 175 + i * 119,
  y: 687 - i * 12,
  size: 1.44 - i * 0.052,
  coat: ["#2a3937", "#3a3a31", "#4e4b3d", "#353b3b"][i % 4],
}));

export function Store() {
  const { f, phase, step, beat } = useMotion("store");
  const wait =
    0.46 * step(0, 36, 9) + 0.36 * step(1, 36, 9) + 0.18 * step(2, 37, 7);
  const shut = step(2, 45, 4);
  return (
    <Field fill="#766d53">
      <path d="M 0 0 H 1920 V 577 L 0 745 Z" fill="#ad9d73" />
      <path d="M 0 979 L 1920 733 V 1080 H 0 Z" fill="#46514a" />
      <Lattice spacing={48} color={c.cream} opacity={0.19} angle={82} line />
      <path d="M 1352 256 L 1857 156 V 869 L 1352 961 Z" fill="#776245" />
      <path
        d="M 1412 425 L 1806 361 V 771 L 1412 842 Z"
        fill="#273734"
        stroke={c.sand}
        strokeWidth="7"
      />
      <path
        d="M 1432 554 L 1787 494 M 1432 681 L 1787 622"
        stroke={c.bone}
        strokeWidth="4.3"
        opacity=".71"
      />
      <path
        d={`M 1412 425 L 1806 361 L 1806 ${373 + 393 * shut} L 1412 ${434 + 398 * shut} Z`}
        fill="#4a5247"
        stroke={c.bone}
        strokeWidth="2.8"
      />
      {range(11).map((i) => (
        <path
          key={i}
          d={`M 1418 ${429 + i * 33 * shut} L 1802 ${365 + i * 33 * shut}`}
          stroke={c.coal}
          opacity={0.48 * shut}
        />
      ))}
      <path d="M 1382 288 L 1824 201 V 315 L 1382 397 Z" fill={c.coal} />
      <g transform="rotate(-11 1406 350)">
        <Text x={1406} y={353} size={43} color={c.cream} tracking={3}>
          ПРОДУКТЫ
        </Text>
      </g>
      <g transform={`translate(${-65 * phase} 0)`}>
        {[...queue].reverse().map(({ i, x, y, size, coat }) => {
          const pace = Math.max(0, wait - (10 - i) * 0.044);
          const px = x + 83 * pace;
          const sway = Math.sin(23 * pace + i * 0.46) * 4.5 * pace;
          return (
            <g key={i}>
              <path
                d={`M ${px - 38} ${y + 196 * size} l ${201 * size} 21 l -36 15 l ${-203 * size} -20 Z`}
                fill="#302e27"
                opacity=".38"
              />
              <Figure
                x={px}
                y={y + sway + 6 * beat}
                color={coat}
                outline={c.sand}
                index={i}
                scale={size}
                step={Math.sin(19 * pace)}
              />
              {i % 3 === 1 && (
                <path
                  d={`M ${px + 53} ${y + 106 * size} h 43 l 14 53 h -61 Z`}
                  fill="#956747"
                  stroke={c.bone}
                  strokeWidth="1.4"
                />
              )}
            </g>
          );
        })}
      </g>
      <path
        d={`M 92 899 Q 743 ${908 + 15 * beat} 1348 781`}
        stroke={c.bone}
        strokeWidth="2.2"
        fill="none"
        opacity=".52"
      />
      <Stamp x={113} y={124} width={258} fill="#302f28" ink={c.cream}>
        ОЧЕРЕДЬ
      </Stamp>
      <InkGrain color={c.coal} opacity={0.18 + f * 0.0005} />
    </Field>
  );
}

const couponItems = [
  { name: "САХАР", fill: "#87694b" },
  { name: "МАСЛО", fill: "#536c5c" },
  { name: "МЫЛО", fill: "#914738" },
  { name: "ТАБАК", fill: "#4f5b65" },
];
export function Ration() {
  const { phase, step, hit, beat } = useMotion("ration");
  const turn = step(2, 34, 12);
  return (
    <Field fill="#404c41">
      <path d="M 0 0 H 1920 V 847 L 0 1078 Z" fill="#63705a" />
      <Lattice color={c.cream} spacing={16} opacity={0.2} angle={36} line />
      <g
        transform={`translate(${956 + 63 * turn} ${545 + 20 * beat}) rotate(${-8 + 3 * turn})`}
      >
        <path
          d="M -722 -362 H 722 V 362 H -722 Z"
          fill={c.coal}
          transform="translate(29 22)"
          opacity=".48"
        />
        <path d="M -722 -362 H 722 V 362 H -722 Z" fill="#d7cba0" />
        <path
          d="M -697 -342 H 697 V 341 H -697 Z"
          stroke="#615d47"
          strokeWidth="2.7"
          fill="none"
        />
        <path
          d="M -666 -124 H 664 M -664 285 H 666"
          stroke={c.coal}
          strokeWidth="3.2"
          opacity=".65"
        />
        <Text x={-655} y={-169} size={142} color={c.coal} tracking={5}>
          ПО ТАЛОНАМ
        </Text>
        <Dial
          x={542}
          y={-248}
          radius={80}
          turn={-41 + 112 * phase}
          color="#785f43"
          pointer={c.rust}
        />
        {couponItems.map(({ name, fill }, i) => {
          const pull = step(i, 39, 13);
          const x = -477 + i * 313 + (i - 1.5) * 41 * pull;
          return (
            <g
              key={name}
              transform={`translate(${x} ${62 + 214 * pull + 22 * hit(i)}) rotate(${(i - 1.5) * 12 * pull})`}
            >
              <path
                d="M -129 -134 H 129 L 141 -122 V 124 L 128 134 H -142 V -120 Z"
                fill={fill}
                stroke={c.bone}
                strokeWidth="3"
              />
              <path
                d="M -119 -109 H 116 V 108 H -119 Z"
                fill="none"
                stroke={c.cream}
                strokeWidth="2.1"
                opacity=".72"
              />
              <path
                d="M -129 -128 H 126 M -139 130 H 126"
                stroke={c.cream}
                strokeDasharray="2 9"
                strokeWidth="3"
              />
              <Text x={0} y={11} size={78} color={c.cream} anchor="middle">
                {name}
              </Text>
              <path
                d="M -95 51 H 96 M -94 68 H 27"
                stroke={c.cream}
                strokeWidth="2"
                opacity=".57"
              />
            </g>
          );
        })}
      </g>
      <InkGrain opacity={0.23} />
    </Field>
  );
}

export function Ruble() {
  const { f, step, hit, phase, beat } = useMotion("ruble");
  const exchange = step(2, 24, 9);
  return (
    <Field fill="#2e3e3b">
      <path d="M 0 0 H 1920 V 505 L 0 807 Z" fill="#626d58" />
      <Lattice color={c.cream} spacing={60} opacity={0.22} angle={55} line />
      {["50", "100"].map((value, i) => {
        const p = step(i, 39, 9);
        return (
          <g
            key={value}
            transform={`translate(${370 + i * 436 + 177 * p} ${372 + 176 * i - 56 * p + 20 * hit(i)}) rotate(${-15 + 12 * i + 8 * exchange})`}
          >
            <rect
              width="977"
              height="428"
              fill={i ? "#c6a281" : "#a7b494"}
              stroke={c.coal}
              strokeWidth="4"
            />
            <path
              d="M 22 21 H 954 V 408 H 22 Z M 40 42 H 933 V 386 H 40 Z"
              stroke="#4d5140"
              strokeWidth="2.8"
              fill="none"
            />
            <Dial
              x={741}
              y={223}
              radius={162}
              turn={f * 0.62 - 31}
              color="#5b5841"
              pointer={c.rust}
            />
            <Text x={83} y={289} size={259} color="#253a35" tracking={-7}>
              {value}
            </Text>
            <Text x={96} y={357} size={35} face="mono" color="#494b3b">
              РУБЛЕЙ
            </Text>
            {range(8).map((j) => (
              <path
                key={j}
                d={`M ${438 + 10 * j} 91 q 151 ${25 + 0.28 * f} 31 199`}
                fill="none"
                stroke="#7a674d"
                strokeWidth="1"
                opacity=".56"
              />
            ))}
          </g>
        );
      })}
      <g
        transform={`translate(${127 + 149 * exchange} ${235 + 50 * exchange}) rotate(${-11 + 7 * exchange})`}
        opacity={0.54 + 0.46 * exchange}
      >
        <path
          d="M 0 0 H 504 V 195 H 0 Z"
          fill="#854638"
          stroke={c.cream}
          strokeWidth="5"
        />
        <Text
          x={23}
          y={141 - 13 * beat}
          size={114}
          color={c.cream}
          tracking={3}
        >
          ОБМЕН
        </Text>
      </g>
      <Stamp x={115} y={132} width={388} fill="#253732" ink={c.cream}>
        ЯНВАРЬ 1991 ГОДА
      </Stamp>
      <path
        d={`M 113 978 L ${1750 - 172 * phase} 804`}
        stroke={c.cream}
        opacity=".63"
        strokeWidth="2.5"
      />
    </Field>
  );
}

const jars = range(28);
export function Cooperative() {
  const { f, step, beat, phase } = useMotion("cooperative");
  const split = step(1, 38, 15);
  return (
    <Field fill="#334745">
      <path
        d={`M 0 0 H ${1120 - 291 * split} L ${898 - 232 * split} 1080 H 0 Z`}
        fill="#a69d79"
      />
      <path
        d={`M 1920 0 V 1080 H ${898 - 232 * split} L ${1117 - 291 * split} 0 Z`}
        fill="#875142"
      />
      <Lattice color={c.cream} spacing={43} opacity={0.2} angle={90} line />
      {[0, 1].map((i) => (
        <g
          key={i}
          transform={`translate(${i ? 1015 - 136 * split : 138 - 83 * split} ${338 + 16 * (i ? beat : -beat)}) skewY(${i ? -4 : 5})`}
        >
          <path
            d="M 0 0 H 786 V 473 H 0 Z"
            fill={i ? "#62513a" : "#3a463c"}
            stroke={c.bone}
            strokeWidth="3"
          />
          <path
            d="M 17 143 H 767 M 17 291 H 767 M 17 437 H 767"
            stroke={c.sand}
            strokeWidth="9"
          />
          {jars.map((j) => {
            const x = 53 + (j % 10) * 66;
            const y = 140 + Math.floor(j / 10) * 147 - 2 * beat;
            const stock = i
              ? 0.48 + 0.52 * step(j % 4, 37, 15)
              : j === 0 || j === 12
                ? 0.48 * (1 - split)
                : 0;
            return (
              <g key={j} transform={`translate(${x} ${y})`} opacity={stock}>
                <path
                  d="M -20 -85 H 20 V -72 L 25 -64 V -3 H -25 V -64 L -20 -72 Z"
                  fill={j % 3 ? "#b8a66c" : "#987146"}
                  stroke={c.coal}
                  strokeWidth="2"
                />
                <path
                  d="M -26 -45 H 26 V -22 H -26 Z"
                  fill={j % 3 === 1 ? c.rust : "#496759"}
                />
              </g>
            );
          })}
        </g>
      ))}
      <path
        d={`M 0 899 L 1920 ${791 + 79 * phase} V 1080 H 0 Z`}
        fill="#2a3938"
        opacity=".77"
      />
      <Text x={122} y={246} size={35} face="mono" color={c.coal} fit={442}>
        ГОСУДАРСТВЕННЫЙ
      </Text>
      <Text
        x={1053 - 141 * split}
        y={219}
        size={38}
        face="mono"
        color={c.cream}
      >
        КООПЕРАТИВ
      </Text>
      <Trace
        x={129}
        y={952}
        width={1660}
        amplitude={14 + 29 * beat}
        f={f}
        color={c.amber}
      />
    </Field>
  );
}

const sparks = range(38).map((i) => ({
  dx: noise(i * 18 + 5) * 649 - 270,
  dy: 152 + noise(i * 9) * 412,
  color: i % 3 === 0 ? c.pale : c.amber,
}));
export function Factory() {
  const { f, step, hit, audio, phase, beat } = useMotion("factory");
  const slip = step(2, 43, 14);
  const piston = 8 + 38 * hit(1) + 42 * hit(2) + 17 * hit(3);
  const sparksLift = step(2, 38);
  return (
    <Field fill="#263a3b">
      <path d="M 0 0 H 1920 V 476 L 0 799 Z" fill="#55695a" />
      <path d="M 0 945 L 1920 761 V 1080 H 0 Z" fill="#846748" />
      <Lattice color={c.cream} spacing={26} angle={128} opacity={0.25} line />
      <Wheel
        x={554 - 124 * slip}
        y={498}
        r={361}
        turn={f * 1.44 - 97 * slip}
        color="#9da990"
        hub="#324647"
      />
      <Wheel
        x={869 - 126 * slip}
        y={761}
        r={214}
        turn={-f * 2.29 + 70 * slip}
        color="#ac8860"
        hub="#3c443a"
      />
      <path
        d={`M 1129 -10 H 1523 V ${585 + piston} H 1452 L 1377 ${798 + piston} H 1275 L 1183 ${585 + piston} H 1129 Z`}
        fill="#14292e"
        stroke={c.bone}
        strokeWidth="4.4"
      />
      <path
        d={`M 1203 0 V ${531 + piston} M 1467 0 V ${531 + piston}`}
        stroke={c.mint}
        strokeWidth="5"
        opacity=".5"
      />
      <path
        d={`M 875 ${837 + 32 * slip} H 1786 V ${907 + 34 * slip} H 875 Z`}
        fill="#ad8b5d"
        stroke={c.coal}
        strokeWidth="6"
      />
      <PunchTape
        x={49 - 370 * phase}
        y={895}
        width={2350}
        height={113}
        angle={-6}
        phase={f * 4.2}
        color="#71563e"
        ink={c.coal}
        density={0.32 + audio.bass * 0.23}
      />
      {sparks.map(({ dx, dy, color }, i) => {
        const x = 1359 + dx * sparksLift;
        const y = 837 - dy * sparksLift + dy * 0.19 * sparksLift * sparksLift;
        return (
          <path
            key={i}
            d={`M ${x} ${y} l ${12 + noise(i) * 27} 8`}
            stroke={color}
            strokeWidth="2"
            opacity={(1 - sparksLift) * Math.min(1, 8 * sparksLift) * 0.83}
          />
        );
      })}
      <Stamp x={118} y={135} width={293} fill={c.coal} ink={c.cream}>
        ЦЕХ СБОРКИ
      </Stamp>
      <path
        d={`M 117 714 h ${249 + 311 * slip + 85 * beat}`}
        stroke={c.red}
        strokeWidth="4"
      />
    </Field>
  );
}

export function Buran() {
  const { f, step, hit, phase, audio, beat } = useMotion("buran");
  const orbit = step(1, 57, 18);
  const sweep = step(2, 49, 12);
  return (
    <Field fill="#223942">
      <Lattice color={c.cream} spacing={66} opacity={0.16} line />
      <circle
        cx={1254 + 110 * sweep}
        cy={1140 + 72 * sweep}
        r="817"
        fill="#3a5b60"
        stroke="#8caaa1"
        strokeWidth="5"
      />
      <circle
        cx={1254 + 110 * sweep}
        cy={1140 + 72 * sweep}
        r="768"
        fill="none"
        stroke={c.bone}
        strokeWidth="1.4"
        opacity=".74"
      />
      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx={1035 + 51 * i}
          cy={580 + i * 41}
          rx={899 - 91 * i}
          ry={i * 37 + 199}
          transform={`rotate(${-21 - 4 * i + 8 * orbit} 1020 605)`}
          fill="none"
          stroke={i === 1 ? c.amber : c.cream}
          strokeWidth={i === 1 ? 3.2 : 1.6}
          opacity={i === 1 ? 0.64 : 0.26}
          strokeDasharray={i === 1 ? "11 13" : "none"}
          strokeDashoffset={-f * 3.7}
        />
      ))}
      <g
        transform={`translate(${753 + 674 * phase} ${629 - 251 * orbit - 49 * hit(2)}) rotate(${-34 + 27 * sweep}) scale(${0.76 + 0.27 * orbit + 0.05 * beat})`}
      >
        <path
          d="M -395 95 L -139 32 L -62 -26 L -3 -48 H 292 Q 360 -47 397 -12 L 287 37 L 41 44 L -82 141 L -267 148 L -194 53 Z"
          fill="#111c24"
          transform="translate(21 22)"
        />
        <path
          d="M -395 95 L -139 32 L -62 -26 L -3 -48 H 292 Q 360 -47 397 -12 L 287 37 L 41 44 L -82 141 L -267 148 L -194 53 Z"
          fill="#d7d0a9"
          stroke={c.bone}
          strokeWidth="2.5"
        />
        <path
          d="M -266 144 L -84 133 L 45 38 H 288 L 393 -11 L 338 22 L 250 55 L 14 57 L -87 151 H -271 Z"
          fill="#31414a"
        />
        <path
          d="M 220 -35 H 291 L 325 -23 L 242 -22 Z M -90 -12 L -166 -84 H -201 L -168 26 Z"
          fill="#45636b"
        />
        <path
          d="M -184 37 H 207 M -105 14 H 265"
          stroke="#677970"
          strokeWidth="2.9"
        />
        <path d="M -172 99 L -104 86 L -99 108 L -174 120 Z" fill={c.rust} />
      </g>
      <Trace
        x={118}
        y={839}
        width={1698}
        amplitude={15 + 28 * audio.middle + 17 * hit(3)}
        f={f}
        color={c.amber}
      />
      <Text x={108} y={414} size={193} color={c.cream}>
        БУРАН
      </Text>
      <Text x={120} y={476} size={30} face="mono" color={c.bone}>
        БАЙКОНУР · 15.11.1988
      </Text>
      <InkGrain opacity={0.15} />
    </Field>
  );
}

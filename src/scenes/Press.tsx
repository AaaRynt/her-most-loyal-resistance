import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  FrameRule,
  Hatch,
  Register,
  Seal,
  Tread,
  Type,
  brass,
  ink,
  paper,
  rust,
  sand,
} from "../Art";
import { ease, ramp, since, strike } from "../score";

export function Underground() {
  const f = useCurrentFrame();
  const reveal = ease(f + 2, 0, 19);
  const shake = strike(f, 0, 6);
  const next = ease(
    f,
    since("transit", "press") - 19,
    since("transit", "press") + 2,
  );
  return (
    <section className="scene" style={{ background: "#1a292a" }}>
      <Board>
        <Hatch color={sand} opacity={0.22} angle={40} />
        <path
          d={`M 0 0 H 1920 L ${992 + 278 * next} 1080 H 0 Z`}
          fill="#253f40"
        />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={i}
            d={`M ${-140 + 155 * i + 113 * next} -36 h 62 L ${-655 + 155 * i + 361 * next} 1120 h -55 Z`}
            fill={i % 3 === 0 ? rust : ink}
            opacity={0.22 + (i % 3) * 0.09}
          />
        ))}
        <g style={{ color: brass }} opacity=".75">
          <Seal
            x={1515 - 83 * next}
            y={486}
            radius={349 + 18 * shake}
            rotation={70 - 1.15 * f}
          />
          <Seal x={1515 - 83 * next} y={486} radius={240} rotation={1.6 * f} />
          <Register x={1515 - 83 * next} y={486} size={25} />
        </g>
        <path
          d={`M 99 ${691 - 48 * shake} H 1814 L 1613 816 H 248 Z`}
          fill="#936035"
        />
        <path
          d={`M 99 ${690 - 48 * shake} H 1814`}
          stroke={brass}
          strokeWidth="4"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>The underground</Caption>
      <Type
        name="HMMLR"
        style={{
          color: paper,
          top: 374 + 34 * shake,
          left: 110 - 82 * (1 - reveal),
          fontSize: 320,
          clipPath: `inset(0 ${100 - 100 * reveal}% -28px 0)`,
        }}
      >
        HMMLR
      </Type>
    </section>
  );
}

const metalShapes = [
  {
    d: "M 20 77 H 278 L 318 57 H 472 V 115 H 382 L 368 154 H 249 L 208 124 H 20 Z M 51 90 H 158 V 108 H 51 Z M 290 91 H 351 V 120 H 290 Z",
    x: 552,
    y: 352,
    a: -8,
  },
  {
    d: "M 49 12 H 142 L 125 68 L 154 102 L 118 208 L 38 194 L 71 89 L 22 61 Z M 63 137 L 113 151 L 105 166 L 55 152 Z",
    x: 1032,
    y: 478,
    a: 13,
  },
  {
    d: "M 27 22 H 324 V 55 H 257 L 241 76 H 48 L 18 67 L 17 34 Z",
    x: 642,
    y: 624,
    a: -5,
  },
  {
    d: "M 11 14 H 181 L 208 54 L 181 116 H 68 L 10 85 Z M 49 45 H 122 V 76 H 48 Z",
    x: 1245,
    y: 418,
    a: -12,
  },
];

export function Transit() {
  const f = useCurrentFrame();
  const latchAt = since("transitLatch", "transit");
  const kick = strike(f, 0, 5) + 0.8 * strike(f, latchAt, 6);
  const open = ease(f, 4, 23);
  const shift = ease(f, latchAt - 3, latchAt + 22);
  const roll = ramp(f, 0, since("cache", "transit"));
  return (
    <section className="scene" style={{ background: "#bc9b63", color: ink }}>
      <Board>
        <Hatch color={ink} opacity={0.22} angle={113} scale={14} />
        <g opacity=".23">
          <Tread
            x={200}
            y={516}
            angle={54}
            phase={f * 7}
            scale={1.33}
            color="#755239"
          />
          <Tread
            x={1710}
            y={478}
            angle={54}
            phase={f * 7 + 22}
            scale={1.33}
            color="#755239"
          />
        </g>
        <g
          transform={`translate(${-320 + 361 * open - 216 * roll} ${80 * (1 - open) + 16 * kick}) rotate(${-10 + 4.5 * shift} 1052 515)`}
        >
          <path
            d="M 353 274 H 1683 V 773 L 1584 833 H 299 V 330 Z"
            fill="#3b322b"
          />
          <path d="M 392 310 H 1634 V 750 H 352 V 356 Z" fill="#d6c18a" />
          <path
            d="M 384 323 H 1621 V 736 H 369 V 364 Z"
            fill="#ac8958"
            stroke={ink}
            strokeWidth="2"
          />
          {metalShapes.map(({ d, x, y, a }, i) => (
            <g
              key={d}
              opacity={0.2 + 0.8 * open}
              transform={`translate(${x + 15 * shift * i - 21 * kick} ${y - 24 * (1 - open) + 11 * shift * i}) rotate(${a + 4 * shift})`}
            >
              <path
                d={d}
                fill="#92593d"
                transform="translate(10 9)"
                fillRule="evenodd"
                opacity=".77"
              />
              <path d={d} fill={ink} fillRule="evenodd" />
              <path
                d="M 40 40 h 77 M 44 49 h 47"
                stroke={paper}
                strokeWidth="1.7"
                opacity=".57"
              />
            </g>
          ))}
          <path
            d={`M 373 306 H 1648 V ${738 - 403 * open} H 366 Z`}
            fill="#5d4331"
          />
          <path
            d="M 387 310 H 1648 M 370 749 H 1637"
            stroke={paper}
            strokeWidth="4"
            opacity=".6"
          />
          <path
            d="M 350 293 l 32 38 L 347 749 L 310 772 Z M 1661 290 l -31 38 v 422 l 32 35 Z"
            fill="#211f1d"
          />
          <path
            d="M 324 338 H 373 M 325 718 H 369 M 1623 339 H 1660 M 1624 719 H 1660"
            stroke={brass}
            strokeWidth="6.2"
          />
        </g>
        <FrameRule color={ink} />
      </Board>
      <Caption color={ink}>In transit</Caption>
    </section>
  );
}

const bottlePath =
  "M -14 -172 H 17 V -105 C 18 -82 39 -77 44 -57 L 49 87 Q 50 113 29 116 H -32 Q -50 114 -50 89 L -46 -55 Q -43 -75 -22 -91 L -14 -109 Z";
const bottles = Array.from({ length: 12 }, (_, i) => ({
  x: 444 + 241 * (i % 6),
  y: 493 + 320 * Math.floor(i / 6),
  back: i < 6,
  i,
}));

export function Cache() {
  const f = useCurrentFrame();
  const shelfAt = since("cacheShelf", "cache");
  const unlock = ease(f, 5, 32);
  const open = ease(f, shelfAt - 6, shelfAt + 22);
  const attack = strike(f, 0, 5) + 0.7 * strike(f, shelfAt, 7);
  return (
    <section className="scene" style={{ background: "#242523" }}>
      <Board>
        <Hatch color={sand} opacity={0.16} scale={14} />
        <path d="M 339 222 H 1761 V 921 H 255 Z" fill="#4a3d2f" />
        <path d="M 373 252 H 1730 V 896 H 299 Z" fill="#5f5039" />
        <path
          d="M 362 497 H 1748 V 652 H 346 Z M 331 794 H 1748 V 920 H 302 Z"
          fill="#252d2b"
        />
        <g
          transform={`translate(${-102 * open} ${23 * attack}) skewX(${-6 * (1 - open)})`}
        >
          {bottles.map(({ x, y, back, i }) => (
            <g
              key={i}
              transform={`translate(${x + 14 * Math.sin(i * 2.5)} ${y - 9 * (i % 3)}) rotate(${((i % 3) - 1) * 4}) scale(${back ? 0.76 : 1.08})`}
            >
              <path
                d={bottlePath}
                fill={back ? "#394b42" : "#152827"}
                transform="translate(11 13)"
                opacity=".59"
              />
              <path
                d={bottlePath}
                fill={i % 2 ? "#223b35" : "#162725"}
                stroke={back ? "#909275" : "#a49b74"}
                strokeWidth="2.2"
              />
              <path
                d="M -30 -48 L -32 88 M 31 -41 L 33 48 M -36 77 Q 3 83 37 76 M -16 -172 H 18"
                fill="none"
                stroke={paper}
                strokeWidth="2.4"
                opacity=".34"
              />
              <path
                d={`M -15 -166 L 18 -166 L ${44 + 6 * open} -193 L 59 -184 L 33 -156 L 18 -150 H -15 Z`}
                fill={i % 3 ? "#baa16e" : "#a84a36"}
              />
              <path
                d="M -38 26 Q 0 20 40 25 L 40 44 Q 4 50 -38 43 Z"
                fill={brass}
                opacity={back ? 0.26 : 0.54}
              />
            </g>
          ))}
        </g>
        <path
          d={`M 278 593 L 1804 577 V 625 L 276 653 Z M 210 896 L 1807 883 V 933 L 238 971 Z`}
          fill={ink}
        />
        <path
          d={`M 274 597 L 1804 579 M 229 908 L 1807 884`}
          stroke={brass}
          strokeWidth="3"
          opacity=".71"
        />
        <path
          d={`M 0 200 L ${1920 * (1 - unlock)} 158 L ${1880 * (1 - unlock)} 940 L 0 978 Z`}
          fill="#363a2d"
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>Hidden stock</Caption>
    </section>
  );
}

const clothLines = Array.from({ length: 35 }, (_, i) => i * 11 - 166);
const flecks = [
  [306, -90, 15],
  [377, 24, 9],
  [518, 55, 21],
  [592, 19, 11],
  [393, 105, 11],
  [232, 104, 8],
  [380, -134, 8],
  [545, -79, 5],
  [497, 112, 7],
];

export function Armband() {
  const f = useCurrentFrame();
  const stainAt = since("clothStain", "cloth");
  const enter = ease(f + 2, 0, 23);
  const darken = ease(f, stainAt - 3, stainAt + 28);
  const bend = strike(f, stainAt, 7);
  const flutter = Math.sin(f * 0.15) * (16 - 7 * enter);
  return (
    <section className="scene" style={{ background: "#2a3334" }}>
      <Board>
        <Hatch color={paper} opacity={0.2} angle={137} scale={14} />
        <path d="M 0 0 H 1920 V 267 L 888 340 L 0 683 Z" fill="#162629" />
        <path
          d={`M 0 913 L 1920 ${717 - 120 * darken} V 1080 H 0 Z`}
          fill={rust}
          opacity=".37"
        />
        <g
          transform={`translate(${995 - 132 * (1 - enter) + 30 * bend} ${577 - 17 * bend}) rotate(${-11 + 4.2 * enter + 2.2 * bend}) scale(${0.78 + 0.22 * enter})`}
        >
          <defs>
            <clipPath id="recognition-fabric">
              <path
                d={`M -762 -176 L -709 -167 Q -292 ${-234 + flutter} 15 -173 T 725 -189 L 735 -154 L 723 -124 L 740 -86 L 727 -21 L 740 31 L 729 76 L 740 125 L 717 166 Q 292 ${142 + flutter} 4 174 Q -359 224 -735 180 L -746 146 L -737 91 L -748 49 L -739 6 L -752 -31 L -743 -88 L -756 -128 Z`}
              />
            </clipPath>
          </defs>
          <g clipPath="url(#recognition-fabric)">
            <rect x="-810" y="-245" width="1600" height="500" fill="#ddc9a0" />
            {clothLines.map((y, i) => (
              <path
                key={y}
                d={`M -789 ${y} Q -424 ${y - 53 + flutter} -144 ${y - 4} T 401 ${y + 16 - flutter} T 753 ${y - 15}`}
                fill="none"
                stroke={i % 5 === 0 ? "#6f6654" : "#ae996f"}
                strokeWidth={i % 5 === 0 ? 2.4 : 1.1}
                opacity=".52"
              />
            ))}
            <path
              d={`M -740 -144 Q -408 ${-182 + flutter} -79 -146 T 735 -152 M -737 147 Q -514 193 -210 157 T 724 134`}
              fill="none"
              stroke={ink}
              strokeWidth="2.2"
              strokeDasharray="11 7 2 7"
              opacity=".71"
            />
            <g
              fill={rust}
              opacity={0.58 + 0.28 * darken}
              transform={`translate(350 24) scale(${0.66 + 0.45 * darken}) translate(-350 -24)`}
            >
              <path d="M 270 -64 L 304 -91 L 349 -87 L 376 -107 L 412 -77 L 449 -81 L 475 -63 L 473 -32 L 514 -13 L 504 20 L 528 45 L 490 67 L 453 60 L 431 100 L 396 94 L 379 119 L 336 91 L 296 101 L 271 70 L 232 67 L 236 35 L 206 5 L 239 -19 L 236 -44 Z" />
              {flecks.map(([x, y, r]) => (
                <ellipse
                  key={x}
                  cx={x}
                  cy={y}
                  rx={r}
                  ry={0.54 * r}
                  transform={`rotate(19 ${x} ${y})`}
                />
              ))}
            </g>
            <text
              x="-612"
              y="73"
              fill={ink}
              fontFamily="Barlow Condensed"
              fontWeight="800"
              fontSize="211"
              letterSpacing="24"
            >
              HMMLR
            </text>
          </g>
        </g>
        <FrameRule color={paper} />
      </Board>
      <Caption>Recognition band</Caption>
    </section>
  );
}

const groups = [
  {
    name: "Royalists",
    at: "alliance",
    text: ink,
    fill: "#dacba0",
    y: 242,
    turn: -6,
  },
  {
    name: "Trade unionists",
    at: "allianceSecond",
    text: paper,
    fill: "#854433",
    y: 460,
    turn: 4,
  },
  {
    name: "Former soldiers",
    at: "allianceThird",
    text: paper,
    fill: "#355251",
    y: 680,
    turn: -3,
  },
] as const;

export function Alliance() {
  const f = useCurrentFrame();
  const setAt = since("lockup", "alliance");
  const hitAt = since("pressStrike", "alliance");
  const lock = ease(f, setAt - 7, hitAt + 4);
  const hit = strike(f, hitAt, 8);
  const close = ease(f, hitAt - 4, hitAt + 16);
  return (
    <section className="scene" style={{ background: "#bdaa78", color: ink }}>
      <Board>
        <Hatch color={ink} opacity={0.22} angle={112} />
        <path d="M 1920 38 L 775 1080 H 1920 Z" fill="#9e7951" opacity=".8" />
        <g style={{ color: ink }} opacity=".53">
          <Seal
            x={1422 - 351 * lock}
            y={519}
            radius={402 + 17 * hit}
            rotation={-20 + 30 * lock}
          />
          <Register x={1422 - 351 * lock} y={519} />
        </g>
        <path
          d={`M 101 ${215 + 100 * close} H ${612 + 1130 * close} L 1805 423 H 101`}
          stroke={ink}
          strokeWidth="2.6"
          fill="none"
          opacity=".49"
        />
        <FrameRule color={ink} />
      </Board>
      <Caption color={ink}>The Resistance</Caption>
      {groups.map(({ name, at, text, fill, y, turn }, i) => {
        const atFrame = since(at, "alliance");
        const enter = ease(f + 4, atFrame, atFrame + 16);
        const push = strike(f, atFrame, 6);
        return (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 130 + 81 * i - 750 * (1 - enter) + 98 * lock * i,
              top: y - 25 * push - 72 * lock * i,
              width: 1203 - 70 * i,
              height: 168,
              background: fill,
              color: text,
              opacity: enter * (1 - close),
              rotate: `${turn * (1 - lock) + 2 * push}deg`,
              clipPath: "polygon(0 2%,99.3% 0,100% 91%,.6% 100%)",
              borderTop: `3px solid ${text}`,
              borderBottom: `2px solid ${text}`,
            }}
          >
            <Type
              name={name}
              style={{
                left: 27,
                top: 15,
                fontSize: 140,
                textTransform: "uppercase",
              }}
            >
              {name}
            </Type>
          </div>
        );
      })}
      <Type
        name="A common enemy"
        style={{
          left: 118 + 18 * hit,
          top: 397 - 17 * hit,
          fontSize: 231,
          color: ink,
          opacity: close,
          textShadow: `${-16 * hit}px ${11 * hit}px 0 ${rust}`,
          clipPath: `inset(0 ${100 - 100 * close}% -25px 0)`,
        }}
      >
        A COMMON ENEMY.
      </Type>
    </section>
  );
}

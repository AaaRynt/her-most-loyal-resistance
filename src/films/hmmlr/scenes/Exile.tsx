import { useCurrentFrame } from "remotion";
import {
  Board,
  Caption,
  Crown,
  FrameRule,
  Hatch,
  Register,
  Seal,
  Type,
  brass,
  ink,
  paper,
  sea,
  teal,
} from "../Art";
import { cue, ease, scoreAt, since, strike } from "../score";

const latitudes = Array.from({ length: 19 }, (_, i) => i * 73 - 72);
const meridians = Array.from({ length: 16 }, (_, i) => i * 125 - 270);

export function Exile() {
  const f = useCurrentFrame();
  const liftAt = since("exileSoft", "exile");
  const rise = ease(f, 0, 49);
  const drift = ease(f, liftAt - 8, since("crown", "exile") + 7);
  const { mids } = scoreAt(f + cue("exile"));
  const rel = strike(f, liftAt, 13);
  const x = 1434 - 117 * drift;
  const y = 548 - 50 * rise;
  return (
    <section
      className="scene"
      style={{
        background:
          "radial-gradient(ellipse at 71% 48%,#31555d,#1c3945 48%,#152832 91%)",
      }}
    >
      <Board>
        <Hatch color={sea} opacity={0.16} angle={111} scale={15} />
        <g fill="none" stroke={sea} strokeWidth="1.2" opacity=".42">
          {latitudes.map((n) => (
            <path
              key={n}
              d={`M -180 ${n - 206} Q 803 ${n + 387 - 125 * drift} 2072 ${n - 111}`}
            />
          ))}
          {meridians.map((n) => (
            <path
              key={n}
              d={`M ${n + 530} -30 Q ${n - 300} 626 ${n + 185} 1160`}
            />
          ))}
        </g>
        <path
          d="M 0 158 L 1920 834 V 1080 H 0 Z"
          fill="#142a35"
          opacity=".47"
        />
        <g
          transform={`translate(${x} ${y}) scale(${0.83 + 0.17 * rise + 0.026 * rel}) translate(${-x} ${-y})`}
        >
          <circle
            cx={x}
            cy={y}
            r="323"
            fill="#254854"
            stroke={sea}
            strokeWidth="1.6"
          />
          <g style={{ color: brass }} opacity={0.74 + 0.2 * rel}>
            <Seal x={x} y={y} radius={325} rotation={-15 + 25 * drift} />
          </g>
          <g style={{ color: paper }}>
            <Crown x={x} y={y - 8} scale={1.8} />
          </g>
          <path
            d={`M ${x - 220} ${y + 168} Q ${x} ${y + 240} ${x + 220} ${y + 168}`}
            stroke={sea}
            strokeWidth={1.6 + mids}
            opacity=".7"
            fill="none"
          />
          <g style={{ color: sea }}>
            <Register x={x - 342} y={y} />
            <Register x={x + 342} y={y} />
          </g>
        </g>
        <path
          d={`M 123 859 C 438 859 641 851 848 792 S ${x - 50} ${y + 418} ${x + 294} ${y + 144}`}
          stroke={brass}
          strokeWidth="2.4"
          fill="none"
          strokeDasharray="8 12"
          opacity={0.31 + 0.29 * drift}
          strokeDashoffset={-f * 0.85}
        />
        <FrameRule color={paper} />
      </Board>
      <Caption>Canada</Caption>
      <Type
        name="Elizabeth II"
        face="serif"
        style={{
          left: 116,
          top: 328,
          color: paper,
          fontSize: 169,
          translate: `${-22 * (1 - rise)}px ${21 * (1 - rise)}px`,
          opacity: 0.55 + 0.45 * rise,
        }}
      >
        Elizabeth II
      </Type>
      <Caption x={125} y={545} color={brass}>
        The queen in exile
      </Caption>
    </section>
  );
}

const signalStrokes = [0, 1, 2, 3];

export function Signal() {
  const f = useCurrentFrame();
  const one = since("signalOne", "crown");
  const two = since("signalTwo", "crown");
  const pickUp = since("pickup", "crown");
  const close = ease(f, pickUp - 9, pickUp + 24);
  const tone =
    strike(f, one, 12) + 0.8 * strike(f, two, 12) + strike(f, pickUp, 12);
  const daybreak = ease(f, 0, 47);
  const wave = (track: number) =>
    Array.from({ length: 90 }, (_, i) => {
      const x = 107 + i * 19.2;
      const read = scoreAt(
        Math.max(cue("exile"), cue("crown") + f - (89 - i) * 2 - track * 7),
      );
      const amp = (38 + 21 * track) * (0.53 + 0.39 * daybreak + 0.82 * close);
      const y =
        525 +
        track * (82 - 66 * close) +
        (read.mids - 0.45) * amp +
        Math.sin(i * 0.24 + f * 0.04) *
          (10 + 23 * close) *
          (0.55 + read.treble);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");

  return (
    <section className="scene" style={{ background: teal }}>
      <Board>
        <path d="M 0 0 H 1920 V 313 L 1160 451 L 0 311 Z" fill={ink} />
        <path
          d={`M 0 1080 V ${862 - 229 * close} L 1920 ${755 - 277 * close} V 1080 Z`}
          fill="#122930"
        />
        <Hatch color={sea} opacity={0.17} angle={90} scale={17} />
        <g style={{ color: sea }} opacity={0.36 + 0.2 * tone}>
          <Seal
            x={1137 - 249 * close}
            y={549}
            radius={338}
            rotation={-14 - f * 0.117}
          />
        </g>
        <g strokeWidth="1.4" stroke={sea} fill="none" opacity=".62">
          <path
            d="M 112 525 H 1817 M 112 603 H 1817 M 112 682 H 1817 M 112 763 H 1817"
            strokeDasharray="2 10"
          />
          {Array.from({ length: 37 }, (_, i) => 116 + 47 * i).map((x) => (
            <path key={x} d={`M ${x} 501 v 18 M ${x} 772 v 23`} />
          ))}
        </g>
        {signalStrokes.map((track) => (
          <path
            key={track}
            d={wave(track)}
            fill="none"
            stroke={track === 0 ? paper : brass}
            opacity={(0.77 - 0.13 * track) * (0.72 + 0.28 * daybreak)}
            strokeWidth={track === 0 ? 3.2 + 1.4 * tone : 1.7 + tone}
          />
        ))}
        <g style={{ color: paper }} opacity={0.54 + 0.33 * tone}>
          <Register x={1737 - 178 * close} y={537} size={17} />
          <Register x={1130 - 272 * close} y={763} size={12} />
        </g>
        <g
          transform={`translate(${1459 + 51 * close} 278) rotate(${-14 + 29 * daybreak + 5 * tone})`}
        >
          <circle r="108" fill="#142b31" stroke={brass} strokeWidth="2.5" />
          <circle
            r="86"
            fill="none"
            stroke={sea}
            strokeDasharray="2 7"
            strokeWidth="5"
          />
          <path
            d="M -54 49 L 0 -66 L 14 -15 L 39 -15"
            fill="none"
            stroke={paper}
            strokeOpacity=".8"
            strokeWidth="3.3"
          />
          <circle r="10" fill={brass} />
        </g>
        <FrameRule color={paper} />
      </Board>
      <Caption>Underground radio</Caption>
      <Type
        name="Michael Foot"
        face="serif"
        style={{
          left: 119,
          top: 251,
          color: paper,
          fontSize: 135,
          opacity: 0.84 - 0.64 * close,
          translate: `${-55 * close}px 0`,
        }}
      >
        Michael Foot
      </Type>
      <Caption x={126} y={398} color={brass}>
        Tuesdays · 19:00
      </Caption>
    </section>
  );
}

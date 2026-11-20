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
  rust,
  sand,
  teal,
} from "../Art";
import { cue, ease, scoreAt, since, strike } from "../score";

export function Title() {
  const f = useCurrentFrame();
  const secondAt = since("titleSecondLine", "title");
  const captionAt = since("titleCaption", "title");
  const sealAt = since("lastImpression", "title");
  const end = since("coda", "title");
  const first = ease(f + 2, 0, 22);
  const second = ease(f + 2, secondAt, secondAt + 22);
  const caption = ease(f, captionAt, captionAt + 18);
  const close = ease(f, since("resolve", "title"), end + 12);
  const hit = strike(f, secondAt, 7) + 0.45 * strike(f, sealAt, 9);
  const { treble } = scoreAt(f + cue("title"));
  return (
    <section className="scene" style={{ background: ink }}>
      <Board>
        <path
          d={`M ${1062 - 160 * second} 0 H 1920 V 1080 H ${697 - 83 * second} Z`}
          fill={teal}
        />
        <path
          d={`M 1920 ${121 + 290 * second} L ${1311 + 38 * second} 1080 H 1920 Z`}
          fill="#30494a"
        />
        <path
          d={`M 98 ${715 - 75 * second} L 1724 ${538 + 168 * second} L 1816 ${663 + 96 * second} L 108 ${777 - 19 * second} Z`}
          fill={rust}
          opacity={0.56 + 0.24 * hit}
        />
        <Hatch color={paper} opacity={0.15} scale={14} angle={134} />
        <g
          style={{ color: brass }}
          opacity={0.38 + 0.14 * caption + 0.09 * treble}
        >
          <Seal
            x={1575 - 89 * caption}
            y={416 + 80 * caption}
            radius={416 + 21 * hit}
            rotation={-26 + 23 * first + 7 * caption}
          />
          <Register x={1486} y={496} />
        </g>
        <g style={{ color: paper }} opacity={0.71 * caption}>
          <Crown x={1710} y={180} scale={0.44} />
        </g>
        <path
          d={`M 112 793 H ${112 + 1692 * caption} M 112 814 H ${112 + 859 * caption}`}
          stroke={sand}
          opacity=".65"
          strokeWidth="2.3"
        />
        <FrameRule color={paper} />
      </Board>
      <Type
        name="Her Most Loyal"
        face="serif"
        style={{
          left: 119 - 87 * (1 - first),
          top: 237 - 10 * hit,
          fontSize: 193,
          color: paper,
          clipPath: `polygon(0 0,${102 * first}% 0,${95 * first + 5}% 138%,0 138%)`,
        }}
      >
        Her Most Loyal
      </Type>
      <Type
        name="Resistance"
        style={{
          left: 110 - 96 * (1 - second) + 12 * hit,
          top: 450 + 22 * hit,
          fontSize: 344,
          color: paper,
          clipPath: `polygon(0 0,${100 * second}% 0,${104 * second}% 113%,0 113%)`,
          textShadow: `${9 * hit + 3}px ${9 * hit + 2}px 0 #8a4833`,
        }}
      >
        RESISTANCE
      </Type>
      <div className="full" style={{ opacity: caption }}>
        <Caption x={119} y={843}>
          Her Majesty’s Most Loyal Resistance
        </Caption>
        <Caption x={890} y={885} color="#d7c494">
          Music from The New Order: Last Days of Europe
        </Caption>
      </div>
      <div
        className="full"
        style={{ opacity: close * 0.36, background: "#10191d" }}
      />
    </section>
  );
}

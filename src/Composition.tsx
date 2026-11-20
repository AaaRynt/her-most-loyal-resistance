import { useEffect, useId, useState, type ReactNode } from "react";
import {
  AbsoluteFill,
  Html5Audio,
  Sequence,
  Track,
  useCurrentFrame,
  useDelayRender,
} from "remotion";
import soundtrack from "../reference/her_most_loyal_resistance.ogg";
import {
  Blockade,
  Channel,
  Collaboration,
  Invasion,
  Occupation,
} from "./scenes/FirstAct";
import { Exile, Signal } from "./scenes/Exile";
import { Alliance, Armband, Cache, Transit, Underground } from "./scenes/Press";
import { Fleet, Island, Outbound, ShoreReturn } from "./scenes/Shores";
import { Decree, Market, Rail, Works } from "./scenes/Industry";
import { Postmark, Queue, Ration } from "./scenes/Rations";
import {
  Leaflets,
  Manchester,
  Receivers,
  StreetPrint,
} from "./scenes/Broadcast";
import { Protest, Workers } from "./scenes/Demonstration";
import { Ballot, Clock, Gate, Tear } from "./scenes/Threshold";
import { Collision, Converge, Impression, Night } from "./scenes/Finale";
import { Title } from "./scenes/Title";
import { cue, duration, ease, type Cue } from "./score";
import "./film.css";

type Wipe =
  | "teeth"
  | "drop"
  | "slats"
  | "slash"
  | "iris"
  | "seam"
  | "rise"
  | "diamond"
  | "page"
  | "letterbox";

const spliceLengths: Record<Wipe, number> = {
  teeth: 12,
  drop: 9,
  slats: 16,
  slash: 10,
  iris: 23,
  seam: 13,
  rise: 16,
  diamond: 18,
  page: 16,
  letterbox: 17,
};

function WipeIn({ wipe, children }: { wipe?: Wipe; children: ReactNode }) {
  const frame = useCurrentFrame();
  const mask = useId();
  if (!wipe || frame >= spliceLengths[wipe]) return <>{children}</>;

  const p = ease(frame + 1, 0, spliceLengths[wipe]);
  const x = -28 + 148 * p;
  const y = -18 + 133 * p;
  const clipping: Record<Wipe, string> = {
    teeth: `polygon(0 0,${x - 7}% 0,${x + 7}% 17%,${x - 7}% 21%,${x + 6}% 42%,${x - 6}% 57%,${x + 9}% 72%,${x - 2}% 100%,0 100%)`,
    drop: `polygon(0 0,100% 0,100% ${y + 13}%,0 ${y - 8}%)`,
    slats: `url("#${mask}")`,
    slash: `polygon(${100 - x + 15}% 0,100% 0,100% 100%,${100 - x - 12}% 100%)`,
    iris: `circle(${115 * p}% at 71% 46%)`,
    seam: `inset(${(1 - p) * 56}% 0 ${(1 - p) * 44}% 0)`,
    rise: `polygon(0 ${105 - 126 * p}%,100% ${118 - 139 * p}%,100% 100%,0 100%)`,
    diamond: `polygon(50% ${48 - 116 * p}%,${50 + 116 * p}% 49%,50% ${48 + 119 * p}%,${50 - 116 * p}% 49%)`,
    page: `polygon(0 0,${x - 21}% 0,${x + 19}% 51%,${x - 16}% 100%,0 100%)`,
    letterbox: `inset(0 ${(1 - p) * 56}% 0 ${(1 - p) * 44}%)`,
  };

  return (
    <>
      {wipe === "slats" ? (
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id={mask} clipPathUnits="objectBoundingBox">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const width = ease(frame + 1, 1.1 * i, 10 + 1.1 * i);
                return (
                  <rect
                    key={i}
                    x={i % 2 ? 1 - width : 0}
                    y={i / 6 - 0.0003}
                    width={width}
                    height={0.1675}
                  />
                );
              })}
            </clipPath>
          </defs>
        </svg>
      ) : null}
      <AbsoluteFill style={{ clipPath: clipping[wipe] }}>
        {children}
      </AbsoluteFill>
    </>
  );
}

function Shot({
  name,
  from,
  until,
  wipe,
  children,
}: {
  name: string;
  from?: Cue;
  until?: Cue;
  wipe?: Wipe;
  children: ReactNode;
}) {
  const start = from ? cue(from) : 0;
  const stop = until ? Math.min(duration, cue(until) + 23) : duration;
  return (
    <Sequence name={name} from={start} durationInFrames={stop - start}>
      <WipeIn wipe={wipe}>{children}</WipeIn>
    </Sequence>
  );
}

export function Resistance() {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [fontHandle] = useState(() => delayRender("Load the film’s typefaces"));
  useEffect(() => {
    Promise.all([
      document.fonts.load('400 100px "Instrument Serif"'),
      document.fonts.load('800 100px "Barlow Condensed"'),
      document.fonts.load('500 26px "IBM Plex Mono"'),
    ]).then(
      () => continueRender(fontHandle),
      (error: Error) => cancelRender(error),
    );
  }, [fontHandle, continueRender, cancelRender]);

  return (
    <AbsoluteFill className="film">
      <Track name="Picture" durationInFrames={duration}>
        <Shot name="Engraved island" until="fleet">
          <Island />
        </Shot>
        <Shot name="The Royal Navy" from="fleet" until="channel" wipe="rise">
          <Fleet />
        </Shot>
        <Shot
          name="Dover Strait"
          from="channel"
          until="theCrossing"
          wipe="page"
        >
          <Channel />
        </Shot>
        <Shot
          name="Operation Sealion"
          from="theCrossing"
          until="london"
          wipe="teeth"
        >
          <Invasion />
        </Shot>
        <Shot name="Under occupation" from="london" until="edward" wipe="drop">
          <Occupation />
        </Shot>
        <Shot
          name="The crown in shadow"
          from="edward"
          until="occupied"
          wipe="slats"
        >
          <Collaboration />
        </Shot>
        <Shot name="Barbed wire" from="occupied" until="works" wipe="slash">
          <Blockade />
        </Shot>
        <Shot name="The steelworks" from="works" until="market" wipe="diamond">
          <Works />
        </Shot>
        <Shot
          name="The British market"
          from="market"
          until="decree"
          wipe="page"
        >
          <Market />
        </Shot>
        <Shot
          name="Emergency order"
          from="decree"
          until="rail"
          wipe="letterbox"
        >
          <Decree />
        </Shot>
        <Shot
          name="Midlands rail yards"
          from="rail"
          until="ration"
          wipe="slash"
        >
          <Rail />
        </Shot>
        <Shot name="Ration book" from="ration" until="queue" wipe="slats">
          <Ration />
        </Shot>
        <Shot name="The ration queue" from="queue" until="postmark" wipe="rise">
          <Queue />
        </Shot>
        <Shot name="The postmark" from="postmark" until="outbound" wipe="page">
          <Postmark />
        </Shot>
        <Shot name="The far shore" from="outbound" until="exile" wipe="slash">
          <Outbound />
        </Shot>
        <Shot name="The queen in exile" from="exile" until="crown" wipe="iris">
          <Exile />
        </Shot>
        <Shot
          name="The Tuesday broadcast"
          from="crown"
          until="press"
          wipe="seam"
        >
          <Signal />
        </Shot>
        <Shot name="The underground" from="press" until="transit" wipe="slats">
          <Underground />
        </Shot>
        <Shot name="In transit" from="transit" until="cache" wipe="teeth">
          <Transit />
        </Shot>
        <Shot name="Hidden stock" from="cache" until="cloth" wipe="drop">
          <Cache />
        </Shot>
        <Shot name="Recognition band" from="cloth" until="alliance" wipe="seam">
          <Armband />
        </Shot>
        <Shot name="The alliance" from="alliance" until="leaflets" wipe="slash">
          <Alliance />
        </Shot>
        <Shot
          name="The underground press"
          from="leaflets"
          until="streetPrint"
          wipe="rise"
        >
          <Leaflets />
        </Shot>
        <Shot
          name="The wall poster"
          from="streetPrint"
          until="receivers"
          wipe="page"
        >
          <StreetPrint />
        </Shot>
        <Shot
          name="The listeners"
          from="receivers"
          until="manchester"
          wipe="slats"
        >
          <Receivers />
        </Shot>
        <Shot
          name="Manchester"
          from="manchester"
          until="protest"
          wipe="letterbox"
        >
          <Manchester />
        </Shot>
        <Shot
          name="Street demonstration"
          from="protest"
          until="workers"
          wipe="rise"
        >
          <Protest />
        </Shot>
        <Shot name="Left Resistance" from="workers" until="clock" wipe="slash">
          <Workers />
        </Shot>
        <Shot
          name="The Westminster clock"
          from="clock"
          until="gate"
          wipe="iris"
        >
          <Clock />
        </Shot>
        <Shot name="The iron gate" from="gate" until="ballot" wipe="letterbox">
          <Gate />
        </Shot>
        <Shot name="The ballot" from="ballot" until="tear" wipe="page">
          <Ballot />
        </Shot>
        <Shot name="The torn decree" from="tear" until="converge" wipe="teeth">
          <Tear />
        </Shot>
        <Shot
          name="The streets converge"
          from="converge"
          until="divided"
          wipe="diamond"
        >
          <Converge />
        </Shot>
        <Shot
          name="The night before"
          from="divided"
          until="collision"
          wipe="seam"
        >
          <Night />
        </Shot>
        <Shot name="Collision" from="collision" until="title" wipe="slats">
          <Collision />
        </Shot>
        <Shot name="Final broadside" from="title" until="coda" wipe="teeth">
          <Title />
        </Shot>
        <Shot
          name="The last impression"
          from="coda"
          until="shoreReturn"
          wipe="page"
        >
          <Impression />
        </Shot>
        <Shot name="The line remains" from="shoreReturn" wipe="rise">
          <ShoreReturn />
        </Shot>
      </Track>
      <Html5Audio
        name="Her Most Loyal Resistance — original score"
        src={soundtrack}
      />
    </AbsoluteFill>
  );
}

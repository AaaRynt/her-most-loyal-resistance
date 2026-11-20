import { type ReactNode, useEffect, useId, useState } from "react";
import {
  AbsoluteFill,
  Html5Audio,
  Sequence,
  Track,
  useCurrentFrame,
  useDelayRender,
} from "remotion";
import music from "../../../reference/Vessel of Sin.mp3";
import {
  CarryOn,
  Clearance,
  Coda,
  Migration,
  Records,
  Salt,
  Survey,
} from "./scenes/After";
import { Dissent, Paris, Quay, Soundings, Ward } from "./scenes/Before";
import {
  Cabinet,
  Hotline,
  Limits,
  London,
  President,
  Shelter,
} from "./scenes/Decisions";
import {
  BrokenPort,
  FirstLight,
  Lift,
  Marmara,
  SearchRoom,
  SecondLight,
  TeaRoom,
} from "./scenes/Shores";
import {
  between,
  count,
  duration,
  fmt,
  lengthOf,
  order,
  SceneLength,
  shots,
  start,
  type ShotId,
} from "./score";
import "./film.css";

const wipes = {
  cut: 0,
  wave: 24,
  curtain: 20,
  paper: 15,
  edge: 11,
  wash: 24,
  glass: 22,
  window: 17,
};
type Wipe = keyof typeof wipes;
const wipeFor = (id: ShotId) => shots[id].transition as Wipe;
function Reveal({ kind, children }: { kind: Wipe; children: ReactNode }) {
  const f = useCurrentFrame(),
    id = useId();
  if (kind === "cut" || f >= wipes[kind]) return <>{children}</>;
  const p = between(f + 1, 0, wipes[kind]);
  if (kind === "wash")
    return <AbsoluteFill style={{ opacity: p }}>{children}</AbsoluteFill>;
  const x = -0.19 + p * 1.39;
  const y = 1.17 - p * 1.36;
  const boundary = count(15)
    .map((i) => {
      const u = i / 14;
      const crest =
        Math.sin(u * 8 + p * 6) * 0.046 + Math.sin(u * 19 - p * 4) * 0.021;
      return `${fmt(u)} ${(y + crest).toFixed(4)}`;
    })
    .join(" L ");
  return (
    <>
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            {kind === "wave" && <path d={`M ${boundary} L 1 1.1 H 0 Z`} />}
            {kind === "curtain" && (
              <path
                d={`M ${1 - x} -.01 C ${0.79 - x} .28 ${1.12 - x} .47 ${0.97 - x} 1.01 H 1.1 V -.01 Z`}
              />
            )}
            {kind === "edge" && (
              <path
                d={`M -.01 -.01 H 1.01 V ${x - 0.09} Q .43 ${x + 0.11} -.01 ${x + 0.04} Z`}
              />
            )}
            {kind === "paper" && (
              <path
                d={`M -.01 -.01 H ${x + 0.05} Q ${x - 0.17} .48 ${x + 0.08} 1.01 H -.01 Z`}
              />
            )}
            {kind === "glass" && (
              <ellipse cx=".67" cy=".56" rx={p * 1.14} ry={p * 1.42} />
            )}
            {kind === "window" && (
              <>
                <rect x="0" y="-.01" width={0.41 * p + 0.001} height="1.02" />
                <rect
                  x={1 - 0.59 * p}
                  y="-.01"
                  width={0.59 * p + 0.001}
                  height="1.02"
                />
              </>
            )}
          </clipPath>
        </defs>
      </svg>
      <AbsoluteFill style={{ clipPath: `url("#${id}")` }}>
        {children}
      </AbsoluteFill>
    </>
  );
}
function Shot({ id, children }: { id: ShotId; children: ReactNode }) {
  const next = order[order.indexOf(id) + 1];
  const overlap = next ? wipes[wipeFor(next)] : 0;
  return (
    <Sequence
      from={start(id)}
      durationInFrames={lengthOf(id) + overlap}
      name={shots[id].name}
    >
      <SceneLength.Provider value={lengthOf(id)}>
        <Reveal kind={wipeFor(id)}>{children}</Reveal>
      </SceneLength.Provider>
    </Sequence>
  );
}
export function BlackSea() {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() =>
    delayRender("Loading the coastal film's typefaces"),
  );
  useEffect(() => {
    const chars =
      "Salt on Glass Kravtsova Особое мнение Повторный приём Évacuer les blessés Kıyı suyu Sağlık ocağı Iıİ 2041";
    Promise.all([
      document.fonts.load('500 96px "Sea Spectral"', chars),
      document.fonts.load('italic 500 45px "Sea Spectral"', chars),
      document.fonts.load('400 40px "Sea Source Sans 3"', chars),
      document.fonts.load('600 32px "Sea Source Sans 3"', chars),
    ]).then(
      () => continueRender(handle),
      (e: Error) => cancelRender(e),
    );
  }, [delayRender, continueRender, cancelRender, handle]);
  return (
    <AbsoluteFill className="black-sea-film">
      <Track name="The two shores" durationInFrames={duration}>
        <Shot id="soundings">
          <Soundings />
        </Shot>
        <Shot id="quay">
          <Quay />
        </Shot>
        <Shot id="ward">
          <Ward />
        </Shot>
        <Shot id="dissent">
          <Dissent />
        </Shot>
        <Shot id="paris">
          <Paris />
        </Shot>
        <Shot id="firstLight">
          <FirstLight />
        </Shot>
        <Shot id="brokenPort">
          <BrokenPort />
        </Shot>
        <Shot id="lift">
          <Lift />
        </Shot>
        <Shot id="search">
          <SearchRoom />
        </Shot>
        <Shot id="hotline">
          <Hotline />
        </Shot>
        <Shot id="shelter">
          <Shelter />
        </Shot>
        <Shot id="cabinet">
          <Cabinet />
        </Shot>
        <Shot id="president">
          <President />
        </Shot>
        <Shot id="teaRoom">
          <TeaRoom />
        </Shot>
        <Shot id="secondLight">
          <SecondLight />
        </Shot>
        <Shot id="marmara">
          <Marmara />
        </Shot>
        <Shot id="london">
          <London />
        </Shot>
        <Shot id="limits">
          <Limits />
        </Shot>
        <Shot id="survey">
          <Survey />
        </Shot>
        <Shot id="clearance">
          <Clearance />
        </Shot>
        <Shot id="records">
          <Records />
        </Shot>
        <Shot id="migration">
          <Migration />
        </Shot>
        <Shot id="carryOn">
          <CarryOn />
        </Shot>
        <Shot id="salt">
          <Salt />
        </Shot>
        <Shot id="coda">
          <Coda />
        </Shot>
      </Track>
      <div className="sea-grain" />
      <Html5Audio name="Vessel of Sin" src={music} />
    </AbsoluteFill>
  );
}

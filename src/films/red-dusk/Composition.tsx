import {
  type ComponentType,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import {
  AbsoluteFill,
  Html5Audio,
  Sequence,
  Track,
  useCurrentFrame,
  useDelayRender,
} from "remotion";
import soundtrack from "../../../reference/hoi4mainthemeallies.ogg";
import {
  Ballet,
  Balances,
  Calendar,
  Carrier,
  Foros,
  Night,
  Phones,
} from "./scenes/Breakdown";
import { Decree, Moscow, Standoff, WhiteHouse } from "./scenes/Coup";
import {
  Afterglow,
  Aftermath,
  Dissolution,
  FailedCoup,
  Goodbye,
} from "./scenes/Dissolution";
import {
  Buran,
  Cooperative,
  Factory,
  Ration,
  Ruble,
  Store,
} from "./scenes/Economy";
import {
  Ballot,
  Congress,
  Miners,
  Papers,
  Rivals,
  Sovereignty,
  Telegraph,
  Treaty,
} from "./scenes/Institutions";
import {
  Evacuation,
  Glasnost,
  Plan,
  Portrait,
  Reactor,
  Reform,
  Signal,
  Union,
} from "./scenes/Origins";
import {
  Alma,
  Baltic,
  Metro,
  Pact,
  Square,
  Wall,
  Withdrawal,
} from "./scenes/Periphery";
import { range } from "./art";
import {
  duration,
  ease,
  lengthOf,
  shotNames,
  shots,
  startOf,
  type ShotName,
} from "./score";
import "./film.css";

const scenes: Record<ShotName, ComponentType> = {
  signal: Signal,
  union: Union,
  plan: Plan,
  reform: Reform,
  glasnost: Glasnost,
  portrait: Portrait,
  reactor: Reactor,
  evacuation: Evacuation,
  store: Store,
  ration: Ration,
  ruble: Ruble,
  cooperative: Cooperative,
  factory: Factory,
  buran: Buran,
  withdrawal: Withdrawal,
  alma: Alma,
  baltic: Baltic,
  wall: Wall,
  pact: Pact,
  square: Square,
  metro: Metro,
  congress: Congress,
  sovereignty: Sovereignty,
  rivals: Rivals,
  treaty: Treaty,
  ballot: Ballot,
  miners: Miners,
  telegraph: Telegraph,
  papers: Papers,
  phones: Phones,
  balances: Balances,
  night: Night,
  foros: Foros,
  calendar: Calendar,
  ballet: Ballet,
  carrier: Carrier,
  decree: Decree,
  moscow: Moscow,
  whitehouse: WhiteHouse,
  standoff: Standoff,
  branch: FailedCoup,
  result: Dissolution,
  imprint: Aftermath,
  title: Goodbye,
  afterglow: Afterglow,
};

const wipeLengths = {
  direct: 0,
  aperture: 18,
  roller: 15,
  slice: 12,
  splice: 15,
  iris: 21,
  drop: 12,
  letterbox: 16,
  lift: 13,
  perforation: 18,
  fold: 15,
  fault: 13,
  rise: 14,
};
type Wipe = keyof typeof wipeLengths;

const edit = shotNames.map((id, index) => {
  const next = shotNames[index + 1];
  const wipe = shots[id].wipe as Wipe;
  const outgoingOverlap = next ? wipeLengths[shots[next].wipe as Wipe] : 0;
  return {
    id,
    wipe,
    name: shots[id].name,
    from: startOf(id),
    durationInFrames: lengthOf(id) + outgoingOverlap,
  };
});

function WipeIn({ wipe, children }: { wipe: Wipe; children: ReactNode }) {
  const frame = useCurrentFrame();
  const mask = useId();
  const length = wipeLengths[wipe];
  if (wipe === "direct" || frame >= length) return <>{children}</>;

  const p = ease(frame + 1, 0, length);
  const x = -26 + p * 154;
  const y = -28 + p * 157;
  const path: Record<Exclude<Wipe, "direct">, string> = {
    aperture: `polygon(48% ${51 - p * 125}%,${47 + p * 133}% 47%,51% ${52 + p * 126}%,${49 - p * 130}% 51%)`,
    roller: `inset(0 0 ${100 - p * 100}% 0 round 0 0 ${(1 - p) * 32}px ${(1 - p) * 32}px)`,
    slice: `polygon(0 0,${x + 21}% 0,${x - 22}% 100%,0 100%)`,
    splice: `url("#${mask}")`,
    iris: `circle(${126 * p}% at 60% 46%)`,
    drop: `polygon(0 0,100% 0,100% ${y + 19}%,0 ${y - 18}%)`,
    letterbox: `inset(${(1 - p) * 51}% 0 ${(1 - p) * 49}% 0)`,
    lift: `inset(${100 - p * 100}% 0 0 0)`,
    perforation: `url("#${mask}")`,
    fold: `polygon(0 0,${x - 18}% 0,${x + 22}% 51%,${x - 22}% 100%,0 100%)`,
    fault: `polygon(0 0,${x - 12}% 0,${x - 4}% 19%,${x - 22}% 25%,${x + 24}% 56%,${x + 5}% 62%,${x - 8}% 100%,0 100%)`,
    rise: `polygon(0 ${121 - 141 * p}%,100% ${107 - 123 * p}%,100% 100%,0 100%)`,
  };

  return (
    <>
      {(wipe === "splice" || wipe === "perforation") && (
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id={mask} clipPathUnits="objectBoundingBox">
              {wipe === "splice"
                ? range(6).map((i) => {
                    const width = ease(frame + 1, i * 0.89, 10 + i * 0.89);
                    return (
                      <rect
                        key={i}
                        x={i % 2 ? 1 - width : 0}
                        y={i / 6 - 0.0005}
                        width={width}
                        height={0.168}
                      />
                    );
                  })
                : range(10).map((i) => {
                    const height = ease(
                      frame + 1,
                      (i % 5) * 1.2,
                      13 + (i % 5) * 1.2,
                    );
                    return (
                      <rect
                        key={i}
                        x={i / 10 - 0.0005}
                        y={i % 2 ? 1 - height : 0}
                        width={0.101}
                        height={height}
                      />
                    );
                  })}
            </clipPath>
          </defs>
        </svg>
      )}
      <AbsoluteFill style={{ clipPath: path[wipe] }}>{children}</AbsoluteFill>
    </>
  );
}

const glyphs =
  "ПРОЩАЙ НАВСЕГДА ЖЕЛТОҚСАН ЧОРНОБИЛЬСЬКА Є Ї Ў І № 0123456789 EESTI LATVIJA LIETUVA";

export function RedDusk() {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [fontHandle] = useState(() =>
    delayRender("Load the Soviet film’s Cyrillic typefaces"),
  );
  useEffect(() => {
    Promise.all([
      document.fonts.load('690 140px "RD Oswald"', glyphs),
      document.fonts.load('690 42px "RD Golos Text"', glyphs),
      document.fonts.load('400 32px "RD PT Mono"', glyphs),
    ]).then(
      () => continueRender(fontHandle),
      (error: Error) => cancelRender(error),
    );
  }, [fontHandle, continueRender, cancelRender]);

  return (
    <AbsoluteFill className="red-dusk-film">
      <Track name="Изображение" durationInFrames={duration}>
        {edit.map(({ id, wipe, name, from, durationInFrames }) => {
          const Scene = scenes[id];
          return (
            <Sequence
              key={id}
              name={name}
              from={from}
              durationInFrames={durationInFrames}
            >
              <WipeIn wipe={wipe}>
                <Scene />
              </WipeIn>
            </Sequence>
          );
        })}
      </Track>
      <Html5Audio name="Goodbye Forever" src={soundtrack} />
    </AbsoluteFill>
  );
}

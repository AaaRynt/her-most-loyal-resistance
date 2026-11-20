import { Composition, Folder } from "remotion";
import { BlackSea } from "./films/black-sea/Composition";
import {
  duration as blackSeaDuration,
  fps as blackSeaFps,
} from "./films/black-sea/score";
import { Resistance } from "./films/hmmlr/Composition";
import {
  duration as archiveDuration,
  fps as archiveFps,
} from "./films/hmmlr/score";
import { RedDusk } from "./films/red-dusk/Composition";
import { duration, fps } from "./films/red-dusk/score";

export const RemotionRoot = () => (
  <>
    <Composition
      id="BlackSeaVesselOfSin"
      component={BlackSea}
      durationInFrames={blackSeaDuration}
      fps={blackSeaFps}
      width={1920}
      height={1080}
    />
    <Composition
      id="RedDuskGoodbyeForever"
      component={RedDusk}
      durationInFrames={duration}
      fps={fps}
      width={1920}
      height={1080}
    />
    <Folder name="Archive">
      <Composition
        id="HerMostLoyalResistance"
        component={Resistance}
        durationInFrames={archiveDuration}
        fps={archiveFps}
        width={1920}
        height={1080}
      />
    </Folder>
  </>
);

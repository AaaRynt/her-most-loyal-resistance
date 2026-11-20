import { Composition, Folder } from "remotion";
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

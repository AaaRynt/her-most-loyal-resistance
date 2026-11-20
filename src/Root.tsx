import { Composition } from "remotion";
import { Resistance } from "./Composition";
import { duration, fps } from "./score";

export const RemotionRoot = () => (
  <Composition
    id="HerMostLoyalResistance"
    component={Resistance}
    durationInFrames={duration}
    fps={fps}
    width={1920}
    height={1080}
  />
);

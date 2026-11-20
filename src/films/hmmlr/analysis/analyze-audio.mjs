import { URL } from "node:url";
import { analyzeAudio } from "../../../../scripts/analyze-audio.mjs";

analyzeAudio(
  "reference/her_most_loyal_resistance.ogg",
  new URL("./", import.meta.url),
);

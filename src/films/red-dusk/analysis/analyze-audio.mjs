import { URL } from "node:url";
import { analyzeAudio } from "../../../../scripts/analyze-audio.mjs";

analyzeAudio(
  "reference/hoi4mainthemeallies.ogg",
  new URL("./", import.meta.url),
);

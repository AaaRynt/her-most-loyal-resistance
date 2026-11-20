import { URL } from "node:url";
import { analyzeAudio } from "../../../../scripts/analyze-audio.mjs";

analyzeAudio("reference/Vessel of Sin.mp3", new URL("./", import.meta.url));

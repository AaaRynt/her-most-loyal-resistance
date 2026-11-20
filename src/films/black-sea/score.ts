import { createContext } from "react";
import { useCurrentFrame } from "remotion";
import edit from "./analysis/edit.json";
import profile from "./analysis/audio-profile.json";

export const fps = edit.fps;
const audioSamples = Math.round(profile.duration * profile.sampleRate);
export const duration = Math.ceil((audioSamples * fps) / profile.sampleRate);
export const SceneLength = createContext(duration);
export const shots = edit.shots;
export type ShotId = keyof typeof shots;
export const order = Object.keys(shots) as ShotId[];
export const start = (id: ShotId) => Math.round(shots[id].at * fps);
export const clamp = (n: number, low = 0, high = 1) =>
  Math.min(high, Math.max(low, n));
export const smooth = (v: number) => {
  const p = clamp(v);
  return p * p * (3 - 2 * p);
};
export const between = (t: number, a: number, b: number) =>
  smooth((t - a) / (b - a));
export const count = (n: number) => Array.from({ length: n }, (_, i) => i);
export const random = (i: number) => {
  const n = Math.sin(i * 163.173 + 18.817) * 13274.931;
  return n - Math.floor(n);
};
export const wave = (f: number, speed: number, offset = 0) =>
  Math.sin(f * speed + offset);
export const fmt = (n: number) => Number(n.toFixed(2));
export function lengthOf(id: ShotId) {
  const next = order[order.indexOf(id) + 1];
  return (next ? start(next) : duration) - start(id);
}
function mixBand(f: number, band: number) {
  const pos = Math.max(0, (f / fps) * profile.profileRate - 0.5);
  const i = Math.min(Math.floor(pos), profile.rows.length - 1);
  const a = profile.rows[i][band],
    b = profile.rows[Math.min(i + 1, profile.rows.length - 1)][band];
  return a + (b - a) * clamp(pos - i);
}
const timings = Object.fromEntries(
  order.map((id) => [
    id,
    shots[id].accents.map((t) => Math.round(t * fps) - start(id)),
  ]),
) as Record<ShotId, number[]>;
export function useShot(id: ShotId) {
  const f = useCurrentFrame();
  const g = f + start(id),
    length = lengthOf(id);
  const marks = timings[id];
  const tap = (index: number, fall = 11) => {
    const offset = f - (marks[index] ?? Infinity);
    return offset < 0 ? 0 : Math.exp(-offset / fall);
  };
  return {
    f,
    g,
    length,
    p: clamp(f / (length - 1)),
    low: clamp((mixBand(g, 1) + 34) / 19),
    air: clamp((mixBand(g, 4) + 59) / 29),
    db: mixBand(g, 0),
    beat: marks.reduce((v, _, i) => v + tap(i), 0),
    tap,
    turn: (i: number, span = 26) =>
      between(f, marks[i] ?? length, (marks[i] ?? length) + span),
  };
}
export type Motion = ReturnType<typeof useShot>;

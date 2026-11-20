import { Easing, interpolate } from "remotion";
import analysis from "./analysis/audio-profile.json";
import edit from "./analysis/edit-cues.json";

export const fps = edit.fps;
export const duration = Math.ceil(analysis.duration * fps);
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

export type Cue = keyof typeof edit.sourceSeconds;

export function cue(name: Cue) {
  return Math.round(edit.sourceSeconds[name] * fps);
}

export function since(name: Cue, start: Cue) {
  return cue(name) - cue(start);
}

export function ramp(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function ease(frame: number, start: number, end: number) {
  return easeOut(ramp(frame, start, end));
}

export function strike(frame: number, at: number, decay = 5) {
  const elapsed = frame - at;
  return elapsed < 0 ? 0 : Math.exp(-elapsed / decay);
}

export function accents(
  frame: number,
  start: Cue,
  marks: readonly Cue[],
  decay = 7,
) {
  return marks.reduce(
    (sum, mark) => sum + strike(frame, since(mark, start), decay),
    0,
  );
}

export function scoreAt(frame: number) {
  const position = (frame / fps) * analysis.profileRate - 0.5;
  const row = Math.max(
    0,
    Math.min(analysis.rows.length - 1, Math.floor(position)),
  );
  const first = analysis.rows[row];
  const second = analysis.rows[row + 1] ?? first;
  const mix = Math.max(0, position - row);
  const read = (column: number) =>
    first[column] + (second[column] - first[column]) * mix;
  return {
    levelDb: read(0),
    bass: ramp(read(1), -18, -6),
    mids: ramp(read(2), -28, -16),
    treble: ramp(read(4), -42, -26),
  };
}

import { Easing, useCurrentFrame } from "remotion";
import edit from "./analysis/edit-cues.json";
import profile from "./analysis/audio-profile.json";

export const fps = edit.fps;
export const duration = Math.ceil(profile.duration * fps);
export const shots = edit.shots;
export type ShotName = keyof typeof shots;
export const shotNames = Object.keys(shots) as ShotName[];

const settle = Easing.bezier(0.18, 0.83, 0.21, 1);

export const clamp = (value: number) => Math.min(1, Math.max(0, value));
export const ramp = (frame: number, start: number, end: number) =>
  clamp((frame - start) / Math.max(1, end - start));
export const ease = (frame: number, start: number, end: number) =>
  settle(ramp(frame, start, end));

export function impulse(frame: number, mark: number, decay = 7) {
  const offset = frame - mark;
  return offset < 0 ? 0 : Math.exp(-offset / decay);
}

export const startOf = (id: ShotName) => Math.round(shots[id].at * fps);

const timeline = Object.fromEntries(
  shotNames.map((id, i) => {
    const start = startOf(id);
    const next = shotNames[i + 1];
    return [
      id,
      {
        start,
        length: (next ? startOf(next) : duration) - start,
        accents: shots[id].accents.map(
          (time) => Math.round(time * fps) - start,
        ),
      },
    ];
  }),
) as Record<ShotName, { start: number; length: number; accents: number[] }>;

export const lengthOf = (id: ShotName) => timeline[id].length;

export function audioAt(frame: number) {
  const position = Math.max(0, (frame / fps) * profile.profileRate - 0.5);
  const index = Math.min(Math.floor(position), profile.rows.length - 1);
  const a = profile.rows[index];
  const b = profile.rows[index + 1] ?? a;
  const p = clamp(position - index);
  const read = (band: number) => a[band] + (b[band] - a[band]) * p;
  return {
    db: read(0),
    bass: clamp((read(1) + 32) / 12),
    middle: clamp((read(3) + 42) / 22),
    air: clamp((read(4) + 54) / 17),
  };
}

export function useMotion(id: ShotName) {
  const f = useCurrentFrame();
  const { start, length, accents } = timeline[id];
  const phase = ramp(f, 0, length - 1);
  const marks = (index: number) =>
    accents[index] ?? Math.round(((index + 1) * length) / 5);
  const beat = accents.reduce(
    (total, mark) => total + impulse(f, mark),
    impulse(f, 0, 6),
  );
  return {
    f,
    g: start + f,
    phase,
    length,
    beat,
    audio: audioAt(start + f),
    step: (index: number, span = 23, lead = 0) =>
      ease(f, marks(index) - lead, marks(index) + span),
    hit: (index: number, decay = 8) => impulse(f, marks(index), decay),
  };
}

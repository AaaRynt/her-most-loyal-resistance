import { execFileSync } from "node:child_process";
import { log } from "node:console";
import { writeFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const input = fileURLToPath(
  new URL("../../../../reference/Vessel of Sin.mp3", import.meta.url),
);
const sampleRate = 11025;
const windowSize = 3072;
const interval = 0.1;
const buffer = execFileSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-i",
    input,
    "-map",
    "0:a:0",
    "-vn",
    "-ac",
    "1",
    "-ar",
    String(sampleRate),
    "-f",
    "f32le",
    "-",
  ],
  { maxBuffer: 20 * 1024 * 1024 },
);
const samples = new Float32Array(
  buffer.buffer,
  buffer.byteOffset,
  buffer.byteLength / 4,
);
const window = Float64Array.from(
  { length: windowSize },
  (_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (windowSize - 1)),
);
const lowest = 45;
const notes = Array.from(
  { length: 48 },
  (_, i) =>
    2 *
    Math.cos((2 * Math.PI * 440 * 2 ** ((i + lowest - 69) / 12)) / sampleRate),
);
const count = Math.ceil(samples.length / sampleRate / interval);
const spectrum = [];
const frame = new Float64Array(windowSize);
for (let t = 0; t < count; t++) {
  const begin = Math.round(t * sampleRate * interval) - windowSize / 2;
  for (let j = 0; j < windowSize; j++)
    frame[j] = (samples[begin + j] ?? 0) * window[j];
  spectrum.push(
    notes.map((coefficient) => {
      let older = 0,
        previous = 0;
      for (let j = 0; j < windowSize; j++) {
        const next = frame[j] + coefficient * previous - older;
        older = previous;
        previous = next;
      }
      const magnitude = Math.sqrt(
        Math.max(
          0,
          previous * previous + older * older - coefficient * previous * older,
        ),
      );
      return Math.log1p(magnitude * 0.15);
    }),
  );
}

const normalized = (vector) => {
  const norm = Math.hypot(...vector) || 1;
  return vector.map((value) => value / norm);
};
const mean = notes.map(
  (_, i) => spectrum.reduce((sum, row) => sum + row[i], 0) / count,
);
const sd = notes.map((_, i) =>
  Math.sqrt(
    spectrum.reduce((sum, row) => sum + (row[i] - mean[i]) ** 2, 0) / count,
  ),
);
const pitchFrames = spectrum.map((row) => {
  const whitened = row.map((v, i) => (v - mean[i]) / Math.max(0.2, sd[i]));
  const registers = Array(24).fill(0);
  whitened.forEach((v, i) => {
    registers[(i % 12) + (i < 24 ? 0 : 12)] += v;
  });
  return normalized(normalized(whitened).concat(normalized(registers)));
});
const differences = pitchFrames.map((row, t) =>
  normalized(row.map((v, i) => v - pitchFrames[Math.max(0, t - 4)][i])),
);
function cosine(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

const windowFrames = 126;
const shifts = [];
for (let delay = 168; delay < count - windowFrames - 2; delay++) {
  const sums = [0];
  for (let i = 0; i < count - delay; i++) {
    const j = i + delay;
    sums.push(
      sums[i] +
        0.72 * cosine(pitchFrames[i], pitchFrames[j]) +
        0.28 * cosine(differences[i], differences[j]),
    );
  }
  let best = -1,
    start = 0;
  for (let i = 15; i + delay + windowFrames < count - 13; i++) {
    const score = (sums[i + windowFrames] - sums[i]) / windowFrames;
    if (score > best) {
      best = score;
      start = i;
    }
  }
  if (best < 0) continue;
  shifts.push({ offset: delay, start, score: best, sums });
}
shifts.sort((a, b) => b.score - a.score);
const peaks = [];
const sec = (t) => Number((t * interval).toFixed(2));
for (const shift of shifts) {
  if (peaks.length >= 12) break;
  if (peaks.some((p) => Math.abs(p.delay - sec(shift.offset)) < 1)) continue;
  const { offset, start, score, sums } = shift;
  const bins = [];
  for (let i = 0; i + 30 < sums.length; i += 30)
    bins.push([sec(i), Number(((sums[i + 30] - sums[i]) / 30).toFixed(3))]);
  peaks.push({
    delay: sec(offset),
    first: sec(start),
    second: sec(start + offset),
    windowSeconds: sec(windowFrames),
    score: Number(score.toFixed(4)),
    threeSecondWindows: bins,
  });
}
writeFileSync(
  new URL("phrase-matches.json", import.meta.url),
  JSON.stringify(
    {
      method:
        "Goertzel semitone energies over four octaves, CQT-like logarithmic compression, global per-note standardization, register chroma and pitch-change cosine. Top non-neighboring fixed lags for a 12.6 s sliding window. Times are in decoded music seconds.",
      lowestMidiNote: lowest,
      pitchCount: notes.length,
      sampleRate,
      windowSize,
      interval,
      peaks,
    },
    null,
    2,
  ) + "\n",
);
for (const { threeSecondWindows, ...peak } of peaks.slice(0, 8)) {
  log(
    peak,
    threeSecondWindows.filter(([, v]) => v > 0.5),
  );
}

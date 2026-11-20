import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../package.json", import.meta.url));
const cli = fileURLToPath(
  new URL(
    "remotion-cli.js",
    pathToFileURL(require.resolve("@remotion/cli/package.json")),
  ),
);
const source = "reference/her_most_loyal_resistance.ogg";
const sampleRate = 22050;
const windowSize = 2048;
const hopSize = 220;
const profileRate = 10;
const bandEdges = [24, 130, 500, 2500, 10000];
const decoded = spawnSync(
  process.execPath,
  [
    cli,
    "ffmpeg",
    "-v",
    "error",
    "-i",
    source,
    "-ac",
    "1",
    "-ar",
    String(sampleRate),
    "-c:a",
    "pcm_s16le",
    "-f",
    "wav",
    "-",
  ],
  { cwd: root, maxBuffer: 64 * 1024 * 1024 },
);
if (decoded.error) throw decoded.error;
if (decoded.status !== 0 || decoded.stdout.length === 0) {
  throw new Error(decoded.stderr.toString() || "FFmpeg produced no audio");
}
const wav = decoded.stdout;
let sampleOffset = 12;
while (
  sampleOffset + 8 <= wav.length &&
  wav.toString("ascii", sampleOffset, sampleOffset + 4) !== "data"
) {
  const chunkSize = wav.readUInt32LE(sampleOffset + 4);
  sampleOffset += 8 + chunkSize + (chunkSize % 2);
}
sampleOffset += 8;
if (sampleOffset >= wav.length)
  throw new Error("Missing PCM data in decoded WAV");
const samples = Float32Array.from(
  { length: Math.floor((wav.length - sampleOffset) / 2) },
  (_, index) => wav.readInt16LE(sampleOffset + index * 2) / 32768,
);
const duration = samples.length / sampleRate;
const db = (power) => Math.max(-90, 10 * Math.log10(power + 1e-12));
const round = (value, digits = 3) => Number(value.toFixed(digits));
const percentile = (values, fraction) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor((sorted.length - 1) * fraction)];
};

const window = Float64Array.from(
  { length: windowSize },
  (_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / windowSize),
);
const cos = Float64Array.from({ length: windowSize / 2 }, (_, i) =>
  Math.cos((-2 * Math.PI * i) / windowSize),
);
const sin = Float64Array.from({ length: windowSize / 2 }, (_, i) =>
  Math.sin((-2 * Math.PI * i) / windowSize),
);
const bitReverse = Uint16Array.from({ length: windowSize }, (_, i) => {
  let reversed = 0;
  for (let bit = 1; bit < windowSize; bit *= 2) {
    reversed = 2 * reversed + (i & 1);
    i >>= 1;
  }
  return reversed;
});
const real = new Float64Array(windowSize);
const imaginary = new Float64Array(windowSize);
const previous = new Float64Array(windowSize / 2);
const bands = bandEdges
  .slice(0, -1)
  .map((low, i) => [
    Math.ceil((low * windowSize) / sampleRate),
    Math.ceil((bandEdges[i + 1] * windowSize) / sampleRate),
  ]);

function spectrum(center) {
  const start = center - windowSize / 2;
  for (let i = 0; i < windowSize; i++) {
    real[bitReverse[i]] = (samples[start + i] ?? 0) * window[i];
  }
  imaginary.fill(0);
  for (let size = 2; size <= windowSize; size *= 2) {
    const half = size / 2;
    const stride = windowSize / size;
    for (let block = 0; block < windowSize; block += size) {
      for (let j = 0; j < half; j++) {
        const left = block + j;
        const right = left + half;
        const index = j * stride;
        const re = real[right] * cos[index] - imaginary[right] * sin[index];
        const im = real[right] * sin[index] + imaginary[right] * cos[index];
        real[right] = real[left] - re;
        imaginary[right] = imaginary[left] - im;
        real[left] += re;
        imaginary[left] += im;
      }
    }
  }
}

const windowEnergy = window.reduce((sum, value) => sum + value * value, 0);
const frames = [];
for (let center = 0; center < samples.length; center += hopSize) {
  spectrum(center);
  let squareSum = 0;
  for (let j = center; j < Math.min(center + hopSize, samples.length); j++) {
    squareSum += samples[j] * samples[j];
  }
  const bandPower = [];
  const bandFlux = [];
  for (const [start, end] of bands) {
    let power = 0;
    let flux = 0;
    for (let j = start; j < end; j++) {
      const binPower = real[j] ** 2 + imaginary[j] ** 2;
      const compressed = Math.log1p(0.2 * Math.sqrt(binPower));
      power += binPower;
      flux += Math.max(0, compressed - previous[j]);
      previous[j] = compressed;
    }
    bandPower.push((2 * power) / (windowSize * windowEnergy));
    bandFlux.push(flux / (end - start));
  }
  frames.push({
    time: center / sampleRate,
    power: squareSum / hopSize,
    bandPower,
    bandFlux,
  });
}

const bpmRange = [55, 205];
const fluxReference = bands.map((_, i) =>
  percentile(
    frames.map((frame) => frame.bandFlux[i]),
    0.97,
  ),
);
const novelty = frames.map(({ bandFlux }, i) => {
  const value = (index) =>
    frames[index].bandFlux.reduce(
      (sum, flux, band) => sum + flux / fluxReference[band] / bands.length,
      0,
    );
  if (i === 0 || i === frames.length - 1) {
    return bandFlux[0] / fluxReference[0];
  }
  return (value(i - 1) + 2 * value(i) + value(i + 1)) / 4;
});

const candidates = [];
for (let i = 12; i < frames.length - 12; i++) {
  const strength = novelty[i];
  if (
    strength < 0.29 ||
    novelty.slice(i - 9, i + 10).some((n) => n > strength)
  ) {
    continue;
  }
  const baseline = percentile(
    novelty.slice(Math.max(0, i - 110), i + 111),
    0.5,
  );
  if (strength < 1.65 * baseline) continue;
  candidates.push({
    time: round(frames[i].time),
    strength: round(strength),
    localRatio: round(strength / Math.max(0.02, baseline), 2),
    flux: frames[i].bandFlux.map((n, band) =>
      round(n / fluxReference[band], 2),
    ),
  });
}

function periodicities(start, end) {
  const slice = novelty.slice(
    Math.round((start * sampleRate) / hopSize),
    Math.round((end * sampleRate) / hopSize),
  );
  const mean = slice.reduce((a, b) => a + b, 0) / slice.length;
  const centered = slice.map((value) => value - mean);
  const minLag = Math.ceil((60 * sampleRate) / (bpmRange[1] * hopSize));
  const maxLag = Math.floor((60 * sampleRate) / (bpmRange[0] * hopSize));
  const correlations = [];
  for (let lag = minLag - 1; lag <= maxLag + 1; lag++) {
    let product = 0;
    let leftPower = 0;
    let rightPower = 0;
    for (let i = lag; i < centered.length; i++) {
      const left = centered[i - lag];
      const right = centered[i];
      product += left * right;
      leftPower += left * left;
      rightPower += right * right;
    }
    correlations.push({
      lag,
      score: product / Math.sqrt(leftPower * rightPower),
    });
  }
  return correlations
    .filter(
      ({ score }, i) =>
        i > 0 &&
        i < correlations.length - 1 &&
        score > correlations[i - 1].score &&
        score >= correlations[i + 1].score,
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ lag, score }) => ({
      seconds: round((lag * hopSize) / sampleRate),
      bpm: round((60 * sampleRate) / (lag * hopSize), 1),
      score: round(score),
    }));
}

const sections = [];
for (let start = 0; start < duration - 4; start += 16) {
  const end = Math.min(duration, start + 16);
  sections.push({
    start,
    end: round(end),
    candidates: candidates.filter((hit) => hit.time >= start && hit.time < end)
      .length,
    periodicities: periodicities(start, end),
  });
}

const rows = [];
let cursor = 0;
for (let tick = 0; tick < Math.ceil(duration * profileRate); tick++) {
  const end = (tick + 1) / profileRate;
  let count = 0;
  let rms = 0;
  let transient = 0;
  const energies = [0, 0, 0, 0];
  while (cursor < frames.length && frames[cursor].time < end) {
    const frame = frames[cursor];
    rms += frame.power;
    transient = Math.max(transient, novelty[cursor]);
    frame.bandPower.forEach((power, band) => {
      energies[band] += power;
    });
    count++;
    cursor++;
  }
  rows.push(
    [
      db(rms / count),
      ...energies.map((power) => db(power / count)),
      transient,
    ].map((n, i) => round(n, i === 5 ? 2 : 1)),
  );
}

const metadata = {
  source,
  sha256: createHash("sha256")
    .update(readFileSync(new URL(source, new URL("../", import.meta.url))))
    .digest("hex"),
  duration: round(duration, 6),
  sampleRate,
  windowSize,
  hopSize,
  bandEdges,
  profileRate,
  columns: [
    "rmsDbFS",
    "lowDbFS",
    "lowMidDbFS",
    "midDbFS",
    "highDbFS",
    "novelty",
  ],
  profileTimes:
    "Each row covers [row / profileRate, (row + 1) / profileRate) in source seconds.",
  periodicities: sections,
};

function writeProfile(name, info, rows) {
  const header = JSON.stringify(info, null, 2).slice(0, -2);
  const table = rows.map((row) => "    " + JSON.stringify(row)).join(",\n");
  writeFileSync(
    new URL(name, import.meta.url),
    header + ',\n  "rows": [\n' + table + "\n  ]\n}\n",
  );
}
writeProfile("audio-profile.json", metadata, rows);
writeProfile(
  "onset-candidates.json",
  {
    source,
    columns: [
      "sourceSeconds",
      "novelty",
      "localMedianRatio",
      "lowFlux",
      "lowMidFlux",
      "midFlux",
      "highFlux",
    ],
    note: "Spectral-flux candidates, not a beat grid or the editorial cue list.",
  },
  candidates.map(({ time, strength, localRatio, flux }) => [
    time,
    strength,
    localRatio,
    ...flux,
  ]),
);

console.log(
  `Analyzed ${duration.toFixed(3)}s, ${frames.length} spectral frames, ${candidates.length} onset candidates.`,
);
for (const section of sections) {
  console.log(
    `${section.start}–${section.end}s`,
    section.periodicities.map(({ bpm, score }) => [bpm, score]),
  );
}

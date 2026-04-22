import { useEffect, useRef } from "react";

type Vector = {
  x: number;
  y: number;
};

type Vortex = Vector & {
  vx: number;
  vy: number;
  dir: number;
};

type SkyParticle = Vector & {
  rgb: [number, number, number];
  baseAlpha: number;
  baseWidth: number;
  bristleOff: number;
};

type DyeParticle = Vector & {
  vx: number;
  vy: number;
  rgb: [number, number, number];
  life: number;
  maxLife: number;
  baseAlpha: number;
  baseWidth: number;
  bristleOff: number;
};

const CREAM = "#fffff8";
const FRAME_DURATION = 1000 / 60;
const FLOW_SPEED = 1.1;
const ANGLE_QUANT = Math.PI / 12;
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const GRAD3: Array<[number, number]> = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const S0 = 0.0005;
const S1 = 0.002;
const S2 = 0.007;
const A0_BASE = 1.0;
const A1_BASE = 0.35;
const A2_BASE = 0.12;
const K0 = 1.55;
const K1 = 2.65;
const K2 = 4.9;

const VORTEX_COUNT = 4;
const VORTEX_TANGENT_K = 0.12;
const VORTEX_RADIAL_K = 0.00005;
const VORTEX_FALLOFF = 120;

const PHASE_PERIOD = 1000 * FRAME_DURATION;
const HALLUC_INTERVAL = 1800 * FRAME_DURATION;
const DYE_INTERVAL_MIN = 170 * FRAME_DURATION;
const DYE_INTERVAL_MAX = 380 * FRAME_DURATION;

const QUALITY_PROFILES = [
  {
    skyCount: 4500,
    dyeParticleCount: 78,
    densityCols: 160,
    densityRows: 100,
    dprCap: 1.5,
  },
  {
    skyCount: 2500,
    dyeParticleCount: 58,
    densityCols: 120,
    densityRows: 76,
    dprCap: 1.25,
  },
  {
    skyCount: 1850,
    dyeParticleCount: 38,
    densityCols: 90,
    densityRows: 56,
    dprCap: 1,
  },
] as const;

const SKY_PALETTE: Array<[number, number, number]> = [
  [18, 52, 97],
  [28, 76, 128],
  [36, 94, 145],
  [44, 110, 160],
  [24, 86, 118],
  [14, 63, 90],
  [52, 123, 156],
  [64, 142, 176],
  [72, 156, 188],
  [90, 171, 198],
  [39, 106, 148],
  [58, 132, 168],
];

const DYE_PALETTE: Array<[number, number, number]> = [
  [12, 42, 92],
  [18, 64, 126],
  [22, 86, 150],
  [34, 109, 171],
  [28, 92, 138],
  [66, 145, 192],
  [40, 121, 168],
  [88, 178, 212],
];

const createPermutationTables = () => {
  const perm = new Uint8Array(512);
  const permMod8 = new Uint8Array(512);
  const values = new Uint8Array(256);

  for (let index = 0; index < 256; index += 1) {
    values[index] = index;
  }

  let seed = 42;
  for (let index = 255; index > 0; index -= 1) {
    seed = (seed * 16807) % 2147483647;
    const swapIndex = seed % (index + 1);
    const temp = values[index];
    values[index] = values[swapIndex];
    values[swapIndex] = temp;
  }

  for (let index = 0; index < 512; index += 1) {
    perm[index] = values[index & 255];
    permMod8[index] = perm[index] & 7;
  }

  return { perm, permMod8 };
};

const { perm, permMod8 } = createPermutationTables();

const simplex2 = (x: number, y: number) => {
  const s = (x + y) * F2;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const t = (i + j) * G2;
  const x0 = x - (i - t);
  const y0 = y - (j - t);
  const [i1, j1] = x0 > y0 ? [1, 0] : [0, 1];
  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2;
  const y2 = y0 - 1 + 2 * G2;
  const ii = i & 255;
  const jj = j & 255;

  let n0 = 0;
  let n1 = 0;
  let n2 = 0;

  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) {
    t0 *= t0;
    const g = GRAD3[permMod8[ii + perm[jj]]];
    n0 = t0 * t0 * (g[0] * x0 + g[1] * y0);
  }

  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) {
    t1 *= t1;
    const g = GRAD3[permMod8[ii + i1 + perm[jj + j1]]];
    n1 = t1 * t1 * (g[0] * x1 + g[1] * y1);
  }

  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) {
    t2 *= t2;
    const g = GRAD3[permMod8[ii + 1 + perm[jj + 1]]];
    n2 = t2 * t2 * (g[0] * x2 + g[1] * y2);
  }

  return 70 * (n0 + n1 + n2);
};

const curlAt = (x: number, y: number, time: number): Vector => {
  const eps = 0.0001;
  const dy =
    (simplex2(x, y + eps + time) - simplex2(x, y - eps + time)) / (2 * eps);
  const dx =
    (simplex2(x + eps, y + time) - simplex2(x - eps, y + time)) / (2 * eps);

  return { x: dy, y: -dx };
};

const DiffusionBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let context =
      canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      }) ?? canvas.getContext("2d");

    if (!context) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mediaQuery.matches;

    let width = 0;
    let height = 0;
    let skyCount = 1400;
    let dyeParticleCount = 50;
    let densityCols = 160;
    let densityRows = 100;
    let densityCellW = 1;
    let densityCellH = 1;
    let densityGrid = new Float32Array(0);
    let renderDprCap = QUALITY_PROFILES[0].dprCap;
    let qualityLevel = 0;

    let skyParticles: SkyParticle[] = [];
    let vortices: Vortex[] = [];
    let dyeParticles: DyeParticle[] = [];

    let time = 0;
    let elapsedMs = 0;
    let densityElapsedMs = 0;
    let nextDyeTime = 250 * FRAME_DURATION;
    let diffPhase = 0;
    let lastAnimationTime = 0;
    let lastQualitySampleTime = 0;
    let slowFrameStreak = 0;
    let lastHallucinationTime = 0;
    let animationFrame = 0;
    let resizeTimer: number | undefined;

    const viewportScale = () => {
      const area = Math.max(1, width * height);
      return Math.max(0.65, Math.min(1, Math.sqrt(area / (1440 * 900))));
    };

    const applyQuality = (level: number) => {
      const clamped = Math.max(0, Math.min(level, QUALITY_PROFILES.length - 1));
      const profile = QUALITY_PROFILES[clamped];
      const scale = viewportScale();

      qualityLevel = clamped;
      skyCount = Math.max(360, Math.round(profile.skyCount * scale));
      dyeParticleCount = Math.max(
        14,
        Math.round(profile.dyeParticleCount * scale),
      );
      densityCols = Math.max(72, Math.round(profile.densityCols * scale));
      densityRows = Math.max(44, Math.round(profile.densityRows * scale));
      renderDprCap = profile.dprCap;
    };

    const initDensity = () => {
      densityCellW = width / densityCols;
      densityCellH = height / densityRows;
      densityGrid = new Float32Array(densityCols * densityRows);
    };

    const initVortices = () => {
      vortices = [];
      for (let index = 0; index < VORTEX_COUNT; index += 1) {
        vortices.push({
          x: 0.1 * width + Math.random() * 0.8 * width,
          y: 0.1 * height + Math.random() * 0.8 * height,
          vx: (Math.random() - 0.5) * 0.03,
          vy: (Math.random() - 0.5) * 0.03,
          dir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const initSkyParticles = () => {
      skyParticles = [];
      for (let index = 0; index < skyCount; index += 1) {
        const colorIndex = Math.floor(Math.random() * SKY_PALETTE.length);
        skyParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          rgb: SKY_PALETTE[colorIndex],
          baseAlpha: 0.026 + Math.random() * 0.022,
          baseWidth: 0.5 + Math.random(),
          bristleOff: Math.random() * Math.PI * 2,
        });
      }
    };

    const resetScene = () => {
      initDensity();
      initVortices();
      initSkyParticles();
      dyeParticles = [];
      densityElapsedMs = 0;
      nextDyeTime = elapsedMs + 20 * FRAME_DURATION;
      lastHallucinationTime = elapsedMs;
    };

    const depositDensity = (x: number, y: number) => {
      const column = Math.floor(x / densityCellW);
      const row = Math.floor(y / densityCellH);
      if (
        column >= 0 &&
        column < densityCols &&
        row >= 0 &&
        row < densityRows
      ) {
        densityGrid[row * densityCols + column] += 1;
      }
    };

    const readDensity = (x: number, y: number) => {
      const column = Math.floor(x / densityCellW);
      const row = Math.floor(y / densityCellH);
      if (
        column >= 0 &&
        column < densityCols &&
        row >= 0 &&
        row < densityRows
      ) {
        return densityGrid[row * densityCols + column];
      }

      return 0;
    };

    const diffuseDensityGrid = () => {
      const next = new Float32Array(densityCols * densityRows);
      for (let row = 1; row < densityRows - 1; row += 1) {
        for (let column = 1; column < densityCols - 1; column += 1) {
          const index = row * densityCols + column;
          next[index] =
            ((densityGrid[index] * 4 +
              densityGrid[index - 1] +
              densityGrid[index + 1] +
              densityGrid[index - densityCols] +
              densityGrid[index + densityCols]) /
              8) *
            0.97;
        }
      }
      densityGrid = next;
    };

    const updateDiffusionPhase = () => {
      diffPhase =
        0.5 + 0.5 * Math.sin((elapsedMs * Math.PI * 2) / PHASE_PERIOD);
    };

    const fadeAlpha = () => 0.0045 + diffPhase * 0.0035;
    const timeSpeed = () => 0.00012 + diffPhase * 0.00018;
    const strokeAlphaMod = () => 1 + (1 - diffPhase) * 0.3;

    const velocityAt = (
      x: number,
      y: number,
      currentTime: number,
      phase: number,
    ) => {
      const a1 = A1_BASE + phase * 0.15;
      const a2 = A2_BASE + phase * 0.4;
      const c0 = curlAt(x * S0, y * S0, currentTime * K0);
      const c1 = curlAt(x * S1, y * S1, currentTime * K1);
      const c2 = curlAt(x * S2, y * S2, currentTime * K2);
      let vx = A0_BASE * c0.x + a1 * c1.x + a2 * c2.x;
      let vy = A0_BASE * c0.y + a1 * c1.y + a2 * c2.y;

      vortices.forEach((vortex) => {
        const dx = x - vortex.x;
        const dy = y - vortex.y;
        const distance = Math.sqrt(dx * dx + dy * dy) + 1;
        const influence = 1 / (1 + distance / VORTEX_FALLOFF);
        const tx = -dy / distance;
        const ty = dx / distance;

        vx += tx * VORTEX_TANGENT_K * influence * vortex.dir;
        vy += ty * VORTEX_TANGENT_K * influence * vortex.dir;
        vx -= dx * VORTEX_RADIAL_K * influence;
        vy -= dy * VORTEX_RADIAL_K * influence;
      });

      if (phase > 0.3) {
        const jitterAmt = (phase - 0.3) * 0.08;
        vx += (Math.random() - 0.5) * jitterAmt;
        vy += (Math.random() - 0.5) * jitterAmt;
      }

      return { x: vx, y: vy };
    };

    const updateVortices = (step: number) => {
      vortices.forEach((vortex) => {
        vortex.x += vortex.vx * step;
        vortex.y += vortex.vy * step;

        if (vortex.x < width * 0.05 || vortex.x > width * 0.95) {
          vortex.vx *= -1;
        }
        if (vortex.y < height * 0.05 || vortex.y > height * 0.95) {
          vortex.vy *= -1;
        }
      });
    };

    const drawBrushStroke = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      rgb: [number, number, number],
      baseAlpha: number,
      baseWidth: number,
      bristleOff: number,
    ) => {
      const speed = Math.sqrt(vx * vx + vy * vy);
      let theta = Math.atan2(vy, vx);
      theta = Math.round(theta / ANGLE_QUANT) * ANGLE_QUANT;

      const baseLen = 5;
      const maxLen = 16;
      const len = baseLen + Math.min(speed * 20, maxLen - baseLen);
      const density = readDensity(x, y);
      const densityFactor = Math.min(density / 50, 1);
      const widthScale = baseWidth * (1 + densityFactor * 0.6);
      const alpha = baseAlpha * strokeAlphaMod() * (1 + densityFactor * 0.3);
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      const halfLen = len * 0.5;
      const jitter = simplex2(x * 0.008 + bristleOff, y * 0.008) * 1.2;

      context.lineCap = "round";

      context.globalAlpha = alpha;
      context.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      context.lineWidth = widthScale;
      context.beginPath();
      context.moveTo(
        x - cosTheta * halfLen + sinTheta * jitter,
        y - sinTheta * halfLen - cosTheta * jitter,
      );
      context.lineTo(
        x + cosTheta * halfLen - sinTheta * jitter * 0.5,
        y + sinTheta * halfLen + cosTheta * jitter * 0.5,
      );
      context.stroke();

      const sideOffset = widthScale * 0.7;
      const sideAlpha = alpha * 0.3;
      const sideLen = halfLen * (0.5 + Math.random() * 0.3);
      context.globalAlpha = sideAlpha;
      context.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${sideAlpha})`;
      context.lineWidth = widthScale * 0.3;
      context.beginPath();
      context.moveTo(
        x - cosTheta * sideLen + sinTheta * sideOffset,
        y - sinTheta * sideLen - cosTheta * sideOffset,
      );
      context.lineTo(
        x + cosTheta * sideLen + sinTheta * sideOffset,
        y + sinTheta * sideLen - cosTheta * sideOffset,
      );
      context.stroke();
    };

    const spawnDyeDrop = (x: number, y: number) => {
      const colorIndex = Math.floor(Math.random() * DYE_PALETTE.length);
      const rgb = DYE_PALETTE[colorIndex];

      for (let index = 0; index < dyeParticleCount; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 8;
        const pushSpeed = 0.15 + Math.random() * 0.35;

        dyeParticles.push({
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          vx: Math.cos(angle) * pushSpeed,
          vy: Math.sin(angle) * pushSpeed,
          rgb,
          life: 0,
          maxLife: 200 + Math.floor(Math.random() * 250),
          baseAlpha: 0.05 + Math.random() * 0.045,
          baseWidth: 0.8 + Math.random() * 1.2,
          bristleOff: Math.random() * Math.PI * 2,
        });
      }

      nextDyeTime =
        elapsedMs +
        DYE_INTERVAL_MIN +
        Math.random() * (DYE_INTERVAL_MAX - DYE_INTERVAL_MIN);
    };

    const spawnRandomDyeDrop = () => {
      spawnDyeDrop(
        0.15 * width + Math.random() * 0.7 * width,
        0.15 * height + Math.random() * 0.7 * height,
      );
    };

    const updateAndDrawDye = (step: number) => {
      for (let index = dyeParticles.length - 1; index >= 0; index -= 1) {
        const dye = dyeParticles[index];
        dye.life += step;

        if (dye.life > dye.maxLife) {
          dyeParticles.splice(index, 1);
          continue;
        }

        const progress = dye.life / dye.maxLife;
        const velocity = velocityAt(dye.x, dye.y, time, diffPhase);
        const decay = Math.pow(0.97, step);
        dye.vx *= decay;
        dye.vy *= decay;
        dye.x += (dye.vx + velocity.x * FLOW_SPEED * 1.1) * step;
        dye.y += (dye.vy + velocity.y * FLOW_SPEED * 1.1) * step;

        if (dye.x < 0) dye.x += width;
        if (dye.x > width) dye.x -= width;
        if (dye.y < 0) dye.y += height;
        if (dye.y > height) dye.y -= height;

        let alpha = 0;
        if (progress < 0.05) {
          alpha = dye.baseAlpha * (progress / 0.05);
        } else {
          const fadeT = (progress - 0.05) / 0.95;
          alpha = dye.baseAlpha * (1 - fadeT) * (1 - fadeT);
        }

        if (alpha < 0.001) {
          continue;
        }

        const edgeMargin = 20;
        if (
          dye.x < edgeMargin ||
          dye.x > width - edgeMargin ||
          dye.y < edgeMargin ||
          dye.y > height - edgeMargin
        ) {
          continue;
        }

        depositDensity(dye.x, dye.y);
        drawBrushStroke(
          dye.x,
          dye.y,
          velocity.x,
          velocity.y,
          dye.rgb,
          alpha,
          dye.baseWidth,
          dye.bristleOff,
        );
      }
    };

    const maybeHallucinate = () => {
      if (elapsedMs - lastHallucinationTime < HALLUC_INTERVAL) {
        return;
      }
      if (Math.random() > 0.02) {
        return;
      }

      lastHallucinationTime = elapsedMs;
      const count = 1 + Math.floor(Math.random() * 2);
      for (
        let index = 0;
        index < count && index < vortices.length;
        index += 1
      ) {
        const vortexIndex = Math.floor(Math.random() * vortices.length);
        const vortex = vortices[vortexIndex];
        vortex.x = 0.15 * width + Math.random() * 0.7 * width;
        vortex.y = 0.15 * height + Math.random() * 0.7 * height;
        vortex.dir *= -1;
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      applyQuality(qualityLevel);

      const dpr = Math.min(window.devicePixelRatio || 1, renderDprCap);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.fillStyle = CREAM;
      context.fillRect(0, 0, width, height);
      lastAnimationTime = 0;
    };

    const renderStep = (
      deltaMs: number,
      overlayScale: number,
      allowHallucination: boolean,
    ) => {
      elapsedMs += deltaMs;
      const step = deltaMs / FRAME_DURATION;

      updateDiffusionPhase();
      if (allowHallucination) {
        maybeHallucinate();
      }

      context.globalAlpha = 1;
      context.fillStyle = `rgba(255,255,248,${Math.min(
        0.08,
        fadeAlpha() * step * overlayScale,
      )})`;
      context.fillRect(0, 0, width, height);

      time += timeSpeed() * step;
      updateVortices(step);

      densityElapsedMs += deltaMs;
      while (densityElapsedMs >= 30 * FRAME_DURATION) {
        diffuseDensityGrid();
        densityElapsedMs -= 30 * FRAME_DURATION;
      }

      if (elapsedMs >= nextDyeTime) {
        spawnRandomDyeDrop();
      }

      context.globalCompositeOperation = "source-over";
      for (let index = 0; index < skyParticles.length; index += 1) {
        const particle = skyParticles[index];
        const velocity = velocityAt(particle.x, particle.y, time, diffPhase);

        particle.x += velocity.x * FLOW_SPEED * step;
        particle.y += velocity.y * FLOW_SPEED * step;

        if (particle.x < 0) particle.x += width;
        if (particle.x > width) particle.x -= width;
        if (particle.y < 0) particle.y += height;
        if (particle.y > height) particle.y -= height;

        depositDensity(particle.x, particle.y);

        const edgeMargin = 20;
        if (
          particle.x > edgeMargin &&
          particle.x < width - edgeMargin &&
          particle.y > edgeMargin &&
          particle.y < height - edgeMargin
        ) {
          drawBrushStroke(
            particle.x,
            particle.y,
            velocity.x,
            velocity.y,
            particle.rgb,
            particle.baseAlpha,
            particle.baseWidth,
            particle.bristleOff,
          );
        }
      }

      updateAndDrawDye(step);

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    };

    const maybeReduceQuality = (now: number) => {
      if (!lastQualitySampleTime) {
        lastQualitySampleTime = now;
        return;
      }

      const delta = now - lastQualitySampleTime;
      lastQualitySampleTime = now;

      if (delta > 28) {
        slowFrameStreak += 1;
      } else {
        slowFrameStreak = Math.max(0, slowFrameStreak - 2);
      }

      if (slowFrameStreak < 8 || qualityLevel >= QUALITY_PROFILES.length - 1) {
        return;
      }

      slowFrameStreak = 0;
      applyQuality(qualityLevel + 1);
      resize();
    };

    const animate = (now = performance.now()) => {
      animationFrame = window.requestAnimationFrame(animate);
      if (!lastAnimationTime) {
        lastAnimationTime = now;
      }

      const deltaMs = Math.min(
        96,
        Math.max(8, now - lastAnimationTime || FRAME_DURATION),
      );
      lastAnimationTime = now;
      maybeReduceQuality(now);
      renderStep(deltaMs, 1, true);
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        resetScene();
      }, 200);
    };

    applyQuality(
      reducedMotion
        ? QUALITY_PROFILES.length - 1
        : (() => {
            const cores = navigator.hardwareConcurrency || 4;
            const memory = navigator.deviceMemory || 4;
            if (cores <= 4 || memory <= 4) return 2;
            if (cores >= 8 && memory >= 8) return 0;
            return 1;
          })(),
    );
    resize();
    resetScene();

    if (reducedMotion) {
      renderStep(FRAME_DURATION, 0.7, false);
    } else {
      animate();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      context = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="portfolio-diffusion-canvas"
    />
  );
};

export default DiffusionBackground;

"use client";

// The Hakone monolith: two heavy volumes, rough volcanic basalt below and
// mirror-gloss black urushi above, locked by a stepped scarf joint (a
// halving cut in a Z). In the narrow gap between them (ma) sits one
// vermilion pin, the komisen that holds a Japanese joint in tension.
//
// Everything is procedural: the volumes are chamfered extrusions, the
// basalt grain is a tileable noise texture made here, and the reflections
// come from a small gallery built in code (an overcast skylight, one tall
// window, a horizon band) and prefiltered by PMREMGenerator. No model,
// texture or HDR file is downloaded.
//
// It breathes on a nine-second tide. The cursor moves the eye and the key
// light; holding the pointer (or the space bar) slides the stones apart
// along the joint's diagonal and shows the pin; release lets them settle
// back, with a wooden knock as they close.

import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { seeded } from "./random";

export type MonolithSceneProps = {
  active: boolean;
  eventSource: RefObject<HTMLDivElement | null>;
  onReady?: () => void;
  /** The gap is fully open: the pin is on show. */
  onOpen?: () => void;
  /** The stones have closed again. */
  onSettle?: () => void;
};

// ------------------------------------------------------------ dimensions
const W = 1.9; // width of the monolith
const D = 1.25; // depth
const BOTTOM = -2.45;
const TOP = 2.15;
const STEP = 0.85; // height of the halving step in the joint
const CHAMFER = 0.05;
const REST_GAP = 0.05; // the ma, closed
const OPEN_GAP = 0.62; // the ma, held open
const DIAG = Math.SQRT1_2;

type V2 = [number, number];

/** Cuts every convex corner of a counter-clockwise polygon at 45°. */
function chamfer(points: V2[], c: number): V2[] {
  const out: V2[] = [];
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p = points[(i - 1 + n) % n];
    const v = points[i];
    const q = points[(i + 1) % n];
    const turn = (v[0] - p[0]) * (q[1] - v[1]) - (v[1] - p[1]) * (q[0] - v[0]);
    if (turn <= 0) {
      out.push(v);
      continue;
    }
    const a = Math.hypot(p[0] - v[0], p[1] - v[1]);
    const b = Math.hypot(q[0] - v[0], q[1] - v[1]);
    out.push([v[0] + ((p[0] - v[0]) / a) * c, v[1] + ((p[1] - v[1]) / a) * c]);
    out.push([v[0] + ((q[0] - v[0]) / b) * c, v[1] + ((q[1] - v[1]) / b) * c]);
  }
  return out;
}

/** A front profile extruded to the monolith's depth, every edge chamfered. */
function volume(profile: V2[]): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape(chamfer(profile, CHAMFER).map(([x, y]) => new THREE.Vector2(x, y)));
  const depth = D - 2 * CHAMFER;
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    curveSegments: 1,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelThickness: CHAMFER,
    bevelSize: CHAMFER,
    bevelOffset: -CHAMFER,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

// The joint: the lower stone keeps the right half of the step, the upper
// stone the left half, so the seam runs flat, up, flat (a Z).
const w = W / 2;
const LOWER: V2[] = [
  [-w, BOTTOM],
  [w, BOTTOM],
  [w, STEP],
  [0, STEP],
  [0, 0],
  [-w, 0],
];
const UPPER: V2[] = [
  [-w, 0],
  [0, 0],
  [0, STEP],
  [w, STEP],
  [w, TOP],
  [-w, TOP],
];

// ------------------------------------------------------------- materials

/** Tileable basalt: layered value noise with vesicles (small gas pits). */
function basaltData(size: number): Uint8Array<ArrayBuffer> {
  const rand = seeded(23);
  const field = new Float32Array(size * size);
  for (const [cells, amp] of [
    [6, 0.42],
    [14, 0.26],
    [32, 0.18],
    [72, 0.14],
  ] as const) {
    const grid = Float32Array.from({ length: cells * cells }, () => rand());
    const at = (x: number, y: number) => grid[(y % cells) * cells + (x % cells)];
    for (let y = 0; y < size; y++) {
      const gy = (y / size) * cells;
      const iy = Math.floor(gy);
      const ty = gy - iy;
      const sy = ty * ty * (3 - 2 * ty);
      for (let x = 0; x < size; x++) {
        const gx = (x / size) * cells;
        const ix = Math.floor(gx);
        const tx = gx - ix;
        const sx = tx * tx * (3 - 2 * tx);
        const top = at(ix, iy) * (1 - sx) + at(ix + 1, iy) * sx;
        const bottom = at(ix, iy + 1) * (1 - sx) + at(ix + 1, iy + 1) * sx;
        field[y * size + x] += amp * (top * (1 - sy) + bottom * sy);
      }
    }
  }
  for (let k = 0; k < 520; k++) {
    const cx = rand() * size;
    const cy = rand() * size;
    const r = 0.8 + rand() * rand() * 4.2;
    for (let dy = -Math.ceil(r); dy <= Math.ceil(r); dy++) {
      for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) {
        const d = Math.hypot(dx, dy);
        if (d > r) continue;
        const px = (Math.floor(cx + dx) + size) % size;
        const py = (Math.floor(cy + dy) + size) % size;
        field[py * size + px] -= 0.32 * (1 - d / r);
      }
    }
  }
  let min = Infinity;
  let max = -Infinity;
  for (const v of field) {
    min = Math.min(min, v);
    max = Math.max(max, v);
  }
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < field.length; i++) {
    const v = Math.round(((field[i] - min) / (max - min)) * 255);
    data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  return data;
}

function texture(data: Uint8Array<ArrayBuffer>, size: number, srgb: boolean): THREE.DataTexture {
  const tex = new THREE.DataTexture(data, size, size);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(0.9, 0.9);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createKit() {
  const size = 256;
  const data = basaltData(size);
  // The colour map is a gentle tint of the same grain (85 to 100 %).
  const tint = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const v = 216 + Math.round((data[i] / 255) * 39);
    tint[i] = tint[i + 1] = tint[i + 2] = v;
    tint[i + 3] = 255;
  }
  const bump = texture(data, size, false);
  const map = texture(tint, size, true);

  const basalt = new THREE.MeshStandardMaterial({
    color: "#2c2b29",
    map,
    roughness: 0.92,
    metalness: 0,
    bumpMap: bump,
    bumpScale: 3.2,
    // Stone takes little from the bright sky; the lights model it.
    envMapIntensity: 0.12,
  });
  const lacquer = new THREE.MeshPhysicalMaterial({
    color: "#050506",
    roughness: 0.22,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    // The mirror is the clearcoat; the urushi under it stays deep.
    specularIntensity: 0.08,
    envMapIntensity: 1,
  });
  const pin = new THREE.MeshStandardMaterial({
    color: "#c83e2b",
    emissive: "#c83e2b",
    emissiveIntensity: 0.32,
    roughness: 0.38,
    metalness: 0,
  });

  const lower = volume(LOWER);
  const upper = volume(UPPER);
  // A square pin turned 45° so its edges are knife-sharp in the light.
  const pinGeometry = new THREE.BoxGeometry(0.058, 0.058, D + 0.32);

  const dispose = () => {
    [lower, upper, pinGeometry].forEach((g) => g.dispose());
    [basalt, lacquer, pin].forEach((m) => m.dispose());
    [bump, map].forEach((t) => t.dispose());
  };
  return { basalt, lacquer, pin, lower, upper, pinGeometry, dispose };
}

// --------------------------------------------------------- environment

/**
 * Open-air light, prefiltered once: an overcast sky over a dark sea, a pale
 * horizon line all the way round (so the lacquer always carries one), and
 * a tall window to the left for a single clean highlight. Values run above
 * 1 on purpose: black urushi reflects only a few percent at normal incidence.
 */
function setupEnvironment({ gl, scene }: RootState) {
  const world = new THREE.Scene();
  const skyGeometry = new THREE.SphereGeometry(20, 48, 24);
  const sky = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: "varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `
      varying vec3 vDir;
      void main() {
        float y = normalize(vDir).y;
        vec3 overcast = mix(vec3(0.5, 0.51, 0.54), vec3(0.2, 0.205, 0.225), smoothstep(0.0, 0.85, y));
        vec3 sea = mix(vec3(0.07, 0.075, 0.085), vec3(0.015, 0.016, 0.018), smoothstep(0.0, -0.4, y));
        vec3 c = y > 0.0 ? overcast : sea;
        // The horizon line sits a little above eye level, so it crosses the lacquer.
        c += vec3(5.2, 5.3, 5.6) * exp(-pow((y - 0.14) * 95.0, 2.0));
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  world.add(new THREE.Mesh(skyGeometry, sky));
  const windowGeometry = new THREE.PlaneGeometry(0.9, 11);
  const windowMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 5.9, 5.6), side: THREE.DoubleSide, toneMapped: false });
  const pane = new THREE.Mesh(windowGeometry, windowMaterial);
  pane.position.set(-14, 2, 4);
  pane.lookAt(0, 0, 0);
  world.add(pane);

  const pmrem = new THREE.PMREMGenerator(gl);
  scene.environment = pmrem.fromScene(world, 0.012).texture;
  scene.environmentIntensity = 1;
  pmrem.dispose();
  [skyGeometry, windowGeometry].forEach((g) => g.dispose());
  [sky, windowMaterial].forEach((m) => m.dispose());
}

// ------------------------------------------------------------ simulation

type Sim = {
  pointer: THREE.Vector2; // where the cursor is, -1..1
  eye: THREE.Vector2; // where the eye has drifted to
  open: number; // 0 closed, 1 held open
  velocity: number;
  target: 0 | 1;
  yaw: number;
  spin: number;
  down: boolean;
  lastX: number;
  opened: boolean; // opened far enough to knock when it closes
  chimed: boolean;
  frames: number;
};

const TIDE = (Math.PI * 2) / 9;

function Monolith({ eventSource, onReady, onOpen, onSettle }: Omit<MonolithSceneProps, "active">) {
  const kit = useMemo(() => createKit(), []);
  const viewport = useThree((s) => s.viewport);
  const group = useRef<THREE.Group>(null);
  const lower = useRef<THREE.Mesh>(null);
  const upper = useRef<THREE.Mesh>(null);
  const pin = useRef<THREE.Mesh>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const sim = useRef<Sim | null>(null);

  useEffect(() => kit.dispose, [kit]);

  useEffect(() => {
    const el = eventSource.current;
    if (!el) return;
    const get = () => (sim.current ??= freshSim());
    const point = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      get().pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const move = (e: PointerEvent) => {
      point(e);
      const s = get();
      if (!s.down) return;
      s.spin += (e.clientX - s.lastX) * 0.0045;
      s.lastX = e.clientX;
    };
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      point(e);
      const s = get();
      s.down = true;
      s.lastX = e.clientX;
      s.target = 1;
      s.chimed = false;
    };
    const up = () => {
      const s = get();
      if (!s.down) return;
      s.down = false;
      s.target = 0;
    };
    const leave = () => {
      get().pointer.set(0, 0);
      up();
    };
    const keyDown = (e: KeyboardEvent) => {
      const s = get();
      if (e.key === " " || e.key === "Enter") {
        if (!e.repeat) {
          s.target = 1;
          s.chimed = false;
        }
      } else if (e.key === "ArrowLeft") s.spin -= 0.5;
      else if (e.key === "ArrowRight") s.spin += 0.5;
      else return;
      e.preventDefault();
    };
    const keyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") get().target = 0;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("keydown", keyDown);
    el.addEventListener("keyup", keyUp);
    el.addEventListener("blur", up);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("keydown", keyDown);
      el.removeEventListener("keyup", keyUp);
      el.removeEventListener("blur", up);
    };
  }, [eventSource]);

  // Wide frames set the stone right of centre (asymmetric ma); tall ones centre it.
  const offset = viewport.aspect > 1.4 ? viewport.width * 0.1 : 0;
  // Tall frames step back, so the stone keeps its space around it.
  const distance = viewport.aspect < 1 ? 15.5 : 12;

  useFrame((state, rawDelta) => {
    const s = (sim.current ??= freshSim());
    const dt = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;

    // The gap: a soft spring, slower to open than to close, a hair under critical.
    const k = s.target ? 7 : 11;
    s.velocity += (k * (s.target - s.open) - 2 * Math.sqrt(k) * 0.84 * s.velocity) * dt;
    s.open += s.velocity * dt;
    if (s.target && s.open > 0.92 && !s.chimed) {
      s.chimed = true;
      onOpen?.();
    }
    if (s.open > 0.45) s.opened = true;
    if (!s.target && s.opened && s.open < 0.06) {
      s.opened = false;
      onSettle?.();
    }

    // Drag turns it a little; it drifts home.
    s.spin *= Math.exp(-dt * 2.4);
    s.yaw += s.spin * dt * 4;
    s.yaw += -s.yaw * dt * 0.35;

    const tide = Math.sin(t * TIDE);
    const gap = REST_GAP + (tide * 0.5 + 0.5) * 0.012 + Math.max(s.open, 0) * (OPEN_GAP - REST_GAP);
    const half = (gap / 2) * DIAG;

    if (group.current) {
      group.current.position.set(offset, tide * 0.045, 0);
      group.current.rotation.set(Math.sin(t * ((Math.PI * 2) / 19)) * 0.022, -0.5 + Math.sin(t * ((Math.PI * 2) / 26)) * 0.11 + s.yaw, 0);
    }
    // The upper stone slides up and left along the joint's diagonal, the lower down and right.
    lower.current?.position.set(half, -half, 0);
    upper.current?.position.set(-half, half, 0);
    if (pin.current) pin.current.rotation.z = Math.PI / 4 + Math.sin(t * 0.9) * 0.05 * Math.max(s.open, 0);

    // The eye and the key light follow the cursor, slowly.
    s.eye.lerp(s.pointer, 1 - Math.exp(-dt * 1.6));
    const camera = state.camera;
    camera.position.set(s.eye.x * 0.95, -0.4 + s.eye.y * 0.5, distance);
    camera.lookAt(offset * 0.35, 0.05, 0);
    key.current?.position.set(-4.5 + s.eye.x * 4, 6 + s.eye.y * 2, 5);

    s.frames++;
    if (s.frames === 3) onReady?.();
  });

  return (
    <>
      <directionalLight ref={key} position={[-4.5, 6, 5]} intensity={2.3} color="#f4efe6" />
      <directionalLight position={[6, 1.5, 4]} intensity={0.55} color="#c9d1de" />
      <directionalLight position={[-2, 3, -7]} intensity={1.6} color="#e6e4df" />
      <group ref={group}>
        <mesh ref={lower} geometry={kit.lower} material={kit.basalt} />
        <mesh ref={upper} geometry={kit.upper} material={kit.lacquer} />
        <mesh ref={pin} geometry={kit.pinGeometry} material={kit.pin} position={[0, STEP / 2, 0]} rotation={[0, 0, Math.PI / 4]} />
      </group>
    </>
  );
}

function freshSim(): Sim {
  return {
    pointer: new THREE.Vector2(),
    eye: new THREE.Vector2(),
    open: 0,
    velocity: 0,
    target: 0,
    yaw: 0,
    spin: 0,
    down: false,
    lastX: 0,
    opened: false,
    chimed: false,
    frames: 0,
  };
}

export default function MonolithScene({ active, eventSource, onReady, onOpen, onSettle }: MonolithSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, -0.4, 12], fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
      onCreated={setupEnvironment}
      style={{ position: "absolute", inset: 0 }}
    >
      <Monolith eventSource={eventSource} onReady={onReady} onOpen={onOpen} onSettle={onSettle} />
    </Canvas>
  );
}

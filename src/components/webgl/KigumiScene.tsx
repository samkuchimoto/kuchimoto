"use client";

// The Kigumi study: interlocking joinery modules in three materials, glossy
// urushi lacquer, matte volcanic basalt and brushed titanium, with one
// vermilion inlay. Procedural geometry only (no model file): every beam
// and block is a chamfered extrusion, every rod a cylinder, each drawn as
// instances, so the whole sculpture takes about a dozen draw calls.
//
// Physics, hand-written: each module springs toward a home on a slowly
// turning ellipsoid, modules keep their distance, the cursor pushes them
// aside and tilts them, a drag spins the whole cluster with inertia.
// Holding the pointer (or the space bar) explodes the joinery: every beam
// slides out along its own axis and the cluster opens; release springs it
// back together. A quick click strikes the modules nearby. All mutable
// state lives in one ref and is only touched inside the frame loop and
// event handlers.

import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { seeded } from "./random";

export type KigumiSceneProps = {
  /** Render only while on screen. */
  active: boolean;
  quality: "high" | "low";
  /** The element that receives pointer and keyboard input. */
  eventSource: RefObject<HTMLElement | null>;
  onReady?: () => void;
  /** The joinery is fully open. */
  onOpen?: () => void;
  /** The joinery has closed again after opening. */
  onSettle?: () => void;
  /** A quick click struck the modules. */
  onStrike?: () => void;
};

type GeoKey = "beamA" | "beamB" | "beamC" | "block" | "rod";
type MatKey = "lacquer" | "basalt" | "titanium";
type Axis = "x" | "y" | "z";
type Part = { geo: GeoKey; mat: MatKey; pos: [number, number, number]; axis: Axis };

// Cross-sections differ (0.48, 0.40, 0.44) so no two faces ever share a plane.
const ARCHETYPES: Part[][] = [
  // Six-arm burr
  [
    { geo: "beamA", mat: "basalt", pos: [0, 0, 0], axis: "x" },
    { geo: "beamB", mat: "lacquer", pos: [0, 0, 0], axis: "y" },
    { geo: "beamC", mat: "titanium", pos: [0, 0, 0], axis: "z" },
  ],
  // Block pinned by two rods
  [
    { geo: "block", mat: "lacquer", pos: [0, 0, 0], axis: "x" },
    { geo: "rod", mat: "titanium", pos: [0, 0, 0], axis: "x" },
    { geo: "rod", mat: "titanium", pos: [0, 0, 0], axis: "y" },
  ],
  // Tee joint
  [
    { geo: "beamA", mat: "lacquer", pos: [0, -0.3, 0], axis: "x" },
    { geo: "beamC", mat: "basalt", pos: [0, 0.3, 0], axis: "y" },
  ],
  // Corner joint with a through-pin
  [
    { geo: "beamC", mat: "basalt", pos: [0.36, 0, 0], axis: "x" },
    { geo: "beamB", mat: "lacquer", pos: [0, 0.55, 0], axis: "y" },
    { geo: "rod", mat: "titanium", pos: [0, 0, 0], axis: "z" },
  ],
  // Cross-halving lap joint
  [
    { geo: "beamA", mat: "basalt", pos: [0, 0.12, 0], axis: "x" },
    { geo: "beamA", mat: "lacquer", pos: [0, -0.12, 0], axis: "z" },
  ],
  // Beam through a block
  [
    { geo: "block", mat: "basalt", pos: [0, 0, 0], axis: "x" },
    { geo: "beamB", mat: "lacquer", pos: [0, 0, 0], axis: "z" },
    { geo: "rod", mat: "titanium", pos: [0, 0, 0], axis: "y" },
  ],
];
const SEQUENCE = [0, 1, 4, 2, 5, 3, 0, 4, 1, 2, 3, 5, 0, 2, 1];

const AXIS_QUAT: Record<Axis, THREE.Quaternion> = {
  x: new THREE.Quaternion(),
  y: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2),
  z: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2),
};

// ------------------------------------------------------------- layout (pure)

type Slot = { geo: GeoKey; mat: MatKey; count: number };
type PartLayout = {
  key: string;
  index: number;
  pos: THREE.Vector3;
  quat: THREE.Quaternion;
  /** Where the part goes when the joinery opens: along its own axis, away from the joint. */
  slide: THREE.Vector3;
};
type BodyLayout = { parts: PartLayout[]; euler: THREE.Euler; spin: THREE.Vector3; phase: number };

const AXIS_DIR: Record<Axis, [number, number, number]> = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] };
const SLIDE = 1.0;

function layout(count: number): { slots: [string, Slot][]; bodies: BodyLayout[] } {
  const rand = seeded(42);
  const slots = new Map<string, Slot>();
  const bodies: BodyLayout[] = [];
  for (let i = 0; i < count; i++) {
    const swap = i % 2 === 1;
    const parts = ARCHETYPES[SEQUENCE[i % SEQUENCE.length]].map((part, n) => {
      const mat: MatKey = swap && part.mat !== "titanium" ? (part.mat === "lacquer" ? "basalt" : "lacquer") : part.mat;
      const key = `${part.geo}:${mat}`;
      const slot = slots.get(key) ?? { geo: part.geo, mat, count: 0 };
      const index = slot.count;
      slots.set(key, { ...slot, count: slot.count + 1 });
      const pos = new THREE.Vector3(...part.pos);
      // Alternate directions, so neighbouring parts pull apart rather than travel together;
      // parts set off-centre also move out along their offset.
      const slide = new THREE.Vector3(...AXIS_DIR[part.axis]).multiplyScalar(n % 2 === 0 ? SLIDE : -SLIDE);
      if (pos.lengthSq() > 0) slide.addScaledVector(pos.clone().normalize(), 0.32);
      return { key, index, pos, quat: AXIS_QUAT[part.axis].clone(), slide };
    });
    bodies.push({
      parts,
      euler: new THREE.Euler(rand() * Math.PI * 2, rand() * Math.PI * 2, rand() * Math.PI * 2),
      spin: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(0.12 + rand() * 0.16),
      phase: rand() * Math.PI * 2,
    });
  }
  return { slots: [...slots.entries()], bodies };
}

/** Homes on a Fibonacci ellipsoid sized to the frame. */
function homesFor(count: number, width: number, height: number): THREE.Vector3[] {
  const rx = Math.min(width * 0.22, 3.4);
  const ry = Math.min(height * 0.23, 1.55);
  const rz = 1.4;
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(Math.cos(theta) * r * rx, y * ry, Math.sin(theta) * r * rz);
  });
}

function basaltTexture(): THREE.DataTexture {
  const size = 128;
  const data = new Uint8Array(size * size * 4);
  const rand = seeded(7);
  for (let i = 0; i < size * size; i++) {
    const v = 110 + Math.floor(rand() * 120);
    data[i * 4] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

/** A box with every edge cut at 45 degrees: a rectangle with chamfered corners, extruded with a one-step bevel. */
function chamferedBox(width: number, height: number, depth: number, c: number): THREE.BufferGeometry {
  const w = width / 2;
  const h = height / 2;
  const shape = new THREE.Shape([
    new THREE.Vector2(-w + c, -h),
    new THREE.Vector2(w - c, -h),
    new THREE.Vector2(w, -h + c),
    new THREE.Vector2(w, h - c),
    new THREE.Vector2(w - c, h),
    new THREE.Vector2(-w + c, h),
    new THREE.Vector2(-w, h - c),
    new THREE.Vector2(-w, -h + c),
  ]);
  const inner = depth - 2 * c;
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: inner,
    steps: 1,
    curveSegments: 1,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelThickness: c,
    bevelSize: c,
    bevelOffset: -c,
  });
  geometry.translate(0, 0, -inner / 2);
  return geometry;
}

function createKit(quality: "high" | "low") {
  const geometries: Record<GeoKey, THREE.BufferGeometry> = {
    beamA: chamferedBox(2.2, 0.48, 0.48, 0.05),
    beamB: chamferedBox(1.9, 0.4, 0.4, 0.045),
    beamC: chamferedBox(1.2, 0.44, 0.44, 0.045),
    block: chamferedBox(0.74, 0.74, 0.74, 0.07),
    rod: new THREE.CylinderGeometry(0.12, 0.12, 2.6, quality === "high" ? 32 : 18).rotateZ(Math.PI / 2),
  };
  const bump = basaltTexture();
  const materials: Record<MatKey, THREE.Material> = {
    lacquer: new THREE.MeshPhysicalMaterial({
      color: "#09090a",
      roughness: 0.28,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      specularIntensity: 0.6,
    }),
    basalt: new THREE.MeshStandardMaterial({
      color: "#2b2a2b",
      roughness: 0.85,
      metalness: 0,
      bumpMap: bump,
      bumpScale: 2.2,
      roughnessMap: bump,
    }),
    titanium: new THREE.MeshPhysicalMaterial({
      color: "#c2c5ca",
      metalness: 1,
      roughness: 0.3,
      anisotropy: 0.7,
      anisotropyRotation: Math.PI / 2,
    }),
  };
  const vermilion = new THREE.MeshStandardMaterial({
    color: "#c83e2b",
    emissive: "#c83e2b",
    emissiveIntensity: 0.45,
    roughness: 0.35,
  });
  const inlay = new THREE.BoxGeometry(0.035, 0.492, 0.492);
  const dispose = () => {
    Object.values(geometries).forEach((g) => g.dispose());
    Object.values(materials).forEach((m) => m.dispose());
    vermilion.dispose();
    inlay.dispose();
    bump.dispose();
  };
  return { geometries, materials, vermilion, inlay, dispose };
}

// ------------------------------------------------------- simulation (mutable)

type Body = { p: THREE.Vector3; v: THREE.Vector3; q: THREE.Quaternion; w: THREE.Vector3 };

type Sim = {
  bodies: Body[];
  ndc: THREE.Vector2;
  over: boolean;
  down: boolean;
  dragging: boolean;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  strike: boolean;
  downAt: number;
  explode: number;
  explodeV: number;
  explodeTarget: 0 | 1;
  opened: boolean;
  chimed: boolean;
  spinKick: THREE.Vector2;
  cluster: THREE.Quaternion;
  clusterW: THREE.Vector3;
  frames: number;
  // scratch
  dq: THREE.Quaternion;
  home: THREE.Vector3;
  force: THREE.Vector3;
  d: THREE.Vector3;
  cursor: THREE.Vector3;
  ray: THREE.Vector3;
  axis: THREE.Vector3;
  m: THREE.Matrix4;
  part: THREE.Matrix4;
  local: THREE.Matrix4;
  at: THREE.Vector3;
};

const ONE = new THREE.Vector3(1, 1, 1);
const Z = new THREE.Vector3(0, 0, 1);
const INLAY_AT = new THREE.Vector3(0.62, 0, 0);
const NO_TURN = new THREE.Quaternion();

function createSim(bodies: BodyLayout[], homes: THREE.Vector3[]): Sim {
  return {
    // Start scattered wide and behind: the sculpture assembles itself on load.
    bodies: bodies.map((b, i) => ({
      p: homes[i].clone().multiplyScalar(2.6).add(new THREE.Vector3(0, 0, -3)),
      v: new THREE.Vector3(),
      q: new THREE.Quaternion().setFromEuler(b.euler),
      w: new THREE.Vector3(),
    })),
    ndc: new THREE.Vector2(),
    over: false,
    down: false,
    dragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    strike: false,
    downAt: 0,
    explode: 0,
    explodeV: 0,
    explodeTarget: 0,
    opened: false,
    chimed: false,
    spinKick: new THREE.Vector2(),
    cluster: new THREE.Quaternion(),
    clusterW: new THREE.Vector3(),
    frames: 0,
    dq: new THREE.Quaternion(),
    home: new THREE.Vector3(),
    force: new THREE.Vector3(),
    d: new THREE.Vector3(),
    cursor: new THREE.Vector3(),
    ray: new THREE.Vector3(),
    axis: new THREE.Vector3(),
    m: new THREE.Matrix4(),
    part: new THREE.Matrix4(),
    local: new THREE.Matrix4(),
    at: new THREE.Vector3(),
  };
}

function integrate(sim: Sim, q: THREE.Quaternion, w: THREE.Vector3, dt: number) {
  const angle = w.length() * dt;
  if (angle < 1e-6) return;
  sim.axis.copy(w).normalize();
  sim.dq.setFromAxisAngle(sim.axis, angle);
  q.premultiply(sim.dq).normalize();
}

type Meshes = { instanced: Record<string, THREE.InstancedMesh | null>; inlay: THREE.Mesh | null };

function step(
  sim: Sim,
  state: RootState,
  delta: number,
  layoutBodies: BodyLayout[],
  homes: THREE.Vector3[],
  meshes: Meshes,
  slots: [string, Slot][],
  events: { onOpen?: () => void; onSettle?: () => void },
) {
  const dt = Math.min(delta, 1 / 30);

  // The joinery: a soft spring toward open or closed, a touch under critical so it lands with a little snap.
  const k = sim.explodeTarget ? 6 : 10;
  sim.explodeV += (k * (sim.explodeTarget - sim.explode) - 2 * Math.sqrt(k) * 0.72 * sim.explodeV) * dt;
  sim.explode += sim.explodeV * dt;
  const open = Math.max(sim.explode, 0);
  if (sim.explodeTarget && open > 0.9 && !sim.chimed) {
    sim.chimed = true;
    events.onOpen?.();
  }
  if (open > 0.4) sim.opened = true;
  if (!sim.explodeTarget && sim.opened && open < 0.05) {
    sim.opened = false;
    events.onSettle?.();
  }
  const t = state.clock.elapsedTime;
  const camera = state.camera;

  // Cluster spin: a slow idle turn plus drag inertia.
  const kickScale = 0.0045 / Math.max(state.size.width / 1000, 0.6);
  sim.clusterW.y += sim.spinKick.x * kickScale;
  sim.clusterW.x += sim.spinKick.y * kickScale;
  sim.spinKick.set(0, 0);
  sim.clusterW.multiplyScalar(Math.exp(-1.4 * dt));
  sim.ray.set(sim.clusterW.x, sim.clusterW.y + 0.07, 0);
  integrate(sim, sim.cluster, sim.ray, dt);

  // Where the cursor meets the z = 0 plane. While the joinery is held open, the cursor stops pushing,
  // so the opening reads as one clean burst from the centre.
  let cursorActive = sim.over && !sim.down;
  if (cursorActive) {
    sim.ray.set(sim.ndc.x, sim.ndc.y, 0.5).unproject(camera).sub(camera.position).normalize();
    const k = -camera.position.z / sim.ray.z;
    sim.cursor.copy(camera.position).addScaledVector(sim.ray, k);
  }
  const striking = sim.strike;
  if (striking) {
    sim.strike = false;
    if (!cursorActive) {
      sim.cursor.set(0, 0, 0);
      cursorActive = true;
    }
  }

  // Tall frames step the camera back, so the assembly keeps its space around it.
  camera.position.z += ((state.size.width < state.size.height ? 16.5 : 12) - camera.position.z) * 0.2;

  // Camera parallax, very slight.
  camera.position.x += ((sim.over ? sim.ndc.x * 0.5 : 0) - camera.position.x) * 0.04;
  camera.position.y += ((sim.over ? sim.ndc.y * 0.3 : 0) - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);

  const bodies = sim.bodies;
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    const shape = layoutBodies[i];
    // Open: the cluster spreads across the frame, barely toward the eye.
    sim.home.copy(homes[i]).applyQuaternion(sim.cluster);
    sim.home.x *= 1 + open * 0.75;
    sim.home.y *= 1 + open * 0.75;
    sim.home.z *= 1 + open * 0.15;
    sim.home.y += Math.sin(t * 0.55 + shape.phase) * 0.09;

    // Spring home, damped.
    sim.force.copy(sim.home).sub(b.p).multiplyScalar(3.0).addScaledVector(b.v, -2.3);

    if (cursorActive) {
      sim.d.copy(b.p).sub(sim.cursor);
      sim.d.z *= 0.35;
      const dist = sim.d.length();
      const radius = striking ? 3.4 : 2.5;
      if (dist < radius && dist > 1e-4) {
        const fall = 1 - dist / radius;
        sim.d.normalize();
        if (striking) {
          b.v.addScaledVector(sim.d, 9 * fall);
          sim.axis.set(Math.sin(i * 12.9 + t), Math.cos(i * 7.3 + t), Math.sin(i * 3.1 - t));
          b.w.addScaledVector(sim.axis, 4 * fall);
        } else {
          sim.force.addScaledVector(sim.d, 34 * fall * fall);
          // Tilt: torque about the axis across the push.
          sim.axis.crossVectors(Z, sim.d);
          b.w.addScaledVector(sim.axis, 2.2 * fall * dt);
        }
      }
    }

    // Keep a respectful distance from neighbours.
    for (let j = i + 1; j < bodies.length; j++) {
      const o = bodies[j];
      sim.d.copy(b.p).sub(o.p);
      const dist = sim.d.length();
      const min = 1.5;
      if (dist < min && dist > 1e-4) {
        sim.d.multiplyScalar(((min - dist) * 10) / dist);
        b.v.addScaledVector(sim.d, dt);
        o.v.addScaledVector(sim.d, -dt);
      }
    }

    b.v.addScaledVector(sim.force, dt);
    b.p.addScaledVector(b.v, dt);
    b.w.multiplyScalar(Math.exp(-1.1 * dt));
    sim.ray.copy(b.w).add(shape.spin);
    integrate(sim, b.q, sim.ray, dt);

    sim.m.compose(b.p, b.q, ONE);
    for (const part of shape.parts) {
      sim.at.copy(part.pos).addScaledVector(part.slide, open);
      sim.local.compose(sim.at, part.quat, ONE);
      sim.part.multiplyMatrices(sim.m, sim.local);
      meshes.instanced[part.key]?.setMatrixAt(part.index, sim.part);
    }
    if (i === 0 && meshes.inlay) {
      // The inlay rides on the first beam, wherever it slides.
      sim.at.copy(INLAY_AT).addScaledVector(shape.parts[0].slide, open);
      sim.local.compose(sim.at, NO_TURN, ONE);
      meshes.inlay.matrix.multiplyMatrices(sim.m, sim.local);
      meshes.inlay.matrixWorldNeedsUpdate = true;
    }
  }
  for (const [key] of slots) {
    const mesh = meshes.instanced[key];
    if (mesh) mesh.instanceMatrix.needsUpdate = true;
  }
  sim.frames++;
}

// ------------------------------------------------------------------ react

function Sculpture({ quality, eventSource, onReady, onOpen, onSettle, onStrike }: Omit<KigumiSceneProps, "active">) {
  const viewport = useThree((s) => s.viewport);
  const count = quality === "high" ? 15 : 9;
  const kit = useMemo(() => createKit(quality), [quality]);
  const shape = useMemo(() => layout(count), [count]);
  const homes = useMemo(() => homesFor(count, viewport.width, viewport.height), [count, viewport.width, viewport.height]);

  const sim = useRef<Sim | null>(null);
  const meshes = useRef<Meshes>({ instanced: {}, inlay: null });

  useEffect(() => kit.dispose, [kit]);

  useEffect(() => {
    const el = eventSource.current;
    if (!el) return;
    const get = () => sim.current;
    const toNdc = (s: Sim, e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      s.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const move = (e: PointerEvent) => {
      const s = get();
      if (!s) return;
      toNdc(s, e);
      s.over = true;
      if (!s.down) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      if (!s.dragging && Math.hypot(e.clientX - s.startX, e.clientY - s.startY) > 6) s.dragging = true;
      if (s.dragging) {
        s.spinKick.x += dx;
        s.spinKick.y += dy;
      }
    };
    const down = (e: PointerEvent) => {
      const s = get();
      if (!s || e.button !== 0) return;
      toNdc(s, e);
      s.down = true;
      s.dragging = false;
      s.downAt = performance.now();
      s.explodeTarget = 1;
      s.chimed = false;
      s.startX = s.lastX = e.clientX;
      s.startY = s.lastY = e.clientY;
    };
    const release = (strike: boolean) => {
      const s = get();
      if (!s) return;
      // A quick click (not a hold, not a drag) also strikes the modules nearby.
      if (strike && s.down && !s.dragging && performance.now() - s.downAt < 260) {
        s.strike = true;
        onStrike?.();
      }
      s.down = false;
      s.dragging = false;
      s.explodeTarget = 0;
    };
    const up = () => release(true);
    const cancel = () => release(false);
    const leave = () => {
      const s = get();
      if (s) s.over = false;
      release(false);
    };
    const key = (e: KeyboardEvent) => {
      const s = get();
      if (!s) return;
      if (e.key === "ArrowLeft") s.spinKick.x -= 40;
      else if (e.key === "ArrowRight") s.spinKick.x += 40;
      else if (e.key === "ArrowUp") s.spinKick.y -= 40;
      else if (e.key === "ArrowDown") s.spinKick.y += 40;
      else if (e.key === "Enter" || e.key === " ") {
        if (!e.repeat) {
          s.explodeTarget = 1;
          s.chimed = false;
        }
      } else return;
      e.preventDefault();
    };
    const keyUp = (e: KeyboardEvent) => {
      const s = get();
      if (s && (e.key === "Enter" || e.key === " ")) s.explodeTarget = 0;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", cancel);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("keydown", key);
    el.addEventListener("keyup", keyUp);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", cancel);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("keydown", key);
      el.removeEventListener("keyup", keyUp);
    };
  }, [eventSource, onStrike]);

  useFrame((state, delta) => {
    sim.current ??= createSim(shape.bodies, homes);
    step(sim.current, state, delta, shape.bodies, homes, meshes.current, shape.slots, { onOpen, onSettle });
    if (sim.current.frames === 3) onReady?.();
  });

  return (
    <>
      {shape.slots.map(([key, slot]) => (
        <instancedMesh
          key={key}
          ref={(mesh) => {
            meshes.current.instanced[key] = mesh;
          }}
          args={[kit.geometries[slot.geo], kit.materials[slot.mat], slot.count]}
          frustumCulled={false}
        />
      ))}
      <mesh
        ref={(mesh) => {
          meshes.current.inlay = mesh;
        }}
        geometry={kit.inlay}
        material={kit.vermilion}
        matrixAutoUpdate={false}
        frustumCulled={false}
      />
    </>
  );
}

/** Studio reflections from a procedural room (no HDR file to download). */
function setupEnvironment({ gl, scene }: RootState) {
  const pmrem = new THREE.PMREMGenerator(gl);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  scene.environmentIntensity = 0.42;
  room.dispose();
  pmrem.dispose();
}

export default function KigumiScene({ active, quality, eventSource, onReady, onOpen, onSettle, onStrike }: KigumiSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.35]}
      camera={{ position: [0, 0, 12], fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true, stencil: false }}
      onCreated={setupEnvironment}
      style={{ position: "absolute", inset: 0 }}
    >
      <directionalLight position={[-5, 6, 7]} intensity={2.2} color="#fff4e8" />
      <directionalLight position={[6, 2.5, -4]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[3, -4, -6]} intensity={7} color="#28427b" />
      <pointLight position={[0, -4, 4]} intensity={6} distance={14} color="#ffd9bd" />
      <Sculpture quality={quality} eventSource={eventSource} onReady={onReady} onOpen={onOpen} onSettle={onSettle} onStrike={onStrike} />
    </Canvas>
  );
}

"use client";

// Ink mist in dark water: a few thousand silver and warm-ivory motes and a
// handful of wide, faint plumes, drifting on a time uniform. All motion is
// computed on the GPU in the vertex shader; the CPU only eases the mouse
// parallax.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { seeded } from "./random";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform vec2 uSpan;
  attribute float aSize;
  attribute float aSeed;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec3 p = position;
    float t = uTime;
    p.x += t * (0.05 + aSeed * 0.12);
    p.x += sin(t * (0.1 + aSeed * 0.25) + aSeed * 31.0) * 0.5;
    p.y += sin(t * 0.13 + p.x * 0.35 + aSeed * 12.0) * 0.35 + cos(t * 0.07 + aSeed * 7.0) * 0.2;
    p.x = mod(p.x + uSpan.x, 2.0 * uSpan.x) - uSpan.x;
    // Nearer motes move more with the mouse: depth.
    p.xy += uMouse * (0.25 + (p.z + 4.0) * 0.12);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.75 + 0.25 * sin(t * (0.6 + aSeed) + aSeed * 40.0);
    vAlpha = aAlpha * twinkle;
    vColor = aColor;
  }
`;

const fragment = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    if (a < 0.003) discard;
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

function Motes({ count }: { count: number }) {
  const { viewport, gl } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector2());

  const span = useMemo(() => new THREE.Vector2(viewport.width * 0.75, viewport.height * 0.6), [viewport.width, viewport.height]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const rand = seeded(11);
    const plumes = Math.round(count * 0.012);
    const total = count + plumes;
    const pos = new Float32Array(total * 3);
    const size = new Float32Array(total);
    const seed = new Float32Array(total);
    const alpha = new Float32Array(total);
    const color = new Float32Array(total * 3);
    const silver = new THREE.Color("#cfd2d6");
    const ivory = new THREE.Color("#efe4d2");
    const c = new THREE.Color();
    for (let i = 0; i < total; i++) {
      const plume = i >= count;
      pos[i * 3] = (rand() * 2 - 1) * span.x;
      pos[i * 3 + 1] = (rand() * 2 - 1) * span.y * (plume ? 0.6 : 1);
      pos[i * 3 + 2] = plume ? -2 + rand() * 2 : -4 + rand() * 7;
      const r = rand();
      size[i] = plume ? 160 + rand() * 200 : r < 0.9 ? 2.4 + rand() * 4 : 8 + rand() * 16;
      seed[i] = rand();
      alpha[i] = plume ? 0.045 + rand() * 0.04 : r < 0.9 ? 0.45 + rand() * 0.5 : 0.16 + rand() * 0.24;
      c.copy(silver).lerp(ivory, rand());
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return g;
  }, [count, span]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSpan: { value: span },
    }),
    [gl, span],
  );

  useEffect(() => {
    const move = (e: PointerEvent) => {
      target.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!material.current) return;
    mouse.current.lerp(target.current, 0.04);
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uMouse.value.copy(mouse.current).multiplyScalar(0.6);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function InkScene({ active, count }: { active: boolean; count: number }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Motes count={count} />
    </Canvas>
  );
}

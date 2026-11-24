"use client";

import { useEffect, useRef } from "react";

// Coastal mist over dark water: one fragment shader on one triangle, in
// plain WebGL (no three.js, about 2 KB). Two sheets of warped noise drift
// sideways like slow wind along a pale horizon; long glints move on the
// water below; three depths of silver and ivory mineral motes cross the
// frame and part around the cursor. It starts when the section comes
// near, renders only while on screen, and holds one still frame for
// reduced motion.

const VERTEX = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAGMENT = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uMouse; // x, y in 0..1 (y up), z = presence

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime;

  // The cursor parts the mist and the motes a little.
  vec2 dm = p - vec2(uMouse.x * aspect, uMouse.y);
  float near = exp(-dot(dm, dm) * 9.0) * uMouse.z;
  vec2 push = normalize(dm + 1e-4) * near * 0.07;

  // Sumi water, a pale horizon, a breath of sky above it.
  float horizon = 0.36;
  vec3 col = vec3(0.043, 0.043, 0.051);
  float hz = exp(-pow((uv.y - horizon) * 8.0, 2.0));
  col += vec3(0.09, 0.094, 0.104) * hz;
  col += vec3(0.010, 0.011, 0.014) * smoothstep(horizon, 1.0, uv.y);

  // Mist: two sheets of warped noise blown sideways at two speeds, hugging the horizon.
  vec2 q = (p + push) * vec2(1.05, 2.5);
  float warp = fbm(q * 0.55 + vec2(-t * 0.011, -t * 0.005));
  float m1 = fbm(q + vec2(-t * 0.028, 0.0) + warp * 1.25);
  float m2 = fbm(q * 1.85 + vec2(-t * 0.05, t * 0.003) + warp * 0.8);
  float sheet = smoothstep(0.42, 0.96, m1) * 0.8 + smoothstep(0.5, 1.0, m2) * 0.35;
  float band = exp(-pow((uv.y - horizon - 0.08) * 2.2, 2.0));
  col += vec3(0.79, 0.78, 0.75) * sheet * band * 0.25;

  // Water: thin horizontal glints, closer together toward the horizon.
  float below = smoothstep(horizon + 0.005, horizon - 0.32, uv.y);
  float depth = 1.0 / max(horizon - uv.y + 0.035, 0.035);
  float glint = noise(vec2(p.x * 0.35 * depth - t * 0.05, depth * 2.2));
  col += vec3(0.62, 0.64, 0.68) * pow(glint, 5.0) * below * 0.24;

  // Mineral motes: three depths, nearer ones larger and quicker, drifting on the wind.
  for (int L = 0; L < 3; L++) {
    float fl = float(L);
    float scale = 30.0 - fl * 9.0;
    vec2 g = (p + push * (0.6 + fl * 0.5)) * scale;
    g.x -= t * (0.010 + fl * 0.011) * scale;
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash(id + fl * 31.7);
    if (h < 0.87 + fl * 0.03) continue;
    vec2 o = vec2(hash(id + 4.1), hash(id + 8.3)) - 0.5;
    o.y += sin(t * (0.25 + h * 0.35) + h * 40.0) * 0.16;
    float d = length(f - o * 0.6);
    float size = mix(0.03, 0.085, hash(id + 2.7)) * (0.75 + fl * 0.2);
    float a = smoothstep(size, size * 0.15, d);
    float twinkle = 0.6 + 0.4 * sin(t * (0.7 + h * 1.4) + h * 60.0);
    vec3 tint = mix(vec3(0.80, 0.82, 0.86), vec3(0.95, 0.90, 0.82), hash(id + 6.6));
    col += tint * a * twinkle * (0.3 + fl * 0.2) * (0.15 + 0.85 * band);
  }

  vec2 v = uv - 0.5;
  col *= 1.0 - dot(v, v) * 0.7;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 128.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function MistField({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl: WebGLRenderingContext | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let raf = 0;
    let visible = false;
    let last = performance.now();
    let clock = 20; // start mid-drift, never on an empty frame
    const mouse = { x: 0.5, y: 0.5, on: 0, tx: 0.5, ty: 0.5, ton: 0 };

    const setup = (): boolean => {
      gl = el.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
      if (!gl) return false;
      const shader = (type: number, source: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, source);
        gl!.compileShader(s);
        return s;
      };
      const program = gl.createProgram()!;
      gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      uRes = gl.getUniformLocation(program, "uRes");
      uTime = gl.getUniformLocation(program, "uTime");
      uMouse = gl.getUniformLocation(program, "uMouse");
      return true;
    };

    const size = () => {
      if (!gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.25);
      el.width = Math.max(1, Math.round(el.clientWidth * dpr));
      el.height = Math.max(1, Math.round(el.clientHeight * dpr));
      gl.viewport(0, 0, el.width, el.height);
    };

    const draw = () => {
      if (!gl) return;
      gl.uniform2f(uRes, el.width, el.height);
      gl.uniform1f(uTime, clock);
      gl.uniform3f(uMouse, mouse.x, mouse.y, mouse.on);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += dt;
      const k = 1 - Math.exp(-dt * 2.5);
      mouse.x += (mouse.tx - mouse.x) * k;
      mouse.y += (mouse.ty - mouse.y) * k;
      mouse.on += (mouse.ton - mouse.on) * k;
      draw();
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (!gl && !setup()) return;
      size();
      draw();
      el.style.opacity = "1";
      if (still || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: "120px" },
    );
    near.observe(el);

    const resize = new ResizeObserver(() => {
      size();
      draw();
    });
    resize.observe(el);

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      mouse.ton = inside ? 1 : 0;
      if (inside) {
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1 - (e.clientY - r.top) / r.height;
      }
    };
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      near.disconnect();
      resize.disconnect();
      window.removeEventListener("pointermove", move);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {/* Without WebGL: a still mist on the horizon. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 30% at 50% 62%, rgb(207 208 212 / 0.07), transparent 70%), linear-gradient(180deg, #0d0d10 0%, #0b0b0d 100%)",
        }}
      />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000" />
    </div>
  );
}

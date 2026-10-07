"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface LiquidEtherProps {
  BFECC?: boolean;
  autoDemo?: boolean;
  autoIntensity?: number;
  autoRampDuration?: number;
  autoResumeDelay?: number;
  autoSpeed?: number;
  className?: string;
  color0?: string;
  color1?: string;
  color2?: string;
  colors?: string[];
  cursorSize?: number;
  dt?: number;
  isBounce?: boolean;
  isViscous?: boolean;
  iterationsPoisson?: number;
  iterationsViscous?: number;
  mouseForce?: number;
  resolution?: number;
  style?: React.CSSProperties;
  takeoverDuration?: number;
  viscous?: number;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uMouseForce;
uniform float uCursorSize;
uniform float uViscosity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 centered = (uv - 0.5) * aspect;
  vec2 mouse = uMouse * aspect;

  float dist = length(centered - mouse);
  float influence = exp(-dist * uCursorSize) * uMouseForce * 0.02;

  vec2 warp = vec2(
    fbm(centered * 2.6 + vec2(0.0, uTime * 0.12)),
    fbm(centered * 2.6 + vec2(3.4, -uTime * 0.11))
  );

  centered += (warp - 0.5) * (0.26 + uViscosity * 0.002);
  centered += normalize(centered - mouse + 0.0001) * influence;

  float n1 = fbm(centered * 3.0 + vec2(uTime * 0.08, -uTime * 0.05));
  float n2 = fbm(centered * 4.6 - vec2(uTime * 0.04, uTime * 0.07));
  float flow = smoothstep(0.12, 0.92, mix(n1, n2, 0.55));

  vec3 color = mix(uColorA, uColorB, smoothstep(0.1, 0.75, flow));
  color = mix(color, uColorC, smoothstep(0.45, 1.0, n2));

  float glow = exp(-dist * 3.8) * 0.18;
  color += glow * vec3(0.65, 0.25, 0.85);
  color += (n1 - 0.5) * 0.04;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function LiquidEther({
  autoDemo = true,
  autoIntensity = 2.2,
  autoResumeDelay = 3000,
  autoSpeed = 0.5,
  className = "",
  color0,
  color1,
  color2,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  cursorSize = 100,
  mouseForce = 20,
  style = {},
  viscous = 30,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const palette = [color0, color1, color2].filter(Boolean) as string[];
    const finalColors = palette.length === 3 ? palette : colors;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uColorA: { value: new THREE.Color(finalColors[0] || "#5227FF") },
      uColorB: { value: new THREE.Color(finalColors[1] || "#FF9FFC") },
      uColorC: { value: new THREE.Color(finalColors[2] || "#B19EEF") },
      uCursorSize: { value: cursorSize * 0.06 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseForce: { value: mouseForce },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uViscosity: { value: viscous },
    };

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      transparent: true,
      uniforms,
      vertexShader,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const mouse = new THREE.Vector2(0, 0);
    const smoothMouse = new THREE.Vector2(0, 0);
    const autoMouse = new THREE.Vector2(0, 0);
    let lastUserInput = performance.now();
    let frameId = 0;

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      uniforms.uResolution.value.set(rect.width, rect.height);
    };

    const setMouseFromEvent = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      mouse.set((clientX - rect.left) / rect.width - 0.5, -((clientY - rect.top) / rect.height - 0.5));
      lastUserInput = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => setMouseFromEvent(event.clientX, event.clientY);
    const onPointerLeave = () => mouse.set(0, 0);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);
    resize();

    const animate = (time: number) => {
      frameId = window.requestAnimationFrame(animate);

      if (autoDemo && performance.now() - lastUserInput > autoResumeDelay) {
        autoMouse.set(
          Math.sin(time * 0.00022 * autoSpeed) * 0.24,
          Math.cos(time * 0.00018 * autoSpeed) * 0.16,
        );
        mouse.lerp(autoMouse, 0.04 * autoIntensity * 0.35);
      }

      smoothMouse.lerp(mouse, 0.08);
      uniforms.uMouse.value.copy(smoothMouse);
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [autoDemo, autoIntensity, autoResumeDelay, autoSpeed, color0, color1, color2, colors, cursorSize, mouseForce, viscous]);

  return <div ref={mountRef} className={`h-full w-full ${className}`} style={style} />;
}

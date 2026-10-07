import { BloomEffect, ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uMouse;
uniform float uFade;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform float uGridScale;
uniform float uNoise;
uniform float uBloomOpacity;
varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    vec2 m = (2.0 * uMouse - iResolution.xy) / iResolution.y;
    
    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    // Tilt for floor/ceiling effect
    float uTilt = 0.0;
    float cR = cos(uTilt), sR = sin(uTilt);
    rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

    vec3 color = vec3(0.0);
    float minT = 1e20;
    float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 1.0;

    vec2 gridUV = vec2(0.0);
    bool hitFound = false;

    // Render floor and ceiling (isY = 1.0)
    for (int i = 0; i < 2; i++)
    {
        float pos = mix(-0.2, 0.2, float(i));
        float t = pos / rd.y;
        if (t > 0.0 && t < minT) {
            vec3 h = ro + rd * t;
            gridUV = h.xz / gridScale;
            minT = t;
            hitFound = true;
        }
    }

    if (!hitFound) {
       fragColor = vec4(0.0, 0.0, 0.0, 0.0);
       return;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

    float fx = fract(gridUV.x);
    float fy = fract(gridUV.y);
    float ax = min(fx, 1.0 - fx);
    float ay = min(fy, 1.0 - fy);
    float wx = fwidth(gridUV.x);
    float wy = fwidth(gridUV.y);
    float halfPx = max(0.0, uLineThickness) * 0.5;

    float lineX = 1.0 - smoothstep(halfPx * wx, halfPx * wx + wx, ax);
    float lineY = 1.0 - smoothstep(halfPx * wy, halfPx * wy + wy, ay);
    float lineVis = max(lineX, lineY);

    float fade = exp(-dist * fadeStrength);
    
    // Mouse interaction glow (refined subtle spotlight)
    float mouseGlow = 0.0;
    if (uMouse.x > -100.0 && uFade > 0.01) {
        float dToMouse = length(p - m);
        float core = exp(-dToMouse * 12.0) * 0.22;
        float soft = exp(-dToMouse * 4.0) * 0.08;
        mouseGlow = (core + soft) * uFade;
    }
    
    vec3 gridCol = uLinesColor * lineVis * fade * uFade;
    vec3 finalGlow = uLinesColor * mouseGlow * fade;
    color = gridCol + finalGlow;

    float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
    color += (n - 0.5) * uNoise;
    color = clamp(color, 0.0, 1.0);
    
    float alpha = clamp(lineVis + mouseGlow, 0.0, 1.0) * fade * uFade;
    // Softened brightness for a more subtle presence
    vec3 finalColor = color * 1.3; 
    fragColor = vec4(finalColor, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

interface GridScanProps {
  lineThickness?: number;
  linesColor?: string;
  gridScale?: number;
  enablePost?: boolean;
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomSmoothing?: number;
  chromaticAberration?: number;
  noiseIntensity?: number;
  fade?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GridScan: React.FC<GridScanProps> = ({
  lineThickness = 1,
  linesColor = '#4A268A',
  gridScale = 0.1,
  fade = 1.0,
  enablePost = true,
  bloomIntensity = 0.4,
  bloomThreshold = 0.2,
  bloomSmoothing = 0,
  chromaticAberration = 0.002,
  noiseIntensity = 0.005,
  className,
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      powerPreference: "high-performance"
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const uniforms = {
      iResolution: {
        value: new THREE.Vector3(container.clientWidth, container.clientHeight, renderer.getPixelRatio())
      },
      iTime: { value: 0 },
      uMouse: { value: mouseRef.current },
      uFade: { value: fade },
      uLineThickness: { value: lineThickness },
      uLinesColor: { value: srgbColor(linesColor) },
      uGridScale: { value: gridScale },
      uNoise: { value: noiseIntensity },
      uBloomOpacity: { value: bloomIntensity }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    if (enablePost) {
      const composer = new EffectComposer(renderer);
      composerRef.current = composer;
      composer.addPass(new RenderPass(scene, camera));

      const bloom = new BloomEffect({
        intensity: bloomIntensity,
        luminanceThreshold: bloomThreshold,
        luminanceSmoothing: bloomSmoothing
      });
      
      const chroma = new ChromaticAberrationEffect({
        offset: new THREE.Vector2(chromaticAberration, chromaticAberration),
        radialModulation: true,
        modulationOffset: 0.5
      });

      const effectPass = new EffectPass(camera, bloom, chroma);
      effectPass.renderToScreen = true;
      composer.addPass(effectPass);
    }

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      material.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, renderer.getPixelRatio());
      if (composerRef.current) composerRef.current.setSize(container.clientWidth, container.clientHeight);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      mouseRef.current.set(x, y);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    const tick = (time: number) => {
      material.uniforms.iTime.value = time / 1000;
      material.uniforms.uFade.value = fade;
      material.uniforms.uMouse.value.copy(mouseRef.current);
      if (composerRef.current) {
        composerRef.current.render();
      } else {
        renderer.render(scene, camera);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [
    lineThickness,
    linesColor,
    gridScale,
    fade,
    enablePost,
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    chromaticAberration,
    noiseIntensity
  ]);

  return <div ref={containerRef} className={`w-full h-full ${className ?? ''}`} style={style} />;
};

function srgbColor(hex: string) {
  return new THREE.Color(hex);
}

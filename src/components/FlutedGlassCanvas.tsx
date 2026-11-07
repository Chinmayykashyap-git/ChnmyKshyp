'use client';

import React, { useEffect, useRef } from 'react';

interface FlutedGlassCanvasProps {
  theme: 'dark' | 'light';
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_scroll;
  uniform float u_lightMode;

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);

    // Subtle vertical glass ribs (approx 56 across desktop, 28 on mobile)
    float fluteCount = clamp(floor(u_resolution.x / 24.0), 24.0, 72.0);

    // Gentle cursor & scroll refraction
    float distToMouse = length((uv - u_mouse) * vec2(aspect, 1.0));
    float mouseInfluence = exp(-distToMouse * 3.4);

    float waveShift = sin(uv.y * 2.8 + u_time * 0.22 - u_scroll * 1.4) * 0.005
                    + (uv.x - u_mouse.x) * mouseInfluence * 0.024;

    float xCoord = (uv.x + waveShift) * fluteCount;
    float flutePhase = fract(xCoord);

    // Cylindrical glass normal across each rib
    float ribNormal = (flutePhase - 0.5) * 2.0;
    float cylinderCurve = sqrt(max(0.0, 1.0 - ribNormal * ribNormal * 0.85));

    // Specular edge and hairline seam
    float specularRidge = pow(max(0.0, 1.0 - abs(flutePhase - 0.34) * 2.5), 3.4);
    float seamShadow = smoothstep(0.0, 0.08, flutePhase) * smoothstep(1.0, 0.92, flutePhase);

    // Atmospheric periwinkle lighting
    vec2 bloomCenter1 = vec2(0.47 + (u_mouse.x - 0.5) * 0.10, 0.46 + (u_mouse.y - 0.5) * 0.08);
    vec2 bloomCenter2 = vec2(0.22, 0.28);
    float bloom1 = exp(-length((uv - bloomCenter1) * vec2(aspect * 0.72, 1.2)) * 1.75);
    float bloom2 = exp(-length((uv - bloomCenter2) * vec2(aspect * 0.85, 1.3)) * 2.2);

    // Dark Mode Palette (Deep Navy -> Slate Periwinkle -> Specular Ice)
    vec3 darkAbyss = vec3(0.024, 0.043, 0.102);      // #060B1A
    vec3 darkMid = vec3(0.105, 0.165, 0.310);        // #1B2A4F
    vec3 darkPeriwinkle = vec3(0.415, 0.515, 0.715); // #6A83B6
    vec3 darkHighlight = vec3(0.640, 0.740, 0.940);  // #A3BCF0

    vec3 darkColor = mix(darkAbyss, darkMid, clamp(uv.y * 0.65 + bloom2 * 0.6, 0.0, 1.0));
    darkColor = mix(darkColor, darkPeriwinkle, bloom1 * (0.52 + 0.32 * cylinderCurve));
    darkColor += darkHighlight * specularRidge * (0.09 + 0.14 * bloom1 + 0.08 * mouseInfluence);
    darkColor *= (0.80 + 0.20 * seamShadow);

    float vignette = smoothstep(0.0, 0.18, uv.y) * (0.84 + 0.16 * smoothstep(1.0, 0.65, uv.y));
    darkColor *= mix(0.78, 1.0, vignette);

    // Light Mode Palette (Alabaster Ice -> Soft Periwinkle -> Crisp Ribs)
    vec3 lightBase = vec3(0.953, 0.965, 0.992);      // #F3F6FD
    vec3 lightMid = vec3(0.875, 0.910, 0.980);       // #DFE8FA
    vec3 lightPeriwinkle = vec3(0.765, 0.825, 0.960);// #C3D2F5
    vec3 lightRidge = vec3(1.0, 1.0, 1.0);

    vec3 lightColor = mix(lightBase, lightMid, clamp((1.0 - uv.y) * 0.55 + bloom2 * 0.45, 0.0, 1.0));
    lightColor = mix(lightColor, lightPeriwinkle, bloom1 * (0.40 + 0.22 * cylinderCurve));
    lightColor = mix(lightColor, lightRidge, specularRidge * 0.50);
    lightColor -= vec3(0.08, 0.11, 0.20) * (1.0 - seamShadow) * 0.28;

    vec3 finalColor = mix(darkColor, lightColor, u_lightMode);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function FlutedGlassCanvas({ theme }: FlutedGlassCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect constrained mobile devices or reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    const isConstrainedDevice = reducedMotion || (coarsePointer && lowCores);

    const gl = (canvas.getContext('webgl', { antialias: false, depth: false, stencil: false }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');
    const uLightMode = gl.getUniformLocation(program, 'u_lightMode');

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isConstrainedDevice ? 1.0 : 1.5);
      width = Math.floor(window.innerWidth * dpr);
      height = Math.floor(window.innerHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let targetScroll = 0;
    let currentScroll = 0;
    let currentLight = themeRef.current === 'light' ? 1 : 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / Math.max(window.innerWidth, 1);
      targetMouseY = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };
    const onScroll = () => {
      targetScroll = window.scrollY / Math.max(window.innerHeight, 1);
    };

    if (!isConstrainedDevice) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    let rafId = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = isConstrainedDevice ? 1.2 : (now - startTime) * 0.001;

      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;
      currentScroll += (targetScroll - currentScroll) * 0.08;
      const targetLight = themeRef.current === 'light' ? 1 : 0;
      currentLight += (targetLight - currentLight) * 0.14;

      gl.uniform2f(uRes, width, height);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uScroll, isConstrainedDevice ? 0 : currentScroll);
      gl.uniform1f(uLightMode, currentLight);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!isConstrainedDevice || Math.abs(targetLight - currentLight) > 0.01) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [theme]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="fluted-css-fallback absolute inset-0" />
      <canvas ref={canvasRef} className="h-full w-full opacity-95 transition-opacity duration-500" />
    </div>
  );
}

"use client";

import React, { useRef, useEffect } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TorusKnotGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Keep the per-frame CPU cost low enough to stay under the 50ms long-task threshold.
    const particleCount = isMobile ? 4000 : 9000;

    const getIsDark = () => document.documentElement.classList.contains("dark");

    // Scene & Camera
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      72,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.8;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL support: keep the CSS-only hero.
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.25));
    container.appendChild(renderer.domElement);

    // Software WebGL (headless Chrome / Lighthouse / VMs) renders this on the CPU and
    // cannot sustain animation. Show a single static frame instead of blocking the main thread.
    let isSoftwareRenderer = false;
    try {
      const gl = renderer.getContext();
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const rendererName = debugInfo
        ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
        : "";
      isSoftwareRenderer = /swiftshader|llvmpipe|software|basic render/i.test(rendererName);
    } catch {
      /* ignore */
    }
    const animateEnabled = !prefersReducedMotion && !isSoftwareRenderer;

    // Geometry buffers
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const geometry = new BufferGeometry();
    const knot = new TorusKnotGeometry(1.65, 0.52, 200, 32);
    const knotPositions = knot.attributes.position;
    const scratchColor = new Color();

    const positionAttribute = new BufferAttribute(positions, 3);
    const colorAttribute = new BufferAttribute(colors, 3);
    geometry.setAttribute("position", positionAttribute);
    geometry.setAttribute("color", colorAttribute);

    const updateColors = (isDark: boolean) => {
      const lightness = isDark ? 0.62 : 0.44;
      for (let i = 0; i < particleCount; i++) {
        scratchColor.setHSL(0.68 + Math.random() * 0.16, 0.85, lightness);
        colors[i * 3] = scratchColor.r;
        colors[i * 3 + 1] = scratchColor.g;
        colors[i * 3 + 2] = scratchColor.b;
      }
      colorAttribute.needsUpdate = true;
    };

    for (let i = 0; i < particleCount; i++) {
      const idx = i % knotPositions.count;
      const spread = 0.12;
      const x = knotPositions.getX(idx) + (Math.random() - 0.5) * spread;
      const y = knotPositions.getY(idx) + (Math.random() - 0.5) * spread;
      const z = knotPositions.getZ(idx) + (Math.random() - 0.5) * spread;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    let isDark = getIsDark();
    updateColors(isDark);

    const material = new PointsMaterial({
      size: isMobile ? 0.024 : 0.021,
      vertexColors: true,
      blending: NormalBlending,
      transparent: true,
      opacity: isDark ? 0.75 : 0.52,
    });

    const particles = new Points(geometry, material);
    scene.add(particles);

    const applyRotation = (elapsed: number) => {
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.06;
      particles.rotation.z = Math.cos(elapsed * 0.02) * 0.04;
    };

    const renderStaticFrame = () => {
      particles.rotation.set(0.12, 0.35, 0.04);
      renderer.render(scene, camera);
    };

    // Theme observer
    const themeObserver = new MutationObserver(() => {
      isDark = getIsDark();
      material.opacity = isDark ? 0.75 : 0.52;
      material.needsUpdate = true;
      updateColors(isDark);
      if (!animateEnabled) renderStaticFrame();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Mouse tracking (only meaningful while animating)
    const mouse = { x: -9999, y: -9999 };
    let hasMouseInteraction = false;
    let particlesDisplaced = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hasMouseInteraction = true;
      particlesDisplaced = true;

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        hasMouseInteraction = false;
      }, 1200);
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      hasMouseInteraction = false;
    };

    if (animateEnabled && !isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }

    // Resize handler
    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (!animateEnabled) renderStaticFrame();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Pre-allocated vectors for the physics loop (zero GC allocations)
    const mouseWorld = new Vector3();
    const mouseLocal = new Vector3();
    const currentPos = new Vector3();
    const origPos = new Vector3();
    const velVec = new Vector3();
    const dirVec = new Vector3();
    const springVec = new Vector3();

    let animationFrameId = 0;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };

    const clock = new Clock();
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || !isDocumentVisible) return;

      const now = performance.now();
      if (now - lastFrameTime < frameInterval) return;
      lastFrameTime = now;

      applyRotation(clock.getElapsedTime());

      // Physics repel + elastic return, only while particles are displaced.
      if (particlesDisplaced) {
        const vFov = (camera.fov * Math.PI) / 180;
        const planeHalfHeight = Math.tan(vFov / 2) * camera.position.z;
        const planeHalfWidth = planeHalfHeight * camera.aspect;

        mouseWorld.set(mouse.x * planeHalfWidth, mouse.y * planeHalfHeight, 0);
        mouseLocal.copy(mouseWorld);
        particles.worldToLocal(mouseLocal);

        const repelRadius = 1.6;
        let totalMovement = 0;

        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          currentPos.set(positions[ix], positions[iy], positions[iz]);
          origPos.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
          velVec.set(velocities[ix], velocities[iy], velocities[iz]);

          const dist = currentPos.distanceTo(mouseLocal);

          if (hasMouseInteraction && dist < repelRadius) {
            const force = (repelRadius - dist) * 0.018;
            dirVec.subVectors(currentPos, mouseLocal).normalize();
            velVec.add(dirVec.multiplyScalar(force));
          }

          springVec.subVectors(origPos, currentPos).multiplyScalar(0.0035);
          velVec.add(springVec);
          velVec.multiplyScalar(0.92);

          positions[ix] += velVec.x;
          positions[iy] += velVec.y;
          positions[iz] += velVec.z;

          velocities[ix] = velVec.x;
          velocities[iy] = velVec.y;
          velocities[iz] = velVec.z;

          totalMovement += Math.abs(velVec.x) + Math.abs(velVec.y) + Math.abs(velVec.z);
        }

        positionAttribute.needsUpdate = true;

        if (!hasMouseInteraction && totalMovement < 0.005) {
          particlesDisplaced = false;
        }
      }

      renderer.render(scene, camera);
    };

    if (animateEnabled) {
      document.addEventListener("visibilitychange", onVisibilityChange);
      animate();
    } else {
      renderStaticFrame();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      knot.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
}

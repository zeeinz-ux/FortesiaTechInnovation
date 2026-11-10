"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    // Dense particle count matching the wide scope around the hero headline
    const particleCount = isMobile ? 10000 : 22000;

    const getIsDark = () => document.documentElement.classList.contains("dark");

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      72,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.8;

    // WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5));
    container.appendChild(renderer.domElement);

    const mouse = { x: -9999, y: -9999 };
    let hasMouseInteraction = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const clock = new THREE.Clock();

    // Geometry: Expanded TorusKnot matching the wide scope from user
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const knot = new THREE.TorusKnotGeometry(1.65, 0.52, 200, 32);
    const knotPositions = knot.attributes.position;
    const scratchColor = new THREE.Color();

    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    const colorAttribute = new THREE.BufferAttribute(colors, 3);
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

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    let isDark = getIsDark();
    updateColors(isDark);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.024 : 0.021,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: isDark ? 0.75 : 0.52,
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.set(0, 0, 0);
    scene.add(particles);

    // Theme observer
    const themeObserver = new MutationObserver(() => {
      isDark = getIsDark();
      material.opacity = isDark ? 0.75 : 0.52;
      material.needsUpdate = true;
      updateColors(isDark);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Mouse tracking across window
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hasMouseInteraction = true;

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        hasMouseInteraction = false;
      }, 1500);
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      hasMouseInteraction = false;
    };

    if (!isMobile) {
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
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Pre-allocated vectors for physics loop (zero GC allocations)
    const mouseWorld = new THREE.Vector3();
    const mouseLocal = new THREE.Vector3();
    const currentPos = new THREE.Vector3();
    const origPos = new THREE.Vector3();
    const velVec = new THREE.Vector3();
    const dirVec = new THREE.Vector3();
    const springVec = new THREE.Vector3();

    let animationFrameId = 0;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let particlesDisplaced = false;

    // Continuous smooth animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || !isDocumentVisible) return;

      const elapsed = clock.getElapsedTime();

      // Continuous majestic rotation
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.06;
      particles.rotation.z = Math.cos(elapsed * 0.02) * 0.04;
      particles.updateMatrixWorld();

      // Cursor repel physics on desktop
      if (!isMobile && (hasMouseInteraction || particlesDisplaced)) {
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

          // Particles push AWAY when cursor gets close
          if (hasMouseInteraction && dist < repelRadius) {
            const force = (repelRadius - dist) * 0.018;
            dirVec.subVectors(currentPos, mouseLocal).normalize();
            velVec.add(dirVec.multiplyScalar(force));
          }

          // Spring force pulling back to original geometry
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
        particlesDisplaced = totalMovement > 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

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

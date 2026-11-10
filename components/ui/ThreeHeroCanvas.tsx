"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const isMobile = window.innerWidth < 768;
    // Generous particle count for high density and majestic presence
    const particleCount = isMobile ? 12000 : 34000;

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
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    container.appendChild(renderer.domElement);

    const mouse = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    // Geometry: Expanded TorusKnot matching the wide red circle scope from user
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const knot = new THREE.TorusKnotGeometry(1.65, 0.52, 200, 32);
    const knotPositions = knot.attributes.position;

    const updateColors = (isDark: boolean) => {
      for (let i = 0; i < particleCount; i++) {
        const c = new THREE.Color();
        // Indigo / purple / violet spectrum
        const hue = 0.68 + (Math.random() * 0.16);
        const saturation = 0.85;
        const lightness = isDark ? 0.62 : 0.44;
        c.setHSL(hue, saturation, lightness);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      if (geometry.attributes.color) {
        geometry.attributes.color.needsUpdate = true;
      }
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

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    let isDark = getIsDark();
    updateColors(isDark);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.024 : 0.019,
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
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;
    };
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Pre-allocated vectors for 60 FPS physics loop (zero GC allocations)
    const mouseWorld = new THREE.Vector3();
    const mouseLocal = new THREE.Vector3();
    const currentPos = new THREE.Vector3();
    const origPos = new THREE.Vector3();
    const velVec = new THREE.Vector3();
    const dirVec = new THREE.Vector3();
    const springVec = new THREE.Vector3();

    let animationFrameId: number;
    let isVisible = true;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Continuous majestic rotation
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.06;
      particles.rotation.z = Math.cos(elapsed * 0.02) * 0.04;
      particles.updateMatrixWorld();

      if (!isMobile) {
        // Map 2D mouse coordinates to 3D world plane at z=0
        const vFov = (camera.fov * Math.PI) / 180;
        const planeHalfHeight = Math.tan(vFov / 2) * camera.position.z;
        const planeHalfWidth = planeHalfHeight * camera.aspect;

        mouseWorld.set(mouse.x * planeHalfWidth, mouse.y * planeHalfHeight, 0);

        // Transform mouse coordinate into local particle space
        mouseLocal.copy(mouseWorld);
        particles.worldToLocal(mouseLocal);

        // Physics Repel + Elastic Return
        const repelRadius = 1.6;
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          currentPos.set(positions[ix], positions[iy], positions[iz]);
          origPos.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
          velVec.set(velocities[ix], velocities[iy], velocities[iz]);

          const dist = currentPos.distanceTo(mouseLocal);

          // Cursor Repel: particles push AWAY when cursor gets close
          if (dist < repelRadius) {
            const force = (repelRadius - dist) * 0.016;
            dirVec.subVectors(currentPos, mouseLocal).normalize();
            velVec.add(dirVec.multiplyScalar(force));
          }

          // Spring force pulling back to original geometry
          springVec.subVectors(origPos, currentPos).multiplyScalar(0.002);
          velVec.add(springVec);

          // Friction damping
          velVec.multiplyScalar(0.94);

          positions[ix] += velVec.x;
          positions[iy] += velVec.y;
          positions[iz] += velVec.z;

          velocities[ix] = velVec.x;
          velocities[iy] = velVec.y;
          velocities[iz] = velVec.z;
        }

        if (geometry.attributes.position) {
          geometry.attributes.position.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
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

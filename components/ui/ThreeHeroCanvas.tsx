"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const isMobile = window.innerWidth < 768;
    // Balanced particle count matching Zeinz Woven Light Hero
    const particleCount = isMobile ? 12000 : 36000;

    const getIsDark = () => document.documentElement.classList.contains("dark");

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.0;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    container.appendChild(renderer.domElement);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const clock = new THREE.Clock();

    // Geometry: Balanced TorusKnot matching Zeinz Woven Light Hero
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const knot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const knotPositions = knot.attributes.position;

    const updateColors = (isDark: boolean) => {
      for (let i = 0; i < particleCount; i++) {
        const c = new THREE.Color();
        // Indigo / purple / violet spectrum matching Zeinz aesthetic
        const hue = 0.68 + (Math.random() * 0.16);
        const saturation = 0.85;
        const lightness = isDark ? 0.60 : 0.42;
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
      const spread = 0.1;
      const x = knotPositions.getX(idx) + (Math.random() - 0.5) * spread;
      const y = knotPositions.getY(idx) + (Math.random() - 0.5) * spread;
      const z = knotPositions.getZ(idx) + (Math.random() - 0.5) * spread;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    let isDark = getIsDark();
    updateColors(isDark);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.024 : 0.02,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: isDark ? 0.72 : 0.50,
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.set(0, 0, 0);
    scene.add(particles);

    // Theme observer
    const themeObserver = new MutationObserver(() => {
      isDark = getIsDark();
      material.opacity = isDark ? 0.68 : 0.48;
      material.needsUpdate = true;
      updateColors(isDark);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

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

    // Optimized animation loop
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

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      particles.rotation.x = elapsed * 0.04 + mouse.y * 0.18;
      particles.rotation.y = elapsed * 0.06 + mouse.x * 0.22;
      particles.rotation.z = Math.sin(elapsed * 0.03) * 0.05;

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

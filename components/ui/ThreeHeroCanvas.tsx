"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8000 : 26000;

    const getIsDark = () => document.documentElement.classList.contains("dark");

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    container.appendChild(renderer.domElement);

    // Mouse coordinates (normalized -1 to 1)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const clock = new THREE.Clock();

    // Geometry: TorusKnot particle cloud
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const knot = new THREE.TorusKnotGeometry(1.6, 0.45, 160, 28);
    const knotPositions = knot.attributes.position;

    const updateColors = (isDark: boolean) => {
      for (let i = 0; i < particleCount; i++) {
        const c = new THREE.Color();
        // Indigo / purple / cyan color spectrum
        const hue = 0.65 + (Math.random() * 0.18); // range ~0.65 (indigo/blue) to 0.83 (purple)
        const saturation = 0.88;
        const lightness = isDark ? 0.6 : 0.42; // Darker & more saturated on light mode so clearly visible
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
      const x = knotPositions.getX(idx) + (Math.random() - 0.5) * 0.12;
      const y = knotPositions.getY(idx) + (Math.random() - 0.5) * 0.12;
      const z = knotPositions.getZ(idx) + (Math.random() - 0.5) * 0.12;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    let isDark = getIsDark();
    updateColors(isDark);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.022 : 0.018,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: isDark ? 0.75 : 0.55,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Theme mutation observer
    const themeObserver = new MutationObserver(() => {
      isDark = getIsDark();
      material.opacity = isDark ? 0.75 : 0.55;
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

    // Animation loop with visibility optimization
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

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate torus
      particles.rotation.x = elapsed * 0.15 + mouse.y * 0.3;
      particles.rotation.y = elapsed * 0.2 + mouse.x * 0.3;
      particles.rotation.z = Math.sin(elapsed * 0.1) * 0.1;

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

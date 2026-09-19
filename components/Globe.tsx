"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopped = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const globe = new THREE.Group();
    scene.add(globe);

    const R = 2.3;
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.985, 48, 48),
      new THREE.MeshPhongMaterial({
        color: 0x102b4f,
        shininess: 18,
        specular: 0x2a4a7a,
        transparent: true,
        opacity: 0.96,
      })
    );
    globe.add(core);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(R, 36, 24),
      new THREE.MeshBasicMaterial({ color: 0xb8873b, wireframe: true, transparent: true, opacity: 0.32 })
    );
    globe.add(wire);

    const dotGeo = new THREE.BufferGeometry();
    const N = 1600;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963;
      pos[i * 3] = Math.cos(theta) * r * R * 1.004;
      pos[i * 3 + 1] = y * R * 1.004;
      pos[i * 3 + 2] = Math.sin(theta) * r * R * 1.004;
    }
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    globe.add(
      new THREE.Points(
        dotGeo,
        new THREE.PointsMaterial({ color: 0xd4a857, size: 0.035, transparent: true, opacity: 0.85 })
      )
    );

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(R * 1.32, 0.012, 8, 128),
      new THREE.MeshBasicMaterial({ color: 0xd4a857, transparent: true, opacity: 0.55 })
    );
    ring.rotation.set(Math.PI / 2.35, 0.25, 0);
    scene.add(ring);

    const orbiter = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    scene.add(orbiter);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffe6b8, 1.1);
    key.position.set(-4, 3, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x6fa8ff, 0.5);
    rim.position.set(4, -2, -3);
    scene.add(rim);

    globe.rotation.z = 0.22;

    const resize = () => {
      const w = el.clientWidth || 400;
      const h = el.clientHeight || 400;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const tick = () => {
      if (stopped) {
        renderer.dispose();
        return;
      }
      const t = performance.now() * 0.001;
      globe.rotation.y += 0.0022;
      ring.rotation.z = t * 0.12;
      orbiter.position.set(
        Math.cos(t * 0.55) * R * 1.32,
        Math.sin(t * 0.55) * R * 1.32 * 0.42,
        Math.sin(t * 0.55) * R * 0.6
      );
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      stopped = true;
      ro.disconnect();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}

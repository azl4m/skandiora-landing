"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // The static globe remains visible when WebGL is unavailable.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 600ms";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.z = 7.8;
    const globe = new THREE.Group();
    globe.rotation.set(0.08, -1.3, -0.13);
    scene.add(globe);
    const radius = 2;
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 22, specular: 0x365d87 });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(radius, 80, 48), material));

    // A sparse triangular shell adds the connected-world detail from the reference.
    const networkGeometry = new THREE.IcosahedronGeometry(radius * 1.008, 3);
    const wireGeometry = new THREE.WireframeGeometry(networkGeometry);
    globe.add(new THREE.LineSegments(wireGeometry, new THREE.LineBasicMaterial({ color: 0x7397b8, transparent: true, opacity: 0.13 })));
    const nodes = new THREE.IcosahedronGeometry(radius * 1.012, 2);
    globe.add(new THREE.Points(nodes, new THREE.PointsMaterial({ color: 0xd4a857, size: 0.025, transparent: true, opacity: 0.8 })));
    networkGeometry.dispose();

    // The wordmark follows a real 3D orbit, passing behind the opaque globe.
    const orbit = new THREE.Group();
    orbit.rotation.set(0.18, 0, -0.18);
    scene.add(orbit);
    const orbitRadius = 2.48;
    const orbitLine = new THREE.Mesh(
      new THREE.TorusGeometry(orbitRadius, 0.007, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0xd4a857, transparent: true, opacity: 0.24 }),
    );
    orbitLine.rotation.x = Math.PI / 2;
    orbitLine.position.y = -0.3;
    orbit.add(orbitLine);

    const wordmarkCanvas = document.createElement("canvas");
    wordmarkCanvas.width = 2048;
    wordmarkCanvas.height = 256;
    const context = wordmarkCanvas.getContext("2d");
    let wordmarkTexture: THREE.CanvasTexture | undefined;
    const wordmark = new THREE.Group();
    orbit.add(wordmark);
    if (context) {
      context.font = "500 144px Arial, sans-serif";
      context.textBaseline = "middle";
      context.fillStyle = "#c49a50";
      const letters = Array.from("SKANDIORA");
      const spacing = 30;
      const widths = letters.map((letter) => context.measureText(letter).width);
      const totalWidth = widths.reduce((sum, width) => sum + width, 0) + spacing * (letters.length - 1);
      let x = (wordmarkCanvas.width - totalWidth) / 2;
      letters.forEach((letter, index) => {
        context.fillText(letter, x, wordmarkCanvas.height / 2);
        x += widths[index] + spacing;
      });
      wordmarkTexture = new THREE.CanvasTexture(wordmarkCanvas);
      wordmarkTexture.colorSpace = THREE.SRGBColorSpace;
      wordmarkTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
      wordmark.add(new THREE.Mesh(
        new THREE.CylinderGeometry(orbitRadius, orbitRadius, 0.3, 64, 1, true, -0.75, 1.5),
        new THREE.MeshBasicMaterial({ map: wordmarkTexture, transparent: true, alphaTest: 0.03, depthWrite: false, toneMapped: false }),
      ));
    }

    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.025, 64, 40), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { glowColor: { value: new THREE.Color(0x487bb5) } },
      vertexShader: `varying vec3 vNormal; varying vec3 vView;
        void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-p.xyz); gl_Position = projectionMatrix * p; }`,
      fragmentShader: `uniform vec3 glowColor; varying vec3 vNormal; varying vec3 vView;
        void main() { float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 4.0); gl_FragColor = vec4(glowColor, rim * 0.18); }`,
    }));
    scene.add(atmosphere);
    scene.add(new THREE.AmbientLight(0xc4d6ee, 1.4));
    const light = new THREE.DirectionalLight(0xffe8bb, 2.3);
    light.position.set(-3, 4, 5);
    scene.add(light);
    const fill = new THREE.DirectionalLight(0x528bda, 1.5);
    fill.position.set(4, 1, -2);
    scene.add(fill);

    let disposed = false;
    let ready = false;
    let visible = true;
    let frame = 0;
    let previousTime = 0;
    let texture: THREE.Texture | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const render = () => renderer.render(scene, camera);
    const tick = (time: number) => {
      frame = 0;
      if (disposed || !ready || !visible || document.hidden || motion.matches) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      globe.rotation.y += delta * 0.36;
      // One wordmark: it glides slowly across the front so it is easy to read, then speeds up
      // while hidden behind the globe, so it returns quickly instead of leaving a long empty gap.
      const facing = (1 - Math.cos(wordmark.rotation.y)) / 2; // 0 in front, 1 directly behind
      wordmark.rotation.y = (wordmark.rotation.y + delta * (0.28 + 1.1 * facing)) % (Math.PI * 2);
      render();
      frame = requestAnimationFrame(tick);
    };
    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      frame = 0;
      if (ready) {
        render();
        if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (ready) render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation(); }, { threshold: 0.05 });
    observer.observe(container);
    motion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);

    new THREE.TextureLoader().load("/earth-map.svg", (loaded) => {
      if (disposed) { loaded.dispose(); return; }
      texture = loaded;
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
      material.map = loaded;
      material.needsUpdate = true;
      ready = true;
      renderer.domElement.style.opacity = "1";
      container.dataset.ready = "true";
      syncAnimation();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      motion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((entry) => entry.dispose());
        }
      });
      texture?.dispose();
      wordmarkTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete container.dataset.ready;
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="group absolute inset-0">
    <div className="absolute inset-[13%] rounded-full bg-[#0B1D35] bg-[url('/earth-map.svg')] bg-cover bg-center shadow-[inset_-35px_-15px_55px_#030811,inset_8px_8px_28px_#d4a85722,0_8px_32px_#49677e15] group-data-[ready=true]:opacity-0 transition-opacity duration-700" />
    <span className="absolute inset-0 flex items-center justify-center font-medium text-[clamp(11px,2.4vw,16px)] tracking-[0.2em] text-[#c49a50] group-data-[ready=true]:opacity-0 transition-opacity duration-700">SKANDIORA</span>
  </div>;
}

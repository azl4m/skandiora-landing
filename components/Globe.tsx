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
    camera.position.z = 7.7;
    const globe = new THREE.Group();
    globe.rotation.set(0.08, -1.3, -0.13);
    scene.add(globe);
    const radius = 2;
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 16, specular: 0x74716a });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(radius, 80, 48), material));

    // A sparse triangular shell adds the connected-world detail from the reference.
    const networkGeometry = new THREE.IcosahedronGeometry(radius * 1.008, 3);
    const wireGeometry = new THREE.WireframeGeometry(networkGeometry);
    globe.add(new THREE.LineSegments(wireGeometry, new THREE.LineBasicMaterial({ color: 0x8d969e, transparent: true, opacity: 0.13 })));
    const nodes = new THREE.IcosahedronGeometry(radius * 1.012, 2);
    globe.add(new THREE.Points(nodes, new THREE.PointsMaterial({ color: 0xd4a857, size: 0.025, transparent: true, opacity: 0.8 })));
    networkGeometry.dispose();

    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.025, 64, 40), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { glowColor: { value: new THREE.Color(0xb8b3a8) } },
      vertexShader: `varying vec3 vNormal; varying vec3 vView;
        void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-p.xyz); gl_Position = projectionMatrix * p; }`,
      fragmentShader: `uniform vec3 glowColor; varying vec3 vNormal; varying vec3 vView;
        void main() { float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 4.0); gl_FragColor = vec4(glowColor, rim * 0.3); }`,
    }));
    scene.add(atmosphere);
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const light = new THREE.DirectionalLight(0xfff5e5, 1.8);
    light.position.set(-3, 4, 5);
    scene.add(light);
    const fill = new THREE.DirectionalLight(0xc7ced4, 0.9);
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
      renderer.dispose();
      renderer.domElement.remove();
      delete container.dataset.ready;
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="group absolute inset-0">
    <div className="absolute inset-[13%] rounded-full bg-[#111820] bg-[url('/earth-map.svg')] bg-cover bg-center shadow-[inset_-35px_-15px_55px_#080c10,inset_8px_8px_28px_#d8d2c422,0_0_30px_#b8b3a818] group-data-[ready=true]:opacity-0 transition-opacity duration-700" />
  </div>;
}

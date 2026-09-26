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
    globe.rotation.set(0.08, -2.75, -0.13); // opens facing India, with the Kochi pin in front
    scene.add(globe);
    const radius = 2;
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 16, specular: 0x2e2616 });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(radius, 80, 48), material));

    // A sparse triangular shell adds the connected-world detail from the reference.
    const networkGeometry = new THREE.IcosahedronGeometry(radius * 1.008, 3);
    const wireGeometry = new THREE.WireframeGeometry(networkGeometry);
    globe.add(new THREE.LineSegments(wireGeometry, new THREE.LineBasicMaterial({ color: 0xd4a857, transparent: true, opacity: 0.09 })));
    const nodes = new THREE.IcosahedronGeometry(radius * 1.012, 2);
    globe.add(new THREE.Points(nodes, new THREE.PointsMaterial({ color: 0xd4a857, size: 0.025, transparent: true, opacity: 0.8 })));
    networkGeometry.dispose();

    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.025, 64, 40), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { glowColor: { value: new THREE.Color(0xd4a857) } },
      vertexShader: `varying vec3 vNormal; varying vec3 vView;
        void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-p.xyz); gl_Position = projectionMatrix * p; }`,
      fragmentShader: `uniform vec3 glowColor; varying vec3 vNormal; varying vec3 vView;
        void main() { float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 4.0); gl_FragColor = vec4(glowColor, rim * 0.16); }`,
    }));
    scene.add(atmosphere);
    scene.add(new THREE.AmbientLight(0xefe6d6, 1.5));
    const light = new THREE.DirectionalLight(0xfff3dc, 1.55);
    light.position.set(-3, 4, 5);
    scene.add(light);
    const fill = new THREE.DirectionalLight(0x4a7cc4, 1.2);
    fill.position.set(4, 1, -2);
    scene.add(fill);

    let disposed = false;
    let ready = false;
    let visible = true;
    let frame = 0;
    let previousTime = 0;
    let texture: THREE.Texture | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Location pins carrying the Skandiora emblem sit on real study destinations and turn with
    // the globe. Each pin is a camera-facing sprite anchored at its tip on the surface.
    const pinSpots = [
      { lat: 9.93, lon: 76.27, size: 0.74 }, // Kochi — home base
      { lat: 51.51, lon: -0.13, size: 0.46 }, // London
      { lat: 43.65, lon: -79.38, size: 0.46 }, // Toronto
      { lat: 37.77, lon: -122.42, size: 0.44 }, // San Francisco
      { lat: -33.87, lon: 151.21, size: 0.46 }, // Sydney
      { lat: -36.85, lon: 174.76, size: 0.4 }, // Auckland
      { lat: 25.2, lon: 55.27, size: 0.44 }, // Dubai
      { lat: 1.35, lon: 103.82, size: 0.44 }, // Singapore
      { lat: 41.72, lon: 44.79, size: 0.42 }, // Tbilisi
    ];
    // Same equirectangular mapping as SphereGeometry's UVs, so pins land on the map texture.
    const toSurface = (lat: number, lon: number, r: number) => {
      const phi = ((lon + 180) * Math.PI) / 180;
      const theta = ((90 - lat) * Math.PI) / 180;
      return new THREE.Vector3(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta));
    };

    const pinCanvas = document.createElement("canvas");
    pinCanvas.width = 256;
    pinCanvas.height = 320;
    const pinTexture = new THREE.CanvasTexture(pinCanvas);
    pinTexture.colorSpace = THREE.SRGBColorSpace;
    pinTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    const drawPin = (logo?: HTMLImageElement) => {
      const g = pinCanvas.getContext("2d");
      if (!g) return;
      const cx = 128, cy = 116, r = 104, tipY = 312;
      const beta = Math.acos(r / (tipY - cy));
      g.clearRect(0, 0, pinCanvas.width, pinCanvas.height);
      g.beginPath();
      g.moveTo(cx, tipY);
      g.arc(cx, cy, r, Math.PI / 2 - beta, Math.PI / 2 + beta, true);
      g.closePath();
      const body = g.createLinearGradient(0, cy - r, 0, tipY);
      body.addColorStop(0, "#2d5f9e");
      body.addColorStop(0.55, "#163766");
      body.addColorStop(1, "#0c1f3d");
      g.fillStyle = body;
      g.fill();
      const rim = g.createLinearGradient(0, cy - r, 0, tipY);
      rim.addColorStop(0, "#f6dc97");
      rim.addColorStop(0.5, "#d4a857");
      rim.addColorStop(1, "#9c7129");
      g.lineWidth = 7;
      g.lineJoin = "round";
      g.strokeStyle = rim;
      g.stroke();
      // Cream badge with a gold ring holds the emblem.
      g.beginPath();
      g.arc(cx, cy, r * 0.78, 0, Math.PI * 2);
      g.fillStyle = "#fcf8ef";
      g.fill();
      g.lineWidth = 6;
      g.strokeStyle = rim;
      g.stroke();
      if (logo) {
        g.save();
        g.beginPath();
        g.arc(cx, cy, r * 0.74, 0, Math.PI * 2);
        g.clip();
        // Fit the emblem (any shape) inside the badge with some breathing room.
        const box = r * 1.04;
        const scale = Math.min(box / logo.naturalWidth, box / logo.naturalHeight);
        const w = logo.naturalWidth * scale;
        const h = logo.naturalHeight * scale;
        g.drawImage(logo, cx - w / 2, cy - h / 2, w, h);
        g.restore();
      }
      // Soft gloss on the upper-left of the head.
      const gloss = g.createRadialGradient(cx - r * 0.45, cy - r * 0.55, 4, cx - r * 0.45, cy - r * 0.55, r * 0.9);
      gloss.addColorStop(0, "rgba(255,255,255,0.28)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");
      g.beginPath();
      g.arc(cx, cy, r, 0, Math.PI * 2);
      g.fillStyle = gloss;
      g.fill();
      pinTexture.needsUpdate = true;
    };
    drawPin();
    const logoImage = new Image();
    logoImage.decoding = "async";
    logoImage.onload = () => { if (!disposed) { drawPin(logoImage); if (ready) render(); } };
    // Served from this site (Sanity logo or the built-in one), so WebGL can use it without CORS.
    logoImage.src = "/brand/emblem";

    const pins = pinSpots.map((spot, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: pinTexture, transparent: true, depthTest: false, depthWrite: false, opacity: 0 }));
      sprite.center.set(0.5, 0);
      sprite.renderOrder = 10;
      sprite.position.copy(toSurface(spot.lat, spot.lon, radius * 1.004));
      sprite.scale.set(spot.size * 0.8, spot.size, 1);
      globe.add(sprite);
      return { sprite, size: spot.size, delay: index * 110 };
    });
    const worldPosition = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const smoothstep = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    let pinsStart = -1;
    const updatePins = (time: number) => {
      globe.updateMatrixWorld();
      for (const pin of pins) {
        // Pop in one after another once the globe is ready (instantly with reduced motion).
        const progress = motion.matches || pinsStart < 0 ? (pinsStart < 0 ? 0 : 1) : Math.min(1, Math.max(0, (time - pinsStart - pin.delay) / 650));
        const pop = progress === 0 ? 0 : 1 + 2.2 * Math.pow(progress - 1, 3) + 1.2 * Math.pow(progress - 1, 2);
        pin.sprite.scale.set(pin.size * 0.8 * pop, pin.size * pop, 1);
        // Fade out as the pin rotates round the edge, so pins behind the globe never show.
        pin.sprite.getWorldPosition(worldPosition);
        const facing = worldPosition.clone().normalize().dot(toCamera.copy(camera.position).sub(worldPosition).normalize());
        pin.sprite.material.opacity = smoothstep(0.14, 0.4, facing) * Math.min(1, progress * 1.6);
      }
    };
    const render = (time = performance.now()) => {
      updatePins(time);
      renderer.render(scene, camera);
    };
    const tick = (time: number) => {
      frame = 0;
      if (disposed || !ready || !visible || document.hidden || motion.matches) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      globe.rotation.y += delta * 0.36;
      render(time);
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

    // Antique desk-globe surface, generated by scripts/build-globe-texture.mjs.
    new THREE.TextureLoader().load("/globe-texture.webp", (loaded) => {
      if (disposed) { loaded.dispose(); return; }
      texture = loaded;
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
      material.map = loaded;
      material.needsUpdate = true;
      ready = true;
      pinsStart = performance.now();
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
        if (object instanceof THREE.Sprite) {
          object.material.dispose();
        } else if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((entry) => entry.dispose());
        }
      });
      texture?.dispose();
      pinTexture.dispose();
      logoImage.onload = null;
      renderer.dispose();
      renderer.domElement.remove();
      delete container.dataset.ready;
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="group absolute inset-0">
    <div className="absolute inset-[13%] rounded-full bg-[#3a5673] bg-[url('/globe-texture.webp')] bg-cover bg-center shadow-[inset_-35px_-15px_55px_#030811,inset_8px_8px_28px_#d4a85722,0_8px_32px_#49677e15] group-data-[ready=true]:opacity-0 transition-opacity duration-700" />
  </div>;
}

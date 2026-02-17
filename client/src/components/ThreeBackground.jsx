import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const capsuleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x28d4c5,
      roughness: 0.18,
      metalness: 0.05,
      transparent: true,
      opacity: 0.24,
      clearcoat: 0.75,
    });

    const capsules = [];
    for (let i = 0; i < 24; i += 1) {
      const geometry = new THREE.CapsuleGeometry(0.08 + Math.random() * 0.08, 0.35 + Math.random() * 0.4, 6, 10);
      const mesh = new THREE.Mesh(geometry, capsuleMaterial);
      mesh.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      group.add(mesh);
      capsules.push(mesh);
    }

    const ambient = new THREE.AmbientLight(0xffffff, 0.72);
    const point = new THREE.PointLight(0x14b8a6, 1.2, 52);
    point.position.set(3, 4, 6);
    scene.add(ambient, point);

    let frameId;
    const animate = () => {
      group.rotation.y += 0.0008;
      group.rotation.x += 0.0004;
      capsules.forEach((capsule, index) => {
        capsule.position.y += Math.sin((Date.now() * 0.0007) + index) * 0.0007;
        capsule.rotation.x += 0.002;
        capsule.rotation.z += 0.0015;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      capsules.forEach((capsule) => capsule.geometry.dispose());
      capsuleMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 opacity-55" />;
};

export default ThreeBackground;


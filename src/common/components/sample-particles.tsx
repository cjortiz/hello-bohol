import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Particles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, and Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // Randomize particle positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      map: new THREE.TextureLoader().load("/src/assets/circle.png"),
      alphaMap: new THREE.TextureLoader().load("/src/assets/circle.png"),
      alphaTest: 0.1, // Lower alphaTest value
      depthWrite: false, // Disable depth writing for transparent particles
    });

    // Add the particle system to the scene
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Create lines connecting particles to the origin (0, 0, 0)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6); // Two points per line (start and end)

    for (let i = 0; i < particleCount; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      // Start point (0, 0, 0) and end point (particle position)
      linePositions[i * 6] = 0;
      linePositions[i * 6 + 1] = 0;
      linePositions[i * 6 + 2] = 0;
      linePositions[i * 6 + 3] = x;
      linePositions[i * 6 + 4] = y;
      linePositions[i * 6 + 5] = z;
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // Position the camera
    camera.position.z = 30;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the particle system for dynamic effect
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;
      lineSystem.rotation.y += 0.001; // Rotate the lines as well

      renderer.render(scene, camera);
    };

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Start the animation
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

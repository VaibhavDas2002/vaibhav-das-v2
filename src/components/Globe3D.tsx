"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points on sphere surface
  const particles = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radius = 2.5;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color based on position
      colors[i * 3] = 0.97 + Math.random() * 0.03;     // R (orange-ish)
      colors[i * 3 + 1] = 0.45 + Math.random() * 0.3;  // G
      colors[i * 3 + 2] = 0.09 + Math.random() * 0.2;  // B
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.1;
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
  });

  // Connection lines
  const lines = useMemo(() => {
    const count = 80;
    const positions: number[] = [];
    const radius = 2.5;

    for (let i = 0; i < count; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const theta2 = theta1 + (Math.random() - 0.5) * 1.5;
      const phi2 = phi1 + (Math.random() - 0.5) * 1.5;

      const x1 = radius * Math.sin(phi1) * Math.cos(theta1);
      const y1 = radius * Math.sin(phi1) * Math.sin(theta1);
      const z1 = radius * Math.cos(phi1);

      const x2 = radius * Math.sin(phi2) * Math.cos(theta2);
      const y2 = radius * Math.sin(phi2) * Math.sin(theta2);
      const z2 = radius * Math.cos(phi2);

      positions.push(x1, y1, z1, x2, y2, z2);
    }

    return new Float32Array(positions);
  }, []);

  return (
    <group>
      {/* Inner glow sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshDistortMaterial
          color="#f97316"
          emissive="#a855f7"
          emissiveIntensity={0.15}
          transparent
          opacity={0.1}
          wireframe
          distort={0.1}
          speed={2}
        />
      </mesh>

      {/* Surface particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#f97316"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.3, 128]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[3.5, 3.6, 128]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  const shapes = useMemo(() => {
    const items = [];
    const types = ["icosahedron", "torus", "octahedron", "box"];
    for (let i = 0; i < 30; i++) {
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      items.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ] as [number, number, number],
        scale: 0.05 + Math.random() * 0.1,
        color: Math.random() > 0.5 ? "#f97316" : "#a855f7",
        floatSpeed: 1 + Math.random() * 2,
        type: types[Math.floor(Math.random() * types.length)],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number]
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.floatSpeed} floatIntensity={2} rotationIntensity={2}>
          <mesh position={shape.position} scale={shape.scale} rotation={shape.rotation}>
            {shape.type === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
            {shape.type === "torus" && <torusGeometry args={[1, 0.4, 16, 32]} />}
            {shape.type === "octahedron" && <octahedronGeometry args={[1, 0]} />}
            {shape.type === "box" && <boxGeometry args={[1, 1, 1]} />}
            <meshStandardMaterial
              color={shape.color}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <Float speed={1} floatIntensity={0.5}>
        <Globe />
      </Float>
      <FloatingShapes />
      <Stars radius={10} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.2} color="#f97316" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.5}
        />
      </EffectComposer>
    </Canvas>
  );
}

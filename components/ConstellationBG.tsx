"use client"; // Next.js 13+ app directory requires this

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Line } from "@react-three/drei";

const stars = [
  { x: -1, y: 1 },
  { x: 0, y: 0.5 },
  { x: 1, y: 1 },
  { x: 0, y: 0 }, // Deepam center
];

function Star({ pos, isDeepam }: { pos: { x: number; y: number }; isDeepam?: boolean }) {
  const mesh = useRef<any>();

  useFrame(({ mouse }) => {
    mesh.current.position.x += (mouse.x * 0.5 - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (mouse.y * 0.5 - mesh.current.position.y) * 0.05;
  });

  return (
    <mesh position={[pos.x, pos.y, 0]} ref={mesh}>
      <sphereGeometry args={[isDeepam ? 0.12 : 0.05, 16, 16]} />
      <meshStandardMaterial
        color={isDeepam ? "orange" : "white"}
        emissive={isDeepam ? "orange" : "white"}
        emissiveIntensity={isDeepam ? 1 : 0.3}
      />
    </mesh>
  );
}

export default function ConstellationBG() {
  return (
    <Canvas
      className="fixed top-0 left-0 w-full h-full z-0"
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      
      {stars.map((s, i) => (
        <Star key={i} pos={s} isDeepam={i === stars.length - 1} />
      ))}

      <Line
        points={stars.map(s => [s.x, s.y, 0])}
        color="white"
        lineWidth={1}
        dashed={false}
      />
    </Canvas>
  );
}

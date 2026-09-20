"use client";

import { Canvas } from "@react-three/fiber";
import type { ShirtYear } from "@/data/shirts";
import { RACK_BAR_Y, RACK_PADDING, RACK_SPACING } from "@/lib/rackLayout";
import { ShirtMesh3D } from "./ShirtMesh3D";

type Props = {
  shirts: ShirtYear[];
  images: Record<number, string>;
  selectedYear: number;
  onSelect: (year: number) => void;
  width: number;
  height: number;
};

const POLE_LENGTH = 182;

/** Cada percha se inclina un poco distinto, como ropa apretada en un burro real. */
const LEAN = [6, -4, 7, -5, 4, -6, 5, -4];

function Rack({ width }: { width: number }) {
  const half = width / 2;
  const inset = Math.min(190, half - 30);
  return (
    <group>
      <mesh position={[0, RACK_BAR_Y, 0]}>
        <boxGeometry args={[width, 6, 6]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.5} metalness={0.3} />
      </mesh>
      {[-half + inset, half - inset].map((x) => (
        <group key={x}>
          <mesh position={[x, RACK_BAR_Y - POLE_LENGTH / 2, 0]}>
            <cylinderGeometry args={[4, 4, POLE_LENGTH, 12]} />
            <meshStandardMaterial color="#2b2b2b" roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[x, RACK_BAR_Y - POLE_LENGTH, 0]}>
            <boxGeometry args={[80, 6, 6]} />
            <meshStandardMaterial color="#2b2b2b" roughness={0.5} metalness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function RackScene({ shirts, images, selectedYear, onSelect, width, height }: Props) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 400], zoom: 1, near: 0.1, far: 2000 }}
      style={{ width, height }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[-120, 160, 220]} intensity={0.9} />
      <directionalLight position={[150, -40, 160]} intensity={0.25} />

      <Rack width={width} />

      {shirts.map((shirt, i) => {
        const x = -width / 2 + RACK_PADDING + i * RACK_SPACING;
        const lean = LEAN[i % LEAN.length];
        return (
          <ShirtMesh3D
            key={shirt.year}
            x={x}
            color={shirt.color}
            sleeveColor={shirt.sleeveColor}
            image={images[shirt.year]}
            isSelected={shirt.year === selectedYear}
            onSelect={() => onSelect(shirt.year)}
            restRotationY={(lean * Math.PI) / 180}
            restRotationZ={(lean / 4) * (Math.PI / 180)}
          />
        );
      })}
    </Canvas>
  );
}

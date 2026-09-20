"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getShirtGeometry } from "@/lib/shirtGeometry";
import { darken, getColorTexture, loadPhotoTexture } from "@/lib/shirtTexture";
import { RACK_BAR_Y } from "@/lib/rackLayout";

type Props = {
  x: number;
  color?: string;
  sleeveColor?: string;
  image?: string;
  isSelected: boolean;
  onSelect: () => void;
  restRotationY: number;
  restRotationZ: number;
};

const RACK_Y = RACK_BAR_Y;
const REST_SCALE = 0.36;
const SELECTED_SCALE = 0.85;
const HOVER_SCALE = 0.42;

export function ShirtMesh3D({ x, color, sleeveColor, image, isSelected, onSelect, restRotationY, restRotationZ }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [photoTexture, setPhotoTexture] = useState<THREE.Texture | null>(null);
  const geometry = getShirtGeometry();

  useEffect(() => {
    if (!image) return;
    let alive = true;
    loadPhotoTexture(image, (tex) => {
      if (alive) setPhotoTexture(tex);
    });
    return () => {
      alive = false;
    };
  }, [image]);

  const frontTexture = image && photoTexture ? photoTexture : getColorTexture(color ?? "#3f3f46", sleeveColor);
  const frontMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: frontTexture, roughness: 0.85, metalness: 0.02 }),
    [frontTexture]
  );
  const sideMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: darken(color ?? "#3f3f46"), roughness: 0.9 }),
    [color]
  );
  const materials = useMemo(() => [frontMaterial, sideMaterial], [frontMaterial, sideMaterial]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const targetScale = isSelected ? SELECTED_SCALE : hovered ? HOVER_SCALE : REST_SCALE;
    const targetY = isSelected ? RACK_Y + 46 : RACK_Y - 46;
    const targetZ = isSelected ? 60 : 0;
    const targetRotY = isSelected ? 0 : restRotationY;
    const targetRotZ = isSelected ? 0 : restRotationZ;

    const s = THREE.MathUtils.damp(g.scale.x, targetScale, 8, 0.016);
    g.scale.setScalar(s);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 8, 0.016);
    g.position.z = THREE.MathUtils.damp(g.position.z, targetZ, 8, 0.016);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 8, 0.016);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetRotZ, 8, 0.016);
  });

  return (
    <group
      ref={groupRef}
      position={[x, RACK_Y - 46, 0]}
      renderOrder={isSelected ? 10 : 0}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh geometry={geometry} material={materials} />
    </group>
  );
}

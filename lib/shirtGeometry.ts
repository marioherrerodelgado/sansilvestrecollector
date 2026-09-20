import * as THREE from "three";

/**
 * Silueta de camiseta de manga larga centrada en el origen, en unidades ~px
 * (compatible con la cámara ortográfica 1 unidad = 1px de RackScene).
 */
const OUTLINE: [number, number][] = [
  [-40, 97],
  [-22, 103],
  [0, 107],
  [22, 103],
  [40, 97],
  [60, 91],
  [90, 71],
  [92, 61],
  [70, 55],
  [46, 69],
  [46, -97],
  [38, -107],
  [-38, -107],
  [-46, -97],
  [-46, 69],
  [-70, 55],
  [-92, 61],
  [-90, 71],
  [-60, 91],
];

let cachedGeometry: THREE.ExtrudeGeometry | null = null;

export function getShirtGeometry(): THREE.ExtrudeGeometry {
  if (cachedGeometry) return cachedGeometry;

  const shape = new THREE.Shape();
  shape.moveTo(OUTLINE[0][0], OUTLINE[0][1]);
  for (let i = 1; i < OUTLINE.length; i++) shape.lineTo(OUTLINE[i][0], OUTLINE[i][1]);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 14,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2,
    bevelSegments: 2,
  });
  geometry.center();

  // El UVGenerator por defecto de ExtrudeGeometry usa la posición (x,y) tal cual como UV,
  // sin normalizar a [0,1]: hay que remapearlo a mano o la foto sale recortada/pixelada.
  const pos = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const w = maxX - minX;
  const h = maxY - minY;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) - minX) / w, (pos.getY(i) - minY) / h);
  }
  uv.needsUpdate = true;

  cachedGeometry = geometry;
  return geometry;
}

/** Ancho/alto aproximados de la silueta base, para calcular escalas relativas. */
export const SHIRT_BASE_WIDTH = 184;
export const SHIRT_BASE_HEIGHT = 214;

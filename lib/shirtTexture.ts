import * as THREE from "three";

const BODY_PATH =
  "M60,14 C68,6 92,4 100,4 C108,4 132,6 140,14 L146,40 L146,208 C146,215 142,218 134,218 L66,218 C58,218 54,215 54,208 L54,40 Z";
const LEFT_SLEEVE_PATH = "M60,14 C40,18 18,26 8,42 C4,50 12,58 22,54 C32,50 42,44 54,40 L60,14 Z";
const RIGHT_SLEEVE_PATH = "M140,14 C160,18 182,26 192,42 C196,50 188,58 178,54 C168,50 158,44 146,40 L140,14 Z";

const cache = new Map<string, THREE.Texture>();

/** Textura de color liso (o torso+mangas a dos tonos) generada con la misma silueta que la versión 2D. */
export function getColorTexture(color: string, sleeveColor?: string): THREE.Texture {
  const key = `${color}|${sleeveColor ?? ""}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 220;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fill(new Path2D(BODY_PATH));
  ctx.fillStyle = sleeveColor ?? color;
  ctx.fill(new Path2D(LEFT_SLEEVE_PATH));
  ctx.fill(new Path2D(RIGHT_SLEEVE_PATH));

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, texture);
  return texture;
}

const photoCache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();

/** Carga (con caché) la foto real de una camiseta como textura. */
export function loadPhotoTexture(url: string, onLoad: (tex: THREE.Texture) => void) {
  const hit = photoCache.get(url);
  if (hit) {
    onLoad(hit);
    return;
  }
  loader.load(url, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    photoCache.set(url, tex);
    onLoad(tex);
  });
}

/** Tono más oscuro del mismo color, para el canto (grosor) extruido de la camiseta. */
export function darken(hex: string, amount = 0.55): string {
  const m = hex.replace("#", "");
  const r = Math.round(parseInt(m.slice(0, 2), 16) * amount);
  const g = Math.round(parseInt(m.slice(2, 4), 16) * amount);
  const b = Math.round(parseInt(m.slice(4, 6), 16) * amount);
  return `rgb(${r},${g},${b})`;
}

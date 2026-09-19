import fs from "node:fs";
import path from "node:path";

const SHIRTS_DIR = path.join(process.cwd(), "public", "camisetas");
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

/**
 * Busca en /public/camisetas una imagen nombrada como el año (p.ej. 2015.jpg)
 * y devuelve un mapa año -> ruta pública. Así, subir tu foto de un año es
 * tan sencillo como añadir el archivo con ese nombre: no hace falta tocar código.
 */
export function getShirtImageMap(): Record<number, string> {
  const map: Record<number, string> = {};
  let files: string[] = [];
  try {
    files = fs.readdirSync(SHIRTS_DIR);
  } catch {
    return map;
  }

  for (const file of files) {
    const match = file.match(/^(\d{4})\.(jpg|jpeg|png|webp)$/i);
    if (match && EXTENSIONS.includes(match[2].toLowerCase())) {
      map[Number(match[1])] = `/camisetas/${file}`;
    }
  }
  return map;
}

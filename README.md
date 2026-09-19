# Mis San Silvestres 🎽

Galería de tus camisetas de la San Silvestre Vallecana, año a año, con el diseño oficial de
cada edición y quién ganó la carrera. Incluye una página sobre la historia y el recorrido de
la carrera.

## Cómo añadir tus fotos

No hace falta backend ni base de datos: basta con subir la foto con el nombre del año.

1. Guarda la foto de la camiseta de, por ejemplo, 2015 como `2015.jpg` (también valen `.jpeg`,
   `.png` o `.webp`).
2. Cópiala dentro de `public/camisetas/`.
3. Haz commit y push (o redeploy en Vercel) — la foto aparecerá automáticamente en la tarjeta
   de ese año.

Si un año no tiene diseño documentado, edita `data/shirts.ts` y añade el campo `design` con
la descripción (color, sponsor, lema...). Los ganadores y récords ya están rellenados desde
1998 hasta la edición más reciente.

## Desarrollo local

```bash
pnpm install
pnpm dev   # http://localhost:3000
```

## Desplegar en Vercel

1. **New Project** → selecciona este repositorio de GitHub.
2. Framework Preset: Next.js (se detecta solo, sin configuración adicional).
3. Deploy. Cada push a la rama conectada actualizará la web automáticamente.

No se necesitan variables de entorno: todos los datos (palmarés, diseños) están en
`data/shirts.ts` y las fotos en `public/camisetas/`.

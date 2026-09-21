#!/usr/bin/env python3
"""Pre-bakes every shirt (color years and photo years alike) into one fully
opaque PNG per year in public/shirts-generated/.

Every runtime technique tried for compositing a transparent PNG in the
browser (mix-blend-mode, opacity over alpha, mask-image, even a bare <img>)
rendered as a broken checkerboard instead of the template, confirmed both
in headless testing and by the site's own visitor. Rather than keep
chasing CSS workarounds, the whole composite (silhouette + color or real
photo, cut with the template's alpha, sat on the gallery's own background
color) is flattened to a plain opaque image at build time. The browser
then just paints a normal image — no alpha, no masking, nothing that
technique could break.

Run again whenever a color/sleeveColor in data/shirts.ts changes, a new
undocumented year gets one, or a new photo is added to public/camisetas/:
    python3 scripts/bake_shirts.py
"""

import re
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "public/mockups/white.png"
OUT_DIR = ROOT / "public/shirts-generated"
DATA_FILE = ROOT / "data/shirts.ts"
PHOTOS_DIR = ROOT / "public/camisetas"

DEFAULT_COLOR = "#3f3f46"

# same tone as the gallery wall panel background (components/Closet.tsx) so the
# flattened rectangle disappears into it instead of showing as a visible box.
BACKDROP = np.array([10, 10, 10], dtype=np.float64)

# same breakpoints as the old CSS `linear-gradient(to right, sleeve 0-20%, body 32-68%, sleeve 80-100%)`
STOPS = [(0.0, "sleeve"), (0.20, "sleeve"), (0.32, "body"), (0.68, "body"), (0.80, "sleeve"), (1.0, "sleeve")]


def hex_to_rgb(hex_color: str) -> np.ndarray:
    h = hex_color.lstrip("#")
    return np.array([int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)], dtype=np.float64)


def parse_shirts():
    src = DATA_FILE.read_text()
    blocks = re.split(r"\{\s*\n\s*year:", src)[1:]
    shirts = []
    for b in blocks:
        ym = re.match(r"\s*(\d+)", b)
        if not ym:
            continue
        cm = re.search(r'color:\s*"([^"]+)"', b)
        sm = re.search(r'sleeveColor:\s*"([^"]+)"', b)
        shirts.append(
            {
                "year": int(ym.group(1)),
                "color": cm.group(1) if cm else DEFAULT_COLOR,
                "sleeveColor": sm.group(1) if sm else None,
            }
        )
    return shirts


def column_color(frac: float, body_rgb: np.ndarray, sleeve_rgb: np.ndarray) -> np.ndarray:
    for (x0, k0), (x1, k1) in zip(STOPS, STOPS[1:]):
        if x0 <= frac <= x1:
            c0 = sleeve_rgb if k0 == "sleeve" else body_rgb
            c1 = sleeve_rgb if k1 == "sleeve" else body_rgb
            t = 0 if x1 == x0 else (frac - x0) / (x1 - x0)
            return c0 * (1 - t) + c1 * t
    return body_rgb


def flatten_and_save(rgb: np.ndarray, alpha: np.ndarray, year: int):
    """Blends rgb over BACKDROP using alpha, then saves a fully opaque PNG."""
    a = (alpha.astype(np.float64) / 255.0)[:, :, None]
    final_rgb = np.clip(rgb * a + BACKDROP * (1 - a), 0, 255).astype(np.uint8)
    Image.fromarray(final_rgb, "RGB").save(OUT_DIR / f"{year}.png", optimize=True, compress_level=9)


def bake_color(year: int, color: str, sleeve_color: str | None, template_rgb, template_alpha, width: int):
    body_rgb = hex_to_rgb(color)
    sleeve_rgb = hex_to_rgb(sleeve_color) if sleeve_color else body_rgb

    col_colors = np.array([column_color(x / (width - 1), body_rgb, sleeve_rgb) for x in range(width)])
    base = col_colors[None, :, :]  # (1, W, 3), broadcasts over rows

    shaded_rgb = base * (template_rgb / 255.0)
    flatten_and_save(shaded_rgb, template_alpha, year)


def cover_crop(photo: Image.Image, width: int, height: int) -> np.ndarray:
    """Scales+crops photo to fill a width x height box, like CSS background-size: cover."""
    src_w, src_h = photo.size
    scale = max(width / src_w, height / src_h)
    new_w, new_h = round(src_w * scale), round(src_h * scale)
    resized = photo.resize((new_w, new_h), Image.LANCZOS)
    x0 = (new_w - width) // 2
    y0 = (new_h - height) // 2
    cropped = resized.crop((x0, y0, x0 + width, y0 + height))
    return np.array(cropped.convert("RGB")).astype(np.float64)


def bake_photo(year: int, photo_path: Path, template_alpha, width: int, height: int):
    photo = Image.open(photo_path)
    photo_rgb = cover_crop(photo, width, height)
    flatten_and_save(photo_rgb, template_alpha, year)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    im = Image.open(TEMPLATE).convert("RGBA")
    arr = np.array(im).astype(np.float64)
    template_rgb = arr[:, :, :3]
    template_alpha = arr[:, :, 3].astype(np.uint8)
    height, width = template_alpha.shape

    photos = {p.stem: p for p in PHOTOS_DIR.glob("*.jpg")} | {p.stem: p for p in PHOTOS_DIR.glob("*.png")}

    shirts = parse_shirts()
    baked_color, baked_photo = [], []
    for s in shirts:
        year_key = str(s["year"])
        if year_key in photos:
            bake_photo(s["year"], photos[year_key], template_alpha, width, height)
            baked_photo.append(s["year"])
        else:
            bake_color(s["year"], s["color"], s["sleeveColor"], template_rgb, template_alpha, width)
            baked_color.append(s["year"])

    print(f"baked {len(baked_color)} color years: {sorted(baked_color)}")
    print(f"baked {len(baked_photo)} photo years: {sorted(baked_photo)}")


if __name__ == "__main__":
    main()

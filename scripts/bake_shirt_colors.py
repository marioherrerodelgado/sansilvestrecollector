#!/usr/bin/env python3
"""Pre-bakes realistic (fold-shaded) shirt PNGs for years without a real photo.

Runtime CSS techniques for this (mix-blend-mode, opacity over a PNG with
alpha, mask-image with a graduated alpha map) all rendered as a broken
checkerboard pattern in testing, so the shading is baked offline instead:
each year's flat color is multiplied against public/mockups/white.png's own
fold/highlight brightness, producing a plain, fully-safe RGBA PNG (binary
silhouette alpha only, no partial alpha bugs at runtime).

Run again whenever a color/sleeveColor in data/shirts.ts changes, or a new
undocumented year gets one:
    python3 scripts/bake_shirt_colors.py
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


def bake(year: int, color: str, sleeve_color: str | None, template_rgb, template_alpha, width: int):
    body_rgb = hex_to_rgb(color)
    sleeve_rgb = hex_to_rgb(sleeve_color) if sleeve_color else body_rgb

    col_colors = np.array([column_color(x / (width - 1), body_rgb, sleeve_rgb) for x in range(width)])
    base = col_colors[None, :, :]  # (1, W, 3), broadcasts over rows

    result_rgb = np.clip(base * (template_rgb / 255.0), 0, 255).astype(np.uint8)
    out = np.dstack([result_rgb, template_alpha])
    Image.fromarray(out, "RGBA").save(OUT_DIR / f"{year}.png", optimize=True, compress_level=9)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    im = Image.open(TEMPLATE).convert("RGBA")
    arr = np.array(im).astype(np.float64)
    template_rgb = arr[:, :, :3]
    template_alpha = arr[:, :, 3].astype(np.uint8)
    height, width = template_alpha.shape

    have_photo = {p.stem for p in PHOTOS_DIR.glob("*.jpg")} | {p.stem for p in PHOTOS_DIR.glob("*.png")}

    shirts = parse_shirts()
    baked = []
    for s in shirts:
        if str(s["year"]) in have_photo:
            continue
        bake(s["year"], s["color"], s["sleeveColor"], template_rgb, template_alpha, width)
        baked.append(s["year"])

    print(f"baked {len(baked)} years: {sorted(baked)}")


if __name__ == "__main__":
    main()

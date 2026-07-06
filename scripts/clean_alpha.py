"""Aggressive alpha cleanup + light-blue halo removal for Pingo PNGs."""
from pathlib import Path
from PIL import Image
import numpy as np

DIR = Path("/app/frontend/assets/pingo")

for f in sorted(DIR.glob("*.png")):
    img = Image.open(f).convert("RGBA")
    arr = np.array(img)
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    # 1. Kill soft-alpha halos: anything with alpha < 200 becomes 0
    mask_soft = a < 200
    a[mask_soft] = 0

    # 2. For remaining pixels, kill light-blue/near-white backgrounds that rembg missed:
    #    pixel is "background-like" if it's very light (all channels > 200) AND blue-ish (b > r)
    #    OR it's a mid light-blue that matches the nano-banana bg (r 100-200, g 130-220, b 210-255) with low saturation
    light_bg = (r > 200) & (g > 200) & (b > 220) & (a > 0)
    a[light_bg] = 0

    # 3. Boost remaining alpha to full opacity (no feathering that shows as halo on colored bg)
    keep = a >= 200
    a[keep] = 255

    arr[..., 3] = a
    out = Image.fromarray(arr, "RGBA")
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.save(f, "PNG", optimize=True)
    print(f"[ok] {f.name} {out.size}")

print("done")

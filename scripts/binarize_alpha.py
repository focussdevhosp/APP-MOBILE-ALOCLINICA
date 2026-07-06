"""Binarize alpha channel — force hard edges, no soft translucent pixels that create halos on colored bg."""
from pathlib import Path
from PIL import Image
import numpy as np

DIR = Path("/app/frontend/assets/pingo")

for f in sorted(DIR.glob("*.png")):
    img = Image.open(f).convert("RGBA")
    arr = np.array(img)
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    # 1. First, refresh chroma-key: any pixel that is still magenta-ish becomes transparent
    is_mag = (r > 180) & (g < 100) & (b > 180) & (a > 0)
    a[is_mag] = 0
    # Edge magenta bleed (softer thresholds)
    edge_mag = (r > 150) & (g < 140) & (b > 150) & (b > g + 30) & (r > g + 30)
    a[edge_mag] = 0

    # 2. Binarize alpha — no soft feathering: >= 128 -> 255, < 128 -> 0
    a = np.where(a >= 128, 255, 0).astype(np.uint8)

    # 3. For remaining opaque pixels that were partially magenta-tinted, restore closer to natural color:
    #    if pixel is on the edge (has any transparent neighbor within 2px) AND is very saturated magenta-ish,
    #    replace by nearest solid pingo color average. Skip for now — binarization + fresh chroma-key should suffice.

    arr[..., 3] = a
    out = Image.fromarray(arr, "RGBA")
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.save(f, "PNG", optimize=True)
    print(f"[ok] {f.name} {out.size}")

print("done")

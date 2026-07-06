"""Remove backgrounds from all Pingo variants using rembg (onnx u2net)."""
from pathlib import Path
from rembg import remove
from PIL import Image
import io

SRC = Path("/app/frontend/assets/pingo")
DST = Path("/app/frontend/assets/pingo_nobg")
DST.mkdir(exist_ok=True, parents=True)

for f in sorted(SRC.glob("*.png")):
    out = DST / f.name
    if out.exists():
        continue
    with open(f, "rb") as fh:
        raw = fh.read()
    result = remove(raw)  # returns PNG with alpha
    img = Image.open(io.BytesIO(result)).convert("RGBA")
    # trim transparent border for a tight crop
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    # save with reasonable size
    img.thumbnail((720, 720), Image.LANCZOS)
    img.save(out, "PNG", optimize=True)
    print(f"[ok] {f.name} -> {img.size}")

print("done")

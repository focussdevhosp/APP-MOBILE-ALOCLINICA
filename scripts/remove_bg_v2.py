"""Re-process Pingo images with a better model + alpha matting to fully remove residual halos."""
from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import io

# Use isnet-general-use — much better on subjects with soft/similar-color edges
session = new_session("isnet-general-use")

SRC_ORIG = Path("/app/frontend/assets/pingo_reference.jpg")
SRC_DIR = Path("/app/frontend/assets/pingo_nobg")  # original nano-banana outputs (still with bg residues)
# Actually re-read from the raw generated files - but we already overwrote them.
# Re-generate from the ORIGINAL nano-banana outputs which are now in pingo/ (already processed).
# Fallback: re-run rembg on current files with alpha matting to clean the halos further.

CUR = Path("/app/frontend/assets/pingo")
OUT = Path("/app/frontend/assets/pingo")

for f in sorted(CUR.glob("*.png")):
    with open(f, "rb") as fh:
        raw = fh.read()
    result = remove(
        raw,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=270,
        alpha_matting_background_threshold=20,
        alpha_matting_erode_size=11,
    )
    img = Image.open(io.BytesIO(result)).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    img.thumbnail((720, 720), Image.LANCZOS)
    img.save(OUT / f.name, "PNG", optimize=True)
    print(f"[ok] {f.name} -> {img.size}")
print("done")

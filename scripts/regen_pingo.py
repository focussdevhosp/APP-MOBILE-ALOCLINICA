"""Regenerate Pingo with magenta background for reliable chroma-key extraction."""
import asyncio, os, base64, io
from pathlib import Path
from dotenv import load_dotenv
from PIL import Image
import numpy as np
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv("/app/backend/.env")

OUT_RAW = Path("/app/frontend/assets/pingo_raw")
OUT_FINAL = Path("/app/frontend/assets/pingo")
OUT_RAW.mkdir(exist_ok=True, parents=True)
OUT_FINAL.mkdir(exist_ok=True, parents=True)
REF = "/app/frontend/assets/pingo_reference.jpg"

BASE = (
    "Cute chubby cartoon plush penguin mascot named Pingo. Blue and white body, "
    "orange beak, orange feet, big shiny black eyes, 3D Pixar plush render, soft studio lighting. "
    "SOLID FLAT MAGENTA BACKGROUND EXACTLY #FF00FF everywhere, no gradient, no shadow on background, "
    "penguin is fully separated from the magenta background with clear edges. "
    "Centered, full body visible. No text, no logo, no watermark. "
)

VARIANTS = {
    "logo": "Pingo standing, subtle smile, hands relaxed, wearing tiny white doctor coat with stethoscope. Logo pose.",
    "waving": "Pingo cheerfully waving one flipper hello, big smile, white doctor coat.",
    "thumbs_up": "Pingo giving a big thumbs up with one flipper, wide happy smile, white doctor coat with stethoscope.",
    "clipboard": "Pingo holding a brown clipboard and pen, focused friendly expression, white doctor coat.",
    "sleeping": "Pingo sleeping peacefully, eyes closed with Z Z symbols above head, sitting cross-legged, no coat.",
    "sad": "Pingo looking sad, tiny tear on cheek, hands together in front, no coat.",
    "heart": "Pingo hugging a big red heart with both flippers, loving expression, white doctor coat.",
    "celebrating": "Pingo celebrating with confetti, both flippers raised, excited joyful face, white doctor coat.",
}


async def gen(name, extra):
    out = OUT_RAW / f"{name}.png"
    if out.exists() and out.stat().st_size > 5000:
        print(f"[skip-gen] {name}")
        return
    api_key = os.getenv("EMERGENT_LLM_KEY")
    chat = LlmChat(api_key=api_key, session_id=f"pingo2-{name}", system_message="Image generator")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    file_contents = None
    if Path(REF).exists():
        with open(REF, "rb") as f:
            b = base64.b64encode(f.read()).decode()
        file_contents = [ImageContent(b)]
    msg = UserMessage(text=BASE + extra, file_contents=file_contents)
    try:
        _, images = await chat.send_message_multimodal_response(msg)
        if images:
            data = base64.b64decode(images[0]["data"])
            with open(out, "wb") as f:
                f.write(data)
            print(f"[gen] {name} ({len(data)} bytes)")
    except Exception as e:
        print(f"[err] {name}: {e}")


def chroma_key(path_in: Path, path_out: Path):
    img = Image.open(path_in).convert("RGB")
    arr = np.array(img).astype(np.int16)
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    # Magenta = high R, low G, high B
    is_bg = (r > 180) & (g < 90) & (b > 180)
    # Also catch near-magenta pixels (feathered edges) with a softer threshold
    edge = (r > 150) & (g < 130) & (b > 150) & (~is_bg)
    alpha = np.full(r.shape, 255, dtype=np.uint8)
    alpha[is_bg] = 0
    alpha[edge] = 0
    # Restore RGB (unchanged) and combine
    rgba = np.dstack([arr.astype(np.uint8), alpha])
    out = Image.fromarray(rgba, "RGBA")
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.thumbnail((720, 720), Image.LANCZOS)
    out.save(path_out, "PNG", optimize=True)


async def main():
    for name, extra in VARIANTS.items():
        await gen(name, extra)
    for f in sorted(OUT_RAW.glob("*.png")):
        chroma_key(f, OUT_FINAL / f.name)
        print(f"[key] {f.name}")


if __name__ == "__main__":
    asyncio.run(main())

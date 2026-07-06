"""Generate Pingo mascot variations using Gemini Nano Banana."""
import asyncio
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv("/app/backend/.env")

OUT_DIR = Path("/app/frontend/assets/pingo")
OUT_DIR.mkdir(parents=True, exist_ok=True)

REFERENCE = "/app/frontend/assets/pingo_reference.jpg"

BASE_STYLE = (
    "Cute chubby cartoon plush penguin mascot named Pingo, blue and white body, "
    "orange beak and orange feet, big shiny black eyes, 3D pixar-style plush render, "
    "solid pure white background (#FFFFFF), soft studio lighting, centered, full body, "
    "no text no logo no watermark. Consistent character design matching reference. "
)

VARIANTS = {
    "logo": "Pingo standing straight, subtle smile, hands relaxed at sides, wearing tiny white doctor coat with stethoscope. Clean logo pose.",
    "waving": "Pingo happily waving one flipper hello, big cheerful smile, wearing white doctor coat.",
    "thumbs_up": "Pingo giving a big thumbs up with one flipper, wide happy smile, wearing white doctor coat and stethoscope.",
    "clipboard": "Pingo holding a small brown clipboard with a pen, focused friendly expression, white doctor coat and stethoscope.",
    "sleeping": "Pingo sleeping peacefully, eyes closed with Z Z symbols above head, sitting cross-legged, without coat, cute and calm.",
    "sad": "Pingo looking sad, small tear on cheek, hands together in front, empty state expression, no coat.",
    "heart": "Pingo hugging a big red heart with both flippers, cheerful loving expression, white doctor coat.",
    "celebrating": "Pingo celebrating with confetti, both flippers raised high, excited joyful face, white doctor coat.",
}


async def gen(name: str, extra: str) -> None:
    out = OUT_DIR / f"{name}.png"
    if out.exists() and out.stat().st_size > 5000:
        print(f"[skip] {name}")
        return
    api_key = os.getenv("EMERGENT_LLM_KEY")
    chat = LlmChat(api_key=api_key, session_id=f"pingo-{name}", system_message="Image generator")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    prompt = BASE_STYLE + extra

    file_contents = None
    if Path(REFERENCE).exists():
        with open(REFERENCE, "rb") as f:
            b = base64.b64encode(f.read()).decode()
        file_contents = [ImageContent(b)]

    msg = UserMessage(text=prompt, file_contents=file_contents)
    try:
        _, images = await chat.send_message_multimodal_response(msg)
        if images:
            data = base64.b64decode(images[0]["data"])
            with open(out, "wb") as f:
                f.write(data)
            print(f"[ok]   {name} ({len(data)} bytes)")
        else:
            print(f"[fail] {name} - no images")
    except Exception as e:
        print(f"[err]  {name}: {e}")


async def main():
    # Download reference first
    import urllib.request
    ref_url = "https://customer-assets.emergentagent.com/job_c46d138b-1879-4fe3-b886-3ba1787aa361/artifacts/4wdvh1uf_pingo-psiquiatra-BknWkeTp.jpg"
    if not Path(REFERENCE).exists():
        urllib.request.urlretrieve(ref_url, REFERENCE)
        print(f"[ref]  downloaded")
    # Generate variants sequentially
    for name, extra in VARIANTS.items():
        await gen(name, extra)


if __name__ == "__main__":
    asyncio.run(main())

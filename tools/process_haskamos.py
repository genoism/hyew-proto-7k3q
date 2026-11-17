"""Copy + optimize the haskamos photos and letters into img/haskamos/.
Letters are used UNCROPPED (full letterheads), per the author. Max 1600px, JPEG,
each kept under ~400KB. Run: python3 tools/process_haskamos.py"""
import glob, os, sys
from PIL import Image, ImageOps
A = "/home/box/agent-data/agents/a815bf93-8991-4651-b461-ee037d8f530c/attachments/"
MAP = {
    "71ea339a": "photo-rav-moshe-heinemann.jpg",
    "f2d8f2cf": "photo-rav-shmuel-kamenetzky.jpg",
    "556d3c6a": "photo-with-the-author.jpg",
    "b9db454a": "letter-rav-shmuel-kamenetzky.jpg",
    "f9f6a3de": "letter-rav-sholom-kamenetzky.jpg",   # 5ac5abda… is a duplicate, skipped
    "97ab0e6f": "letter-rav-moshe-heinemann.jpg",
}
out = os.path.join(os.path.dirname(__file__), "..", "img", "haskamos")
os.makedirs(out, exist_ok=True)
missing = []
for pre, name in MAP.items():
    src = glob.glob(A + pre + "*")
    if not src: missing.append(pre); continue
    im = ImageOps.exif_transpose(Image.open(src[0])).convert("RGB")
    im.thumbnail((1600, 1600), Image.LANCZOS)
    dst = os.path.join(out, name)
    for q in (86, 80, 74, 68, 60):
        im.save(dst, "JPEG", quality=q, optimize=True, progressive=True)
        if os.path.getsize(dst) < 400_000: break
    print(name, im.size, os.path.getsize(dst) // 1024, "KB")
if missing: print("MISSING source files:", missing); sys.exit(1)

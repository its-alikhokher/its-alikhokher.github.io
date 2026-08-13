#!/usr/bin/env python3
"""Nayi profile photo set karein — avatar, favicon aur OG image sab regenerate ho jayenge.

Istemal:  python3 tools/update-photo.py /path/to/photo.jpg
"""
import sys, pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
BG, FG, MUTED, ACCENT = (16, 17, 20), (236, 236, 234), (154, 160, 168), (232, 147, 92)


def font(sz, bold=False):
    names = ["DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf",
             "LiberationSans-Bold.ttf" if bold else "LiberationSans-Regular.ttf"]
    for d in ["/usr/share/fonts/truetype/dejavu/", "/usr/share/fonts/truetype/liberation/"]:
        for n in names:
            try:
                return ImageFont.truetype(d + n, sz)
            except OSError:
                pass
    return ImageFont.load_default()


def square(im, size):
    """Center-crop to a square, then resize."""
    w, h = im.size
    side = min(w, h)
    im = im.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    return im.resize((size, size), Image.LANCZOS)


def main(src):
    photo = Image.open(src).convert("RGB")

    # 1. avatar (site header, 460px taake retina par bhi sharp rahe)
    square(photo, min(460, min(photo.size))).save(ASSETS / "ali-raza-frappe-erpnext-developer.jpg", quality=92, optimize=True)

    # 2. apple touch icon
    square(photo, 180).save(ASSETS / "ali-raza-erpnext-developer-icon.png", optimize=True)

    # 3. OG image (social share card)
    W, H = 1200, 630
    card = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(card)
    d.rectangle([0, 0, W, 8], fill=ACCENT)

    av = square(photo, 150)
    mask = Image.new("L", (150, 150), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, 149, 149], fill=255)
    card.paste(av, (80, 92), mask)

    d.text((80, 292), "Ali Raza", font=font(78, True), fill=FG)
    d.text((80, 392), "Frappe & ERPNext Developer", font=font(40, True), fill=ACCENT)
    d.text((80, 452), "Team Lead · Techno-Functional Consultant · Islamabad, PK", font=font(28), fill=MUTED)
    d.text((80, 522), "its-alikhokher.github.io", font=font(26), fill=MUTED)
    card.save(ASSETS / "ali-raza-erpnext-developer-og.png", optimize=True)

    print("✓ assets/ali-raza-frappe-erpnext-developer.jpg")
    print("✓ assets/ali-raza-erpnext-developer-icon.png (180x180)")
    print("✓ assets/ali-raza-erpnext-developer-og.png (1200x630)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Istemal: python3 tools/update-photo.py /path/to/photo.jpg")
    main(sys.argv[1])

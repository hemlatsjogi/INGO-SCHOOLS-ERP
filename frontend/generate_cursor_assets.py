import os
import base64
from PIL import Image

# 1. Load test_rembg.png and crop to content bbox
img = Image.open('test_rembg.png')
bbox = img.getbbox()
cropped = img.crop(bbox)
w, h = cropped.size
print(f"Cropped dimensions: {w}x{h}")

output_dir = r"c:\Users\hemla\.gemini\antigravity-ide\scratch\INGO-SCHOOLS-ERP\frontend\public\assets"

# Save high-res cropped PNG
cropped_png_path = os.path.join(output_dir, "airplane-cursor-cropped.png")
cropped.save(cropped_png_path, format="PNG", optimize=True)

# Save full airplane-cursor.png
full_png_path = os.path.join(output_dir, "airplane-cursor.png")
cropped.save(full_png_path, format="PNG", optimize=True)

# Generate base64 SVG for airplane-cursor-cropped.svg
with open(cropped_png_path, "rb") as f:
    b64_cropped = base64.b64encode(f.read()).decode("utf-8")

svg_cropped = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="shadow-airplane-cursor-cropped" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-opacity="0.18" flood-color="#1E293B"/>
    </filter>
  </defs>
  <image href="data:image/png;base64,{b64_cropped}" width="{w}" height="{h}" filter="url(#shadow-airplane-cursor-cropped)" preserveAspectRatio="xMidYMid meet" />
</svg>'''

with open(os.path.join(output_dir, "airplane-cursor-cropped.svg"), "w", encoding="utf-8") as f:
    f.write(svg_cropped)

with open(os.path.join(output_dir, "airplane-cursor.svg"), "w", encoding="utf-8") as f:
    f.write(svg_cropped)

# Generate 64x64 version
im64 = cropped.resize((64, int(64 * h / w)), Image.Resampling.LANCZOS)
canvas64 = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
canvas64.paste(im64, (64 - im64.width, 0), im64)
path64 = os.path.join(output_dir, "airplane-cursor-64.png")
canvas64.save(path64, format="PNG", optimize=True)

with open(path64, "rb") as f:
    b64_64 = base64.b64encode(f.read()).decode("utf-8")

svg64 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <image href="data:image/png;base64,{b64_64}" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
</svg>'''
with open(os.path.join(output_dir, "airplane-cursor-64.svg"), "w", encoding="utf-8") as f:
    f.write(svg64)

# Generate 32x32 version for native cursor
im32 = cropped.resize((32, int(32 * h / w)), Image.Resampling.LANCZOS)
canvas32 = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
canvas32.paste(im32, (32 - im32.width, 0), im32)
path32 = os.path.join(output_dir, "airplane-cursor-32.png")
canvas32.save(path32, format="PNG", optimize=True)

with open(path32, "rb") as f:
    b64_32 = base64.b64encode(f.read()).decode("utf-8")

svg32 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <image href="data:image/png;base64,{b64_32}" width="32" height="32" preserveAspectRatio="xMidYMid meet" />
</svg>'''
with open(os.path.join(output_dir, "airplane-cursor-32.svg"), "w", encoding="utf-8") as f:
    f.write(svg32)

print("All cursor image and SVG assets successfully generated!")

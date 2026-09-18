import os
import base64
from PIL import Image

src_img_path = r"C:\Users\hemla\.gemini\antigravity-ide\brain\4abf06b0-2982-47ea-b1ed-342eba020a31\.user_uploaded\media_1789478439132.png"
output_dir = r"c:\Users\hemla\.gemini\antigravity-ide\scratch\INGO-SCHOOLS-ERP\frontend\public\assets"

img = Image.open(src_img_path)
w, h = img.size
print(f"Source image size: {w}x{h}, mode: {img.mode}")

# 1. Save PNG
png_path = os.path.join(output_dir, "group_of_students.png")
img.save(png_path, format="PNG", optimize=True)
print(f"Saved PNG: {png_path} ({os.path.getsize(png_path)} bytes)")

# 2. Save JPG (on clean white background)
jpg_img = Image.new("RGB", (w, h), (255, 255, 255))
if img.mode == "RGBA":
    jpg_img.paste(img, mask=img.split()[3])
else:
    jpg_img.paste(img)
jpg_path = os.path.join(output_dir, "group_of_students.jpg")
jpg_img.save(jpg_path, format="JPEG", quality=95)
print(f"Saved JPG: {jpg_path} ({os.path.getsize(jpg_path)} bytes)")

# 3. Create SVG
with open(png_path, "rb") as f:
    b64_png = base64.b64encode(f.read()).decode("utf-8")

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="shadow-group-students" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-opacity="0.10" flood-color="#0F172A"/>
    </filter>
  </defs>
  <image href="data:image/png;base64,{b64_png}" width="{w}" height="{h}" filter="url(#shadow-group-students)" />
</svg>'''

svg_path = os.path.join(output_dir, "group_of_students.svg")
with open(svg_path, "w", encoding="utf-8") as f:
    f.write(svg_content)
print(f"Saved SVG: {svg_path} ({os.path.getsize(svg_path)} bytes)")
print("Successfully generated all assets!")

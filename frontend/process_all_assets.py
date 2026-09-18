import os
import base64
from PIL import Image
from rembg import remove

# Source paths
group_src = r"C:\Users\hemla\.gemini\antigravity-ide\brain\4abf06b0-2982-47ea-b1ed-342eba020a31\.user_uploaded\media_1789478439132.png"
footer_src = r"C:\Users\hemla\.gemini\antigravity-ide\brain\4abf06b0-2982-47ea-b1ed-342eba020a31\.user_uploaded\media_1789480257921.png"
output_dir = r"c:\Users\hemla\.gemini\antigravity-ide\scratch\INGO-SCHOOLS-ERP\frontend\public\assets"

def process_asset(src_path, base_name, apply_rembg=True):
    print(f"\n--- Processing {base_name} from {src_path} ---")
    img = Image.open(src_path)
    print(f"Original dimensions: {img.size}, mode: {img.mode}")
    
    if apply_rembg:
        print("Applying rembg to ensure 100% clean transparent background...")
        transparent_img = remove(img)
    else:
        transparent_img = img.convert("RGBA") if img.mode != "RGBA" else img

    w, h = transparent_img.size
    
    # 1. Save PNG
    png_path = os.path.join(output_dir, f"{base_name}.png")
    transparent_img.save(png_path, format="PNG", optimize=True)
    print(f"Saved PNG to {png_path} ({os.path.getsize(png_path)} bytes)")

    # 2. Save JPG (on white background)
    jpg_img = Image.new("RGB", (w, h), (255, 255, 255))
    jpg_img.paste(transparent_img, mask=transparent_img.split()[3])
    jpg_path = os.path.join(output_dir, f"{base_name}.jpg")
    jpg_img.save(jpg_path, format="JPEG", quality=95)
    print(f"Saved JPG to {jpg_path} ({os.path.getsize(jpg_path)} bytes)")

    # 3. Create SVG
    with open(png_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="shadow-{base_name}" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-opacity="0.14" flood-color="#0F172A"/>
    </filter>
  </defs>
  <image href="data:image/png;base64,{b64}" width="{w}" height="{h}" filter="url(#shadow-{base_name})" />
</svg>'''

    svg_path = os.path.join(output_dir, f"{base_name}.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Saved SVG to {svg_path} ({os.path.getsize(svg_path)} bytes)")

# 1. Process group_of_students with rembg to strip all background
process_asset(group_src, "group_of_students", apply_rembg=True)

# 2. Process footer_student keeping native transparency with shapes intact
process_asset(footer_src, "footer_student", apply_rembg=False)

print("\nAll assets processed and saved successfully!")

import os
import base64
from PIL import Image
from rembg import remove

student_gen = r"C:\Users\hemla\.gemini\antigravity-ide\brain\a36e03c5-0093-4a70-84d2-9615270aac63\indian_school_student_1789460631665.jpg"
parents_gen = r"C:\Users\hemla\.gemini\antigravity-ide\brain\a36e03c5-0093-4a70-84d2-9615270aac63\indian_parents_1789460694922.jpg"

output_dir = r"c:\Users\hemla\.gemini\antigravity-ide\scratch\INGO-SCHOOLS-ERP\frontend\public\assets"
os.makedirs(output_dir, exist_ok=True)

def process_image(src_path, base_name):
    print(f"Processing {src_path}...")
    img = Image.open(src_path)
    # Remove background
    out = remove(img)
    png_path = os.path.join(output_dir, f"{base_name}.png")
    out.save(png_path, format="PNG")
    print(f"Saved PNG to {png_path}")

    # Create SVG
    w, h = out.size
    with open(png_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%">
  <defs>
    <filter id="shadow-{base_name}" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-opacity="0.18" flood-color="#1E293B"/>
    </filter>
  </defs>
  <image href="data:image/png;base64,{b64}" width="{w}" height="{h}" filter="url(#shadow-{base_name})" />
</svg>'''
    svg_path = os.path.join(output_dir, f"{base_name}.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Saved SVG to {svg_path}")

process_image(student_gen, "indian_student_hero")
process_image(parents_gen, "indian_parents")
print("Done!")

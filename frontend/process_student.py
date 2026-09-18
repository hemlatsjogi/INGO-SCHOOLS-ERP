import os
import base64
from PIL import Image
from rembg import remove

input_path = r"C:\Users\hemla\.gemini\antigravity-ide\brain\a36e03c5-0093-4a70-84d2-9615270aac63\.user_uploaded\media_1789458967742.png"
output_dir = r"c:\Users\hemla\.gemini\antigravity-ide\scratch\INGO-SCHOOLS-ERP\frontend\public\assets"
os.makedirs(output_dir, exist_ok=True)

png_output = os.path.join(output_dir, "indian_school_student.png")
svg_output = os.path.join(output_dir, "indian_school_student.svg")

print("Reading input image...")
input_image = Image.open(input_path)
width, height = input_image.size
print(f"Dimensions: {width}x{height}")

print("Removing background...")
output_image = remove(input_image)
output_image.save(png_output, format="PNG")
print(f"Saved PNG to {png_output}")

# Also generate SVG wrapper with embedded clean transparent image
with open(png_output, "rb") as f:
    b64_data = base64.b64encode(f.read()).decode("utf-8")

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <defs>
    <filter id="drop-shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-opacity="0.18" flood-color="#1E293B"/>
    </filter>
  </defs>
  <image href="data:image/png;base64,{b64_data}" width="{width}" height="{height}" filter="url(#drop-shadow)" />
</svg>'''

with open(svg_output, "w", encoding="utf-8") as f:
    f.write(svg_content)

print(f"Saved SVG to {svg_output}")

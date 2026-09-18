import os
import base64
from PIL import Image

output_dir = os.path.join(os.path.dirname(__file__), "public", "assets")
dist_dir = os.path.join(os.path.dirname(__file__), "dist", "assets")

converted = []

for filename in sorted(os.listdir(output_dir)):
    ext = os.path.splitext(filename)[1].lower()
    base_name = os.path.splitext(filename)[0]
    
    if ext in [".jpg", ".jpeg", ".png"]:
        src_path = os.path.join(output_dir, filename)
        svg_filename = f"{base_name}.svg"
        svg_path = os.path.join(output_dir, svg_filename)
        
        with Image.open(src_path) as img:
            w, h = img.size
            format_name = img.format.lower()
            mime = "image/png" if format_name == "png" else "image/jpeg"
            is_transparent = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)

        with open(src_path, "rb") as f:
            b64_data = base64.b64encode(f.read()).decode("utf-8")

        if is_transparent and any(k in base_name for k in ["student", "hero", "parents", "airplane"]):
            svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="shadow-{base_name}" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-opacity="0.18" flood-color="#1E293B"/>
    </filter>
  </defs>
  <image href="data:{mime};base64,{b64_data}" width="{w}" height="{h}" filter="url(#shadow-{base_name})" preserveAspectRatio="xMidYMid meet" />
</svg>"""
        else:
            svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <image href="data:{mime};base64,{b64_data}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet" />
</svg>"""

        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)

        # Also copy to dist if dist/assets exists
        if os.path.exists(dist_dir):
            dist_svg_path = os.path.join(dist_dir, svg_filename)
            with open(dist_svg_path, "w", encoding="utf-8") as f:
                f.write(svg_content)

        converted.append((filename, svg_filename, f"{w}x{h}", os.path.getsize(svg_path)))

print(f"Total images converted to SVG: {len(converted)}")
for orig, svg, dims, size in converted:
    print(f"  {orig:38} -> {svg:38} ({dims}, {size} bytes)")

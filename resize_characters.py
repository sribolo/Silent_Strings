from PIL import Image
import os

# === Set your input/output folder names here ===
src_folder = 'static/images/avatar_parts/characters'          # Folder with your original character PNGs
dst_folder = 'static/images/avatar_parts/characters_fixed'    # Folder for new, fixed PNGs

os.makedirs(dst_folder, exist_ok=True)

for fname in os.listdir(src_folder):
    if fname.lower().endswith('.png'):
        im = Image.open(os.path.join(src_folder, fname))
        # Create a new transparent 32x32 image
        out = Image.new('RGBA', (32,32), (0,0,0,0))
        # Center your original image on the new canvas
        x = (32 - im.width)//2
        y = (32 - im.height)//2
        out.paste(im, (x,y), im if im.mode == 'RGBA' else None)
        out.save(os.path.join(dst_folder, fname))
        print(f"Processed {fname}")

print("All images processed. Check your 'characters_fixed' folder!")

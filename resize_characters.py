from PIL import Image
import os

# === Set your input/output folder names here ===
src_folder = 'static/images/avatar_parts/acc'          # Folder with your original character PNGs
dst_folder = 'static/images/avatar_parts/acc_fixed'    # Folder for new, fixed PNGs
x_offset = 1.27  # Adjust as needed
y_offset = -6.59 # Adjust as needed

os.makedirs(dst_folder, exist_ok=True)

for fname in os.listdir(src_folder):
    if fname.lower().endswith('.png'):
        im = Image.open(os.path.join(src_folder, fname))
        out = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
        out.paste(im, (int(x_offset), int(y_offset)), im if im.mode == 'RGBA' else None)
        out.save(os.path.join(dst_folder, fname))
        print(f"Processed {fname}")

print("All accessory images re-centered! Tweak x_offset/y_offset if needed.")

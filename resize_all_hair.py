from PIL import Image
import os

# Root directory containing all hair sprite sheets (and subfolders)
hair_root = "static/images/avatar_parts/hair"

tile_width, tile_height = 32, 32

for root, dirs, files in os.walk(hair_root):
    for file in files:
        if file.lower().endswith('.png'):
            sprite_sheet_path = os.path.join(root, file)
            output_folder = os.path.join(root + "_tiles", os.path.splitext(file)[0])
            os.makedirs(output_folder, exist_ok=True)

            sprite_sheet = Image.open(sprite_sheet_path)
            sheet_width, sheet_height = sprite_sheet.size

            tile_num = 0
            for y in range(0, sheet_height, tile_height):
                for x in range(0, sheet_width, tile_width):
                    box = (x, y, x + tile_width, y + tile_height)
                    tile = sprite_sheet.crop(box)
                    tile.save(os.path.join(output_folder, f"tile_{tile_num}.png"))
                    tile_num += 1

            print(f"Saved {tile_num} tiles from '{sprite_sheet_path}' to '{output_folder}'") 
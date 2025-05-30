from PIL import Image
import os



# Update these paths!
sprite_sheet_path = "static/images/avatar_parts/clothes/floral/floral.png"
output_folder = "static/images/avatar_parts/clothes/floral_tiles"


os.makedirs(output_folder, exist_ok=True)

sprite_sheet = Image.open(sprite_sheet_path)
sheet_width, sheet_height = sprite_sheet.size

tile_width, tile_height = 32, 32
tile_num = 0

for y in range(0, sheet_height, tile_height):
    for x in range(0, sheet_width, tile_width):
        box = (x, y, x + tile_width, y + tile_height)
        tile = sprite_sheet.crop(box)
        tile.save(os.path.join(output_folder, f"tile_{tile_num}.png"))
        tile_num += 1

print(f"Saved {tile_num} tiles to '{output_folder}'")

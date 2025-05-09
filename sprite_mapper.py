from PIL import Image
import json
import os

def generate_sprite_map(image_path, sprite_width, sprite_height, output_file):
    """
    Generates a JSON file mapping the coordinates of each sprite in a sheet.
    """
    try:
        image = Image.open(image_path)
        sheet_width, sheet_height = image.size

        columns = sheet_width // sprite_width
        rows = sheet_height // sprite_height

        sprite_map = {}
        counter = 1

        for row in range(rows):
            for col in range(columns):
                x = col * sprite_width
                y = row * sprite_height
                sprite_map[f"sprite{counter}"] = {
                    "x": x,
                    "y": y
                }
                counter += 1

        with open(output_file, "w") as f:
            json.dump(sprite_map, f, indent=4)
        print(f"✅ Sprite map generated: {output_file}")

    except Exception as e:
        print(f"❌ Error generating sprite map: {e}")

# === AUTO-GENERATE MAPPING FOR ALL CLOTHES ===
acc_dir = "static/images/avatar_parts/walk/hair"
for file_name in os.listdir(acc_dir):
    if file_name.endswith(".png"):
        name = file_name.split(".png")[0]
        generate_sprite_map(
            image_path=f"{acc_dir}/{file_name}",
            sprite_width=32,          # Adjust based on your sprite size
            sprite_height=32,         # Adjust based on your sprite size
            output_file=f"{acc_dir}/{name}_map.json"
        )

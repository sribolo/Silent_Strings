import os

def rename_files(folder, prefix):
    files = [f for f in os.listdir(folder) if f.startswith('tile_') and f.endswith('.png')]
    # Sort files by the number in the filename
    def extract_number(filename):
        try:
            return int(filename.split('_')[1].split('.')[0])
        except Exception:
            return 0
    files.sort(key=extract_number)
    for idx, filename in enumerate(files, 1):
        new_name = f"{prefix}{idx}.png"
        src = os.path.join(folder, filename)
        dst = os.path.join(folder, new_name)
        print(f"Renaming {src} -> {dst}")
        os.rename(src, dst)

if __name__ == "__main__":
    base_path = "static/images/avatar_parts"

    # Clothes
    rename_files(os.path.join(base_path, "clothes/basic"), "shirt")
    rename_files(os.path.join(base_path, "clothes/dress"), "dress")
    rename_files(os.path.join(base_path, "clothes/pants"), "pant")
    rename_files(os.path.join(base_path, "clothes/shoes"), "shoe")
    rename_files(os.path.join(base_path, "clothes/skirts"), "skirt")

    # Face
    rename_files(os.path.join(base_path, "face/blush"), "blush")
    rename_files(os.path.join(base_path, "face/lipstick"), "lipstick")

    # Hair (all subfolders)
    hair_base = os.path.join(base_path, "hair")
    for subfolder in os.listdir(hair_base):
        subfolder_path = os.path.join(hair_base, subfolder)
        if os.path.isdir(subfolder_path):
            rename_files(subfolder_path, subfolder)

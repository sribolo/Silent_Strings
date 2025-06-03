import os
import json

# Only reference files that exist in your static folders!
all_avatar_parts = [
    {
        'characters': 'char_1',  # exists
        'clothes': {'subcategory': 'shoes', 'name': 'shoe18'},  # exists
        'hair': {'subcategory': 'ponytail', 'name': 'ponytail9'},  # check if exists in your static folder
        'face': {'subcategory': 'blush', 'name': 'blush2'},  # exists
        'acc': 'glasses001',  # exists
    },
    {
        'characters': 'char_2',
        'clothes': {'subcategory': 'shoes', 'name': 'shoe1'},
        'hair': {'subcategory': 'midiwave', 'name': 'midiwave14'},
        'face': {'subcategory': 'blush', 'name': 'blush3'},
        'acc': 'glasses010',
    },
    # Add more avatar_parts dicts as needed, but only use filenames you have in your static folders!
]

STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static', 'images', 'avatar_parts')

missing = []
for idx, avatar_parts in enumerate(all_avatar_parts):
    # Characters
    char = avatar_parts.get('characters')
    if char:
        char_path = os.path.join(STATIC_ROOT, 'characters', f'{char}.png')
        if not os.path.isfile(char_path):
            missing.append((idx, 'characters', char_path))
    # Clothes, Hair, Face
    for part in ['clothes', 'hair', 'face']:
        value = avatar_parts.get(part)
        if value and isinstance(value, dict):
            subcat = value.get('subcategory')
            name = value.get('name')
            if subcat and name:
                fpath = os.path.join(STATIC_ROOT, part, subcat, f'{name}.png')
                if not os.path.isfile(fpath):
                    missing.append((idx, f'{part}.{subcat}', fpath))
    # Accessories
    acc = avatar_parts.get('acc')
    if acc and isinstance(acc, str):
        acc_path = os.path.join(STATIC_ROOT, 'acc', f'{acc}.png')
        if not os.path.isfile(acc_path):
            missing.append((idx, 'acc', acc_path))

if missing:
    print("Missing avatar part files referenced by avatar_parts:")
    for idx, key, fpath in missing:
        print(f"  avatar_parts[{idx}] -> {key}: {fpath}")
else:
    print("All referenced avatar part files are present for all avatar_parts.")

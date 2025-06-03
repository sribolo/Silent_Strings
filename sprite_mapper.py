
import os

AVATAR_PARTS = {
    'characters': ['char_1.png', 'char_2.png', 'char_3.png', 'char_4.png', 'char_5.png', 'char_6.png', 'char_7.png', 'char_9.png', 'tile_48.png'],
    'hair/midiwave': ['midiwave14.png', 'midiwave1.png'],
    'clothes/shoes': ['shoe6.png', 'shoe1.png'],
    'face/blush': ['blush3.png', 'blush1.png'],
    'acc': ['glasses001.png', 'earring_red001.png'],
}

STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static', 'images', 'avatar_parts')

missing = {}
for part, files in AVATAR_PARTS.items():
    part_dir = os.path.join(STATIC_ROOT, *part.split('/'))
    for fname in files:
        fpath = os.path.join(part_dir, fname)
        if not os.path.isfile(fpath):
            missing.setdefault(part, []).append(fname)

if missing:
    print("Missing avatar part files:")
    for part, files in missing.items():
        print(f"  {part}:")
        for fname in files:
            print(f"    - {fname}")
else:
    print("All expected avatar part files are present.")

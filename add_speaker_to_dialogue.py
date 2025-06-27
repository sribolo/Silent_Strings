import re
import json


input_path = "static/js/dialogue_advanced.js"
output_path = "static/js/dialogue_advanced_with_speaker.js"

# Helper to guess speaker from key or text
def guess_speaker(key, text):
    key = key.lower()
    if "marcus" in key or "marcus" in text.lower():
        return "Marcus Chen - IT Analyst"
    if "sarah" in key or "sarah" in text.lower():
        return "Sarah - Security Guard"
    if "carlos" in key or "janitor" in key or "carlos" in text.lower():
        return "Carlos - Janitor"
    if "mia" in key or "reception" in key or "mia" in text.lower():
        return "Mia - Receptionist"
    if "emma" in key or "emma" in text.lower():
        return "Emma - Web Editor"
    if "david" in key or "david" in text.lower():
        return "David - IT Support"
    if "billy" in key or "billy" in text.lower():
        return "Billy - Intern"
    if "chloe" in key or "chloe" in text.lower():
        return "Chloe - DevOps Engineer"
    if "tom" in key or "tom" in text.lower():
        return "Tom - Junior Dev"
    if "priya" in key or "priya" in text.lower():
        return "Priya - Senior Dev"
    if "maria" in key or "maria" in text.lower():
        return "Maria - Sysadmin"
    if "rachel" in key or "rachel" in text.lower():
        return "Rachel - Grid Operator"
    if "anita" in key or "anita" in text.lower():
        return "Anita - Suspect"
    if "henry" in key or "henry" in text.lower():
        return "Henry - HR"
    if "cipher" in key or "cipher" in text.lower():
        return "Cipher - Informant"
    if "lina" in key or "lina" in text.lower():
        return "Lina - Transit Supervisor"
    if "director" in key or "director" in text.lower():
        return "Director"
    if "reception_bot" in key or "reception bot" in text.lower():
        return "Reception Bot"
    if "fail" in key or "objective" in key:
        return "System"
    if "start" in key:
        return "System"
    return "System"

# Read the JS file and extract the object
with open(input_path, "r") as f:
    js = f.read()


js_obj = re.sub(r"^window\.missionDialogues\s*=\s*", "", js, flags=re.MULTILINE).strip()
if js_obj.endswith(";"):
    js_obj = js_obj[:-1]

# Fix single to double quotes for JSON parsing (not perfect, but works for most JS objects)
js_obj = js_obj.replace("'", '"')

# Remove comments
js_obj = re.sub(r"//.*", "", js_obj)

# Try to parse as JSON
try:
    data = json.loads(js_obj)
except Exception as e:
    print("Error parsing JS as JSON. Please check your file formatting.")
    print(e)
    exit(1)

# Recursively add speaker property
def add_speaker(obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, dict):
                if "text" in v and "speaker" not in v:
                    v["speaker"] = guess_speaker(k, v["text"])
                add_speaker(v)
            elif isinstance(v, list):
                for item in v:
                    add_speaker(item)

add_speaker(data)

# Dump back to JS format
with open(output_path, "w") as f:
    f.write("window.missionDialogues = ")
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write(";")

print(f"Done! Output written to {output_path}")

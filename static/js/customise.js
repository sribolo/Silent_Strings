document.addEventListener("DOMContentLoaded", () => {
  const categories = ["characters", "clothes", "hair", "face", "acc"];
  const selections = {}; // User's current selections for each category

  // === Fetch all sprites from the backend ===
  fetch('/get_sprites')
    .then(res => res.json())
    .then(data => {
      categories.forEach(category => {
        const grid = document.getElementById(`grid-${category}`);
        if (!grid) return;

        grid.innerHTML = ""; // Clear any previous entries

        data[category].forEach(option => {
          const img = document.createElement('img');
          img.src = option.img;
          img.alt = option.name;
          img.classList.add('avatar-choice');
          img.dataset.category = category;
          img.dataset.name = option.name;

          img.onclick = () => {
            // Unselect all in this category
            grid.querySelectorAll('.avatar-choice.selected').forEach(el => el.classList.remove('selected'));
            // Select this one
            img.classList.add('selected');
            // Store selection
            selections[category] = {
              name: option.name,
              img: option.img
            };
            updateAvatarPreview(selections);
          };

          grid.appendChild(img);
        });
      });
      // Show the first category by default
      showCategory(categories[0]);
      updateAvatarPreview(selections); // Show initial preview (empty or preselected)
    });

  // === Tab switching logic ===
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-button.active").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      showCategory(btn.dataset.category);
    });
  });

  function showCategory(category) {
    document.querySelectorAll(".grid-container").forEach(grid => grid.classList.add("hidden"));
    const target = document.getElementById(`grid-${category}`);
    if (target) target.classList.remove("hidden");
  }

  // === Save Avatar and Navigate to Dialogue ===
  document.getElementById("save-avatar").addEventListener("click", () => {
    const nameInput = document.getElementById("agent-name");
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter your agent name.");
      nameInput.focus();
      return;
    }
    // Optionally, ensure at least a character is selected
    if (!selections.characters) {
      alert("Please select a character avatar.");
      return;
    }

    fetch("/save-avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, selections })
    })
    .then(res => {
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    })
    .then(() => {
      window.location.href = "/game";
    })
    .catch(err => {
      console.error(err);
      alert("There was a problem saving your avatar. Please try again.");
    });
  });
});

// === Function to update the big preview on the left ===
function updateAvatarPreview(selections) {
  const preview = document.getElementById('avatar-preview');
  preview.innerHTML = ""; // Clear previous

  // Draw layers in order (bottom to top)
  const LAYER_ORDER = [
    'characters',   // base
    'clothes',      // outfit
    'hair',         // hair
    'face',         // face features
    'acc'           // accessories: beard, glasses, hat
  ];
  LAYER_ORDER.forEach(category => {
    if (selections[category]) {
      const img = document.createElement('img');
      img.src = selections[category].img;
      img.className = 'avatar-layer';
      preview.appendChild(img);
    }
  });
}

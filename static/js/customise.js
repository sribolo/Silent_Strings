document.addEventListener("DOMContentLoaded", () => {
  const categories = ["characters", "clothes", "hair", "eyes", "acc"];
  const selections = {}; // Stores the user's current choices

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
          };

          grid.appendChild(img);
        });
      });
      // Show the first category by default
      showCategory(categories[0]);
    });

  // === Tab switching logic ===
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
      // update active button
      document.querySelectorAll(".tab-button.active")
              .forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      // show corresponding grid
      showCategory(btn.dataset.category);
    });
  });

  function showCategory(category) {
    document.querySelectorAll(".grid-container")
            .forEach(grid => grid.style.display = "none");
    const target = document.getElementById(`grid-${category}`);
    if (target) target.style.display = "grid";
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
      window.location.href = "/dialogue";
    })
    .catch(err => {
      console.error(err);
      alert("There was a problem saving your avatar. Please try again.");
    });
  });
});



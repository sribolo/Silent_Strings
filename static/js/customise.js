
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("avatar-options");
  const categories = ["characters", "clothes", "hair", "eyes", "acc"];
  const selections = {};

  // === Fetch all sprites from the backend ===
  fetch("/get_sprites")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load sprites");
      return res.json();
    })
    .then(data => {
      categories.forEach(category => {
        const grid = document.createElement("div");
        grid.className = "grid-container";
        grid.id = `grid-${category}`;
        grid.style.display = "none";

        const sprites = data[category] || {};
        Object.entries(sprites).forEach(([sprite, coords]) => {
          const item = document.createElement("div");
          item.className = "grid-item";
          // serve via Flask's /avatars route
          item.style.backgroundImage = `url('/avatars/${category}/${sprite}.png')`;
          item.style.backgroundPosition = `-${coords.x}px -${coords.y}px`;
          item.dataset.category = category;
          item.dataset.sprite = sprite;

          item.addEventListener("click", () => {
            // deselect others in this grid
            grid.querySelectorAll(".grid-item.selected")
                .forEach(el => el.classList.remove("selected"));
            // mark this one
            item.classList.add("selected");
            // record selection (just the sprite key)
            selections[category] = sprite;
          });

          grid.appendChild(item);
        });

        container.appendChild(grid);
      });

      // Show the first category by default
      showCategory(categories[0]);
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Failed to load avatar options.</p>";
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

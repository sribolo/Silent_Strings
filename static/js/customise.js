
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("avatar-options");
  const categories = ["characters", "clothes", "hair", "eyes", "acc"];
  const selections = {};

  // === Fetch all sprites from the backend ===
  fetch('/get_sprites')
  .then(res => res.json())
  .then(data => {
    const charDiv = document.getElementById('character-options');
    data.characters.forEach(char => {
      const img = document.createElement('img');
      img.src = char.img;
      img.alt = char.name;
      img.classList.add('avatar-choice');
      // Optional: click to select
      img.onclick = () => {
        // Mark as selected (add a CSS class, store in variable, etc)
      };
      charDiv.appendChild(img);
    });
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

const SPRITE_WIDTH = 32;
const SPRITE_HEIGHT = 32;
const FRAMES = 4; // e.g., number of walk frames per row
let currentFrame = 0;
let row = 0; // e.g., 0=idle, 1=walk down, 2=walk left, 3=walk right, 4=walk up (adjust based on your sheet)

function showFrame() {
  document.getElementById('sprite').style.backgroundPosition =
    `-${currentFrame * SPRITE_WIDTH}px -${row * SPRITE_HEIGHT}px`;
}

// Animate (walk cycle)
setInterval(() => {
  currentFrame = (currentFrame + 1) % FRAMES;
  showFrame();
}, 200); // adjust timing as needed

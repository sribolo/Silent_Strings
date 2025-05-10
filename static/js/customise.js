document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("avatar-options");
  const categories = ["acc", "characters", "clothes", "eyes", "hair"];
  const selections = {};

  // === Fetch all sprites from the backend ===
  fetch('/get_sprites')
    .then(response => response.json())
    .then(data => {
      categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("grid-container");
        categoryDiv.id = `grid-${category}`;
        categoryDiv.style.display = "none";

        Object.keys(data[category]).forEach(sprite => {
          const [x, y] = [data[category][sprite].x, data[category][sprite].y];
          const item = document.createElement("div");
          item.classList.add("grid-item");
          item.style.backgroundImage = `url('/static/images/avatar_parts/${category}/${sprite}.png')`;
          item.style.backgroundPosition = `-${x}px -${y}px`;

          item.onclick = () => {
            // Remove 'selected' class from other items in the same category
            document.querySelectorAll(`#grid-${category} .grid-item`).forEach(el => el.classList.remove("selected"));
            
            // Mark the clicked one as selected
            item.classList.add("selected");

            // Save selection
            selections[category] = { sprite, x, y };
          };

          categoryDiv.appendChild(item);
        });

        container.appendChild(categoryDiv);
      });

      // Show the first category by default
      document.getElementById("grid-characters").style.display = "grid";
    });

  // === Tab switching logic ===
  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      document.querySelectorAll(".grid-container").forEach(container => {
        container.style.display = "none";
      });
      document.getElementById(`grid-${category}`).style.display = "grid";
    });
  });

  // === Save Avatar and Navigate to Dialogue ===
  document.getElementById("save-avatar").addEventListener("click", () => {
    const name = document.getElementById("agent-name").value;

    fetch("/save-avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, selections })
    }).then(() => {
      window.location.href = "/dialogue";
    });
  });

  // === Loading Screen Transition ===
  function navigateToCustomize() {
    const loader = document.getElementById("loading-screen");
    loader.style.display = "flex";
    setTimeout(() => {
      window.location.href = "/customize";
    }, 1000);  // 1 second delay for animation
  }
});

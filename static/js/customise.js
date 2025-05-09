ffetch('/get_sprites')
.then(response => response.json())
.then(data => {
  const container = document.getElementById("avatar-options");
  Object.keys(data).forEach(category => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("grid-container");

    Object.keys(data[category]).forEach(sprite => {
      const [x, y] = [data[category][sprite].x, data[category][sprite].y];
      const item = document.createElement("div");
      item.classList.add("grid-item");
      item.style.backgroundImage = `url('/static/images/avatar_parts/${category}/${sprite}.png')`;
      item.style.backgroundPosition = `-${x}px -${y}px`;

      item.onclick = () => {
        document.querySelectorAll(`#${category} .grid-item`).forEach(el => el.classList.remove("selected"));
        item.classList.add("selected");
        item.setAttribute("data-selection", `${x},${y}`);
      };

      categoryDiv.appendChild(item);
    });

    container.appendChild(categoryDiv);
  });
});

// Open the tab
function openTab(category) {
  document.querySelectorAll(".grid-container").forEach(container => {
    container.style.display = "none";
  });
  document.querySelectorAll(`#${category}-*`).forEach(container => {
    container.style.display = "grid";
  });
}

// Save the avatar
function saveAvatar() {
  const name = document.getElementById("agent-name").value;
  const selections = {};

  document.querySelectorAll(".grid-item.selected").forEach(item => {
    const [x, y] = item.getAttribute("data-selection").split(",");
    selections[item.parentElement.id] = { x, y };
  });

  fetch("/save-avatar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, selections })
  }).then(() => {
    window.location.href = "/dialogue";
  });
}

function navigateToCustomize() {
  const loader = document.getElementById("loading-screen");
  loader.style.display = "flex";
  setTimeout(() => {
      window.location.href = "/customize";
  }, 1000);  // 1 second delay for animation
}

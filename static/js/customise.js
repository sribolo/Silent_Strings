document.addEventListener("DOMContentLoaded", () => {
  const categories = ["characters", "clothes", "hair", "face", "acc"];
  const selections = {};
  let spriteData = {};
  let currentCategory = categories[0];
  let currentSubheader = {};

  const SUBHEADER_LABELS = {
    clothes: {
      basic: "Shirts",
      skirts: "Skirts",
      pants: "Pants",
      dress: "Dresses",
      shoes_tiles: "Shoes",
      default: "Other Clothes"
    },
    hair: {
      curly: "Curly",
      emo: "Emo",
      extra_long: "Extra Long",
      french_curl: "French Curl",
      gentleman: "Gentleman",
      spaebuns: "Space Buns",
      wavy: "Wavy",
      long_straight: "Long Straight",
      midiwave: "Midi Wave",
      ponytail: "Ponytail",
      buzzcut: "Buzzcut",
      braids: "Braids",
      bob: "Bob",
      default: "Other Hair"
    },
    face: {
      blush: "Blush",
      eyes_tiles: "Eyes",
      lipstick: "Lipstick",
      default: "Other Face"
    },
    acc: {
      glasses: "Glasses",
      beard: "Beard",
      earring_red: "Red Earrings",
      earring_emerald: "Emerald Earrings",
      earring_red_silver: "Red/Silver Earrings",
      earring_emerald_silver: "Emerald/Silver Earrings",
      default: "Other Accessories"
    }
  };

  // === Fetch all sprites from the backend ===
  fetch('/get_sprites')
    .then(res => res.json())
    .then(data => {
      spriteData = data;
      categories.forEach(category => {
        const grid = document.getElementById(`grid-${category}`);
        if (!grid) return;
        grid.innerHTML = "";
        // For characters (flat)
        if (category === "characters") {
          data[category].forEach(option => {
            const img = document.createElement('img');
            img.src = option.img;
            img.alt = option.name;
            img.classList.add('avatar-choice');
            img.dataset.category = category;
            img.dataset.name = option.name;
            img.onclick = () => {
              grid.querySelectorAll('.avatar-choice.selected').forEach(el => el.classList.remove('selected'));
              img.classList.add('selected');
              selections[category] = { name: option.name, img: option.img };
              updateAvatarPreview(selections);
            };
            grid.appendChild(img);
          });
        } else {
          // For other categories, show subheader buttons
          const subheaderBar = document.createElement('div');
          subheaderBar.className = 'subheader-bar';
          const subcats = Object.keys(data[category]);
          if (!currentSubheader[category]) currentSubheader[category] = subcats[0];
          subcats.forEach(subcat => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'subheader-btn' + (subcat === currentSubheader[category] ? ' active' : '');
            btn.textContent = (SUBHEADER_LABELS[category] && SUBHEADER_LABELS[category][subcat])
              ? SUBHEADER_LABELS[category][subcat]
              : subcat.charAt(0).toUpperCase() + subcat.slice(1).replace(/_/g, ' ');
            btn.onclick = () => {
              currentSubheader[category] = subcat;
              // Remove active from all
              subheaderBar.querySelectorAll('.subheader-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              renderSubcatGrid(category, subcat);
            };
            subheaderBar.appendChild(btn);
          });
          grid.appendChild(subheaderBar);
          // Render initial subcat grid
          renderSubcatGrid(category, currentSubheader[category]);
        }
      });
      showCategory(categories[0]);
      updateAvatarPreview(selections);
    });

  function renderSubcatGrid(category, subcat) {
    const grid = document.getElementById(`grid-${category}`);
    // Remove any previous grid of images (but keep subheader bar)
    grid.querySelectorAll('.subcat-grid').forEach(el => el.remove());
    const imgGrid = document.createElement('div');
    imgGrid.className = 'subcat-grid';
    const options = spriteData[category][subcat] || [];
    options.forEach(option => {
      const img = document.createElement('img');
      img.src = option.img;
      img.alt = option.name;
      img.classList.add('avatar-choice');
      img.dataset.category = category;
      img.dataset.subcat = subcat;
      img.dataset.name = option.name;
      img.onclick = () => {
        imgGrid.querySelectorAll('.avatar-choice.selected').forEach(el => el.classList.remove('selected'));
        img.classList.add('selected');
        if (!selections[category]) selections[category] = {};
        selections[category][subcat] = { name: option.name, img: option.img };
        updateAvatarPreview(selections);
      };
      imgGrid.appendChild(img);
    });
    grid.appendChild(imgGrid);
  }

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
    currentCategory = category;
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
  preview.innerHTML = "";
  const LAYER_ORDER = [
    'characters',
    'clothes',
    'hair',
    'face',
    'acc'
  ];
  LAYER_ORDER.forEach(category => {
    if (selections[category]) {
      if (typeof selections[category] === 'object' && !Array.isArray(selections[category])) {
        // For subcategories
        Object.values(selections[category]).forEach(sel => {
          if (sel && sel.img) {
            const img = document.createElement('img');
            img.src = sel.img;
            img.className = 'avatar-layer';
            preview.appendChild(img);
          }
        });
      } else if (selections[category].img) {
        // For characters
        const img = document.createElement('img');
        img.src = selections[category].img;
        img.className = 'avatar-layer';
        preview.appendChild(img);
      }
    }
  });
}

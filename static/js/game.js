const player = document.getElementById('player-avatar');
const map = document.getElementById('game-map');

// Avatar config
const AVATAR_SIZE = 64;  
const NUM_NPCS = 5;
const npcElements = [];
let spriteData = null;

// Fetch sprite data and spawn NPCs
fetch('/get_sprites')
  .then(res => res.json())
  .then(data => {
    spriteData = data;
    spawnNpcs();
    setPlayerFrame(); 
  });

// --- SPAWN NPCs ---
function spawnNpcs() {
  for (let i = 0; i < NUM_NPCS; i++) {
    const npcDiv = document.createElement('div');
    npcDiv.className = 'npc-avatar';
    npcDiv.style.width = `${AVATAR_SIZE}px`;
    npcDiv.style.height = `${AVATAR_SIZE}px`;

    // Generate a random avatar and render its layers
    const npcAvatar = randomNpcAvatar(spriteData);
    renderAvatarLayers(npcDiv, npcAvatar);

    // Set random initial position
    const pos = getRandomPosition();
    npcDiv.style.position = 'absolute';
    npcDiv.style.left = pos.x + 'px';
    npcDiv.style.top = pos.y + 'px';

    map.appendChild(npcDiv);
    npcElements.push(npcDiv);
  }
}

// --- RENDER LAYERED AVATAR ---
function renderAvatarLayers(container, avatar) {
  container.innerHTML = ''; 
  if (avatar.characters && avatar.characters.img) {
    const charImg = document.createElement('img');
    charImg.src = avatar.characters.img;
    charImg.className = 'avatar-layer';
    charImg.style.width = `${AVATAR_SIZE}px`;
    charImg.style.height = `${AVATAR_SIZE}px`;
    container.appendChild(charImg);
  }
  // Clothes, hair, face, acc
  ['clothes', 'hair', 'face', 'acc'].forEach(category => {
    if (avatar[category]) {
      Object.values(avatar[category]).forEach(sel => {
        if (sel && sel.img) {
          const img = document.createElement('img');
          img.src = sel.img;
          img.className = 'avatar-layer';
          img.style.width = `${AVATAR_SIZE}px`;
          img.style.height = `${AVATAR_SIZE}px`;
          img.onerror = function() { this.style.display = 'none'; };
          container.appendChild(img);
        }
      });
    }
  });
}

// --- ENSURE PLAYER LAYER SIZES ---
function setPlayerFrame() {
  setLayeredSpriteFrame(player);
}
function setLayeredSpriteFrame(container) {
  const layers = container.querySelectorAll('img');
  layers.forEach(img => {
    img.style.width = `${AVATAR_SIZE}px`;
    img.style.height = `${AVATAR_SIZE}px`;
    img.style.objectFit = 'contain';
    img.style.objectPosition = 'center';
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.pointerEvents = 'none';
    img.style.imageRendering = 'pixelated';
  });
}

// --- PLAYER MOVEMENT LOGIC ---
let x = 16, y = 16;
function movePlayerTo(newX, newY) {
  x = Math.max(0, Math.min(newX, map.offsetWidth - AVATAR_SIZE));
  y = Math.max(0, Math.min(newY, map.offsetHeight - AVATAR_SIZE));
  player.style.left = x + "px";
  player.style.top = y + "px";
}

// Keyboard move
document.addEventListener('keydown', function(e) {
  let moved = false;
  if (e.key === "ArrowRight") { x += 10; moved = true; }
  if (e.key === "ArrowLeft")  { x -= 10; moved = true; }
  if (e.key === "ArrowUp")    { y -= 10; moved = true; }
  if (e.key === "ArrowDown")  { y += 10; moved = true; }
  if (moved) movePlayerTo(x, y);
});

// Click-to-move
map.addEventListener('click', function(e) {
  if (e.target.classList.contains('map-area-btn')) return;
  const rect = map.getBoundingClientRect();
  let destX = e.clientX - rect.left - AVATAR_SIZE / 2;
  let destY = e.clientY - rect.top - AVATAR_SIZE / 2;
  movePlayerTo(destX, destY);
});

// --- RANDOM NPC GENERATION ---
function getRandomPosition() {
  const x = Math.random() * (map.offsetWidth - AVATAR_SIZE);
  const y = Math.random() * (map.offsetHeight - AVATAR_SIZE);
  return { x, y };
}
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomNpcAvatar(spriteData) {
  const avatar = {};

  // --- Always a base character ---
  if (spriteData.characters && spriteData.characters.length > 0) {
    const char = getRandomElement(spriteData.characters);
    avatar.characters = { name: char.name, img: char.img };
  }

  // --- Dress OR Shirt+Pants ---
  avatar.clothes = {};

  // Try to give a dress (50% chance)
  let hasDress = false;
  if (spriteData.clothes && spriteData.clothes.dress && spriteData.clothes.dress.length > 0 && Math.random() < 0.5) {
    const dress = getRandomElement(spriteData.clothes.dress);
    avatar.clothes.dress = { name: dress.name, img: dress.img };
    hasDress = true;
  }

  // If not dress, ALWAYS give shirt AND pants/skirt
  if (!hasDress && spriteData.clothes) {
    // Shirt (basic)
    if (spriteData.clothes.basic && spriteData.clothes.basic.length > 0) {
      const shirt = getRandomElement(spriteData.clothes.basic);
      avatar.clothes.basic = { name: shirt.name, img: shirt.img };
    }
    // Pants (or skirt as fallback)
    if (spriteData.clothes.pants && spriteData.clothes.pants.length > 0) {
      const pants = getRandomElement(spriteData.clothes.pants);
      avatar.clothes.pants = { name: pants.name, img: pants.img };
    } else if (spriteData.clothes.skirts && spriteData.clothes.skirts.length > 0) {
      const skirt = getRandomElement(spriteData.clothes.skirts);
      avatar.clothes.skirts = { name: skirt.name, img: skirt.img };
    }
  }

 
  if (spriteData.hair) {
    const subcats = Object.keys(spriteData.hair);
    if (subcats.length > 0) {
      const randSubcat = getRandomElement(subcats);
      const options = spriteData.hair[randSubcat];
      if (options && options.length > 0) {
        avatar.hair = {};
        const randOpt = getRandomElement(options);
        avatar.hair[randSubcat] = { name: randOpt.name, img: randOpt.img };
      }
    }
  }

 
  if (spriteData.face) {
    const subcats = Object.keys(spriteData.face);
    if (subcats.length > 0) {
      const randSubcat = getRandomElement(subcats);
      const options = spriteData.face[randSubcat];
      if (options && options.length > 0) {
        avatar.face = {};
        const randOpt = getRandomElement(options);
        avatar.face[randSubcat] = { name: randOpt.name, img: randOpt.img };
      }
    }
  }

  // --- Accessories  ---
  if (spriteData.acc) {
    const subcats = Object.keys(spriteData.acc);
    if (subcats.length > 0) {
      const randSubcat = getRandomElement(subcats);
      const options = spriteData.acc[randSubcat];
      if (options && options.length > 0) {
        avatar.acc = {};
        const randOpt = getRandomElement(options);
        avatar.acc[randSubcat] = { name: randOpt.name, img: randOpt.img };
      }
    }
  }

  // --- Shoes ---
  if (spriteData.clothes && spriteData.clothes.shoes && spriteData.clothes.shoes.length > 0) {
    const shoes = getRandomElement(spriteData.clothes.shoes);
    avatar.clothes.shoes = { name: shoes.name, img: shoes.img };
  }

  return avatar;
}


// --- ANIMATE NPCs ---
function moveNpc(npcDiv) {
  const currentLeft = parseFloat(npcDiv.style.left);
  const currentTop = parseFloat(npcDiv.style.top);
  const moveDistance = 32;
  let newLeft = currentLeft;
  let newTop = currentTop;
  if (Math.random() < 0.5) {
    if (Math.random() < 0.5) {
      newLeft = Math.max(0, Math.min(currentLeft + moveDistance, map.offsetWidth - AVATAR_SIZE));
    } else {
      newLeft = Math.max(0, Math.min(currentLeft - moveDistance, map.offsetWidth - AVATAR_SIZE));
    }
  } else {
    if (Math.random() < 0.5) {
      newTop = Math.max(0, Math.min(currentTop + moveDistance, map.offsetHeight - AVATAR_SIZE));
    } else {
      newTop = Math.max(0, Math.min(currentTop - moveDistance, map.offsetHeight - AVATAR_SIZE));
    }
  }
  npcDiv.style.transition = 'left 1.2s linear, top 1.2s linear';
  npcDiv.style.left = newLeft + 'px';
  npcDiv.style.top = newTop + 'px';
}
setInterval(() => {
  npcElements.forEach(moveNpc);
}, 5000);

// --- INIT PLAYER LAYER SIZES ON LOAD ---
window.addEventListener('DOMContentLoaded', setPlayerFrame);

// --- Sound setup ---
window.onload = function() {
  const bgm = document.getElementById('bgm');
  if (bgm) bgm.volume = 0.3;
};

// --- Mission Buttons  ---
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.map-area-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const mission = btn.getAttribute('data-mission');
      if (mission) startMission(mission);
    });
  });
});
function startMission(location) {
  window.location.href = `/mission/${location}`;
}

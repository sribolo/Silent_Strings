const player = document.getElementById('player-avatar');
const map = document.getElementById('game-map');

// Avatar config
const AVATAR_SIZE = 64;  // Change to 96 if you want bigger avatars!
const NUM_NPCS = 5;
const npcElements = [];
let spriteData = null;

// Fetch sprite data and spawn NPCs
fetch('/get_sprites')
  .then(res => res.json())
  .then(data => {
    spriteData = data;
    spawnNpcs();
    setPlayerFrame(); // Ensure correct size for player layers
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
  container.innerHTML = ''; // Clear existing
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
  // Characters (flat array)
  if (spriteData.characters && spriteData.characters.length > 0) {
    const char = getRandomElement(spriteData.characters);
    avatar.characters = { name: char.name, img: char.img };
  }
  // Clothes, hair, face, acc (basic logic)
  ['clothes', 'hair', 'face', 'acc'].forEach(category => {
    if (spriteData[category]) {
      const subcats = Object.keys(spriteData[category]);
      if (subcats.length > 0) {
        const randSubcat = getRandomElement(subcats);
        const options = spriteData[category][randSubcat];
        if (options && options.length > 0) {
          avatar[category] = {};
          const randOpt = getRandomElement(options);
          avatar[category][randSubcat] = { name: randOpt.name, img: randOpt.img };
        }
      }
    }
  });
  return avatar;
}

// --- ANIMATE NPCs (optional, you can comment this out if not wanted) ---
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

// --- OPTIONAL: Sound setup ---
window.onload = function() {
  const bgm = document.getElementById('bgm');
  if (bgm) bgm.volume = 0.3;
};

// --- Mission Buttons (if you have them) ---
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

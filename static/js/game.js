const player = document.getElementById('player-avatar');
const map = document.getElementById('game-map');

// Sprite sheet config
const SPRITE_SIZE = 64;
const FRAMES = 8;
const ROWS = 4; // down, left, right, up

let x = 500, y = 300; // Start pos
let direction = 0; // 0=down, 1=left, 2=right, 3=up
let frame = 0;
let animInterval = null;

// Number of NPCs to spawn
const NUM_NPCS = 5;
const npcAvatars = [];
const npcElements = [];

let spriteData = null;

fetch('/get_sprites')
  .then(res => res.json())
  .then(data => {
    spriteData = data;
    spawnNpcs();
  });

function spawnNpcs() {
  for (let i = 0; i < NUM_NPCS; i++) {
    const npcDiv = document.createElement('div');
    npcDiv.className = 'npc-avatar';
    npcDiv.style.width = '64px';
    npcDiv.style.height = '64px';

    // Generate a random avatar
    const npcAvatar = randomNpcAvatar(spriteData);

    // Render character base
    if (npcAvatar.characters && npcAvatar.characters.img) {
      const charImg = document.createElement('img');
      charImg.src = npcAvatar.characters.img;
      charImg.className = 'avatar-layer';
      charImg.style.width = '64px';
      charImg.style.height = '64px';
      npcDiv.appendChild(charImg);
    }

    // Render other layers
    ['clothes', 'hair', 'face', 'acc'].forEach(category => {
      if (npcAvatar[category]) {
        Object.values(npcAvatar[category]).forEach(sel => {
          if (sel && sel.img) {
            const img = document.createElement('img');
            img.src = sel.img;
            img.className = 'avatar-layer';
            img.style.width = '64px';
            img.style.height = '64px';
            img.onerror = function() { this.style.display = 'none'; };
            npcDiv.appendChild(img);
          }
        });
      }
    });

    // Set initial position
    const pos = getRandomPosition();
    npcDiv.style.position = 'absolute';
    npcDiv.style.left = pos.x + 'px';
    npcDiv.style.top = pos.y + 'px';

    map.appendChild(npcDiv);
    npcElements.push(npcDiv);
  }
}

// Animate a layered sprite (player or NPC)
function setLayeredSpriteFrame(container, direction, frame) {
  // container: the div containing the avatar layers (e.g., #player-avatar)
  // direction: 0=down, 1=left, 2=right, 3=up
  // frame: 0-7
  const layers = container.querySelectorAll('img');
  layers.forEach(img => {
    img.style.objectFit = 'none';
    img.style.objectPosition = `-${frame * SPRITE_SIZE}px -${direction * SPRITE_SIZE}px`;
  });
}

// Helper: Set sprite sheet background position (for layered sprite)
function setPlayerFrame(dir, frame) {
  setLayeredSpriteFrame(player, dir, frame);
}

// Animate walking (for layered sprite)
function animateWalk(dir) {
  clearInterval(animInterval);
  frame = 0;
  setPlayerFrame(dir, frame);
  animInterval = setInterval(() => {
    frame = (frame + 1) % FRAMES;
    setPlayerFrame(dir, frame);
  }, 200); // Slower animation speed
}

document.addEventListener('keydown', function(e) {
  let moved = false;
  if (e.key === "ArrowRight") { x += 10; direction = 2; moved = true; }
  if (e.key === "ArrowLeft")  { x -= 10; direction = 1; moved = true; }
  if (e.key === "ArrowUp")    { y -= 10; direction = 3; moved = true; }
  if (e.key === "ArrowDown")  { y += 10; direction = 0; moved = true; }
  if (moved) {
    x = Math.max(0, Math.min(x, map.offsetWidth - SPRITE_SIZE));
    y = Math.max(0, Math.min(y, map.offsetHeight - SPRITE_SIZE));
    player.style.left = x + "px";
    player.style.top = y + "px";
    animateWalk(direction);
    setTimeout(() => { clearInterval(animInterval); setPlayerFrame(direction, 0); }, 700); // Slower stop
  }
});

// Click/tap to move with animation
map.addEventListener('click', function(e) {
  // Ignore clicks on buttons
  if (e.target.classList.contains('map-area-btn')) return;
  const rect = map.getBoundingClientRect();
  let destX = e.clientX - rect.left - SPRITE_SIZE / 2;
  let destY = e.clientY - rect.top - SPRITE_SIZE / 2;
  destX = Math.max(0, Math.min(destX, map.offsetWidth - SPRITE_SIZE));
  destY = Math.max(0, Math.min(destY, map.offsetHeight - SPRITE_SIZE));
  // Direction calculation
  let dx = destX - x, dy = destY - y;
  if (Math.abs(dx) > Math.abs(dy)) direction = dx > 0 ? 2 : 1;
  else direction = dy > 0 ? 0 : 3;
  animateWalk(direction);
  // Move
  player.style.transition = "top 0.5s linear, left 0.5s linear";
  player.style.left = destX + "px";
  player.style.top = destY + "px";
  x = destX; y = destY;
  setTimeout(() => { clearInterval(animInterval); setPlayerFrame(direction, 0); player.style.transition = ""; }, 600);
});

// Start mission on button click
function startMission(location) {
  console.log("Starting mission for location:", location);
  window.location.href = `/mission/${location}`;
}

// Initialize standing frame
setPlayerFrame(direction, 0);

window.onload = function() {
  const bgm = document.getElementById('bgm');
  bgm.volume = 0.3; // Set volume (0.0 to 1.0)
  // bgm.play(); // If you want to trigger play via JS
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.map-area-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const mission = btn.getAttribute('data-mission');
            if (mission) startMission(mission);
        });
    });
});

// Helper: get random position within map bounds
function getRandomPosition() {
  const mapRect = map.getBoundingClientRect();
  const x = Math.random() * (map.offsetWidth - 32);
  const y = Math.random() * (map.offsetHeight - 32);
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

  // Other categories (grouped by subcat)
  ['clothes', 'hair', 'face', 'acc'].forEach(category => {
    const subcats = spriteData[category];
    if (subcats && Object.keys(subcats).length > 0) {
      const subcatNames = Object.keys(subcats);
      const subcat = getRandomElement(subcatNames);
      const options = subcats[subcat];
      if (options && options.length > 0) {
        const part = getRandomElement(options);
        if (!avatar[category]) avatar[category] = {};
        avatar[category][subcat] = { name: part.name, img: part.img };
      }
    }
  });

  return avatar;
}

// Animate NPCs
function moveNpc(npcDiv) {
  const currentLeft = parseFloat(npcDiv.style.left);
  const currentTop = parseFloat(npcDiv.style.top);
  const moveDistance = 32; // move by one tile (adjust as needed)
  let newLeft = currentLeft;
  let newTop = currentTop;
  // Randomly choose to move horizontally or vertically
  if (Math.random() < 0.5) {
    // Move horizontally
    if (Math.random() < 0.5) {
      newLeft = Math.max(0, Math.min(currentLeft + moveDistance, map.offsetWidth - SPRITE_SIZE));
    } else {
      newLeft = Math.max(0, Math.min(currentLeft - moveDistance, map.offsetWidth - SPRITE_SIZE));
    }
  } else {
    // Move vertically
    if (Math.random() < 0.5) {
      newTop = Math.max(0, Math.min(currentTop + moveDistance, map.offsetHeight - SPRITE_SIZE));
    } else {
      newTop = Math.max(0, Math.min(currentTop - moveDistance, map.offsetHeight - SPRITE_SIZE));
    }
  }
  npcDiv.style.transition = 'left 1.2s linear, top 1.2s linear';
  npcDiv.style.left = newLeft + 'px';
  npcDiv.style.top = newTop + 'px';
}

// Move all NPCs every few seconds
setInterval(() => {
  npcElements.forEach(moveNpc);
}, 5000); // Slower movement
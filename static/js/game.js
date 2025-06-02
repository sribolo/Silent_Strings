const player = document.getElementById('player-avatar');
const map = document.getElementById('game-map');

// Sprite sheet config
const SPRITE_SIZE = 32;
const FRAMES = 16;
const ROWS = 4; // down, left, right, up

let x = 500, y = 300; // Start pos
let direction = 0; // 0=down, 1=left, 2=right, 3=up
let frame = 0;
let animInterval = null;

// Number of NPCs to spawn
const NUM_NPCS = 5;
const npcAvatars = [];
const npcElements = [];

// Fallback NPC character images (add your actual character PNGs here)
const fallbackNpcCharacters = [
  '/static/images/avatar_parts/characters/char1.png',
  '/static/images/avatar_parts/characters/char2.png',
  '/static/images/avatar_parts/characters/char3.png',
  '/static/images/avatar_parts/characters/char4.png',
  '/static/images/avatar_parts/characters/char5.png'
];
const fallbackNpcClothes = [
  '/static/images/avatar_parts/clothes/default/clothes1.png',
  '/static/images/avatar_parts/clothes/default/clothes2.png',
  // ...
];
const fallbackNpcHair = [
  '/static/images/avatar_parts/hair/default/hair1.png',
  '/static/images/avatar_parts/hair/default/hair2.png',
  // ...
];
// Add arrays for face, acc, etc. as needed

// Helper: Set sprite sheet background position
function setPlayerFrame(dir, frame) {
  player.style.backgroundPosition = `-${frame*SPRITE_SIZE}px -${dir*SPRITE_SIZE}px`;
}

// Animate walking
function animateWalk(dir) {
  clearInterval(animInterval);
  frame = 0;
  setPlayerFrame(dir, frame);
  animInterval = setInterval(() => {
    frame = (frame + 1) % FRAMES;
    setPlayerFrame(dir, frame);
  }, 100); // Adjust animation speed
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
    setTimeout(() => { clearInterval(animInterval); setPlayerFrame(direction, 0); }, 400);
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

function randomizeNpcAvatar() {
  // Use spriteData if available, otherwise fallback
  if (typeof spriteData !== 'undefined' && spriteData.characters && spriteData.characters.length > 0) {
    const idx = Math.floor(Math.random() * spriteData.characters.length);
    return spriteData.characters[idx].img;
  } else {
    const idx = Math.floor(Math.random() * fallbackNpcCharacters.length);
    return fallbackNpcCharacters[idx];
  }
}

// Spawn NPCs
for (let i = 0; i < NUM_NPCS; i++) {
  const npcDiv = document.createElement('div');
  npcDiv.className = 'npc-avatar';

  // Character base
  const charImg = document.createElement('img');
  charImg.src = fallbackNpcCharacters[Math.floor(Math.random() * fallbackNpcCharacters.length)];
  charImg.className = 'avatar-layer';
  npcDiv.appendChild(charImg);

  // Clothes
  const clothesImg = document.createElement('img');
  clothesImg.src = fallbackNpcClothes[Math.floor(Math.random() * fallbackNpcClothes.length)];
  clothesImg.className = 'avatar-layer';
  npcDiv.appendChild(clothesImg);

  // Hair
  const hairImg = document.createElement('img');
  hairImg.src = fallbackNpcHair[Math.floor(Math.random() * fallbackNpcHair.length)];
  hairImg.className = 'avatar-layer';
  npcDiv.appendChild(hairImg);

  // ...repeat for face, acc, etc.

  // Set initial position
  const pos = getRandomPosition();
  npcDiv.style.position = 'absolute';
  npcDiv.style.left = pos.x + 'px';
  npcDiv.style.top = pos.y + 'px';

  map.appendChild(npcDiv);
  npcElements.push(npcDiv);
}

// Animate NPCs
function moveNpc(npcDiv) {
  const pos = getRandomPosition();
  npcDiv.style.transition = 'left 2s linear, top 2s linear';
  npcDiv.style.left = pos.x + 'px';
  npcDiv.style.top = pos.y + 'px';
}

// Move all NPCs every few seconds
setInterval(() => {
  npcElements.forEach(moveNpc);
}, 3000);
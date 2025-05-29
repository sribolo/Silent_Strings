const player = document.getElementById('player-avatar');
const map = document.getElementById('game-map');

// Sprite sheet config
const SPRITE_SIZE = 32;
const FRAMES = 8;
const ROWS = 4; // down, left, right, up

let x = 500, y = 300; // Start pos
let direction = 0; // 0=down, 1=left, 2=right, 3=up
let frame = 0;
let animInterval = null;

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

// Keyboard move
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
  alert("Start mission at: " + location); // Replace with actual modal or page navigation
}

// Initialize standing frame
setPlayerFrame(direction, 0);

const player = document.getElementById('player-avatar');
const map = document.getElementById('game-map');
const mapImg = document.getElementById('map-bg');

const SPRITE_SIZE = 64;
const FRAMES = 8;
const ROWS = 4; // down, left, right, up

let x = 16, y = 16; // Start pos
let direction = 0; // 0=down, 1=left, 2=right, 3=up
let frame = 0;
let animInterval = null;

const NUM_NPCS = 5;
const npcAvatars = [];
const npcElements = [];

let spriteData = null;

// --- NEW: Calculate the visible map image area ---
function getMapImageRect() {
  const mapRect = map.getBoundingClientRect();
  const imgRect = mapImg.getBoundingClientRect();
  return {
    left: imgRect.left - mapRect.left,
    top: imgRect.top - mapRect.top,
    right: imgRect.right - mapRect.left,
    bottom: imgRect.bottom - mapRect.top,
    width: imgRect.width,
    height: imgRect.height
  };
}

// Helper: Clamp x/y to map image area
function clampToMapArea(x, y) {
  const bounds = getMapImageRect();
  x = Math.max(bounds.left, Math.min(x, bounds.right - SPRITE_SIZE));
  y = Math.max(bounds.top, Math.min(y, bounds.bottom - SPRITE_SIZE));
  return {x, y};
}

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
  const layers = container.querySelectorAll('img');
  layers.forEach(img => {
    img.style.objectFit = 'none';
    img.style.objectPosition = `-${frame * SPRITE_SIZE}px -${direction * SPRITE_SIZE}px`;
  });
}

function setPlayerFrame(dir, frame) {
  setLayeredSpriteFrame(player, dir, frame);
}

function animateWalk(dir) {
  clearInterval(animInterval);
  frame = 0;
  setPlayerFrame(dir, frame);
  animInterval = setInterval(() => {
    frame = (frame + 1) % FRAMES;
    setPlayerFrame(dir, frame);
  }, 200);
}

document.addEventListener('keydown', function(e) {
  let moved = false;
  if (e.key === "ArrowRight") { x += 10; direction = 2; moved = true; }
  if (e.key === "ArrowLeft")  { x -= 10; direction = 1; moved = true; }
  if (e.key === "ArrowUp")    { y -= 10; direction = 3; moved = true; }
  if (e.key === "ArrowDown")  { y += 10; direction = 0; moved = true; }
  if (moved) {
    const clamped = clampToMapArea(x, y);
    x = clamped.x;
    y = clamped.y;
    player.style.left = x + "px";
    player.style.top = y + "px";
    animateWalk(direction);
    setTimeout(() => { clearInterval(animInterval); setPlayerFrame(direction, 0); }, 700);
  }
});

map.addEventListener('click', function(e) {
  if (e.target.classList.contains('map-area-btn')) return;
  const rect = map.getBoundingClientRect();
  let destX = e.clientX - rect.left - SPRITE_SIZE / 2;
  let destY = e.clientY - rect.top - SPRITE_SIZE / 2;
  const clamped = clampToMapArea(destX, destY);
  destX = clamped.x;
  destY = clamped.y;
  let dx = destX - x, dy = destY - y;
  if (Math.abs(dx) > Math.abs(dy)) direction = dx > 0 ? 2 : 1;
  else direction = dy > 0 ? 0 : 3;
  animateWalk(direction);
  player.style.transition = "top 0.5s linear, left 0.5s linear";
  player.style.left = destX + "px";
  player.style.top = destY + "px";
  x = destX; y = destY;
  setTimeout(() => { clearInterval(animInterval); setPlayerFrame(direction, 0); player.style.transition = ""; }, 600);
});

function startMission(location) {
  console.log("Starting mission for location:", location);
  window.location.href = `/mission/${location}`;
}

setPlayerFrame(direction, 0);

window.onload = function() {
  const bgm = document.getElementById('bgm');
  if (bgm) bgm.volume = 0.3;
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.map-area-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const mission = btn.getAttribute('data-mission');
            if (mission) startMission(mission);
        });
    });
});

// Updated: Clamp NPCs to visible area!
function getRandomPosition() {
  const bounds = getMapImageRect();
  const x = Math.random() * (bounds.width - SPRITE_SIZE) + bounds.left;
  const y = Math.random() * (bounds.height - SPRITE_SIZE) + bounds.top;
  return { x, y };
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNpcAvatar(spriteData) {
  // ... no change (same as before) ...
  const avatar = {};

  if (spriteData.characters && spriteData.characters.length > 0) {
    const char = getRandomElement(spriteData.characters);
    avatar.characters = { name: char.name, img: char.img };
  }
  if (spriteData.clothes) {
    const subcats = Object.keys(spriteData.clothes);
    if (subcats.includes('shoes')) {
      const shoesOptions = spriteData.clothes['shoes'];
      if (shoesOptions && shoesOptions.length > 0) {
        if (!avatar.clothes) avatar.clothes = {};
        const randShoes = getRandomElement(shoesOptions);
        avatar.clothes['shoes'] = { name: randShoes.name, img: randShoes.img };
      }
    }
    if (subcats.includes('dress')) {
      const dressOptions = spriteData.clothes['dress'];
      if (dressOptions && dressOptions.length > 0 && Math.random() < 0.5) {
        if (!avatar.clothes) avatar.clothes = {};
        const randDress = getRandomElement(dressOptions);
        avatar.clothes['dress'] = { name: randDress.name, img: randDress.img };
      } else {
        if (subcats.includes('skirts')) {
          const skirtOptions = spriteData.clothes['skirts'];
          if (skirtOptions && skirtOptions.length > 0 && Math.random() < 0.5) {
            if (!avatar.clothes) avatar.clothes = {};
            const randSkirt = getRandomElement(skirtOptions);
            avatar.clothes['skirts'] = { name: randSkirt.name, img: randSkirt.img };
            if (subcats.includes('basic')) {
              const shirtOptions = spriteData.clothes['basic'];
              if (shirtOptions && shirtOptions.length > 0) {
                const randShirt = getRandomElement(shirtOptions);
                avatar.clothes['basic'] = { name: randShirt.name, img: randShirt.img };
              }
            }
          } else {
            if (subcats.includes('basic')) {
              const shirtOptions = spriteData.clothes['basic'];
              if (shirtOptions && shirtOptions.length > 0) {
                if (!avatar.clothes) avatar.clothes = {};
                const randShirt = getRandomElement(shirtOptions);
                avatar.clothes['basic'] = { name: randShirt.name, img: randShirt.img };
                if (subcats.includes('pants')) {
                  const pantOptions = spriteData.clothes['pants'];
                  if (pantOptions && pantOptions.length > 0) {
                    const randPant = getRandomElement(pantOptions);
                    avatar.clothes['pants'] = { name: randPant.name, img: randPant.img };
                  }
                }
              }
            }
          }
        } else {
          if (subcats.includes('basic')) {
            const shirtOptions = spriteData.clothes['basic'];
            if (shirtOptions && shirtOptions.length > 0) {
              if (!avatar.clothes) avatar.clothes = {};
              const randShirt = getRandomElement(shirtOptions);
              avatar.clothes['basic'] = { name: randShirt.name, img: randShirt.img };
              if (subcats.includes('pants')) {
                const pantOptions = spriteData.clothes['pants'];
                if (pantOptions && pantOptions.length > 0) {
                  const randPant = getRandomElement(pantOptions);
                  avatar.clothes['pants'] = { name: randPant.name, img: randPant.img };
                }
              }
            }
          }
        }
      }
    } else if (subcats.includes('skirts')) {
      const skirtOptions = spriteData.clothes['skirts'];
      if (skirtOptions && skirtOptions.length > 0 && Math.random() < 0.5) {
        if (!avatar.clothes) avatar.clothes = {};
        const randSkirt = getRandomElement(skirtOptions);
        avatar.clothes['skirts'] = { name: randSkirt.name, img: randSkirt.img };
        if (subcats.includes('basic')) {
          const shirtOptions = spriteData.clothes['basic'];
          if (shirtOptions && shirtOptions.length > 0) {
            const randShirt = getRandomElement(shirtOptions);
            avatar.clothes['basic'] = { name: randShirt.name, img: randShirt.img };
          }
        }
      } else {
        if (subcats.includes('basic')) {
          const shirtOptions = spriteData.clothes['basic'];
          if (shirtOptions && shirtOptions.length > 0) {
            if (!avatar.clothes) avatar.clothes = {};
            const randShirt = getRandomElement(shirtOptions);
            avatar.clothes['basic'] = { name: randShirt.name, img: randShirt.img };
            if (subcats.includes('pants')) {
              const pantOptions = spriteData.clothes['pants'];
              if (pantOptions && pantOptions.length > 0) {
                const randPant = getRandomElement(pantOptions);
                avatar.clothes['pants'] = { name: randPant.name, img: randPant.img };
              }
            }
          }
        }
      }
    } else {
      if (subcats.includes('basic')) {
        const shirtOptions = spriteData.clothes['basic'];
        if (shirtOptions && shirtOptions.length > 0) {
          if (!avatar.clothes) avatar.clothes = {};
          const randShirt = getRandomElement(shirtOptions);
          avatar.clothes['basic'] = { name: randShirt.name, img: randShirt.img };
          if (subcats.includes('pants')) {
            const pantOptions = spriteData.clothes['pants'];
            if (pantOptions && pantOptions.length > 0) {
              const randPant = getRandomElement(pantOptions);
              avatar.clothes['pants'] = { name: randPant.name, img: randPant.img };
            }
          }
        }
      }
    }
  }

  ['hair', 'face', 'acc'].forEach(category => {
    if (spriteData[category]) {
      const subcats = Object.keys(spriteData[category]);
      if (subcats.length > 0) {
        let validSubcats = subcats.filter(subcat => (spriteData[category][subcat] && spriteData[category][subcat].length > 0));
        if (validSubcats.length === 0) return;
        const randSubcat = getRandomElement(validSubcats);
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

// Clamp NPC movement to visible map area!
function moveNpc(npcDiv) {
  const currentLeft = parseFloat(npcDiv.style.left);
  const currentTop = parseFloat(npcDiv.style.top);
  const moveDistance = 32;
  let newLeft = currentLeft;
  let newTop = currentTop;

  if (Math.random() < 0.5) {
    if (Math.random() < 0.5) {
      newLeft = currentLeft + moveDistance;
    } else {
      newLeft = currentLeft - moveDistance;
    }
  } else {
    if (Math.random() < 0.5) {
      newTop = currentTop + moveDistance;
    } else {
      newTop = currentTop - moveDistance;
    }
  }
  // Clamp NPC to visible area!
  const clamped = clampToMapArea(newLeft, newTop);
  npcDiv.style.transition = 'left 1.2s linear, top 1.2s linear';
  npcDiv.style.left = clamped.x + 'px';
  npcDiv.style.top = clamped.y + 'px';
}

setInterval(() => {
  npcElements.forEach(moveNpc);
}, 5000);

// Optional: re-clamp all after resize
window.addEventListener('resize', () => {
  // Re-clamp player
  const clamped = clampToMapArea(x, y);
  x = clamped.x;
  y = clamped.y;
  player.style.left = x + "px";
  player.style.top = y + "px";
  // Re-clamp NPCs
  npcElements.forEach(npcDiv => {
    const left = parseFloat(npcDiv.style.left);
    const top = parseFloat(npcDiv.style.top);
    const npcClamped = clampToMapArea(left, top);
    npcDiv.style.left = npcClamped.x + "px";
    npcDiv.style.top = npcClamped.y + "px";
  });
});

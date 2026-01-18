const pLayer = document.getElementById("p");
const pLayerChildren = pLayer.children;

function moveCamera(dt) {
  const worldMoveSpeed = gridSpacesToPixels(1) * speed[gameSpeed].game * speedMultiplier * timeWarp * dt;
  camera.targetX += worldMoveSpeed;
}

function clampCameraTargets() {
  camera.targetX = Math.max(camera.minX, camera.targetX);
  camera.targetY = Math.max(camera.minY, camera.targetY);
}

function updateCamera(dt) {
  clampCameraTargets();

  camera.x = camera.targetX;
  camera.velocityX = 0;

  const stiffnessY = 80;
  const dampingY = 0.8;

  let dy = camera.targetY - camera.y;
  camera.velocityY += dy * stiffnessY * dt;
  camera.velocityY *= dampingY;
  camera.y += camera.velocityY * dt;

  camera.x = Math.max(camera.minX, camera.x);
  camera.y = Math.max(camera.minY, camera.y);
}

const world = document.getElementById("world");

function moveWorld() {
  world.style.transform =
    `translate(${-camera.x}px, ${camera.y}px)`;
}

let lastCameraX = camera.x;
let lastCameraY = camera.y;

function moveGroundAndGameBg() {
  // Camera deltas
  const cameraDeltaX = camera.x - lastCameraX;
  const cameraDeltaY = camera.y - lastCameraY;

  lastCameraX = camera.x;
  lastCameraY = camera.y;

  scrollX -= cameraDeltaX;
  scrollY -= cameraDeltaY;

  // Ground
  groundLower.style.backgroundPositionX =
    `${scrollX}px`;
  groundUpper.style.backgroundPositionX =
    `${scrollX}px`;
  groundLower.style.transform = `translateY(calc(14dvh - ${scrollY}px))`;
  groundLowerLine.style.transform = `translateY(calc(14dvh + 0.3dvh - ${scrollY}px))`;
  groundLowerShadowLeft.style.transform = `translateY(calc(14dvh - ${scrollY}px))`;
  groundLowerShadowRight.style.transform = `translateY(calc(14dvh - ${scrollY}px)) scaleX(-1)`;

  // Background
  gameBg.style.backgroundPosition =
    `${scrollX * gameBgSpeed}px calc(100% - ${scrollY * gameBgSpeed}px)`;
}

function movePlayer() {
  Array.from(pLayerChildren).forEach(child => {
    child.style.transform = `translateX(${camera.x}px)`;
  });
}

let lastFrame = performance.now();

function gameLoop(now) {
  const dt = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;

  updateCamera(dt);
  moveWorld();

  gCubeBig = gridSpacesToPixels(87);
  terminalVCubeBig = gridSpacesToPixels(25.9);
  updateJumpVelocity();

  updateGround();

  updatePlayer(dt);
  rotateCube(dt);
  resetCubeRotation(dt);
  setPlayerPosition();
  moveCamera(dt);
  
  moveGroundAndGameBg();
  movePlayer();

  updateDebugTrail(dt);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

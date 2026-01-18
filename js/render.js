function

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

function renderCamera() {
  world.style.transform =
    `translate(${-camera.x}px, ${camera.y}px)`;
}

let lastCameraX = camera.x;

function translateGround(dt) {
  // how much the camera moved this frame (px)
  const cameraDeltaX = camera.x - lastCameraX;
  lastCameraX = camera.x;

  // keep same speed relationship
  const speedPerPixel =
    gridSpacesToPixels(1) * speed[gameSpeed].game * speedMultiplier;

  // move texture only when camera moves
  scrollX -= cameraDeltaX * speedPerPixel * dt;

  groundLower.style.backgroundPositionX = scrollX + "px";
  groundUpper.style.backgroundPositionX = scrollX + "px";
}


let lastFrame = performance.now();

function gameLoop(now) {
  const dt = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;

  //updatePlayer(dt);
  updateCamera(dt);
  translateGround(dt);
  renderCamera();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

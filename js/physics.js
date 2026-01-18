const player = document.getElementById('player');
const cube = document.getElementById('cube');   

let groundY = '26dvh';
let groundYUpper = '0dvh';

let playerY = gridSpacesToPixels(0);

let v = 0;
let gCubeBig = gridSpacesToPixels(87);

let jumpVelocityCubeBig = Math.sqrt(2 * gCubeBig * gridSpacesToPixels(speed[gameSpeed].jumpHeightCubeBig[0]));

let terminalVCubeBig = gridSpacesToPixels(25.9);

const cubeRotationSpeed = 415; // deg/s
const cubeSlopeRotationSpeed = null; // coming soon

let cubeRotating = true;
let isJumping = false;
let consecutiveJumps = 0; // start at 0;

function updatePlayer(dt) {
    // terminal velocity
    if (v < terminalVCubeBig) {
        v += gCubeBig * dt * timeWarp;
    }

    playerY -= v  * dt * timeWarp * playerGravity;

    if (playerY < 0) {
        
        playerY = 0;
        v = 0;
        cubeRotating = false;
        
        if (!isJumping) {
            consecutiveJumps = 0;
        }
    }
}

function rotateCube(dt) {
    if (cubeRotating) {

        let playerStyle = window.getComputedStyle(cube);
        let currentRotation = parseFloat(playerStyle.rotate);
        currentRotation += cubeRotationSpeed * dt * timeWarp * playerGravity;

        cube.style.rotate = currentRotation + "deg";
    }       
}


function resetCubeRotation(dt){
    if (cubeRotating === false && playerY <= 0 && isJumping == false){

        let playerStyle = window.getComputedStyle(cube);
        let currentRotation = parseFloat(playerStyle.rotate);

        let closestRotation = Math.round(currentRotation/90) * 90

        if (currentRotation == closestRotation) {
            cube.style.transition = "bottom 500ms ease-in-out";
        }
        else{
            cube.style.transition = `bottom 500ms ease-in-out, ${100 / timeWarp}ms cubic-bezier(0,.44,.44,1)`;
            cube.style.rotate = closestRotation + "deg";            
        }

    }
}

function jump() {
  if (playerY === 0) {

    if (consecutiveJumps === 0) {
        consecutiveJumps = 1;
    } else if (isJumping) {
        consecutiveJumps += 1;
    } else {
        consecutiveJumps = 1;
    }

    cube.style.transition = 'none';
    
    const arrayIndex = (consecutiveJumps >= 2) ? 1 : 0;
    updateJumpVelocity(arrayIndex)

    v = -jumpVelocityCubeBig;
    cubeRotating = true;
  }
}

function updateJumpVelocity(speedIndex = 0){
    jumpVelocityCubeBig = Math.sqrt(2 * gCubeBig * gridSpacesToPixels(speed[gameSpeed].jumpHeightCubeBig[speedIndex]));
}

function setPlayerPosition() {
    player.style.bottom = `calc(${groundY} + ${playerY}px)`
}
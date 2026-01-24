import { easeOutCubic } from "./easing";
import { gameSpeed, speed } from "./game-variables";
import { jumpHeld } from "./key-states";
import { degToRad, radToDeg } from "./utils";

export let physics = {
    playerY: 10, // in grid spaces
    cubeRotation: 0, // in degrees
    v: 0,
    gCubeBig: 86,

    terminalVCubeBig: 25.9,

    cubeRotationSpeed: 400, // deg/s
    cubeSlopeRotationSpeed: null, // coming soon

    cubeRotating: true,
    isJumping: false,
    consecutiveJumps: 0,
    playerOffset: 2.5, // in grid spaces
    rotationResetting: false
} 

let resetStartTime = 0;
let resetDuration = 0.2; // in seconds (500ms)
let resetFrom = 0;
let resetTo = 0;


export let jumpVelocityCubeBig =  Math.sqrt(2 * physics.gCubeBig * speed[gameSpeed].jumpHeightCubeBig[0]);

export function updatePlayerY(dt) {

    if (physics.v < physics.terminalVCubeBig) { // terminal velocity
        physics.v += physics.gCubeBig * dt;
    }

    physics.playerY -= physics.v * dt;

    // Ground collision
    if (physics.playerY <= 0) {
        physics.playerY = 0;
        physics.v = 0;
        physics.cubeRotating = false;
        if (!physics.isJumping) {
            physics.consecutiveJumps = 0;
        }
        if (!jumpHeld) { // grounded
            if (!physics.rotationResetting) {
                physics.rotationResetting = true;
                resetStartTime = performance.now();
                resetFrom = radToDeg(physics.cubeRotation);
                resetTo = Math.round(resetFrom / 90) * 90;
            }
            else{resetCubeRotation(dt)}
            
        }
    }
}

export function rotateCube(dt) {
    if (physics.cubeRotating) {
        physics.cubeRotation += degToRad(physics.cubeRotationSpeed) * dt;
    }
}

export function resetCubeRotation() {
    
    if (!physics.rotationResetting) {
        console.log("YOU DO NOT BELONG HERE")
        return;
    } 

    const elapsed = (performance.now() - resetStartTime) / 1000;
    const t = Math.min(elapsed / resetDuration, 1);
    const eased = easeOutCubic(t);

    const angle =
        resetFrom + (resetTo - resetFrom) * eased;

    physics.cubeRotation = degToRad(angle);

    if (t === 1) {
        physics.rotationResetting = false;
        physics.cubeRotation = degToRad(resetTo);
    }
}


export function jump() {
    physics.rotationResetting = false;
    if (physics.playerY === 0) {

        if (physics.consecutiveJumps === 0) {
            physics.consecutiveJumps = 1;
        } else if (physics.isJumping) {
            physics.consecutiveJumps += 1;
        } else {
            physics.consecutiveJumps = 1;
        }
        
        const arrayIndex = (physics.consecutiveJumps >= 2) ? 1 : 0;
        updateJumpVelocity(arrayIndex);

        physics.v = -jumpVelocityCubeBig;
        physics.cubeRotating = true;
    }
}

export function updateJumpVelocity(speedIndex = 0){ // speedIndex = initial jump: 0, second jump: 1 (slightly higher)
    jumpVelocityCubeBig = Math.sqrt(2 * physics.gCubeBig * speed[gameSpeed].jumpHeightCubeBig[speedIndex]);
}
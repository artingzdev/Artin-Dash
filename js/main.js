var r = document.querySelector(':root');
const rootStyles = window.getComputedStyle(document.documentElement);

function gridSpacesToPixels(gridSpaces) {
    let pixelsConversion = (0.093 * window.innerHeight * gridSpaces)
    return pixelsConversion
}

function pixelsToDvh(px) {
  return ((px / window.innerHeight) * 100);
}

function dvhToPixels(dvh){
    return (dvh * window.innerHeight) / 100
}

let timeWarpAmount = 0.1;
let timeWarp = 1;

// Utilities
let drawDebugTrail = false;
let isSlowModeEnabled = false;

function updateTimeWarpAmount() {
    if (isSlowModeEnabled) {
        timeWarp = timeWarpAmount;
    }
    else{
        timeWarp = 1;
    }
    requestAnimationFrame(updateTimeWarpAmount);
}
requestAnimationFrame(updateTimeWarpAmount);

const speedMultiplier = 10.3854448;

const speed = [
    {// half speed ↓
        game: 0.806,
        jumpHeightCubeBig: [1.946, 2.003]
    }, 
    {// 1x speed ↓
        game: 1,
        jumpHeightCubeBig: [2.126, 2.206]
    }, 
    {// 2x speed ↓
        game: 1.243,
        jumpHeightCubeBig: [2.232, 2.316]
    }, 
    {// 3x speed ↓
        game: 1.502,
        jumpHeightCubeBig: [2.146, 2.227]
    }, 
    {// 4x speed ↓
        game: 1.849,
        jumpHeightCubeBig: [2.146, 2.227]

    } 
]

const camera = {
  y: 0,
  targetY: 0,
  velocityY: 0,

  x: 0,
  targetX: 0,
  velocityX: 0,

  minX: -gridSpacesToPixels(1),      // Leftmost allowed camera X (px)
  minY: 0       // Lowest allowed camera Y (px)
};


// 0 = Half speed
// 1 = Normal speed
// 2 = 2x speed
// 3 = 3x speed
// 4 = 4x speed
let gameSpeed = 1
let playerGravity = 1 // 1 = Normal -1 = Upside-down

const gameBgSpeed = 0.1;

let groundTexture = "01"; // 01 - 07
let groundColor = '#0066FF';
let lineColor = '#FFFFFF';
let lineBlendingEnabled = 'true';

let gameBgTexture = "01"; // 01 - 59
let gameBgColor = '#287DFF';
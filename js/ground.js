const groundLower = document.getElementById("groundLower");
const groundUpper = document.getElementById("groundUpper");

const groundLowerLine = document.getElementById("groundLowerLine");
const groundUpperLine = document.getElementById("groundUpperLine");

const groundLowerShadowLeft = document.getElementById('groundLowerShadowLeft');
const groundLowerShadowRight = document.getElementById('groundLowerShadowRight');
const groundUpperShadowLeft = document.getElementById('groundUpperShadowLeft');
const groundUpperShadowRight = document.getElementById('groundUpperShadowRight');

const debugTrail = document.getElementById("debug-trail")
let debugTrailOffset = 0; //px


function updateGround() {
    groundLower.style.backgroundImage = `url('resources/grounds/groundSquare_${groundTexture}_001-uhd.png')`;
    groundUpper.style.backgroundImage = `url('resources/grounds/groundSquare_${groundTexture}_001-uhd.png')`;
    r.style.setProperty('--ground-color', groundColor);
    groundLowerLine.style.backgroundImage = `linear-gradient(to right, rgba(255, 255, 255, 0), ${lineColor}, rgba(255, 255, 255, 0))`;
    groundUpperLine.style.backgroundImage = `linear-gradient(to right, rgba(255, 255, 255, 0), ${lineColor}, rgba(255, 255, 255, 0))`;
    if (lineBlendingEnabled) {
      groundLowerLine.style.mixBlendMode = 'plus-lighter';
      groundUpperLine.style.mixBlendMode = 'plus-lighter';
    }
    else {
      groundLowerLine.style.mixBlendMode = 'normal';
      groundUpperLine.style.mixBlendMode = 'normal';
    }
}

let scrollX = 0;
let scrollY = 0;
let lastTimeGround = 0;

function setGroundsDistance(distGridSpaces) {
  // ground transition easing
  // groundLower.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;
  // groundUpper.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;
  // groundLowerLine.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;
  // groundUpperLine.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;
  // groundLowerShadowLeft.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;
  // groundLowerShadowRight.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;
  // groundUpperShadowLeft.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;
  // groundUpperShadowRight.style.transition = `transform ${500 / timeWarp}ms ease-in-out`;

  setPlayerPosition();

  let groundTranslateAmount = (0.40 * window.innerHeight) - ((window.innerHeight - gridSpacesToPixels(distGridSpaces)) / 2)

  groundLower.style.transform = `translateY(${pixelsToDvh(groundTranslateAmount)}dvh)`; // set the ground positions based on the area provided in the function parameters
  groundUpper.style.transform = `translateY(-${pixelsToDvh(groundTranslateAmount)}dvh) scaleY(-1)`; // set the ground positions based on the area provided in the function parameters
  
  groundLowerLine.style.transform = `translateY(calc(${pixelsToDvh(groundTranslateAmount)}dvh + 0.3dvh)`; // update line position
  groundUpperLine.style.transform = `translateY(calc(${40 - pixelsToDvh(groundTranslateAmount)}dvh + 0.3dvh)`; // update line position
  
  groundLowerShadowLeft.style.transform = `translateY(calc(${pixelsToDvh(groundTranslateAmount)}dvh)`; // update shadow position
  groundLowerShadowRight.style.transform = `translateY(calc(${pixelsToDvh(groundTranslateAmount)}dvh)) scaleX(-1)`; // update shadow position

  groundUpperShadowLeft.style.transform = `translateY(calc(-${pixelsToDvh(groundTranslateAmount)}dvh)`; // update shadow position
  groundUpperShadowRight.style.transform = `translateY(calc(-${pixelsToDvh(groundTranslateAmount)}dvh)) scaleX(-1)`; // update shadow position

  setPlayerPosition();
}

function resetGrounds() {
  groundLower.style.transform = `translateY(14dvh)`;
  groundUpper.style.transform = `translateY(-40dvh) scaleY(-1)`;

  groundLowerLine.style.transform = `translateY(calc(14dvh + 0.3dvh))`;
  groundUpperLine.style.transform = `translateY(0dvh)`;

  groundLowerShadowLeft.style.transform = `translateY(14dvh)`
  groundLowerShadowRight.style.transform = `translateY(14dvh) scaleX(-1)`;

  groundUpperShadowLeft.style.transform = `translateY(-40dvh)`;
  groundUpperShadowRight.style.transform = `translateY(-40dvh) scaleX(-1)`;
  setPlayerPosition();
}
resetGrounds();
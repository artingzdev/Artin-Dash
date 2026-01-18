const gameBg = document.getElementById('gameBg');

function updateGameBg() {
    gameBg.style.backgroundImage = `url('resources/backgrounds/game_bg_${gameBgTexture}_001-uhd.png')`;
    r.style.setProperty('--game-bg-color', gameBgColor);
}

updateGameBg();

let scrollXGameBg = 0;
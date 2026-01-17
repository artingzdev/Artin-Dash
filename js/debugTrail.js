// Debug trail setup
const debugCanvas = document.getElementById('debug-trail');
const debugCtx = debugCanvas.getContext('2d');

function updateDebugTrailVisibility() {
    if (drawDebugTrail) {
        debugCanvas.style.display = 'inline'
    }
    else{
        debugCanvas.style.display = 'none'
    }    
    requestAnimationFrame(updateDebugTrailVisibility);
}
requestAnimationFrame(updateDebugTrailVisibility);

// Set canvas size to match window
debugCanvas.width = window.innerWidth;
debugCanvas.height = window.innerHeight;

// Style the canvas
debugCanvas.style.position = 'fixed';
debugCanvas.style.top = '0';
debugCanvas.style.left = '0';
debugCanvas.style.pointerEvents = 'none';

// Track trail points
let trailPoints = [];
let lastTrailUpdate = performance.now();
let lastGroundRenderHeight = dvhToPixels(parseFloat(groundY.split('d')[0]));

function updateDebugTrail(currentTime) {
    const dt = (currentTime - lastTrailUpdate) / 1000;
    
    // Update ~240 times per second
    if (dt >= 1/240) {
        lastTrailUpdate = currentTime;

        // Set debug trail offset
        if (debugTrail) {
        const matrix = window.getComputedStyle(debugTrail).transform;
        if (matrix !== 'none') {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            debugTrailOffset = parseFloat(values[5]) || 0; // matrix(..., translateY)
        }
        }

        //console.log(debugTrailOffset);

        for (let i = 1; i < trailPoints.length; i++) {
            const currentGroundRenderHeight = dvhToPixels(parseFloat(groundY.split('d')[0]));
            const groundRenderHeightDifference = lastGroundRenderHeight - currentGroundRenderHeight;
            trailPoints[i].y += groundRenderHeightDifference;
            //console.log(groundRenderHeightDifference);
        }  
        
        lastGroundRenderHeight = dvhToPixels(parseFloat(groundY.split('d')[0]));
        
        // Get player screen position
        const playerRect = player.getBoundingClientRect();
        const playerCenterX = playerRect.left + playerRect.width / 2;
        const playerCenterY = playerRect.top + playerRect.height / 2;
        
        // Convert screen coordinates to world coordinates
        const worldX = playerCenterX - scrollX;
        const worldY = window.innerHeight - dvhToPixels(parseFloat(groundY.split('d')[0])) - playerRect.height / 2 - playerY;

        // Store trail point in world coordinates
        trailPoints.push({
            x: worldX,
            y: worldY,
            time: currentTime
        });
        
        // Remove points that have scrolled off the left side of the screen
        trailPoints = trailPoints.filter(p => (p.x + scrollX) > -100);
        
        // Clear canvas
        debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
        
        // Save canvas state and apply scroll offset
        debugCtx.save();
        debugCtx.translate(scrollX, 0);
        
        // Draw trail line
        if (trailPoints.length > 1) {
            debugCtx.strokeStyle = 'rgba(0, 255, 0, 1)';
            debugCtx.lineWidth = 3;
            debugCtx.lineCap = 'square';
            debugCtx.lineJoin = 'square';
            debugCtx.beginPath();
            debugCtx.moveTo(trailPoints[0].x, trailPoints[0].y);
            
            for (let i = 1; i < trailPoints.length; i++) {
                debugCtx.lineTo(trailPoints[i].x, trailPoints[i].y);
            }
            debugCtx.stroke();
        }
        
        // Restore canvas state
        debugCtx.restore();
    }
    
    requestAnimationFrame(updateDebugTrail);
}
requestAnimationFrame(updateDebugTrail);
// DOM SELECTORS
const gameStatus = document.querySelector("#gameStatus");
const gameDistance = document.querySelector("#distance");
const gameCanvas = document.querySelector("#canvas");
const gameReset = document.querySelector("#gameReset");
// console.log(gameStatus, gameDistance, gameCanvas, gameReset);

// CANVAS SETUP
const ctx = gameCanvas.getContext("2d");
// console.log(ctx)
// Ask the Dom what size the canvas actually is in pixels
// set canvas resolution to be that size 
gameCanvas.setAttribute("height", getComputedStyle(canvas).height);
gameCanvas.setAttribute("width", getComputedStyle(canvas).width);
console.log()
console.log(`canvas width: ${(canvas).width} canvas height: ${(canvas).height}`);

// set render properties 
// invoke renderer methods 

class Escape {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alive = true;
        // ADD Enemy class to define obstacles? 
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// GAME OBJECTS
let canvasWidth = (getComputedStyle(canvas).width);
let canvasHeight = (getComputedStyle(canvas).height);
const fugative = new Escape(10, 300, 50, 50, "beige");
const police1 = new Escape(350, 200, 75, 100, "blue");
const police2 = new Escape(800, 150, 75, 100, "red");
const police3 = new Escape(550, 400, 75, 100, "orange");

// RENDER REFRESH
const gameLoopInterval = setInterval (gameLoop, 50);


// OBSTACLE MOVEMENT 
function obstacleMovement () {
    const obstacleDistance = 40;
    let randomDirection = Math.floor(Math.random() * (4));
    // console.log(randomDirection);
    if (randomDirection === 0) {
        police1.x -= obstacleDistance;
        police2.y += obstacleDistance;
        police3.x -= obstacleDistance;
    } else if (randomDirection === 1) {
        police1.x += obstacleDistance;
        police2.x -= obstacleDistance;
        police3.y -= obstacleDistance;
    } else if (randomDirection === 2) {
        police1.y -= obstacleDistance;
        police2.x += obstacleDistance;
        police3.y += obstacleDistance;
    } else {
        police1.y += obstacleDistance;
        police2.y -= obstacleDistance;
        police3.x += obstacleDistance;
        }
    }
let policeSearch = setInterval(obstacleMovement, 350);

// HUMAN KEYBOARD CONTROLS 
function keyPressEvent(e) {
    const distance = 4;
    // console.log(e);  
    switch(e.key) {
        case "w":
            case "ArrowUp":
            fugative.y -= distance;
                break
            case "s":
            case "ArrowDown": 
            fugative.y += distance;
                break
            case "a":
            case "ArrowLeft":
            fugative.x -= distance;
                break
            case "d":
            case "ArrowRight":
            fugative.x += distance;
                break;
            }
    gameStatus.innerText = `distance remaing: ${(canvas).width - fugative.x}`;
    }

document.addEventListener("keydown", keyPressEvent);
                            
// COLLISION DETECTION FUNCTION
function detectHit () {
    const left = police1.x <= fugative.width + fugative.x;
    const right = police1.x + police1.width >= fugative.x;
    const top = police1.y <= fugative.y + fugative.height;
    const bottom = police1.y + police1.height >= fugative.y;
    if (left && top && bottom && right) {
        return true;
    } else {
        return false;
}

}

// GAME FUNCTION
function gameLoop () {
    // clear the renderer
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    // logic of the game
    // check for collision
    if (detectHit()) {
        console.log("Collision detected. End the game.");
        fugative.alive = false;
        gameStatus.innerText = "You've been caught by the police";
        clearInterval(gameLoopInterval);
    }
    if (fugative.alive) {
        fugative.render();
        police1.render();
        police2.render();
        police3.render();
    }
}

// DOM SELECTORS
const gameStatus = document.querySelector("#gameStatus");
const gameDistance = document.querySelector("#distance");
const gameCanvas = document.querySelector("#canvas");
const gameReset = document.querySelector("#gameReset");

// CANVAS SETUP
const ctx = gameCanvas.getContext("2d");
gameCanvas.setAttribute("height", getComputedStyle(canvas).height);
gameCanvas.setAttribute("width", getComputedStyle(canvas).width);
console.log(`canvas width: ${(canvas).width} canvas height: ${(canvas).height}`);

class EscapeGame {
    constructor(x, y, width, height, color, hero) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.hero = hero;
        this.atLarge = true;
        // ADD obstacle.type object literal to define obstacles characteristics? 
    }
    // COLLISION DETECTION FUNCTION FOR ALL OBSTACLES
        detectHit () {
            const left = this.x <= fugative.width + fugative.x;
            const right = this.x + this.width >= fugative.x;
            const top = this.y <= fugative.y + fugative.height;
            const bottom = this.y + this.height >= fugative.y;
            if (left && top && bottom && right) {
                console.log(`The fugative was caught by the ${this.color} police.`)
                fugative.atLarge = false;
                clearInterval(gameLoopInterval);
                return true;
            } else {
                return false;
            }
            }
            // OBSTACLE MOVEMENT 
                obstacleMovement () {
                    const obstacleDistance = 20;
                    let randomDirection = Math.floor(Math.random() * 4);
                    // console.log(randomDirection);
                    if (randomDirection === 0 && this.x >= 0) {
                        this.x -= obstacleDistance;
                    } else if (randomDirection === 1  && this.x <= integerCanvasX) {
                        this.x += obstacleDistance;
                    } else if (randomDirection === 2 && this.y >= 0) {
                        this.y -= obstacleDistance;
                    } else if (randomDirection === 3 && this.y <= integerCanvasY)
                        this.y += obstacleDistance;
                    else {
                    }
                };
                
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// GAME OBJECTS
const canvasWidth = (getComputedStyle(canvas).width);
const canvasHeight = (getComputedStyle(canvas).height);
// Parse pixels into integers
let integerCanvasX = parseInt(canvasWidth);
let integerCanvasY = parseInt(canvasHeight);
// Use math to ensure starting points of objects are relative to screen size
const fugative = new EscapeGame(10, (integerCanvasY / 2), 50, 20, "beige", true);
const police1 = new EscapeGame((integerCanvasX / 4), (integerCanvasY / 3), 75, 100, "blue", false);
const police2 = new EscapeGame((integerCanvasX / 2), (integerCanvasY - (integerCanvasY / 4)), 75, 100, "orange", false);
const police3 = new EscapeGame((integerCanvasX - (integerCanvasX / 5)), (integerCanvasY / 5), 75, 100, "red", false);

// RENDER REFRESH
const gameLoopInterval = setInterval (gameLoop, 50);

// OBSTACLE MOVEMENT FUNCTION
function fugativeSearch () {
police1.obstacleMovement();
police2.obstacleMovement();
police3.obstacleMovement();
}
// Loop for obstacle movement
let searchLoop = setInterval(fugativeSearch, 350);

// HUMAN KEYBOARD CONTROLS 
function keyPressEvent(e) {
    const distance = 4;
    // console.log(e);  
    // Keys should only be functional if fugative is within canvas bounds
    switch(e.key) {
        case "w":
            case "ArrowUp":
                if (fugative.y >= 0) {
                    fugative.y -= distance;
                 } break
            case "s":
            case "ArrowDown": 
                if (fugative.y <= integerCanvasY) {
                    fugative.y += distance;
                 } break
            case "a":
            case "ArrowLeft":
                if (fugative.x >= 0) {
                    fugative.x -= distance;
                } break
            case "d":
            case "ArrowRight":
                if (fugative.x <= integerCanvasX) {
                     fugative.x += distance;
                } break;
            }
    gameStatus.innerText = `distance remaing: ${(canvas).width - fugative.x}`;
    }

document.addEventListener("keydown", keyPressEvent);

// GAME FUNCTION
function gameLoop () {
    // clear the renderer
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    // logic of the game
    // check for collision
    police1.detectHit();
    police2.detectHit();
    police3.detectHit();
    if (fugative.atLarge === true) {
        fugative.render();
        police1.render();
        police2.render();
        police3.render();
    } else {
        gameStatus.innerText = "You've been caught by the police";
        document.removeEventListener("keydown", keyPressEvent);
        console.log("Code here to switch to game reset");
}}

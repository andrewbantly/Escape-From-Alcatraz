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

class Escape {
    constructor(x, y, width, height, color, hero) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.hero = hero;
        this.atLarge = true;
        // ADD Enemy class to define obstacles? 
    }
    // COLLISION DETECTION FUNCTION FOR ALL OBSTACLES
        detectHit () {
            const left = this.x <= fugative.width + fugative.x;
            const right = this.x + this.width >= fugative.x;
            const top = this.y <= fugative.y + fugative.height;
            const bottom = this.y + this.height >= fugative.y;
            if (left && top && bottom && right) {
                console.log(`The fugative was caught by ${this.color}`)
                fugative.atLarge = false;
                clearInterval(gameLoopInterval);
                return true;
            } else {
                return false;
            }
            }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// GAME OBJECTS
const canvasWidth = (getComputedStyle(canvas).width);
const canvasHeight = (getComputedStyle(canvas).height);
let integerCanvasX = parseInt(canvasWidth);
let integerCanvasY = parseInt(canvasHeight);
// console.log(`Fugative starting x: ${middleCanvasX} starting y: ${middleCanvasY}`)
const fugative = new Escape(10, (integerCanvasY / 2), 50, 20, "beige", true);
const police1 = new Escape((integerCanvasX / 4), (integerCanvasY / 3), 75, 100, "blue", false);
const police2 = new Escape((integerCanvasX / 2), (integerCanvasY - (integerCanvasY / 4)), 75, 100, "orange", false);
const police3 = new Escape((integerCanvasX - (integerCanvasX / 5)), (integerCanvasY / 5), 75, 100, "red", false);

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
                            
// GAME FUNCTION
function gameLoop () {
    // clear the renderer
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    // logic of the game
    // check for collision
    police1.detectHit()
    police2.detectHit()
    police3.detectHit()
    // if (detectHit()) {
    //     console.log("Collision detected. End the game.");
    //     fugative.atLarge = false;
    //     gameStatus.innerText = "You've been caught by the police";
    //     clearInterval(gameLoopInterval);
    // }
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

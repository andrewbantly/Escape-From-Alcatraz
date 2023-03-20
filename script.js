let gameOn = true;
// DOM SELECTORS
const startButton = document.querySelector("#startButton")
const gameDistance = document.querySelector("#distance");
const gameCanvas = document.querySelector("#canvas");
const gameReset = document.querySelector("#gameReset");
const gameStatus = document.querySelector("#gameStatus");
const gameStatusHeader = document.querySelector("#gameStatusHeader");

// ONLOAD SETUP
function onLoad () {
gameDistance.innerText = `${gameCanvas.width - (fugative.x + freeLand.width + 50)}`;
clearInterval(pageLoad)}
let pageLoad = setInterval(onLoad, 1);

// CANVAS SETUP
const ctx = gameCanvas.getContext("2d");
gameCanvas.setAttribute("height", getComputedStyle(canvas).height);
gameCanvas.setAttribute("width", getComputedStyle(canvas).width);
// console.log(`canvas width: ${(canvas).width} canvas height: ${(canvas).height}`);

class EscapeGame {
    constructor(x, y, width, height, color, hero) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.hero = hero;
        this.atLarge = true;
        this.aFreePerson = false;
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
            }
            }
        // WIN DETECTION
        detectWin() {
            const left = this.x <= fugative.width + fugative.x; 
            if (left) {
                fugative.aFreePerson = true;
                fugative.atLarge = true;
                clearInterval(gameLoopInterval);
            }
        }
            // OBSTACLE MOVEMENT 
               // 
            obstacleMovement () {
                    let i = 0;
                    const obstacleDistance = 10;
                    let randomDirection = Math.floor(Math.random() * 4);
                    if (randomDirection === 0 && this.x > 100) {  
                        this.x -= obstacleDistance;
                    } else if (randomDirection === 1  && this.x <= (gameCanvas.width - 100)- this.width) {
                        this.x += obstacleDistance;
                    } else if (randomDirection === 2 && this.y >= this.height) {
                        this.y -= obstacleDistance;
                    } else if (randomDirection === 3 && this.y <= gameCanvas.height - this.height) {
                        this.y += obstacleDistance;
                    } else {
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
// Use math to ensure starting points of objects are relative to screen size
let fugative = new EscapeGame(100, (gameCanvas.height / 2), 50, 20, "beige", true);
let alcatraz = new EscapeGame(0, 0, 100, (gameCanvas.height), "black", false);
let freeLand = new EscapeGame ((gameCanvas.width - 100), 0, 100, (gameCanvas.height), "yellow", false)
let police1 = new EscapeGame(120, 30, 75, 100, "blue", false);
// let police1 = new EscapeGame((gameCanvas.width / 4), (gameCanvas.height / 3), 75, 100, "blue", false);
let police2 = new EscapeGame((gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 75, 100, "orange", false);
let police3 = new EscapeGame((gameCanvas.width - (gameCanvas.width / 5)), (gameCanvas.height / 5), 75, 100, "red", false);


// OBSTACLE MOVEMENT FUNCTION
function fugativeSearch () {
    police1.obstacleMovement();
    police2.obstacleMovement();
    police3.obstacleMovement();
}
// RENDER REFRESH
const gameLoopInterval = setInterval (gameLoop, 50);
let searchLoop = setInterval(fugativeSearch, 1000);

// HUMAN KEYBOARD CONTROLS 
function keyPressEvent(e) {
    if (gameOn === true) {
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
                if (fugative.y <= gameCanvas.height - fugative.height) {
                    fugative.y += distance;
                 } break
            case "a":
            case "ArrowLeft":
                if (fugative.x >= 100) {
                    fugative.x -= distance;
                } break
            case "d":
            case "ArrowRight":
                if (fugative.x <= (gameCanvas.width - 100) - fugative.width) {
                     fugative.x += distance;
                } break;
            }
    gameDistance.innerText = `${gameCanvas.width - (fugative.x + freeLand.width + 50)}`;
    // console.log(`fugative x: ${fugative.x} y: ${fugative.y}`)
    } 
    // gameOn === false code here
}

document.addEventListener("keydown", keyPressEvent);


// GAME FUNCTION
function gameLoop () {
    // clear the renderer
    if (gameOn === true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    // logic of the game
    // check for collision
    police1.detectHit();
    police2.detectHit();
    police3.detectHit();
    freeLand.detectWin();
    if (fugative.atLarge === true && fugative.aFreePerson === false) {
        fugative.render();
        alcatraz.render();
        freeLand.render();
        police1.render();
        police2.render();
        police3.render();
    } else if (fugative.atLarge === true && fugative.aFreePerson === true) {
        winner();
    } else {
        caughtFugative()
    } 
    // gameOn === false here
    }
}   

// GAME OUTCOME FUNCTIONS
function winner () {
    console.log("Player wins");
    gameOn = false;
    document.removeEventListener("keydown", keyPressEvent);
    freeLand.render();
    alcatraz.render();
    fugative.render();
    gameStatusHeader.innerText = "You got away!"
    gameDistance.innerText = "Escape again?";
}
function caughtFugative() {
    freeLand.render();
        alcatraz.render();
        gameStatusHeader.innerText = "You've been caught by the police!";
        gameDistance.innerText = "Try to escape again?";
        document.removeEventListener("keydown", keyPressEvent);
        console.log("Code here to switch to game reset");
        gameOn = false;
}


// GAME RESET BUTTON
gameReset.addEventListener("click", gameResetFunction)

function gameResetFunction () {
    console.log("game reset button clicked")
    gameOn = true;
    fugative = new EscapeGame(100, (gameCanvas.height / 2), 50, 20, "beige", true);
    alcatraz = new EscapeGame(0, 0, 100, (gameCanvas.height), "black", false);
    freeLand = new EscapeGame ((gameCanvas.width - 100), 0, 100, (gameCanvas.height), "yellow", false)
    police1 = new EscapeGame((gameCanvas.width / 4), (gameCanvas.height / 3), 75, 100, "blue", false);
    police2 = new EscapeGame((gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 75, 100, "orange", false);
    police3 = new EscapeGame((gameCanvas.width - (gameCanvas.width / 5)), (gameCanvas.height / 5), 75, 100, "red", false);
    const gameLoopInterval = setInterval (gameLoop, 50);
    let searchLoop = setInterval(fugativeSearch, 1000);
    document.addEventListener("keydown", keyPressEvent);
    gameDistance.innerText = `${gameCanvas.width - (fugative.x + freeLand.width + 50)}`;
    gameStatusHeader.innerText = "Distance remaining:"
}
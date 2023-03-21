let gameOn = true;

// DOM SELECTORS
const startButton = document.querySelector("#startButton")
const gameDistance = document.querySelector("#distance");
const gameCanvas = document.querySelector("#canvas");
const gameReset = document.querySelector("#gameReset");
const gameStatus = document.querySelector("#gameStatus");
const gameStatusHeader = document.querySelector("#gameStatusHeader");

// CANVAS SETUP
const ctx = gameCanvas.getContext("2d");
gameCanvas.setAttribute("height", getComputedStyle(canvas).height);
gameCanvas.setAttribute("width", getComputedStyle(canvas).width);
console.log(`canvas width: ${(canvas).width} canvas height: ${(canvas).height}`);

// ONLOAD SETUP
function onLoad () {
gameDistance.innerText = `${(gameCanvas.width - (fugative.x + freeLand.width + 50).toFixed(0))}`;
clearInterval(pageLoad)
}
let pageLoad = setInterval(onLoad, 1);

// LOAD IMAGES
let alcatrazImage = document.createElement("img");
alcatrazImage.src = "./media/AlcatrazImage.png";

const fugativeImage = new Image();
let fugativeImageX = (gameCanvas.width / (13/2));
let fugativeImageY = (gameCanvas.height / 2);
fugativeImage.onload=function() {
    ctx.drawImage(fugativeImage, fugativeImageX, fugativeImageY);
}
fugativeImage.src = "./media/fugative.png";

// GAME CLASS
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
                clearInterval(searchLoop);
            }
        }
        // WIN DETECTION
        detectWin() {
            const left = this.x <= fugative.width + fugative.x; 
            if (left) {
                fugative.aFreePerson = true;
                fugative.atLarge = true;
                clearInterval(gameLoopInterval);
                clearInterval(searchLoop);
            }
        }
            // OBSTACLE MOVEMENT 
               // 
            obstacleMovement () {
                let i = 0;
                const obstacleDistance = 10;
                let randomDirection = Math.floor(Math.random() * 4);
                if (randomDirection === 0 && this.x > (gameCanvas.height / 2)) {  
                        this.x -= obstacleDistance;
                    } else if (randomDirection === 1  && this.x <= (gameCanvas.width - (gameCanvas.height / 2))- this.width) {
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
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(alcatrazImage, 0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2));
        // ctx.drawImage(fugativeImage, (gameCanvas.height / 4), (gameCanvas.height / 2), 56, 23);
    }
}

// GAME OBJECTS
const canvasWidth = (getComputedStyle(canvas).width);
const canvasHeight = (getComputedStyle(canvas).height);
let fugative = new EscapeGame((gameCanvas.width / (13/2)), (gameCanvas.height / 2), 56, 23, "rgba(0, 0, 0, 0)", true);
let freeLand = new EscapeGame ((gameCanvas.width - 100), 0, 100, (gameCanvas.height), "yellow", false)
let police1 = new EscapeGame((gameCanvas.width / 4), (gameCanvas.height / 3), 75, 100, "blue", false);
let police2 = new EscapeGame((gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 75, 100, "orange", false);
let police3 = new EscapeGame((gameCanvas.width - (gameCanvas.width / 5)), (gameCanvas.height / 5), 75, 100, "red", false);

// OBSTACLE MOVEMENT FUNCTION
function fugativeSearch () {
    police1.obstacleMovement();
    police2.obstacleMovement();
    police3.obstacleMovement();
}
// RENDER REFRESH
let gameLoopInterval = setInterval (gameLoop, 50);
let searchLoop = setInterval(fugativeSearch, 1000);

// HUMAN KEYBOARD CONTROLS 
function keyPressEvent(e) {
    if (gameOn === true) {
    const distance = 4;
    switch(e.key) {
        case "w":
            case "ArrowUp":
                if ((fugative.y >= 0) && (fugative.x >= (gameCanvas.width / (13/2)))) {
                    fugative.y -= distance;
                    fugativeImageY -= distance;
                 } else if ((fugative.y <= (gameCanvas.height / 4)) && (fugative.y >= 0)) {
                    fugative.y -= distance;
                    fugativeImageY -= distance;
                 } else if (fugative.y >= ((gameCanvas.height) - (gameCanvas.height / 4))) {
                    fugative.y -= distance;
                    fugativeImageY -= distance;
                 }
                 break
            case "s":
            case "ArrowDown": 
                if ((fugative.y <= gameCanvas.height - fugative.height) && (fugative.x >= (gameCanvas.width / (13/2)))) {
                    fugative.y += distance;
                    fugativeImageY += distance;
                } else if (fugative.y <= ((gameCanvas.height / 4) - fugative.height)) {
                fugative.y += distance;
                fugativeImageY += distance;
                } else if ((fugative.y >= ((gameCanvas.height) - (gameCanvas.height / 4) - 10) && (fugative.y <= gameCanvas.height - fugative.height))) {
                fugative.y += distance;
                fugativeImageY += distance;
                }
                 break
            case "a":
            case "ArrowLeft":
                if ((fugative.x >= (gameCanvas.width / (13/2))) && (fugative.y >= (gameCanvas.height / 4)) && (fugative.y <= (gameCanvas.height - (gameCanvas.height / 4)))) {
                    fugative.x -= distance;
                    fugativeImageX -= distance;
                } else if ((fugative.x >= 0) && (fugative.y <= (gameCanvas.height / 4))) {
                    fugative.x -= distance;
                    fugativeImageX -= distance;
                } else if ((fugative.x >= 0) && (fugative.y >= (gameCanvas.height - (gameCanvas.height / 4) - 10))) {
                    fugative.x -= distance;
                    fugativeImageX -= distance;
                }
                break
            case "d":
            case "ArrowRight":
                if (fugative.x <= (gameCanvas.width - 100) - fugative.width) {
                     fugative.x += distance;
                     fugativeImageX += distance;
                } break;
            }
    gameDistance.innerText = `${(gameCanvas.width - (fugative.x + freeLand.width + 50).toFixed(0))}`;
    } 
    // gameOn === false code here
}

document.addEventListener("keydown", keyPressEvent);


// GAME LOGIC
function gameLoop () {
    if (gameOn === true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    ctx.drawImage(fugativeImage, fugativeImageX, fugativeImageY);
    police1.detectHit();
    police2.detectHit();
    police3.detectHit();
    freeLand.detectWin();
    if (fugative.atLarge === true && fugative.aFreePerson === false) {
        fugative.render();
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
    fugative.render();
    gameStatusHeader.innerText = "You got away!"
    gameDistance.innerText = "Escape again?";
}
function caughtFugative() {
    freeLand.render();
        gameStatusHeader.innerText = "You've been caught by the police!";
        gameDistance.innerText = "Try to escape again?";
        document.removeEventListener("keydown", keyPressEvent);
        console.log("Code here to switch to game reset");
        gameOn = false;
}


// GAME RESET LOGIC
gameReset.addEventListener("click", gameResetFunction)
function gameResetFunction () {
    console.log("game reset button clicked")
    gameOn = true;
    fugative.aFreePerson = false;
    fugativeImageX = (gameCanvas.width / (13/2));
    fugativeImageY = (gameCanvas.height / 2);
    fugative = new EscapeGame((gameCanvas.width / (13/2)), (gameCanvas.height / 2), 56, 23, "rgba(0, 0, 0, 0)", true);
    freeLand = new EscapeGame ((gameCanvas.width - 100), 0, 100, (gameCanvas.height), "yellow", false)
    police1 = new EscapeGame((gameCanvas.width / 4), (gameCanvas.height / 3), 75, 100, "blue", false);
    police2 = new EscapeGame((gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 75, 100, "orange", false);
    police3 = new EscapeGame((gameCanvas.width - (gameCanvas.width / 5)), (gameCanvas.height / 5), 75, 100, "red", false);
    gameLoopInterval = setInterval (gameLoop, 50);
    searchLoop = setInterval(fugativeSearch, 1000);
    document.addEventListener("keydown", keyPressEvent);
    gameDistance.innerText = `${gameCanvas.width - (fugative.x + freeLand.width + 50)}`;
    gameStatusHeader.innerText = "Distance remaining:"
}
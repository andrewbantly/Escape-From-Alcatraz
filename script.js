
const startButton = document.querySelector("#startButton");
const gameContainer = document.querySelector("#gameContainer");
const AlcatrazPhoto = document.querySelector("#alcatrazPhoto");
const gameHeader = document.querySelector("#gameHeader");
const main = document.querySelector("main");
const gameMenu = document.querySelector("#gameMenu");

startButton.addEventListener("click", gameStart);
function gameStart () {
let gameOn = true;

// REMOVE ELEMENTS
AlcatrazPhoto.remove();
gameMenu.remove();

// CREATE ELEMENTS
const gameCanvas = document.createElement("canvas");
gameCanvas.classList.add("gameOnCanvas");
gameCanvas.id = "canvas";
gameContainer.append(gameCanvas);

const gameStatus = document.createElement("div");
gameStatus.classList.add("gameStatusContainer");
gameStatus.id = "gameStatus";
gameHeader.append(gameStatus);

const gameStatusHeader = document.createElement("h2");
gameStatusHeader.classList.add("distance");
gameStatusHeader.id = "gameStatusHeader";
gameStatusHeader.innerText = "Distance remaining:"
gameStatus.append(gameStatusHeader);

const gameDistance = document.createElement("h5");
gameDistance.classList.add("gameStatusData");
gameDistance.id = "distance";
gameStatus.append(gameDistance);

// DOM SELECTORS
const gameReset = document.querySelector("#gameReset");

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

// GAME CLASS
class EscapeGame {
    constructor(x, y, width, height, imgSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image ();
        this.img.src = imgSrc;
        this.aFreePerson = false;
        this.atLarge = true;
    }
    // COLLISION DETECTION FUNCTION FOR ALL OBSTACLES
        detectHit () {
            // invoke police boats and future obstacles here
            const left = this.x <= fugative.width + fugative.x;
            const right = this.x + this.width >= fugative.x;
            const top = this.y <= fugative.y + fugative.height;
            const bottom = this.y + this.height >= fugative.y;
            if (left && top && bottom && right) {
                console.log(`The fugative was caught by the police.`)
                fugative.atLarge = false;
                clearInterval(gameLoopInterval);
                clearInterval(searchLoop);
            }
        }
        // ADD COMMENTARY DETECTION
        // WIN DETECTION
        detectWin() {
            // invoke freeLand?  
            const left = this.x <= fugative.width + fugative.x; 
            if (left) {
                fugative.aFreePerson = true;
                fugative.atLarge = true;
                clearInterval(gameLoopInterval);
                clearInterval(searchLoop);
            }
        }
           // OBSTACLE MOVEMENT 
            obstacleMovement (objectA, objectB, objectC) {
                let i = 0;
                const obstacleDistance = 10;
                let randomDirection = Math.floor(Math.random() * 4);
                if (randomDirection === 0 // random # 
                    && this.x >= (gameCanvas.height / 2) // Game bounds (alcatraz)
                    && (obstacleCollision(objectA, objectB, objectC) === false)) // check object collision
                    {this.x -= obstacleDistance; // move left 
            } else if (randomDirection === 1 // random # 
                && (this.x <= (gameCanvas.width - (gameCanvas.height / 2)) - this.width) // game bounds (freeLand)
                && (obstacleCollision(objectA, objectB, objectC) === false)) //check object collision
                {this.x += obstacleDistance; // move right
            } else if (randomDirection === 2 // random # 
                && this.y >= this.height //canvas bounds
                && (obstacleCollision(objectA, objectB, objectC) === false)) // check object collision
                { this.y -= obstacleDistance; //move down
            } else if (randomDirection === 3 //random #
                && (this.y <= gameCanvas.height - this.height) // canvas bounds
                && (obstacleCollision(objectA, objectB, objectC) === false)) // check object collision
                    { this.y += obstacleDistance; // move up
                    // COLLISION WITH OBJECT B
                } else if (obstacleCollision(objectA, objectB, objectC) === true // objected collision detected 
                && (objectA.x <= objectB.width + objectB.x) // if object collided on right side with objectB
                && (this.x <= (gameCanvas.width - (gameCanvas.height / 2)) - this.width)) // if object is in bounds
                { this.x += obstacleDistance; // move right
                    objectB.x -= obstacleDistance; //move objectB the opposite direction
                } else if (obstacleCollision(objectA, objectB, objectC) === true // objected collision detected 
                && (objectA.x + objectA.width >= objectB.x) // if object collided on left side with objectB
                && (this.x >= (gameCanvas.height / 2))) // if object is in bounds
                { this.x -= obstacleDistance; // move left
                objectB.x += obstacleDistance; //move objectB the opposite direction
                } else if (obstacleCollision(objectA, objectB, objectC) === true // objected collision detected 
                && (objectA.y <= objectB.y + objectB.height) // if objected collided on top with objectB
                && (randomDirection === 2 && this.y >= this.height)) // if object is in bounds
                { this.y -= obstacleDistance; // move down
                objectB.y += obstacleDistance; //move objectB the opposite direction
                } else if (obstacleCollision(objectA, objectB, objectC) === true //object collision detected 
                && (objectA.y + objectA.height >= objectB.y) // if objected collided on bottom with objectB
                && (this.y <= gameCanvas.height - this.height)) // object is in bounds
                { this.y += obstacleDistance; // move up
                objectB.y -= obstacleDistance; //move objectB the opposite direction
                // COLLISION WITH OBJECT C 
                } else if (obstacleCollision(objectA, objectB, objectC) === true // objected collision detected 
                && (objectA.x <= objectC.width + objectC.x) // if object collided on right side with objectC
                && (this.x <= (gameCanvas.width - (gameCanvas.height / 2)) - this.width)) // if object is in bounds
                { this.x += obstacleDistance; // move right
                objectC.x -= obstacleDistance; //move objectC the opposite direction
                } else if (obstacleCollision(objectA, objectC, objectC) === true // objected collision detected 
                && (objectA.x + objectA.width >= objectC.x) // if object collided on left side with objectC
                && (this.x >= (gameCanvas.height / 2))) // if object is in bounds
                { this.x -= obstacleDistance; // move left
                objectC.x += obstacleDistance; //move objectC the opposite direction
                } else if (obstacleCollision(objectA, objectC, objectC) === true // objected collision detected 
                && (objectA.y <= objectC.y + objectC.height) // if objected collided on top with objectC
                && (randomDirection === 2 && this.y >= this.height)) // if object is in bounds
                { this.y -= obstacleDistance; // move down
                objectC.y += obstacleDistance; //move objectC the opposite direction
                } else if (obstacleCollision(objectA, objectC, objectC) === true //object collision detected 
                && (objectA.y + objectA.height >= objectC.y) // if objected collided on bottom with objectC
                && (this.y <= gameCanvas.height - this.height)) // object is in bounds
                { this.y += obstacleDistance; // move up
                objectC.y -= obstacleDistance; //move objectC the opposite direction
                }
            }         
    render() {
        ctx.fillStyle = this.color;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    }
}

// GAME OBJECTS
const canvasWidth = (getComputedStyle(canvas).width);
const canvasHeight = (getComputedStyle(canvas).height);
let freeLand = new EscapeGame ((gameCanvas.width - 100), 0, 100, (gameCanvas.height), "./media/Ferry-building.png")
let alcatraz = new EscapeGame(0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2), "./media/AlcatrazImage.png")
let fugative = new EscapeGame((gameCanvas.width / (13/2)), (gameCanvas.height / 2), 56, 23, "./media/fugative.png");
let police1 = new EscapeGame((gameCanvas.width / 4), (gameCanvas.height / 3), 100, 75, "./media/police-boat1.png");
let police2 = new EscapeGame((gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 100, 75, "./media/police-boat2.png");
let police3 = new EscapeGame((gameCanvas.width - (gameCanvas.width / 4)), (gameCanvas.height / 5), 75, 100, "./media/police-boat3.png");

// OBSTACLE MOVEMENT & OBSTACLE DETECTION 
function fugativeSearch () {
    police1.obstacleMovement(police1, police2, police3);
    police2.obstacleMovement(police2, police1, police3);
    police3.obstacleMovement(police3, police1, police2);
}

function obstacleCollision (objectA, objectB, objectC) {
    let leftObjectAB = objectA.x <= objectB.width + objectB.x;
    let rightObjectAB = objectA.x + objectA.width >= objectB.x;
    let topObjectAB = objectA.y <= objectB.y + objectB.height;
    let bottomObjectAB = objectA.y + objectA.height >= objectB.y;
    let leftObjectAC = objectA.x <= objectC.width + objectC.x;
    let rightObjectAC = objectA.x + objectA.width >= objectC.x;
    let topObjectAC = objectA.y <= objectC.y + objectC.height;
    let bottomObjectAC = objectA.y + objectA.height >= objectC.y;
    if (leftObjectAB && topObjectAB && bottomObjectAB && rightObjectAB) {
        console.log("obstacles have collided.");
        return true;
    } else if (leftObjectAC && topObjectAC && bottomObjectAC && rightObjectAC) {
        console.log("obstacles have collided.");
        return true;
    } 
    console.log("obstacles have not collided.");
    return false;

}

// RENDER REFRESH
let gameLoopInterval = setInterval (gameLoop, 50);
let searchLoop = setInterval(fugativeSearch, 1000);

// HUMAN KEYBOARD CONTROLS 
function keyPressEvent(e) {
    if (gameOn === true) {
    const distance = 2;
    switch(e.key) {
        case "w":
            case "ArrowUp":
                if ((fugative.y >= 0) && (fugative.x >= (gameCanvas.width / (13/2)))) {
                    fugative.y -= distance;
                 } else if ((fugative.y <= (gameCanvas.height / 4)) && (fugative.y >= 0)) {
                    fugative.y -= distance;
                 } else if (fugative.y >= ((gameCanvas.height) - (gameCanvas.height / 4))) {
                    fugative.y -= distance;
                 }
                 break
            case "s":
            case "ArrowDown": 
                if ((fugative.y <= gameCanvas.height - fugative.height) && (fugative.x >= (gameCanvas.width / (13/2)))) {
                    fugative.y += distance;
                } else if (fugative.y <= ((gameCanvas.height / 4) - fugative.height)) {
                    fugative.y += distance;
                } else if ((fugative.y >= ((gameCanvas.height) - (gameCanvas.height / 4) - 10) && (fugative.y <= gameCanvas.height -    fugative.height))) {
                    fugative.y += distance;
                }
                 break
            case "a":
            case "ArrowLeft":
                if ((fugative.x >= (gameCanvas.width / (13/2))) && (fugative.y >= (gameCanvas.height / 4)) && (fugative.y <= (gameCanvas.height - (gameCanvas.height / 4)))) {
                    fugative.x -= distance;
                } else if ((fugative.x >= 0) && (fugative.y <= (gameCanvas.height / 4))) {
                    fugative.x -= distance;
                } else if ((fugative.x >= 0) && (fugative.y >= (gameCanvas.height - (gameCanvas.height / 4) - 10))) {
                    fugative.x -= distance;
                }
                break
            case "d":
            case "ArrowRight":
                if (fugative.x <= (gameCanvas.width - 100) - fugative.width) {
                     fugative.x += distance;
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
    police1.detectHit();
    police2.detectHit();
    police3.detectHit();
    freeLand.detectWin();
    if (fugative.atLarge === true && fugative.aFreePerson === false) {
        fugative.render();
        freeLand.render();
        alcatraz.render();
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
    freeLand = new EscapeGame ((gameCanvas.width - 100), 0, 100, (gameCanvas.height), "./media/Ferry-building.png")
    alcatraz = new EscapeGame(0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2), "./media/AlcatrazImage.png")
    fugative = new EscapeGame((gameCanvas.width / (13/2)), (gameCanvas.height / 2), 56, 23, "./media/fugative.png");
    police1 = new EscapeGame((gameCanvas.width / 4), (gameCanvas.height / 3), 100, 75, "./media/police-boat1.png");
    police2 = new EscapeGame((gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 100, 75, "./media/police-boat2.png");
    police3 = new EscapeGame((gameCanvas.width - (gameCanvas.width / 4)), (gameCanvas.height / 5), 75, 100, "./media/police-boat3.png");
    clearInterval(gameLoopInterval);
    clearInterval(searchLoop);
    gameLoopInterval = setInterval (gameLoop, 50);
    searchLoop = setInterval(fugativeSearch, 1000);
    document.addEventListener("keydown", keyPressEvent);
    gameDistance.innerText = `${(gameCanvas.width - (fugative.x + freeLand.width + 50).toFixed(0))}`;
    gameStatusHeader.innerText = "Distance remaining:"
}


// START GAME BUTTON FUNCTION END
}

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
    constructor(name, x, y, width, height, imgSrc) {
        this.name = name;
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
    obstacleMovement (objectA, objectB) {
        if (obstacleCollision(objectA, objectB) === false && inBoundsDetection(objectA) === true) {
            let i = 0;
            const obstacleDistance = 10;
            let randomDirection = Math.floor(Math.random() * 4);
            if (randomDirection === 0) {
                objectA.x += obstacleDistance;
            } else if (randomDirection === 1) {
                objectA.x -= obstacleDistance;
            } else if (randomDirection === 2) {
                objectA.y += obstacleDistance;
            } else if (randomDirection === 3) {
                objectA.y -= obstacleDistance;
            } 
        } else if (obstacleCollision(objectA, objectB) === true) {
            console.log(`collision detected between ${objectA.name} and ${objectB.name}`);
        } else if (inBoundsDetection(objectA) === false) {
            borderAvoid(objectA);
            console.log(`${objectA.name} is out of bounds`);
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
let freeLand = new EscapeGame ("freeLand", (gameCanvas.width - 100), 0, 100, (gameCanvas.height), "./media/Ferry-building.png")
let alcatraz = new EscapeGame("alcatraz", 0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2), "./media/AlcatrazImage.png")
let fugative = new EscapeGame("fugative", (gameCanvas.width / (13/2)), (gameCanvas.height / 2), 56, 23, "./media/fugative.png");
let police1 = new EscapeGame("police1", 300, 100, 100, 75, "./media/police-boat1.png");
let police2 = new EscapeGame("police2", 300, 30, 100, 75, "./media/police-boat2.png");
// let police2 = new EscapeGame("police2", (gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 100, 75, "./media/police-boat2.png");
// let police3 = new EscapeGame("police3", (gameCanvas.width - (gameCanvas.width / 4)), (gameCanvas.height / 5), 75, 100, "./media/police-boat3.png");

// OBSTACLE MOVEMENT & OBSTACLE DETECTION 
function fugativeSearch () {
    police1.obstacleMovement(police1, police2);
    police2.obstacleMovement(police2, police1);
    // police3.obstacleMovement(police3, police1, police2);
}

function obstacleCollision (objectA, objectB) {
    let leftObject = objectA.x <= objectB.width + objectB.x;
    let rightObject = objectA.x + objectA.width >= objectB.x;
    let topObject = objectA.y <= objectB.y + objectB.height;
    let bottomObject = objectA.y + objectA.height >= objectB.y;
    if (leftObject && topObject && bottomObject && rightObject) {
        console.log("obstacles have collided.");
        collisionAvoid(objectA, objectB);
        return true;
    } 
    // console.log("obstacles have not collided.");
    return false;
}

function inBoundsDetection (object) {
    let leftBounds = object.x >= (gameCanvas.width / (13/2));
    let rightBounds = object.x + object.width <= gameCanvas.width - freeLand.width;
    let topBounds = object.y >= 0;
    let bottomBounds = (object.y <= gameCanvas.height - object.height);
    if (leftBounds && rightBounds && topBounds && bottomBounds) {
        // console.log(`${object.name} is in bounds`);
        return true;
    } 
        // console.log(`${object.name} is out of bounds`);
        return false;
}

function collisionAvoid(objectA, objectB) { // not working
    console.log(`collision avoid function triggered by ${objectA.name}`);
    let leftObject = objectA.x <= objectB.width + objectB.x;
    let rightObject = objectA.x + objectA.width >= objectB.x;
    let topObject = objectA.y <= objectB.y + objectB.height;
    let bottomObject = objectA.y + objectA.height >= objectB.y;
    if (leftObject && topObject && bottomObject) { // i've tried isolating the falsy, only keeping the truthys, specifying all options (like the border control). Both police1 & police2 run this function as ObjectA and move left, even though they are getting collision contacted differently. This should be a falsy return, anyway, as boats are stacked vertically.
        objectA.x -= 10;
        console.log(`${objectA.name} moved left collision`)
    } else if (rightObject && topObject && bottomObject) {
        objectA.x += 10;
        console.log(`${objectA.name} moved right`)
    } else if (leftObject && rightObject && topObject) {
        objectA.y -= 10;
        console.log(`${objectA.name} moved up`)
    } else if (leftObject && rightObject && bottomObject) {
        objectA.y += 10;
        console.log(`${objectA.name} moved down`)
    } else {
    console.log(`error with ${objectA.name} border avoid function`)}
}

function borderAvoid(object) {
    console.log(`${object.name} border avoid function triggered`)
    let leftBounds = object.x <= (gameCanvas.width / (13/2));
    let rightBounds = object.x + object.width >= gameCanvas.width - freeLand.width;
    let topBounds = object.y <= 0;
    let bottomBounds = (object.y >= gameCanvas.height - object.height);
    if (leftBounds === false && rightBounds === true && topBounds === false && bottomBounds === false) {
        object.x -= 10;
        console.log(`${object.name} moved left`)
    } else if (leftBounds === true && rightBounds === false && topBounds === false && bottomBounds === false) {
        object.x += 10;
        console.log(`${object.name} moved right`)
    } else if (leftBounds === false && rightBounds === false && topBounds === false && bottomBounds === true) {
        object.y -= 10;
        console.log(`${object.name} moved up`)
    } else if (leftBounds === false && rightBounds === false && topBounds === true && bottomBounds === false) {
        object.y += 10;
        console.log(`${object.name} moved down`)
    } else {
    console.log(`error with ${object.name} border avoid function`)}
}


// RENDER REFRESH
let gameLoopInterval = setInterval (gameLoop, 50);
let searchLoop = setInterval(fugativeSearch, 800);

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
    // police3.detectHit();
    freeLand.detectWin();
    if (fugative.atLarge === true && fugative.aFreePerson === false) {
        fugative.render();
        freeLand.render();
        alcatraz.render();
        police1.render();
        police2.render();
        // police3.render();
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
    // police3 = new EscapeGame((gameCanvas.width - (gameCanvas.width / 4)), (gameCanvas.height / 5), 75, 100, "./media/police-boat3.png");
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
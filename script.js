// DOM SELECTORS
const startButton = document.querySelector("#startButton");
const gameContainer = document.querySelector("#gameContainer");
const alcatrazPhoto = document.querySelector("#alcatrazPhoto");
const gameHeader = document.querySelector("#gameHeader");
const main = document.querySelector("main");
const gameMenu = document.querySelector("#gameMenu");

// GAME START BUTTON
startButton.addEventListener("click", gameStart);
function gameStart () {
    let gameOn = true;
    
// REMOVE ELEMENTS
alcatrazPhoto.remove();
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
    
const gameFooter = document.createElement("article");
gameFooter.classList.add("gameFooter");
gameFooter.id = "gameFooter";
main.append(gameFooter);

const commentaryContainer = document.createElement("div");
commentaryContainer.classList.add("commentaryContainer");
commentaryContainer.id = "commentaryContainer";
gameFooter.append(commentaryContainer);

const fugativeMugshot = document.createElement("img");
fugativeMugshot.classList.add("fugativeMugshot");
fugativeMugshot.id = "fugativeMugshot";
fugativeMugshot.src = "./media/fugative-mugshot.png";
commentaryContainer.append(fugativeMugshot);

const gameCommentary = document.createElement("h5");
gameCommentary.classList.add("gameCommentary");
gameCommentary.id = "gameCommentary";
gameCommentary.innerText = `"Let's get a move on!"`;
commentaryContainer.append(gameCommentary);

const gameResetButton = document.createElement("button");
gameResetButton.classList.add("gameReset");
gameResetButton.id = "gameReset";
gameResetButton.innerText = "Reset Game"
gameFooter.append(gameResetButton);

// CANVAS SETUP
const ctx = gameCanvas.getContext("2d");
gameCanvas.setAttribute("height", getComputedStyle(canvas).height);
gameCanvas.setAttribute("width", getComputedStyle(canvas).width);

// ADDITIONAL ONLOAD SETUP
function onLoad () {
gameDistance.innerText = `${(gameCanvas.width - (fugative.x + freeLand.width + 50).toFixed(0))}`;
clearInterval(pageLoad)
}
let pageLoad = setInterval(onLoad, 1);

// GAME CLASS
class EscapeGame {
    constructor(name, x, y, width, height, speed, imgSrc) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
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
    obstacleMovement (objectA, objectB) {
        if (inBoundsDetection(objectA) === true) {
            let randomDirection = Math.floor(Math.random() * 4);
            if (randomDirection === 0) {
                    this.x += this.speed;
                if (obstacleCollision (objectA, objectB) === true) {
                    this.x -= this.speed;
                }
            } else if (randomDirection === 1) {
                    this.x -= this.speed;
                if (obstacleCollision (objectA, objectB) === true) {
                    this.x += this.speed;
                }
            } else if (randomDirection === 2) {
                    this.y += this.speed;
                if (obstacleCollision (objectA, objectB) === true) {
                    this.y -= this.speed;
                }
            } else if (randomDirection === 3) {
                    this.y -= this.speed;
                if (obstacleCollision (objectA, objectB) === true) {
                    this.y += this.speed;
                }
            }    
        } else if (inBoundsDetection(objectA) === false) {
            borderAvoid(objectA);
        }
    }       
    render() {
        ctx.fillStyle = this.color;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    }
}

// GAME OBJECTS
let freeLand = new EscapeGame ("freeLand", (gameCanvas.width - 100), 0, 100, (gameCanvas.height), 0, "./media/Ferry-building.png")
let alcatraz = new EscapeGame("alcatraz", 0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2), 0, "./media/AlcatrazImage.png")
let fugative = new EscapeGame("fugative", (gameCanvas.width / (13/2)), (gameCanvas.height / 2), 56, 23, 2, "./media/fugative.png");
let police1 = new EscapeGame("police1", (gameCanvas.width / 3), (gameCanvas.height / 3), 100, 75, 10, "./media/police-boat1.png");
let police2 = new EscapeGame("police2", (gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 100, 75, 10, "./media/police-boat2.png");
let policeheli = new EscapeGame("policeheli", (gameCanvas.width - (gameCanvas.width / 4)), gameCanvas.height / 2, 100, 125, 30, "./media/police-heli.png");
// let police3 = new EscapeGame("police3", (gameCanvas.width - (gameCanvas.width / 4)), (gameCanvas.height / 5), 75, 100, "./media/police-boat3.png");
let dummyObstacle = new EscapeGame("dummyObstacle", -10, -10, 0, 0, 0, "./media/police-heli.png")

// OBSTACLE MOVEMENT & OBSTACLE DETECTION 
function fugativeSearch () {
    police1.obstacleMovement(police1, police2);
    police2.obstacleMovement(police2, police1);
    policeheli.obstacleMovement(policeheli, dummyObstacle);
    // police3.obstacleMovement(police3, police1, police2);
}

function obstacleCollision (objectA, objectB) {
    let leftObject = objectA.x <= objectB.width + objectB.x;
    let rightObject = objectA.x + objectA.width >= objectB.x;
    let topObject = objectA.y <= objectB.y + objectB.height;
    let bottomObject = objectA.y + objectA.height >= objectB.y;
    if (leftObject && topObject && bottomObject && rightObject) {
        return true;
    } 
        return false;
}
    
function inBoundsDetection (objectA) {
    let leftBounds = objectA.x >= (gameCanvas.width / (13/2));
    let rightBounds = objectA.x + objectA.width <= gameCanvas.width - freeLand.width;
    let topBounds = objectA.y >= 0;
    let bottomBounds = (objectA.y <= gameCanvas.height - objectA.height);
    if (leftBounds && rightBounds && topBounds && bottomBounds) {
        return true;
    } 
        return false;
}

function borderAvoid(objectA) {
    let leftBounds = objectA.x <= (gameCanvas.width / (13/2));
    let rightBounds = objectA.x + objectA.width >= gameCanvas.width - freeLand.width;
    let topBounds = objectA.y <= 0;
    let bottomBounds = (objectA.y >= gameCanvas.height - objectA.height);
    if (leftBounds === false && rightBounds === true && topBounds === false && bottomBounds === false) {
        objectA.x -= objectA.speed;
    } else if (leftBounds === true && rightBounds === false && topBounds === false && bottomBounds === false) {
        objectA.x += objectA.speed;
    } else if (leftBounds === false && rightBounds === false && topBounds === false && bottomBounds === true) {
        objectA.y -= objectA.speed;
    } else if (leftBounds === false && rightBounds === false && topBounds === true && bottomBounds === false) {
        objectA.y += objectA.speed;
    } else {
    console.log(`error with ${objectA.name} border avoid function`)}
}

// RENDER REFRESH
let gameLoopInterval = setInterval (gameLoop, 50);
let searchLoop = setInterval(fugativeSearch, 800);
let commentaryLoop = setInterval(detectCommentary, 50);

// HUMAN KEYBOARD CONTROLS 
function keyPressEvent(e) {
    if (gameOn === true) {
    switch(e.key) {
        case "w":
            case "ArrowUp":
                if ((fugative.y >= 0) && (fugative.x >= (gameCanvas.width / (13/2)))) {
                    fugative.y -= fugative.speed;
                 } else if ((fugative.y <= (gameCanvas.height / 4)) && (fugative.y >= 0)) {
                    fugative.y -= fugative.speed;
                 } else if (fugative.y >= ((gameCanvas.height) - (gameCanvas.height / 4))) {
                    fugative.y -= fugative.speed;
                 }
                 break
            case "s":
            case "ArrowDown": 
                if ((fugative.y <= gameCanvas.height - fugative.height) && (fugative.x >= (gameCanvas.width / (13/2)))) {
                    fugative.y += fugative.speed;
                } else if (fugative.y <= ((gameCanvas.height / 4) - fugative.height)) {
                    fugative.y += fugative.speed;
                } else if ((fugative.y >= ((gameCanvas.height) - (gameCanvas.height / 4) - 10) && (fugative.y <= gameCanvas.height -    fugative.height))) {
                    fugative.y += fugative.speed;
                }
                 break
            case "a":
            case "ArrowLeft":
                if ((fugative.x >= (gameCanvas.width / (13/2))) && (fugative.y >= (gameCanvas.height / 4)) && (fugative.y <= (gameCanvas.height - (gameCanvas.height / 4)))) {
                    fugative.x -= fugative.speed;
                } else if ((fugative.x >= 0) && (fugative.y <= (gameCanvas.height / 4))) {
                    fugative.x -= fugative.speed;
                } else if ((fugative.x >= 0) && (fugative.y >= (gameCanvas.height - (gameCanvas.height / 4) - 10))) {
                    fugative.x -= fugative.speed;
                }
                break
            case "d":
            case "ArrowRight":
                if (fugative.x <= (gameCanvas.width - 100) - fugative.width) {
                     fugative.x += fugative.speed;
                } break;
            }
    gameDistance.innerText = `${(gameCanvas.width - (fugative.x + freeLand.width + 50).toFixed(0))}`;
    } 
}
document.addEventListener("keydown", keyPressEvent);

// GAME LOGIC
function gameLoop () {
    if (gameOn === true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    police1.detectHit();
    police2.detectHit();
    policeheli.detectHit();
    freeLand.detectWin();
    if (fugative.atLarge === true && fugative.aFreePerson === false) {
        fugative.render();
        freeLand.render();
        alcatraz.render();
        police1.render();
        police2.render();
        policeheli.render();
        // police3.render();
    } else if (fugative.atLarge === true && fugative.aFreePerson === true) {
        winner();
    } else {
        caughtFugative()
        } 
    }
}   

// GAME COMMENTARY
function closeToPolice(object) {
    // if fugative x is close to police x + width
    let leftSide = object.x + object.width;
    let rightSide = object.x;
    let topSide = object.y + object.width;
    let bottomSide = object.y;
    if (fugative.x - leftSide <= 20 && fugative.x - leftSide > 0) {
        return true;
    } else if (rightSide - (fugative.x + fugative.width) <= 20 && rightSide - (fugative.x + fugative.width) > 0) {
        return true;
    } else if ((fugative.y) - topSide <= 20 && (fugative.y) - topSide > 0) {
        return true;
    } else if (bottomSide - (fugative.y + fugative.height) <= 20 && bottomSide - (fugative.y + fugative.height) > 0) {
        return true;
    }
    return false
}

function detectCommentary () {
    let quarterSwam = fugative.x + fugative.width >= (gameCanvas.width / 4);
    let halfway = fugative.x + fugative.width >= (gameCanvas.width / 2);
    let quarterLeft = fugative.x + fugative.width >= (gameCanvas.width / (4/3));
    if (quarterSwam === true && halfway === false && quarterLeft === false) {
        if (closeToPolice(police1) === true || closeToPolice(police2) === true) {
            gameCommentary.innerText = `"The coppers are on me!"`;
        } 
        else {
            gameCommentary.innerText = `"This bay is saltier than toilet wine!"`;}
    }
    else if (halfway === true && quarterLeft === false) {
        if (closeToPolice(police1) === true || closeToPolice(police2) === true) {
            gameCommentary.innerText = `"I don't want to go back to the Rock!"`;
        } else if (closeToPolice(policeheli) === true) {
            gameCommentary.innerText = `"Who called the heli?!"`;
        }
        else {gameCommentary.innerText = `"I didn't think I'd make it this far!"`}
    }
    else if (quarterLeft === true) {
        if (closeToPolice(police1) === true || closeToPolice(police2) === true) {
            gameCommentary.innerText = `"I've swam too far to get caught now!"`;
        } else if (closeToPolice(policeheli) === true) {
            gameCommentary.innerText = `"Am I on TV?!"`;
        }
        else {gameCommentary.innerText = `"I think I'm going to make it!"`}
    }
}

// GAME OUTCOME FUNCTIONS
function winner () {
    gameOn = false;
    document.removeEventListener("keydown", keyPressEvent);
    freeLand.render();
    alcatraz.render();
    clearInterval(commentaryLoop);
    gameStatusHeader.innerText = "You got away!"
    gameDistance.innerText = "Escape again?";
    gameCommentary.innerText = `"Where's the driver in that car?!"`
}
function caughtFugative() {
    gameOn = false;
    document.removeEventListener("keydown", keyPressEvent);
    police1 = new EscapeGame("police1", fugative.x - police1.width, fugative.y - (police1.height / 2), 100, 75, 10, "./media/police-boat1.png");
    policeheli = new EscapeGame("policeheli", fugative.x - (policeheli.width / 3), fugative.y + (fugative.height * 3/2), 100, 125, 30, "./media/police-heli.png");
    if (fugative.x <= (gameCanvas.width / (5/3))) {
        police2 = new EscapeGame("police2", fugative.x + fugative.width, fugative.y - (police2.height / 2), 100, 75, 10, "./media/police-boat2.png");
        police2.render();
        }
    fugative.render();
    freeLand.render();
    alcatraz.render();
    police1.render();
    policeheli.render();
    clearInterval(commentaryLoop);
    gameCommentary.innerText = `"Aw shucks back to solitary confinement for me."`;
    gameStatusHeader.innerText = "You've been caught by the police!";
    gameDistance.innerText = "Try to escape again?";
}

// GAME RESET LOGIC
gameResetButton.addEventListener("click", gameResetFunction)
function gameResetFunction () {
    gameOn = true;
    fugative.aFreePerson = false;
    fugative = new EscapeGame("fugative", (gameCanvas.width / (13/2)), (gameCanvas.height / 2), 56, 23, 2, "./media/fugative.png");
    freeLand = new EscapeGame ("freeLand", (gameCanvas.width - 100), 0, 100, (gameCanvas.height), 0, "./media/Ferry-building.png")
    alcatraz = new EscapeGame("alcatraz", 0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2), 0, "./media/AlcatrazImage.png")
    police1 = new EscapeGame("police1", (gameCanvas.width / 4), (gameCanvas.height / 3), 100, 75, 10, "./media/police-boat1.png");
    police2 = new EscapeGame("police2", (gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), 100, 75, 10, "./media/police-boat2.png");
    policeheli = new EscapeGame("policeheli", (gameCanvas.width - (gameCanvas.width / 4)), gameCanvas.height / 2, 100, 125, 30, "./media/police-heli.png");
    clearInterval(gameLoopInterval);
    clearInterval(searchLoop);
    clearInterval(commentaryLoop);
    gameLoopInterval = setInterval (gameLoop, 50);
    searchLoop = setInterval(fugativeSearch, 1000);
    commentaryLoop = setInterval(detectCommentary, 50);
    document.addEventListener("keydown", keyPressEvent);
    gameDistance.innerText = `${(gameCanvas.width - (fugative.x + freeLand.width + 50).toFixed(0))}`;
    gameStatusHeader.innerText = "Distance remaining:"
    gameCommentary.innerText = `"Let's get a move on!"`;
}


// START GAME BUTTON FUNCTION END
}
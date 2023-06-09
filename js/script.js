// DOM SELECTORS
const startButton = document.querySelector("#startButton");
const gameContainer = document.querySelector("#gameContainer");
const alcatrazPhoto = document.querySelector("#alcatrazPhoto");
const gameHeader = document.querySelector("#gameHeader");
const main = document.querySelector("main");
const gameMenu = document.querySelector("#gameMenu");
const homepageSpacer = document.querySelector("#homePageSpacer");

// GAME START BUTTON
startButton.addEventListener("click", gameStart);
function gameStart () {
let gameOn = true;
    
// REMOVE ELEMENTS
alcatrazPhoto.remove();
gameMenu.remove();
homepageSpacer.remove();

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
gameDistance.innerText = `${(gameCanvas.width - (fugative.x + fugative.width + freeLand.width).toFixed(0))}`;
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
let freeLand = new EscapeGame ("freeLand", (gameCanvas.width - (gameCanvas.width / 8)), 0, (gameCanvas.width / 8), (gameCanvas.height), 0, "./media/Ferry-building.png")
let alcatraz = new EscapeGame("alcatraz", 0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2), 0, "./media/AlcatrazImage.png")
let fugative = new EscapeGame("fugative", (gameCanvas.width / (13/2)), (gameCanvas.height / 2), (gameCanvas.width / 12), (gameCanvas.height / 12), (gameCanvas.width / 300), "./media/fugative.png");
let police1 = new EscapeGame("police1", (gameCanvas.width / 3), (gameCanvas.height / 4), (gameCanvas.width / 7), (gameCanvas.height / 6), (gameCanvas.height / 12), "./media/police-boat1.png");
let police2 = new EscapeGame("police2", (gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), (gameCanvas.width / 7), (gameCanvas.height / 6), (gameCanvas.height / 12), "./media/police-boat2.png");
let policeheli = new EscapeGame("policeheli", (gameCanvas.width - (gameCanvas.width / 4)), (gameCanvas.height / 4), (gameCanvas.width / 7), (gameCanvas.height / 3), (gameCanvas.height / 10), "./media/police-heli.png");

// OBSTACLE MOVEMENT & OBSTACLE DETECTION 
function fugativeSearch () {
    police1.obstacleMovement(police1, police2);
    police1.obstacleMovement(police1, policeheli);
    police2.obstacleMovement(police2, police1);
    police2.obstacleMovement(police2, policeheli);
    policeheli.obstacleMovement(policeheli, police1);
    policeheli.obstacleMovement(policeheli, police2);
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
    let leftBounds = objectA.x >= (alcatraz.width + (objectA.width / 3));
    let rightBounds = objectA.x + objectA.width <= (gameCanvas.width - freeLand.width + 1);
    let topBounds = objectA.y >= 1;
    let bottomBounds = (objectA.y <= (gameCanvas.height - (objectA.height + 1)));
    if (leftBounds && rightBounds && topBounds && bottomBounds) {
        return true;
    } 
        return false;
}

function borderAvoid(objectA) {
    let leftBounds = objectA.x <= (alcatraz.width + (objectA.width / 3));
    let rightBounds = objectA.x + objectA.width >= (gameCanvas.width - freeLand.width + 1);
    let topBounds = objectA.y <= 1;
    let bottomBounds = (objectA.y >= gameCanvas.height - (objectA.height + 1));
    if (leftBounds === false && rightBounds === true && topBounds === false && bottomBounds === false) {
        objectA.x -= objectA.speed;
    } else if (leftBounds === true && rightBounds === false && topBounds === false && bottomBounds === false) {
        objectA.x += objectA.speed;
    } else if (leftBounds === false && rightBounds === false && topBounds === false && bottomBounds === true) {
        objectA.y -= objectA.speed;
    } else if (leftBounds === false && rightBounds === false && topBounds === true && bottomBounds === false) {
        objectA.y += objectA.speed;
    } 
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
                if (fugative.x <= (gameCanvas.width - freeLand.width) - fugative.width) {
                     fugative.x += fugative.speed;
                } break;
            }
        gameDistance.innerText = `${(gameCanvas.width - (fugative.x + fugative.width + freeLand.width).toFixed(0))}`;
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
    if ((fugative.x - leftSide <= (fugative.width) && fugative.x - leftSide > 0) && (((fugative.y) - topSide <= (fugative.height / 2) && (fugative.y) - topSide > 0) || (bottomSide - (fugative.y + fugative.height) <= (fugative.height / 2) && bottomSide - (fugative.y + fugative.height) > 0))) {
        return true;
    } else if (rightSide - (fugative.x + fugative.width) <= (fugative.width) && rightSide - (fugative.x + fugative.width) > 0) {
        return true;
    } else if ((fugative.y) - topSide <= (fugative.height / 2) && (fugative.y) - topSide > 0) {
        return true;
    } else if (bottomSide - (fugative.y + fugative.height) <= (fugative.height / 2) && bottomSide - (fugative.y + fugative.height) > 0) {
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
            gameCommentary.innerText = `"I don't want to go back to the Rock!"`;
        } 
        else {
            gameCommentary.innerText = `"I've got a ways to go!"`;}
    }
    else if (halfway === true && quarterLeft === false) {
        if (closeToPolice(police1) === true || closeToPolice(police2) === true) {
            gameCommentary.innerText = `"The coppers are on me!"`;
        } else if (closeToPolice(policeheli) === true) {
            gameCommentary.innerText = `"Shoot did the heli see me?"`;
        }
        else {gameCommentary.innerText = `"I didn't think I'd make it this far!"`}
    }
    else if (quarterLeft === true) {
        if (closeToPolice(police1) === true || closeToPolice(police2) === true) {
            gameCommentary.innerText = `"I've swam too far to get caught now!"`;
        } else if (closeToPolice(policeheli) === true) {
            gameCommentary.innerText = `"This chopper is all over me!"`;
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
    gameCommentary.innerText = `"The only thing I'll miss about Alcatraz is the view."`
}
function caughtFugative() {
    gameOn = false;
    document.removeEventListener("keydown", keyPressEvent);
    if (fugative.x >= alcatraz.width + police1.width) {
        police1 = new EscapeGame("police1", fugative.x - police1.width, fugative.y - (police1.height / 2), (gameCanvas.width / 7), (gameCanvas.height / 6), (gameCanvas.height / 12), "./media/police-boat1.png");  
        police1.render();      
        police1.render();
        }
    if (fugative.x <= (gameCanvas.width / (5/3))) {
        police2 = new EscapeGame("police2", fugative.x + fugative.width, fugative.y - (police2.height / 2), (gameCanvas.width / 7), (gameCanvas.height / 6), (gameCanvas.height / 12), "./media/police-boat2.png");
        police2.render();
    }
    policeheli = new EscapeGame("policeheli", fugative.x - (policeheli.width / 3), fugative.y + (fugative.height * 3/2), (gameCanvas.width / 7), (gameCanvas.height / 3), (gameCanvas.height / 10), "./media/police-heli.png");
    fugative.render();
    freeLand.render();
    alcatraz.render();
    policeheli.render();
    clearInterval(commentaryLoop);
    gameCommentary.innerText = `"Aw shucks back to solitary confinement for me."`;
    gameStatusHeader.innerText = "You've been caught!";
    gameDistance.innerText = "Escape again?";
}

// GAME RESET LOGIC
gameResetButton.addEventListener("click", gameResetFunction)
function gameResetFunction () {
    gameOn = true;
    fugative.aFreePerson = false;
    freeLand = new EscapeGame ("freeLand", (gameCanvas.width - (gameCanvas.width / 8)), 0, (gameCanvas.width / 8), (gameCanvas.height), 0, "./media/Ferry-building.png")
    alcatraz = new EscapeGame("alcatraz", 0, (gameCanvas.height / 4), (gameCanvas.width / (13/2)), (gameCanvas.height / 2), 0, "./media/AlcatrazImage.png")
    fugative = new EscapeGame("fugative", (gameCanvas.width / (13/2)), (gameCanvas.height / 2), (gameCanvas.width / 12), (gameCanvas.height / 12), (gameCanvas.width / 300), "./media/fugative.png");
    police1 = new EscapeGame("police1", (gameCanvas.width / 3), (gameCanvas.height / 4), (gameCanvas.width / 7), (gameCanvas.height / 6), (gameCanvas.height / 12), "./media/police-boat1.png");
    police2 = new EscapeGame("police2", (gameCanvas.width / 2), (gameCanvas.height - (gameCanvas.height / 4)), (gameCanvas.width / 7), (gameCanvas.height / 6), (gameCanvas.height / 12), "./media/police-boat2.png");
    policeheli = new EscapeGame("policeheli", (gameCanvas.width - (gameCanvas.width / 4)), (gameCanvas.height / 4), (gameCanvas.width / 7), (gameCanvas.height / 3), (gameCanvas.height / 10), "./media/police-heli.png");
    clearInterval(gameLoopInterval);
    clearInterval(searchLoop);
    clearInterval(commentaryLoop);
    gameLoopInterval = setInterval (gameLoop, 50);
    searchLoop = setInterval(fugativeSearch, 1000);
    commentaryLoop = setInterval(detectCommentary, 50);
    document.addEventListener("keydown", keyPressEvent);
    gameDistance.innerText = `${(gameCanvas.width - (fugative.x + fugative.width + freeLand.width).toFixed(0))}`;
    gameStatusHeader.innerText = "Distance remaining:"
    gameCommentary.innerText = `"Let's get a move on!"`;
}


// START GAME BUTTON FUNCTION END
}
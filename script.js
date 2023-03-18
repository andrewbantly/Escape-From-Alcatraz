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
console.log(`height: ${(canvas).height} width: ${(canvas).width}`);

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
let centerWidth = (getComputedStyle(canvas).width / 2);
let centerHeight = (getComputedStyle(canvas).height / 2);
const fugative = new Escape(550, 480, 50, 50, "beige");
const police = new Escape(350, 300, 75, 100, "blue");

// RENDER REFRESH
const gameLoopInterval = setInterval (gameLoop, 50);

// HUMAN KEYBOARD CONTROLS 
function keyPressEvent(e) {
    const distance = 5;
    console.log(e);  
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
    gameStatus.innerText = `distance remaing: ${1470 + fugative.y}`;
    }

document.addEventListener("keydown", keyPressEvent);
                            
// COLLISION DETECTION FUNCTION
function detectHit () {
    const left = police.x <= fugative.width + fugative.x;
    const right = police.x + police.width >= fugative.x;
    const top = police.y <= fugative.y + fugative.height;
    const bottom = police.y + police.height >= fugative.y;
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
        police.render();
    }
}

// BACKGROUND

// const canvasBg = document.querySelector("#canvasBg");
// console.log(canvasBg.src)
// function bgAni () {
    //     canvasBg.src = "/Users/andrew/seir-306/unit1/Escape-From-Alcatraz/media/Water.jpg"
    //     canvasBg.x = 0;
    //     canvasBg.y = 0; 
    //     canvasBg.render = function () {
        //         ctx.drawImage(canvasBg, 0, canvasBg.y--);
//         if(canvasBg.y <= -499) {
//             canvasBg.y = 0;
//         }
//     }
// }
//     bgAni.render();
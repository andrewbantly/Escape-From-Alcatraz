obstacleMovement (objectA, objectB) {
    let randomDirection = Math.floor(Math.random() * 4);
        if (randomDirection === 0 && inBoundsDetection(objectA) === true) {
            if (obstacleCollision(objectA, objectB) === false) {
            objectA.x += this.speed;
            console.log(`${objectA.name} moved normal right`)
        } else if (obstacleCollision(objectA, objectB) === true) {
            objectA.x -= this.speed;
            console.log(`${objectA.name} moved avoid left`)
        }
    } else if (randomDirection === 1 && inBoundsDetection(objectA) === true) {
        if (obstacleCollision(objectA, objectB) === false) {
            objectA.x -= this.speed;
            console.log(`${objectA.name} moved normal left`)
        } else if (obstacleCollision(objectA, objectB) === true) {
            objectA.x += this.speed;}
            console.log(`${objectA.name} moved avoid right`)
        } else if (randomDirection === 2 && inBoundsDetection(objectA) === true) {
            if (obstacleCollision(objectA, objectB) === false) {
                objectA.y += this.speed;
                console.log(`${objectA.name} moved normal up`)
            } else if (obstacleCollision(objectA, objectB) === true) {
                objectA.y -= this.speed;
                console.log(`${objectA.name} moved avoid down`)
            }
        } else if (randomDirection === 3 && inBoundsDetection(objectA) === true) {
            if (obstacleCollision(objectA, objectB) === false) {
                objectA.y -= this.speed;
                console.log(`${objectA.name} moved normal down`)
                } else if (obstacleCollision(objectA, objectB) === true) {
                    objectA.y += this.speed;
                    console.log(`${objectA.name} moved avoid up`)
                }
        } else if (inBoundsDetection(objectA) === false) {
            borderAvoid(objectA);
            console.log(`${objectA.name} is out of bounds`);
        }
}    

// BREAK

obstacleMovement (objectA, objectB) {
    let randomDirection = Math.floor(Math.random() * 4);
        if (randomDirection === 0 && inBoundsDetection(objectA) === true) {
            if (obstacleDetectionRight(objectA, objectB) === false) {
                this.x += this.speed;
                console.log(`${objectA.name} moved right normal.`)
            } else {
                this.x -= this.speed;
                console.log(`${objectA.name} moved left avoid.`)
            }}
            else if (randomDirection === 1 && inBoundsDetection(objectA) === true) {
                if (obstacleDetectionLeft(objectA, objectB) === false){
                    this.x -= this.speed;
                    console.log(`${objectA.name} moved left normal.`)
                } else {
                    this.x += this.speed;
                    console.log(`${objectA.name} moved right avoid.`)
                }
            }
            else if (randomDirection === 2 && inBoundsDetection(objectA) === true) {
                if (obstacleDetectionTop(objectA, objectB) === false) {
                    this.y += this.speed;
                    console.log(`${objectA.name} moved up normal.`)
                } else {
                    this.y -= this.speed;
                    console.log(`${objectA.name} moved down avoid.`)
                }
            } else if (randomDirection === 3 && inBoundsDetection(objectA) === true) {
                if (obstacleDetectionBottom (objectA, objectB) === false) {
                    this.y -= this.speed;
                    console.log(`${objectA.name} moved down normal.`)
                } else {
                    this.y += this.speed;
                    console.log(`${objectA.name} moved up avoid.`)
            }
        } else if (inBoundsDetection(objectA) === false) {
            borderAvoid(objectA);
            console.log(`${objectA.name} is out of bounds`);
        }
}  



function obstacleDetectionRight(objectA, objectB) {
    let rightObject = objectA.x + objectA.width >= objectB.x
    if (rightObject === true) {
        return true
    } return false;
}
function obstacleDetectionLeft(objectA, objectB) {
    let leftObject = objectA.x <= objectB.width + objectB.x;
    if (leftObject === true) {
        return true
    } return false;
}
function obstacleDetectionTop(objectA, objectB) {
    let topObject = objectA.y <= objectB.y + objectB.height;
    if (topObject === true) {
        return true
    } return false;
}
function obstacleDetectionBottom (objectA, objectB) {
    let bottomObject = objectA.y + objectA.height >= objectB.y;
    if (bottomObject) {
        // console.log("obstacles have collided.");
        return true;
    } 
    // console.log("obstacles have not collided.");
    return false;
}
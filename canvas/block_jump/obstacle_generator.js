function drawObstacles(obstacle) {
    ctx.beginPath();
    ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fillStyle = obstacle.color;
    ctx.fill();
    ctx.closePath();
}

function generateObstacles() {
    generateObject();
}

function generateObject() {
    if (!currentObstacle) getObstacle();
    if (currentObstacle.x < -currentObstacle.width) {
        user.score++;
        scoreEl.innerText = user.score;
        currentObstacle = null;
        getObstacle();
        if (iterations !== increaseVel) iterations++;
        else {
            velocity += 0.5;
            iterations = 0;
            vel.innerText = velocity;
        }
    } else {
        drawObstacles(currentObstacle);
        currentObstacle.x -= velocity;
    }
}

function getObstacle() {
    const random = Math.floor(Math.random() * obstacles.length);
    currentObstacle = Object.create(obstacles[random]);
    currentObstacle.x = canvas.width + currentObstacle.width;
    currentObstacle.y = canvas.height - currentObstacle.height;
}
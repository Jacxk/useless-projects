let canvas = document.getElementById("bg");
let ctx = canvas.getContext("2d");
let gameover = document.getElementById('gameover');
let scoreEl = document.getElementById('score');
let vel = document.getElementById('vel');
let highScoreEl = document.getElementById('highScore');

let interval;
let user = {
    x: 20,
    y: null,
    width: 20,
    height: 20,
    color: '#f4413d',
    jumping: false,
    onAir: false,
    falling: false,
    highScore: 0,
    score: 0
};
let obstacles = [
    {x: null, y: null, width: 20, height: 40, color: '#1b1b1b', type: 'small'},
    {x: null, y: null, width: 20, height: 70, color: '#1b1b1b', type: 'medium'},
    {x: null, y: null, width: 20, height: 100, color: '#1b1b1b', type: 'large'},
];

let increaseVel = 5, iterations = 0, velocity = 1, currentObstacle;

function start() {
    let highScore = localStorage.getItem('highScore');

    gameover.style.display = 'none';
    scoreEl.innerText = '0';
    vel.innerText = velocity + '';

    if (highScore) {
        highScore = parseInt(highScore);
        user.highScore = highScore;
    }

    highScoreEl.innerText = user.highScore + '';

    ctx.canvas.width = window.innerWidth - 100;
    ctx.canvas.height = window.innerHeight - 200;

    if (!interval) interval = setInterval(draw, 1);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawUser();
    generateObstacles();
    move();
    killUser();
}

function drawUser() {
    if (!user.y) user.y = canvas.height - user.height;

    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = user.color;
    ctx.fill();
    ctx.closePath();
}

function restart() {
    end();
    start();
}

function end() {
    clearInterval(interval);

    if (user.score > user.highScore) {
        localStorage.setItem('highScore', user.score + '');
        user.highScore = user.score;
    }

    interval = null;
    currentObstacle = null;
    user.y = null;
    user.x = 20;
    user.score = 0;
    velocity = 1;
    iterations = 0;
}

function killUser() {
    if (user.x < currentObstacle.x + currentObstacle.width && user.x + user.width > currentObstacle.x
        && user.y > currentObstacle.y - user.height) {

        gameover.style.display = 'block';
        end()
    }
}

start();
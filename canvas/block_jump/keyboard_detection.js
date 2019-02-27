let up, right, down, left;

document.addEventListener('keydown', function (e) {
    let keyCode = e.keyCode;
    switch (keyCode) {
        // down
        case 40:
            down = true;
            break;
        // right
        case 39:
            right = true;
            break;
        // up
        case 38:
            user.jumping = true;
            if (!user.falling) up = true;
            break;
        // space
        case 32:
            user.jumping = true;
            if (!user.falling) up = true;
            break;
        // left
        case 37:
            left = true;
            break;
        case 82:
            restart();
            break;
    }
});

document.addEventListener('keyup', function (e) {
    let keyCode = e.keyCode;
    switch (keyCode) {
        // down
        case 40:
            down = false;
            break;
        // right
        case 39:
            right = false;
            break;
        // up
        case 38:
            up = false;
            fall();
            break;
        // space
        case 32:
            up = false;
            fall();
            break;
        // left
        case 37:
            left = false;
            break;
    }
});

let jumpDistance = canvas.height - user.height - 150;
let downInterval;

function move() {
    if (down && user.y < canvas.height - user.height) user.y+=1.5;
    if (up && user.y > 0) jump();
    if (left && user.x > 0) user.x-=1.5;
    if (right && user.x < canvas.width - user.width) user.x+=1.5;
}

function jump() {
    if (down) return;
    if (user.jumping && !user.falling && user.y !== jumpDistance) user.y-=1.5;
    else if (!user.falling && user.y === jumpDistance) fall();
}

function fall() {
    if (down) return;
    user.falling = true;
    user.jumping = false;
    if (!downInterval) downInterval = setInterval(() => {
        if (user.y >= canvas.height - user.height) {
            user.jumping = false;
            user.falling = false;
            clearInterval(downInterval);
            downInterval = null;
            user.y = canvas.height - user.height;
        } else user.y+=1.5;
    }, 1)
}

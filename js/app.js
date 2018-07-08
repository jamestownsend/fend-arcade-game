// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // start enemy back at the original position once off canvas.
    if (this.x > 600) {
      this.x = -100;
      this.speed = 95 + Math.floor(Math.random() * 1028);
    }

    this.checkCollision();
};

// Collision code adapted from:
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

Enemy.prototype.checkCollision = function() {
    //creates collision zones for player and enemy
    let playerZone = { x: player.x, y: player.y, width: 50, height: 50 };
    let enemyZone = { x: this.x, y: this.y, width: 50, height: 50 };

    if (playerZone.x < enemyZone.x + enemyZone.width &&
        playerZone.x + playerZone.width > enemyZone.x &&
        playerZone.y < enemyZone.y + enemyZone.height &&
        playerZone.height + playerZone.y > enemyZone.y) {
        //Resets player at start upon collision;
        document.body.style.backgroundColor = "red";
        setTimeout(function(){document.body.style.backgroundColor = "white";}, 400);
        setTimeout(function(){alert("Ouch, Try again!");}, 400);
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "18px arial MS";
    ctx.fillText("Score: " + player.playerScore, 20, 90);
};

// Now write your own player class
var Player = function(x, y, speed) {
// This class requires an update(), render() and
// a handleInput() method.
this.x = x;
this.y = y;
this.speed = speed;
this.playerScore = 0
// The image/sprite for our player, this uses
this.sprite = 'images/char-boy.png';
}

//Stops player from being able to move outside of the game map.
Player.prototype.update = function() {

    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }
    // Resets player at the start after reaching the top
    if (this.y < 0) {
      alert("Nice, Congratulations!")
      this.playerScore += 1;
      this.x = 200;
      this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemyPosition = [60, 140, 220];
var player = new Player(200, 400, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 258));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

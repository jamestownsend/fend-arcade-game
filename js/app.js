// Enemies our player must avoid
let Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = y;

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
    if (this.x > 505) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 20);
    }
    this checkCollision();
};

Enemy.prototype.checkCollision = function() {
    //creates collision zones for player and enemy
    let playerZone = {width: 50, height: 45, x: player.x, y: player.y};
    let enemyZone = {width: 55, height: 50, x: this.x, y: player.y};

    if (playerZone.x < enemyZone.x + enemyZone.width &&
        playerZone.x + playerZone.width > enemyZone.x &&
        playerZone.y < enemyZone.y + enemyZone.height &&
        playerZone.height + playerZone.y > enemyZone.y) {
        //resets player at start upon collision;
        player.x = 200;
        player.y = 380;
    }
};

    
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function(speed, x, y) {
// This class requires an update(), render() and
// a handleInput() method.
  this.speed = speed;
  this.x = x;
  this.y = y;

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

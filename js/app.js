// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Enemie always start to the left
    this.x = -100;
    // enemies get position y random / what is min, what is max?
    var y_random = Math.random();
    if (y_random < 0.33){
        this.y = 60;
    } else if (y_random > 0.66){
        this.y = 140;
    } else{
        this.y = 230;
    }
    // also enemies have random speed
    this.speed = (0.4 + Math.random() * 1.5) * 100; // [40 - 140]; some speed value
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.lives = 3;
    this.wins = 0;
    // as position is set more often
    this.reset();
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.update = function(dt) {
    // ???

};
// sets the position, but not avatar, lives & wins
Player.prototype.reset = function() {
    this.x = 203;
    this.y = 380;
    this.speedX = 101;
    this.speedY = 83;
};

Player.prototype.handleInput = function(sInput) {
    if('left' === sInput){
        if(this.x >= this.speedX){
            this.x -= this.speedX;
        }
    } else if ('up' === sInput){
        if(this.y >= this.speedY){
            this.y = this.y - this.speedY;
        }else{
            this.win();
        }
    } else if ('right' === sInput){
        if(this.x <= 420 - this.speedX){
            this.x = this.x + this.speedX;
        }
    } else if ('down' === sInput){
        if(this.y <= 440 - this.speedY){
            this.y = this.y + this.speedY;
        }
    } else if('space' === sInput){
        this.changeAvatar();
    }
};
Player.prototype.win = function() {

    this.wins++;
    this.reset();
}
// decrease lives value. and give alert if game is finished and reset
Player.prototype.loose = function() {
    this.lives--;
    if(this.lives < 0){
        if(this.wins == 0){
            alert("You made " + this.wins + " wins - Try again!");
        } else if(this.wins == 1){
            alert("You made " + this.wins + " win - Keep going!");
        } else if(this.wins > 5){
            alert("You made " + this.wins + " wins - Thank you for playing!");
        } else{
            alert("You made " + this.wins + " wins - You can do better!");
        }
        this.lives = 3;
        this.wins = 0;
    }

    this.reset();
}
// change avatar by chaning this.sprite
Player.prototype.changeAvatar = function() {
    console.log("Changed from: " + this.sprite);
    if(this.sprite == 'images/char-boy.png'){
        this.sprite = 'images/char-cat-girl.png';
    } else if(this.sprite == 'images/char-cat-girl.png'){
        this.sprite = 'images/char-horn-girl.png';
    } else if(this.sprite == 'images/char-horn-girl.png'){
        this.sprite = 'images/char-pink-girl.png';
    } else if(this.sprite == 'images/char-pink-girl.png'){
        this.sprite = 'images/char-princess-girl.png';
    } else if(this.sprite == 'images/char-princess-girl.png'){
        this.sprite = 'images/char-boy.png';
    }
    console.log("Changed to: " + this.sprite);
}
// collisionTolerance seems to be ok with 50
var collisonTolerace = 50;
// is it in the box? - if the Enemy/bug/hater is near the avatar we loose
Player.prototype.collisionCheck= function(hater){
    if(this.x < hater.x + collisonTolerace &&
        this.x > hater.x - collisonTolerace &&
        this.y < hater.y + collisonTolerace &&
        this.y > hater.y - collisonTolerace) {
            this.loose();
        }
    };
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

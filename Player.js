/**
 * Main character controlled by the user
 */
class Player extends Character {
    /**
     * @param game {Game} The instance of the game to which the player belongs
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
              width = PLAYER_WIDTH * game.width / 100,
              x = (game.width - width) / 2,
              y = game.height - height - 30,
              speed = PLAYER_SPEED,
              myImage = PLAYER_PICTURE,
              myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);

        // ✅ NEW: lives
        this.lives = INITIAL_LIVES;
    }

    /**
     * Update the player's position attributes
     */
    update() {
        if (!this.dead && !this.game.ended) {
            if (this.game.keyPressed === KEY_LEFT && this.x > this.speed) {
                this.x -= this.speed;
            } else if (this.game.keyPressed === KEY_RIGHT && this.x < this.game.width - this.width - this.speed) {
                this.x += this.speed;
            } else if (this.game.keyPressed === KEY_SHOOT) {
                this.game.shoot(this);
            }
        }
    }

    /**
     * What happens when the player gets hit
     */
    collide() {
        if (this.dead) return;

        // ✅ Lose one life
        this.lives -= 1;
        this.game.updateHUD();

        if (this.lives > 0) {
            // Temporary death (2 seconds)
            super.collide();

            // Revive after 2 seconds
            setTimeout(() => {
                this.image.src = this.myImage;
                this.dead = false;
            }, 2000);
        } else {
            // No lives left → permanent death
            super.collide();
            this.game.endGame();
        }
    }
}

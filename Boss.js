/**
 * Final Boss — appears after the triangle is destroyed.
 * Uses boss.png and boss_dead.png images and moves faster.
 */
class Boss extends Opponent {
    constructor(game) {
        super(game);

        // ✅ Replace the triangle image with the pentagon boss
        this.myImage = "assets/boss.png";
        this.myImageDead = "assets/boss_dead.png";
        this.image.src = this.myImage;

        // ✅ Make it bigger and faster
        this.width *= 1.5;
        this.height *= 1.5;
        this.speed *= 2;
    }

    collide() {
        if (!this.dead) {
            this.game.score += 1;
            setTimeout(() => {
                this.game.removeOpponent(true);
            }, 2000);
            super.collide();
        }
    }
}

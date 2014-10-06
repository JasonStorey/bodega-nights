define(['Phaser'], function(Phaser) {
    function Enemy(game, config) {
        this.game = game;
        this.config = {
            x: config.x,
            y: config.y,
            health: config.health,
            maxVelocity: config.maxVelocity,
            sprite: config.sprite
        };

        this.sprite = this.game.add.sprite(this.config.x, this.config.y, this.config.sprite);
        this.sprite.anchor.setTo(0.5, 1);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.maxVelocity.setTo(this.config.maxVelocity.x, this.config.maxVelocity.y);
    }

    Enemy.prototype.reset = function reset() {
        this.sprite.reset(this.config.x, this.config.y, this.config.health);
    };

    Enemy.prototype.damage = function damage(n) {
        this.sprite.damage(n);
    };

    Enemy.prototype.hitTest = function hitTest(x, y) {
        return this.sprite.body.hitTest(x, y);
    };

    Enemy.prototype.isAlive = function isAlive() {
        return this.sprite.alive;
    };

    Enemy.prototype.update = function update() {
        if(this.sprite.body.x < this.game.world.width + this.sprite.body.halfWidth) {
            this.sprite.body.velocity.x = this.config.maxVelocity.x;
        } else {
            this.reset();
        }
    };

    return Enemy;
});
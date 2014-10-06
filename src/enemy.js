define(['Phaser'], function(Phaser) {
    function Enemy(game) {
        this.game = game;
    }

    Enemy.prototype.preload = function preload() {
        this.game.load.image('enemy', './assets/enemy.png');
    };

    Enemy.prototype.create = function create() {
        this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'enemy');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    };

    Enemy.prototype.damage = function damage() {
        this.sprite.body.x = this.game.rnd.integerInRange(0, this.game.width);
    };

    Enemy.prototype.update = function update() {

    };

    return Enemy;
});
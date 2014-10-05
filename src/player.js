define(['Phaser'], function (Phaser) {
    function Player(game) {
        this.game = game;
        this.acceleration = 100;
        this.maxVelocity = 2000;
    }

    Player.prototype.preload = function preload() {
        this.game.load.image('crosshair', './assets/crosshair.png');
    };

    Player.prototype.create = function create() {
        this.crosshairs = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'crosshair');
        this.crosshairs.anchor.setTo(0.5, 0.5);
        this.crosshairs.scale.setTo(0.5, 0.5);

        this.game.physics.enable(this.crosshairs, Phaser.Physics.ARCADE);
        this.crosshairs.body.maxVelocity.setTo(this.maxVelocity, this.maxVelocity);
        this.crosshairs.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
    };

    Player.prototype.update = function update() {

        if (this.cursors.left.isDown) {
            this.crosshairs.body.velocity.x -= this.acceleration;
        } else if (this.cursors.right.isDown) {
            this.crosshairs.body.velocity.x += this.acceleration;
        } else {
            this.crosshairs.body.velocity.x = this.crosshairs.body.velocity.x * 0.9;
        }

        if (this.cursors.up.isDown) {
            this.crosshairs.body.velocity.y -= this.acceleration;
        } else if (this.cursors.down.isDown) {
            this.crosshairs.body.velocity.y += this.acceleration;
        } else {
            this.crosshairs.body.velocity.y = this.crosshairs.body.velocity.y * 0.9;
        }
    };

    return Player;
});
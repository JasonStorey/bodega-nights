define(['Phaser'], function (Phaser) {

    function Player(game) {
        this.game = game;
        this.acceleration = 100;
        this.maxVelocity = 2000;
        this.fireRate = 500;
        this._nextFire = 0;
    }

    Player.prototype.preload = function preload() {
        this.game.load.image('crosshair', './assets/crosshair.png');
        this.game.load.image('bullet-hole', './assets/bullet-hole.gif');
    };

    Player.prototype.create = function create() {
        var hitbox;

        this.crosshairs = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'crosshair');
        this.crosshairs.anchor.setTo(0.5, 0.5);
        this.crosshairs.scale.setTo(0.5, 0.5);

        this.game.physics.enable(this.crosshairs, Phaser.Physics.ARCADE);
        this.crosshairs.body.setSize(10, 10);
        this.crosshairs.body.maxVelocity.setTo(this.maxVelocity, this.maxVelocity);
        this.crosshairs.body.collideWorldBounds = true;

        this.hitboxes = this.game.add.group();

        for(var i = 0; i < 10; i++) {
            hitbox = this.game.add.sprite(10, 10, 'bullet-hole');
            hitbox.anchor.setTo(0.5, 0.5);
            hitbox.kill();
            this.hitboxes.add(hitbox);
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.firekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };

    Player.prototype.update = function update() {

        if (this.firekey.isDown) {
            this.attack();
        }

        if (this.cursors.left.isDown) {
            this.crosshairs.body.velocity.x -= this.acceleration;
        } else if (this.cursors.right.isDown) {
            this.crosshairs.body.velocity.x += this.acceleration;
        } else {
            this.crosshairs.body.velocity.x = this.crosshairs.body.velocity.x * 0.7;
        }

        if (this.cursors.up.isDown) {
            this.crosshairs.body.velocity.y -= this.acceleration;
        } else if (this.cursors.down.isDown) {
            this.crosshairs.body.velocity.y += this.acceleration;
        } else {
            this.crosshairs.body.velocity.y = this.crosshairs.body.velocity.y * 0.7;
        }
    };

    Player.prototype.render = function render() {

    };

    Player.prototype.checkHitboxes = function checkHitboxes(object) {
        this.hitboxes.forEachAlive(function(hitbox) {
            if(object.sprite.body.hitTest(hitbox.x, hitbox.y)) {
                object.damage();
            }
        });
    };

    Player.prototype.attack = function attack() {
        var hitbox;

        if (this.game.time.now < this._nextFire) {
            return;
        }

        hitbox = this.hitboxes.getFirstDead();
        hitbox.lifespan = 100;
        hitbox.reset(this.crosshairs.body.center.x, this.crosshairs.body.center.y, 1);

        this._nextFire = this.game.time.now + this.fireRate;
    };

    return Player;
});
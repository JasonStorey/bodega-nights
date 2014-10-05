define(['Phaser'], function (Phaser) {
    var game,
        cursors,
        crosshair;

    function init(containerElement) {
        game = new Phaser.Game('100', '100', Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        game.load.image('crosshair', './assets/crosshair.png');
    }

    function create() {
        crosshair = game.add.sprite(game.width / 2, game.height / 2, 'crosshair');
        crosshair.anchor.setTo(0.5, 0.5);
        crosshair.scale.setTo(0.5, 0.5);

        game.physics.enable(crosshair, Phaser.Physics.ARCADE);
        crosshair.body.drag.set(0.5);
        crosshair.body.maxVelocity.setTo(2000, 2000);
        crosshair.body.collideWorldBounds = true;

        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        var acceleration = 100;

        if (cursors.left.isDown) {
            crosshair.body.velocity.x -= acceleration;
        } else if (cursors.right.isDown) {
            crosshair.body.velocity.x += acceleration;
        } else {
            crosshair.body.velocity.x = crosshair.body.velocity.x * 0.9;
        }

        if (cursors.up.isDown) {
            crosshair.body.velocity.y -= acceleration;
        } else if (cursors.down.isDown) {
            crosshair.body.velocity.y += acceleration;
        } else {
            crosshair.body.velocity.y = crosshair.body.velocity.y * 0.9;
        }
    }

    return {
        init: init
    };
});
define(['Phaser', 'player', 'enemy'], function (Phaser, Player, Enemy) {
    var game,
        player,
        enemy;

    function init(containerElement) {
        game = new Phaser.Game('100', '100', Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });

        enemy = new Enemy(game);
        player = new Player(game);
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        enemy.preload();
        player.preload();
    }

    function create() {
        enemy.create();
        player.create();
    }

    function update() {
        player.checkHitboxes(enemy);

        enemy.update();
        player.update();
    }

    return {
        init: init
    };
});
define(['Phaser', 'player', 'enemy'], function (Phaser, Player, Enemy) {
    var game,
        player,
        enemy;

    function init(containerElement) {
        game = new Phaser.Game('100', '100', Phaser.CANVAS, containerElement, {
            preload: preload,
            create: create,
            update: update,
            render: render
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

    function render() {
        player.render();
    }

    return {
        init: init
    };
});
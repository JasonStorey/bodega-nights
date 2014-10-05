define(['Phaser', 'player'], function (Phaser, Player) {
    var game,
        player;

    function init(containerElement) {
        game = new Phaser.Game('100', '100', Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });

        player = new Player(game);
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        player.preload();
    }

    function create() {
        player.create();
    }

    function update() {
        player.update();
    }

    return {
        init: init
    };
});
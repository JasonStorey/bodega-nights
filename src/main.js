define(['Phaser'], function (Phaser) {
    var game;

    function init(containerElement) {
        game = new Phaser.Game(800, 600, Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });
    }

    function preload() {}

    function create() {}

    function update() {}

    return {
        init: init
    };
});
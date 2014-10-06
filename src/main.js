define(['Phaser', 'player', 'enemies'], function (Phaser, Player, enemies) {
    var game,
        player;

    function init(containerElement) {
        game = new Phaser.Game('100', '100', Phaser.CANVAS, containerElement, {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

        enemies.init(game);
        player = new Player(game);
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        enemies.preload();
        player.preload();
    }

    function create() {
        enemies.create(10);
        player.create();
    }

    function update() {
        enemies.getLivingEnemies().forEach(function(enemy) {
            player.hitboxes.forEachAlive(function(hitbox) {
                if(enemy.hitTest(hitbox.x, hitbox.y)) {
                    enemy.damage(1);
                }
            });
        });

        enemies.update();
        player.update();
    }

    function render() {
        player.render();
    }

    return {
        init: init
    };
});
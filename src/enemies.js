define(['Phaser', 'enemy'], function (Phaser, Enemy) {
    var ROWS = [],
        numOfRows = 3,
        enemies = [],
        _game;

    function init(game) {
        _game = game;
    }

    function preload() {
        _game.load.image('enemy', './assets/enemy.png');
    }

    function create(n) {
        var rowHeight = _game.world.height / numOfRows,
            enemy;

        for(var i = 1; i <= numOfRows; i++) {
            ROWS.push(rowHeight * i);
        }

        for(var j = 0; j < n; j++) {
            enemy = new Enemy(_game, {
                sprite: 'enemy',
                x: _game.rnd.integerInRange(-1000, -100),
                y: _game.rnd.pick(ROWS),
                health: 1,
                maxVelocity: {x: 100, y: 100}
            });

            enemies.push(enemy);
        }
    }

    function update() {
        enemies.forEach(function(enemy) {
            if(!enemy.isAlive()) {
                enemy.reset();
            }

            enemy.update();
        });
    }

    function getEnemies() {
        return enemies;
    }

    function getLivingEnemies() {
        return getEnemies().filter(function(enemy) {
            return enemy.isAlive();
        });
    }

    return {
        init: init,
        preload: preload,
        create: create,
        update: update,
        getEnemies: getEnemies,
        getLivingEnemies: getLivingEnemies
    };
});
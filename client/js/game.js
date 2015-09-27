var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var player;
var ball;
var cursors;
var objects;
var wasd;
function preload() {
  game.load.image('player', 'cruzeiro.png');
  game.load.image('ball', 'ball.png');
  game.load.image('player2', 'galaum.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  objects = game.add.group();
  objects.enableBody = true;

  player = objects.create(0, 0, 'player');
  player2 = objects.create(100, 200, 'player2');
  player2.scale.setTo(0.5, 0.5);
  ball = objects.create(400, 300, 'ball');
  ball.scale.setTo(0.2, 0.2);

  //  We need to enable physics on the player
  game.physics.arcade.enable(objects);

  //Player physics properties. Give the little guy a slight bounce.
  objects.children.forEach(function(child) {
    child.body.bounce.y = 0.5;
    child.body.bounce.x = 0.5;
    child.body.collideWorldBounds = true;
  });

  cursors = game.input.keyboard.createCursorKeys();

  wasd = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D),
  };
}

function update() {
  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(objects, objects);

  movePlayers();
}

function movePlayers() {
  //  Reset the players velocity (movement)
  objects.children.forEach(function(child) {
    child.body.velocity.x = 0;
    child.body.velocity.y = 0;
  });

  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
  }

  if (cursors.down.isDown) {
    player.body.velocity.y = 150;
  }else if (cursors.up.isDown) {
    player.body.velocity.y = -150;
  }

  if (wasd.left.isDown) {
    player2.body.velocity.x = -150;
  } else if (wasd.right.isDown) {
    player2.body.velocity.x = 150;
  }

  if (wasd.down.isDown) {
    player2.body.velocity.y = 150;
  }else if (wasd.up.isDown) {
    player2.body.velocity.y = -150;
  }
}

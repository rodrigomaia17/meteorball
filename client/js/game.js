var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var player;
var ball;
var cursors;

function preload() {
  game.load.image('player', 'cruzeiro.png');
  game.load.image('ball', 'ball.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(0, 0, 'player');
  ball = game.add.sprite(400, 300, 'ball');
  ball.scale.setTo(0.2, 0.2);

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);
  game.physics.arcade.enable(ball);

  //Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.5;
  player.body.bounce.x = 0.5;
  player.body.collideWorldBounds = true;
  ball.body.bounce.y = 0.5;
  ball.body.bounce.x = 0.5;
  ball.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, ball);

  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

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
}

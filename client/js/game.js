var socket = io();
var myId = uuid.v4();

//socket.emit('register myself', myId);

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var player;
var ball;
var cursors;
var objects;
var wasd;

var players = [];

//criar o array de players

function preload() {
  game.load.image('player', 'cruzeiro.png');
  game.load.image('ball', 'ball.png');
}

function create() {
  game.stage.disableVisibilityChange = true;
  game.time.desiredFPS = 30;

  game.physics.startSystem(Phaser.Physics.ARCADE);

  objects = game.add.group();

  player = objects.create(0, 0, 'player');
  ball = objects.create(400, 300, 'ball');
  ball.scale.setTo(0.2, 0.2);

  objects.enableBody = true;

  //  We need to enable physics on the player
  game.physics.arcade.enable(objects);

  //Player physics properties. Give the little guy a slight bounce.
  objects.children.forEach(function(child) {
    child.body.bounce.y = 0.5;
    child.body.bounce.x = 0.5;
    child.body.collideWorldBounds = true;
  });

  cursors = game.input.keyboard.createCursorKeys();

  socket.on('update ui', function(data) {
    var info = JSON.parse(data);

    var playerUpdated = players.find(function(p) { return p.id == info.id; });

    if (playerUpdated !== undefined) {
      console.log('criei um novo');
      var pa = playerUpdated;
      pa.x = info.x;
      pa.y = info.y;
      pa.body.velocity.x = info.velocityX;
      pa.body.velocity.y = info.velocityY;
    }else {
      console.log('usei o novo');
      var p = objects.create(0, 0, 'player');
      objects.enableBody = true;
      game.physics.arcade.enable(p);
      p.body.bounce.y = 0.5;
      p.body.bounce.x = 0.5;
      p.body.collideWorldBounds = true;
      p.id = info.id;
      players.push(p);
    }
  });
}

function update() {
  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(objects, objects);
  player.body.velocity.x -= 0;
  player.body.velocity.y -= 0;

  var changed = false;

  if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown)
    changed = true;

  if (changed) {
    movePlayers();

    var json = createJson();
    sendJson(json);
  }

}

function sendJson(json) {
  socket.emit('update positions', json);
}

function createJson() {
  var data = {
    id: myId,
    x: player.x,
    y: player.y,
    velocityX: player.body.velocity.x,
    velocityY: player.body.velocity.y,
  };

  return JSON.stringify(data);
}

function movePlayers() {

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

import { Engine, Actor, Color, CollisionType } from 'excalibur';

function newGame() : Engine {
  const game = new Engine({
    // Window properties are set by electron-main.js.
    // TODO: check if there's a way to sync them from here, so this is more self-contained.
    // width: 800,
    // height: 600,
  });

  return game
}

class Paddle extends Actor {
  constructor(x : number, y : number , width : number, height : number, color : Color) {
    super({
      x: x, y: y,
      width: width, height: height,
      color: color,
      collisionType: CollisionType.Fixed })
  }
}

function main() {
  const game = newGame()
  game.add(new Paddle(150, game.drawHeight-40, 200, 20, Color.Chartreuse))

  game.start()
}

main()

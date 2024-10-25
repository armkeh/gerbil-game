import * as ex from 'excalibur';

function newGame() : ex.Engine {
  const game = new ex.Engine({
    // Window properties are set by electron-main.js.
    // TODO: check if there's a way to sync them from here, so this is more self-contained.
    // width: 800,
    // height: 600,
  });

  return game
}

class Paddle extends ex.Actor {
  constructor(x : number, y : number , width : number, height : number, color : ex.Color) {
    super({
      x: x, y: y,
      width: width, height: height,
      color: color,
      collisionType: ex.CollisionType.Fixed })
  }

  public update(engine: ex.Engine, delta: number): void {
    if (
      engine.input.keyboard.isHeld(ex.Keys.A) ||
      engine.input.keyboard.isHeld(ex.Keys.Left)
    ) {
      this.pos.x -= 1
    }
    
    if (
      engine.input.keyboard.isHeld(ex.Keys.D) ||
      engine.input.keyboard.isHeld(ex.Keys.Right)
    ) {
      this.pos.x += 1
    }

    if (
      engine.input.keyboard.isHeld(ex.Keys.S) ||
      engine.input.keyboard.isHeld(ex.Keys.Down)
    ) {
      this.pos.x = engine.drawWidth - this.pos.x
    }

   super.update(engine, delta)
  }
}

function main() {
  const game = newGame()
  game.add(new Paddle(150, game.drawHeight-40, 200, 20, ex.Color.Chartreuse))

  game.start()
}

main()

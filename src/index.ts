import * as ex from 'excalibur';
import * as logger from "./utils/logger";

function newGame(): ex.Engine {
  const game = new ex.Engine({
    // Window properties are set by electron-main.js.
    // TODO: check if there's a way to sync them from here, so this is more self-contained.
    // width: 800,
    // height: 600,
  });

  return game
}

interface Bouncer {
  /** `bounce` is called by a `Ball` when it collides with a `Bouncer` */
  bounce(b: Ball): void;
}

/** Type guard for Bouncer objects */
function isBouncer(object: any): object is Bouncer {
  return 'bounce' in object;
}

class Paddle extends ex.Actor implements Bouncer {
  constructor(x : number, y : number , width : number, height : number, color : ex.Color) {
    super({
      x: x, y: y,
      width: width, height: height,
      color: color,
      collisionType: ex.CollisionType.Fixed })
  }

  public bounce(_b: Ball) {
    logger.info("A paddle has bounced a ball")
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

    // Flip to opposite side
    if (
      engine.input.keyboard.wasPressed(ex.Keys.S) ||
      engine.input.keyboard.wasPressed(ex.Keys.Down)
    ) {
      this.pos.x = engine.drawWidth - this.pos.x
    }

    super.update(engine, delta)
  }
}

class Ball extends ex.Actor {
  private colliding = false

  constructor(x : number, y : number , radius : number, color : ex.Color) {
    super({
      x: x, y: y,
      radius: radius,
      color: color,
      collisionType: ex.CollisionType.Passive })
  }

  public serve(velocity: ex.Vector, afterMilliseconds: number): void {
    setTimeout(() => { this.vel = velocity}, afterMilliseconds)
  }

  // "Dumb" fallback collision logic for edge of screen (should prefer handling with actors on borders)
  public _postupdate(engine: ex.Engine, delta: number): void {
    // Sides of screen, reverse x velocity
    if (this.pos.x < this.width / 2 || this.pos.x + this.width / 2 > engine.drawWidth) {
      this.vel.x *= -1;
    }

    // Top of screen, reverse y velocity
    if (this.pos.y < this.height / 2) {
      this.vel.y *= -1;
    }

    super._postupdate(engine, delta)
  }

  public onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
   const intersection = contact.mtv.normalize()

    // Only "bounce" once per collision; reset the flag when collision ends (see onCollisionEnd)
    if (!this.colliding) {
      this.colliding = true
      // The largest component of intersection is our axis to flip
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
      }
    }

    super.onCollisionStart(self, other, side, contact)
  }

  public onCollisionEnd(self: ex.Collider, other: ex.Collider, side: ex.Side, lastContact: ex.CollisionContact): void {
    this.colliding = false

    if (isBouncer(other.owner)) {
      other.owner.bounce(this)
    }

    super.onCollisionEnd(self, other, side, lastContact)
  }
}

function main() {
  const game = newGame()

  game.add(new Paddle(150, game.drawHeight-40, 200, 20, ex.Color.Chartreuse))

  logger.appendLogsToScreen(game)

  const ball = new Ball(100, 300, 10, ex.Color.Red)
  game.add(ball)
  ball.serve(ex.vec(100,100), 1000)

  game.start()
}

main()

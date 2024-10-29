import * as ex from 'excalibur'

import { Bouncer } from './bouncer'
import { Ball } from './ball'
import * as logger from '../utils/logger'

export class Paddle extends ex.Actor implements Bouncer {
  constructor(x : number, y : number , width : number, height : number, color : ex.Color) {
    super({
      x: x, y: y,
      width: width, height: height,
      color: color,
      collisionType: ex.CollisionType.Fixed })
  }

  public bounce(b: Ball) {
    logger.info("A paddle has bounced a ball")

    b.strike(ex.vec(b.vel.x + 100, b.vel.y - 100)) // Note: temporary implicit assumption ball should move "up and right"
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

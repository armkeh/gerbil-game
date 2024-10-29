import * as ex from 'excalibur'

import { isBouncer } from './bouncer'

export class Ball extends ex.Actor {
  private colliding = false

  constructor(x : number, y : number , radius : number, color : ex.Color) {
    super({
      x: x, y: y,
      radius: radius,
      color: color,
      collisionType: ex.CollisionType.Passive })
  }

  public strike(velocity: ex.Vector) {
    // TODO: Instead "add" velocities, acceleration, etc. (maintaining current direction)
    this.vel = velocity
  }

  /** `serve`ing a `Ball` immediately cancels its current movement,
      and sets its new velocity after `serveTimeMilliseconds`. */
  public serve(velocity: ex.Vector, serveTimeMilliseconds: number) {
    this.vel = ex.vec(0,0)
    // TODO: Handle acceleration, etc.

    setTimeout(() => { this.strike(velocity) }, serveTimeMilliseconds)
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

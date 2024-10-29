import * as ex from 'excalibur';
import * as logger from "./utils/logger";

import { Paddle } from './actors/paddle'
import { Ball } from './actors/ball'

function newGame(): ex.Engine {
  const game = new ex.Engine({
    // Window properties are set by electron-main.js.
    // TODO: check if there's a way to sync them from here, so this is more self-contained.
    // width: 800,
    // height: 600,
  });

  return game
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

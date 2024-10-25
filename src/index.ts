import { Engine, Actor, Color } from 'excalibur';

function newGame() : Engine {
  const game = new Engine({
    // Window properties are set by electron-main.js.
    // TODO: check if there's a way to sync them from here, so this is more self-contained.
    // width: 800,
    // height: 600,
  });

  return game
}

function newPaddle(x : number, y : number , width : number, height : number, color : Color) : Actor {
  const paddle = new Actor({
    x: x,
    y: y,
    width: width,
    height: height,
    color: color,
  })

  return paddle
}

function main() {
  const game = newGame()
  game.add(newPaddle(150, game.drawHeight-40, 200, 20, Color.Chartreuse))

  game.start()
}

main()

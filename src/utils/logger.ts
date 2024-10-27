import { Logger, ScreenAppender, Color, Engine } from "excalibur"

export function appendLogsToScreen(game: Engine) {
  // Set up logging on screen
  const logger = Logger.getInstance();
  const screenAppender = new ScreenAppender({
    engine: game,
    color: Color.Black,
    xPos: 0
  });
  logger.addAppender(screenAppender);
}

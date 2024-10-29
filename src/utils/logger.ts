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

export function debug(...args: any[]) {
  Logger.getInstance().debug(args)
}

export function info(...args: any[]) {
  Logger.getInstance().info(args)
}

export function warn(...args: any[]) {
  Logger.getInstance().warn(args)
}

export function error(...args: any[]) {
  Logger.getInstance().error(args)
}

export function fatal(...args: any[]) {
  Logger.getInstance().fatal(args)
}

export function debugOnce(...args: any[]) {
  Logger.getInstance().debugOnce(args)
}

export function infoOnce(...args: any[]) {
  Logger.getInstance().infoOnce(args)
}

export function warnOnce(...args: any[]) {
  Logger.getInstance().warnOnce(args)
}

export function errorOnce(...args: any[]) {
  Logger.getInstance().errorOnce(args)
}

export function fatalOnce(...args: any[]) {
  Logger.getInstance().fatalOnce(args)
}

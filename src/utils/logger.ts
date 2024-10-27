import pino, { LoggerOptions } from "pino";

const loggerOpts: LoggerOptions = {
  level: "debug",
}

export const logger = pino(loggerOpts)

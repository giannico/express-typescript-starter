export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  VERBOSE = 'verbose',
  DEBUG = 'debug'
}

// reverse map for looking up LogLevel by value
const LOG_LEVELS: { [index: string]: LogLevel } = {
  [LogLevel.ERROR]: LogLevel.ERROR,
  [LogLevel.WARN]: LogLevel.WARN,
  [LogLevel.INFO]: LogLevel.INFO,
  [LogLevel.VERBOSE]: LogLevel.VERBOSE,
  [LogLevel.DEBUG]: LogLevel.DEBUG,
}

export namespace LogLevel {
  export function getByValue(value: string): LogLevel {
    const logLevel: LogLevel = LOG_LEVELS[value];
    if (logLevel == null) {
      throw new Error(`${value} is not a valid log level!`);
    }

    return logLevel;
  }
}

import { createLogger, transports } from 'winston';

import { Logger } from './logger';
import { LogLevel } from './log-level';

export class LoggerFactory {
  static createConsoleLogger(logLevel: LogLevel | string): Logger {
    return createLogger({
      level: logLevel,
      transports: [
        new transports.Console()
      ]
    });
  }
}

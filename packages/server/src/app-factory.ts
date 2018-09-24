import errorhandler from 'errorhandler';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { Symbols, Config, Logger } from './injection-container';
import { ApiController } from './api';

@injectable()
export class AppFactory {
  constructor(
    @inject(Symbols.Config) private config: Config,
    @inject(Symbols.Logger) private logger: Logger,
    private apiController: ApiController
  ) {}

  create(): Express {
    const app = express();

    this.logger.info(`Mounting APIs at ${this.config.apiRoot}`);
    app.use(this.config.apiRoot, this.apiController.router);

    if (this.config.isDevelopment) {
      app.use(errorhandler());
    }

    return app;
  }
}

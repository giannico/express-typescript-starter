import * as express from 'express';
import bodyParser from 'body-parser';
import { inject, injectable } from 'inversify';

import { Symbols, Logger } from '../injection-container';
import { OAuth2Controller } from './oauth2.controller';

@injectable()
export class ApiController {
  router: express.Router;

  constructor(
    @inject(Symbols.Logger) private logger: Logger,
    private oauth2Controller: OAuth2Controller
  ) {
    this.router = this.createRouter();
  }

  private createRouter(): express.Router {
    const router = express.Router();

    // api middleware
    router.use(bodyParser.json());

    // api resources
    router.use('/oauth2', this.oauth2Controller.router);

    return router;
  }

}

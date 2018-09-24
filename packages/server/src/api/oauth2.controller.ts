import Boom from 'boom';
import * as express from 'express';
import { injectable } from 'inversify';

import { TokenDataService } from '../data';
import { wrapRoute } from '../utils';

@injectable()
export class OAuth2Controller {
  router: express.Router;

  constructor(
    private tokenDataService: TokenDataService
  ) {
    this.router = this.createRouter();
  }

  private createRouter() {
    const router = express.Router();

    router.post('/token', this.postToken);

    return router;
  }

  ////////////////////

  postToken = wrapRoute(async(req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const password = req.body.password;

    // TODO: add serializer
    if (username != 'test' || password != 'test') { throw Boom.unauthorized(); }

    const token = await this.tokenDataService.getToken(username, password);

    return res.json({ token });
  });
}
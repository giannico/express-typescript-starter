import { injectable } from 'inversify';

@injectable()
export class TokenDataService {
  constructor() {}

  getToken(username: string, password: string) {
    return Promise.resolve('token');
  }
}
import { Container } from 'inversify';
import { Config } from './config';
import { Logger, LoggerFactory } from './services';
import { AppFactory } from './app-factory';

export const Symbols = {
  Config: Symbol.for('Config'),
  Logger: Symbol.for('Logger')
}

export { Config, Logger };

export class InjectionContainer {
  public injector: Container;

  constructor(config: Config) {
    this.injector = this.getInjector(config);
  }

  private getInjector(config: Config) {
    const injector = new Container({
      autoBindInjectable: true,
      defaultScope: 'Singleton'
    });

    // abstract injections
    const loggerInstance = LoggerFactory.createConsoleLogger(config.logLevel);
    injector.bind<Logger>(Symbols.Logger).toConstantValue(loggerInstance);

    injector.bind<Config>(Symbols.Config).toConstantValue(config);

    injector.bind<AppFactory>(AppFactory).toSelf();

    return injector;
  }
}

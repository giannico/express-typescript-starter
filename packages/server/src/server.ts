import 'reflect-metadata';

import { AppFactory } from './app-factory';
import { Config, EnvironmentConfig } from './config';
import { InjectionContainer } from './injection-container';

// turn environment variables into typed configuration object
const config: Config = new EnvironmentConfig(process.env);

// create application injection container/injectables
const container: InjectionContainer = new InjectionContainer(config);

// log startup information using standard console
console.log(`Logging enabled: ${config.logLevel}`);

const app = container.injector.get(AppFactory).create();

app.listen(config.port, (error: any) => {
  if (error) {
    console.error('Unable to listen for connections', error);
    process.exit(10)
  }

  console.log(`application is listening on port: ${config.port}`);
});

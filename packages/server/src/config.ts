import { isInteger } from 'lodash';
import { LogLevel } from './services';

export enum ConfigItem {
  PORT = 'PORT',
  LOG_LEVEL = 'LOG_LEVEL',
  API_ROOT = 'API_ROOT',
  NODE_ENV = 'NODE_ENV'
}

export interface Config {
  port: number;
  logLevel: LogLevel;
  apiRoot: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export class EnvironmentConfig implements Config {
  port: number;
  logLevel: LogLevel;
  apiRoot: string;

  get isDevelopment() {
    return !this.isProduction;
  }

  get isProduction() {
    return this.env[ConfigItem.NODE_ENV] === 'production'
  }

  private env: NodeJS.ProcessEnv;

  constructor(env: NodeJS.ProcessEnv) {
    this.env = env;
    this.getSanitizedConfig();
  }

  private getSanitizedConfig() {
    this.port = this.getNumber(ConfigItem.PORT, 3000);

    const logLevelValue = this.env[ConfigItem.LOG_LEVEL] || LogLevel.INFO;
    this.logLevel = LogLevel.getByValue(logLevelValue);

    this.apiRoot = this.getString(ConfigItem.API_ROOT, '/api');
  }

  private getNumber(configItem: ConfigItem, defaultValue: number): number {
    const envValue: string | undefined = this.env[configItem];
    const value: number = envValue !== undefined ? parseInt(envValue, 10) : defaultValue;

    if (!isInteger(value)) {
      throw new Error(`Environment variable must be an integer: ${configItem}`);
    }

    return parseInt(value as any, 10);
  }

  private getString(configItem: ConfigItem, defaultValue: string) {
    return this.env[configItem] || defaultValue;
  }
}

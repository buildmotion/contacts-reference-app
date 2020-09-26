import { IConfiguration } from '@angular-architecture/configuration';
import { ILogglyConfig } from './i-loggly-config';

export class LogglyConfig implements ILogglyConfig {
  applicationName: string;
  apiKey: string;
  sendConsoleErrors: boolean;
}

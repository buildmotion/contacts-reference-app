import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigurationModule, ConfigurationService, ConfigurationContext } from '@angular-architecture/configuration';
import { ErrorHandlingModule, ErrorHandlingService } from '@angular-architecture/error-handling';
import { HttpErrorInterceptor } from '@angular-architecture/http-service';
import { LogglyWriter, ConsoleWriter, LoggingModule, LoggingService } from '@angular-architecture/logging';
import { NotificationService } from '@angular-architecture/notification';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { AppConfig } from 'apps/reference-contacts/src/config/app-config';
import { LogglyService } from 'ngx-loggly-logger';

/**
 * The factory function to initialize the configuration service for the application.
 * @param configService
 */
export function initializeConfiguration(configContext: ConfigurationContext, configService: ConfigurationService) {
  return () => {
    configService.settings = configContext.config;
    return configService;
  };
}

/**
 * The factory function to initialize the logging service and writer for the
 * application.
 *
 * @param loggingService
 * @param consoleWriter
 */
export function initializeLogWriter(loggingService: LoggingService, consoleWriter: ConsoleWriter) {
  return () => {
    return consoleWriter;
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule, ConfigurationModule, ErrorHandlingModule, LoggingModule],
  providers: [],
})
export class CrossCuttingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CrossCuttingModule,
      providers: [
        {
          provide: ConfigurationContext,
          useValue: { config: AppConfig },
        },
        ConfigurationService,
        LoggingService,
        ConsoleWriter,
        LogglyWriter,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeConfiguration,
          deps: [ConfigurationContext, ConfigurationService],
          multi: true,
        },
        ConsoleWriter,
        LogglyService,
        LogglyWriter,
        LoggingService,
        {
          provide: ErrorHandler,
          useClass: ErrorHandlingService,
          deps: [ConfigurationService, LoggingService],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeLogWriter,
          deps: [LoggingService, ConsoleWriter, LogglyWriter],
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
        NotificationService,
      ],
    };
  }
}

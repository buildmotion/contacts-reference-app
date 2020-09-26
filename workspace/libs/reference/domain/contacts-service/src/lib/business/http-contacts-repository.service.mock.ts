import { Injectable } from '@angular/core';
import { ServiceBase } from '@angular-architecture/foundation';
import { IHttpContactsRepositoryService } from './i-http-contacts-repository.service';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { ContactDto } from '@angular-architecture/reference/domain/common';
import { Observable } from 'rxjs';
import { HttpService } from '@angular-architecture/http-service';
import { LoggingService } from '@angular-architecture/logging';
import { ConfigurationService } from '@angular-architecture/configuration';

@Injectable({
  providedIn: 'root',
})
export class HttpContactsRepositoryServiceMock extends ServiceBase implements IHttpContactsRepositoryService {
  constructor(private httpService: HttpService, private configService: ConfigurationService, loggingService: LoggingService) {
    super('HttpSearchRepositoryService', loggingService);
  }

  addContact<T>(contact: ContactDto): Observable<any> {
    throw new Error('Not implemented.');
  }

  retrieveContacts<T>(): Observable<any> {
    throw new Error('Not implemented.');
  }
}

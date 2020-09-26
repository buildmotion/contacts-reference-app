import { Observable } from 'rxjs';

import { Inject, Injectable } from '@angular/core';
import { ApiResponse } from '@angular-architecture/common';
import { ServiceBase } from '@angular-architecture/foundation';
import { LoggingService } from '@angular-architecture/logging';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { Contact, ContactDto } from '@angular-architecture/reference/domain/common';

import { BusinessProviderService } from './business/business-provider.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends ServiceBase {
  constructor(@Inject(BusinessProviderService) private businessProvider: BusinessProviderService, loggingService: LoggingService) {
    super('ContactsService', loggingService);
    this.businessProvider.serviceContext = this.serviceContext;
  }

  add<T>(contact: ContactDto): Observable<ApiResponse<T>> {
    return this.businessProvider.add<T>(contact);
  }

  removeContact<T>(contact: Contact) {
    return this.businessProvider.removeContact<T>(contact);
  }

  retrieveContacts<T>(): Observable<ApiResponse<T>> {
    return this.businessProvider.retrieveContacts<T>();
  }
}

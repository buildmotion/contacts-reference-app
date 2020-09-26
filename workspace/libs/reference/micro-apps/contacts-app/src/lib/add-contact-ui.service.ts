import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiResponse } from '@angular-architecture/common';
import { ServiceBase } from '@angular-architecture/foundation';
import { LoggingService, Severity } from '@angular-architecture/logging';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { Contact, ContactDto } from '@angular-architecture/reference/domain/common';
import { ContactsService } from '@angular-architecture/reference/domain/contacts-service';

@Injectable({
  providedIn: 'root',
})
export class AddContactUIService extends ServiceBase {
  private contactSubject: BehaviorSubject<Contact> = new BehaviorSubject<Contact>(null);
  private failMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private showSpinnerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private successMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  public readonly contact$: Observable<Contact> = this.contactSubject.asObservable();
  public readonly failMessage$: Observable<string> = this.failMessageSubject.asObservable();
  public readonly showSpinner$: Observable<boolean> = this.showSpinnerSubject.asObservable();
  public readonly successMessage$: Observable<string> = this.successMessageSubject.asObservable();

  private contact: Contact;

  constructor(private contactsService: ContactsService, loggingService: LoggingService) {
    super('AddContactUIService', loggingService);
  }

  add(contact: ContactDto): void {
    this.showSpinnerSubject.next(true);

    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to add new [contact].`);
    this.contactsService
      .add<Contact>(contact)
      .subscribe(
        response => this.handleAddContactResponse(response),
        error => this.handleAddContactError(error),
        () => this.finishAddContactRequest()
      );
  }

  private handleAddContactResponse(response: ApiResponse<Contact>): void {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process API response for [adding new contact]`);
    if (response) {
      if (response.isSuccess) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process [successful] API response`);
        this.contact = response.data;
        this.contactSubject.next(response.data);
        this.successMessageSubject.next(`Successfully create contact for [${this.contact.firstName} ${this.contact.lastName}].`);
      } else {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process [unsuccessful] API response`);
        this.failMessageSubject.next(response.message);
      }
    }
  }

  private handleAddContactError(error: any): void {
    this.handleError(error);
  }

  private finishAddContactRequest(): void {
    this.showSpinnerSubject.next(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angular-architecture/foundation';
import { LoggingService, Severity } from '@angular-architecture/logging';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactListUIService } from './contact-list-ui.service';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { Contact } from '@angular-architecture/reference/domain/common';

@Component({
  selector: 'valencia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends ComponentBase implements OnInit {
  contacts$: Observable<Contact[]> = this.uiService.contacts$;
  removeContactSpinner$: Observable<boolean> = this.uiService.removeContactSpinner$;
  showSpinner$: Observable<boolean> = this.uiService.showSpinner$;

  constructor(private uiService: ContactListUIService, loggingService: LoggingService, router: Router) {
    super('ListComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.uiService.retrieveContacts();
  }

  addContact() {
    this.routeTo('contacts/new-contact');
  }

  removeContact(contact: Contact) {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to remove selected contact: ${contact.contactId}.`);
    this.uiService.removeContact(contact);
  }
}

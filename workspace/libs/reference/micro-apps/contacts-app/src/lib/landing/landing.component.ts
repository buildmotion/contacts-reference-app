import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angular-architecture/foundation';
import { Severity, LoggingService } from '@angular-architecture/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'valencia-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent extends ComponentBase implements OnInit {
  listCardBodyText: string;
  listCardTitle: string;
  listCardButtonText: string;

  addContactCardBodyText: string;
  addContactCardTitle: string;
  addContactCardButtonText: string;

  constructor(loggingService: LoggingService, router: Router) {
    super('LandingComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.listCardBodyText = `Contacts are your most important business asset. Creating
    connections with real people matters. Take care of your contacts.`;
    this.listCardTitle = `Contact List`;
    this.listCardButtonText = `View Contacts`;

    this.addContactCardBodyText = `Use the new contact tool to add a new contact.`;
    this.addContactCardButtonText = `Add a contact`;
    this.addContactCardTitle = `Add Contacts`;
  }

  addContact() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to navigate to add contact form.`);
    this.routeTo('contacts/new-contact');
  }

  viewContacts() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to navigate to contacts list.`);
    this.routeTo('contacts/list');
  }
}

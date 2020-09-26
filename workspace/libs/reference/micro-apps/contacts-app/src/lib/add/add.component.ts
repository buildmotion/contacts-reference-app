import { BehaviorSubject, Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@angular-architecture/foundation';
import { LoggingService, Severity } from '@angular-architecture/logging';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { Contact, ContactDto } from '@angular-architecture/reference/domain/common';

import { AddContactUIService } from '../add-contact-ui.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { ValidatorService } from '@angular-architecture/reference/domain/validation';
@Component({
  selector: 'valencia-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent extends ComponentBase implements OnInit {
  contact$: Observable<Contact> = this.uiService.contact$;
  private formIsValidSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly contact: Observable<Contact> = this.uiService.contact$;
  public readonly failMessage$: Observable<string> = this.uiService.failMessage$;
  public readonly formIsValid$: Observable<boolean> = this.formIsValidSubject.asObservable();
  public readonly showSpinner$: Observable<boolean> = this.uiService.showSpinner$;
  public readonly successMessage$: Observable<string> = this.uiService.successMessage$;

  addContactForm: FormGroup;

  constructor(
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private uiService: AddContactUIService,
    loggingService: LoggingService,
    router: Router
  ) {
    super('AddComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.successMessage$.subscribe(success => {
      this.addContactForm.reset();
    });
  }

  handleOnChange(form: any) {
    this.loggingService.log(this.componentName, Severity.Information, `The form has changed. Form is valid: ${this.addContactForm.valid}.`);
    if (this.addContactForm.valid) {
      this.formIsValidSubject.next(true);
    } else {
      this.formIsValidSubject.next(false);
    }
  }

  onSubmit() {
    this.markFormAsTouched(this.addContactForm);
    if (this.addContactForm.valid) {
      this.loggingService.log(this.componentName, Severity.Information, `Preparing to add a new [contact].`);

      const contact = new ContactDto();

      contact.address1 = this.address1.value;
      contact.address2 = this.address2.value;
      contact.city = this.city.value;
      contact.company = this.company.value;
      contact.emailAddress = this.emailAddress.value;
      contact.firstName = this.firstName.value;
      contact.lastName = this.lastName.value;
      contact.phone = this.phone.value;
      contact.postalCode = this.postalCode.value;
      contact.state = this.state.value;

      this.uiService.add(contact);
    } else {
    }
  }

  discard() {
    this.routeTo('/');
  }

  private initializeForm() {
    this.addContactForm = this.formBuilder.group({
      address1: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      address2: new FormControl(null, {
        validators: [Validators.maxLength(60)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      city: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(45)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      company: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(45)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      emailAddress: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(80)],
        asyncValidators: [this.validatorService.EmailAddressFormat],
        updateOn: 'blur',
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(45)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(45)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(25)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      postalCode: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
      state: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(45)],
        asyncValidators: [],
        updateOn: 'blur',
      }),
    });

    this.addContactForm.valueChanges.subscribe(value => this.handleOnChange(value));
  }

  /**
   * Use to set the input form control to indicate an error
   * if the specified input is [invalid] and [touched].
   * @param inputName
   */
  hasError(inputName: string) {
    if (inputName) {
      const input = this.addContactForm.get(inputName);
      if (input && input.touched && input.invalid) {
        return true;
      }
    }
    return false;
  }

  get firstName(): AbstractControl {
    return this.addContactForm.get('firstName') as FormControl;
  }

  get lastName(): AbstractControl {
    return this.addContactForm.get('lastName') as FormControl;
  }

  get address1(): AbstractControl {
    return this.addContactForm.get('address1') as FormControl;
  }

  get address2(): AbstractControl {
    return this.addContactForm.get('address2') as FormControl;
  }

  get city(): AbstractControl {
    return this.addContactForm.get('city') as FormControl;
  }

  get emailAddress(): AbstractControl {
    return this.addContactForm.get('emailAddress') as FormControl;
  }

  get company(): AbstractControl {
    return this.addContactForm.get('company') as FormControl;
  }

  get phone(): AbstractControl {
    return this.addContactForm.get('phone') as FormControl;
  }

  get postalCode(): AbstractControl {
    return this.addContactForm.get('postalCode') as FormControl;
  }

  get state(): AbstractControl {
    return this.addContactForm.get('state') as FormControl;
  }
}

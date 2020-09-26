import { BusinessActionBase } from './business-action-base';
import { StringIsNotNullEmptyRange, IsNotNullOrUndefined } from '@angular-architecture/rules-engine';
import { Severity } from '@angular-architecture/logging';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { ContactDto, EmailAddressFormatIsValidRule } from '@angular-architecture/reference/domain/common';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class AddContactAction<T> extends BusinessActionBase<T> {
  constructor(private contact: ContactDto) {
    super('AddContactAction');
  }

  /**
   * Use the [preValidateAction] to add any business or validation rules that
   * are required to pass in order to perform the action.
   *
   * Use the [ValidationContext] item of the action to add rules. The ValidationContext
   * uses a Fluent API to allow for chained rules to be configured.
   */
  preValidateAction() {
    this.validationContext.addRule(
      new IsNotNullOrUndefined('ContactDtoIsValid', 'The contact information is not valid.', this.contact, this.showRuleMessages)
    );

    if (this.contact) {
      this.validationContext
        .addRule(
          new StringIsNotNullEmptyRange(
            'Address1IsValid',
            'The address information 1 is required. Cannot be greater than 60 characters.',
            this.contact.address1,
            3,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'Address2IsValid',
            'The address 2 information is required. Cannot be greater than 60 characters.',
            this.contact.address2,
            0,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'CityIsValid',
            'The city is required. Cannot be greater than 60 characters.',
            this.contact.city,
            1,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'CompanyIsValid',
            'The company is required. Cannot be greater than 60 characters.',
            this.contact.company,
            1,
            60,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'EmailAddressIsValid',
            'The email is required. Cannot be greater than 80 characters.',
            this.contact.emailAddress,
            5,
            80,
            this.showRuleMessages
          )
        )
        .addRule(
          new EmailAddressFormatIsValidRule(
            'EmailAddressFormatIsValid',
            'The email address format is not valid.',
            this.contact.emailAddress,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'FirstNameIsValid',
            'The first name value is required. Cannot be greater than 45 characters.',
            this.contact.firstName,
            1,
            45,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'LastNameIsValid',
            'The last name value is required. Cannot be greater than 45 characters.',
            this.contact.lastName,
            1,
            45,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'PhoneIsValid',
            'The phone value is required. Cannot be greater than 25 characters.',
            this.contact.phone,
            10,
            25,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'PostalCodeIsValid',
            'The postal code value is required. Cannot be greater than 25 characters.',
            this.contact.postalCode,
            5,
            25,
            this.showRuleMessages
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'StateIsValid',
            'The state value is required. Cannot be greater than 45 characters.',
            this.contact.state,
            2,
            45,
            this.showRuleMessages
          )
        );
    }
  }

  /**
   * Use the [performAction] operation to execute the target of the action's business logic. This
   * will only run if the rules and validations are successful.
   */
  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to call API to complete action.`);
    this.response = this.businessProvider.apiService.addContact<T>(this.contact);
  }
}

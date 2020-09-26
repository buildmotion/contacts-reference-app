import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '@angular-architecture/common';
import { ServiceBase } from '@angular-architecture/foundation';
import { LoggingService, Severity } from '@angular-architecture/logging';
import { ValidationContext, StringIsNotNullEmptyRange, StringIsRegExMatch } from '@angular-architecture/rules-engine';
import { ApiMessage, ApiMessageType } from '@angular-architecture/common';
import { FormControl, ValidationErrors, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { EmailAddressFormatIsValidRule, RuleConstants } from '@angular-architecture/reference/domain/common';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService extends ServiceBase {
  displayValidationMessages = true;

  constructor(loggingService: LoggingService) {
    super('ValidatorService', loggingService);
  }

  /**
   * Use this [async] validator to determine if the email address format is valid.
   */
  EmailAddressFormat: AsyncValidatorFn = (control: FormControl): Observable<ValidationErrors | null> => {
    this.loggingService.log(`${this.serviceName}.EmailAddressFormat`, Severity.Information, 'Preparing to validate email address format.');

    if (control.value == null) {
      return of(null);
    }
    return of(debounceTime(100)).pipe(
      switchMap(() => {
        return this._validateEmailAddressFormat<boolean>(control.value).pipe(
          map(response => {
            return response.isSuccess === true ? null : { invalidEmailAddress: true };
          })
        );
      })
    );
  };

  /**
   * Use to validate that passwords match for (2) password controls (e.g., Password and PasswordConfirm)
   * @param passwordConfirm the input control that validates that the value of the password matches the password control's value
   * @param password the password control that contains the password value
   */
  PasswordsMatch = (passwordConfirm: FormControl, password: AbstractControl): Observable<ValidationErrors | null> => {
    if (passwordConfirm.value === null || password.value === null) {
      return of(null);
    }

    if (passwordConfirm.value !== password.value) {
      return of({ passwordConfirm: true });
    }
    return null;
  };

  /**
   * Use this validator to determine if the current password meets or exceeds the
   * password strength criteria.
   *
   * Returns [PasswordStrength = true] if not valid.
   *
   * 1. contains a lowercase character
   * 2. contains an uppercase character
   * 3. contains a numeric character
   * 4. contains a special character
   * 5. password is equal to or greater than minimum required length
   */
  PasswordStrength: AsyncValidatorFn = (control: FormControl): Observable<ValidationErrors | null> => {
    if (control.value == null) {
      return of(null);
    }
    return of(debounceTime(500)).pipe(
      switchMap(() => {
        const password = control.value;
        const invalid: boolean =
          [
            this.hasLowercase(password),
            this.hasUppercase(password),
            this.hasNumber(password),
            this.hasSpecialCharacters(password),
            this.StringMinLengthIsValid(password, 8),
          ].filter(item => item === false).length > 0;

        if (invalid) {
          return of({ PasswordStrength: true });
        } else {
          return of(null);
        }
      })
    );
  };

  /**
   * Use to determine if the value's length is equal to or greater than the minimum criteria.
   *
   * @param value The target string value to compare.
   * @param minLength A number indicating the minimum required length.
   */
  StringMinLengthIsValid(value: string, minLength: number): boolean {
    const validationContext = new ValidationContext();
    try {
      validationContext.addRule(
        new StringIsNotNullEmptyRange('StringMinLengthIsValid', 'The minimum length is not valid.', value, minLength, Number.MAX_VALUE, false)
      );

      validationContext.renderRules();
    } catch (error) {
      this.logError(error, `Error while attempting to validate for minimum length.`);
    }
    return validationContext.isValid;
  }

  /**
   * Use to determine if the value contains a lowercase character.
   * Regex: [a-z]+
   * @param value
   */
  hasLowercase(value: string): boolean {
    const validationContext = new ValidationContext();
    try {
      validationContext
        .addRule(
          new StringIsRegExMatch(
            'ContainsLowercaseCharacter',
            'The string value does not contain a lowercase value.',
            value,
            RuleConstants.lowercaseAlphaCharacterRegEx,
            false
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'LowercaseStringIsNotNullEmptyRange',
            'The string value must contain at least 1 character.',
            value,
            1,
            Number.MAX_VALUE,
            false
          )
        );

      validationContext.renderRules();
    } catch (error) {
      this.logError(error, `Error while attempting to validate for lowercase characters.`);
    }
    return validationContext.isValid;
  }

  /**
   * Use to determine if the target string value contains a number character.
   * @param value
   */
  hasNumber(value: string): boolean {
    const validationContext = new ValidationContext();
    try {
      validationContext
        .addRule(
          new StringIsRegExMatch(
            'ContainsNumericCharacter',
            'The string value does not contain a numeric character.',
            value,
            RuleConstants.numericCharactersRegEx,
            false
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'StringIsNotNullEmptyRange',
            'The string value cannot be null or empty.',
            value,
            1,
            Number.MAX_VALUE,
            false
          )
        );
      validationContext.renderRules();
    } catch (error) {
      this.logError(error, `Error while attempting to determine to validate for numeric characters.`);
    }
    return validationContext.isValid;
  }

  /**
   * Use to determine if the target string value contains any special characters.
   * @param value
   */
  hasSpecialCharacters(value: string): boolean {
    const validationContext = new ValidationContext();
    try {
      validationContext
        .addRule(
          new StringIsRegExMatch(
            'ContainsSpecialCharacter',
            'The string value does not contain a special character.',
            value,
            RuleConstants.specialCharacterRegEx,
            false
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'SpecialCharacterStringIsNotNullEmptyRange',
            'The string value must contain at least 1 character.',
            value,
            1,
            Number.MAX_VALUE,
            false
          )
        );

      validationContext.renderRules();
    } catch (error) {
      this.logError(error, `Error while attempting to validate for special characters.`);
    }
    return validationContext.isValid;
  }

  /**
   * Use to determine if the value contains an uppercase character.
   * @param value
   */
  hasUppercase(value: string): boolean {
    const validationContext = new ValidationContext();
    try {
      validationContext
        .addRule(
          new StringIsRegExMatch(
            'ContainsUppercaseCharacter',
            'The string value does not contain a uppercase value.',
            value,
            RuleConstants.uppercaseAlphaCharacterRegEx,
            false
          )
        )
        .addRule(
          new StringIsNotNullEmptyRange(
            'StringIsNotNullEmptyRange',
            'The string value cannot be null or empty.',
            value,
            1,
            Number.MAX_VALUE,
            false
          )
        );

      validationContext.renderRules();
    } catch (error) {
      this.logError(error, `Error while attemptingn to validate [uppercase] rule.`);
    }
    return validationContext.isValid;
  }

  private _validateEmailAddressFormat<T>(value: any): Observable<ApiResponse<T>> {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process validation rules for email address.`);
    const validationContext = new ValidationContext();
    validationContext.addRule(
      new EmailAddressFormatIsValidRule('EmailAddressIsValid', 'The email address is not valid.', value, this.displayValidationMessages)
    );
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to validate email address: ${value}`);
    validationContext.renderRules();

    return this.prepareValidationResponse<T>(validationContext);
  }

  /**
   * Use to prepare a typed ApiResponse based on the results of the ValidationContext.
   * @param validationContext
   */
  private prepareValidationResponse<T>(validationContext: ValidationContext) {
    const response = new ApiResponse<T>();
    response.isSuccess = validationContext.isValid;
    if (!validationContext.isValid) {
      validationContext.results.map(result => {
        const message = new ApiMessage();
        message.message = result.message;
        message.messageType = ApiMessageType.Error;
        response.messages.push(message);
      });
    }

    return of(response);
  }
}

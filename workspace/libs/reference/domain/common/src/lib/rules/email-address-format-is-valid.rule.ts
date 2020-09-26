import { CompositeRule, StringIsNotNullEmptyRange, StringIsRegExMatch } from '@angular-architecture/rules-engine';
import { RuleConstants } from './rule-constants';

/**
 * Use to validate the format of an email address. Expects:
 *
 * 1. string is not null or undefined
 * 2. string length is within specified value
 * 3. string value matches RegEx
 *
 *
 * Resource: https://emailregex.com/
 */
export class EmailAddressFormatIsValidRule extends CompositeRule {
  constructor(name: string, message: string, private emailAddress: string, isDisplayable: boolean = true) {
    super(name, message, isDisplayable);
    this.configureRules();
  }

  configureRules() {
    this.rules.push(
      new StringIsNotNullEmptyRange(
        'EmailAddressStringIsValid',
        'The email address value is not valid. Must be within 5 and 100 characters.',
        this.emailAddress,
        5,
        100,
        true
      )
    );

    this.rules.push(
      new StringIsRegExMatch(
        'EmailAddressContainsValidCharacters',
        'The email address format is not valid.',
        this.emailAddress,
        RuleConstants.emailAddressFormatRegEx,
        true
      )
    );
  }
}

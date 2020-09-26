import { BusinessActionBase } from './business-action-base';
import { Severity } from '@angular-architecture/logging';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class RetrieveContactsAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveContactsAction');
  }

  /**
   * Use the [preValidateAction] to add any business or validation rules that
   * are required to pass in order to perform the action.
   *
   * Use the [ValidationContext] item of the action to add rules. The ValidationContext
   * uses a Fluent API to allow for chained rules to be configured.
   */
  preValidateAction() {}

  /**
   * Use the [performAction] operation to execute the target of the action's business logic. This
   * will only run if the rules and validations are successful.
   */
  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to call API to complete action.`);
    this.response = this.businessProvider.apiService.retrieveContacts<T>();
  }
}

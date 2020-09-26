import { TestBed, inject } from '@angular/core/testing';

import { ActionResult, Action } from '@angular-architecture/actions';
import { LoggingService, LoggingServiceMock } from '@angular-architecture/logging';
import { ServiceContext } from '@angular-architecture/rules-engine';

import { BusinessProviderService } from '../business-provider.service';
import { ConfigurationService } from '@angular-architecture/configuration';
import { AddContactAction } from './add-contact.action';
import { Contact, ContactDto } from '@angular-architecture/reference/domain/common';
import { BusinessProviderServiceMock } from '../business-provider.service.mock';
import { HttpContactsRepositoryService } from '../http-contacts-repository.service';
import { HttpContactsRepositoryServiceMock } from '../http-contacts-repository.service.mock';
import { HttpService } from '@angular-architecture/http-service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VerifyAccountsAction', () => {
  beforeEach(() => {
    this.fixture = new AddContactAction<Contact>(new ContactDto());
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        HttpHandler,
        HttpClient,
        {
          provide: BusinessProviderService,
          useClass: BusinessProviderServiceMock,
        },
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
        {
          provide: HttpContactsRepositoryService,
          useClass: HttpContactsRepositoryServiceMock,
        },
        {
          provide: ConfigurationService,
          useClass: ConfigurationService,
        },
      ],
    }).compileComponents();
  });

  it('should create an instance', () => {
    expect(new AddContactAction(new ContactDto())).toBeTruthy();
  });

  it('should contain validation error for MIN LENGTH first name', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.firstName = ''; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH last name', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.lastName = ''; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH company', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.lastName = ''; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH phone', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.phone = ''; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH email address', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.emailAddress = 'abc'; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH postal code', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.postalCode = ''; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH state', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.state = ''; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH city', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.city = ''; // INVALID; REQUIRED
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH first name', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.firstName = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH last name', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.lastName = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH company', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.company = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH email address', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.emailAddress = '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH phone', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.phone = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH city', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.city = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH state', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.state = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH postal code', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.postalCode = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH address 2', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.address2 = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MAX LENGTH address 1', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.address1 = '1234567890123456789012345678901234567890123456789012345678901234567890'; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for MIN LENGTH address 1', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.address1 = ''; // INVALID
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain validation error for UNDEFINED address 1', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const mock = createContactDtoMock();
      mock.address1 = undefined;
      const action = new AddContactAction(mock);
      setupAction(action, businessProvider, apiService, loggingService);

      action.execute();

      expect(action.validationContext.isValid).toEqual(false);
    }
  ));

  it('should contain valid VALIDATION CONTEXT', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const action = new AddContactAction(createContactDtoMock());
      setupAction(action, businessProvider, apiService, loggingService);

      action.validateAction();

      expect(action.validationContext.isValid).toEqual(true);
    }
  ));

  it('should contain email address format validation rule', inject(
    [LoggingService, BusinessProviderService, HttpContactsRepositoryService],
    (loggingService, businessProvider, apiService) => {
      const action = new AddContactAction(createContactDtoMock());
      setupAction(action, businessProvider, apiService, loggingService);

      action.preValidateAction();

      const rule = action.validationContext.rules.find(r => r.name === 'EmailAddressFormatIsValidRule');
      expect(rule).not.toBeNull();
    }
  ));
});

function setupAction(action: AddContactAction<unknown>, businessProvider: any, apiService: any, loggingService: LoggingService) {
  action.serviceContext = new ServiceContext();
  action.businessProvider = businessProvider;
  action.businessProvider.loggingService = loggingService;
  action.businessProvider.apiService = apiService;

  action.loggingService = loggingService;
  action.businessProvider = businessProvider;
}

function createContactDtoMock() {
  const mock = new ContactDto();
  mock.address1 = '1234 MAIN STREET';
  mock.address2 = 'Apartment #1234';
  mock.city = 'Denver';
  mock.company = 'Denver Tacos';
  mock.emailAddress = 'joe.gorilla@tacos.com';
  mock.firstName = 'Joe';
  mock.lastName = 'Gorilla';
  mock.phone = '(303) 555-1212';
  mock.postalCode = '80210';
  mock.state = 'Colorado';

  return mock;
}

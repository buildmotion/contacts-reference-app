import { IConfiguration } from '@angular-architecture/configuration';

export const AppConfig: IConfiguration = {
  contentful: {
    spaceId: '1234',
    token: '12341234',
  },
  loggingConfig: {
    applicationName: 'reference-contacts',
    isProduction: false,
  },
  errorHandlingConfig: {
    applicationName: 'reference-contacts',
    includeDefaultErrorHandling: true,
  },
  logglyConfig: {
    applicationName: 'reference-contacts',
    apiKey: '86b52c28-e0f2-4e97-b338-c2f4dba7def0',
    sendConsoleErrors: true,
  },
  webConfig: {
    applicationName: 'reference-contacts',
    companyEffectiveDate: new Date(2020, 4, 1),
    version: '1.0.0',
    social: {
      github: { name: 'Reference: Brand Marketing Code Test', URL: 'https://github.com/buildmotion/contacts-reference-app' },
      instagram: { name: 'AngularArchitecture', URL: 'https://www.instagram.com/AngularArchitecture/' },
      twitter: { name: '@AngularArch', URL: 'https://twitter.com/AngularArch' },
    },
    email: 'reference@buildmotion.com',
    website: 'Reference Contacts',
    blogURL: 'https://www.medium.com/@angularlicious',
  },
};

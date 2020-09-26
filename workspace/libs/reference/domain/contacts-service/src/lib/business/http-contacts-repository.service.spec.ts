import { TestBed } from '@angular/core/testing';

import { HttpContactsRepositoryService } from './http-contacts-repository.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationService } from '@angular-architecture/configuration';
import { LoggingService } from '@angular-architecture/logging';

describe('HttpContactsRepositoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoggingService, ConfigurationService],
    })
  );

  it('should be created', () => {
    const service: HttpContactsRepositoryService = TestBed.get(HttpContactsRepositoryService);
    expect(service).toBeTruthy();
  });
});

import { Observable } from 'rxjs';
import { ApiResponse } from '@angular-architecture/common';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { ContactDto } from '@angular-architecture/reference/domain/common';

export interface IBusinessProviderService {
  add<T>(contact: ContactDto): Observable<ApiResponse<T>>;
  retrieveContacts<T>(): Observable<ApiResponse<T>>;
}

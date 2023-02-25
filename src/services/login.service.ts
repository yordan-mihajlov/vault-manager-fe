import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { VaultManagementApi } from 'src/api/vault-management-api';
import { UserInfoResponse } from 'src/models/user-info-response.model';
import { SignupRequest } from 'src/models/sign-up-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<UserInfoResponse> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<UserInfoResponse>(VaultManagementApi.SIGNIN, body, { headers, withCredentials: true });
  }

  register(body: SignupRequest): Observable<UserInfoResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<UserInfoResponse>(VaultManagementApi.SIGNUP, body, { headers, withCredentials: true });
  }

  logout(): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.SIGNOUT, {}, { headers, withCredentials: true });
  }

}

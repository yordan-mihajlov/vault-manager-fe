import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaultManagementApi } from 'src/api/vault-management-api';
import { UserInfoResponse } from 'src/models/user-info-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsernames(): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<string[]>(VaultManagementApi.GET_USERNAMES, { headers, withCredentials: true });
  }

  getUserDetails(): Observable<UserInfoResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<UserInfoResponse>(VaultManagementApi.GET_USER_DETAILS, { headers, withCredentials: true });
  }
}

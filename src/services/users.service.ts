import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaultManagementApi } from 'src/api/vault-management-api';
import { MarkUsersAsAdmins } from 'src/models/mark-users-as-admins-request';
import { RegisterResponse } from 'src/models/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsernames(): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<string[]>(VaultManagementApi.GET_USERNAMES, { headers, withCredentials: true });
  }

  getUsernamesByRole(role: string): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let params = new HttpParams();
    params = params.set('role', role);

    return this.httpClient.get<string[]>(VaultManagementApi.GET_USERNAMES_BY_ROLE, { headers, withCredentials: true, params });
  }

  getUserDetails(): Observable<RegisterResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<RegisterResponse>(VaultManagementApi.GET_USER_DETAILS, { headers, withCredentials: true });
  }

  markUsersAsAdmins(markUsersAsAdmins: MarkUsersAsAdmins): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.MARK_USERS_AS_ADMINS, markUsersAsAdmins, { headers, withCredentials: true });
  }
}

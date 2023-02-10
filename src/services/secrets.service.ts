import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaultManagementApi } from 'src/api/vault-management-api';
import { SecretMessageRequest } from 'src/models/secret-message-request';
import { SecretMessageResponse } from 'src/models/secret-message-response';
import { UnreadSecretMessageResponse } from 'src/models/unread-secret-message-response';

@Injectable({
  providedIn: 'root'
})
export class SecretsService {

  constructor(private httpClient: HttpClient) { }

  getUnreadSecrets(): Observable<UnreadSecretMessageResponse[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<UnreadSecretMessageResponse[]>(VaultManagementApi.UNREAD_SECRETS, { headers, withCredentials: true });
  }

  getSecret(uuid: string): Observable<SecretMessageResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let params = new HttpParams();
    params = params.set('uuid', uuid);

    return this.httpClient.get<SecretMessageResponse>(VaultManagementApi.GET_SECRET, { headers, withCredentials: true, params: params });
  }

  createSecret(secretMessageRequest: SecretMessageRequest): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<string>(VaultManagementApi.CREATE_SECRET, secretMessageRequest, { headers, withCredentials: true });
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaultManagementApi } from 'src/api/vault-management-api';
import { SecretMessageRequest } from 'src/models/secret-message-request';
import { SecretMessageResponse } from 'src/models/secret-message-response';
import { UnreadSecretMessageResponse } from 'src/models/unread-secret-message-response';
import { UnreadSecretMessagesCountResponse } from 'src/models/unread-secret-messages-count-response';

@Injectable({
  providedIn: 'root'
})
export class SecretsService {

  constructor(private httpClient: HttpClient) { }

  getUnreadSecrets(): Observable<UnreadSecretMessageResponse[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<UnreadSecretMessageResponse[]>(VaultManagementApi.UNREAD_SECRETS, { headers, withCredentials: true });
  }

  getUnreadSecretsCount(): Observable<UnreadSecretMessagesCountResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<UnreadSecretMessagesCountResponse>(VaultManagementApi.UNREAD_SECRETS_COUNT, { headers, withCredentials: true });
  }

  getSecret(uuid: string): Observable<SecretMessageResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let params = new HttpParams();
    params = params.set('uuid', uuid);

    return this.httpClient.get<SecretMessageResponse>(VaultManagementApi.GET_SECRET, { headers, withCredentials: true, params: params });
  }

  createSecret(secretMessageRequest: SecretMessageRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.CREATE_SECRET, secretMessageRequest, { headers, withCredentials: true });
  }
}

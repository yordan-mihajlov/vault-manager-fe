import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaultManagementApi } from 'src/api/vault-management-api';
import { ConfigsRequest } from 'src/models/configs-request';
import { ConfigRequest } from 'src/models/config-request';
import { ConfigResponse } from 'src/models/config-response';
import { UsersRequest } from 'src/models/users-request';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  constructor(private httpClient: HttpClient) { }

  getConfigAll(): Observable<ConfigResponse[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<ConfigResponse[]>(VaultManagementApi.GET_CONFIGS_ALL, { headers, withCredentials: true });
  }

  getConfigData(configName: string): Observable<ConfigResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let params = new HttpParams();
    params = params.set('configName', configName);

    return this.httpClient.get<ConfigResponse>(VaultManagementApi.GET_CONFIG_DATA, { headers, withCredentials: true, params: params });
  }

  updateConfigConfigs(configsRequest: ConfigsRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.UPDATE_CONFIG_CONFIGS, configsRequest, { headers, withCredentials: true });
  }

  createConfig(configRequest: ConfigRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.CREATE_CONFIG, configRequest, { headers, withCredentials: true });
  }

  deleteConfig(configName: String): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.DELETE_CONFIG, configName, { headers, withCredentials: true });
  }

  changeUsers(usersRequest: UsersRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.CHANGE_CONFIG_USERS, usersRequest, { headers, withCredentials: true });
  }

  changeSystems(usersRequest: UsersRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.CHANGE_CONFIG_SYSTEMS, usersRequest, { headers, withCredentials: true });
  }

  export(configNames: string[]): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('configNames', configNames.join(','));

    return this.httpClient.get(VaultManagementApi.EXPORT_CONFIGS, { responseType: 'blob', headers, withCredentials: true, params });
  }

  import(file: any): Observable<any> {
    return this.httpClient.post(VaultManagementApi.IMPORT_CONFIGS, file, { withCredentials: true })
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaultManagementApi } from 'src/api/vault-management-api';
import { ConfigsRequest } from 'src/models/configs-request';
import { ProjectRequest } from 'src/models/project-request';
import { ProjectResponse } from 'src/models/project-response';
import { UsersRequest } from 'src/models/users-request';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getProjectAll(): Observable<ProjectResponse[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<ProjectResponse[]>(VaultManagementApi.GET_PROJECTS_ALL, { headers, withCredentials: true });
  }

  getProjectData(projectName: string): Observable<ProjectResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let params = new HttpParams();
    params = params.set('projectName', projectName);

    return this.httpClient.get<ProjectResponse>(VaultManagementApi.GET_PROJECT_DATA, { headers, withCredentials: true, params: params });
  }

  updateProjectConfigs(configsRequest: ConfigsRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.UPDATE_PROJECT_CONFIGS, configsRequest, { headers, withCredentials: true });
  }

  createProject(projectRequest: ProjectRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.CREATE_PROJECT, projectRequest, { headers, withCredentials: true });
  }

  deleteProject(projectName: String): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.DELETE_PROJECT, projectName, { headers, withCredentials: true });
  }

  changeUsers(usersRequest: UsersRequest): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<void>(VaultManagementApi.CHANGE_PROJECT_USERS, usersRequest, { headers, withCredentials: true });
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private storageService: StorageService) { }

  hasRole(role: string): boolean {
    const user = this.storageService.getStoredUser();
    return !!user?.roles.includes(role);
  }
}

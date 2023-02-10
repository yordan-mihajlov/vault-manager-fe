import { Injectable } from '@angular/core';
import { UserInfoResponse } from 'src/models/user-info-response.model';

const USER_KEY = 'vault-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeUser(user: UserInfoResponse): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getStoredUser(): UserInfoResponse | null {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  getStoredIsLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);

    return !!user;
  }

  removeStoredUser() {
    window.sessionStorage.removeItem(USER_KEY);
  }
}

import { Injectable } from '@angular/core';
import { RegisterResponse } from 'src/models/register-response.model';

const USER_KEY = 'vault-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeUser(user: RegisterResponse): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getStoredUser(): RegisterResponse | null {
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

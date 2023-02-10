import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _username$ = new BehaviorSubject<string | undefined>(undefined);
  private _roles$ = new BehaviorSubject<Array<string | undefined> | undefined>([]);

  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();
  readonly username$ = this._username$.asObservable();
  readonly roles$ = this._roles$.asObservable();

  constructor() { }

  setIsLoggedIn(value: boolean): void {
    this._isLoggedIn$.next(value);
  }

  setUsername(value: string | undefined): void {
    this._username$.next(value);
  }

  setRoles(value: Array<string | undefined> | undefined): void {
    this._roles$.next(value);
  }
}

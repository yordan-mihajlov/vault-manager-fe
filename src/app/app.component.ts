import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { interval, Observable, of, Subscription } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';
import { UnreadSecretMessageResponse } from 'src/models/unread-secret-message-response';

import { AuthService } from 'src/services/auth.service';
import { LoginService } from 'src/services/login.service';
import { SecretsService } from 'src/services/secrets.service';
import { StorageService } from 'src/services/storage.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  username: Observable<string | undefined>;
  roles: Observable<Array<string | undefined> | undefined>;

  unreadSecretsCount = 0;
  unreadSecretsCountTimeInterval: Subscription;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private secretsService: SecretsService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadStoredUser();

    this.isLoggedIn = this.authService.isLoggedIn$;
    this.username = this.authService.username$;
    this.roles = this.authService.roles$;

    this.pollUnreadSecretsCount();
  }

  onLoginLogoutClick(): void {
    this.isLoggedIn
    .pipe(take(1))
    .subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.loginService.logout().subscribe({
          next: () => this.handleLogoutSuccess(),
          error: () => this.handleLogoutFailure()
        });
      } else {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
          minWidth: 640
        });

        dialogRef.afterClosed().subscribe((data) => {
          if(!!data) {
            this.setUnreadSecretsCount();
            this.snackbar.open(data.message, undefined, { duration: 3000 });
          }
        });
      }
    });
  }

  private pollUnreadSecretsCount(): void {
    this.unreadSecretsCountTimeInterval = interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.getUnreadSecretsCount()))
      .subscribe(
        unreadMessages => this.unreadSecretsCount = unreadMessages.length
    );
  }

  private getUnreadSecretsCount(): Observable<UnreadSecretMessageResponse[]> {
    if(this.storageService.getStoredIsLoggedIn()) {
      return this.secretsService.getUnreadSecrets();
    } else {
      return of([]);
    }
  }

  private setUnreadSecretsCount(): void {
    this.getUnreadSecretsCount().subscribe(
      unreadMessages => this.unreadSecretsCount = unreadMessages.length
    );
  }

  private loadStoredUser(): void {
    const storedUser = this.storageService.getStoredUser();
    const storedIsLoggedIn = this.storageService.getStoredIsLoggedIn();

    if (storedIsLoggedIn) {
      this.authService.setIsLoggedIn(storedIsLoggedIn);
      this.authService.setUsername(storedUser?.username);
      this.authService.setRoles(storedUser?.roles);
    } else {
      this.authService.setIsLoggedIn(false);
      this.authService.setUsername(undefined);
      this.authService.setRoles([]);
    }
  }

  private handleLogoutSuccess(): void {
    this.storageService.removeStoredUser();
    this.authService.setIsLoggedIn(false);
    this.authService.setUsername(undefined);
    this.authService.setRoles([]);

    this.snackbar.open('Successful logout!', undefined, { duration: 3000 });
  }

  private handleLogoutFailure(): void {
    this.snackbar.open('Failed to logout!', undefined, { duration: 3000 });
  }
}
function unreadMessages(unreadMessages: any, arg1: any, arg2: any): Subscription {
  throw new Error('Function not implemented.');
}


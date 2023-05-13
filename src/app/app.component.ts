import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { interval, Observable, of, Subscription } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';
import { UnreadSecretMessagesCountResponse } from 'src/models/unread-secret-messages-count-response';

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
    private snackbar: MatSnackBar,
    private router:Router) { }

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
          next: () => {this.handleLogoutSuccess()},
          error: (data) => {
            console.log(data)
            this.handleLogoutFailure()}
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

    this.router.navigate(['/'])

    this.snackbar.open('Успехен изход от системата!', undefined, { duration: 3000 });
  }

  private handleLogoutFailure(): void {
    this.snackbar.open('Възникна грешка при изход от системата!', undefined, { duration: 3000 });
  }

  private pollUnreadSecretsCount(): void {
    this.unreadSecretsCountTimeInterval = interval(10*60*1000)
    .pipe(
      startWith(0),
      switchMap(() => this.getUnreadSecretsCount()))
      .subscribe(
        unreadSecretsCountResponse => this.unreadSecretsCount = unreadSecretsCountResponse.count
    );
  }

  private getUnreadSecretsCount(): Observable<UnreadSecretMessagesCountResponse> {
    if(this.storageService.getStoredIsLoggedIn()) {
      return this.secretsService.getUnreadSecretsCount();
    } else {
      return of({count : 0});
    }
  }

  private setUnreadSecretsCount(): void {
    this.getUnreadSecretsCount().subscribe(
      unreadSecretsCountResponse => this.unreadSecretsCount = unreadSecretsCountResponse.count
    );
  }
}


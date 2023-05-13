import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-mark-users-as-admins-dialog',
  templateUrl: './mark-users-as-admins-dialog.component.html',
  styleUrls: ['./mark-users-as-admins-dialog.component.scss']
})
export class MarkUsersAsAdminsDialogComponent implements OnInit {

  private usernames: string[];

  adminnames: string[];

  constructor(private dialogRef: MatDialogRef<MarkUsersAsAdminsDialogComponent>,
    private usersService: UsersService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.usersService.getUsernamesByRole("ROLE_ADMIN").subscribe({
      next: (adminnames: string[]) => {
        this.adminnames = adminnames;
      },
      error: (value: HttpErrorResponse) => {
        this.snackbar.open("Възникна грешка при извличането на администраторите!", undefined, { duration: 3000 });
          this.dialogRef.close();
      }
    });
  }

  onUsernamesChange(usernames: string[]): void {
    this.usernames = usernames;
  }

  onMarkUsersAsAdmins():void {
    let markUsersAsAdmins = {usernames: this.usernames};
    this.usersService.markUsersAsAdmins(markUsersAsAdmins).subscribe({
      next: () => {
        this.snackbar.open("Потребителят е маркиран като администратор успешно!", undefined, { duration: 3000 });
        this.dialogRef.close();
      },
      error: (value: HttpErrorResponse) => {
        console.log(value);
        this.snackbar.open("Възникна грешка при маркирането на потребителя като администратор!", undefined, { duration: 3000 });
          this.dialogRef.close();
      }
    });
    this.dialogRef.close();
  }

}

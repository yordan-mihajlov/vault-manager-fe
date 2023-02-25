import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnreadSecretMessageResponse } from 'src/models/unread-secret-message-response';
import { SecretsService } from 'src/services/secrets.service';
import { AddSecretDialogComponent } from './add-secret-dialog/add-secret-dialog.component';
import { SecretDialogComponent } from './secret-dialog/secret-dialog.component';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {

  unreadSecrets: UnreadSecretMessageResponse[];

  constructor(
    private secretsService: SecretsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getSecrets();
  }

  onOpenClick(uuid: string) {
    const dialogRef = this.dialog.open(SecretDialogComponent, {
      minWidth: 640,
      data: { uuid }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSecrets();
    });
  }

  onCreateClick() {
    const dialogRef = this.dialog.open(AddSecretDialogComponent, {
      minWidth: 640,
      data: { }
    });
  }

  private getSecrets(): void {
    this.secretsService.getUnreadSecrets().subscribe({
      next: (unreadSecrets) => this.unreadSecrets = unreadSecrets,
      error: () => this.snackbar.open("Error while unread secrets", undefined, { duration: 3000 })
    });
  }
}

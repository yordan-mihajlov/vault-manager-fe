import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnreadSecretMessageResponse } from 'src/models/unread-secret-message-response';
import { SecretsService } from 'src/services/secrets.service';
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
  }

  onCreateClick() {
    // const dialogRef = this.dialog.open(AddProjectDialogComponent, {
    //   minWidth: 640
    // });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.getProjects();
    // });
  }

  onDeleteClick(projectName: String) {
    // this.projectsService.deleteProject(projectName).subscribe({
    //   next: () => {
    //     this.snackbar.open("Successfully deleted project", undefined, { duration: 3000 });
    //     this.getProjects();
    //   },
    //   error: () => this.snackbar.open("Error while deliting project", undefined, { duration: 3000 })
    // })
  }

  private getSecrets(): void {
    this.secretsService.getUnreadSecrets().subscribe({
      next: (unreadSecrets) => this.unreadSecrets = unreadSecrets,
      error: () => this.snackbar.open("Error while unread secrets", undefined, { duration: 3000 })
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecretMessageResponse } from 'src/models/secret-message-response';
import { SecretsService } from 'src/services/secrets.service';

@Component({
  selector: 'app-secret-dialog',
  templateUrl: './secret-dialog.component.html',
  styleUrls: ['./secret-dialog.component.scss']
})
export class SecretDialogComponent implements OnInit {

  uuid: string;
  secret: SecretMessageResponse;
  secretHeader: string;
  secretContent: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    uuid: string
  },
  private dialogRef: MatDialogRef<SecretDialogComponent>,
  private secretsService: SecretsService,
  private snackbar: MatSnackBar) {
    this.uuid = data.uuid;
  }
  
  ngOnInit(): void {
    this.secretsService.getSecret(this.uuid).subscribe((secret) => {
      this.secret = secret;
      this.secretHeader = secret.header;
      this.secretContent = secret.content;
    });
    
  }

}

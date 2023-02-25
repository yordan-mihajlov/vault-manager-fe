import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecretsService } from 'src/services/secrets.service';

@Component({
  selector: 'app-add-secret-dialog',
  templateUrl: './add-secret-dialog.component.html',
  styleUrls: ['./add-secret-dialog.component.scss']
})
export class AddSecretDialogComponent implements OnInit {

  createSecretFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {

  },
  private secretsService: SecretsService,
  private snackbar: MatSnackBar,
  private formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<AddSecretDialogComponent>) { }

  private toUsers: string[];
  isOneTime: boolean;

  ngOnInit(): void {
    this.createSecretFormGroup = this.generatCreateSecretFormGroup();
  }

  onCreate(): void {
    const header = this.createSecretFormGroup.controls['header'].value;
    const content = this.createSecretFormGroup.controls['content'].value;
    const expireDays = this.createSecretFormGroup.controls['expireDays'].value;
    const isOneTime = !!this.isOneTime;
    const toUsers = this.toUsers;

    const secretRequest = { header, content, expireDays, isOneTime, toUsers };

    this.secretsService.createSecret(secretRequest).subscribe({
      next: () => {
        this.snackbar.open("Successfully created secret", undefined, { duration: 3000 });
        this.dialogRef.close();
      },
      error: (value: HttpErrorResponse) => {
        console.log(value);
        this.snackbar.open("Error while creating secret", undefined, { duration: 3000 });
          this.dialogRef.close();
      }
    });
  }

  onUsernamesChange(usernames: string[]): void {
    this.toUsers = usernames;
  }

  private generatCreateSecretFormGroup(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('header', new FormControl('', [Validators.required]));
    form.addControl('content', new FormControl('', [Validators.required]));
    form.addControl('expireDays', new FormControl('', [Validators.required]));

    return form;
  }

}

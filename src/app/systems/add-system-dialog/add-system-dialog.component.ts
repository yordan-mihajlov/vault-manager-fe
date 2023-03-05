import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterResponse } from 'src/models/register-response.model';
import { SignupRequest } from 'src/models/sign-up-request.model';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-add-system-dialog',
  templateUrl: './add-system-dialog.component.html',
  styleUrls: ['./add-system-dialog.component.scss']
})
export class AddSystemDialogComponent implements OnInit {

  registerFormGroup: FormGroup;

  showPassword = false;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddSystemDialogComponent>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerFormGroup = this.generateRegisterForm();
  }

  onRegister(): void {
    const username = this.registerFormGroup.controls['username'].value;
    const password = this.registerFormGroup.controls['password'].value;

    const signupRequest = { username, password } as SignupRequest;

    this.loginService.registerSystem(signupRequest).subscribe({
      next: (value: RegisterResponse) => {
        this.snackbar.open("Successfully registred system", undefined, { duration: 3000 });
        this.dialogRef.close();
      },
      error: (value: HttpErrorResponse) => {
        this.snackbar.open("Error while regestering system", undefined, { duration: 3000 });
        this.dialogRef.close();
      }
    });
  }

  private generateRegisterForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('username', new FormControl('', [Validators.required]));
    form.addControl('password', new FormControl('', [Validators.required]));

    return form;
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigsService } from 'src/services/configs.service';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-add-config-dialog',
  templateUrl: './add-config-dialog.component.html',
  styleUrls: ['./add-config-dialog.component.scss']
})
export class AddConfigDialogComponent implements OnInit {

  createPojectFormGroup: FormGroup;

  isAdmin = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
  },
  private configsService: ConfigsService,
  private roleService: RoleService,
  private snackbar: MatSnackBar,
  private formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<AddConfigDialogComponent>) { }

  ngOnInit(): void {
    this.isAdmin = this.roleService.hasRole("ROLE_ADMIN");
    this.createPojectFormGroup = this.generatCreatePojectFormGroup();
  }

  onCreate(): void {
    const name = this.createPojectFormGroup.controls['name'].value;
    const description = this.createPojectFormGroup.controls['description'].value;

    const configRequest = { name, description };

    this.configsService.createConfig(configRequest).subscribe({
      next: () => {
        this.snackbar.open("Successfully created config", undefined, { duration: 3000 });
        this.dialogRef.close();
      },
      error: (value: HttpErrorResponse) => {
        if (value.status === 409) {
          this.snackbar.open("Config with this name already exists", undefined, { duration: 3000 });
        } else {
          this.snackbar.open("Error while creating config", undefined, { duration: 3000 });
          this.dialogRef.close();
        }
      }
    });
  }

  private generatCreatePojectFormGroup(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('name', new FormControl('', [Validators.required]));
    form.addControl('description', new FormControl('', [Validators.required]));

    return form;
  }

}

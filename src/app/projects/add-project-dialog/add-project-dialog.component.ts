import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/services/projects.service';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {

  createPojectFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {

  },
  private projectsService: ProjectsService,
  private snackbar: MatSnackBar,
  private formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<AddProjectDialogComponent>) { }

  ngOnInit(): void {
    this.createPojectFormGroup = this.generatCreatePojectFormGroup();
  }

  onCreate(): void {
    const name = this.createPojectFormGroup.controls['name'].value;
    const description = this.createPojectFormGroup.controls['description'].value;

    const projectRequest = { name, description };

    this.projectsService.createProject(projectRequest).subscribe({
      next: () => {
        this.snackbar.open("Successfully created project", undefined, { duration: 3000 });
        this.dialogRef.close();
      },
      error: (value: HttpErrorResponse) => {
        if (value.status === 409) {
          this.snackbar.open("Project with this name already exists", undefined, { duration: 3000 });
        } else {
          this.snackbar.open("Error while creating project", undefined, { duration: 3000 });
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

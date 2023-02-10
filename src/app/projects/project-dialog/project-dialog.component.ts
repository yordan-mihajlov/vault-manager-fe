import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/services/projects.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  projectName: string;
  configs: Map<string, string>;
  configsJson: string;
  edit: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    projectName: string
  },
  private projectsService: ProjectsService,
  private snackbar: MatSnackBar) {
    this.projectName = data.projectName;
  }
  
  ngOnInit(): void {
    this.edit = false;
    this.projectsService.getProjectData(this.projectName).subscribe((data) => {
      this.configs = data.configurations;
    });
  }

  onEdit(): void {
    this.configsJson = JSON.stringify(this.configs, null, 2);
    this.edit = true;
  }

  onSubmit(): void {
    let isValid = true;
    try {
      this.configs = JSON.parse(this.configsJson);
    } catch (e) {
      isValid = false;
      this.snackbar.open("Not a valid configuration", undefined, { duration: 3000 });
    }
    if (isValid) {
      this.edit = false;
      this.saveConfigs(this.projectName, this.configs);
    }
  }

  onCancel(): void {
    this.edit = false;
  }

  private saveConfigs(projectName: string, configs: Map<string, string>): void {
    const configsRequest = {
      projectName, configs
    };
    this.projectsService.updateProjectConfigs(configsRequest).subscribe({
      next: () => this.snackbar.open("Successfully saved configuration", undefined, { duration: 3000 }),
      error: () => this.snackbar.open("Error while saving configurations", undefined, { duration: 3000 })
    }
    )
  }
}

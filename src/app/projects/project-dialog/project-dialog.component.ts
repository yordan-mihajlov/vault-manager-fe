import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/services/projects.service';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  projectName: string;
  configs: Map<string, string>;
  usernames: string[];
  usernamesUpdate: string[];
  configsJson: string;
  edit: boolean;
  view: boolean;
  changeUsers: boolean;

  isAdmin = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    projectName: string
    projectOwner: string
  },
  private projectsService: ProjectsService,
  private roleService: RoleService,
  private snackbar: MatSnackBar) {
    this.projectName = data.projectName;
  }
  
  ngOnInit(): void {
    this.isAdmin = this.roleService.hasRole("ROLE_ADMIN");
    this.view = true;
    this.edit = false;
    this.changeUsers = false;
    this.projectsService.getProjectData(this.projectName).subscribe((data) => {
      this.configs = data.configurations;
      this.usernames = data.username;
      this.usernamesUpdate = data.username;
      this.configsJson = JSON.stringify(this.configs, null, 2);
    });
  }

  onEdit(): void {
    this.configsJson = JSON.stringify(this.configs, null, 2);
    this.view = false;
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
      this.view = true;
      this.edit = false;
      this.saveConfigs(this.projectName, this.configs);
    }
  }

  onCancel(): void {
    this.view = true;
    this.edit = false;
  }

  onChangeUsers(): void {
    this.view = false;
    this.changeUsers = true;
  }

  onSubmitUsers(): void {
    this.view = true;
    this.changeUsers = false;
    this.saveUsernames(this.projectName, this.usernamesUpdate);
  }

  onUsernamesChange(usernamesUpdate: string[]): void {
    this.usernamesUpdate = usernamesUpdate;
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

  private saveUsernames(projectName: string, userNames: string[]): void {
    const usersRequest = {
      projectName, userNames
    };
    this.projectsService.changeUsers(usersRequest).subscribe({
      next: () => this.snackbar.open("Successfully saved users", undefined, { duration: 3000 }),
      error: () => this.snackbar.open("Error while saving users", undefined, { duration: 3000 })
    }
    )
  }
}

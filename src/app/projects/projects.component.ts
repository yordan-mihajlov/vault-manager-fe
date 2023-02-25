import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectResponse } from 'src/models/project-response';
import { ProjectsService } from 'src/services/projects.service';
import { RoleService } from 'src/services/role.service';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: ProjectResponse[];

  isAdmin = false;

  constructor(
    private projectsService: ProjectsService,
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.isAdmin = this.roleService.hasRole("ROLE_ADMIN");
    this.getProjects();
  }

  onOpenClick(projectName: string) {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      minWidth: 640,
      data: { 
        projectName: projectName
      }
    });
  }

  onCreateClick() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      minWidth: 640
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProjects();
    });
  }

  onDeleteClick(projectName: String) {
    this.projectsService.deleteProject(projectName).subscribe({
      next: () => {
        this.snackbar.open("Successfully deleted project", undefined, { duration: 3000 });
        this.getProjects();
      },
      error: () => this.snackbar.open("Error while deliting project", undefined, { duration: 3000 })
    })
  }

  private getProjects(): void {
    this.projectsService.getProjectAll().subscribe({
      next: (projects) => this.projects = projects,
      error: () => this.snackbar.open("Error while fetching projects", undefined, { duration: 3000 })
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectItemComponent } from './project-item/project-item.component';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: { title: 'Projects component' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ProjectsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    CommonModule,
    FormsModule
  ],
  exports: [RouterModule],
  declarations: [
    ProjectsComponent,
    ProjectDialogComponent,
    ProjectItemComponent,
    AddProjectDialogComponent
  ]
})
export class ProjectsModule { }

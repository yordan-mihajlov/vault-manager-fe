import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';
import { SystemsComponent } from './systems.component';
import { AddSystemDialogComponent } from './add-system-dialog/add-system-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: SystemsComponent,
    data: { title: 'Systems component' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  declarations: [
    SystemsComponent,
    AddSystemDialogComponent,
  ]
})
export class SystemsModule { }

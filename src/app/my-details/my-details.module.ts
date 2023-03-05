import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MyDetailsComponent } from './my-details.component';
import { MyDetailsRoutingModule } from './my-deatils-routing.module';
import { MarkUsersAsAdminsDialogComponent } from './mark-users-as-admins-dialog/mark-users-as-admins-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';


const routes: Routes = [
  {
    path: '',
    component: MyDetailsComponent,
    data: { title: 'MyDetails component' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MyDetailsRoutingModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [
    MyDetailsComponent,
    MarkUsersAsAdminsDialogComponent
  ]
})
export class MyDetailsModule { }

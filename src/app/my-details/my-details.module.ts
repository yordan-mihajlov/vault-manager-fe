import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MyDetailsComponent } from './my-details.component';
import { MyDetailsRoutingModule } from './my-deatils-routing.module';


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
    MatButtonModule
  ],
  exports: [RouterModule],
  declarations: [
    MyDetailsComponent
  ]
})
export class MyDetailsModule { }

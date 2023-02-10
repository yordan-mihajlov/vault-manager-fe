import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home component' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HomeRoutingModule,
    MatButtonModule
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }

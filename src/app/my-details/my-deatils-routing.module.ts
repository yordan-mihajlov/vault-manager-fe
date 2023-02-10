import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDetailsComponent } from '../my-details/my-details.component';

const routes: Routes = [
  {
    path: '',
    component:MyDetailsComponent,
    data: { title: 'Secret component' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDetailsRoutingModule { }

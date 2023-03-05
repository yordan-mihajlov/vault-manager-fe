import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemsComponent } from './systems.component';

const routes: Routes = [
  {
    path: '',
    component:SystemsComponent,
    data: { title: 'Systems component' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsRoutingModule { }

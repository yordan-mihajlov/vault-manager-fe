import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigsComponent } from '../configs/configs.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigsComponent,
    data: { title: 'Configs component' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }

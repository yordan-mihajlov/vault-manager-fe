import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretComponent } from '../secret/secret.component';

const routes: Routes = [
  {
    path: '',
    component: SecretComponent,
    data: { title: 'Secret component' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'configs',
    loadChildren: () => import('../app/configs/configs.module').then(m => m.ConfigsModule)
  },
  {
    path: 'systems',
    loadChildren: () => import('../app/systems/systems.module').then(m => m.SystemsModule)
  },
  {
    path: 'secret',
    loadChildren: () => import('../app/secret/secret.module').then(m => m.SecretModule)
  },
  {
    path: 'my-details',
    loadChildren: () => import('../app/my-details/my-details.module').then(m => m.MyDetailsModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

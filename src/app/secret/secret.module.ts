import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { SecretComponent } from './secret.component';
import { SecretRoutingModule } from './secret-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SecretDialogComponent } from './secret-dialog/secret-dialog.component';
import { SelectNamesComponent } from '../select-names/select-names.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  {
    path: '',
    component: SecretComponent,
    data: { title: 'Secret component' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SecretRoutingModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule, 
  ],
  exports: [RouterModule],
  declarations: [
    SecretComponent,
    SecretDialogComponent,
    SelectNamesComponent
  ]
})
export class SecretModule { }

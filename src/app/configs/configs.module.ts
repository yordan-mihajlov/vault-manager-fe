import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigsComponent } from './configs.component';
import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigItemComponent } from './config-item/config-item.component';
import { AddConfigDialogComponent } from './add-config-dialog/add-config-dialog.component';
import { SharedModule } from '../shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const routes: Routes = [
  {
    path: '',
    component: ConfigsComponent,
    data: { title: 'Configs component' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ConfigsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ClipboardModule,
    MatButtonToggleModule
  ],
  exports: [RouterModule],
  declarations: [
    ConfigsComponent,
    ConfigDialogComponent,
    ConfigItemComponent,
    AddConfigDialogComponent,
  ]
})
export class ConfigsModule { }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigResponse } from 'src/models/config-response';
import { ConfigsService } from 'src/services/configs.service';
import { RoleService } from 'src/services/role.service';
import { AddConfigDialogComponent } from './add-config-dialog/add-config-dialog.component';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {

  configs: ConfigResponse[];
  selectedConfigs = [];


  isAdmin = false;

  constructor(
    private configsService: ConfigsService,
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.isAdmin = this.roleService.hasRole("ROLE_ADMIN");
    this.getConfigs();
  }

  onOpenClick(configName: string) {
    const dialogRef = this.dialog.open(ConfigDialogComponent, {
      minWidth: 640,
      data: {
        configName: configName
      }
    });
  }

  onCreateClick() {
    const dialogRef = this.dialog.open(AddConfigDialogComponent, {
      minWidth: 640
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getConfigs();
    });
  }

  onDeleteClick(configtName: String) {
    this.configsService.deleteConfig(configtName).subscribe({
      next: () => {
        this.snackbar.open("Конфигурацията е изтрита успешно!", undefined, { duration: 3000 });
        this.getConfigs();
      },
      error: () => this.snackbar.open("Възникна грешка при изтриването на конфигурацията!", undefined, { duration: 3000 })
    })
  }

  onConfigClick(config: any) {
    const index = this.selectedConfigs.indexOf(config.name);
    if (index === -1) {
      this.selectedConfigs.push(config.name);
    } else {
      this.selectedConfigs.splice(index, 1);
    }
  }

  onGetSelectedClick() {
    this.configsService.export(this.selectedConfigs).subscribe((blob: Blob) => {
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'config-export.csv';
      a.click();
      URL.revokeObjectURL(downloadUrl);
    });
    this.selectedConfigs = [];
  }

  hasSelectedConfigs() {
    return !!this.selectedConfigs.length;
  }

  selectedFile: File = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    console.log(file)
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.configsService.import(formData).subscribe({
      next: () => {
        this.snackbar.open("Успешно импортирани конфигурации!", undefined, { duration: 3000 });
        this.getConfigs();
      },
      error: (value: HttpErrorResponse) => {
        if (value.status === 409) {
          this.snackbar.open("Конфигурация с такова име вече съществува!", undefined, { duration: 3000 });
        } else { this.snackbar.open("Възникна грешка при импортирането на конфигурации!", undefined, { duration: 3000 }) }
      }
    });
  }

  private getConfigs(): void {
    this.configsService.getConfigAll().subscribe({
      next: (configs) => this.configs = configs,
      error: () => this.snackbar.open("Възникна грешка при извличането на конфигурациите!", undefined, { duration: 3000 })
    });
  }
}

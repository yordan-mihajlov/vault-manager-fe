import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigsRequest } from 'src/models/configs-request';
import { ConfigsService } from 'src/services/configs.service';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit {

  configName: string;
  configs: Map<string, string>;
  usernames: string[];
  usernamesUpdate: string[];
  systemnames: string[];
  systemnamesUpdate: string[];
  configsText: string;
  edit: boolean;
  view: boolean;
  changeUsers: boolean;
  changeSystems: boolean;
  isAdmin: boolean;
  format: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    configName: string
    configOwner: string
  },
    private configsService: ConfigsService,
    private roleService: RoleService,
    private snackbar: MatSnackBar) {
    this.configName = data.configName;
  }

  ngOnInit(): void {
    this.isAdmin = this.roleService.hasRole("ROLE_ADMIN");
    this.view = true;
    this.edit = false;
    this.changeUsers = false;
    this.changeSystems = false;
    this.configsService.getConfigData(this.configName).subscribe((data) => {
      this.configs = data.configurations;
      this.usernames = data.usernames;
      this.usernamesUpdate = data.usernames;
      this.systemnames = data.systemnames;
      this.systemnamesUpdate = data.systemnames;
      this.configsText = this.convertToJson(this.configs);
    });
  }

  onFormatChange(format: MatButtonToggleChange): void {
    if (format.value === "json") {
      if (!this.isValidProperties(this.configsText)) {
        this.format = "props";
        format.source.buttonToggleGroup.value =this.format;
        this.snackbar.open("Невалидна конфигурация!", undefined, { duration: 3000 });
        return;
      }
      this.propertiesToPropertiesMap(this.configsText);
      this.configs = this.propertiesToPropertiesMap(this.configsText);
      const configsObj = {} as Map<string, string>;
      this.configs.forEach((val: string, key: string) => {
        configsObj[key] = val;
      });

      this.configs = configsObj
      this.configsText = this.convertToJson(this.configs);
    } else if (format.value === "props") {
      if (!this.isValidJson(this.configsText)) {
        this.format = "json";
        format.source.buttonToggleGroup.value = this.format;
        this.snackbar.open("Невалидна конфигурация!", undefined, { duration: 3000 });
        return;
      }
      this.configs = this.jsonToPropertiesMapWrapper(this.configsText);
      const configsObj = {} as Map<string, string>;
      this.configs.forEach((val: string, key: string) => {
        configsObj[key] = val;
      });

      this.configs = configsObj
      this.configsText = this.convertToProperties(this.configs);
    }
  }

  onEdit(): void {
    this.configsText = this.convertToJson(this.configs);
    this.view = false;
    this.edit = true;
    this.format = "json";
  }

  onSubmit(): void {
    let isValid = true;
    try {
      if (this.format === "json") {
        if (!this.isValidJson(this.configsText)) {
          this.snackbar.open("Невалидна конфигурация!", undefined, { duration: 3000 });
          return;
        }
        this.configs = this.jsonToPropertiesMapWrapper(this.configsText);
      } else {
        if (!this.isValidProperties(this.configsText)) {
          this.snackbar.open("Невалидна конфигурация!", undefined, { duration: 3000 });
          return;
        }
        this.configs = this.propertiesToPropertiesMap(this.configsText);
      }
    } catch (e) {
      isValid = false;
      this.snackbar.open("Невалидна конфигурация!", undefined, { duration: 3000 });
    }
    if (isValid) {
      this.view = true;
      this.edit = false;
      const configsObj = {} as Map<string, string>;
      this.configs.forEach((val: string, key: string) => {
        configsObj[key] = val;
      });

      this.configs = configsObj
      this.saveConfigs(this.configName, this.configs);
    }
  }

  onCancel(): void {
    this.view = true;
    this.edit = false;
  }

  onChangeUsers(): void {
    this.view = false;
    this.changeUsers = true;
  }

  onSubmitUsers(): void {
    this.view = true;
    this.changeUsers = false;
    this.saveUsernames(this.configName, this.usernamesUpdate);
  }

  onChangeSystems(): void {
    this.view = false;
    this.changeSystems = true;
  }

  onSubmitSystems(): void {
    this.view = true;
    this.changeSystems = false;
    this.saveSystems(this.configName, this.systemnamesUpdate);
  }

  onUsernamesChange(usernamesUpdate: string[]): void {
    this.usernamesUpdate = usernamesUpdate;
  }

  onSystemnamesChange(systemnamesUpdate: string[]): void {
    this.systemnamesUpdate = systemnamesUpdate;
  }

  private isValidProperties(str: string): boolean {
    const lines = str.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('#') || line === '') {
        continue;
      }
      const keyValue = line.split('=');
      if (keyValue.length !== 2 || keyValue[0].trim() === '' || keyValue[1].trim() === '') {
        return false;
      }
    }
  
    return true;
  }

  private isValidJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  private saveConfigs(configName: string, configs: Map<string, string>): void {
    const configsRequest = {
      configName, configs
    } as ConfigsRequest;


    this.configsService.updateConfigConfigs(configsRequest).subscribe({
      next: () => this.snackbar.open("Успешна промяна на конфигурацията!", undefined, { duration: 3000 }),
      error: () => this.snackbar.open("Възникна грешка при промяната на конфигурацията!", undefined, { duration: 3000 })
    }
    )
  }

  private saveUsernames(configName: string, usernames: string[]): void {
    const usersRequest = {
      configName, usernames
    };
    this.configsService.changeUsers(usersRequest).subscribe({
      next: () => this.snackbar.open("Успешна промяна на потребителите!", undefined, { duration: 3000 }),
      error: () => this.snackbar.open("Възникна грешка при промяната на потребителите!", undefined, { duration: 3000 })
    }
    )
  }

  private saveSystems(configName: string, usernames: string[]): void {
    const usersRequest = {
      configName, usernames
    };
    this.configsService.changeSystems(usersRequest).subscribe({
      next: () => this.snackbar.open("Успешна промяна на системите!", undefined, { duration: 3000 }),
      error: () => this.snackbar.open("Възникна грешка при промяната на системите!", undefined, { duration: 3000 })
    }
    )
  }

  private convertToJson(configs: Map<string, string>): any {
    const json = {};
    const map = new Map(Object.entries(configs));
    map.forEach((value, key) => {
      const keys = key.split('.');
      let temp = json;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) {
          temp[keys[i]] = {};
        }
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value.replace(/"/g, '').trim();
    });
    return JSON.stringify(json, null, 2);
  }

  private convertToProperties(configs: Map<string, string>): any {
    let properties = "";
    for (const [key, value] of Object.entries(configs)) {
      properties += `${key}=${value}\n`;
    }
    return properties;
  }

  private jsonToPropertiesMap(configsText: string, parentKey = ''): any {
    const propertiesMap = new Map<string, string>();
    for (const [key, value] of Object.entries(configsText)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === 'object') {
        const childMap = this.jsonToPropertiesMap(value, fullKey);
        for (const [childKey, childValue] of childMap.entries()) {
          propertiesMap.set(childKey, childValue);
        }
      } else {
        propertiesMap.set(fullKey, value.toString());
      }
    }
    return propertiesMap;
  }

  private jsonToPropertiesMapWrapper(configsText: string): Map<string, string> {
    return this.jsonToPropertiesMap(JSON.parse(this.configsText));
  }

  private propertiesToPropertiesMap(configsText: string): Map<string, string> {
    const propertiesMap = new Map<string, string>();
    configsText.split("\n").forEach(line => {
      const [key, value] = line.split("=");
      if (key && value) {
        propertiesMap.set(key, value);
      }
    });
    return propertiesMap;
  }
}

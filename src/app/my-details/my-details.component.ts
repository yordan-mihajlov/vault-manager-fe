import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterResponse } from 'src/models/register-response.model';
import { RoleService } from 'src/services/role.service';
import { UsersService } from 'src/services/users.service';
import { MarkUsersAsAdminsDialogComponent } from './mark-users-as-admins-dialog/mark-users-as-admins-dialog.component';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent implements OnInit {

  userInfo: RegisterResponse = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    roles: []
  };

  isModerator = false;

  constructor(private usersService: UsersService,
    private roleService: RoleService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.usersService.getUserDetails().subscribe(userInfo => this.userInfo = userInfo);
    this.isModerator = this.roleService.hasRole("ROLE_MODERATOR");
    console.log(this.isModerator);
  }

  onMarkAsAdminsClick(): void {
    const dialogRef = this.dialog.open(MarkUsersAsAdminsDialogComponent, {
      minWidth: 640,
      data: {}
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { UserInfoResponse } from 'src/models/user-info-response.model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent implements OnInit {

  userInfo: UserInfoResponse = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    roles: []
  };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserDetails().subscribe(userInfo => this.userInfo = userInfo);
  }
}
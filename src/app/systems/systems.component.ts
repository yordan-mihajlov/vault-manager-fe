import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/services/login.service';
import { UsersService } from 'src/services/users.service';
import { AddSystemDialogComponent } from './add-system-dialog/add-system-dialog.component';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {

  constructor(private loginService: LoginService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  onCreateClick() {
    const dialogRef = this.dialog.open(AddSystemDialogComponent, {
      minWidth: 640
    });
  }

}

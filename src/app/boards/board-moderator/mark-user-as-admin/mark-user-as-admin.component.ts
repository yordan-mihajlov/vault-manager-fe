import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModeratorService } from 'src/app/_services/moderator.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-mark-user-as-admin',
  templateUrl: './mark-user-as-admin.component.html',
  styleUrls: ['./mark-user-as-admin.component.css']
})
export class MarkUserAsAdminComponent implements OnInit {
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(
    private moderatorService: ModeratorService,
    private userService: UserService) {
  }

  ngOnInit() {
     this.moderatorService.getUsernames().subscribe(
       data => {
         console.log(data);
         this.options = data;
       });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filter(name) : this.options)),
    );
  }

  displayFn(username: string): string {
    return username ? username : '';
  }

  private _filter(name: string): string[] {
    const filterUsername = name.toLowerCase();

    return this.options.filter(username => name.toLowerCase().includes(filterUsername));
  }

}

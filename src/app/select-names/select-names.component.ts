import { Component, ViewChild, ElementRef, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SecretsService } from 'src/services/secrets.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'select-names',
  templateUrl: 'select-names.component.html',
  styleUrls: ['select-names.component.scss']
})

export class SelectNamesComponent implements OnInit {

  @ViewChild('search') searchNamesTextBox: ElementRef;

  @Input() selectedNames: string[] = [];
  @Output() newItemEvent = new EventEmitter<string[]>();

  selectNamesFormControl = new FormControl();
  searchNameTextboxControl = new FormControl();
  names: string[] = [];

  filteredOptions: Observable<any[]>;

  constructor(
    private secretsService: SecretsService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsernames().subscribe({
      next: (usernames: string[]) => {
        this.names = usernames;
        this.filteredOptions = this.searchNameTextboxControl.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => this._filter(name))
          );
      }
    });
  }

  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    this.setSelectedValues();
    this.selectNamesFormControl.patchValue(this.selectedNames);
    let filteredList = this.names.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  selectionChange(event: any) {
    if (event.isUserInput) {
      let index = this.selectedNames.indexOf(event.source.value);
      this.selectedNames.splice(index, 1)

      this.newItemEvent.emit(this.selectedNames);
    }
  }

  openedChange(e: any) {
    this.searchNameTextboxControl.patchValue('');
    if (e == true) {
      this.searchNamesTextBox.nativeElement.focus();
    }
  }

  clearSearch(event: any) {
    event.stopPropagation();
    this.searchNameTextboxControl.patchValue('');
  }

  private setSelectedValues() {
    if (this.selectNamesFormControl.value && this.selectNamesFormControl.value.length > 0) {
      this.selectNamesFormControl.value.forEach((e: string) => {
        if (this.selectedNames.indexOf(e) == -1) {
          this.selectedNames.push(e);
        }
      });
    }
  }
}
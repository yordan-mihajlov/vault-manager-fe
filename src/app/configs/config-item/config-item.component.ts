import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.css']
})
export class ConfigItemComponent implements OnInit {

  @Input() key = '';
  @Input() value = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.key);
  }

}

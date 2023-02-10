import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() key = '';
  @Input() value = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.key);
  }

}

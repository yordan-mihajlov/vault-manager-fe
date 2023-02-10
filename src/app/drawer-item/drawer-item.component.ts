import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drawer-item',
  templateUrl: './drawer-item.component.html',
  styleUrls: ['./drawer-item.component.scss']
})
export class DrawerItemComponent {

  @Input()
  icon: string;
}

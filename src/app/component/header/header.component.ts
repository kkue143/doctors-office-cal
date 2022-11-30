import { Component } from '@angular/core';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public ui: UiService) {}

}

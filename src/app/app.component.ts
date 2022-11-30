import { Component } from '@angular/core';
import { UiService } from 'src/services/ui.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public ui: UiService) {}

}

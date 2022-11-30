import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(public ui: UiService) {}

  ngOnInit(): void {}

}

import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username = ''
  public password = ''


  constructor(public ui: UiService) {}


  ngOnInit(): void {}

}

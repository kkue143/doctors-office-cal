import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/Appointment';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  @Input() appointment: Appointment | undefined

  constructor(public ui: UiService) {}

  ngOnInit(): void {
    // initializer
  }

}

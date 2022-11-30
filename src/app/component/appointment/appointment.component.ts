import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/Appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  @Input() appointment: Appointment | undefined

  constructor() {}

  ngOnInit(): void {
    // initializer
  }

}

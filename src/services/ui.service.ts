import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/User';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/Appointment';



@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showRegister = false 
  private showLogin = true
  private loading = false 
  private userId: number | undefined
  private username: string | undefined
  private doctor = false
  private appointments: Appointment[] = []
  private showNewApp = false

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    if (username !== null && password !== null) {
      this.tryLogin(username, password)
    }
  }

  public getShowRegister(): boolean {
    return this.showRegister
  }

  public getShowLogin(): boolean {
    return this.showLogin
  }

  public getLoading(): boolean {
    return this.loading
  }

  public getUsername(): string | undefined {
    return this.username
  }

  public getAppointments(): Appointment[] {
    return this.appointments
  }

  public isDoctor(): boolean {
    return this.userId !== undefined && this.doctor
  }

  public isShowNewApp(): boolean {
      return this.showNewApp
  }

  public startNewApp(): void {
    this.showNewApp = true
  }

  public stopNewApp(): void {
    this.showNewApp = false
  }

  public newApp(date: Date, slot: number): void {
    this.showNewApp = false

    slot--

    if (slot < 0 || slot > 8 || slot % 1 !== 0) {
      this.showError('This slot is invalid')
      return
    }

    if (date < new Date()) {
      this.showError('Date is invalid')
    }

    this.showNewApp = false

    if (this.userId === undefined) {
      this.showError('BUG! You are not logged in!')
      return
    }

    this.http.post('http://localhost:3000/appointments', {
      doctorId: this.userId, 
      patientId: null, 
      date, 
      slot
    })
    .pipe(take(1))
    .subscribe( {
      next: () => {
          this.loadAppointments()
      },
      error: () => {
        this.showError('Oops, something went wrong!')
      }
    })
  }

  public startRegister(): void {
    this.showRegister = true
    this.showLogin = false
  }

  public startLogin(): void {
    this.showRegister = false
    this.showLogin = true
  }

  private showError(message: string): void {
    this._snackBar.open(message, undefined, {
      duration: 2000
    })
  }

  private loginSuccess(user: User): void {
    this.showLogin = false
    this.userId = user.id
    this.username = user.username
    this.doctor = user.doctor
    localStorage.setItem("username", user.username)
    localStorage.setItem("password", user.password)
    this.loadAppointments()
  }

  private loadAppointments(): void {
    this.loading = true
    if (this.doctor) {
      this.http.get<Appointment[]>(`http://localhost:3000/appointments?doctorId=${this.userId}`)
      .pipe(take(1))
      .subscribe ({
        next: appointments => {
          console.log(appointments)
        this.appointments = appointments
        this.loading = false
        },
        error: () => {
          this.loading = false
        this.showError('Oops, something went wrong!')
        }
      })
    } else {
    this.showError('Patient appts not implemented yet')
    this.loading = false
    } 
  }

  public tryLogin(username: string, password: string): void {
    this.http.get<User[]>(`http://localhost:3000/users?username=${username}&password=${password}`)
    .pipe(take(1))
    .subscribe({
        next :users => {
          if (users.length !== 1) {
            this.showError('Invalid Username and/or Password.')
          }

            this.loginSuccess(users[0])

        },
        error: err => this.showError('Oops, something went wrong!')
    })
  }

  public logout(): void {
  this.showRegister = false 
  this.showLogin = true
  this.loading = false 
  this.userId = undefined
  this.username = undefined
  this.doctor = false
  this.appointments = []
  this.showNewApp = false
  localStorage.clear
}

}

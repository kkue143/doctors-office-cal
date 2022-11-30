import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/User';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showRegister = false 
  private showLogin = true
  private loading = false 
  private userId: number | undefined
  private username: string | undefined
  private appointments = []

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

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

  public startRegister(): void {
    this.showRegister = true
    this.showLogin = false
  }

  public startLogin(): void {
    this.showRegister = false
    this.showLogin = true
  }

  public tryLogin(username: string, password: string): void {
    this.http.get<User[]>(`http://localhost:3000/users?username=${username}&password=${password}`)
    .pipe(take(1))
    .subscribe({
        next :users => {
          if (users.length !== 1) {
            this._snackBar.open('Invalid Username and/or Password.', undefined, {
              duration: 2000
            })
          }
        },
        error: err => this._snackBar.open('Oops, something went wrong!', undefined, {
          duration: 2000
      })
    })
  }
}

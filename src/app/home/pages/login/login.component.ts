import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
export class LoginComponent {

  userId: any;
  userType: any;
  hide: boolean = true;
  showMessage: boolean = false;
  users: Usuario[] = [];
  @ViewChild('miFormulario') miFormulario!: NgForm;

  constructor(private router: Router, private homeService: HomeService) {
    this.homeService.login().subscribe( (data: any) => {
      this.users = data.result.content
    });
  }    

  login(): void {
    if (this.filtro(this.miFormulario.value.email, this.miFormulario.value.password)) {
      localStorage.setItem('userId', this.userId);
      localStorage.setItem('userType', this.userType);
      if (this.userType == 'user_client') {
        this.router.navigate(['/main/homeclient']);
      } else {
        this.router.navigate(['/main/homeadmin']);
      }
    } else {
      this.showMessage = true;
    }

  }

  filtro(email: string, password: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email && this.users[i].password === password) {
        this.userId = this.users[i].id;
        this.userType = this.users[i].userType;
        return true;
      }
    } return false;
  }

}
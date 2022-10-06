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

  hide: boolean = true;
  showMessage: boolean = false;
  users: Usuario[] = [];
  @ViewChild('miFormulario') miFormulario!: NgForm;

  constructor(private router: Router, private homeService: HomeService) {
    // this.homeService.login().subscribe( (data: any) => {
    //   this.users = data.result.content
    // });
  }    

  login(): void {
    this.router.navigate(['/main/homeclient']);;
    // if (this.filtro(this.miFormulario.value.email, this.miFormulario.value.password)) {
    // } else {
    //   this.showMessage = true;
    // }

  }

  filtro(email: string, password: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email && this.users[i].password === password) {
        return true;
      }
    } return false;
  }

}
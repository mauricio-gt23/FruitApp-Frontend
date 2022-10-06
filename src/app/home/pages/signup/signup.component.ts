import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
  })
export class SignupComponent {
    
    hide: boolean = true;
    showMessage: boolean = false;
    client: Cliente = {
      name: '',
      lastName: '',
      email: '',
      number: '',
      address: '',
      password: ''
    }

    miFormulario: FormGroup = this.fb.group({
      nombre: [ this.client.name, [Validators.required]],
      apellido: [ this.client.lastName, [Validators.required]],
      email: [ this.client.email, [Validators.required, Validators.email]],
      numero: [this.client.number, [Validators.required, Validators.minLength(9)]],
      ubicacion: [ this.client.address, [Validators.required]],
      contraseña: [ this.client.password, [Validators.required]]
    });

    constructor(private router: Router, private fb: FormBuilder, private homeService: HomeService) {
    }    

    signup(): void {
      if (this.miFormulario.valid) {
        this.client = {
          name: this.miFormulario.controls['nombre'].value,
          lastName: this.miFormulario.controls['apellido'].value,
          email: this.miFormulario.controls['email'].value,
          number: this.miFormulario.controls['numero'].value,
          address: this.miFormulario.controls['ubicacion'].value,
          password: this.miFormulario.controls['contraseña'].value
        }
        this.homeService.registro(this.client).subscribe( (_) => {
          this.router.navigate(['/login']);;
        })
      } else {
        this.showMessage = true;
      }
    }

    campoNoEsValido( field: string ) {
      return this.miFormulario.controls[field].errors 
             && this.miFormulario.controls[field].touched;
    }
}
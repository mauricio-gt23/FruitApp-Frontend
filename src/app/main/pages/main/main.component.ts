import { Component } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';
import { Admin } from "../../interfaces/admin.interface";
import { Client } from "../../interfaces/client.interface";
import { User } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
  })
  export class MainComponent {
  
    userId: any;
    userType: any;
    showShoppingCart: boolean = false;
    showLinkClient: boolean = false;
    showLinkAdmin: boolean = false;
    showNav: boolean = false;
    currentRoute: string = '';
    user: User = {};
    client: Client = {
      email: '',
      password: '',
      name: '',
      lastName: '',
      number: 0,
      address: ''
    };
    admin: Admin = {
      email: '',
      password: '',
      adminName: '',
      adminLastName: '',
      number: 0
    }

    constructor(private route: Router, private userService: UserService) {

      // OBTENER USER TYPE && USER ID
      this.userId = localStorage.getItem('userId');
      this.userType = localStorage.getItem('userType');

      // OBTENER EL LINK
      this.route.events.subscribe( event => {
        if(event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          if (this.userType == 'user_admin') {
            this.showLinkAdmin = true;
          } else if (this.userType == 'user_client') {
            this.showLinkClient = true;
            this.showShoppingCart = true;
          }
        }
      });

      // OBTENER DATOS DEL USUARIO
      if (this.userType == 'user_admin') {
        this.userService.getAdminById(this.userId).subscribe( (data: any) => {
          this.admin = data.result;
          this.user.name = this.admin.adminName;
          this.user.lastName = this.admin.adminLastName;
        });
      } else if (this.userType == 'user_client') {
        this.userService.getClientById(this.userId).subscribe( (data: any) => {
          this.client = data.result;
          this.user.name = this.client.name;
          this.user.lastName = this.client.lastName;
        });
      }  

    }

    show():void {
      this.showNav = !this.showNav;
    }

    goToHome(): void {
      if (this.showLinkClient) {
        this.route.navigate(["/main/homeclient"]);
      } else if (this.showLinkAdmin) {
        this.route.navigate(["/main/homeadmin"]);
      }
    }

    goToBuy(): void {
      this.route.navigate(["/main/buy"]);
    }
    
    logOut(): void {
      localStorage.clear();
      this.route.navigate(["/login"]);
    }
  
  }
  
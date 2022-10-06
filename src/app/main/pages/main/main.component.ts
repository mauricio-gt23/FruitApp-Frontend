import { Component } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
  })
  export class MainComponent {
  
    showLinkClient: boolean = false;
    showLinkAdmin: boolean = false;
    showNav: boolean = false;
    currentRoute: string = '';

    constructor(private route: Router) {

      // OBTENER EL LINK
      this.route.events.subscribe( event => {
        if(event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          if (this.currentRoute == '/main/homeclient') {
            this.showLinkClient = true;
          } else if (this.currentRoute == '/main/homeadmin') {
            this.showLinkAdmin = true;
          }
        }
      });
    }

    mostrar():void {
      console.log("mostrado")
      this.showNav = !this.showNav;
    }

    goToHome(): void {
      if (this.showLinkClient) {
        this.route.navigate(["/main/homeclient"]);
      } else if (this.showLinkAdmin) {
        this.route.navigate(["/main/homeadmin"]);
      }
    }
  
  }
  
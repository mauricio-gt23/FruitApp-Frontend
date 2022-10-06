import { Component } from "@angular/core";
import SwiperCore, { SwiperOptions, Pagination, Navigation} from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-homeclient',
  templateUrl: './homeclient.component.html',
  styleUrls: ['./homeclient.component.css']
})
export class HomeClientComponent {
    
    config: SwiperOptions = {
      loop: true,
      slidesPerView: 1,
      centeredSlides: true,
      navigation: true,
      pagination: { clickable: true },
    };

    constructor() {
    }

  
  }
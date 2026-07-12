import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { logo } from 'src/app/app-const';

@Component({
  selector: 'mg-auth-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, CarouselModule],
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss']
})
export class AuthWrapperComponent {
  logo = logo.light;
  // Sample packages for carousel
  packages = [
    {
      id: 1,
      name: 'AUTH_WRAPPER.CARDS.EASY_REGISTRATION.TITLE',
      description: 'AUTH_WRAPPER.CARDS.EASY_REGISTRATION.DESCRIPTION',
    },
    {
      id: 2,
      name: 'AUTH_WRAPPER.CARDS.TRAINING_FOLLOWUP.TITLE',
      description: 'AUTH_WRAPPER.CARDS.TRAINING_FOLLOWUP.DESCRIPTION',
    },
    {
      id: 3,
      name: 'AUTH_WRAPPER.CARDS.SUBSCRIPTION_MANAGEMENT.TITLE',
      description: 'AUTH_WRAPPER.CARDS.SUBSCRIPTION_MANAGEMENT.DESCRIPTION',
    },
  ];

  // Owl Carousel options
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rtl: true,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  };

}

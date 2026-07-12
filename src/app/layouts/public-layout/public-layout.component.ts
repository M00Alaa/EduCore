import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { logo } from 'src/app/app-const';
import { AuthenticationService, MgUser } from 'src/app/core/services/auth.service';

@Component({
    selector: 'mg-public-layout',
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
    standalone: false
})
export class PublicLayoutComponent {
  acc: MgUser | null = null;
  logo = logo;
  scrolled = false;
  @HostListener('window:scroll', ['$event']) onScroll() {

    if (window.innerWidth < 700) {
      this.scrolled = true;
      return;
    }
    if (window.scrollY > 90) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }


  transparentNav = false;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.setNav();
    auth.identity(true).subscribe({
      next: (acc) => {
        this.acc = acc;
      }
    })
  }

  setNav() {
    this.router.events.pipe(
      filter((re) => re instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot?.data?.transparentNav) {
          return child.snapshot?.data?.transparentNav;
        }
        return null;
      })
    ).subscribe((res) => {
      if (res && window.innerWidth > 800) {
        this.transparentNav = true;
      }else{
        this.transparentNav = false;
      }
    });
  }



  logout() {
    this.auth.logout();
  }

  redirectUser() {
    if (this.auth.currentUserSubject.getValue()) {
      this.auth.redirectUser();
    } else {
      this.router.navigate(['/account/login']);
    }
  }
}

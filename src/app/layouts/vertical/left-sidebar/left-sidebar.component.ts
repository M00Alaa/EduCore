import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Injectable, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { BehaviorSubject } from 'rxjs';
import { logo } from 'src/app/app-const';

@Injectable({ providedIn: 'root' })
export class LeftSiderService {
  shown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  show() {
    document.body.classList.add('left-sider');
    this.shown.next(true);
  }

  hide() {
    document.body.classList.remove('left-sider');
    this.shown.next(false);

  }
  constructor() { }

}
@Component({
  selector: 'mg-left-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NgbTooltipModule,
    SimplebarAngularModule
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent {
  @ViewChild('sider') sider!: ElementRef<HTMLDivElement>;
  sidebartype = '';
  logos = logo;
  notification: any[] = [

  ]

  activities: any[] = [

  ]
  messages: any[] = [


  ]

  open = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public leftSiderService: LeftSiderService
  ) {
    leftSiderService.shown.subscribe(
      (value) => {
        setTimeout(() => {
          this.open = value;
        }, 10);
      }
    )
  }

  toggleView() {
    this.sider.nativeElement.classList.toggle('active')
  }

  toggleLeftSider() {

    if (this.leftSiderService.shown.getValue()) {
      this.leftSiderService.hide();
    }

  }
}
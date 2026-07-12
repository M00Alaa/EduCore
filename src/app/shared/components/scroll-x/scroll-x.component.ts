import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';

@Component({
    selector: 'mg-scroll-x',
    imports: [CommonModule, NgScrollbarModule],
    templateUrl: './scroll-x.component.html',
    styleUrls: ['./scroll-x.component.scss']
})
export class ScrollXComponent implements AfterViewInit {
  @ViewChild('scrollbar', {static: true}) scrollbar!: NgScrollbar;
  constructor() {

  }


  isDragging = false;
  isMoving = false;

  scrollState: 'left' | 'right' | 'both' | 'none' = 'none';
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollbar.viewport.nativeElement.addEventListener('scroll', (e) => {
        this.updateShadows();
      })
      let lastX = 0;

      this.scrollbar.viewport.nativeElement.addEventListener('mousedown', (e: MouseEvent) => {
        this.isDragging = true;
        lastX = e.clientX;
        this.isMoving = false;
      });

      document.addEventListener('mousemove', (e: MouseEvent) => {
        if (this.isDragging) {
          const deltaX = e.clientX - lastX;
          lastX = e.clientX;
          // Adjust the scroll position based on the mouse movement
          this.scrollbar.viewport.nativeElement.scrollLeft -= deltaX;
          this.isMoving = true;
        }
      });

      document.addEventListener('mouseup', () => {
        this.isDragging = false;
        this.isMoving = false;
      });
      this.updateShadows();
    }, 500);

  }

  updateShadows() {
    const scrollWidth = this.scrollbar.viewport.nativeElement.scrollLeft;    
    if (scrollWidth == 0) {
      this.scrollState = 'left';
    } else if (-scrollWidth >= this.scrollbar.viewport.scrollMaxX) {
      this.scrollState = 'right';
    } else if(-scrollWidth > 0 && -scrollWidth < this.scrollbar.viewport.scrollMaxX) {
      this.scrollState = 'both';
    }else{
      this.scrollState = 'none';
    }

    
  }
}

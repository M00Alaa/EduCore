import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';

import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
interface CountUpOptions {
  startVal?: number; // number to start at (0)
  decimalPlaces?: number; // number of decimal places (0)
  duration?: number; // animation duration in seconds (2)
  useGrouping?: boolean; // example: 1,000 vs 1000 (true)
  useEasing?: boolean; // ease animation (true)
  smartEasingThreshold?: number; // smooth easing for large numbers above this if useEasing (999)
  smartEasingAmount?: number; // amount to be eased for numbers above threshold (333)
  separator?: string; // grouping separator (',')
  decimal?: string; // decimal ('.')
  // easingFn: easing function for animation (easeOutExpo)
  easingFn?: (t: number, b: number, c: number, d: number) => number;
  formattingFn?: (n: number) => string; // this function formats result
  prefix?: string; // text prepended to result
  suffix?: string; // text appended to result
  numerals?: string[]; // numeral glyph substitution
}
@Component({
  selector: 'app-num-scroller',
  templateUrl: './num-scroller.component.html',
  styleUrls: ['./num-scroller.component.scss'],
  imports: [CommonModule, CountUpModule],
  standalone: true
})
export class NumScrollerComponent implements OnInit {
  @ViewChild('counter') counter!: ElementRef;
  @Input() param = 0;

  options: CountUpOptions = {
    duration: 5
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onWindowScroll(event: any) {
    const rect = this.counter.nativeElement.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    elemTop >= 0 && elemBottom <= window.innerHeight? (this.param = this.param): null;
  }
  constructor() {}

  ngOnInit(): void {}
}

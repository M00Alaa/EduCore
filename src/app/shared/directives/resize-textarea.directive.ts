import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[mgResizeTextarea]',
  standalone: true
})
export class ResizeTextareaDirective {


  constructor(private elementRef: ElementRef<HTMLTextAreaElement>) { }

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  ngOnInit() {
    if (this.elementRef.nativeElement.scrollHeight && this.elementRef.nativeElement.clientHeight < 150) {
      setTimeout(() => this.resize());
    }
  }

  resize() {
    this.elementRef.nativeElement.style.height = '60px';
    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
  }
}

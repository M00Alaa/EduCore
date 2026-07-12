import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'mg-instructions',
    imports: [CommonModule, NgbPopoverModule],
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
@Input() Title: string = "تعليمات";
}

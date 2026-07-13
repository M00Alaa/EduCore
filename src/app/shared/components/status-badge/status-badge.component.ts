import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseStatus } from '../../../pages/courses/courses.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-course-status-badge',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './status-badge.component.html',
    styleUrl: './status-badge.component.scss'
})
export class CourseStatusBadgeComponent {
    @Input() status: CourseStatus = 'Active';
    @Input() clickable = false;
    @Output() statusClick = new EventEmitter<CourseStatus>();

    get tone(): string {
        switch (this.status) {
            case 'Active':
                return 'is-active';
            case 'Draft':
                return 'is-draft';
            case 'Archived':
                return 'is-archived';
            default:
                return 'is-draft';
        }
    }

    get icon(): string {
        switch (this.status) {
            case 'Active':
                return 'isax isax-play';
            case 'Draft':
                return 'isax isax-note';
            case 'Archived':
                return 'isax isax-archive';
            default:
                return 'isax isax-note';
        }
    }
}
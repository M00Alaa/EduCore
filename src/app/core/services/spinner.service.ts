import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private spinnerSubject = new BehaviorSubject<boolean>(false);
    public spinner$ = this.spinnerSubject.asObservable();

    private spinnerElement: HTMLElement | null = null;

    constructor() {
        // Get spinner element after view init
        setTimeout(() => {
            this.spinnerElement = document.getElementById('spinner');
        }, 0);
    }

    showSpinner(): void {
        this.spinnerSubject.next(true);
        if (this.spinnerElement) {
            this.spinnerElement.style.display = 'block';
        }
    }

    hideSpinner(): void {
        this.spinnerSubject.next(false);
        if (this.spinnerElement) {
            this.spinnerElement.style.display = 'none';
        }
    }

    isSpinnerVisible(): boolean {
        return this.spinnerSubject.value;
    }
}
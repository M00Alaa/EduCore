import { Directive, HostListener } from '@angular/core';

/**
 * Restricts an <input> to phone-valid characters only:
 * digits (0-9), +, spaces, dashes, and parentheses.
 * Prevents letters and other non-numeric symbols from being typed or pasted.
 */
@Directive({
    selector: '[appPhoneOnly]',
    standalone: true
})
export class PhoneOnlyDirective {

    private allowedKeys = new Set([
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End', 'Control', 'Shift', 'Meta',
        'NumpadEnter'
    ]);

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (this.allowedKeys.has(event.key)) return;

        // Allow Ctrl/Cmd + A, C, V, X, Z
        if (event.ctrlKey || event.metaKey) return;

        // Allow: digits, +, space, -, (, )
        if (/^[\d+\s\-()]$/.test(event.key)) return;

        event.preventDefault();
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
        const pasted = event.clipboardData?.getData('text') ?? '';
        if (!/^[\d+\s\-()]*$/.test(pasted)) {
            event.preventDefault();
            // Insert only the valid characters
            const filtered = pasted.replace(/[^\d+\s\-()]/g, '');
            if (filtered) {
                document.execCommand('insertText', false, filtered);
            }
        }
    }
}

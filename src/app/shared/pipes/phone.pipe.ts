import { Pipe, PipeTransform } from '@angular/core';

/**
 * Normalises a Saudi mobile number to local format: 05XXXXXXXX
 * Handles: +966XXXXXXXXX, 00966XXXXXXXXX, 966XXXXXXXXX, 05XXXXXXXX, 5XXXXXXXX
 */
@Pipe({
    name: 'phone',
    standalone: true
})
export class PhonePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';

        // Strip whitespace and dashes
        let digits = String(value).replace(/[\s\-]/g, '');

        // Remove country code prefixes
        if (digits.startsWith('+966')) {
            digits = digits.slice(4);
        } else if (digits.startsWith('00966')) {
            digits = digits.slice(5);
        } else if (digits.startsWith('966') && digits.length === 12) {
            digits = digits.slice(3);
        }

        // Now digits should be 9 chars starting with 5, or 10 chars starting with 05
        if (digits.length === 9 && digits.startsWith('5')) {
            return '0' + digits;
        }

        if (digits.length === 10 && digits.startsWith('05')) {
            return digits;
        }

        // Return as-is if format is unrecognised
        return String(value);
    }
}

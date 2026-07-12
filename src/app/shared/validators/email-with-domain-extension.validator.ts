import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Email validator that requires a domain extension (e.g., .com, .org, .net).
 * Usage: Validators.required, emailWithDomainExtensionValidator()
 */
export function emailWithDomainExtensionValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const value = control.value;
        if (!value) return null;
        // Standard email regex with domain extension
        const emailRegex = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value) ? null : { email: true };
    };
}

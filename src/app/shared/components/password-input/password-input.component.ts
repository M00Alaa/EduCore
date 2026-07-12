import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'app-password-input',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule, NzInputModule],
    templateUrl: './password-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordInputComponent),
            multi: true,
        },
    ],
})
export class PasswordInputComponent implements ControlValueAccessor {
    @Input() placeholder = '';
    @Input() inputClass = 'h-50px';
    /** Show the password-strength badge (weak / strong) */
    @Input() showStrength = false;
    /** Show the checklist hints (min-length + complexity) */
    @Input() showValidations = false;
    @Input() nzSize: 'large' | 'default' | 'small' = 'large';

    value = '';
    showPassword = false;
    disabled = false;

    private onChange: (v: string) => void = () => { };
    private onTouched: () => void = () => { };

    get passwordLength(): boolean {
        return this.value.length >= 8;
    }

    get passwordComplexity(): boolean {
        return (
            /[A-Z]/.test(this.value) &&
            /[a-z]/.test(this.value) &&
            /[0-9]/.test(this.value)
        );
    }

    get passwordStrength(): 'weak' | 'strong' | '' {
        if (!this.value) return '';
        return this.passwordLength && this.passwordComplexity ? 'strong' : 'weak';
    }

    onInput(event: Event): void {
        const val = (event.target as HTMLInputElement).value;
        this.value = val;
        this.onChange(val);
    }

    onBlur(): void {
        this.onTouched();
    }

    writeValue(val: string): void {
        this.value = val ?? '';
    }

    registerOnChange(fn: (v: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}

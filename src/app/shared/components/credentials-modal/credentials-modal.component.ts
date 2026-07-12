import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export interface CredentialsModalData {
    type: SweetAlertIcon;
    title?: string;
    subtitle?: string;
    credentials?: {
        email?: string;
        password?: string;
        label?: string;
    };
    confirmButtonText?: string;
    confirmButtonHtml?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmOnDismiss?: boolean;
}

/**
 * Shared Credentials Modal Component
 * 
 * Usage Example:
 * ```typescript
 * CredentialsModalComponent.show({
 *   type: 'success',
 *   title: 'عملية ناجحة',
 *   subtitle: 'بيانات تسجيل الدخول:',
 *   credentials: {
 *     email: 'user@example.com',
 *     password: 'password123'
 *   },
 *   confirmButtonText: 'حسنًا',
 *   onConfirm: () => {
 *     // Optional callback after clicking confirm
 *     console.log('Modal closed');
 *   }
 * });
 * ```
 * 
 * Features:
 * - Success/Error states
 * - RTL/LTR support
 * - Copy to clipboard for email & password
 * - Password show/hide toggle
 * - Optional callback on confirm
 * - If no onConfirm is provided, modal simply closes
 */

@Component({
    selector: 'mg-credentials-modal',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: '',
    styleUrl: './credentials-modal.component.scss'
})
export class CredentialsModalComponent {
    static show(data: CredentialsModalData): void {
        const isRTL = localStorage.getItem('lang') === 'ar';

        const htmlContent = CredentialsModalComponent.buildContent(data, isRTL);

        const confirmText = data.confirmButtonHtml
            || data.confirmButtonText
            || (isRTL ? 'حسنًا' : 'OK');
        const showCancelButton = !!data.cancelButtonText;
        const actionsClass = isRTL
            ? 'd-flex flex-row-reverse gap-2 w-100'
            : 'd-flex flex-row gap-2 w-100';

        Swal.fire({
            icon: undefined,
            title: '',
            html: htmlContent || undefined,
            confirmButtonText: confirmText,
            confirmButtonColor: '#2BA18C',
            showCancelButton,
            cancelButtonText: data.cancelButtonText || undefined,
            buttonsStyling: false,
            allowOutsideClick: false,
            width: '600px',
            showCloseButton: true,
            closeButtonHtml: '&times;',
            customClass: {
                popup: 'p-4',
                actions: actionsClass,
                confirmButton: 'btn btn-primary-gradient flex-fill h-40px fs-1_125rem fw-medium',
                cancelButton: 'btn btn-white flex-fill h-40px fs-1_125rem fw-medium'
            },
            didOpen: () => {
                const popup = Swal.getPopup();
                if (!popup) {
                    return;
                }

                const copiedLabel = isRTL ? 'تم النسخ' : 'Copied';

                popup.querySelectorAll<HTMLElement>('.js-copy').forEach((button) => {
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        event.stopImmediatePropagation();
                        const value = button.dataset['value'];
                        if (!value) {
                            return;
                        }
                        navigator.clipboard.writeText(value);

                        const parent = button.parentElement;
                        if (parent) {
                            const existing = parent.querySelector('.copy-feedback');
                            if (existing) {
                                existing.remove();
                            }
                            const feedback = document.createElement('span');
                            feedback.className = 'copy-feedback';
                            feedback.textContent = copiedLabel;
                            feedback.style.marginInlineStart = '6px';
                            feedback.style.padding = '2px 6px';
                            feedback.style.borderRadius = '8px';
                            feedback.style.background = 'rgba(43, 161, 140, 0.15)';
                            feedback.style.color = '#2BA18C';
                            feedback.style.fontSize = '12px';
                            feedback.style.fontWeight = '600';
                            feedback.style.lineHeight = '1.4';
                            parent.appendChild(feedback);
                            window.setTimeout(() => {
                                feedback.remove();
                            }, 1500);
                        }
                    });
                });

                const passwordDisplay = popup.querySelector<HTMLElement>('[data-role="password-display"]');
                const passwordToggle = popup.querySelector<HTMLElement>('[data-role="password-toggle"]');
                if (passwordDisplay && passwordToggle) {
                    passwordToggle.addEventListener('click', () => {
                        const password = passwordToggle.dataset['password'] || '';
                        const mask = passwordToggle.dataset['mask'] || '********';
                        const isMasked = passwordDisplay.textContent === mask;
                        passwordDisplay.textContent = isMasked ? password : mask;
                        passwordToggle.classList.toggle('isax-eye');
                        passwordToggle.classList.toggle('isax-eye-slash');
                    });
                }
            }
        }).then((result) => {
            const confirmOnDismiss = data.confirmOnDismiss ?? true;
            if ((result.isConfirmed || (confirmOnDismiss && result.isDismissed)) && data.onConfirm) {
                data.onConfirm();
                return;
            }
            if (result.dismiss === Swal.DismissReason.cancel && data.onCancel) {
                data.onCancel();
            }
        });
    }

    private static buildContent(data: CredentialsModalData, isRTL: boolean): string {
        const title = data.title || (data.type === 'success'
            ? (isRTL ? 'تم بنجاح' : 'Success')
            : (isRTL ? 'خطأ' : 'Error'));
        const subtitle = data.subtitle || '';
        const credentials = data.credentials || {};
        const hasEmail = !!credentials.email;
        const hasPassword = !!credentials.password;
        const hasCredentials = hasEmail || hasPassword;

        const iconMarkup = data.type === 'success'
            ? CredentialsModalComponent.successIcon()
            : data.type === 'warning'
                ? CredentialsModalComponent.warningIcon()
                : CredentialsModalComponent.errorIcon();

        const contentClass = isRTL ? ' is-rtl' : '';
        const labelEmail = isRTL ? 'البريد الإلكتروني:' : 'Email:';
        const labelPassword = isRTL ? 'كلمة المرور:' : 'Password:';
        const note = isRTL
            ? 'يرجى الاحتفاظ بهذه البيانات في مكان آمن.'
            : 'Please keep these credentials in a safe place.';

        const emailValue = credentials.email ? CredentialsModalComponent.escapeHtml(credentials.email) : '';
        const emailValueAttr = credentials.email ? CredentialsModalComponent.escapeAttr(credentials.email) : '';
        const passwordValue = credentials.password ? CredentialsModalComponent.escapeHtml(credentials.password) : '';
        const passwordValueAttr = credentials.password ? CredentialsModalComponent.escapeAttr(credentials.password) : '';

        return `
      <div class="${contentClass}" dir="${isRTL ? 'rtl' : 'ltr'}">
        <div class="mb-4 ${data.type === 'error' ? 'is-error' : 'is-success'}">
          ${iconMarkup}
        </div>
        <h3 class="${data.type === 'warning' ? 'text-warning' : 'text-primary'} fw-bold mb-2">${CredentialsModalComponent.escapeHtml(title)}</h3>
        ${subtitle ? `<p class="mb-2">${CredentialsModalComponent.escapeHtml(subtitle)}</p>` : ''}
        ${hasCredentials ? `
          <div class="credentials-list">
            ${hasEmail ? `
              <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
                <div class="">${labelEmail}</div>
                <span class="credential-text">${emailValue}</span>
                <span class="pointer text-primary isax isax-copy js-copy" aria-label="${isRTL ? 'نسخ البريد الإلكتروني' : 'Copy email'}" data-value="${emailValueAttr}"></span>
              </div>
            ` : ''}
            ${hasPassword ? `
              <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
                <div class="">${labelPassword}</div>
                <span class="credential-text" data-role="password-display">********</span>
                  <span class="pointer text-primary isax isax-copy js-copy" aria-label="${isRTL ? 'نسخ كلمة المرور' : 'Copy password'}" data-value="${passwordValueAttr}"></span>
                  <span class="pointer text-info isax isax-eye" data-role="password-toggle" data-password="${passwordValueAttr}" data-mask="********" aria-label="${isRTL ? 'إظهار كلمة المرور' : 'Show password'}"></span>
              </div>
            ` : ''}
          </div>
          <p class="text-gray-600 fs-0_875rem mt-2">${note}</p>
        ` : ''}
      </div>
    `;
    }

    private static successIcon(): string {
        return `
      <img src="assets/images/icon/checked 1.svg" alt="Success" />
    `;
    }

    private static warningIcon(): string {
        return `
      <img src="assets/images/icon/warning.svg" alt="Warning" />
    `;
    }

    private static errorIcon(): string {
        return `
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <circle cx="60" cy="60" r="54"></circle>
        <path d="M41 41l38 38m0-38L41 79" stroke-width="10" stroke-linecap="round"></path>
      </svg>
    `;
    }

    private static showToast(isRTL: boolean): void {
        const existing = document.getElementById('credentials-copy-toast');
        if (existing) {
            existing.remove();
        }

        const toast = document.createElement('div');
        toast.id = 'credentials-copy-toast';
        toast.textContent = isRTL ? 'تم النسخ' : 'Copied';
        toast.setAttribute('role', 'status');
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.zIndex = '10000';
        toast.style.background = '#2BA18C';
        toast.style.color = '#fff';
        toast.style.padding = '10px 16px';
        toast.style.borderRadius = '10px';
        toast.style.fontSize = '14px';
        toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
        toast.style.pointerEvents = 'none';

        document.body.appendChild(toast);

        window.setTimeout(() => {
            toast.remove();
        }, 2000);
    }

    private static escapeHtml(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    private static escapeAttr(value: string): string {
        return CredentialsModalComponent.escapeHtml(value).replace(/`/g, '&#96;');
    }
}

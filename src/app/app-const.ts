import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const EIDDESIGN = false;

// Global translate service holder
let globalTranslateService: TranslateService | null = null;

export function setGlobalTranslateService(translate: TranslateService) {
  globalTranslateService = translate;
}

function getTranslateService(): TranslateService | null {
  return globalTranslateService;
}

const looksLikeTranslationKey = (value: string): boolean => {
  return /^[A-Z0-9_]+(?:\.[A-Z0-9_]+)+$/.test(value);
};

export const translateAlertText = (
  value?: string | null,
  params?: Record<string, unknown>
): string => {
  if (!value) {
    return '';
  }

  const translate = getTranslateService();
  if (!translate) {
    return value;
  }

  if (!looksLikeTranslationKey(value)) {
    return value;
  }

  const translated = translate.instant(value, params);
  return translated && translated !== value ? translated : value;
};


export const projectName = {
  en: 'Vult - Academies Management System',
  ar: 'ڤولت - نظام إدارة الأكاديميات'
};

export const goBackFn = (relativeUrl?: string) => {
  window.history.back();
}

export const ROLES = {
  Parent: 0,
  Player: 1,
  Trainer: 2,
  AcademyAdmin: 3,
  CustomRole: 4,
  Talent: 5,
  BranchManager: 6,
  MasterAcademy: 7
}

/** Any of these grants access to Activities → Deductions tab (and /activities route). */
export const logo = {
  light: '/assets/images/logo.svg',
  dark: '/assets/images/logo.svg',
  light_sm: '/assets/images/logo.svg',
  dark_sm: '/assets/images/logo.svg',
}



export const GetTimeInString = (timeInMinutes: number): string => {
  if (timeInMinutes < 0) {
    return "0 دقيقة";
  }

  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  let hoursString = '';
  let minutesString = '';

  // Handle hours string
  if (hours > 0) {
    if (hours === 1) {
      hoursString = 'ساعة واحدة';
    } else if (hours === 2) {
      hoursString = 'ساعتان';
    } else if (hours <= 10) {
      hoursString = `${hours} ساعات`;
    } else {
      hoursString = `${hours} ساعة`;
    }
  }

  // Handle minutes string
  if (minutes > 0) {
    if (minutes === 1) {
      minutesString = 'دقيقة واحدة';
    } else if (minutes === 2) {
      minutesString = 'دقيقتان';
    } else if (minutes <= 10) {
      minutesString = `${minutes} دقائق`;
    } else {
      minutesString = `${minutes} دقيقة`;
    }
  }

  // Combine hours and minutes
  if (hours > 0 && minutes > 0) {
    return `${hoursString} و ${minutesString}`;
  } else if (hours > 0) {
    return hoursString;
  } else if (minutes > 0) {
    return minutesString;
  } else {
    return '٠ دقيقة';
  }
};


export function downloadData(data: BlobPart, contentDispositionHeader: string, contentType: string | null) {
  if (data && contentDispositionHeader && contentType) {
    const filenameRegex = /filename\*=UTF-8''([^;]+)/;
    const matches = filenameRegex.exec(contentDispositionHeader);

    let filename = 'download.zip';
    if (matches !== null && matches[1]) {
      filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
    }

    const blob = new Blob([data], { type: contentType || 'application/zip', endings: 'transparent' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    // clean up the URL and link element
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
}

export function isSafeCoordinate(number: unknown): number | undefined {
  return number != '' && number != null && number != undefined ? +number : undefined
}




const extractAllValidationErrors = (payload: any): string[] => {
  if (!payload || typeof payload !== 'object') return [];

  const errors = payload?.errors;
  if (!errors) return [];

  // errors is a plain array: ['message1', 'message2']
  if (Array.isArray(errors)) {
    return errors.filter((e: any) => e != null && e !== '').map(String);
  }

  // errors is an object: { field: ['msg'] } or { field: 'msg' }
  if (typeof errors === 'object') {
    const all: string[] = [];
    for (const key of Object.keys(errors)) {
      const val = errors[key];
      if (Array.isArray(val)) {
        all.push(...val.filter((e: any) => e != null && e !== '').map(String));
      } else if (typeof val === 'string' && val.trim() !== '') {
        all.push(val);
      }
    }
    return all;
  }

  return [];
};

let sessionEndedDialogShown = false;
let sessionReloadStarted = false;

export function isSessionReplacedError(err: any): boolean {
  const payload = err?.error ?? err;
  const errorCode = payload?.error_code ?? payload?.errorCode ?? err?.errorCode;

  return errorCode === 'SESSION_REPLACED';
}

function clearStoredAuthState(): void {
  localStorage.removeItem('vultToken');
  sessionStorage.removeItem('vultToken');
  localStorage.removeItem('impersonated_branch_id');
  localStorage.removeItem('impersonated_main_academy_id');
}

function reloadToLogin(): void {
  if (sessionReloadStarted) {
    return;
  }
  sessionReloadStarted = true;
  clearStoredAuthState();
  window.location.href = '/account/login';
}

function promptAuthReload(options: {
  titleKey: string;
  messageKey: string;
  fallbackTitle: string;
  fallbackMessage: string;
}): void {
  if (sessionEndedDialogShown) {
    return;
  }
  sessionEndedDialogShown = true;

  const translate = getTranslateService();
  const title = translate?.instant(options.titleKey) || options.fallbackTitle;
  const text = translate?.instant(options.messageKey) || options.fallbackMessage;
  const confirmText = translate?.instant('SWAL.RELOAD_PAGE') || 'إعادة التحميل';

  Swal.fire({
    icon: 'warning',
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonColor: '#2BA18Cff',
    confirmButtonText: confirmText,
    timer: 12000,
    timerProgressBar: true,
  }).then(() => {
    reloadToLogin();
  });
}

export function promptSessionEndedAndReload(): void {
  promptAuthReload({
    titleKey: 'SWAL.SESSION_ENDED_TITLE',
    messageKey: 'SWAL.SESSION_ENDED_MESSAGE',
    fallbackTitle: 'انتهت الجلسة',
    fallbackMessage: 'تم تسجيل الدخول إلى هذا الحساب من جهاز أو متصفح آخر. سيتم إعادة تحميل الصفحة.',
  });
}

export function promptSessionExpiredAndReload(): void {
  promptAuthReload({
    titleKey: 'SWAL.SESSION_EXPIRED_TITLE',
    messageKey: 'SWAL.SESSION_EXPIRED_MESSAGE',
    fallbackTitle: 'انتهت الجلسة',
    fallbackMessage: 'انتهت صلاحية جلسة العمل. سيتم إعادة توجيهك إلى صفحة تسجيل الدخول.',
  });
}

export const errorCallback = (err: any) => {
  // Skip when the interceptor already showed the dialog
  if (!err || err?.errorCode === 'NO-ERROR' || err?.errorCode === 'SESSION_REPLACED' || err?.errorCode === 'SESSION_EXPIRED') return;

  const hasStoredToken = (() => {
    try {
      return !!(
        JSON.parse(localStorage.getItem('vultToken') || 'null') ||
        JSON.parse(sessionStorage.getItem('vultToken') || 'null')
      );
    } catch {
      return false;
    }
  })();

  if (err?.status === 0 && hasStoredToken && String(err?.url || '').toLowerCase().includes('/api/')) {
    return;
  }

  // Plain string error code (legacy session/permission codes from the interceptor)
  if (typeof err === 'string') {
    if (err === 'SessionEnded') {
      promptSessionEndedAndReload();
      return;
    }
    if (err === 'AccessDenied') {
      SWAL('error', err);
      return;
    }
    SWAL('error', err);
    return;
  }

  const allErrors = [
    ...extractAllValidationErrors(err),
    ...extractAllValidationErrors(err?.error),
  ].filter((v, i, a) => a.indexOf(v) === i); // deduplicate

  const translate = getTranslateService();
  const fallback = translateAlertText('SWAL.ERROR_OCCURRED') || 'حدث خطأ';

  const formatError = (value: string): string => {
    const dynamicMessage = translateDynamicBackendError(value, translate);
    return dynamicMessage || translateAlertText(value);
  };

  if (allErrors.length > 1) {
    const okText = translate?.instant('SWAL.OK') || 'حسنًا';
    const errorTitle = translate?.instant('SWAL.ERROR_OCCURRED') || 'حدث خطأ';
    const html = allErrors.map(e => `<p style="margin:4px 0">${formatError(e)}</p>`).join('');
    Swal.fire({
      icon: 'error',
      title: errorTitle,
      html,
      confirmButtonColor: '#2BA18Cff',
      confirmButtonText: okText,
    });
  } else {
    const singleError = formatError(allErrors[0]);
    SWAL(
      'error',
      singleError || (err?.error?.message ?? err?.message ?? fallback)
    );
  }
}

function translateDynamicBackendError(value: string, translate?: TranslateService | null): string | null {
  if (!translate || !value) {
    return null;
  }

  const sessionsMatch = value.match(/^Maximum allowed additional sessions is\s+(\d+)\.?$/i);
  if (sessionsMatch) {
    return translate.instant('ERROR_CODES.MAX_ALLOWED_ADDITIONAL_SESSIONS', { count: sessionsMatch[1] });
  }

  const maxFieldMatch = value.match(/^The\s+(.+?)\s+field\s+must\s+not\s+be\s+greater\s+than\s+([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\.?$/i);
  if (maxFieldMatch) {
    return translate.instant('ERROR_CODES.FIELD_MUST_NOT_BE_GREATER_THAN', {
      field: localizeBackendFieldName(maxFieldMatch[1], translate),
      max: normalizeScientificNumber(maxFieldMatch[2]),
    });
  }

  const paymentMatch = value.match(/^Payment amount \(([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\) exceeds remaining balance \(([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\)\.?$/i);
  if (paymentMatch) {
    return translate.instant('ERROR_CODES.PAYMENT_AMOUNT_EXCEEDS_REMAINING_BALANCE', {
      amount: normalizeScientificNumber(paymentMatch[1]),
      remaining: normalizeScientificNumber(paymentMatch[2]),
    });
  }

  const packageLinkedMatch = value.match(/^Package\s+\d+\s+is already linked to another active deduction\.?$/i);
  if (packageLinkedMatch) {
    return translate.instant('ERROR_CODES.PACKAGE_ALREADY_LINKED_TO_ACTIVE_DEDUCTION');
  }

  if (/^Inactive deduction is not accessible\.?$/i.test(value)) {
    return translate.instant('DEDUCTIONS.MESSAGES.INACTIVE_NOT_ACCESSIBLE');
  }

  return null;
}

function localizeBackendFieldName(fieldName: string, translate: TranslateService): string {
  const normalizedField = fieldName.trim().replace(/\s+/g, '_').toUpperCase();
  const fallback = fieldName.trim();

  const translated = translate.instant(normalizedField);
  return translated && translated !== normalizedField ? translated : fallback;
}

function normalizeScientificNumber(value: string): string {
  if (!/[eE]/.test(value)) {
    return value;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return value;
  }

  return parsed.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits: 20,
  });
}

export const ShowTOAST = (type: SweetAlertIcon, title: string, text?: string
  , confirmCallback?: Function,
  options?: SweetAlertOptions): Promise<SweetAlertResult<any>> | null => {

  return ShowSWAL(type, title, text, confirmCallback, { ...options, toast: true, position: 'top', timer: options?.timer || 2000, timerProgressBar: false });
}

export const ShowSWAL = (type: SweetAlertIcon, title: string, text?: string
  , confirmCallback?: Function,
  options?: SweetAlertOptions): Promise<SweetAlertResult<any>> | null => {

  const translate = getTranslateService();
  const closeText = translate?.instant('SWAL.CLOSE') || 'إغلاق';
  const errorText = translate?.instant('SWAL.ERROR_OCCURRED') || 'حدث خطأ';

  // Auto-translate title if it looks like a translation key
  const translatedTitle = translateAlertText(title);

  // Auto-translate text if it looks like a translation key
  const translatedText = translateAlertText(text);

  if (type === 'error') {
    return Swal.fire({
      icon: type,
      titleText: translatedTitle || errorText,
      text: translatedText,
      showConfirmButton: false,
      cancelButtonText: closeText,
      ...options,
    })
  } else if (type === 'success') {
    return Swal.fire({
      icon: type,
      titleText: translatedTitle || '',
      text: translatedText,
      showConfirmButton: false,
      cancelButtonText: closeText,
      ...options,
    })
  } else {
    return Swal.fire({
      icon: type,
      titleText: translatedTitle || '',
      text: translatedText,
      showConfirmButton: false,
      cancelButtonText: closeText,
      ...options,
    })
  }
}
export const SWAL = (type: SweetAlertIcon, title: string, text?: string
  , confirmCallback?: Function,
  options?: SweetAlertOptions): Promise<SweetAlertResult<any>> | null => {
  if (title === 'NO-ERROR') {
    return null;
  }

  const translate = getTranslateService();
  let errmsg = title || '';
  if (translate && title) {
    const allTranslations = (translate as any).translations?.[translate.currentLang]
      ?? (translate as any).translations?.[translate.defaultLang];
    const fromErrorCodes = allTranslations?.ERROR_CODES?.[title];
    if (fromErrorCodes) {
      errmsg = fromErrorCodes;
    } else {
      errmsg = translateAlertText(title);
      if (errmsg === title && !looksLikeTranslationKey(title)) {
        const translatedError = translate.instant('ERROR_CODES.' + title);
        if (translatedError && translatedError !== 'ERROR_CODES.' + title) {
          errmsg = translatedError;
        }
      }
    }
  } else if (title) {
    errmsg = title;
  }

  // Auto-translate text if it looks like a translation key
  const translatedText = translateAlertText(text);

  const errorText = translate?.instant('SWAL.ERROR_OCCURRED') || 'حدث خطأ';
  const okText = translate?.instant('SWAL.OK') || 'حسنًا';
  const cancelText = translate?.instant('SWAL.CANCEL') || 'إلغاء';

  return Swal.fire({
    icon: type,
    titleText: errmsg || (type === 'error' ? errorText : ''),
    text: translatedText,
    confirmButtonColor: '#2BA18Cff',
    confirmButtonText: okText,
    cancelButtonText: cancelText,
    ...options,

  })
}
export const SWALConfirmation = (
  type: SweetAlertIcon,
  title?: string,
  callableFunction?: Observable<any>,
  resultText?: string,
  actionText?: string,
  text?: string

): Promise<SweetAlertResult<any>> => {

  const translate = getTranslateService();
  const yesText = translate?.instant('SWAL.YES') || 'نعـم';
  const cancelText = translate?.instant('SWAL.CANCEL') || 'إلــغاء';
  const executedText = translate?.instant('SWAL.EXECUTED') || 'تم التنفيذ';

  // Translate title
  const translatedTitle = translateAlertText(title);

  // Translate text
  const translatedText = translateAlertText(text);

  // Translate action button text
  const translatedActionText = translateAlertText(actionText);

  // Translate result text
  const translatedResultText = translateAlertText(resultText);

  return Swal.fire({
    title: translatedTitle,
    icon: type,
    text: translatedText,
    showCancelButton: true,
    confirmButtonText: translatedActionText || yesText,
    cancelButtonText: cancelText,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#39cf63',
    preConfirm: isConfirmed => {
      // eslint-disable-next-line no-unused-vars
      return new Promise<boolean>((resolve, reject) => {
        if (isConfirmed) {
          callableFunction?.subscribe({
            next: (res) => {
              SWAL('success', translatedResultText || executedText);
              resolve(true)
            },
            error: (res) => {
              const allErrors = [
                ...extractAllValidationErrors(res),
                ...extractAllValidationErrors(res?.error),
              ].filter((v, i, a) => a.indexOf(v) === i);

              if (allErrors.length > 1) {
                const tr = getTranslateService();
                const okText = tr?.instant('SWAL.OK') || 'حسنًا';
                const errorTitle = tr?.instant('SWAL.ERROR_OCCURRED') || 'حدث خطأ';
                const html = allErrors.map(e => `<p style="margin:4px 0">${translateAlertText(e)}</p>`).join('');
                Swal.fire({ icon: 'error', title: errorTitle, html, confirmButtonColor: '#2BA18Cff', confirmButtonText: okText });
              } else {
                const singleError = translateAlertText(allErrors[0]);
                SWAL(
                  'error',
                  singleError || (res?.error?.message ?? res?.message ?? res?.errorCode ?? 'حدث خطأ')
                );
              }
              resolve(false)
            }
          })
        }
      });
    },
    allowOutsideClick: true
  })

}


export function SWAL_Celebrate(title?: string | null, text?: string | null, iconHtml?: string | null, backdrop?: string | null, confirmButtonText?: string) {
  const translate = getTranslateService();
  const congratsText = translate?.instant('SWAL.CONGRATULATIONS') || 'مبروووك';
  const okText = translate?.instant('SWAL.OK') || 'حسنًا';

  return Swal.fire({
    title: translateAlertText(title) || congratsText,
    text: translateAlertText(text) || "",
    icon: 'success',
    iconHtml: iconHtml || '<img height="100" src="/assets/images/prize_1.png"/>',
    backdrop: backdrop || `
    rgba(0,0,0,0.2)
    url("/assets/images/celebration.gif")
    center top
    repeat
  `,
    confirmButtonText: translateAlertText(confirmButtonText) || okText
  });
}


export const userNamePattern = '^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
export const numberMoreThanZeroPattern = /^[1-9]\d*(\.\d+)?$/
export const mustNumberPattern = /^-?\d*(\.\d+)?$/

/**
 * Validator that rejects strings containing only whitespace characters.
 * Use alongside Validators.required on text form controls.
 */
export const noWhitespaceValidator = (control: import('@angular/forms').AbstractControl): import('@angular/forms').ValidationErrors | null => {
  const value = control.value;
  if (typeof value === 'string' && value.length > 0 && value.trim().length === 0) {
    return { whitespace: true };
  }
  return null;
};

/**
 * Validator that only allows whole positive integers (1, 2, 3, ...).
 * Rejects decimals, negatives, zero, text, special characters and mixed values.
 * Skips empty values so it can be combined with Validators.required.
 */
export const wholePositiveNumberValidator = (control: import('@angular/forms').AbstractControl): import('@angular/forms').ValidationErrors | null => {
  const value = control.value;
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return /^[1-9]\d*$/.test(String(value).trim()) ? null : { wholePositiveNumber: true };
};

export const copyToClipboard = (text: string): void => {
  const translate = getTranslateService();
  const copiedText = translate?.instant('SWAL.COPIED') || 'تم النسخ';
  const copyFailedText = translate?.instant('SWAL.COPY_FAILED') || 'فشل النسخ';

  if (!text) return;

  // Use modern clipboard API when available (requires HTTPS)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      ShowTOAST('success', copiedText);
    }).catch(() => {
      fallbackCopyToClipboard(text, copiedText, copyFailedText);
    });
  } else {
    // Fallback for non-secure contexts or older browsers
    fallbackCopyToClipboard(text, copiedText, copyFailedText);
  }
};

function fallbackCopyToClipboard(text: string, successText: string, errorText: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      ShowTOAST('success', successText);
    } else {
      ShowTOAST('error', errorText);
    }
  } catch (err) {
    ShowTOAST('error', errorText);
  }

  document.body.removeChild(textarea);
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

/**
 * Export data to Excel file with customizable columns and formatting
 * @param data - Array of data objects to export
 * @param columns - Array of column configurations { header: string, key: string, width?: number }
 * @param options - Export options { fileName?: string, sheetName?: string, button?: HTMLElement }
 */
export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
  formatter?: (value: any) => string;
}

export interface ExportOptions {
  fileName?: string;
  sheetName?: string;
  button?: HTMLElement;
}

export function exportToExcel(
  data: any[],
  columns: ExportColumn[],
  options: ExportOptions = {}
): void {
  const translate = getTranslateService();
  const noDataText = translate?.instant('EXPORT.NO_DATA') || 'لا يوجد بيانات للتصدير';
  const loadingText = translate?.instant('EXPORT.LOADING') || 'جاري التحميل...';
  const errorText = translate?.instant('EXPORT.ERROR') || 'حدث خطأ أثناء التصدير';
  const successText = translate?.instant('EXPORT.SUCCESS') || 'تم التصدير بنجاح';

  // Validate data
  if (!data || data.length === 0) {
    SWAL('warning', noDataText);
    return;
  }

  // Store button state if provided
  let originalButtonText = '';
  let originalButtonDisabled = false;

  if (options.button) {
    originalButtonText = options.button.innerHTML;
    originalButtonDisabled = options.button.hasAttribute('disabled');
    options.button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${loadingText}`;
    options.button.setAttribute('disabled', 'true');
  }

  try {
    // Prepare data for Excel export
    const exportData = data.map((item: any) => {
      const row: any = {};
      columns.forEach(col => {
        const value = item[col.key];
        row[col.header] = col.formatter ? col.formatter(value) : (value ?? '-');
      });
      return row;
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    if (columns.some(col => col.width)) {
      const columnWidths = columns.map(col => ({ wch: col.width || 15 }));
      worksheet['!cols'] = columnWidths;
    }

    // Create workbook
    const workbook = XLSX.utils.book_new();
    const sheetName = options.sheetName || 'Sheet1';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate filename with current date
    let fileName = options.fileName;
    if (!fileName) {
      const currentDate = new Date();
      const dateStr = currentDate.getFullYear() +
        String(currentDate.getMonth() + 1).padStart(2, '0') +
        String(currentDate.getDate()).padStart(2, '0');
      fileName = `export_${dateStr}.xlsx`;
    } else if (!fileName.endsWith('.xlsx')) {
      fileName += '.xlsx';
    }

    // Write and download file
    XLSX.writeFile(workbook, fileName);

    ShowTOAST('success', successText);
    console.log('تم تصدير البيانات بنجاح');

  } catch (error) {
    SWAL('error', errorText);
  } finally {
    // Restore button state
    if (options.button) {
      options.button.innerHTML = originalButtonText;
      if (!originalButtonDisabled) {
        options.button.removeAttribute('disabled');
      }
    }
  }
}

/**
 * Export options for PDF
 */
export interface ExportToPdfOptions {
  fileName?: string;
  button?: HTMLElement;
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'letter';
}

/**
 * Export HTML element to PDF file
 * @param elementId - ID of the HTML element to export
 * @param options - Export options { fileName?: string, button?: HTMLElement, orientation?: 'portrait' | 'landscape', format?: 'a4' | 'letter' }
 * 
 * Usage Example:
 * ```typescript
 * await exportToPDF('invoice-area', {
 *   fileName: 'invoice-12345',
 *   orientation: 'portrait'
 * });
 * ```
 */
export async function exportToPDF(
  elementId: string,
  options: ExportToPdfOptions = {}
): Promise<void> {
  const translate = getTranslateService();
  const loadingText = translate?.instant('EXPORT.PDF_LOADING') || 'جاري تصدير PDF...';
  const errorText = translate?.instant('EXPORT.PDF_ERROR') || 'حدث خطأ أثناء التصدير';
  const successText = translate?.instant('EXPORT.PDF_SUCCESS') || 'تم تصدير PDF بنجاح';
  const notFoundText = translate?.instant('EXPORT.ELEMENT_NOT_FOUND') || 'العنصر المطلوب غير موجود';

  const element = document.getElementById(elementId);
  if (!element) {
    SWAL('error', notFoundText);
    return;
  }

  // Store button state if provided
  let originalButtonText = '';
  let originalButtonDisabled = false;

  if (options.button) {
    originalButtonText = options.button.innerHTML;
    originalButtonDisabled = options.button.hasAttribute('disabled');
    options.button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${loadingText}`;
    options.button.setAttribute('disabled', 'true');
  }

  try {
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    // Calculate PDF dimensions
    const orientation = options.orientation || 'portrait';
    const format = options.format || 'a4';
    const imgWidth = orientation === 'portrait' ? 210 : 297; // A4 width in mm
    const pageHeight = orientation === 'portrait' ? 297 : 210; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF(orientation, 'mm', format);
    const imgData = canvas.toDataURL('image/png');

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename
    let fileName = options.fileName;
    if (!fileName) {
      const currentDate = new Date();
      const dateStr = currentDate.getFullYear() +
        String(currentDate.getMonth() + 1).padStart(2, '0') +
        String(currentDate.getDate()).padStart(2, '0');
      fileName = `export_${dateStr}.pdf`;
    } else if (!fileName.endsWith('.pdf')) {
      fileName += '.pdf';
    }

    // Save PDF
    pdf.save(fileName);

    ShowTOAST('success', successText);
    console.log('تم تصدير PDF بنجاح');

  } catch (error) {
    console.error('Error exporting PDF:', error);
    SWAL('error', errorText);
  } finally {
    // Restore button state
    if (options.button) {
      options.button.innerHTML = originalButtonText;
      if (!originalButtonDisabled) {
        options.button.removeAttribute('disabled');
      }
    }
  }
}

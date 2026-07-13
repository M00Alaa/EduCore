import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';

export const EIDDESIGN = false;

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

export const logo = {
  light: '/assets/images/logo.png',
  dark: '/assets/images/logo.png',
  light_sm: '/assets/images/logo.png',
  dark_sm: '/assets/images/logo.png',
}

const extractAllValidationErrors = (payload: any): string[] => {
  if (!payload || typeof payload !== 'object') return [];

  const errors = payload?.errors;
  if (!errors) return [];

  if (Array.isArray(errors)) {
    return errors.filter((e: any) => e != null && e !== '').map(String);
  }

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

function clearStoredAuthState(): void {
  localStorage.removeItem('eduToken');
  sessionStorage.removeItem('eduToken');
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

function promptSessionEndedAndReload(): void {
  promptAuthReload({
    titleKey: 'SWAL.SESSION_ENDED_TITLE',
    messageKey: 'SWAL.SESSION_ENDED_MESSAGE',
    fallbackTitle: 'انتهت الجلسة',
    fallbackMessage: 'تم تسجيل الدخول إلى هذا الحساب من جهاز أو متصفح آخر. سيتم إعادة تحميل الصفحة.',
  });
}

export const errorCallback = (err: any) => {
  if (!err || err?.errorCode === 'NO-ERROR' || err?.errorCode === 'SESSION_REPLACED' || err?.errorCode === 'SESSION_EXPIRED') return;

  const hasStoredToken = (() => {
    try {
      return !!(
        JSON.parse(localStorage.getItem('eduToken') || 'null') ||
        JSON.parse(sessionStorage.getItem('eduToken') || 'null')
      );
    } catch {
      return false;
    }
  })();

  if (err?.status === 0 && hasStoredToken && String(err?.url || '').toLowerCase().includes('/api/')) {
    return;
  }

  if (typeof err === 'string') {
    if (err === 'SessionEnded') {
      promptSessionEndedAndReload();
      return;
    }
    SWAL('error', err);
    return;
  }

  const allErrors = [
    ...extractAllValidationErrors(err),
    ...extractAllValidationErrors(err?.error),
  ].filter((v, i, a) => a.indexOf(v) === i);

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

  const translatedTitle = translateAlertText(title);
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

  const translatedTitle = translateAlertText(title);
  const translatedText = translateAlertText(text);
  const translatedActionText = translateAlertText(actionText);
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

  if (!data || data.length === 0) {
    SWAL('warning', noDataText);
    return;
  }

  let originalButtonText = '';
  let originalButtonDisabled = false;

  if (options.button) {
    originalButtonText = options.button.innerHTML;
    originalButtonDisabled = options.button.hasAttribute('disabled');
    options.button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${loadingText}`;
    options.button.setAttribute('disabled', 'true');
  }

  try {
    const exportData = data.map((item: any) => {
      const row: any = {};
      columns.forEach(col => {
        const value = item[col.key];
        row[col.header] = col.formatter ? col.formatter(value) : (value ?? '-');
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    if (columns.some(col => col.width)) {
      const columnWidths = columns.map(col => ({ wch: col.width || 15 }));
      worksheet['!cols'] = columnWidths;
    }

    const workbook = XLSX.utils.book_new();
    const sheetName = options.sheetName || 'Sheet1';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

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

    XLSX.writeFile(workbook, fileName);

    ShowTOAST('success', successText);

  } catch (error) {
    SWAL('error', errorText);
  } finally {
    if (options.button) {
      options.button.innerHTML = originalButtonText;
      if (!originalButtonDisabled) {
        options.button.removeAttribute('disabled');
      }
    }
  }
}

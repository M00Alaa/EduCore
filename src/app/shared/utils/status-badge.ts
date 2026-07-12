export type StatusBadgeOptions = {
  defaultClass?: string;
  inactiveClass?: string;
};

const normalizeStatus = (value?: string | null): string =>
  String(value || '')
    .toLowerCase()
    .trim();

export const getStatusBadgeClass = (
  value?: string | null,
  options: StatusBadgeOptions = {}
): string => {
  const status = normalizeStatus(value);
  const defaultClass = options.defaultClass || 'badge-soft-primary';
  const inactiveClass = options.inactiveClass || 'badge-soft-danger';

  if (!status) {
    return defaultClass;
  }

  if (
    status.includes('active') ||
    status.includes('paid') ||
    status.includes('success') ||
    status.includes('completed') ||
    status.includes('approved') ||
    status.includes('تم') ||
    status.includes('ناجح') ||
    status.includes('مدفوع') ||
    status.includes('نشط')
  ) {
    return 'badge-soft-primary';
  }

  if (
    status.includes('pending') ||
    status.includes('processing') ||
    status.includes('قيد') ||
    status.includes('معلق')
  ) {
    return 'badge-soft-warning';
  }

  if (
    status.includes('inactive') ||
    status.includes('expired') ||
    status.includes('unpaid') ||
    status.includes('غير') ||
    status.includes('منتهي') ||
    status.includes('غير نشط')
  ) {
    return inactiveClass;
  }

  if (
    status.includes('cancel') ||
    status.includes('canceled') ||
    status.includes('cancelled') ||
    status.includes('rejected') ||
    status.includes('failed') ||
    status.includes('declined') ||
    status.includes('ملغي') ||
    status.includes('مرفوض') ||
    status.includes('فشل')
  ) {
    return 'badge-soft-danger';
  }

  return defaultClass;
};

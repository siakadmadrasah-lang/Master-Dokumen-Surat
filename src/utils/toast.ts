export interface ToastItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

const TOAST_EVENT_NAME = 'automadrasah-toast';

export function showToast(
  title: string,
  message?: string,
  type: 'success' | 'info' | 'warning' | 'error' = 'success',
  duration = 3500
) {
  const toast: ToastItem = {
    id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    type,
    title,
    message,
    duration,
  };

  if (typeof window !== 'undefined') {
    const event = new CustomEvent(TOAST_EVENT_NAME, { detail: toast });
    window.dispatchEvent(event);
  }

  return toast;
}

export function notifySuccess(title: string = 'Penyimpanan Berhasil!', message?: string) {
  return showToast(title, message, 'success');
}

export function notifyError(title: string = 'Gagal Menyimpan', message?: string) {
  return showToast(title, message, 'error', 4500);
}

export function notifyInfo(title: string, message?: string) {
  return showToast(title, message, 'info');
}

export { TOAST_EVENT_NAME };

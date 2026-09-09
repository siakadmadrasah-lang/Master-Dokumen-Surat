import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';
import { ToastItem, TOAST_EVENT_NAME } from '../utils/toast';

export const ToastNotificationContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastItem>;
      if (customEvent.detail) {
        const newToast = customEvent.detail;
        setToasts((prev) => [...prev, newToast]);

        // Auto dismiss
        const timer = setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, newToast.duration || 3500);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener(TOAST_EVENT_NAME, handleToastEvent);
    return () => {
      window.removeEventListener(TOAST_EVENT_NAME, handleToastEvent);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      id="global-toast-container"
      aria-live="polite"
      className="fixed top-4 sm:top-6 right-3 sm:right-6 z-[99999] flex flex-col space-y-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-2 sm:px-0"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            role="alert"
            className={`pointer-events-auto w-full p-4 rounded-2xl shadow-2xl border transition-all duration-300 transform translate-y-0 flex items-start space-x-3 backdrop-blur-md ${
              isSuccess
                ? 'bg-emerald-950/95 text-white border-emerald-500/60 shadow-emerald-950/40 ring-1 ring-emerald-400/30'
                : isError
                ? 'bg-rose-950/95 text-white border-rose-500/60 shadow-rose-950/40 ring-1 ring-rose-400/30'
                : 'bg-slate-900/95 text-white border-slate-700/60 shadow-slate-950/40'
            }`}
          >
            {/* Animated Icon Badge */}
            <div
              className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                isSuccess
                  ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 animate-pulse'
                  : isError
                  ? 'bg-rose-600/30 text-rose-400 border border-rose-500/40'
                  : 'bg-sky-600/30 text-sky-400 border border-sky-500/40'
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center space-x-1.5">
                <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>{toast.title}</span>
                  {isSuccess && <Sparkles className="w-3.5 h-3.5 text-amber-300 inline" />}
                </h4>
              </div>
              {toast.message && (
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {toast.message}
                </p>
              )}
              <div className="mt-2 flex items-center space-x-2">
                <span className="inline-flex items-center text-[10px] font-semibold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
                  Status: Berhasil Tersimpan
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

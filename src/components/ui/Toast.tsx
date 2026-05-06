import type { Toast } from "../../types/toast";

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const toastStyle: Record<Toast["type"], string> = {
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200",
  warning:
    "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200",
};

export function Toast({ toast, onClose }: ToastProps) {
  return (
    <div
      className={`w-80 rounded-xl border p-4 shadow-lg transition ${toastStyle[toast.type]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{toast.title}</p>

          {toast.message ? (
            <p className="mt-1 text-sm opacity-80">{toast.message}</p>
          ) : null}
        </div>

        <button
          type="button"
          className="text-sm opacity-60 transition hover:opacity-100"
          onClick={() => onClose(toast.id)}
          aria-label="Close notification">
          ×
        </button>
      </div>
    </div>
  );
}

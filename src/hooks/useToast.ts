import { useCallback, useState } from "react";
import type { Toast, ToastType } from "../types/toast";

interface ShowToastInput {
  type?: ToastType;
  title: string;
  message?: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type = "info", title, message }: ShowToastInput) => {
      const id = crypto.randomUUID();

      const nextToast: Toast = {
        id,
        type,
        title,
        message,
      };

      setToasts((prevToasts) => [nextToast, ...prevToasts]);

      window.setTimeout(() => {
        removeToast(id);
      }, 3000);
    },
    [removeToast],
  );

  return {
    toasts,
    showToast,
    removeToast,
  };
}

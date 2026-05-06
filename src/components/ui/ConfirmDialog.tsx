import { Button } from "./Button";

export interface ConfirmDialogProps {
  confirmLabel?: string;
  description: string;
  isOpen: boolean;
  isDanger?: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
}

export function ConfirmDialog({
  confirmLabel = "Confirm",
  description,
  isOpen,
  isDanger = false,
  onCancel,
  onConfirm,
  title,
}: ConfirmDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="modal-overlay-enter fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 px-4 py-4 dark:bg-slate-950/70 sm:items-center sm:py-6"
      role="dialog"
    >
      <div className="modal-panel-enter w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div className="mt-5 grid gap-2 sm:flex sm:flex-row sm:justify-end">
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button
            className={isDanger ? "bg-rose-600 hover:bg-rose-700" : ""}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

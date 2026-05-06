import type { ReactNode } from "react";

export interface EmptyStateProps {
  action?: ReactNode;
  title: string;
  description?: string;
}

export function EmptyState({ action, title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition-colors dark:border-slate-700 dark:bg-slate-950">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500">
        0
      </div>
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{title}</p>
      {description ? (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

import type { ReactNode } from "react";

export type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info" | "purple";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
  danger:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300",
  info: "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-300",
  purple:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300",
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}

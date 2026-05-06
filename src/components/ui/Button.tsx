import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md active:translate-y-0 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white",
  secondary:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:translate-y-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:active:bg-slate-700",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition duration-200 motion-reduce:transform-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

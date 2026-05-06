import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 ${className}`}
    >
      {children}
    </section>
  );
}

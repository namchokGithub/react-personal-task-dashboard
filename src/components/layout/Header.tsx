import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 transition-colors dark:border-slate-800 dark:bg-slate-900 sm:px-6 md:px-8">
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Personal Task Dashboard
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-normal text-slate-950 dark:text-slate-50 sm:text-2xl">
              Manage today with a clear view
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

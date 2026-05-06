import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Tasks", to: "/tasks" },
  { label: "Backlog", to: "/backlog" },
  { label: "Settings", to: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 py-3 transition-colors dark:border-slate-800 dark:bg-slate-900 sm:px-6 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-5 md:py-4">
      <div className="mb-3 md:mb-8">
        <p className="text-lg font-semibold text-slate-950 dark:text-slate-50">Task Dashboard</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Personal workspace</p>
      </div>

      <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition md:w-full ${
                isActive
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              }`
            }
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

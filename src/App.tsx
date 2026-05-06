import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { BacklogPage } from "./pages/BacklogPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TasksPage } from "./pages/TasksPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route element={<DashboardPage />} path="/dashboard" />
        <Route element={<TasksPage />} path="/tasks" />
        <Route element={<BacklogPage />} path="/backlog" />
        <Route element={<SettingsPage />} path="/settings" />
        <Route element={<Navigate replace to="/dashboard" />} path="*" />
      </Route>
    </Routes>
  );
}

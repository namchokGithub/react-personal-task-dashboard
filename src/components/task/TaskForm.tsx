import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import type { Task, TaskFormValues, TaskPriority, TaskStatus } from "../../types/task";

export interface TaskFormProps {
  initialTask?: Task;
  onCancel: () => void;
  onSubmit: (values: TaskFormValues) => void;
}

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

interface SelectOption<TValue extends string> {
  label: string;
  value: TValue;
}

const statusOptions: Array<SelectOption<TaskStatus>> = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const priorityOptions: Array<SelectOption<TaskPriority>> = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

function getInitialValues(initialTask?: Task): TaskFormValues {
  if (!initialTask) {
    return defaultValues;
  }

  return {
    title: initialTask.title,
    description: initialTask.description ?? "",
    status: initialTask.status,
    priority: initialTask.priority,
    dueDate: initialTask.dueDate ?? "",
  };
}

export function TaskForm({ initialTask, onCancel, onSubmit }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(() => getInitialValues(initialTask));
  const isEditing = Boolean(initialTask);
  const isSubmitDisabled = values.title.trim().length === 0;

  function updateField<Key extends keyof TaskFormValues>(key: Key, value: TaskFormValues[Key]) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    onSubmit(values);
  }

  return (
    <Card>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-base font-semibold text-slate-950">
            {isEditing ? "Edit task" : "Add task"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Keep the form simple for now. More fields can be added later.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Write a task title"
              value={values.title}
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Due date</span>
            <input
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              onChange={(event) => updateField("dueDate", event.target.value)}
              type="date"
              value={values.dueDate}
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Status</span>
            <select
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              onChange={(event) => updateField("status", event.target.value as TaskStatus)}
              value={values.status}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Priority</span>
            <select
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              onChange={(event) => updateField("priority", event.target.value as TaskPriority)}
              value={values.priority}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            className="min-h-24 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Add a short note"
            value={values.description}
          />
        </label>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button disabled={isSubmitDisabled} type="submit">
            {isEditing ? "Save changes" : "Add task"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

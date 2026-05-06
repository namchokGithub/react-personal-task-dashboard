import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { usePrioritySettings } from "../../hooks/usePrioritySettings";
import type { Task, TaskFormValues, TaskPriority, TaskStatus } from "../../types/task";

export interface TaskFormProps {
  initialTask?: Task;
  onCancel: () => void;
  onSubmit: (values: TaskFormValues) => Promise<void> | void;
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

type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;
type TouchedFields = Partial<Record<keyof TaskFormValues, boolean>>;

const maxTitleLength = 80;
const maxDescriptionLength = 300;

const statusOptions: Array<SelectOption<TaskStatus>> = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const priorityValues: TaskPriority[] = ["low", "medium", "high"];

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

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const trimmedTitle = values.title.trim();
  const trimmedDescription = values.description.trim();

  if (!trimmedTitle) {
    errors.title = "Title is required.";
  } else if (trimmedTitle.length > maxTitleLength) {
    errors.title = `Title must be ${maxTitleLength} characters or less.`;
  }

  if (trimmedDescription.length > maxDescriptionLength) {
    errors.description = `Description must be ${maxDescriptionLength} characters or less.`;
  }

  if (values.dueDate && values.dueDate < getTodayDateString()) {
    errors.dueDate = "Due date cannot be in the past.";
  }

  return errors;
}

function getFieldClassName(hasError: boolean): string {
  const baseClassName =
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500";

  if (hasError) {
    return `${baseClassName} border-rose-300 focus:border-rose-400 focus:ring-rose-100 dark:border-rose-800 dark:focus:border-rose-500 dark:focus:ring-rose-950`;
  }

  return `${baseClassName} border-slate-200 focus:border-slate-400 focus:ring-slate-100 dark:border-slate-700 dark:focus:border-slate-500 dark:focus:ring-slate-800`;
}

export function TaskForm({ initialTask, onCancel, onSubmit }: TaskFormProps) {
  const { prioritySettings } = usePrioritySettings();
  const [values, setValues] = useState<TaskFormValues>(() => getInitialValues(initialTask));
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const isEditing = Boolean(initialTask);
  const errors = validateTaskForm(values);
  const isSubmitDisabled = Object.keys(errors).length > 0;

  function getVisibleError(field: keyof TaskFormValues): string | undefined {
    return touchedFields[field] ? errors[field] : undefined;
  }

  function markFieldTouched(field: keyof TaskFormValues) {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));
  }

  function updateField<Key extends keyof TaskFormValues>(key: Key, value: TaskFormValues[Key]) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitDisabled) {
      setTouchedFields({
        title: true,
        description: true,
        dueDate: true,
        priority: true,
        status: true,
      });
      return;
    }

    await onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    });
  }

  return (
    <Card>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
            {isEditing ? "Edit task" : "Add task"}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Keep the form simple for now. More fields can be added later.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Title</span>
            <input
              aria-invalid={Boolean(getVisibleError("title"))}
              className={getFieldClassName(Boolean(getVisibleError("title")))}
              maxLength={maxTitleLength + 1}
              onBlur={() => markFieldTouched("title")}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Write a task title"
              value={values.title}
            />
            <div className="flex items-center justify-between gap-3">
              {getVisibleError("title") ? (
                <p className="text-xs font-medium text-rose-600 dark:text-rose-300">
                  {getVisibleError("title")}
                </p>
              ) : (
                <span />
              )}
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {values.title.trim().length}/{maxTitleLength}
              </p>
            </div>
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Due date
            </span>
            <input
              aria-invalid={Boolean(getVisibleError("dueDate"))}
              className={getFieldClassName(Boolean(getVisibleError("dueDate")))}
              min={getTodayDateString()}
              onBlur={() => markFieldTouched("dueDate")}
              onChange={(event) => updateField("dueDate", event.target.value)}
              type="date"
              value={values.dueDate}
            />
            {getVisibleError("dueDate") ? (
              <p className="text-xs font-medium text-rose-600 dark:text-rose-300">
                {getVisibleError("dueDate")}
              </p>
            ) : null}
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</span>
            <select
              className={getFieldClassName(false)}
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
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Priority
            </span>
            <select
              className={getFieldClassName(false)}
              onChange={(event) => updateField("priority", event.target.value as TaskPriority)}
              value={values.priority}
            >
              {priorityValues.map((priority) => (
                <option key={priority} value={priority}>
                  {prioritySettings[priority].label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
          </span>
          <textarea
            aria-invalid={Boolean(getVisibleError("description"))}
            className={`min-h-24 ${getFieldClassName(Boolean(getVisibleError("description")))}`}
            maxLength={maxDescriptionLength + 1}
            onBlur={() => markFieldTouched("description")}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Add a short note"
            value={values.description}
          />
          <div className="flex items-center justify-between gap-3">
            {getVisibleError("description") ? (
              <p className="text-xs font-medium text-rose-600 dark:text-rose-300">
                {getVisibleError("description")}
              </p>
            ) : (
              <span />
            )}
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {values.description.trim().length}/{maxDescriptionLength}
            </p>
          </div>
        </label>

        <div className="grid gap-2 sm:flex sm:flex-row sm:justify-end">
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

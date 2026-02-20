'use client';

import { Task } from '../lib/api';

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
};

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">
        No tasks yet. Create your first one!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task._id} className="rounded-xl bg-white p-4 shadow">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{task.taskName}</h3>
              <p className="mt-1 text-sm text-slate-600">{task.description || 'No description'}</p>
              <p className="mt-2 text-sm text-slate-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="rounded-md border border-amber-500 px-3 py-1 text-amber-700 hover:bg-amber-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="rounded-md border border-red-500 px-3 py-1 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

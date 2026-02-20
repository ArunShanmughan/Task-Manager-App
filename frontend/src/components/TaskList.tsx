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
  <div className="space-y-4">

    {/* Table Header */}
    <div className="grid grid-cols-12 text-sm font-medium text-blue-700 px-4">
      <div className="col-span-1">No</div>
      <div className="col-span-3">Date & Time</div>
      <div className="col-span-2">Task</div>
      <div className="col-span-4">Description</div>
      <div className="col-span-2 text-right">Action</div>
    </div>

    {/* Rows */}
    {tasks.map((task, index) => (
      <div
        key={task._id}
        className="grid grid-cols-12 items-center rounded-xl bg-white px-4 py-4 shadow"
      >
        <div className="col-span-1 text-gray-600">
          {index + 1}
        </div>

        <div className="col-span-3 text-gray-600">
          {new Date(task.dueDate).toLocaleString()}
        </div>

        <div className="col-span-2 font-medium text-gray-800">
          {task.taskName}
        </div>

        <div className="col-span-4 text-sm text-gray-600 truncate">
          {task.description || 'No description'}
        </div>

        <div className="col-span-2 flex justify-end gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-md border border-amber-500 px-3 py-1 text-sm text-amber-600 hover:bg-amber-50"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

    {/* Simple Pagination UI (Static for now) */}
    <div className="mt-12 flex justify-center gap-3">
      <button className="rounded-md bg-white px-3 py-1 shadow hover:bg-gray-100">
        ‹
      </button>
      <div className="flex gap-2 text-sm text-gray-600">
        <span className="font-semibold">1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
      <button className="rounded-md bg-white px-3 py-1 shadow hover:bg-gray-100">
        ›
      </button>
    </div>

  </div>
);
}

'use client';

import { useState } from 'react';
import { Task, TaskPayload } from '../lib/api';

type TaskFormProps = {
  editingTask: Task | null;
  onSubmit: (payload: TaskPayload) => Promise<void>;
  onCancelEdit: () => void;
};

export default function TaskForm({ editingTask, onSubmit, onCancelEdit }: TaskFormProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload: TaskPayload = {
      taskName: String(formData.get('taskName') || '').trim(),
      description: String(formData.get('description') || ''),
      dueDate: String(formData.get('dueDate') || ''),
    };

    if (!payload.taskName || !payload.dueDate) {
      setError('Task name and due date are required.');
      return;
    }

    setError('');
    await onSubmit(payload);
    if (!editingTask) {
      event.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-slate-800">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Task Name *</label>
        <input
          name="taskName"
          type="text"
          defaultValue={editingTask?.taskName || ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="Plan sprint review"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          name="description"
          defaultValue={editingTask?.description || ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="Optional details"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Due Date *</label>
        <input
          name="dueDate"
          type="date"
          defaultValue={editingTask?.dueDate?.split('T')[0] || ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {editingTask ? 'Update Task' : 'Create Task'}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

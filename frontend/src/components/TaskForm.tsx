'use client';

import { useState } from 'react';
import { Task, TaskPayload } from '../lib/api';

type TaskFormProps = {
  editingTask: Task | null;
  onSubmit: (payload: TaskPayload) => Promise<void>;
  onCancelEdit: () => void;
};

export default function TaskForm({
  editingTask,
  onSubmit,
  onCancelEdit,
}: TaskFormProps) {
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
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
      
      {/* Modal Container */}
      <div className="
        w-full 
        max-w-sm 
        sm:max-w-md 
        md:max-w-lg 
        rounded-2xl 
        bg-white 
        p-6 
        sm:p-8 
        shadow-xl
        animate-fadeIn
      ">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
            {editingTask ? 'Edit Task' : 'Add Task'}
          </h2>

          {/* Task Name */}
          <input
            name="taskName"
            type="text"
            defaultValue={editingTask?.taskName || ''}
            placeholder="Enter Task Name"
            className="
              w-full 
              rounded-lg 
              bg-gray-100 
              px-4 
              py-2.5 
              text-sm 
              sm:text-base
              outline-none 
              focus:ring-2 
              focus:ring-blue-500
            "
          />

          {/* Description */}
          <textarea
            name="description"
            defaultValue={editingTask?.description || ''}
            placeholder="Description"
            rows={3}
            className="
              w-full 
              rounded-lg 
              bg-gray-100 
              px-4 
              py-2.5 
              text-sm 
              sm:text-base
              outline-none 
              focus:ring-2 
              focus:ring-blue-500
            "
          />

          {/* Due Date */}
          <input
            name="dueDate"
            type="date"
            defaultValue={editingTask?.dueDate?.split('T')[0] || ''}
            className="
              w-full 
              rounded-lg 
              bg-gray-100 
              px-4 
              py-2.5 
              text-sm 
              sm:text-base
              outline-none 
              focus:ring-2 
              focus:ring-blue-500
            "
          />

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <button
              type="submit"
              className="
                w-full 
                sm:w-auto 
                rounded-full 
                bg-blue-600 
                px-8 
                py-2.5 
                text-white 
                text-sm 
                sm:text-base
                transition 
                hover:bg-blue-700
              "
            >
              {editingTask ? 'Update Task' : 'Save'}
            </button>

            <button
              type="button"
              onClick={onCancelEdit}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
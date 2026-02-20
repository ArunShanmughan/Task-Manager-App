'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { clearToken, isAuthenticated } from '../../lib/auth';
import { createTask, deleteTask, fetchTasks, Task, TaskPayload, updateTask } from '../../lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setError('');
      const data = await fetchTasks();
      setTasks(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadTasks();
  }, [router]);

  const handleSubmitTask = async (payload: TaskPayload) => {
    try {
      setError('');
      if (editingTask) {
        await updateTask(editingTask._id, payload);
        setEditingTask(null);
      } else {
        await createTask(payload);
      }
      await loadTasks();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to save task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setError('');
      await deleteTask(id);
      await loadTasks();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to delete task');
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  return (
  <main className="min-h-screen bg-gray-100 px-8 py-10">
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-blue-700">
          Tasks Management
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setEditingTask({} as Task)}
            className="flex items-center gap-2 rounded-full bg-blue-700 px-6 py-2 text-white shadow hover:bg-blue-800"
          >
            + Add Task
          </button>

          <button
            onClick={handleLogout}
            className="rounded-full border border-gray-300 px-5 py-2 text-gray-600 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {editingTask && (
        <div className="mb-6">
          <TaskForm
            key={editingTask?._id || "new-task"}
            editingTask={editingTask}
            onSubmit={handleSubmitTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>
      )}

      {loading ? (
        <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">
          Loading tasks...
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  </main>
);
}

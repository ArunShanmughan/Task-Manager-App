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
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-5 shadow">
          <h1 className="text-2xl font-bold text-slate-900">Task Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>
        </header>

        {error && <p className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">{error}</p>}

        <TaskForm
          key={editingTask?._id || "new-task"}
          editingTask={editingTask}
          onSubmit={handleSubmitTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">Loading tasks...</div>
        ) : (
          <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
        )}
      </div>
    </main>
  );
}

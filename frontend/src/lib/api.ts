import { API_URL } from './config';
import { getToken } from './auth';

export type TaskPayload = {
  taskName: string;
  description: string;
  dueDate: string;
};

export type Task = {
  _id: string;
  taskName: string;
  description: string;
  dueDate: string;
  createdAt: string;
};

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const registerUser = (email: string, password: string) =>
  request<{ token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const loginUser = (email: string, password: string) =>
  request<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const fetchTasks = () => request<Task[]>('/tasks');

export const createTask = (payload: TaskPayload) =>
  request<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateTask = (id: string, payload: TaskPayload) =>
  request<Task>(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteTask = (id: string) =>
  request<{ message: string }>(`/tasks/${id}`, {
    method: 'DELETE',
  });

import api from 'src/boot/api';
import type { Task } from 'src/types/task';

export const fetchTasks = () => api.get('/tasks');
export const addTask = (title: string) => api.post('/tasks', { title });
export const updateTaskStatus = (task: Task) =>
    api.put(`/tasks/${task.id}`, { is_complated: task.is_complated });
export const updateTaskTitle = (task: Task) => 
    api.put(`/tasks/${task.id}`, { title: task.title });
export const deleteTask = (taskId: number) => api.delete(`/tasks/${taskId}`);

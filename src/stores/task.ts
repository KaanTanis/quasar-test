import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from 'src/types/task';
import * as taskService from 'src/services/taskService';
import { Notify } from 'quasar';

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([]);
    const newTaskTitle = ref<string>('');

    const fetchTasks = async () => {
        try {
            const { data } = await taskService.fetchTasks();
            tasks.value = data.data;
        } catch {
            notifyError('Görevler alınamadı.');
        }
    };

    const addTask = async () => {
        if (!newTaskTitle.value) return;

        try {
            const { data } = await taskService.addTask(newTaskTitle.value);
            tasks.value.push(data.data);
            newTaskTitle.value = '';
            notifySuccess('Görev eklendi.');
        } catch {
            notifyError('Görev eklenemedi.');
        }
    };

    const toggleComplete = async (task: Task) => {
        try {
            await taskService.updateTaskStatus(task);
            notifySuccess('Durum güncellendi.');
        } catch {
            notifyError('Durum güncellenemedi.');
        }
    };

    const editTask = async (task: Task) => {
        try {
            await taskService.updateTaskTitle(task);
            notifySuccess('Görev güncellendi.');
        } catch {
            notifyError('Güncelleme hatası.');
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await taskService.deleteTask(id);
            tasks.value = tasks.value.filter((t) => t.id !== id);
            notifySuccess('Görev silindi.');
        } catch {
            notifyError('Silme hatası.');
        }
    };

    const notifySuccess = (msg: string) => Notify.create({ message: msg, color: 'positive' });

    const notifyError = (msg: string) => Notify.create({ message: msg, color: 'negative' });

    return {
        tasks,
        newTaskTitle,
        fetchTasks,
        addTask,
        toggleComplete,
        editTask,
        deleteTask,
    };
});

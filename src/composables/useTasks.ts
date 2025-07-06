import { ref } from 'vue';
import { Notify } from 'quasar';
import type { Task } from 'src/types/task';
import * as taskService from 'src/services/taskService';

const tasks = ref<Task[]>([]);

export const useTasks = () => {
    const newTaskTitle = ref<string>('');

    const loadTasks = async () => {
        try {
            const { data } = await taskService.fetchTasks();
            tasks.value = data.data;
        } catch {
            errorNotify('Görevler alınamadı');
        }
    };

    const createTask = async () => {
        if (!newTaskTitle.value) return;

        try {
            const { data } = await taskService.addTask(newTaskTitle.value);
            tasks.value.push(data.data);
            newTaskTitle.value = '';
            successNotify('Görev eklendi!');
        } catch {
            errorNotify('Görev eklenemedi!');
        }
    };

    const toggleComplete = async (task: Task) => {
        try {
            await taskService.updateTaskStatus(task);
            successNotify('Görev durumu değişti!');
        } catch {
            errorNotify('Durum güncellenemedi!');
        }
    };

    const editTask = async (task: Task) => {
        try {
            await taskService.updateTaskTitle(task);
            successNotify('Görev güncellendi!');
        } catch {
            errorNotify('Görev güncellenemedi!');
        }
    };

    const removeTask = async (id: number) => {
        try {
            await taskService.deleteTask(id);
            tasks.value = tasks.value.filter((t) => t.id !== id);
            successNotify('Görev silindi!');
        } catch {
            errorNotify('Görev silinemedi!');
        }
    };

    return {
        tasks,
        newTaskTitle,
        loadTasks,
        createTask,
        toggleComplete,
        editTask,
        removeTask,
    };
};

const successNotify = (msg: string) => Notify.create({ message: msg, color: 'positive' });

const errorNotify = (msg: string) => Notify.create({ message: msg, color: 'negative' });

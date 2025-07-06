<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useTaskStore } from 'src/stores/task';

    const taskStore = useTaskStore();

    onMounted(async () => {
        await taskStore.fetchTasks();
    });
</script>

<template>
    <q-page padding>
        <q-input v-model="taskStore.newTaskTitle" label="Yeni Görev" outlined class="q-mb-sm" />
        <q-btn label="Ekle" @click="taskStore.addTask" color="positive" class="q-mb-md" />
        <q-btn label="Görevleri Getir" @click="taskStore.fetchTasks" color="primary" class="q-mb-md" />

        <q-list bordered padding>
            <q-item v-for="task in taskStore.tasks" :key="task.id">
                <q-item-section avatar>
                    <q-checkbox v-model="task.is_complated" @update:model-value="() => taskStore.toggleComplete(task)" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ task.title }}</q-item-label>
                </q-item-section>
                    <q-item-section side>
                    <q-btn flat dense icon="delete" color="negative" @click="() => taskStore.deleteTask(task.id)" />
                </q-item-section>
                <q-item-section>
                    <q-input v-model="task.title" @blur="() => taskStore.editTask(task)" dense borderless />
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>

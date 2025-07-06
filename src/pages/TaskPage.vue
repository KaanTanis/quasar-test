<script setup lang="ts">
    import { useTasks } from 'src/composables/useTasks';

    const {
        tasks,
        newTaskTitle,
        loadTasks,
        createTask,
        toggleComplete,
        editTask,
        removeTask
    } = useTasks();
</script>

<template>
<q-page padding>
        <q-input v-model="newTaskTitle" label="Yeni Görev" outlined class="q-mb-sm" />
        <q-btn label="Ekle" @click="createTask" color="positive" class="q-mb-md" />
        <q-btn label="Görevleri Getir" @click="loadTasks" color="primary" class="q-mb-md" />

        <q-list bordered padding>
            <q-item v-for="task in tasks" :key="task.id">
                <q-item-section avatar>
                    <q-checkbox v-model="task.is_complated" @update:model-value="() => toggleComplete(task)" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ task.title }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn flat dense icon="delete" color="negative" @click="() => removeTask(task.id)" />
                </q-item-section>
                <q-item-section>
                    <q-input v-model="task.title" @blur="() => editTask(task)" dense borderless />
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>

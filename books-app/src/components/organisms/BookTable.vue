<template>
  <DataTable
    :value="books"
    dataKey="id"
    paginator
    :rows="5"
    :globalFilterFields="['title', 'author', 'genre']"
    :globalFilter="filter"
  >
    <template #header>
      <div class="flex justify-between">
        <InputText v-model="filter" placeholder="Buscar..." />
        <BaseButton label="Crear" @click="$emit('create')" />
      </div>
    </template>

    <Column field="title" header="Título" sortable />
    <Column field="author" header="Autor" sortable />
    <Column field="year" header="Año" sortable />
    <Column field="genre" header="Género" sortable />
    <Column field="price" header="Precio" sortable />

    <Column header="Acciones" :body="actionTemplate" style="width: 160px" />
  </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import BaseButton from '@/components/atoms/BaseButton.vue';
import {type Book } from '@/store/useBooksStore';

defineProps<{ books: Book[] }>();
defineEmits(['create', 'edit', 'delete']);

const filter = ref('');

const actionTemplate = (row: Book) => (
  <div class="flex gap-2">
    <BaseButton label="Editar" @click="$emit('edit', row.id)" />
    <BaseButton label="Eliminar" type="danger" @click="$emit('delete', row.id)" />
  </div>
);
</script>

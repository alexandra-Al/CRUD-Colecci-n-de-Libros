<template>
  <DataTable
    :value="books"
    dataKey="id"
    paginator
    :rows="5"
    :globalFilterFields="['title', 'author', 'genre']"
    :globalFilter="filter"
  >
    <!-- Encabezado con búsqueda y botón Crear -->
    <template #header>
      <div class="flex justify-between">
        <InputText v-model="filter" placeholder="Buscar..." />
        <BaseButton label="Crear" @click="$emit('create')" />
      </div>
    </template>

    <!-- Columnas de datos -->
    <Column field="title"  header="Título"  sortable />
    <Column field="author" header="Autor"   sortable />
    <Column field="year"   header="Año"     sortable />
    <Column field="genre"  header="Género"  sortable />
    <Column field="price"  header="Precio"  sortable />

    <!-- Columna de Acciones -->
    <Column header="Acciones" style="width: 160px">
      <template #body="{ data }">
        <div class="flex gap-2">
          <BaseButton
            label="Editar"
            @click="$emit('edit', data.id)"
          />
          <BaseButton
            label="Eliminar"
            type="danger"
            @click="$emit('delete', data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable   from 'primevue/datatable'
import Column      from 'primevue/column'
import InputText   from 'primevue/inputtext'
import BaseButton  from '@/components/atoms/BaseButton.vue'
import type { Book } from '@/store/useBooksStore'

/* Props y eventos */
defineProps<{ books: Book[] }>()
defineEmits(['create', 'edit', 'delete'])

/* Filtro global */
const filter = ref('')
</script>

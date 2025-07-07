<template>
  <form @submit.prevent="emit('save')" class="grid gap-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
    <h2 class="text-2xl font-semibold text-gray-700">Formulario de Libro</h2>

    <!-- Título -->
    <label class="font-medium text-gray-700">
      Título
      <InputText v-model="local.title" class="w-full mt-1" required />
    </label>

    <!-- Autor -->
    <label class="font-medium text-gray-700">
      Autor
      <InputText v-model="local.author" class="w-full mt-1" required />
    </label>

    <!-- Año -->
    <label class="font-medium text-gray-700">
      Año
      <InputNumber v-model="local.year" inputId="year" class="w-full mt-1" required :useGrouping="false" />
    </label>

    <!-- Género -->
    <label class="font-medium text-gray-700">
      Género
      <InputText v-model="local.genre" class="w-full mt-1" required />
    </label>
    <!-- Fecha de publicación -->
<label class="font-medium text-gray-700">
  Fecha de publicación
  <Calendar
    v-model="local.published"
    dateFormat="yy-mm-dd"
    showIcon
    class="w-full mt-1"
  />
</label>

    <!-- Precio -->
    <label class="font-medium text-gray-700">
      Precio
      <InputNumber v-model="local.price" inputId="price" class="w-full mt-1" required mode="currency" currency="USD" locale="en-US" />
    </label>

    <!-- Botones -->
    <div class="flex justify-end gap-3 mt-4">
      <Button label="Guardar" icon="pi pi-check" class="btn-primary p-button-sm" type="submit" />
      <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary p-button-sm" @click.prevent="emit('cancel')" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Book } from '@/store/useBooksStore'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const props = defineProps<{ modelValue: Book }>()
const emit  = defineEmits(['update:modelValue', 'save', 'cancel'])

const local = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

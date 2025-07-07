<template>
  <div class="min-h-screen body flex items-center justify-center">
  <form
    @submit.prevent="emit('save')"
    class="grid gap-6 bg-white p-6 rounded-lg form shadow-md max-w-xl mx-auto"
  >
    <h2 class="text-2xl font-semibold text-gray-700 text-center">Formulario de Libro</h2>

    <!-- Título -->
    <label class="block font-medium text-gray-700 flex items-center gap-1 mx-[2vw]">
      Título
      <span v-if="submitted && errors?.title" class="!text-red-500">*</span>
    </label>
    <InputText
      v-model="local.title"
      :class="['width-imput', 'w-full mt-1', submitted && errors?.title && '!border-2 !border-red-500']"
    />

    <!-- Autor -->
    <label class="font-medium text-gray-700 flex items-center gap-1 mx-[2vw]">
      Autor
      <span v-if="submitted && errors?.author" class="!text-red-500">*</span>
    </label>
    <InputText
      v-model="local.author"
      :class="['width-imput', 'w-full mt-1', submitted && errors?.author && '!border-2 !border-red-500']"
    />

    <!-- Año -->
    <label class="font-medium text-gray-700 flex items-center gap-1 mx-[2vw]">
      Año
      <span v-if="submitted && errors?.year" class="!text-red-500">*</span>
    </label>
    <InputNumber
      v-model="local.year"
      inputId="year"
      :class="[ 'width-imput','w-full mt-1', submitted && errors?.year && '!border-2 !border-red-500']"
      :useGrouping="false"
    />

    <!-- Género -->
    <label class="font-medium text-gray-700 flex items-center gap-1 mx-[2vw]">
      Género
      <span v-if="submitted && errors?.genre" class="!text-red-500">*</span>
    </label>
    <InputText
      v-model="local.genre"
      :class="['width-imput', 'w-full mt-1', submitted && errors?.genre && '!border-2 !border-red-500']"
    />

    <!-- Fecha de publicación -->
    <label class="font-medium text-gray-700 flex items-center gap-1 mx-[2vw]">
      Fecha de publicación
      <span v-if="submitted && errors?.published" class="!text-red-500">*</span>
    </label>
    <Calendar
      v-model="local.published"
      dateFormat="yy-mm-dd"
      showIcon
      :class="['width-imput','w-full mt-1', submitted && errors?.published && '!border-2 !border-red-500']"
    />

    <!-- Precio -->
    <label class="font-medium text-gray-700 flex items-center gap-1 mx-[2vw]">
      Precio
      <span v-if="submitted && errors?.price" class="!text-red-500">*</span>
    </label>
    <InputNumber
      v-model="local.price"
      inputId="price"
      mode="currency"
      currency="COP"
      locale="en-CO"
      :class="['width-imput','w-full mt-1', submitted && errors?.price && '!border-2 !border-red-500']"
    />

    <!-- Botones -->
    <div class="flex justify-end gap-3 mt-4">
      <Button
        label="Guardar"
        icon="pi pi-check"
        class="btn-primary p-button-sm button-color ml-[1vw] mr-[1vw] mb-[1vw]"
        type="submit"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-secondary p-button-sm button-radius mr-[10vw] mb-[1vw]"
        @click.prevent="emit('cancel')"
      />
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Book } from '@/store/useBooksStore'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const props = defineProps<{
  modelValue: Book
  errors?: Record<string, string | null>
  submitted?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const local = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

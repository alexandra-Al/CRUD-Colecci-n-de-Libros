<template>
  <MainLayout>
    <BookForm
      v-model="book"
      @save="save"
      @cancel="router.back()"
    />
    <Toast />
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

import BookForm               from '@/components/organisms/BookForm.vue'
import { useBooksStore, Book } from '@/store/useBooksStore'

const route  = useRoute()
const router = useRouter()
const toast  = useToast()
const store  = useBooksStore()

const template: Book = { title: '', author: '', year: new Date().getFullYear(), genre: '', price: 0 }
const book = ref<Book>({ ...template })

const isEdit = computed(() => !!route.params.id)

/* cargar libro en modo edición */
onMounted(async () => {
  if (isEdit.value) {
    const found = await store.getBookById(Number(route.params.id))
    if (found) Object.assign(book.value, found)
  }
})

/* guardar (create / update) con feedback y manejo de error */
async function save() {
  try {
    if (isEdit.value && route.params.id) {
      await store.updateBook(Number(route.params.id), book.value)
      toast.add({ severity: 'success', summary: 'Actualizado', life: 2000 })
    } else {
      await store.addBook(book.value)
      toast.add({ severity: 'success', summary: 'Creado', life: 2000 })
    }
    router.push('/books')
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 })
  }
}
</script>

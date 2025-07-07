<template>
  <MainLayout>
    <BookForm
      v-model="book"
       :errors="errors" 
       :submitted="submitted"
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
import { useBookValidation } from '@/composables/useBookValidation'

import BookForm from '@/components/organisms/BookForm.vue'
import { useBooksStore, type Book } from '@/store/useBooksStore'

const route  = useRoute()
const router = useRouter()
const toast  = useToast()
const store  = useBooksStore()

const template: Book = {
  title: '',
  author: '',
  year: new Date().getFullYear(),
  genre: '',
  price: 0,
  published: null
}
const book = ref<Book>({ ...template })

/* validación */
const { errors, isValid } = useBookValidation(book.value)


const submitted = ref(false)

const isEdit = computed(() => !!route.params.id)

/* cargar libro en modo edición */
onMounted(async () => {
  if (isEdit.value) {
    const found = await store.getBookById(Number(route.params.id))
    if (found) Object.assign(book.value, found)
  }
})


async function save() {
  submitted.value = true            
  if (!isValid.value) return        

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
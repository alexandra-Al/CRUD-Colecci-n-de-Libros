import { reactive, computed, watch } from 'vue'
import type { Book } from '@/store/useBooksStore'

export function useBookValidation(book: Book) {
  const errors = reactive<Record<keyof Book, string | null>>({
    title: null,
    author: null,
    year: null,
    genre: null,
    price: null,
    published: null,  
    id: null,
  })

  watch(
    () => ({ ...book }),
    validate,
    { deep: true, immediate: true }
  )

  function validate() {
    errors.title     = book.title    ? null : 'Título obligatorio'
    errors.author    = book.author   ? null : 'Autor obligatorio'
    errors.year      = book.year  && book.year  > 0 ? null : 'Año inválido'
    errors.genre     = book.genre    ? null : 'Género obligatorio'
    errors.price     = book.price && book.price > 0 ? null : 'Precio inválido'
    errors.published = book.published ? null : 'Fecha obligatoria'   // ✅ nuevo
  }

  const isValid = computed(() => Object.values(errors).every(e => !e))
  return { errors, isValid }
}

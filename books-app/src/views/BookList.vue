<!-- src/views/BookList.vue -->
<template>
  <MainLayout>
    <!-- Tabla con PrimeVue DataTable -->
    <BookTable
      :books="books"
      @create="goToNew"
      @edit="goToEdit"
      @delete="confirmDelete"
    />

    <!-- Diálogo de confirmación y notificaciones -->
    <ConfirmDialog />
    <Toast />
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useBooksStore } from '@/store/useBooksStore';

import MainLayout from '@/components/templates/MainLayout.vue';
import BookTable from '@/components/organisms/BookTable.vue';

export default defineComponent({
  name: 'BookList',
  components: { MainLayout, BookTable },

  data() {
    return {
      store: useBooksStore(),
      toast: useToast(),
      confirm: useConfirm(),
      router: useRouter(),
    };
  },

  computed: {
    // Libros reactivos desde Pinia
    books() {
      return this.store.books;
    },
  },

  // Carga inicial
  created() {
    this.store.fetchBooks();
  },

  methods: {
    goToNew() {
      this.router.push('/books/new');
    },
    goToEdit(id: number) {
      this.router.push(`/books/${id}`);
    },
    confirmDelete(id: number) {
      this.confirm.require({
        message: '¿Seguro que deseas eliminar este libro?',
        accept: async () => {
          await this.store.deleteBook(id);
          this.toast.add({
            severity: 'success',
            summary: 'Libro eliminado',
            life: 2000,
          });
        },
      });
    },
  },
});
</script>

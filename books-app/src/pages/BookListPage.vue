<template>
  <MainLayout>
    <section class="p-6">
      <h1 class="text-2xl font-bold mb-4">Lista de Libros</h1>

      <!-- Barra de búsqueda + filtro + botón -->
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <InputText
          v-model="search"
          placeholder="Buscar por título o autor"
          class="flex-1"
        />

        <!-- NUEVO: filtro por género -->
        <Dropdown
          v-model="genreFilter"
          :options="genres"
          optionLabel="label"
          optionValue="value"
          placeholder="Todos los géneros"
          showClear
          class="w-full md:w-60"
        />

        <Button label="Crear Libro" icon="pi pi-plus" @click="goToCreate" />
      </div>

      <DataTable
        :value="filteredBooks"
        paginator
        rows="5"
        :rowsPerPageOptions="[5, 10, 20]"
        sortField="title"
        :sortOrder="1"
        removableSort
        selectionMode="single"
        dataKey="id"
        class="p-datatable-sm"
      >
        <Column field="title"  header="Título"  sortable />
        <Column field="author" header="Autor"   sortable />
        <Column field="year"   header="Año"     sortable />
        <Column field="genre"  header="Género"  sortable />
        <Column field="price"  header="Precio"  sortable />

        <Column header="Acciones">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-text p-button-sm"
              @click="editBook(slotProps.data.id)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-sm text-red-500"
              @click="deleteBook(slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
      <ConfirmDialog />
    </section>
  </MainLayout>
</template>

<script lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'      // ⬅️ nuevo
import { useConfirm } from 'primevue/useconfirm'  
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '@/store/useBooksStore'

import MainLayout from '@/components/templates/MainLayout.vue'
import InputText  from 'primevue/inputtext'
import Dropdown   from 'primevue/dropdown'
import Button     from 'primevue/button'
import DataTable  from 'primevue/datatable'
import Column     from 'primevue/column'

export default defineComponent({
  name: 'BookListPage',
  components: {
    MainLayout,
    InputText,
    Dropdown,
    Button,
    DataTable,
    Column,
    ConfirmDialog,
  },
  setup() {
    const router = useRouter()
    const store  = useBooksStore()

    /* estado local */
    const confirm = useConfirm() // ⬅️ nuevo
    const search       = ref('')
    const genreFilter  = ref<string | null>(null)

    /* carga inicial */
    onMounted(() => store.fetchBooks())

    /* géneros únicos para el dropdown */
    const genres = computed(() =>
      [...new Set(store.books.map(b => b.genre))].map(g => ({ label: g, value: g }))
    )

    /* filtrado reactivo */
    const filteredBooks = computed(() =>
      store.books.filter(b =>
        (b.title .toLowerCase().includes(search.value.toLowerCase()) ||
         b.author.toLowerCase().includes(search.value.toLowerCase()))
        &&
        (!genreFilter.value || b.genre === genreFilter.value)
      )
    )

    /* navegación / acciones */
    const goToCreate = () => router.push('/books/new')
    const editBook   = (id: number) => router.push({ name: 'BookEdit', params: { id } })
    const deleteBook = (id: number) => {
  confirm.require({
    message: '¿Deseas eliminar este libro?',
    header: 'Confirmar Eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => store.deleteBook(id),
  })
}

    return {
      search,
      genreFilter,
      genres,
      filteredBooks,
      goToCreate,
      editBook,
      deleteBook,
    }
  },
})
</script>

<template>
  <MainLayout>
    <section class="p-6 table">
      <h1 class="mx-[5vw]">Lista de Libros</h1>

      <!-- Barra de búsqueda, filtro y botón -->
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <InputText
          v-model="search"
          placeholder="Buscar por título o autor"
          class="mx-[5vw] mb-[1vw]"
        />

        <!-- filtro por género -->
        <Dropdown
          v-model="genreFilter"
          :options="genres"
          optionLabel="label"
          optionValue="value"
          placeholder="Todos los géneros"
          showClear
          class="mx-[5vw] mb-[1vw]"
        />

        <Button label="Registrar Libro" class="button-color mb-[1vw] mx-[5vw]" @click="goToCreate" />
      </div>

      <DataTable
        :value="filteredBooks"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20]"
        sortField="title"
        :sortOrder="1"
        removableSort
        selectionMode="single"
        dataKey="id"
        class="p-datatable-sm mx-[5vw]"
      >
        <Column field="title"  header="Título"  sortable />
        <Column field="author" header="Autor"   sortable />
        <Column field="year"   header="Año"     sortable />
        <Column field="genre"  header="Género"  sortable />
        <Column field="price"  header="Precio"  sortable />
      <Column header="Publicado">
  <template #body="slotProps">
    {{ formatDate(slotProps.data.published) }}
  </template>
</Column>

        <Column header="Acciones">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-text  modify icon-color p-button-sm"
              @click="editBook(slotProps.data.id)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-text delete icon-color p-button-sm text-red-500"
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

  
    const confirm = useConfirm() 
    const search       = ref('')
    const genreFilter  = ref<string | null>(null)

  
    onMounted(() => store.fetchBooks())

    
    const genres = computed(() =>
      [...new Set(store.books.map(b => b.genre))].map(g => ({ label: g, value: g }))
    )

  
    const filteredBooks = computed(() =>
      store.books.filter(b =>
        (b.title .toLowerCase().includes(search.value.toLowerCase()) ||
         b.author.toLowerCase().includes(search.value.toLowerCase()))
        &&
        (!genreFilter.value || b.genre === genreFilter.value)
      )
    )
 function formatDate(dateStr: string | null) {
    if (!dateStr) return '-'
    return new Date(dateStr).toISOString().slice(0, 10)  // yyyy-mm-dd
  }

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
       formatDate, 
    }
  },
})
</script>

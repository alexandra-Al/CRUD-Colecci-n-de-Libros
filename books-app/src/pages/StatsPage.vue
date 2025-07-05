<template>
  <MainLayout>
    <section class="p-6">
      <h1 class="text-2xl font-bold mb-6">Estadísticas de Libros por Género</h1>

      <Chart
        type="pie"
        :data="chartData"
        :options="chartOptions"
        class="w-full max-w-xl mx-auto"
      />
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBooksStore } from '@/store/useBooksStore'
import Chart from 'primevue/chart'
import MainLayout from '@/components/templates/MainLayout.vue'

const store = useBooksStore()

onMounted(() => {
  store.fetchBooks()
})

// Agrupar libros por género
const chartData = computed(() => {
  const genreCount: Record<string, number> = {}

  store.books.forEach((book) => {
    genreCount[book.genre] = (genreCount[book.genre] || 0) + 1
  })

  return {
    labels: Object.keys(genreCount),
    datasets: [
      {
        data: Object.values(genreCount),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043'],
      },
    ],
  }
})

const chartOptions = {
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}
</script>

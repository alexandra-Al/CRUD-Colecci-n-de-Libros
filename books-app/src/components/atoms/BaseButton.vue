<script setup lang="ts">
defineProps<{ label: string; type?: 'primary' | 'danger' }>();
</script>

<button
  :style="{
    backgroundColor:  type === 'danger' ? '#dc2626' : '#2563eb',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
  }"
>
  {{ label }}
</button>

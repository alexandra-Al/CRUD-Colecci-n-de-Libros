<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<span
  :style="{ background: '#d1fae5', color: '#065f46', padding: '2px 6px', borderRadius: '6px' }"
>
  {{ text }}
</span>

<script setup lang="ts">
defineProps<{ modelValue: string | number; type?: string }>();
defineEmits(['update:modelValue']);
</script>

<input
  :type="type || 'text'"
  :value="modelValue"
  @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  class="border rounded px-2 py-1 w-full"
/>

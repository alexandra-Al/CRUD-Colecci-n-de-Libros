<template>
  <label class="block mb-2 font-semibold">
    <slot name="label" />  
    <slot />
    <small class="text-red-600" v-if="error">{{ error }}</small>
  </label>
</template>

<script setup lang="ts">
defineProps<{ error?: string }>();
</script>

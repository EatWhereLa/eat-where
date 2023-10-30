<script setup lang="ts">
import { defineProps } from "vue";

const { price } = defineProps<{ price: string }>();
defineEmits<{ "filter-price": [price: string] }>();
</script>

<template>
  <va-button
    preset="secondary"
    border-color="primary"
    round
    @click="$emit('filter-price', price)"
  >
    {{ price }}
  </va-button>
</template>

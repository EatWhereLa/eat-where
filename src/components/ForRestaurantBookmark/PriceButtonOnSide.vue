<template>
  <button
    class="h-10 px-5 text-sm text-black transition-colors duration-150 border border-orange-500 rounded-full focus:shadow-outline hover:bg-orange-500 hover:text-white"  @click="$emit('filterEvent', category)">{{category}}</button>
</template>



<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  category: String,
  onButtonClick: Function
});

const category = props.category!;

</script>
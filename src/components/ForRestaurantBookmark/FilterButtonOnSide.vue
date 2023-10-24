<template>
  <!-- <div class="overflow-y-scroll"> -->
    <div class="flex items-center mb-4" v-if="isChecked== true">
      <input :id="category" type="checkbox" :value="category" 
        class="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-orange-600" @click="$emit('filterEvent', category)" checked>
      <label :id="category" :for="category" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" >{{ category }}</label>
    </div>
    <div class="flex items-center mb-4" v-else>
      <input :id="category" type="checkbox" :value="category" 
        class="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-orange-600" @click="$emit('filterEvent', category)" >
      <label :id="category" :for="category" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" >{{ category }}</label>
    </div>

</template>



<script setup lang="ts">
// import { emit } from 'process';
import { defineProps , ref, onMounted } from 'vue';

const props = defineProps({
  category: String,
  onButtonClick: Function,
  modelValue: Boolean,

});
const isChecked = ref(props.modelValue);

onMounted(() => {
  const isChecked = ref(props.modelValue);
  return isChecked;
});

console.log(isChecked);
// if (category.toLowerCase() == "all"){
//   const category = "";
// }


const category = props.category!;

</script>
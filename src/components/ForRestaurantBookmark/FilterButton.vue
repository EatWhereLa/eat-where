<template>
  <button
  :class="{
      'bg-orange-600 text-white': isChecked,
      'bg-white ring-orange-500 text-orange-500 ring-1': !isChecked
    }"
    class="scroll-button bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-bold py-2 px-4 rounded-full mx-2 dark:focus:ring-yellow-900 " @click="toggle" >{{category}}</button>
</template>
<!-- bg-white hover:bg-orange-600 text-black  -->

<script setup lang="ts">
import { defineProps,ref, defineEmits } from 'vue';

const props = defineProps({
  buttonName: String,
  onButtonClick: Function,
  modelValue: Boolean, 
});



const isChecked = ref(props.modelValue);

// console.log(isChecked.value);

const emits = defineEmits(["button-click"]);
// $emit('filterEvent', category)
const toggle = () => {
  isChecked.value = !isChecked.value;
  // emit('update:modelValue', isChecked.value);
  // emit('filterEvent', category);
  emits("button-click", isChecked.value, category);


  // if (typeof props.onButtonClick === "function") {
  //   console.log(category);
  //   props.onButtonClick(isChecked.value, category);
  // }

};

const category = props.buttonName!;
// console.log(category + "dq");



</script>

<style scoped>
.scroll-button {
  text-align: center;
}
</style>
<template>
    <div @click="scrollToTop">
        <va-icon name='va-arrow-up' id="scrollToTop" title="Go to top" 
    class="fixed bottom-5 right-5 p-2  text-white rounded cursor-pointer" style="color:black"/>
    </div>
</template>

<script lang="ts">
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // This enables smooth scrolling
      });
    },
  },
};
</script>

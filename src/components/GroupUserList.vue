<script setup lang="ts">
import Avatar from "vue-boring-avatars";
import { users } from "@/apis/supabase";
</script>
<template>
  <div class="max-h-56">
    <div v-for="user in users" :key="user" class="grid grid-cols-12 mb-2 h-11">
      <div class="col-span-2 flex items-center justify-center">
        <Avatar variant="beam" :size="40" :name="user" />
      </div>
      <div
        class="text-black font-medium col-span-9 ml-2 flex items-center justify-center"
      >
        <p>{{ user }}</p>
      </div>
      <div class="flex items-center justify-center">
        <va-icon
          class="text-red-600 col-span-1"
          name="close"
          style="display: contents"
          size="0.625rem"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

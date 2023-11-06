<script setup lang="ts">
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { users } from "@/apis/supabase";

function getAvatarURI(username: string) {
  return createAvatar(adventurer, {
    size: 40,
    seed: username,
  }).toDataUriSync();
}
</script>
<template>
  <div class="max-h-56">
    <div v-for="user in users" :key="user" class="grid grid-cols-12 mb-2 h-11">
      <div class="col-span-2 flex items-center justify-center">
        <img :src="getAvatarURI(user)" alt="Avatar" />
      </div>
      <div
        class="text-black font-medium col-span-9 ml-2 flex items-center justify-center"
      >
        <p>{{ user }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

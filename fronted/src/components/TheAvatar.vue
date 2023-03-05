<template>
  <img :src="src || defaultAvatar" class="avatar"/>
</template>

<script setup>
import defaultAvatar from "../assets/avatarDefault.png"
defineProps({
  src: String,
  width: {
    type: Number,
    default: 34
  },
  height: {
    type: Number,
    default: 34
  }
});
</script>

<style scoped>
  .avatar {
    width: v-bind(width + "px");
    height: v-bind(height + "px");
    background: #eee;
    border-radius: 50%;
    object-fit: cover;
    object-position: top center;
  }
</style>

<template>
    <div class="postList">
      <slot></slot>
    </div>
    <!-- <PostDetails /> -->
    <!-- <PostUpload /> -->
</template>
<script setup>
 import TheAvatar from "../components/TheAvatar.vue";
 import PostActions from "../components/PostActions.vue"
</script>

<style scoped>
  .postList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }
</style>

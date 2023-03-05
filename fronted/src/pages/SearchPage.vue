<template>
  <div>
    <h2 class="title">搜索结果: {{ term.term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post"></PostItem>
    </PostList>
    <!-- <PostDetails /> -->
    <!-- <PostUpload /> -->
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostListItem.vue";

const store = useStore();
const searchResult = computed(() => store.state.post.searchResult)

const route = useRoute()
// 获取搜索词
const term = computed(() => route.query);
console.log(route.query)
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>

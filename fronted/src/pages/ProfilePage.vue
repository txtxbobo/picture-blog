<template>
  <div>
    <div class="profileContainer">
      <TheAvatar :width="186" :height="186" :src="user.avatar" />
      <div class="profile">
        <p class="name">
          <span>{{ user.name }}</span>
          <router-link to="/profile/edit">编辑个人资料</router-link>
        </p>
        <p class="handle">@{{ user.username }}</p>
        <div class="description">
          <pre
            >{{ user.intro }}
          </pre>
        </div>
        <p class="website">{{ user.website }}</p>
      </div>
    </div>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        class="tab"
        :class="{ active: index === currentTab }"
        :key="index"
        @click="currentTab = index"
      >
        <TheIcon :icon="tab.icon" />
        <p>{{ tab.label }}</p>
      </div>
      <div class="tabContent">
        <p>{{ myPosts[currentTab].length }}</p>
        <div class="posts">
          <img
            v-for="post in myPosts[currentTab]"
            :src="post.image"
            class="postImage"
            :key="post.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, ref, reactive, watch } from "vue";
import TheAvatar from "../components/TheAvatar.vue";
import TheIcon from "../components/TheIcon.vue";
import { loadPostsByMe, loadPostsLikesOrFavoredByMe } from "../apis/post.js";

const store = useStore();

const user = computed(() => store.state.user.user);
// console.log(user.value);

const tabs = ref([
  {
    label: "我的",
    icon: "posts",
  },
  {
    label: "赞过",
    icon: "like",
  },
  {
    label: "收藏",
    icon: "favorite",
  },
]);
// 默认tab 表示选中“我的”
const currentTab = ref(0);
// 定义响应式状态
const myPosts = reactive({
  // 我发布的列表
  0: [],
  // 我赞过的
  1: [],
  // 我收藏过的
  2: [],
});
// watch监听currentTab的变化
watch(
  currentTab,
  async () => {
    switch (currentTab.value) {
      case 0:
        if (myPosts[0].length === 0) {
          myPosts[0] = await loadPostsByMe();
        }
        break;
      case 1:
        if (myPosts[1].length === 0) {
          myPosts[1] = await loadPostsLikesOrFavoredByMe();
        }
        break;
      case 2:
        if (myPosts[2].length === 0) {
          myPosts[2] = await loadPostsLikesOrFavoredByMe("favors");
        }
        break;
      default:
        return;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.profileContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
}
.avatar {
  justify-self: end;
}
.profile .name {
  display: flex;
  align-items: center;
}
.profile .name > span {
  font-size: 26px;
}
.profile .name > a {
  color: #1da0ff;
  text-decoration: none;
  margin-left: 26px;
}
.profile .handle {
  margin-top: 4px;
  color: #848484;
}
.profile .description {
  margin-top: 26px;
  margin-bottom: 22px;
}
.tabs {
  display: grid;
  grid-template-columns: repeat(3, 88px);
  column-gap: 4vw;
  justify-content: center;
  margin-top: 7vmin;
  margin-bottom: 20px;
}
.tab {
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
}
.tab > svg {
  width: 32px;
  height: 32px;
  stroke: #8a9194;
  fill: #8a9194;
}
.tab.active {
  background: #f6f9fb;
  border-radius: 18px;
}
.tab.active > svg {
  stroke: #1787d9;
  fill: #1787d9;
}
.tab.active > p {
  color: #1787d9;
}
.tabContent > p {
  text-align: center;
  font-weight: 600;
  margin-bottom: 32px;
}
.posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}
.postImage {
  /* width: 100%; */
  height: 321px;
  background: #eee;
  object-fit: cover;
}
</style>

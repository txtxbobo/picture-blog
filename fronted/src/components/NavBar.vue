<template>
  <nav class="navbar">
    <router-link to="/"><img src="../assets/logo.svg" /></router-link>
    <div class="searchInput">
      <input type="text" @change="searchPosts" />
      <TheIcon icon="search" />
    </div>
    <div class="navItem">
      <router-link to="/"><TheIcon icon="home" /></router-link>
      <button @click="publishPost()"><TheIcon icon="publish" /></button>
      <div class="profileDropDown">
        <TheAvatar
          :width="42"
          :height="42"
          style="cursor: pointer"
          @click="showDropDown = !showDropDown"
          :src="user.avatar"
        />
        <div
          class="dropdownMenu"
          v-show="showDropDown"
          @click="showDropDown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">个人主页</router-link></li>
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import TheIcon from "../components/TheIcon.vue";
import TheAvatar from "../components/TheAvatar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";

const showDropDown = ref(false);
const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user.user)

function publishPost() {
  store.commit("changeShowPostUpload", true);
}

async function searchPosts(e) {
  // console.log(e.target.value)
  await store.dispatch("searchPost", e.target.value);
  router.push({
    path: "/search_result",
    // 传递搜索词
    query: {
      term: e.target.value,
    },
  });
}

async function logout() {
  await store.dispatch("logoutUser");
  router.push("/login");
}
</script>

<style scoped>
.navbar {
  width: 80vw;
  height: 80px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}
.navbar svg {
  width: 38px;
  height: 38px;
}
.searchInput {
  position: relative;
}
.searchInput input {
  width: 100%;
  padding: 12px;
  padding-left: 36px;
  background: #f1f1f1;
  border-radius: 14px;
  border: none;
}
.searchInput > svg {
  position: absolute;
  left: 12px;
  top: 11px;
}
.navItem {
  justify-self: end;
  display: flex;
  gap: 24px;
  align-items: center;
}
.navItem > button {
  border: none;
  background: none;
}
.profileDropDown {
  position: relative;
}

.profileMenu {
  display: none;
  position: absolute;
  width: max-content;
  padding: 24px 26px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}
.dropdownMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0px;
  height: 0px;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}
.profileMenu a,
.profileMenu li {
  text-decoration: none;
  cursor: pointer;
}
.profileMenu a:visited {
  color: initial;
}
</style>

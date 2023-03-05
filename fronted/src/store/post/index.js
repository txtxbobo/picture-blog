import { createPost, favorPosts, likePosts, loadPosts } from "../../apis/post";

export const post = {
  state() {
    return {
      list: [],
      searchResult: [],
      currentId: null,
    };
  },
  mutations: {
    initializePosts(state, posts) {
      state.list = posts;
      // console.log(posts);
    },
    // 喜欢状态修改
    toggleLike(state, { id, isLike }) {
      console.log(id);
      const post = state.list.find((post) => post.id === id);
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1;
      } else {
        post.liked_bies--;
      }
      post.likedByMe = isLike;
    },
    // 收藏状态修改
    toggleFavor(state, { id, isFavor }) {
      const post = state.list.find((post) => post.id === id);
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1;
      } else {
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },

    setCurrentId(state, id) {
      state.currentId = id;
    },

    increaseCommentCount(state, id) {
      const post = state.list.find((post) => post.id === id);
      // console.log(post);
      post.comments++;
    },
    setPostsSearchReault(state, post) {
      state.searchResult = post;
    },
  },
  actions: {
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description);
      dispatch("loadAllPosts");
      // 关闭对话框并清空上川岛额图片
      commit("changeShowPostUpload", false);
    },

    async loadAllPosts({ commit }) {
      const posts = await loadPosts();
      commit("initializePosts", posts);
    },

    // 点赞数据获取
    async toggleLike({ commit }, id) {
      const isLike = await likePosts(id);
      commit("toggleLike", { id, isLike });
    },
    // 收藏数据获取
    async toggleFavor({ commit }, id) {
      const isFavor = await favorPosts(id);
      commit("toggleFavor", { id, isFavor });
    },
    // 修改currentId, 修改帖子状态
    async showPostDetails({ commit, dispatch }, id) {
      commit("setCurrentId", id);
      dispatch("loadAllComments", id);
      commit("changeShowPostDetails", true);
    },
    // 隐藏帖子详情
    async hidePostDetails({ commit }) {
      commit("setCurrentId", null);
      commit("changeShowPostDetails", false);
    },

    async searchPost({ commit }, term) {
      const posts = await loadPosts("filters[description][$contains]=" + term);
      commit("setPostsSearchReault", posts);
    },
  },
  getters: {
    postDetails(state) {
      return state.list.find((post) => post.id === state.currentId);
    },
  },
};

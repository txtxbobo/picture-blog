import { createComment, loadComments } from "../../apis/comment";

export const comment = {
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    initialzeComments(state, comments) {
      state.list = comments;
      console.log(comments);
    },
  },
  actions: {
    async addComment({ commit, dispatch }, { content, postId }) {
      try {
        await createComment(content, postId);
        dispatch("loadAllComments", postId);
        commit("increaseCommentCount", postId);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取评论数据
    async loadAllComments({ commit }, postId) {
      try {
         const comments = await loadComments(postId);
         console.log(comments);
         commit("initialzeComments", comments);
      } catch (error) {
        console.log(error)
      }
    },
  },
};

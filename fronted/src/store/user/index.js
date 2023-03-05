import { getUser, register, login, logout } from "../../apis/auth";
import { changeUser } from "../../apis/user";

export const user = {
  state() {
    return {
      user: getUser() || {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    // 用户注册
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);
      commit("setUser", user);
    },
    // 用户登录
    async loginUser({ commit }, { email, password }) {
      const user = await login(email, password);
      commit("setUser", user);
    },
    async updateUser({ commit }, user) {
      const updateUser = await changeUser(user);
      commit("setUser", updateUser);
    },
    // 退出登录
    async logoutUser({commit}) {
      logout();
      commit("setUser", {})
    }
  },
};

import { request } from "../utils/request";

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user) {
  // localStorage储存字符串格式的文本
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function register(email, username, password) {
  // try {
  const result = await request("/api/auth/local/register", {
    method: "POST",
    auth: false,
    body: {
      email,
      username,
      password,
      name: username,
    },
  });
  // console.log(result);
  setJwtToken(result.jwt);
  // console.log(JSON.stringify(result.user))
  saveUser(result.user);
  // 创建默认个人资料
  return result.user;
  // } catch (error) {
  //   throw error;
  // }
}

export async function login( email, password ) {
  const result = await request("/api/auth/local", {
    method: "POST",
    auth: false,
    body: {
      identifier: email,
      password,
    },
  });
  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}

// 退出登录逻辑
export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}

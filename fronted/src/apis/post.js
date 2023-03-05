import { getJwtToken, getUser } from "./auth"
import { request} from "../utils/request";
export async function createPost(image, description) {
  const formData = new FormData();
  formData.append("files.image", image);
  formData.append("data", JSON.stringify({ description }));

  await fetch("/api/posts", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    }
  })
}


export async function loadPosts(filters = "") {
  // populate=* 是所有关联字段的信息
  const response = await request("api/posts?populate=*" + (filters && `&${filters}`));
  // console.log(response.data);
  return response.data.map((post) => ({
    id: post?.id,
    ...post?.attributes,
    image: post?.attributes?.image?.data?.[0]?.attributes?.url,
    user: {
      id:post?.attributes?.use?.data?.id,
      ...post?.attributes?.user?.data?.attributes,
    }
  }));
}

export async function loadPostsByMe() {
  return loadPosts(`filters[user][id][$eq]=${getUser().id}`);
}
export async function loadPostsLikesOrFavoredByMe(type = 'likes') {
  const response = await request(
    `/api/users/me?populate[${type}][populate][0]=image`
  );
  return response[type].map((post) => ({
    ...post,
    image: post?.image?.[0].url,
  }))
}
// 点赞接口
export async function likePosts(id) {
  const response = await request(`/api/posts/${id}/like`, {
    method: "PUT",
  });
  console.log(response.data);
  return response.data;
}
// 收藏接口
export async function favorPosts(id) {
  const response = await request(`/api/posts/${id}/favor`, {
    method: "PUT",
  });
  console.log(response.data);
  return response.data;
}


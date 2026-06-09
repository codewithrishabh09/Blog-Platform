import API from "./axios";

export const getPosts = async () => {
  const response = await API.get("/posts");
  return response.data;
};

export const getPost = async (id) => {
  const response = await API.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data) => {
  const response = await API.post("/posts", data);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await API.delete(`/posts/${id}`);
  return response.data;
};
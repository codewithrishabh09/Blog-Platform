import API from "./axios";

export const getComments = async (postId) => {
  const response = await API.get(`/comments/${postId}`);
  return response.data;
};

export const addComment = async (data) => {
  const response = await API.post(
    "/comments",
    data
  );

  return response.data;
};
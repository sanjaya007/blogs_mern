import axios from "axios";
const BASE_URL = "http://localhost:7000/api/post";

const createPostApi = async (data) => {
  try {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("summary", data.summary);
    formData.set("content", data.content);
    formData.set("image", data.image);

    const response = await axios({
      method: "post",
      url: `${BASE_URL}/create`,
      data: formData,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

const getPostsApi = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/all`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { createPostApi, getPostsApi };

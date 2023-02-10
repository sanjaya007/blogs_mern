import axios from "axios";
const BASE_URL = "http://localhost:7000/api/user";

const registerApi = async (data) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/register`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default registerApi;

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

const loginApi = async (data) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/login`,
      data: data,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserProfileApi = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/profile`,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logOutApi = async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/logout`,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { registerApi, loginApi, getUserProfileApi, logOutApi };

import axios from "axios";
import { INewUserPayload } from "../../../types/apiTypes";

const API_URL = "/api/users";

// register user
const register = async (userData: INewUserPayload) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response);

  return response.data;
};

const authService = {
  register,
};

export default authService;

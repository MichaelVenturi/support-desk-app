import axios from "axios";
import { INewUserPayload, IUserPayload } from "../../../types/apiTypes";

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

// login user
const login = async (userData: IUserPayload) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response);

  return response.data;
};

// logout user
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};

export default authService;

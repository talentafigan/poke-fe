import axios from "axios";

const register = () => {
  setDefaultBaseUrl();
};

const setDefaultBaseUrl = () => {
  axios.defaults.baseURL = process.env.POKE_BE_URL;
};

export const setToken = () => {
  axios.defaults.headers.common["token"] = localStorage.getItem("token");
};

export default register;

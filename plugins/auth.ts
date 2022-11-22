import { AuthApi } from "../api/auth.api";
import { UserApi } from "../api/user.api";
import { setToken } from "../plugins/axios";

export const authInitalizator = async () => {
  const token = localStorage.getItem("token");
  const userApi = new UserApi();
  const authApi = new AuthApi();
  if (token) {
    setToken();
    console.log('running')
    return;
  }
  try {
    const guest = await userApi.createGuest();
    const authRespond = await authApi.login({
      username: guest.data.username,
      password: guest.data.password,
    });
    localStorage.setItem("token", authRespond.data.auth.token);
  } catch (error) {
    console.log(error);
  }
};

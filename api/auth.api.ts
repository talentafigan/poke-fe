import axios from "axios";

export class AuthApi {
  POKE_BE_URL = process.env.POKE_BE_URL;
  login(data: { username: string; password: string }) {
    return axios.post(this.POKE_BE_URL + "/auth/login", data);
  }
  fetchMe() {
    return axios.get(this.POKE_BE_URL + "/auth/fetch-me");
  }
}

import axios from "axios";
export class UserApi {
  POKE_BE_URL = process.env.POKE_BE_URL;
  createGuest() {
    return axios.post(this.POKE_BE_URL + "/user/guest");
  }
}

export class ItemApi {
  POKE_BE_URL = process.env.POKE_BE_URL;
  create(data: { nickname: any; item: any }) {
    return axios.post(this.POKE_BE_URL + "/user/item", data);
  }
  get(token?: any) {
    return axios.get(this.POKE_BE_URL + "/user/item", {
      headers: {
        token: token,
      },
    });
  }
  getOne(item: any) {
    return axios.get(this.POKE_BE_URL + "/user/item/" + item);
  }
  update(item: string, data: { nickname: string }) {
    return axios.put(this.POKE_BE_URL + "/user/item/" + item, data);
  }
  bet() {
    return axios.post(this.POKE_BE_URL + "/user/item/bet");
  }
  delete(item: any) {
    return axios.delete(this.POKE_BE_URL + "/user/item/" + item);
  }
}

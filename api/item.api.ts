import axios from "axios";

export class PokemonApi {
  pokemonApi = "https://pokeapi.co/api/v2";
  get(query?: any) {
    return axios.get(this.pokemonApi + "/pokemon", {
      params: {
        ...query,
      },
    });
  }
  getOne(id: any) {
    return axios.get(this.pokemonApi + "/pokemon/" + id);
  }
}

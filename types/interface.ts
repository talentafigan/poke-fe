export interface IContainer {
  children?: any;
}

export interface IPokemon {
  name: string;
  url: string;
  nickname?: string;
  onSelect: Function;
}

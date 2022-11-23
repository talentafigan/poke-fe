import { Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PokemonApi } from "../../../api/item.api";
import { ItemApi } from "../../../api/user.api";
import CardPokemon from "../../../components/common/CardPokemon";
import LayoutContainer from "../../../components/layout/Container";
import { IPokemon } from "../../../types/interface";

export default function PageAccountItem() {
  const itemApi = new ItemApi();
  const pokemonApi = new PokemonApi();
  const router = useRouter();
  const [items, setItem] = useState<any[]>([]);
  const [collection, setCollection] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchOwnedItem = async () => {
    try {
      setIsLoading(true);
      const resp = await itemApi.get(localStorage.getItem("token"));
      setCollection(resp.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const fetchItem = async () => {
    collection.map(async (v: any) => {
      try {
        const resp = await pokemonApi.getOne(v.item);
        setItem((prevState) => [
          ...prevState,
          { ...resp.data, nickname: v.nickname },
        ]);
      } catch (error) {
        console.log(error);
      }
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchOwnedItem();
    return () => console.log("app destroyed");
  }, []);

  useEffect(() => {
    if (collection.length !== 0) {
      fetchItem();
    }
  }, [collection]);
  return (
    <LayoutContainer>
      <div className="flex justify-start items-start flex-col">
        <span className="px-4 font-[700] text-xl">My Collection</span>
        <div className="grid gap-4 px-4 py-4 w-full mt-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((v) => {
            return (
              <div className="flex justify-center items-center">
                <CardPokemon
                  onSelect={(id: string) => {
                    router.push("/account/item/" + id);
                  }}
                  url={v.url}
                  nickname={v.nickname}
                  name={v.name}
                ></CardPokemon>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center items-center flex-col py-4">
          {isLoading && <Loading />}
        </div>
      </div>
    </LayoutContainer>
  );
}

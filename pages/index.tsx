import LayoutContainer from "../components/layout/Container";
import CardPokemon from "../components/common/CardPokemon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PokemonApi } from "../api/item.api";
import { IPokemon } from "../types/interface";
import { Loading } from "@nextui-org/react";
import CommonObserver from "../components/common/Observer";

export default function PageIndex() {
  const pokemonApi = new PokemonApi();
  const [items, setItem] = useState<IPokemon[]>([]);
  const [query, setQuery] = useState({
    limit: 20,
    offset: 0,
  });
  const [next, setNext] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetchPokemon();
  }, []);
  useEffect(() => {
    fetchPokemon(true);
  }, [query]);
  const fetchPokemon = async (nonInit: boolean = false) => {
    try {
      setIsLoading(true);
      const resp = await pokemonApi.get(query);
      setNext(resp.data.next);
      if (nonInit) {
        let templateArray: IPokemon[] = [];
        const data = templateArray.concat(items, resp.data.results);
        setItem(data);
        return;
      }
      setItem(resp.data.results);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };
  const onIntersect = () => {
    if (next !== null && !isLoading) {
      setQuery((currentQuery) => ({
        ...currentQuery,
        offset: currentQuery.offset + currentQuery.limit,
      }));
    }
  };
  return (
    <LayoutContainer>
      <div className="grid gap-4 px-4 py-4 w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((v) => {
          return (
            <div className="flex justify-center items-center">
              <CardPokemon
                onSelect={(id: string) => {
                  router.push("/item/" + id);
                }}
                url={v.url}
                name={v.name}
              ></CardPokemon>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center flex-col py-4">
        {isLoading && <Loading />}
      </div>
      {items.length > 0 && <CommonObserver onIntersecting={onIntersect} />}
    </LayoutContainer>
  );
}

import LayoutContainer from "../../components/layout/Container";
import { PokemonApi } from "../../api/item.api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Button, Loading } from "@nextui-org/react";
import helpers from "../../plugins/helpers";
import CommonProgressBar from "../../components/common/ProgressBar";

export default function PageDetailItem() {
  const router = useRouter();
  const pokemonApi = new PokemonApi();
  const { id } = router.query;
  const [item, setItem] = useState<any>({});
  const [gender, setGender] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const resp = await pokemonApi.getOne(id);
      setItem(resp.data);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!id) return;
    fetchPokemon();
  }, [id]);
  function MoveListComponent() {
    return (
      <div className="w-full flex flex-wrap">
        {item.moves
          ? item.moves.map((v: any, index: any) => {
              if (index < 15) {
                return (
                  <Badge
                    className="cursor-pointer"
                    color="primary"
                    variant="flat"
                  >
                    {helpers.capitalizationFormat(
                      helpers.removeDashString(v.move.name)
                    )}
                  </Badge>
                );
              }
            })
          : ""}
        <Badge color="primary" variant="flat">
          ...
        </Badge>
      </div>
    );
  }
  function TypeListComponent() {
    return (
      <div className="w-full flex flex-wrap">
        {item.types
          ? item.types.map((v: any, index: any) => {
              if (index < 15) {
                return (
                  <Badge
                    className="cursor-pointer"
                    color="warning"
                    variant="flat"
                  >
                    {helpers.capitalizationFormat(
                      helpers.removeDashString(v.type.name)
                    )}
                  </Badge>
                );
              }
            })
          : ""}
      </div>
    );
  }
  function PokemonStatsListComponent() {
    return (
      <div className="bg-gray-100 rounded-xl p-4 flex justify-start flex-col items-start w-full">
        {item.stats
          ? item.stats.map((data: any) => {
              return (
                <div className="w-full flex flex-col my-1">
                  <span className="text-sm font-[500] mb-2">
                    {helpers.capitalizationFormat(
                      helpers.removeDashString(data.stat.name)
                    )}
                  </span>
                  <CommonProgressBar
                    value={`${data.base_stat}`}
                    color="#fd79a8"
                  />
                </div>
              );
            })
          : ""}
      </div>
    );
  }
  function PokemonDeailComponent() {
    return (
      <div className="md:mt-5 mb-5 md:mb-5 grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="md:border md:h-[70vh] p-10 rounded-xl w-full flex justify-center items-center flex-col">
          <img
            src={item.sprites ? item.sprites.front_default : ""}
            alt={item.name}
            className="h-[40vh]"
          />
        </div>
        <div className="px-5 md:px-10 flex justify-start items-start flex-col">
          <span className="text-4xl font-[700]">
            {helpers.capitalizationFormat(item.name)}
          </span>
          <span className="font-[700] text-gray-400 mt-4 mb-2">Summary</span>
          <div className="grid w-full grid-cols-2">
            <div className="flex flex-col w-full">
              <span className="text-sm font-[500]">height</span>
              <span>{item.height}</span>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-sm font-[500]">weight</span>
              <span>{item.weight}</span>
            </div>
          </div>
          <div className="grid w-full grid-cols-2"></div>
          <span className="font-[700] text-gray-400 mt-4 mb-2">Type</span>
          <TypeListComponent />
          <span className="font-[700] text-gray-400 mt-4 mb-2">Moves</span>
          <MoveListComponent />
          <Button className="mt-4">Catch Pokemon</Button>
          <span className="font-[700] text-gray-400 mt-4 mb-2">Stats</span>
          <PokemonStatsListComponent />
        </div>
      </div>
    );
  }
  return (
    <LayoutContainer>
      {isLoading && (
        <div className="w-full flex justify-center items-center flex-col py-4">
          <Loading />
        </div>
      )}
      {!isLoading && <PokemonDeailComponent />}
    </LayoutContainer>
  );
}

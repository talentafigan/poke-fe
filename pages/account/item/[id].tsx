import LayoutContainer from "../../../components/layout/Container";
import { PokemonApi } from "../../../api/item.api";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Input, Loading, Modal } from "@nextui-org/react";
import helpers from "../../../plugins/helpers";
import { ItemApi } from "../../../api/user.api";
import { toast } from "react-toastify";

export default function PageDetailItem() {
  const router = useRouter();
  const pokemonApi = new PokemonApi();
  const pokemonNicknameRef = useRef(null) as any;
  const itemApi = new ItemApi();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<any>({});
  const [item, setItem] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSavePokemon, setIsLoadingSavePokemon] = useState(false);
  const [isLoadingReleasePokemon, setIsLoadingReleasePokemon] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const resp = await pokemonApi.getOne(id);
      setPokemon(resp.data);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };
  const savePokemon = async () => {
    console.log("hello");
    try {
      setIsLoadingSavePokemon(true);
      const resp = await itemApi.update(item.item, {
        nickname: pokemonNicknameRef.current.value,
      });
      setDialogEdit(false);
      router.push("/account/item");
    } catch (error) {
      toast.error("Failed Save Pokemon , Try Again Later", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    } finally {
      setIsLoadingSavePokemon(false);
    }
  };
  const fetchItem = async () => {
    try {
      setIsLoading(true);
      const resp = await itemApi.getOne(id);
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
    fetchItem();
  }, [id]);

  function MoveListComponent() {
    return (
      <div className="w-full flex flex-wrap">
        {pokemon.moves
          ? pokemon.moves.map((v: any, index: any) => {
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
  const onReleaseItem = async () => {
    try {
      setIsLoadingReleasePokemon(true);
      const resp = await itemApi.delete(router.query.id);
      router.push("/account/item");
    } catch (error) {
      toast.error("Failed Release Pokemon , Try Again Later", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    } finally {
      setIsLoadingReleasePokemon(false);
    }
  };
  function TypeListComponent() {
    return (
      <div className="w-full flex flex-wrap">
        {pokemon.types
          ? pokemon.types.map((v: any, index: any) => {
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

  function PokemonDeailComponent() {
    return (
      <div className="md:mt-5 mb-5 md:mb-5 grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="md:border md:h-[70vh] p-10 rounded-xl w-full flex justify-center items-center flex-col">
          <img
            src={pokemon.sprites ? pokemon.sprites.front_default : ""}
            alt={pokemon.name}
            className="h-[40vh]"
          />
        </div>
        <div className="px-5 md:px-10 flex justify-start items-start flex-col">
          <span className="text-4xl font-[700]">
            {helpers.capitalizationFormat(pokemon.name)}
          </span>
          {!dialogEdit && (
            <div className="flex h-10 justify-center items-center flex-row">
              <span>{item.nickname}</span>
              <Button
                onClick={() => setDialogEdit(!dialogEdit)}
                className="ml-2"
                size={"xs"}
                auto
              >
                edit
              </Button>
            </div>
          )}
          {dialogEdit && (
            <div className="flex h-10 justify-center items-center flex-row">
              <Input
                bordered
                fullWidth
                ref={pokemonNicknameRef}
                color="primary"
                size="xs"
              />
              <Button
                disabled={isLoadingSavePokemon}
                onClick={savePokemon}
                className="ml-2"
                size={"xs"}
                auto
              >
                save
              </Button>
              <Button
                onClick={() => {
                  setDialogEdit(false);
                }}
                className="ml-2"
                size={"xs"}
                color={"error"}
                auto
              >
                cancel
              </Button>
            </div>
          )}
          <span className="font-[700] text-gray-400 mt-4 mb-2">Summary</span>
          <div className="grid w-full grid-cols-2">
            <div className="flex flex-col w-full">
              <span className="text-sm font-[500]">height</span>
              <span>{pokemon.height}</span>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-sm font-[500]">weight</span>
              <span>{pokemon.weight}</span>
            </div>
          </div>
          <div className="grid w-full grid-cols-2"></div>
          <span className="font-[700] text-gray-400 mt-4 mb-2">Type</span>
          <TypeListComponent />
          <span className="font-[700] text-gray-400 mt-4 mb-2">Moves</span>
          <MoveListComponent />
          <Button
            onClick={onReleaseItem}
            disabled={isLoadingReleasePokemon}
            className="mt-4"
            color={"error"}
          >
            Release
          </Button>
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

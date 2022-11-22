import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PokemonApi } from "../../api/item.api";
import { IPokemon } from "../../types/interface";
export default function CardPokemon(props: IPokemon) {
  const [item, setItem] = useState<{ front_default: string; id: string }>({
    front_default: "",
    id: "",
  });
  const pokemonApi = new PokemonApi();
  const fetchDetail = async () => {
    try {
      const resp = await pokemonApi.getOne(props.name);
      setItem({
        front_default: resp.data.sprites.front_default,
        id: resp.data.id,
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchDetail();
  }, [props.name]);
  const onClickedCard = () => {
    props.onSelect(item.id);
  };
  return (
    <Card onClick={onClickedCard} isPressable variant="bordered">
      <Card.Body css={{ p: 30 }} className="bg-[#a29bfe]">
        <img src={item.front_default} alt="" />
      </Card.Body>
      <Card.Footer>
        <div className="flex justify-center flex-col items-center w-full">
          <span className="font-[700]">{props.name}</span>
          {props.nickname && <span className="text-xs">{props.nickname}</span>}
        </div>
      </Card.Footer>
    </Card>
  );
}

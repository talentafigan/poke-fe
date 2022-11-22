import { User } from "iconoir-react";
export default function CommonAvatar(props: { onPress: Function }) {
  return (
    <div
      onClick={() => props.onPress()}
      className="cursor-pointer flex justify-center items-center rounded-full h-[45px] w-[45px] bg-[#fdcb6e]"
    >
      <span className="font-[700] text-base text-white">
        <User strokeWidth={2} color="" />
      </span>
    </div>
  );
}

import { Navbar } from "@nextui-org/react";
import CommonAvatar from "../common/Avatar";
import Image from "next/image";
import AssetBrand from "../../assets/img/brand.png";
import { useRouter } from "next/router";

export default function LayoutAppbar() {
  const router = useRouter();
  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex justify-center items-center flex-row"
        >
          <Image width={25} height={25} src={AssetBrand} alt="Pokemon" />
          <span className="font-[700] text-xl ml-1">Pokemon</span>
        </div>
      </Navbar.Brand>
      <Navbar.Content>
        <CommonAvatar
          onPress={() => {
            router.push("/account");
          }}
        />
      </Navbar.Content>
    </Navbar>
  );
}

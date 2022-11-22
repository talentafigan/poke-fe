import { Grid } from "@nextui-org/react";
import LayoutAppbar from "./Appbar";
import { IContainer } from "../../types/interface";
import { useEffect } from "react";

export default function LayoutContainer(props: IContainer) {
  useEffect(() => {}, []);
  return (
    <Grid.Container>
      <Grid xs={12}>
        <div className="w-full flex flex-col min-h-screen">
          <LayoutAppbar />
          <div className="grid grid-cols-12">
            <div className="flex col-span-12 mt-10 sm:col-span-10 col-start-0 sm:col-start-2 flex-col w-full">
              {props.children}
            </div>
          </div>
        </div>
      </Grid>
    </Grid.Container>
  );
}

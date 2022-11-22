import type { AppProps } from "next/app";
import "../assets/styles/main.css";
import "../assets/styles/font.css";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

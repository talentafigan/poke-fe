import type { AppProps } from "next/app";
import "../assets/styles/main.css";
import "../assets/styles/font.css";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { authInitalizator } from "../plugins/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    authInitalizator();
    return () => console.log("app destroyed");
  }, []);
  return (
    <NextUIProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

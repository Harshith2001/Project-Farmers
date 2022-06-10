import "../styles/globals.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import UserContext, { UserContextData } from "../lib/UserContext";
import { useState } from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [userData, setUserData] = useState<UserContextData | null>(null);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </UserContext.Provider>
  );
}

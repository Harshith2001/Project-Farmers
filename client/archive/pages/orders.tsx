import { AppShell, Header, Navbar } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";

import data from "../components/data";
import HeaderMenuColored from "../../components/NavHeader";
import UserContext from "../../lib/UserContext";

const Home: NextPage = () => {
  useEffect(() => {
    // redirect to login page if not logged in
    if (!localStorage.getItem("jwt")) {
      Router.push("/");
    }
  }, []);

  return (
    <UserContext.Provider value={JSON.parse(localStorage.getItem("userData") || "{}")}>
      <>
        <Head>
          <title>Orders</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="stylesheet" href="/styles/profile.css" />
          <link rel="stylesheet" href="/styles/orders.css" />
          <link rel="stylesheet" href="/styles/nav.css" />
        </Head>
        <AppShell padding={0} header={<HeaderMenuColored />}>
          <div className="orderBox">
            {data.map((dat) => {
              const { img, cropName, price } = dat;
              return (
                <div className="order" style={{ marginLeft: 5, marginRight: 5 }}>
                  <img src={img} alt=""></img>
                  <h1>{cropName}</h1>
                  <h4>{price}</h4>
                </div>
              );
            })}
          </div>
        </AppShell>
      </>
    </UserContext.Provider>
  );
};

export default Home;
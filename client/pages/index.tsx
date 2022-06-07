import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AuthenticationForm } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project Farmers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/login.css" />
      </Head>
      {/* <Login /> */}
      <AuthenticationForm />
    </div>
  );
};

export default Home;

//IIFE
/*
(async function getData() {
	let y = {
		id: "3",
		userType: "farmer",
		firstName: "ultraman",
		lastName: "dotnet",
		email: "harsh@gmail.com",
		mobile: "1234037159",
		city: "Guntur",
	};

	let x = await fetch("http://localhost:3100/api/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(y),
	});
	let z = await x.json();
	console.log(z);
})();
*/

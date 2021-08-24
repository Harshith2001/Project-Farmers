import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Login from "../components/login";
const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Project Farmers- Login Page</title>
				<meta name="description" content="Generated by create next app" />

				<link rel="stylesheet" href="/styles/login.css" />
			</Head>
			<Login />
		</>
	);
};

export default Home;

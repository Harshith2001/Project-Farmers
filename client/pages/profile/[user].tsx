import type { InferGetServerSidePropsType, NextPage } from "next";
import React from "react";
import Profile from "../../components/profile";
import Head from "next/head";

type user = {
	userId: string;
	name: string;
	userType: string;
	email: string;
	mobile: string;
	city: string;
} | null;

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	let content;
	if (data == null) {
		content = <div>User not found</div>;
	} else {
		content = <Profile user={data} />;
	}

	return (
		<>
			<Head>
				<title>Profile</title>
				<meta name="description" content="Generated by create next app" />
				<link
					rel="stylesheet"
					id="bootstrap-css"
					href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
				/>
				<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
				<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

				<link rel="stylesheet" href="/styles/profile.css" />
				<link rel="stylesheet" href="/styles/nav.css" />
			</Head>
			{content}
		</>
	);
};

export const getServerSideProps = async (context: any) => {
	// let router = useRouter();
	// Fetch data from external API
	let data: user = null;
	try {
		const res = await fetch(process.env.API_URL + "/api/user/" + context.params.user);
		data = await res.json();
	} catch (error) {
		console.log(error);
	}

	if (context.params.user === "admin") {
		data = {
			userId: "THE ADMIN",
			userType: "farmer",
			name: "DEVIL MAN",
			email: "godzilla@roar.com",
			mobile: "7894561230",
			city: "Pacafic Ocean",
		};
	}
	// Pass data to the page via props
	return { props: { data } };
};

export default Home;

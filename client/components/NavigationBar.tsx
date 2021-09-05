import { Button, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Nav = styled.div`
	padding: 0 10px;
	width: 100%;
	height: 64px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: azure;
	box-shadow: 0 0 20px black;

	h1 {
		font-size: 32px;
		font-weight: normal;
		padding: 5px 10px;
		margin: 0;
		background-color: burlywood;
		border-radius: 5px;
	}

	.nav_links {
		display: flex;
		width: 100px;
	}
`;

export default class NavBar extends React.Component<{ userData: any }, {}> {
	userData: any;

	constructor(props: any) {
		super(props);

		if (typeof window !== "undefined") {
			let data = localStorage.getItem("userData");
			let userId = localStorage.getItem("userId");

			if (data) {
				this.userData = JSON.parse(data);
			} else if (userId) {
				fetch(process.env.API_URL + "/api/user/" + userId, { method: "GET" })
					.then((res) => res.json())
					.then((data) => {
						localStorage.setItem("userData", JSON.stringify(data));
						this.userData = data;
					});
			} else {
				this.userData = null;
			}

			console.log(data);
		}
	}

	render() {
		return (
			<Nav>
				<h1>Project Farmers</h1>
				<div className="nav_links">
					<div id="nav_profile">
						<Button variant="contained" color="secondary">
							Profile
						</Button>
					</div>
				</div>
			</Nav>
		);
	}
}

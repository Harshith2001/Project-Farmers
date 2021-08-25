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

export default class NavBar extends React.Component {
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

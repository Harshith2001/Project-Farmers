import React from "react";
import { Form, Field } from "@leveluptuts/fresh";
import NavBar from "./NavigationBar";

// const onSubmit = (data) => console.log(data);
export default class Orders extends React.Component {
	onSubmit = (data) => {
		console.log(data);
	};

	render() {
		return (
			<>
				<NavBar />
				{/* <div id="abc">
				<nav>
					<ul>
						<li>
							<a href="/dashboard">Home</a>
						</li>
						<li>
							<a href="/profile">View Profile</a>
						</li>
						<li>
							<a href="/addCrops">Add crops</a>
						</li>
						<li>
							<a href="/orders">Orders</a>
						</li>
						<li>
							<a href="/">Logout</a>
						</li>
					</ul>
				</nav>
			</div> */}
				<Form formId="user-profile" onSubmit={this.onSubmit}>
					<Field required>Name of crop</Field>
					<Field required>Quantity</Field>
					<Field required>Price (per kg)</Field>
				</Form>
			</>
		);
	}
}

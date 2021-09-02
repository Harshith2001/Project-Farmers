import React, { Component } from "react";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.formSubmit = this.formSubmit.bind(this);
		this.userId = React.createRef();
		this.password = React.createRef();
	}

	formSubmit() {
		let req = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: this.userId.current.value,
				password: this.password.current.value,
			}),
		};
		fetch(process.env.API_URL + "/auth/login", req)
			.then((x) => x.json())
			.then((x) => {
				console.log(x);
				if (x.success) {
					localStorage.setItem("userId", x.userId);
				} else {
					alert(x.message);
				}
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		//console.log(process.env.API_URL);
		fetch(process.env.API_URL + "/api/user")
			.then((x) => x.json())
			.then((data) => console.log(data));
		return (
			<div className="form-box">
				<div className="header-text">LOGIN FOR </div>

				<input ref={this.userId} placeholder="Enter your User ID" type="text" />
				<input ref={this.password} placeholder="Enter Password" type="password" />

				<button onClick={this.formSubmit}>login</button>
				<div className="align">
					Don't have an account? <a href="/signup">Register Here</a>
				</div>
			</div>
		);
	}
}

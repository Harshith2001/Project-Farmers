import Link from "next/link";
import React, { Component } from "react";

export default class SignUp extends Component {
	userId = React.createRef<HTMLInputElement>();
	password = React.createRef<HTMLInputElement>();
	name = React.createRef<HTMLInputElement>();
	userType = React.createRef<HTMLInputElement>();
	email = React.createRef<HTMLInputElement>();

	constructor(props: any) {
		super(props);
		this.formSubmit = this.formSubmit.bind(this);
	}

	formSubmit() {
		let req = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: this.userId.current?.value,
				password: this.password.current?.value,
				name: this.name.current?.value,
				userType: this.userType.current?.value,
				email: this.email.current?.value,
			}),
		};
		fetch(process.env.API_URL + "/auth/signup", req)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.success) {
					localStorage.setItem("userId", res.userId);
				} else {
					alert(res.message);
				}
			});
	}

	render() {
		return (
			<div className="form-box">
				<div className="header-text">REGISTRATION FORM</div>

				<input ref={this.name} placeholder="Enter Your Name" type="text" />
				<input ref={this.email} placeholder="Enter Email Address" type="text" />
				<input ref={this.userId} placeholder="Enter Email Address" type="text" />
				<input ref={this.password} placeholder="Your Password" type="password" />
				<label htmlFor="farmerCheckbox" id="farmerCheckbox">
					<input ref={this.userType} name="farmerCheckbox" type="checkbox" /> Are you a Farmer?
				</label>

				<button onClick={this.formSubmit}>Register</button>

				<div className="align">
					<Link href="/">
						<a>Have an account? Login Here</a>
					</Link>
				</div>
			</div>
		);
	}
}

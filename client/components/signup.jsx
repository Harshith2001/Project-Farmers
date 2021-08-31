import React, { Component } from "react";

export default class SignUp extends Component {
	render() {
		return (
			<form>
				<div className="form-box">
					<div className="header-text">REGISTRATION FORM</div>

					<input placeholder="Enter Your Name" type="text" />
					<input placeholder="Enter Email Address" type="text" />
					<input placeholder="Your Password" type="password" />
					<input id="terms" type="checkbox" />
					<button type="submit">Register</button>
					<div className="align">
						Have an account? <a href="/">Login Here</a>
					</div>
				</div>
			</form>
		);
	}
}

import React, { Component } from "react";

export default class Login extends Component {
	render() {
		return (
			<form>
				<div className="form-box">
					<div className="header-text">LOGIN FOR </div>

					<input placeholder="Enter Email Address" type="text" />
					<input placeholder="Enter Password" type="password" />

					<button>login</button>
					<div className="align">
						Don't have an account? <a href="/signup">Register Here</a>
					</div>
				</div>
			</form>
		);
	}
}

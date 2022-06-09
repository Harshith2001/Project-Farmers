import React, { Component } from "react";
import NavBar from "../../components/NavHeader";

export default class Profile extends Component {
	render() {
		let { user } = this.props;
		return (
			<div>
				<NavBar />
				{/* <div id="abc">
					<nav>
						<ul>
							<li>
								<a href="/profile/dashboard">Home</a>
							</li>
							<li>
								<a href="/profile">View Profile</a>
							</li>
							<li>
								<a href="/addcrops">Add crops</a>
							</li>
							<li>
								<a href="/orders">Orders</a>
							</li>
							<li>
								<a href="/trans">Transaction</a>
							</li>
							<li>
								<a href="/">Logout</a>
							</li>
						</ul>
					</nav>
				</div> */}
				<div className="container emp-profile">
					<form method="post">
						<div className="row">
							<div className="col-md-6">
								<div className="profile-head">
									<h5>{user.name}</h5>

									<ul className="nav nav-tabs" id="myTab" role="tablist">
										<li className="nav-item">
											<a className="nav-link active" id="home-tab" href="#home">
												About
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-4"></div>
							<div className="col-md-8">
								<div className="tab-content profile-tab" id="myTabContent">
									<div
										className="tab-pane fade show active"
										id="home"
										role="tabpanel"
										aria-labelledby="home-tab"
									>
										<div className="row">
											<div className="col-md-6">
												<label>User Id</label>
											</div>
											<div className="col-md-6">
												<p>{user.userId}</p>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<label>Name</label>
											</div>
											<div className="col-md-6">
												<p>{user.name}</p>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<label>Email</label>
											</div>
											<div className="col-md-6">
												<p>{user.email}</p>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<label>Phone</label>
											</div>
											<div className="col-md-6">
												<p>{user.mobile}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

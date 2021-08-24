import React, { Component } from "react";

export default class dash extends Component {
	render() {
		return (
			<form>
				<div className="sidebar">
					<div className="logo-details">
						<i className="bx bxl-c-plus-plus"></i>
						<span className="logo_name">USER</span>
					</div>
					<ul className="nav-links">
						<li>
							<a href="/profile-user">
								<i className="bx bx-pie-chart-alt-2"></i>
								<span className="links_name">View profile</span>
							</a>
						</li>

						<li>
							<a href="/trans">
								<i className="bx bx-box"></i>
								<span className="links_name">Transaction</span>
							</a>
						</li>

						<li className="log_out">
							<a href="/">
								<i className="bx bx-log-out"></i>
								<span className="links_name">Log out</span>
							</a>
						</li>
					</ul>
				</div>

				<section className="home-section">
					<nav>
						<div className="sidebar-button">
							<i className="bx bx-menu sidebarBtn"></i>
							<span className="dashboard">DASHBOARD</span>
						</div>
						<div className="search-box">
							<input type="text" placeholder="Search..." />
							<i className="bx bx-search"></i>
						</div>
						{/* <div className="profile-details">
        <!--<img src="images/profile.jpg" alt="">-->
        <span className="admin_name">Prem Shahi</span>
        <i class='bx bx-chevron-down'><i/>
      </div> */}
					</nav>
				</section>
			</form>
		);
	}
}

import React, { Component } from "react";

export default class dash extends Component {
	render() {
		return (
			<form>
				<div className="sidebar">
					<div className="logo-details">
						<i class="bx bxl-c-plus-plus"></i>
						<span className="logo_name">FARMER</span>
					</div>
					<ul className="nav-links">
						<li>
							<a href="/profile">
								<i class="bx bx-pie-chart-alt-2"></i>
								<span className="links_name">View profile</span>
							</a>
						</li>

						<li>
							<a href="/addcrops">
								<i class="bx bx-box"></i>
								<span className="links_name">Add crop</span>
							</a>
						</li>
						<li>
							<a href="/orders">
								<i class="bx bx-list-ul"></i>
								<span className="links_name">Orders</span>
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
								<i class="bx bx-log-out"></i>
								<span className="links_name">Log out</span>
							</a>
						</li>
					</ul>
				</div>

				<section className="home-section">
					<nav>
						<div className="sidebar-button">
							<i class="bx bx-menu sidebarBtn"></i>
							<span className="dashboard">DASHBOARD</span>
						</div>
						<div className="search-box">
							<input type="text" placeholder="Search..." />
							<i class="bx bx-search"></i>
						</div>
					</nav>
				</section>
			</form>
		);
	}
}

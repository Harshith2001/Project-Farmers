import React from "react";
import data from "./data.js";

export default function Orders() {
	return (
		<div>
			<div id="abc">
				<nav>
					<ul>
						<li>
							<a href="/dashboard">Home</a>
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
							<a href="/">Logout</a>
						</li>
					</ul>
				</nav>
			</div>
			<div className="orderBox">
				{data.map((dat) => {
					const { img, cropName, price } = dat;
					return (
						<div className="order" style={{ marginLeft: 5, marginRight: 5 }}>
							<img src={img} alt=""></img>
							<h1>{cropName}</h1>
							<h4>{price}</h4>
						</div>
					);
				})}
			</div>
		</div>
	);
}

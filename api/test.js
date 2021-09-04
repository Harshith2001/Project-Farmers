import fetch from "node-fetch";

fetch(
	"https://router.hereapi.com/v8/routes?transportMode=car&origin=12.283190700320462,76.64588444966876&destination=17.0005,81.8040&return=summary&apiKey=9s5tG3t92t9JLBKSySwXCWlzgj-2XnW73It4sOW13wA",
	{
		method: "GET",
		headers: { "Content-Type": "application/json" },
	}
)
	.then((response) => {
		return response.json();
	})
	.then((data) => console.log(data))
	.catch((err) => {
		console.log(err);
	});

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	env: {
		API_URL: "http://localhost:3100",
	},
};

import fs from "fs";

class database {
	constructor(fileName) {
		this.fileName = fileName;
	}
	read() {
		return JSON.parse(fs.readFileSync(this.fileName));
	}
	write(data) {
		fs.writeFileSync(this.fileName, JSON.stringify(data));
	}
}

export default database;

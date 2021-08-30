import fs from "fs";

class database {
	constructor(fileName) {
		this.fileName = fileName;
	}
	read() {
		return fs.readFileSync(this.fileName, "utf-8");
	}
	write(data) {
		fs.writeFileSync(this.fileName, JSON.stringify(data));
	}
}

export default database;

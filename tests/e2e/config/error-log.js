class ErrorLog {
	log;

	constructor() {
		this.log = '';
	}

	addToLog( message ) {
		this.log += `\n${ message }`;
	}

	get() {
		return this.log;
	}
}

module.exports = new ErrorLog();

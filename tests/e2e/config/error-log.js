class ErrorLog {
	constructor() {
		this.log = '';
	}

	add( message ) {
		this.log += `\n${ message }`;
	}

	get() {
		return this.log;
	}
}

module.exports = new ErrorLog();

class ErrorLog {
	constructor() {
		this.screenshot = '';
		this.dom = '';
	}

	setScreenshot( screenshot ) {
		this.screenshot = screenshot;
	}

	setDom( dom ) {
		this.dom = dom;
	}

	getDom() {
		return this.dom;
	}

	get() {
		return `Here is a screenshot of when the test failed: \n \ndata:image/jpeg;base64,${ this.screenshot } \nAnd here is the HTML of the entire document: \n \n${ this.dom }`;
	}
}

module.exports = new ErrorLog();

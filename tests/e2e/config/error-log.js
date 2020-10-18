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

	getConsoleMessage() {
		return `Here is a screenshot of when the test failed: \n \ndata:image/jpeg;base64,${ this.screenshot } \n`;
	}
}

module.exports = new ErrorLog();

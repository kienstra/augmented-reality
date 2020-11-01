class ErrorLog {
	constructor() {
		this.screenshot = '';
		this.dom = '';
		this.networkErrors = [];
		this.loadingFailed = [];
	}

	setScreenshot( screenshot ) {
		this.screenshot = screenshot;
	}

	setDom( dom ) {
		this.dom = dom;
	}

	addNetworkError( error ) {
		this.networkErrors.push( error );
	}

	addLoadingFailed( error ) {
		this.loadingFailed.push( error );
	}

	getScreenshotMessage() {
		return `Here is a screenshot of when the test failed: \n \ndata:image/jpeg;base64,${ this.screenshot } \n`;
	}

	getDom() {
		return this.dom;
	}

	getNetworkErrors() {
		if ( this.networkErrors.length > 1 ) {
			return `💡 Here are the network errors, starting with the latest: \n \n${ JSON.stringify(
				this.networkErrors.reverse(),
				null,
				2
			) } \n`;
		}

		if ( this.networkErrors.length === 1 ) {
			return `💡 There was a network error that might be related: \n \n${ JSON.stringify(
				this.networkErrors,
				null,
				2
			) } \n`;
		}

		return `There was no network error`;
	}

	getLoadingFailedErrors() {
		if ( ! this.loadingFailed.length ) {
			return;
		}

		if ( this.loadingFailed.length > 1 ) {
			return `💡 Here are the loadingFailed errors, starting with the latest: \n \n${ JSON.stringify(
				this.loadingFailed.reverse(),
				null,
				2
			) } \n`;
		}

		if ( this.loadingFailed.length === 1 ) {
			return `💡 There was a loadingFailed error that might be related: \n \n${ JSON.stringify(
				this.networkErrors,
				null,
				2
			) } \n`;
		}
	}
}

module.exports = new ErrorLog();

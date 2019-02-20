/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/**\n * General block libraries and the block name.\n */\nvar __ = wp.i18n.__,\n    registerBlockType = wp.blocks.registerBlockType,\n    MediaUpload = wp.editor.MediaUpload,\n    _wp$components = wp.components,\n    Button = _wp$components.Button,\n    Placeholder = _wp$components.Placeholder,\n    arViewerBlock = 'augmented-reality/ar-viewer';\n\n/**\n * Registers the AR Viewer block.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (registerBlockType(arViewerBlock, {\n\ttitle: __('AR Viewer', 'augmented-reality'),\n\tdescription: __('Place a virtual item in your location', 'augmented-reality'),\n\tcategory: 'common',\n\ticon: 'embed-generic',\n\tkeywords: [__('Augmented Reality', 'augmented-reality')],\n\tattributes: {\n\t\tobjUrl: {\n\t\t\ttype: 'string'\n\t\t},\n\t\tmtlUrl: {\n\t\t\ttype: 'string'\n\t\t}\n\t},\n\n\t/**\n  * Gets the block editor UI.\n  *\n  * @param {Object} props The editor properties.\n  * @returns {string} The markup of the editor UI.\n  */\n\tedit: function edit(props) {\n\t\tvar _props$attributes = props.attributes,\n\t\t    objUrl = _props$attributes.objUrl,\n\t\t    mtlUrl = _props$attributes.mtlUrl,\n\t\t    className = props.className,\n\t\t    noticeUI = props.noticeUI,\n\t\t    setAttributes = props.setAttributes,\n\t\t    getViewerWrapper = function getViewerWrapper(url, fileType) {\n\t\t\treturn wp.element.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'ar-viewer-wrapper' },\n\t\t\t\t!url ? wp.element.createElement(MediaUpload, {\n\t\t\t\t\tonSelect: function onSelect(img) {\n\t\t\t\t\t\tvar attributes = {};\n\t\t\t\t\t\tattributes[fileType + 'Url'] = img.url;\n\t\t\t\t\t\tsetAttributes(attributes);\n\t\t\t\t\t},\n\t\t\t\t\ttype: 'image',\n\t\t\t\t\tvalue: url,\n\t\t\t\t\trender: function render(_ref) {\n\t\t\t\t\t\tvar open = _ref.open;\n\t\t\t\t\t\treturn wp.element.createElement(\n\t\t\t\t\t\t\tButton,\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tclassName: 'button button-large',\n\t\t\t\t\t\t\t\tonClick: open\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t__('Select %s file', 'augmented-reality').replace('%s', fileType)\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t}) : wp.element.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\tnull,\n\t\t\t\t\twp.element.createElement(\n\t\t\t\t\t\t'span',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\turl.match('[^\\\\/]+\\\\.+' + fileType + '$') ? url.match('[^\\\\/]+\\\\.+' + fileType + '$')[0] : null /* Display only the file name and extension, for example foo.obj instead of path/to/foo.obj */\n\t\t\t\t\t),\n\t\t\t\t\turl ? wp.element.createElement(\n\t\t\t\t\t\tButton,\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tclassName: 'button button-large',\n\t\t\t\t\t\t\tonClick: function onClick() {\n\t\t\t\t\t\t\t\tvar attributes = {};\n\t\t\t\t\t\t\t\tattributes[fileType + 'Url'] = null;\n\t\t\t\t\t\t\t\tsetAttributes(attributes);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t},\n\t\t\t\t\t\t__('Remove %s file', 'augmented-reality').replace('%s', fileType)\n\t\t\t\t\t) : null\n\t\t\t\t)\n\t\t\t);\n\t\t};\n\n\t\treturn wp.element.createElement(\n\t\t\t'div',\n\t\t\t{ className: className },\n\t\t\twp.element.createElement(\n\t\t\t\tPlaceholder,\n\t\t\t\t{\n\t\t\t\t\tchildren: 'this',\n\t\t\t\t\tlabel: __('Augmented Reality Viewer', 'augmented-reality'),\n\t\t\t\t\tinstructions: !objUrl || !mtlUrl ? __('Please select both files', 'augmented-reality') : null,\n\t\t\t\t\ticon: 'gallery',\n\t\t\t\t\tclassName: 'foo',\n\t\t\t\t\tnotices: noticeUI\n\t\t\t\t},\n\t\t\t\tgetViewerWrapper(objUrl, 'obj'),\n\t\t\t\tgetViewerWrapper(mtlUrl, 'mtl')\n\t\t\t)\n\t\t);\n\t},\n\n\t/**\n  * Renders in PHP.\n  *\n  * @see Block::render_block().\n  * @returns {null} Rendered in PHP.\n  */\n\tsave: function save() {\n\t\treturn null;\n\t}\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Jsb2Nrcy9hci12aWV3ZXIvaW5kZXguanM/NGY3OCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdlbmVyYWwgYmxvY2sgbGlicmFyaWVzIGFuZCB0aGUgYmxvY2sgbmFtZS5cbiAqL1xudmFyIF9fID0gd3AuaTE4bi5fXyxcbiAgICByZWdpc3RlckJsb2NrVHlwZSA9IHdwLmJsb2Nrcy5yZWdpc3RlckJsb2NrVHlwZSxcbiAgICBNZWRpYVVwbG9hZCA9IHdwLmVkaXRvci5NZWRpYVVwbG9hZCxcbiAgICBfd3AkY29tcG9uZW50cyA9IHdwLmNvbXBvbmVudHMsXG4gICAgQnV0dG9uID0gX3dwJGNvbXBvbmVudHMuQnV0dG9uLFxuICAgIFBsYWNlaG9sZGVyID0gX3dwJGNvbXBvbmVudHMuUGxhY2Vob2xkZXIsXG4gICAgYXJWaWV3ZXJCbG9jayA9ICdhdWdtZW50ZWQtcmVhbGl0eS9hci12aWV3ZXInO1xuXG4vKipcbiAqIFJlZ2lzdGVycyB0aGUgQVIgVmlld2VyIGJsb2NrLlxuICovXG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckJsb2NrVHlwZShhclZpZXdlckJsb2NrLCB7XG5cdHRpdGxlOiBfXygnQVIgVmlld2VyJywgJ2F1Z21lbnRlZC1yZWFsaXR5JyksXG5cdGRlc2NyaXB0aW9uOiBfXygnUGxhY2UgYSB2aXJ0dWFsIGl0ZW0gaW4geW91ciBsb2NhdGlvbicsICdhdWdtZW50ZWQtcmVhbGl0eScpLFxuXHRjYXRlZ29yeTogJ2NvbW1vbicsXG5cdGljb246ICdlbWJlZC1nZW5lcmljJyxcblx0a2V5d29yZHM6IFtfXygnQXVnbWVudGVkIFJlYWxpdHknLCAnYXVnbWVudGVkLXJlYWxpdHknKV0sXG5cdGF0dHJpYnV0ZXM6IHtcblx0XHRvYmpVcmw6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnXG5cdFx0fSxcblx0XHRtdGxVcmw6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnXG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuICAqIEdldHMgdGhlIGJsb2NrIGVkaXRvciBVSS5cbiAgKlxuICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBUaGUgZWRpdG9yIHByb3BlcnRpZXMuXG4gICogQHJldHVybnMge3N0cmluZ30gVGhlIG1hcmt1cCBvZiB0aGUgZWRpdG9yIFVJLlxuICAqL1xuXHRlZGl0OiBmdW5jdGlvbiBlZGl0KHByb3BzKSB7XG5cdFx0dmFyIF9wcm9wcyRhdHRyaWJ1dGVzID0gcHJvcHMuYXR0cmlidXRlcyxcblx0XHQgICAgb2JqVXJsID0gX3Byb3BzJGF0dHJpYnV0ZXMub2JqVXJsLFxuXHRcdCAgICBtdGxVcmwgPSBfcHJvcHMkYXR0cmlidXRlcy5tdGxVcmwsXG5cdFx0ICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcblx0XHQgICAgbm90aWNlVUkgPSBwcm9wcy5ub3RpY2VVSSxcblx0XHQgICAgc2V0QXR0cmlidXRlcyA9IHByb3BzLnNldEF0dHJpYnV0ZXMsXG5cdFx0ICAgIGdldFZpZXdlcldyYXBwZXIgPSBmdW5jdGlvbiBnZXRWaWV3ZXJXcmFwcGVyKHVybCwgZmlsZVR5cGUpIHtcblx0XHRcdHJldHVybiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogJ2FyLXZpZXdlci13cmFwcGVyJyB9LFxuXHRcdFx0XHQhdXJsID8gd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KE1lZGlhVXBsb2FkLCB7XG5cdFx0XHRcdFx0b25TZWxlY3Q6IGZ1bmN0aW9uIG9uU2VsZWN0KGltZykge1xuXHRcdFx0XHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZXNbZmlsZVR5cGUgKyAnVXJsJ10gPSBpbWcudXJsO1xuXHRcdFx0XHRcdFx0c2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHR5cGU6ICdpbWFnZScsXG5cdFx0XHRcdFx0dmFsdWU6IHVybCxcblx0XHRcdFx0XHRyZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihfcmVmKSB7XG5cdFx0XHRcdFx0XHR2YXIgb3BlbiA9IF9yZWYub3Blbjtcblx0XHRcdFx0XHRcdHJldHVybiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRcdEJ1dHRvbixcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2J1dHRvbiBidXR0b24tbGFyZ2UnLFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s6IG9wZW5cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0X18oJ1NlbGVjdCAlcyBmaWxlJywgJ2F1Z21lbnRlZC1yZWFsaXR5JykucmVwbGFjZSgnJXMnLCBmaWxlVHlwZSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSA6IHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHRcdCdzcGFuJyxcblx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHR1cmwubWF0Y2goJ1teXFxcXC9dK1xcXFwuKycgKyBmaWxlVHlwZSArICckJykgPyB1cmwubWF0Y2goJ1teXFxcXC9dK1xcXFwuKycgKyBmaWxlVHlwZSArICckJylbMF0gOiBudWxsIC8qIERpc3BsYXkgb25seSB0aGUgZmlsZSBuYW1lIGFuZCBleHRlbnNpb24sIGZvciBleGFtcGxlIGZvby5vYmogaW5zdGVhZCBvZiBwYXRoL3RvL2Zvby5vYmogKi9cblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdHVybCA/IHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHRcdEJ1dHRvbixcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnYnV0dG9uIGJ1dHRvbi1sYXJnZScsXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzW2ZpbGVUeXBlICsgJ1VybCddID0gbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0X18oJ1JlbW92ZSAlcyBmaWxlJywgJ2F1Z21lbnRlZC1yZWFsaXR5JykucmVwbGFjZSgnJXMnLCBmaWxlVHlwZSlcblx0XHRcdFx0XHQpIDogbnVsbFxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0J2RpdicsXG5cdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lIH0sXG5cdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFBsYWNlaG9sZGVyLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2hpbGRyZW46ICd0aGlzJyxcblx0XHRcdFx0XHRsYWJlbDogX18oJ0F1Z21lbnRlZCBSZWFsaXR5IFZpZXdlcicsICdhdWdtZW50ZWQtcmVhbGl0eScpLFxuXHRcdFx0XHRcdGluc3RydWN0aW9uczogIW9ialVybCB8fCAhbXRsVXJsID8gX18oJ1BsZWFzZSBzZWxlY3QgYm90aCBmaWxlcycsICdhdWdtZW50ZWQtcmVhbGl0eScpIDogbnVsbCxcblx0XHRcdFx0XHRpY29uOiAnZ2FsbGVyeScsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZm9vJyxcblx0XHRcdFx0XHRub3RpY2VzOiBub3RpY2VVSVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRnZXRWaWV3ZXJXcmFwcGVyKG9ialVybCwgJ29iaicpLFxuXHRcdFx0XHRnZXRWaWV3ZXJXcmFwcGVyKG10bFVybCwgJ210bCcpXG5cdFx0XHQpXG5cdFx0KTtcblx0fSxcblxuXHQvKipcbiAgKiBSZW5kZXJzIGluIFBIUC5cbiAgKlxuICAqIEBzZWUgQmxvY2s6OnJlbmRlcl9ibG9jaygpLlxuICAqIEByZXR1cm5zIHtudWxsfSBSZW5kZXJlZCBpbiBQSFAuXG4gICovXG5cdHNhdmU6IGZ1bmN0aW9uIHNhdmUoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYmxvY2tzL2FyLXZpZXdlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);
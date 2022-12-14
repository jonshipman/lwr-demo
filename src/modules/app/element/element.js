import { LightningElement } from 'lwc';

export default class Element extends LightningElement {
	literal = {
		false: false,
		null: null,
		true: true,
		undefined: undefined,
	};

	char = {
		blank: '\u2800',
		space: '\u00A0',
		zerowidth: '\u200B',
	};

	development =
		'development' === process.env.NODE_ENV ||
		'dev' === process.env.NODE_ENV;

	uid() {
		return (
			Date.now().toString(36) + Math.random().toString(36).substring(2)
		);
	}

	connectedCallback() {
		this._connected = true;
	}

	disconnectedCallback() {
		this._connected = false;
	}

	renderedCallback() {
		if (this._lightningonce) return;

		if (this.template?.host) {
			this._lightningonce = true;
			this.renderOnce();
		}
	}

	// Leave empty. Allows function class returns to call super.
	renderOnce() {}
}

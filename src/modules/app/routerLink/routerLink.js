import routes from 'app/routes';
import { api, LightningElement, track, wire } from 'lwc';
import { generateUrl, NavigationContext } from 'lwr/navigation';

export default class RouterLink extends LightningElement {
	@track _href;
	@api target;
	@api title;

	@wire(NavigationContext) navContext;

	@api set href(h) {
		this._href = h;
	}
	get href() {
		return this._href || false;
	}

	connectedCallback() {
		if (!this.href && this.navContext && this.type) {
			this._href = generateUrl(this.navContext, {
				type: this.type,
				attributes: this.atts,
			});
		}

		if (this.href && 0 === this.href.indexOf(window.location.origin)) {
			this._href = this.href.replace(window.location.origin, '');
		}
	}

	handleClick(event) {
		let route = routes.find((x) => x.uri === this.href);

		if (!route) {
			route = routes.find((x) => {
				let u = x.uri + '/';

				// Home links need to be '/'.
				if ('//' === u) {
					u = '/';
				}

				// If the item is a variable path, you can skip x.exact check and pass
				// in the string before the :.
				if (u.includes(':')) {
					u = x.uri.split(':')[0];
					return 0 === this.href.indexOf(u);
				}

				return false === x.exact && 0 === this.href.indexOf(u);
			});
		}

		if (route) {
			event.preventDefault();

			window.history.pushState({}, '', this.href);
			window.history.replaceState({}, '', this.href);

			const popStateEvent = new PopStateEvent('popstate', {});
			window.dispatchEvent(popStateEvent);
		}
	}
}

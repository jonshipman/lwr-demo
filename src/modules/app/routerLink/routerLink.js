import routes from 'app/routes';
import { api, LightningElement, wire } from 'lwc';
import { generateUrl, NavigationContext } from 'lwr/navigation';

export default class RouterLink extends LightningElement {
	@api href;
	@api target;
	@api title;

	@wire(NavigationContext) navContext;

	connectedCallback() {
		if (!this.href && this.navContext && this.type) {
			this.href = generateUrl(this.navContext, {
				type: this.type,
				attributes: this.atts,
			});
		}

		if (this.href && 0 === this.href.indexOf(window.location.origin)) {
			this.href = this.href.replace(window.location.origin, '');
		}
	}

	handleClick(event) {
		let route = routes.find((x) => x.uri === this.href);

		if (!route) {
			route = routes.find(
				(x) => false === x.exact && 0 === this.href.indexOf(x.uri)
			);
		}

		if (route) {
			event.preventDefault();

			/**
			 * There's no clear way to navigate to a nested route in LWR. A way around
			 * this it to push the desired location into history and then go back one.
			 */
			window.history.pushState({}, '', this.href);
			window.history.pushState({}, '', this.href);
			window.history.back();
		}
	}
}

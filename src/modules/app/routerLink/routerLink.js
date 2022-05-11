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
				(x) => false === x.exact && 0 === this.href.indexOf(x.uri + '/')
			);
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

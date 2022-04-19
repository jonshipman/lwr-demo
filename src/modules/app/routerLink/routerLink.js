import routes from 'app/routes';
import { api, LightningElement, wire } from 'lwc';
import { generateUrl, navigate, NavigationContext } from 'lwr/navigation';

export default class RouterLink extends LightningElement {
	@api href;
	@api target;
	@api title;
	@api atts = {};
	@api type;

	@wire(NavigationContext) navContext;

	connectedCallback() {
		if (!this.href && this.navContext && this.type) {
			this.href = generateUrl(this.navContext, {
				type: this.type,
				attributes: this.atts,
			});
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
			const pageOptions = { ...route.page, attributes: this.atts };

			if (this.type) {
				pageOptions.type = this.type;
			}

			navigate(this.navContext, pageOptions);
		}
	}
}

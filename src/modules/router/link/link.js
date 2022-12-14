import Element from 'app/element';
import { api, track, wire } from 'lwc';
import { navigate, NavigationContext } from 'lwr/navigation';
import { routes } from 'router/create';

export default class Link extends Element {
	@track _href;
	@api target;
	@api title;

	@wire(NavigationContext) navContext;

	@api set href(h) {
		if (0 === h.indexOf('/')) {
			h = h.substring(1);
		}

		if ('' === h) {
			this._href = '/';
		} else {
			this._href = h.replace(/\/$/, '').trim();
		}
	}

	get href() {
		return this._href || false;
	}

	get routes() {
		return this.routerContext.routes || [];
	}

	handleClick(event) {
		event.preventDefault();

		if ('/' === this.href) {
			navigate(this.navContext, { attributes: {}, type: 'home' });
		} else {
			const parts = this.href.split('/').filter((x) => !!x);
			const names = routes
				.filter((x) => '/' !== x.uri)
				.map((x) => x.id)
				.reverse();

			const attributes = {};
			let i;

			for (i = 0; i < parts.length; i++) {
				attributes[names[i]] = parts[i];
			}

			navigate(this.navContext, {
				attributes,
				type: names[i - 1],
			});
		}
	}
}

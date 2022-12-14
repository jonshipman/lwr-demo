import 'page/routes';
import 'admin/routes';

/**
 * Modules with routes need to be imported into the handler.
 * For larger projects, I tend to write a "routes" generator.
 * E.g. if you have a "contacts" parent module you would create a "contacts/routes" module.
 * Then you can look in all modules for a "routes/routes.js" file and create a singular file that lists out all these routes.
 */
import Element from 'app/element';
import { createContextProvider } from 'lwc';
import { getRoutes } from 'router/register';

import { ContextInfo } from './contextInfo.js';
import { generateContextWireAdapter } from './generateContextWireAdapter.js';

const ROUTER_CONTEXT = new ContextInfo({ routes: null });

export class RouterContext extends generateContextWireAdapter(ROUTER_CONTEXT) {}

const contextualizer = createContextProvider(RouterContext);

function RouterProvider(providerNode, contextValue) {
	RouterContext.setContext(providerNode, contextValue);

	contextualizer(providerNode, {
		consumerConnectedCallback: RouterContext.subscribeContext.bind(
			RouterContext,
			providerNode
		),

		consumerDisconnectedCallback: RouterContext.unsubscribeContext.bind(
			RouterContext,
			providerNode
		),
	});
}

export default class Context extends Element {
	routes = getRoutes();

	connectedCallback() {
		super.connectedCallback();

		RouterProvider(
			this,
			Object.freeze({
				routes: this.routes,
			})
		);
	}
}

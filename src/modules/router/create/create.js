import Element from 'app/element';
import { createRouter } from 'lwr/router';

import routes from './routes.js';

export default class Router extends Element {
	router = createRouter({ routes });

	handleError(error) {
		console.error(error);
	}
}

export { routes };

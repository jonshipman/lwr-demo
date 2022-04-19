import routes from 'app/routes';
import { createRouter } from 'lwr/router';
import { LightningElement } from 'lwc';

export default class Router extends LightningElement {
	router = createRouter({ routes });
}

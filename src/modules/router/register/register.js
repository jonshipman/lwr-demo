const routes = [];

export function RegisterRoute(...route) {
	routes.push(...route);
}

export function getRoutes() {
	return [...routes];
}

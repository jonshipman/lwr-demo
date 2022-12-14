import { getRoutes } from 'router/register';

export default async function RouterHandler() {
	class _RouterHandler {
		callback;

		constructor(callback) {
			this.callback = callback;
		}

		dispose() {}

		async update(pageRef) {
			let module;
			let route;
			const parts = [];

			const { attributes } = pageRef || {};
			const { primary, secondary, tertiary, quaternary, quinary } =
				attributes || {};

			const path = [
				primary,
				secondary,
				tertiary,
				quaternary,
				quinary,
			].filter((x) => !!x);

			const allroutes = getRoutes();

			if (!primary) {
				module = allroutes.find((x) => 'home' === x.page.type).module;
			} else {
				// This will find the closest match allowing for ids in the pathname.
				for (const part of path) {
					parts.push(part);
					route = allroutes.find(
						(x) => x.page.type === parts.join('/')
					);
				}

				if (route) {
					module = route.module;
				}
			}

			if (!module) {
				module = () => import('app/error');
			}

			this.callback({
				viewset: {
					default: module,
				},
			});
		}
	}

	return { default: _RouterHandler };
}

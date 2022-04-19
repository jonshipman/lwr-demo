export default function RouterHandler(module) {
	class _RouterHandler {
		callback;

		constructor(callback) {
			this.callback = callback;
		}

		dispose() {}

		update() {
			this.callback({
				viewset: {
					default: () => import(module),
				},
			});
		}
	}

	return { default: _RouterHandler };
}

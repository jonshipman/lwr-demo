export function generateContextWireAdapter(contextInstance) {
	return class Context {
		constructor(callback) {
			this._callback = callback;
		}

		connect() {
			// There is no 'connect' because context is provided via the update API.
		}

		disconnect() {
			// noop.
		}

		// The default update method services wires that emit context as TEmit when their value changes.
		// Wires that need more complex logic or use another emit type should override this method.
		update(_config, context) {
			if (context) {
				this._callback(context);
			}
		}

		/**
		 * Gets the stored info for a context provider
		 *
		 * @param {EventTarget} targetProvider
		 * @param targetProvider the context provider
		 */
		static getInfo(targetProvider) {
			return contextInstance.getInfo(targetProvider);
		}

		/**
		 * Set the context value directly associated with the target as a context provider.
		 *
		 * @param {EventTarget} targetProvider
		 * @param {ContextId} contextValue
		 */
		static setContext(targetProvider, contextValue) {
			contextInstance.setContext(targetProvider, contextValue);
		}

		/**
		 * Get the context value directly associated with the target as a context provider.
		 *
		 * @param {EventTarget} targetProvider
		 */
		static getContext(targetProvider) {
			return contextInstance.getContext(targetProvider);
		}

		/**
		 * Clear the context value and registered subscribers directly associated with the
		 * target as a context provider.
		 *
		 * @param {EventTarget} targetProvider
		 */
		static clearContext(targetProvider) {
			contextInstance.clearContext(targetProvider);
		}

		/**
		 * Subscribe a consumer to the context value directly associated with the target as
		 * a context provider. Calls to #set(targetProvider, contextValue) with the same
		 * target will invoke the consumer.provide(contextValue) function.
		 *
		 * NOTE: Mutations to the contextValue directly do not result in calls to
		 * consumer.provide(contextValue).
		 *
		 * @param {EventTarget} targetProvider
		 * @param {ContextConsumer} consumer object with a provide(context) function property.
		 */
		static subscribeContext(targetProvider, consumer) {
			contextInstance.subscribeContext(targetProvider, consumer);
		}

		/**
		 * Unsubscribe a previously subscribed consumer from listening to changes on the
		 * target
		 * @param {EventTarget} targetProvider
		 * @param {ContextConsumer} consumer
		 */
		static unsubscribeContext(targetProvider, consumer) {
			contextInstance.unsubscribeContext(targetProvider, consumer);
		}

		static contextSchema = {
			value: 'required',
		};
	};
}

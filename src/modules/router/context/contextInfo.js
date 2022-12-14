// Wire adapters follow LWC types, which come from a non-portable module
function validateProvider(obj) {
	if (obj === undefined || null === obj) {
		throw new TypeError('Provider must be defined.');
	}
}

/**
 * Manages context for various providers
 */
export class ContextInfo {
	infoMap = new WeakMap();

	/**
	 * The default value to be returned in the absence of a defined context
	 */
	constructor(defaultValue = {}) {
		this.defaultValue = defaultValue;
	}

	/**
	 * Gets the stored info for a context provider
	 * @param targetProvider the context provider
	 */
	getInfo(targetProvider) {
		let info = this.infoMap.get(targetProvider);

		if (info === undefined) {
			info = {
				consumers: new Set(),
				contextValue: this.defaultValue,
			};
			this.infoMap.set(targetProvider, info);
		}

		if (info.contextValue) {
			info.contextValue = {
				...info.contextValue,
				set: this.getContextSetter(targetProvider),
			};
		}

		if (!this.defaultValue.set) {
			this.defaultValue.set = this.getContextSetter(targetProvider);
		}

		return info;
	}

	/**
	 * Set the context value directly associated with the target as a context provider.
	 *
	 * @param {Object} targetProvider
	 * @param {FeatureContext} contextValue
	 */
	setContext(targetProvider, contextValue) {
		validateProvider(targetProvider);
		const info = this.getInfo(targetProvider);

		info.contextValue = {
			...contextValue,
			set: this.getContextSetter(targetProvider),
		};

		info.consumers.forEach((consumer) =>
			consumer.provide(info.contextValue)
		);
	}

	/**
	 * Get the context value directly associated with the target as a context provider.
	 *
	 * @param {Object} targetProvider
	 */
	getContext(targetProvider) {
		validateProvider(targetProvider);

		const { contextValue } = this.getInfo(targetProvider);
		return contextValue !== undefined ? contextValue : this.defaultValue;
	}

	/**
	 * Gets the setter.
	 * Allows context to update the provider.
	 *
	 * @param {Object} targetProvider
	 */
	getContextSetter(targetProvider) {
		return (v) => {
			this.setContext(targetProvider, v);
		};
	}

	/**
	 * Clear the context value and registered subscribers directly associated with the
	 * target as a context provider.
	 *
	 * @param {Object} targetProvider
	 */
	clearContext(targetProvider) {
		validateProvider(targetProvider);
		this.infoMap.delete(targetProvider);
	}

	/**
	 * Subscribe a consumer to the context value directly associated with the target as
	 * a context provider. Calls to #set(targetProvider, contextValue) with the same
	 * target will invoke the consumer.provide(contextValue) function.
	 *
	 * NOTE: Mutations to the contextValue directly do not result in calls to
	 * consumer.provide(contextValue).
	 *
	 * @param {Object} targetProvider
	 * @param {ContextConsumer} consumer object with a provide(context) function property.
	 */
	subscribeContext(targetProvider, consumer) {
		validateProvider(targetProvider);

		const { consumers, contextValue } = this.getInfo(targetProvider);

		if (!consumers.has(consumer)) {
			consumers.add(consumer);
			consumer.provide(contextValue);
		}
	}

	/**
	 * Unsubscribe a previously subscribed consumer from listening to changes on the
	 * target
	 * @param {Object} targetProvider
	 * @param {ContextConsumer} consumer
	 */
	unsubscribeContext(targetProvider, consumer) {
		validateProvider(targetProvider);
		this.getInfo(targetProvider).consumers.delete(consumer);
	}
}

export type SignalHandler<T> = (event: T) => void;

export interface SignalEvent<T> {
	connect(handler: SignalHandler<T>): () => void;
	destroy(handler: SignalHandler<T>): void;
}

export class Signal<T> implements SignalEvent<T> {
	private handlers: SignalHandler<T>[] = [];

	/**
	 * @param handler Method that will be called when event is invoked.
	 */
	public connect(handler: SignalHandler<T>) {
		this.handlers.push(handler);

		return () => {
			const index = this.handlers.indexOf(handler);
			if (index !== -1) this.handlers.splice(index, 1);
		};
	}

	/**
	 * @param handler An existing method that is called when event is invoked.
	 */
	public destroy(handler: SignalHandler<T>) {
		for (let i = 0; i < this.handlers.length; i++) {
			if (this.handlers[i] === handler) {
				this.handlers.splice(i, 1);
			}
		}
	}

	/**
	 * Runs all the methods that were added.
	 * @param event An argument that handlers expect (Use null if none are expected).
	 */
	public fire(event: T) {
		for (const handler of this.handlers) {
			handler(event);
		}
	}
}

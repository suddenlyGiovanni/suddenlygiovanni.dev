import { type Effect, type Layer, ManagedRuntime } from 'effect'
import type { LoaderFunction } from 'react-router'

export const makeRemixRuntime = <R, E>(layer: Layer.Layer<R, E, never>) => {
	const runtime = ManagedRuntime.make(layer)

	const loaderFunction: <A, E>(
		body: (...args: Parameters<LoaderFunction>) => Effect.Effect<A, E, R>,
	) => (...args: Parameters<LoaderFunction>) => Promise<A> =
		body =>
		(...args) =>
			runtime.runPromise(body(...args))

	return { loaderFunction }
}

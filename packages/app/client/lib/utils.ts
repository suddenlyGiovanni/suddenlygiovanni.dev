import { type Effect, type Layer, ManagedRuntime } from 'effect'
import type { LoaderFunction } from 'react-router'

// biome-ignore lint/nursery/useExplicitType: <explanation>
export const makeRemixRuntime = <R, E>(layer: Layer.Layer<R, E, never>) => {
	const runtime = ManagedRuntime.make(layer)

	const loaderFunction: {
		// biome-ignore lint/style/useShorthandFunctionType: <explanation>
		<A, E>(
			body: (...args: Parameters<LoaderFunction>) => Effect.Effect<A, E, R>,
		): (...args: Parameters<LoaderFunction>) => Promise<A>
	} =
		body =>
		// biome-ignore lint/nursery/useExplicitType: <explanation>
		(...args) =>
			runtime.runPromise(body(...args))

	return { loaderFunction }
}

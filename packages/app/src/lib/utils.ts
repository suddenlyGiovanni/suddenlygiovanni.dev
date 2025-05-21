import { type Effect, type Layer, ManagedRuntime } from 'effect'
import type { AppLoadContext, LoaderFunctionArgs } from 'react-router'

export const makeRemixRuntime = <R, E>(layer: Layer.Layer<R, E, never>) => {
	const runtime = ManagedRuntime.make(layer)

	const loaderFunction =
		<A, EffectError>(loaderFunction: (arg: LoaderFunctionArgs<AppLoadContext>) => Effect.Effect<A, EffectError, R>) =>
		(arg: LoaderFunctionArgs<AppLoadContext>): Promise<A> =>
			runtime.runPromise(loaderFunction(arg))

	return { loaderFunction }
}

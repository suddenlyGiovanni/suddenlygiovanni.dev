import { type Effect, type Layer, ManagedRuntime } from 'effect'
import type * as T from 'react-router'

export const makeRemixRuntime = <R, E>(layer: Layer.Layer<R, E, never>) => {
	const runtime = ManagedRuntime.make(layer)

	const loaderFunction =
		<
			A,
			EffectError,
			LoaderFunctionArgs extends T.LoaderFunctionArgs = T.LoaderFunctionArgs<T.AppLoadContext>,
		>(
			loaderFunction: (arg: LoaderFunctionArgs) => Effect.Effect<A, EffectError, R>,
		) =>
		(arg: LoaderFunctionArgs): Promise<A> =>
			runtime.runPromise(loaderFunction(arg))

	return { loaderFunction }
}

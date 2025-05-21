import { type Effect, type Layer, ManagedRuntime } from 'effect'
import type * as T from 'react-router'

export const makeRemixRuntime = <R, LayerError>(layer: Layer.Layer<R, LayerError, never>) => {
	const runtime = ManagedRuntime.make(layer)

	const loaderFunction =
		<A, E, Arg extends T.LoaderFunctionArgs = T.LoaderFunctionArgs<T.AppLoadContext>>(
			loaderFunction: (arg: Arg) => Effect.Effect<A, E, R>,
		) =>
		(arg: Arg): Promise<A> =>
			runtime.runPromise(loaderFunction(arg))

	const makeActionFunction =
		<A, E, Arg extends T.ActionFunctionArgs = T.ActionFunctionArgs<T.AppLoadContext>>(
			f: (arg: Arg) => Effect.Effect<A, E, R>,
		) =>
		(arg: Arg): Promise<A> =>
			runtime.runPromise(f(arg))

	return { loaderFunction, makeActionFunction }
}

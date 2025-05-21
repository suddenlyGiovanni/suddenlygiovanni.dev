import { type Effect, type Layer, ManagedRuntime } from 'effect'
import type * as T from 'react-router'

export const makeRemixRuntime = <R, LayerError>(layer: Layer.Layer<R, LayerError, never>) => {
	const runtime = ManagedRuntime.make(layer)

	const makServerLoaderFunction =
		<A, E, Arg extends T.LoaderFunctionArgs = T.LoaderFunctionArgs<T.AppLoadContext>>(
			loader: (arg: Arg) => Effect.Effect<A, E, R>,
		) =>
		(arg: Arg): Promise<A> =>
			runtime.runPromise(loader(arg))

	const makeServerActionFunction =
		<A, E, Arg extends T.ActionFunctionArgs = T.ActionFunctionArgs<T.AppLoadContext>>(
			action: (arg: Arg) => Effect.Effect<A, E, R>,
		) =>
		(arg: Arg): Promise<A> =>
			runtime.runPromise(action(arg))

	return { makeServerActionFunction, makServerLoaderFunction }
}

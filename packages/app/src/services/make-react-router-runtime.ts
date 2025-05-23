import type { Effect, ManagedRuntime } from 'effect'
import type * as T from 'react-router'

export const makeReactRouterServersRuntime = <R, LayerError>(
	managedServerRuntime: ManagedRuntime.ManagedRuntime<R, LayerError>,
) => {
	const makeServerLoaderFunction =
		<A, E, Arg extends T.LoaderFunctionArgs = T.LoaderFunctionArgs<T.AppLoadContext>>(
			loader: (arg: Arg) => Effect.Effect<A, E, R>,
		) =>
		(arg: Arg): Promise<A> =>
			managedServerRuntime.runPromise(loader(arg))

	const makeServerActionFunction =
		<A, E, Arg extends T.ActionFunctionArgs = T.ActionFunctionArgs<T.AppLoadContext>>(
			action: (arg: Arg) => Effect.Effect<A, E, R>,
		) =>
		(arg: Arg): Promise<A> =>
			managedServerRuntime.runPromise(action(arg))

	return { makeServerActionFunction, makeServerLoaderFunction }
}

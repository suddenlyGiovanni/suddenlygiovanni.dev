import { Effect } from 'effect'
import type { ViteDevServer } from 'vite'

/**
 * ViteServiceSingleton is a class designed to manage the Vite service as a singleton instance.
 * Its main purpose is to ensure that only one instance of the Vite service is created and shared
 * across the application for tasks such as development server management, modular reloading,
 * and middleware functionality. This promotes consistency, efficient resource usage,
 * and centralizes Vite's operations.
 */
class ViteServiceSingleton {
	private static instance: ViteServiceSingleton

	readonly #viteDevServer: ViteDevServer

	private constructor(viteDevServer: ViteDevServer) {
		this.#viteDevServer = viteDevServer
	}

	/**
	 * Retrieves the instance of the ViteDevServer.
	 *
	 * @return {ViteDevServer} The ViteDevServer instance associated with the current object.
	 */
	public get viteDevServer(): ViteDevServer {
		return this.#viteDevServer
	}

	/**
	 * Retrieves the singleton instance of the ViteServiceSingleton class.
	 * If the instance does not exist, it initializes and sets up a new one.
	 *
	 * @return {Promise<ViteServiceSingleton>} A promise resolving to the singleton instance of ViteServiceSingleton.
	 */
	static async getInstance(): Promise<ViteServiceSingleton> {
		if (ViteServiceSingleton.instance) {
			return ViteServiceSingleton.instance
		}

		const { createServer } = await import('vite')

		ViteServiceSingleton.instance = new ViteServiceSingleton(
			await createServer({ server: { middlewareMode: true } }),
		)
		return ViteServiceSingleton.instance
	}

	static getInstanceEffectually(): Effect.Effect<ViteServiceSingleton> {
		return Effect.promise(() => ViteServiceSingleton.getInstance())
	}

	/**
	 * Asynchronously disposes of the resource associated with the object.
	 * This method is invoked during object cleanup when the `Symbol.asyncDispose` is triggered.
	 *
	 * @return {Promise<void>} A promise that resolves once the resource has been successfully disposed of.
	 */
	public async [Symbol.asyncDispose](): Promise<void> {
		return await this.#viteDevServer.close()
	}
}

export class ViteDevServerService extends Effect.Service<ViteDevServerService>()(
	'app/ViteDevServer',
	{
		effect: ViteServiceSingleton.getInstanceEffectually().pipe(
			Effect.map(({ viteDevServer }) => viteDevServer),
		),
	},
) {}

import { createServer } from 'node:http'
import type { FileSystem, HttpPlatform, HttpServer } from '@effect/platform'
import { NodeContext, NodeHttpServer, NodeRuntime } from '@effect/platform-node'
import { Layer } from 'effect'

export function listen(
	app: Layer.Layer<
		never,
		never,
		HttpPlatform.HttpPlatform | HttpServer.HttpServer | FileSystem.FileSystem
	>,
	port: number,
): void {
	// Run the application
	NodeRuntime.runMain(
		Layer.launch(
			app.pipe(
				Layer.provide(NodeHttpServer.layer(() => createServer(), { port })),
				Layer.provide(NodeContext.layer),
			),
		),
	)
}

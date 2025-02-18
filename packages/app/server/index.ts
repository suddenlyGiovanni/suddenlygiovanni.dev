import { serveStatic } from '@hono/node-server/serve-static'
import { createHonoServer } from 'react-router-hono-server/node'

export default await createHonoServer({
	configure: async server => {
		// server.use('*', serveStatic({ root: './' }))
		// server.get('/assets', serveStatic({ root: './build/client/assets' }))
	},
})

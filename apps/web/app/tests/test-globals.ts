// biome-ignore lint/correctness/noNodejsModules: <explanation>
import * as process from 'node:process'

export function setup() {
	process.env.TZ = 'UTC'
}

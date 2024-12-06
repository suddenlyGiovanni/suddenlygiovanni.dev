// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { env } from 'node:process'

export function setup() {
	env.TZ = 'UTC'
}

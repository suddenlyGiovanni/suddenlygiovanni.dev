import { env } from 'node:process'

export function setup(): void {
	env.TZ = 'UTC'
}

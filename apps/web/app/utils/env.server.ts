export function getEnv(): { MODE: 'development' | 'production' | 'test' } {
	return {
		MODE: process.env.NODE_ENV,
	} as const
}

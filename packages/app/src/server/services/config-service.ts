import { Config, pipe } from 'effect'

export const ConfigService = Config.all({
	NODE_ENV: pipe('NODE_ENV', Config.literal('production', 'development'), Config.withDefault('production')),
	PORT: pipe('PORT', Config.number, Config.withDefault(5173)),
})

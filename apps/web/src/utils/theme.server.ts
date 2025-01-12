// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as cookie from 'cookie'

const cookieName = 'en_theme'
export type Theme = 'light' | 'dark'

export function setTheme(theme: Theme | 'system'): string {
	if (theme === 'system') {
		return cookie.serialize(cookieName, '', { path: '/', maxAge: -1 })
	}
	return cookie.serialize(cookieName, theme, { path: '/', maxAge: 31536000 })
}

export function getTheme(request: Request): Theme | null {
	const cookieHeader = request.headers.get('cookie')
	const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : 'light'
	if (parsed === 'light' || parsed === 'dark') {
		return parsed
	}
	return null
}

export function parseNumber(raw?: string): number | undefined {
	if (raw === undefined) {
		return undefined
	}
	const maybe = Number(raw)
	if (Number.isNaN(maybe)) {
		return undefined
	}
	return maybe
}

/**
 * Retrieves the domain URL from the provided request object.
 *
 * @alpha
 * @param request - The request object containing information about the HTTP request.
 * @returns - The domain URL extracted from the request object.
 * @example
 * getDomainUrl(request);
 * //returns 'https://example.com'
 *
 * @remarks This function can be used when you need to extract the domain URL from a request object in situations
 * where the host is either forwarded or directly accessed.
 *
 * @throws If provided request object does not include the 'host' header nor 'X-Forwarded-Host'.
 *
 * @public
 */
export function getDomainUrl(request: Request): string {
	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host') ?? new URL(request.url).host
	const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https'
	return `${protocol}://${host}`
}

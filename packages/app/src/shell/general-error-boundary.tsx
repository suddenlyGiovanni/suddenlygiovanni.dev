/** biome-ignore-all lint/suspicious/noConsole: we need to print to stdout */
import type { ReactElement } from 'react'
import { type ErrorResponse, isRouteErrorResponse, useParams, useRouteError } from 'react-router'

function getErrorMessage(error: unknown): string {
	if (typeof error === 'string') {
		return error
	}
	if (
		error &&
		typeof error === 'object' &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		return error.message
	}

	console.error('Unable to get error message for error', error)
	return 'Unknown Error'
}

type StatusHandler = (info: {
	error: ErrorResponse
	params: Record<string, string | undefined>
}) => ReactElement | null

interface GeneralErrorBoundaryProps {
	defaultStatusHandler?: StatusHandler
	statusHandlers?: Record<number, StatusHandler>
	unexpectedErrorHandler?: (error: unknown) => ReactElement | null
}

const DefaultStatusHandler: StatusHandler = ({ error }) => (
	<p>
		{error.status} {error.data}
	</p>
)

export function GeneralErrorBoundary({
	defaultStatusHandler = DefaultStatusHandler,
	statusHandlers,
	unexpectedErrorHandler = error => <p>{getErrorMessage(error)}</p>,
}: GeneralErrorBoundaryProps): ReactElement {
	const error = useRouteError()
	const params = useParams()

	if (typeof document !== 'undefined') {
		console.error(error)
	}

	return (
		<div className="container flex items-center justify-center p-20 text-h2">
			{isRouteErrorResponse(error)
				? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
						error,
						params,
					})
				: unexpectedErrorHandler(error)}
		</div>
	)
}

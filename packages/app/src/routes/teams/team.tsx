import { Effect, Option, Struct } from 'effect'
import type { ReactElement } from 'react'
import { href, redirect } from 'react-router'

import { loaderFunction } from '#root/src/services/index.ts'

import type { Route } from './+types/team.ts'

// Meta function for SEO
export function meta({ params }: Route.MetaArgs) {
	const title = `Team ${params.teamId}`
	return [{ title }, { content: `Details for team ${params.teamId}`, name: 'description' }]
}

// Loader function to demonstrate type checking with dynamic params
export const loader = loaderFunction(({ params: { teamId } }: Route.LoaderArgs) =>
	Effect.succeed({
		description: `This is team ${teamId}'s page. This route demonstrates a dynamic segment in React Router v7.`,
		id: teamId,
		name: `Team ${teamId}`,
	}),
)

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData()
	const note = formData.get('note')
	if (typeof note !== 'string') throw new Error('note must be a string')

	const errors: { formErrors: string[]; fieldErrors: { note: string[] } } = {
		fieldErrors: {
			note: [],
		},
		formErrors: [],
	}

	if (note === '') {
		errors.fieldErrors.note.push('Note is required')
	}

	if (note.length > 10) {
		errors.fieldErrors.note.push('Note must be less than 100 characters')
	}

	const hasError =
		errors.formErrors.length > 0 ||
		Object.values(errors.fieldErrors).some(fieldErrors => fieldErrors.length > 0)

	if (hasError) {
		return { errors }
	}

	return redirect(href('/'))
}

function ErrorList({ errors }: { errors: Option.Option<string[]> }) {
	return Option.match(errors, {
		onSome: e => <>{e}</>,
		onNone: () => null,
	})
}

// Component with minimal UI
export default function Team({ loaderData, actionData }: Route.ComponentProps): ReactElement {
	const { id, name, description } = loaderData
	console.dir(actionData)
	const fieldErrors = Option.fromNullable(actionData?.errors?.fieldErrors)
	const formatErrors = Option.fromNullable(actionData?.errors?.formErrors)

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">{name}</h1>
			<p className="mb-4">{description}</p>

			<div className="mt-8 p-4 border border-gray-200 rounded">
				<h2 className="text-xl font-semibold mb-2">Team Details</h2>
				<ul className="list-disc pl-5">
					<li>ID: {id}</li>
					<li>Name: {name}</li>
				</ul>
			</div>

			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-2">Test Form for Action</h2>

				<form
					className="space-y-4"
					method="post"
					noValidate
				>
					<div>
						<label
							className="block mb-1"
							htmlFor="note"
						>
							Add a note:
						</label>
						<input
							className="w-full p-2 border border-gray-300 rounded"
							id="note"
							name="note"
							required
							type="text"
						/>
						<div className="min-h-32 px-4 pb-3 pt-1">
							<ErrorList errors={Option.map(fieldErrors, Struct.get('note'))} />
						</div>
					</div>
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						type="submit"
					>
						Submit
					</button>
					<ErrorList errors={formatErrors} />
				</form>
			</div>
		</div>
	)
}

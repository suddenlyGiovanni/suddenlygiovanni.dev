import { Effect } from 'effect'
import type { ReactElement } from 'react'

import { loaderFunction } from '#root/src/services/index.ts'

import type { Route } from './+types/team'

// Meta function for SEO
export function meta({ params }: Route.MetaArgs) {
	const title = `Team ${params.teamId}`
	return [{ title }, { content: `Details for team ${params.teamId}`, name: 'description' }]
}

// Loader function to demonstrate type checking with dynamic params
export const loader = loaderFunction(({ params: { teamId } }: Route.LoaderArgs) =>
	Effect.succeed({
		id: teamId,
		name: `Team ${teamId}`,
		description: `This is team ${teamId}'s page. This route demonstrates a dynamic segment in React Router v7.`,
	}),
)

// Component with minimal UI
export default function Team({ loaderData }: Route.ComponentProps): ReactElement {
	const { id, name, description } = loaderData

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
					method="post"
					className="space-y-4"
				>
					<div>
						<label
							htmlFor="note"
							className="block mb-1"
						>
							Add a note:
						</label>
						<input
							type="text"
							id="note"
							name="note"
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}

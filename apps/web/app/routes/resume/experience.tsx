import { T } from '@suddenly-giovanni/ui'
import type { ComponentProps } from 'react'
import { SectionItem } from './section-item'

export interface Work {
	/**
	 * e.g. Social Media Company
	 */
	description?: string
	endDate?: Date
	/**
	 * Specify multiple accomplishments
	 */
	highlights?: string[]
	/**
	 * e.g. Menlo Park, CA
	 */
	location?: string
	/**
	 * e.g. Facebook
	 */
	name?: string
	/**
	 * e.g. Software Engineer
	 */
	position?: string
	startDate?: Date
	/**
	 * Give an overview of your responsibilities at the company
	 */
	summary?: string
	/**
	 * e.g. http://facebook.example.com
	 */
	url?: string

	contact?: {
		/**
		 * ideally name and role
		 * eg. Mark Zuckerberg (CTO)
		 */
		name: string
		email?: string
		/**
		 * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
		 */
		phone?: string
	}
}

interface Props {
	readonly works: readonly Work[]
}

export function Experience({ works }: Props) {
	return (
		<section>
			<T.h2>Experience</T.h2>
			{works.map(
				(
					{
						description,
						endDate,
						highlights,
						location,
						name,
						position,
						startDate,
						summary,
						url,
						contact,
					},
					idx,
				) => (
					<SectionItem
						description={description}
						endDate={endDate}
						heading1={position || ''}
						heading1AriaLabel="job title"
						heading2={name || ''}
						heading2AriaLabel="company"
						heading2Link={url}
						highlights={highlights || []}
						key={`${String(name)} - ${String(position)}`}
						location={location}
						startDate={startDate}
						summary={summary || ''}
					>
						{contact ?
							<DescriptionContact
								contact={contact}
								key={`${idx} - ${String(name)} - ${String(position)} -${
									contact.name
								} `}
							/>
						:	null}
					</SectionItem>
				),
			)}
		</section>
	)
}

function DescriptionContact({
	contact,
	...ddProps
}: ComponentProps<'dt'> & {
	contact: NonNullable<Work['contact']>
}) {
	return (
		<>
			<dt {...ddProps}>Contacts:</dt>
			<dd>
				<address
					style={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						alignItems: 'baseline',
					}}
				>
					<span>{contact.name}</span>
					{contact.email ?
						<a href={`mailto:${contact.email}`}>{contact.email}</a>
					:	null}
					{contact.phone ?
						<a href={`tel:${contact.phone}`}>{contact.phone}</a>
					:	null}
				</address>
			</dd>
		</>
	)
}

/* eslint-disable react/no-unescaped-entities -- Reason: storybook story */
import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	title: 'typography',
} satisfies Meta

type Story = StoryObj<typeof meta>

export default meta

export const Demo: Story = {
	render: () => (
		<div>
			<T.h1>The Joke Tax Chronicles</T.h1>
			<T.p>
				Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
				on his throne. One day, his advisors came to him with a problem: the kingdom was running out
				of money.
			</T.p>
			<T.h2 className="mt-mu10 transition-colors">The King's Plan</T.h2>
			<T.p>
				The king thought long and hard, and finally came up with{' '}
				<T.a href="#1">a brilliant plan</T.a>: he would tax the jokes in the kingdom.
			</T.p>
			<T.blockquote className="mt-6">
				"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay
				for the privilege."
			</T.blockquote>
			<T.h3 className="mt-8">The Joke Tax</T.h3>
			<T.p>
				The king's subjects were not amused. They grumbled and complained, but the king was firm:
			</T.p>
			<T.ul>
				<li>1st level of puns: 5 gold coins</li>
				<li>2nd level of jokes: 10 gold coins</li>
				<li>3rd level of one-liners : 20 gold coins</li>
			</T.ul>
			<T.p>
				As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was
				one person who refused to let the king's foolishness get him down: a court jester named
				Jokester.
			</T.p>
			<T.h3 className="mt-8">Jokester's Revolt</T.h3>
			<T.p>
				Jokester began sneaking into the castle in the middle of the night and leaving jokes all
				over the place: under the king's pillow, in his soup, even in the royal toilet. The king was
				furious, but he couldn't seem to stop Jokester.
			</T.p>
			<T.p>
				And then, one day, the people of the kingdom discovered that the jokes left by Jokester were
				so funny that they couldn't help but laugh. And once they started laughing, they couldn't
				stop.
			</T.p>
			<T.h3 className="mt-8">The People's Rebellion</T.h3>
			<T.p>
				The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns
				again, and soon the entire kingdom was in on the joke.
			</T.p>
			<div className="my-6 w-full overflow-y-auto">
				<table className="w-full">
					<thead>
						<T.tr>
							<T.th>King's Treasury</T.th>
							<T.th>People's happiness</T.th>
						</T.tr>
					</thead>
					<tbody>
						<T.tr>
							<T.td>Empty</T.td>
							<T.td>Overflowing</T.td>
						</T.tr>
						<T.tr>
							<T.td>Modest</T.td>
							<T.td>Satisfied</T.td>
						</T.tr>
						<T.tr>
							<T.td>Full</T.td>
							<T.td>Ecstatic</T.td>
						</T.tr>
					</tbody>
				</table>
			</div>
			<T.p>
				The king, seeing how much happier his subjects were, realized the error of his ways and
				repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever
				after.
			</T.p>
			<T.p>
				The moral of the story is: never underestimate the power of a good laugh and always be
				careful of bad ideas.
			</T.p>
		</div>
	),
}

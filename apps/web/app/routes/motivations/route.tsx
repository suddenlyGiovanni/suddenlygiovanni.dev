/* eslint-disable react/no-unescaped-entities -- Reason: storybook story */
import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'
import type { ReactElement } from 'react'
import { routesRecord } from '~/routes-record.ts'

export const meta: MetaFunction = () => {
	return [
		{ title: 'My Motivations' },
		{ name: 'description', content: 'What I value in a working environment' },
	]
}

export default function Motivation(): ReactElement {
	return (
		<article className={clsx('prose dark:prose-invert w-full max-w-none bg-background font-comic')}>
			<h1>My Motivations</h1>
			<p className="lead">
				Over the years, I have learned how and under which conditions I like to work, what drives
				me, and which criteria enhance my productivity and happiness.
			</p>
			<h2>Drive</h2>
			<p>
				Curiosity and eagerness to learn is a personal driver like no other. It applies to both the{' '}
				<strong>Domain</strong> and the underlying <strong>technology</strong> of the business. I
				usually find the most mundane activities exciting as long as there is some depth to them.
			</p>
			<p>
				If you can provide me with a challenge and the tools to navigate the domain, you'll make me
				a happy engineer.
			</p>
			<h2>Culture</h2>
			<p>
				An open and diversified environment is vital to me. I thrive working in cross-functional
				teams, where autonomous people help each other achieve the best results. Waterfall and
				micro-management are not acceptable.
			</p>
			<h2>Transparency</h2>
			<p>
				I work more effectively when the company shares as much of the long-term intentions as
				possible. It prevents misunderstandings, leads to better technical decisions, and encourages
				a trusting work environment.
			</p>
			<h2>Work-life balance</h2>
			<p>
				I am a workaholic. It is easy for me to end up putting work before everything else, my wife,
				and kids included. This is not a OK behavior. I'm consciously trying to cope with it every
				day.
			</p>
			<p>
				While I am OK with putting in a few extra hours on rare occasions or getting paged when a
				critical system is failing,{' '}
				<strong>regular over-time is NOT something that I am willing to do</strong>, and that if
				recurring must be addressed.
			</p>
			<p>
				I also value <strong>flexible working hours</strong> and{' '}
				<strong>occasional remote work</strong>.{' '}
			</p>
			<h2>Open Source</h2>
			<p>
				As an active consumer of many open-source projects, and occasional contributor, I value Open
				Source software. To be able to contribute back to the open-source community while employed
				is important to me.{' '}
			</p>
			<p>
				If you have Open Source projects of your own or help maintain someone else, you'll
				immediately gain extra points with me.
			</p>
			<h2>Goals</h2>
			<p>
				I am conscious of where I am now and where eventually I want to end up. I have also learned
				to be deliberate about my career choices and to set up goals.
			</p>
			<p>First, I am looking forward to taking more ownership of the back-end code.</p>
			<p>
				My next goal is to learn new programming languages, the specific of which mostly depends on
				the business requirements. (Still, my candidates would be among the functional family.)
			</p>
			<p>
				The long term plan is to keep climbing the engineering ladder without getting involved in
				any management or business role. (I like to code if it is not already obvious)
			</p>
			<p>
				To achieve these goals, I need an environment where knowledge sharing is encouraged,
				pair-programming is the norm, and mentorship is made available.
			</p>
			<h2>Failing together</h2>
			<p>
				Given that I am primarily driven by the desire to learn and that my learning process
				involves making mistakes and learn from my failures.
			</p>
			<p>
				It is of paramount importance to me to work in a safe environment where experimentation is
				encouraged, where mistakes are considered tools to shape up a better understanding of that
				specific context.
			</p>
			<h2> Role </h2>
			<p>
				If these were the movies, then I would be that actor that always gets typed-cast, just
				because he played a role once and now nobody can't see him as anything else.
			</p>
			Being always typed-cast as a front-end engineer has the double implication that:
			<ol type="a">
				<li>you are forced to specialize in a specific area</li>
				<li>
					you are driven away from those opportunities that would enable you to acquire the
					necessary skills for other roles.
				</li>
			</ol>
			<p>
				For me to emancipate from this label, I have learned to think of front-end and back-end
				simply as the interfaces to code to. Different contexts where the same clean code principles
				and good architecture designs apply.
			</p>
			<p>
				<strong>
					I think of myself as a software engineer who can learn and use this or that API as needed
				</strong>
				.
			</p>
			<p>
				My previous work experience and contact informations are available in my{' '}
				<Link to={routesRecord.resume.url}>resume</Link>.
			</p>
		</article>
	)
}

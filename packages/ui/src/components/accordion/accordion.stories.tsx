/*
	eslint-disable react/no-array-index-key,
		react/no-unescaped-entities -- Reason: This rule is disabled because...
*/

import type { Meta } from '@storybook/react'
import { type ReactElement, useEffect, useRef, useState } from 'react'
import { clsx } from '~/lib/utils.ts'
import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
	AccordionTrigger,
} from '~/ui/accordion.tsx'

const meta = {
	component: Accordion,
} satisfies Meta<typeof Accordion>

const rootClass = clsx(
	'font-sans',
	[
		'data-[orientation=horizontal]:flex',
		'data-[orientation=horizontal]:max-w-[40em]',
		'data-[orientation=horizontal]:h-[50vh]',
	],
	'data-[orientation=vertical]:max-w-[20em]',
)

const itemClass = clsx(
	[
		'data-[orientation=horizontal]:flex',
		'data-[orientation=horizontal]:border-r-2',
		'data-[orientation=horizontal]:border-solid',
		'data-[orientation=horizontal]:border-white',
	],
	[
		'data-[orientation=vertical]:border-b-2',
		'data-[orientation=vertical]:border-solid',
		'data-[orientation=vertical]:border-white',
	],
)

const headerClass = clsx('m-0', 'data-[orientation=horizontal]:h-full')

const RECOMMENDED_CSS__ACCORDION__TRIGGER = clsx(
	'align-inherit',
	'data-[orientation=horizontal]:h-full',
	'data-[orientation=vertical]:w-full',
)

const triggerClass = clsx(
	RECOMMENDED_CSS__ACCORDION__TRIGGER,
	['box-border border-0 bg-black p-2.5 text-lg text-white'],
	'focus:text-red-500 focus:shadow-inner focus:outline-none',
	'data-[disabled]:text-gray-300',
	[
		'data-[state=open]:bg-red-500',
		'data-[state=open]:text-white',
		['focus:data-[state=open]:text-black', 'focus:data-[state=open]:shadow-gray-950'],
	],
)

const contentClass = clsx('p-2.5 leading-6')

const styles = clsx(
	'border-2 border-solid border-blue-500 bg-blue-800 p-10',
	'data-[state=closed]:border-red-500',
	'data-[state=open]:border-green-500',
	'data-[disabled]:border-dashed',
	'disabled:opacity-50',
)

const animatedContentClass = clsx(
	'overflow-hidden',
	'data-[state=open]:animate-accordion-up',
	'data-[state=closed]:animate-accordion-down',
)

const animated2dContentClass = clsx(
	'overflow-hidden',
	'data-[state=open]:animate-accordion-open',
	'data-[state=closed]:animate-accordion-close',
)

const rootAttrClass = clsx(styles)
const itemAttrClass = clsx(styles)
const headerAttrClass = clsx(styles)
const triggerAttrClass = clsx(styles)
const contentAttrClass = clsx('block', styles)

export function _Accordion(): ReactElement {
	return (
		<Accordion className="w-full" collapsible type="single">
			<AccordionItem value="item-1">
				<AccordionTrigger>Is it accessible?</AccordionTrigger>
				<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
			</AccordionItem>

			<AccordionItem value="item-2">
				<AccordionTrigger>Is it styled?</AccordionTrigger>
				<AccordionContent>
					Yes. It comes with default styles that matches the other components&apos; aesthetic.
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="item-3">
				<AccordionTrigger>Is it animated?</AccordionTrigger>
				<AccordionContent>
					Yes. It's animated by default, but you can disable it if you prefer.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export function SingleUncontrolled(): ReactElement {
	return (
		<Accordion className={rootClass} type="single">
			<AccordionItem className={itemClass} value="one">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
					integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
					habitant sed.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="two">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
					porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} disabled value="three">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Three (disabled)</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
					euismod magna, nec tempor pulvinar eu etiam mattis.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="four">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Odio placerat <a href="#1">quisque</a> sapien sagittis non sociis ligula penatibus
					dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
					<button type="button">Cool</button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export function SingleControlled(): ReactElement {
	// eslint-disable-next-line @typescript-eslint/ban-types -- Reason: I need a sum type and the ability to use a string as a value.
	const [valueOne, setValueOne] = useState<('one' | 'two' | 'three' | 'four') | (string & {})>(
		'one',
	)

	return (
		<Accordion className={rootClass} onValueChange={setValueOne} type="single" value={valueOne}>
			<AccordionItem className={itemClass} value="one">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
					integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
					habitant sed.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="two">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
					porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} disabled value="three">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Three (disabled)</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
					euismod magna, nec tempor pulvinar eu etiam mattis.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="four">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Odio placerat <a href="#2">quisque</a> sapien sagittis non sociis ligula penatibus
					dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
					<button type="button">Cool</button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export function SingleCollapsible(): ReactElement {
	return (
		<Accordion className={rootClass} collapsible defaultValue="one" type="single">
			<AccordionItem className={itemClass} value="one">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
					integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
					habitant sed.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="two">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
					porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} disabled value="three">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Three (disabled)</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
					euismod magna, nec tempor pulvinar eu etiam mattis.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="four">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Odio placerat <a href="#3">quisque</a> sapien sagittis non sociis ligula penatibus
					dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
					<button type="button">Cool</button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export function MultipleUncontrolled(): ReactElement {
	return (
		<Accordion className={rootClass} type="multiple">
			<AccordionItem className={itemClass} value="one">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
					integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
					habitant sed.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="two">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
					porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} disabled value="three">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Three (disabled)</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
					euismod magna, nec tempor pulvinar eu etiam mattis.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="four">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Odio placerat <a href="#4">quisque</a> sapien sagittis non sociis ligula penatibus
					dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
					<button type="button">Cool</button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export function MultipleControlled(): ReactElement {
	/*
	 eslint-disable-next-line @typescript-eslint/ban-types -- Reason: I need a sum type and the ability to use a string as a value.
	*/
	const [value, setValue] = useState<(('one' | 'two' | 'three' | 'four') | (string & {}))[]>([
		'one',
		'two',
	])

	return (
		<Accordion className={rootClass} onValueChange={setValue} type="multiple" value={value}>
			<AccordionItem className={itemClass} value="one">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
					integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
					habitant sed.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="two">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
					porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} disabled value="three">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Three (disabled)</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
					euismod magna, nec tempor pulvinar eu etiam mattis.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="four">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={contentClass}>
					Odio placerat <a href="#5">quisque</a> sapien sagittis non sociis ligula penatibus
					dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
					<button type="button">Cool</button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export function Animated(): ReactElement {
	const values = ['One', 'Two', 'Three', 'Four']
	const [count, setCount] = useState(1)
	const [hasDynamicContent, setHasDynamicContent] = useState(false)
	const timerRef = useRef(0)

	useEffect(() => {
		if (hasDynamicContent) {
			timerRef.current = window.setTimeout(() => {
				setCount(prevCount => {
					const nextCount = prevCount < 5 ? prevCount + 1 : prevCount
					if (nextCount === 5) setHasDynamicContent(false)
					return nextCount
				})
			}, 3000)
		}
		return () => {
			hasDynamicContent && clearTimeout(timerRef.current)
		}
	}, [count, hasDynamicContent])

	return (
		<>
			<label>
				<input
					checked={hasDynamicContent}
					onChange={event => {
						const checked = event.target.checked
						if (checked) setCount(1)
						setHasDynamicContent(checked)
					}}
					type="checkbox"
				/>{' '}
				Dynamic content
			</label>
			<br />
			<br />
			<h1>Closed by default</h1>
			<Accordion className={rootClass} type="single">
				{values.map(value => (
					<AccordionItem className={itemClass} key={value} value={value}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{value}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={animatedContentClass}>
							{[...new Array<unknown>(count)].map((_, index) => (
								<div key={index} style={{ padding: 10 }}>
									Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
									viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
									quam suscipit habitant sed.
								</div>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h1>Open by default</h1>
			<Accordion className={rootClass} defaultValue="One" type="single">
				{values.map(value => (
					<AccordionItem className={itemClass} key={value} value={value}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{value}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={animatedContentClass}>
							{[...new Array<unknown>(count)].map((_, index) => (
								<div key={index} style={{ padding: 10 }}>
									Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
									viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
									quam suscipit habitant sed.
								</div>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</>
	)
}

export function Animated2D(): ReactElement {
	const values = ['One', 'Two', 'Three', 'Four']

	return (
		<Accordion className={rootClass} type="single">
			{values.map(value => (
				<AccordionItem className={itemClass} key={value} value={value}>
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>{value}</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={animated2dContentClass}>
						<div style={{ padding: 10, background: 'whitesmoke', overflow: 'hidden' }}>
							<div style={{ width: 'calc(20em - 20px)', height: 100 }}>
								Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
								viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
								suscipit habitant sed.
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}

export function AnimatedControlled(): ReactElement {
	// eslint-disable-next-line @typescript-eslint/ban-types -- Reason: I need a sum type and the ability to use a string as a value.
	const [value, setValue] = useState<(('one' | 'two' | 'three' | 'four') | (string & {}))[]>([
		'one',
		'two',
		'three',
		'four',
	])
	return (
		<Accordion className={rootClass} onValueChange={setValue} type="multiple" value={value}>
			<AccordionItem className={itemClass} value="one">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={animatedContentClass}>
					Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
					integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
					habitant sed.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="two">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={animatedContentClass}>
					Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
					porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="three">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Three</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={animatedContentClass}>
					Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
					euismod magna, nec tempor pulvinar eu etiam mattis.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem className={itemClass} value="four">
				<AccordionHeader className={headerClass}>
					<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={animatedContentClass}>
					Odio placerat <a href="#">quisque</a> sapien sagittis non sociis ligula penatibus
					dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
					<button type="button">Cool</button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export function OutsideViewport(): ReactElement {
	return (
		<>
			<p>Scroll down to see tabs</p>
			<div style={{ height: '150vh' }} />
			<p>
				When accordion buttons are focused and the user is navigating via keyboard, the page should
				not scroll unless the next tab is entering the viewport.
			</p>
			<Accordion className={rootClass} type="single">
				<AccordionItem className={itemClass} value="one">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
						integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
						habitant sed.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem className={itemClass} value="two">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
						porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem className={itemClass} disabled value="three">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>Three (disabled)</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
						himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem className={itemClass} value="four">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Odio placerat <a href="#">quisque</a> sapien sagittis non sociis ligula penatibus
						dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
						{}
						<button type="button">Cool</button>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<div style={{ height: '150vh' }} />
		</>
	)
}

export function Horizontal(): ReactElement {
	return (
		<>
			<h1>Horizontal Orientation</h1>
			<Accordion className={rootClass} orientation="horizontal" type="single">
				<AccordionItem className={itemClass} value="one">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>One</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
						integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
						habitant sed.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem className={itemClass} value="two">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>Two</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
						porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem className={itemClass} disabled value="three">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>Three (disabled)</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
						himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem className={itemClass} value="four">
					<AccordionHeader className={headerClass}>
						<AccordionTrigger className={triggerClass}>Four</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent className={contentClass}>
						Odio placerat <a href="#">quisque</a> sapien sagittis non sociis ligula penatibus
						dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
						<button type="button">Cool</button>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	)
}

export function Chromatic(): ReactElement {
	const items = ['One', 'Two', 'Three', 'Four']
	return (
		<>
			<h1>Uncontrolled</h1>
			<h2>Single closed</h2>
			<Accordion className={rootClass} type="single">
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h2>Single open</h2>
			<Accordion className={rootClass} defaultValue="Two" type="single">
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h2>Multiple closed</h2>
			<Accordion className={rootClass} type="multiple">
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h2>Multiple open</h2>
			<Accordion className={rootClass} defaultValue={['One', 'Two']} type="multiple">
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h1>Controlled</h1>
			<h2>Single open</h2>
			<Accordion className={rootClass} type="single" value="Three">
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h2>Multiple open</h2>
			<Accordion className={rootClass} type="multiple" value={['Two', 'Three']}>
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h1>Disabled (whole)</h1>
			<Accordion className={rootClass} disabled type="single">
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h1>Disabled (item)</h1>
			<h2>Just item</h2>
			<Accordion className={rootClass} type="single">
				{items.map(item => (
					<AccordionItem className={itemClass} disabled={item === 'Two'} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h2>with `disabled=false` on top-level</h2>
			<Accordion className={rootClass} disabled={false} type="single">
				{items.map(item => (
					<AccordionItem className={itemClass} disabled={item === 'Two'} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h1>Force mounted contents</h1>
			<Accordion className={rootClass} type="single">
				{items.map(item => (
					<AccordionItem className={itemClass} key={item} value={item}>
						<AccordionHeader className={headerClass}>
							<AccordionTrigger className={triggerClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentClass} forceMount>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h1>State attributes</h1>
			<h2>Accordion disabled</h2>
			<Accordion className={rootAttrClass} defaultValue="Two" disabled type="single">
				{items.map(item => (
					<AccordionItem className={itemAttrClass} key={item} value={item}>
						<AccordionHeader className={headerAttrClass}>
							<AccordionTrigger className={triggerAttrClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentAttrClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h2>Accordion enabled with item override</h2>
			<Accordion className={rootAttrClass} defaultValue="Two" disabled={false} type="single">
				{items.map(item => (
					<AccordionItem
						className={itemAttrClass}
						disabled={['Two', 'Four'].includes(item)}
						key={item}
						value={item}
					>
						<AccordionHeader className={headerAttrClass}>
							<AccordionTrigger className={triggerAttrClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentAttrClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<h2>Accordion disabled with item override</h2>
			<Accordion className={rootAttrClass} defaultValue="Two" disabled type="single">
				{items.map(item => (
					<AccordionItem
						className={itemAttrClass}
						{...(['Two', 'Four'].includes(item) ? { disabled: false } : {})}
						key={item}
						value={item}
					>
						<AccordionHeader className={headerAttrClass}>
							<AccordionTrigger className={triggerAttrClass}>{item}</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={contentAttrClass}>
							{item}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
							viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
							suscipit habitant sed.
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</>
	)
}

export default meta

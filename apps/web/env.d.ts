/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
/// <reference types="@total-typescript/ts-reset" />
import type { ReactElement } from 'react'

declare module '*.mdx' {
	// biome-ignore lint/suspicious/noExplicitAny: this is a configuration file
	let MDXComponent: (props: any) => ReactElement
	// biome-ignore lint/suspicious/noExplicitAny: this is a configuration file
	export const frontmatter: any
	// biome-ignore lint/correctness/noUndeclaredVariables: this is a configuration file
	export default MDXComponent
}

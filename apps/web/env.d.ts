/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
/// <reference types="@total-typescript/ts-reset" />
import type { ReactElement } from 'react'

declare module '*.mdx' {
	let MDXComponent: (props: unknown) => ReactElement
	export const frontmatter: unknown
	// biome-ignore lint/correctness/noUndeclaredVariables: this is a configuration file
	export default MDXComponent
}

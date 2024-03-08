declare module '*.mdx' {
	let MDXComponent: (props: unknown) => ReactElement
	export const frontmatter: unknown
	// biome-ignore lint/correctness/noUndeclaredVariables: this is a configuration file
	export default MDXComponent
}

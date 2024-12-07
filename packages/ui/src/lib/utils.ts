// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as Clsx from '@nick/clsx'
import { twMerge } from 'tailwind-merge'

declare module '@nick/clsx' {
	export type ClassValues = readonly Clsx.ClassValue[]
}

export function clsx<const T extends Clsx.ClassValues>(...classes: [...T]): Clsx.Clsx<T>
export function clsx(...classes: Clsx.ClassValues): string
export function clsx(...classes: Clsx.ClassValues): string {
	return twMerge(Clsx.clsx(classes))
}

export { type VariantProps, cva } from 'class-variance-authority'
export { tv } from 'tailwind-variants'

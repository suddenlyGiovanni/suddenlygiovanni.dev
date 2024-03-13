import { type ClassValue, clsx as _clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function clsx<T extends ClassValue[]>(...inputs: T): string {
	return twMerge(_clsx(inputs))
}

// biome-ignore lint/nursery/noBarrelFile: need a barrel file
export { type VariantProps, cva } from 'class-variance-authority'
export { tv } from 'tailwind-variants'

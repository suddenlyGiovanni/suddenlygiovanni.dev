import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn<T extends ClassValue[]>(...inputs: T): string {
	return twMerge(clsx(inputs))
}

export { tv } from 'tailwind-variants'

import { type ClassValue, clsx as _clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function clsx<T extends ClassValue[]>(...inputs: T): string {
	return twMerge(_clsx(inputs))
}

export { tv } from 'tailwind-variants'

import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn<T extends ClassValue[]>(...inputs: T): string {
  return twMerge(clsx(inputs))
}

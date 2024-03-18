import { test, describe, expect } from 'vitest'
import { generateDjb2Hash } from './generate-djb2-hash'

describe('generateDjb2Hash', () => {
	// Description: This test ensures the function calculates the DJB2 hash correctly for a given input string
	test('hash must be calculated correctly', () => {
		expect(generateDjb2Hash('Hello, World!')).toBe('-1763540338')
	})

	// Description: This test ensures the function generates a different hash for different input strings
	test('hash must be different for different inputs', () => {
		expect(generateDjb2Hash('Goodbye, World!')).toBe('-3937811837')
	})

	// Description: This test ensures the function handles empty strings correctly
	test('hash for empty string must be 5381', () => {
		expect(generateDjb2Hash('')).toBe('5381')
	})
})

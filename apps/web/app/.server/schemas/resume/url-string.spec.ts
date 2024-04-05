// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { UrlString } from './url-string.ts'

type UrlDescriptionTuple = [url: string, description: string]
type UrlDescriptionTupleArray = readonly UrlDescriptionTuple[]

describe('UrlString', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(UrlString)

		test('empty string', () => {
			expect(() => parse('')).toThrow()
		})

		test.each([
			['', 'Empty string'],
			[' ', 'Whitespace'],
			['\t', 'Tab'],
			['\n', 'Newline'],
			['\r', 'Carriage return'],
			['facebook.example.com', 'Without protocol'],
			['http//facebook.example.com', 'Missing colon in protocol'],
			['http:/#', 'Only fragment identifier'],
			['http://', 'No domain or path'],
			['example.com', 'Without http:// or https://'],
			// ['http:/facebook.example.com', 'One slash in protocol'],
			// ['http://facebook.example.c', 'Top level domain less than two characters'],
			// ['http://example', 'Without top level domain'],
			// ['http://example.', 'Domain name ends with a dot'],
			// ['http://.com', 'Missing hostname'],
		] satisfies UrlDescriptionTupleArray)('invalid URL: "%s" => reason "%s"', invalidUrl => {
			expect(() => parse(invalidUrl)).toThrow()
		})

		test.each([
			['https://facebook.example.com', 'HTTPS URL'],
			['http://facebook.example.com', 'HTTP URL'],
			['ftp://facebook.example.com', 'FTP URL'],
			['http://127.0.0.1', 'Local IP address'],
			['http://example.com?foo=bar&baz=qux', 'With query parameters'],
			['https://example.com/#section', 'With fragment identifier'],
			['http://example.com:8080', 'With port number'],
			['http://🍌🍌🍌.ws', 'Punycode encoded URL (Actual domain is xn--qeiaa.ws)'],
			['https://www.übercool.de', 'Internationalized URL'],
		] satisfies UrlDescriptionTupleArray)('valid URL: "%s" => reason "%s"', validUrl => {
			expect(() => parse(validUrl)).not.toThrow()
		})
	})
})

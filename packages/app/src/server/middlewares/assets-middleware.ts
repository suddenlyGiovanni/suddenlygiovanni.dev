import { FileSystem, Headers, HttpMiddleware, HttpServerRequest, HttpServerResponse } from '@effect/platform'
import { Effect, Option } from 'effect'

const oneMinute = 60
const oneHour = 60 * oneMinute
const oneDay = 24 * oneHour
const oneYear = 365 * oneDay

const filenameMatcher = /^([^/]+\.[^/]+)$/
const nestedFilePathMatcher = /^(?:[^/]+\/)+[^/]+\.[^/]+$/

if (import.meta.vitest) {
	const { it, expect, describe } = import.meta.vitest
	const assetMappings: Array<[requestAssetUrl: string, fileAsset: string]> = [
		['/assets/about-KhV7b0eh.js', 'about-KhV7b0eh.js'],
		['/assets/about-KhV7b0eh.js.map', 'about-KhV7b0eh.js.map'],
		['/assets/app-BCbIxvWG.css', 'app-BCbIxvWG.css'],
		['/assets/chunk-HA7DTUK3-BuRpdpNv.js', 'chunk-HA7DTUK3-BuRpdpNv.js'],
		['/assets/chunk-HA7DTUK3-BuRpdpNv.js.map', 'chunk-HA7DTUK3-BuRpdpNv.js.map'],
		['/assets/contact-CAFqY2E-.js', 'contact-CAFqY2E-.js'],
		['/assets/contact-CAFqY2E-.js.map', 'contact-CAFqY2E-.js.map'],
		['/assets/destroy-contact-l0sNRNKZ.js', 'destroy-contact-l0sNRNKZ.js'],
		['/assets/destroy-contact-l0sNRNKZ.js.map', 'destroy-contact-l0sNRNKZ.js.map'],
		['/assets/edit-contact-BdLKQrCo.js', 'edit-contact-BdLKQrCo.js'],
		['/assets/edit-contact-BdLKQrCo.js.map', 'edit-contact-BdLKQrCo.js.map'],
		['/assets/entry.client-CYM7CX8T.js', 'entry.client-CYM7CX8T.js'],
		['/assets/entry.client-CYM7CX8T.js.map', 'entry.client-CYM7CX8T.js.map'],
		['/assets/home-DZNPw7IY.js', 'home-DZNPw7IY.js'],
		['/assets/home-DZNPw7IY.js.map', 'home-DZNPw7IY.js.map'],
		['/assets/root-CKoa7dfp.js', 'root-CKoa7dfp.js'],
		['/assets/root-CKoa7dfp.js.map', 'root-CKoa7dfp.js.map'],
		['/assets/sidebar-BCxAqtYP.js', 'sidebar-BCxAqtYP.js'],
		['/assets/sidebar-BCxAqtYP.js.map', 'sidebar-BCxAqtYP.js.map'],
		['/assets/with-props-CTh-xW_a.js', 'with-props-CTh-xW_a.js'],
		['/assets/with-props-CTh-xW_a.js.map', 'with-props-CTh-xW_a.js.map'],
	] as const

	it.each(assetMappings)(
		'extract file path from given the request resource path `%s`, expected `%s`',
		(requestAssetUrl, fileAsset) => {
			const matchedFilename = filenameMatcher.exec(requestAssetUrl.slice(8))
			expect(matchedFilename).toBeTruthy()
			expect(matchedFilename?.[0]).toBe(fileAsset)
		},
	)

	it('omits non valid paths', () => {
		for (const requestAssetUrl of [
			'/assets/foop/edit-contact-BdLKQrCo.js',
			'/assets/.hidden_path/with-props-CTh-xW_a.js.map',
		]) {
			expect(filenameMatcher.exec(requestAssetUrl.slice(8))).toBeFalsy()
		}
	})

	describe('nested file paths', () => {
		it.each([
			['/folder/file.js', 'folder/file.js'],
			['/folder/file.js.map', 'folder/file.js.map'],
			['/folder/_folder/file.webp', 'folder/_folder/file.webp'],
			['/folder/route/index.html', 'folder/route/index.html'],
			['/folder/route/foop/index.html', 'folder/route/foop/index.html'],
		] as const)('extracts valid nested file paths', (requestAssetUrl, fileAsset) => {
			//
			const matchedFilename = nestedFilePathMatcher.exec(requestAssetUrl.slice(1))
			expect(matchedFilename).toBeTruthy()
			expect(matchedFilename?.[0]).toBe(fileAsset)
		})

		it.each([
			// An empty string after slicing is invalid.
			'',
			// No folder segment: "file.js" only.
			'/file.js',
			// Missing extension.
			'/folder/file',
			// Double slash in the path – not matching the expected single-slash directory separators.
			'/folder//file.js',
			// Trailing slash after file name (which makes it not a file match).
			'/folder/file.js/',
		] as const)('ignores invalid nested file paths', invalidRequestAssetUrl => {
			const matchedFilename = nestedFilePathMatcher.exec(invalidRequestAssetUrl.slice(1))
			expect(matchedFilename).toBeFalsy()
		})
	})
}

export const StaticAssetsMiddleware = HttpMiddleware.make(app =>
	Effect.gen(function* () {
		const httpServerRequest = yield* HttpServerRequest.HttpServerRequest
		const fs = yield* FileSystem.FileSystem

		if (httpServerRequest.method !== 'GET') return yield* app

		const { url } = httpServerRequest

		/**
		 * IF Request url path is of kind '/assets/<fileName>.<fileExtension>'
		 */
		if (url.startsWith('/assets/')) {
			const maybeFilePath = Option.fromNullable(filenameMatcher.exec(url.slice(8))).pipe(
				Option.map(regExpExecArray => `build/client/assets/${regExpExecArray[0]}`),
			)

			if (Option.isSome(maybeFilePath)) {
				const filePath = Option.getOrThrow(maybeFilePath)
				if (yield* fs.exists(filePath)) {
					return yield* HttpServerResponse.file(filePath, {
						headers: Headers.fromInput({
							'Cache-Control': `public, max-age=${oneYear}, immutable`,
						}),
					})
				}
			}
		}

		return yield* app
	}),
)

export const PublicAssetsMiddleware = HttpMiddleware.make(app =>
	Effect.gen(function* () {
		const httpServerRequest = yield* HttpServerRequest.HttpServerRequest
		const fs = yield* FileSystem.FileSystem
		const { url } = httpServerRequest
		const cacheHeaders = Headers.fromInput({
			'Cache-Control': `public, max-age=${oneHour}, immutable`,
		})

		if (httpServerRequest.method !== 'GET') return yield* app
		if (url.startsWith('/__manifest')) return yield* app

		/**
		 * IF request url path is of kind '/<fileName>.<fileExtension>'
		 */
		if (url.startsWith('/')) {
			const maybeFilePath = Option.fromNullable(filenameMatcher.exec(url.slice(1))).pipe(
				Option.map(regExpExecArray => `build/client/${regExpExecArray[0]}`),
			)

			if (Option.isSome(maybeFilePath)) {
				const filePath = Option.getOrThrow(maybeFilePath)
				if (yield* fs.exists(filePath)) {
					return yield* HttpServerResponse.file(filePath, {
						headers: cacheHeaders,
					})
				}
			}

			const maybeNestedFilePath = Option.fromNullable(nestedFilePathMatcher.exec(url.slice(1))).pipe(
				Option.map(regExpExecArray => `build/client/${regExpExecArray[0]}`),
			)

			if (Option.isSome(maybeNestedFilePath)) {
				const nestedFilePath = Option.getOrThrow(maybeNestedFilePath)
				if (yield* fs.exists(nestedFilePath)) {
					return yield* HttpServerResponse.file(nestedFilePath, {
						headers: cacheHeaders,
					})
				}
			}
		}

		return yield* app
	}),
)

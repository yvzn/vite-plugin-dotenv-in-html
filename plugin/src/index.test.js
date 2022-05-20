import { describe, it, expect, vi } from 'vitest';

vi.mock('vite', () => {
	return ({
		loadEnv: vi.fn(() => ({})),
	});
});

import { loadEnv } from "vite";

import dotEnvHTMLPlugin from './index';

describe(dotEnvHTMLPlugin.name, () => {
	it('should expose plugin', () => {
		// When
		const actual = dotEnvHTMLPlugin;

		// Then
		expect(actual).toBeDefined();
	});

	it('should expose plugin name', () => {
		// Given
		const plugin = dotEnvHTMLPlugin;

		// When
		const actual = plugin().name;

		// Then
		expect(actual).toBeDefined();
		expect(actual.length).toBeGreaterThan(0);
	});

	it('should transform VITE_ user variable', () => {
		// Given
		const plugin = dotEnvHTMLPlugin().transformIndexHtml;
		const html = 'Hello, import.meta' + '.env.VITE_SOME_KEY';
		loadEnv.mockReturnValue(({ 'VITE_SOME_KEY': '123' }))

		// When
		const actual = plugin(html);

		// Then
		expect(actual).toBe('Hello, 123');
	});

	it.each([
		['MODE', 'production'],
		['BASE_URL', '/'],
		['PROD', true],
		['DEV', false]
	])('should transform built-in %s variable', (variable, value) => {
		// Given
		const plugin = dotEnvHTMLPlugin().transformIndexHtml;
		const html = 'Hello, import.meta' + `.env.${variable}`;
		loadEnv.mockReturnValue(({ [variable]: value }))

		// When
		const actual = plugin(html);

		// Then
		expect(actual).toBe(`Hello, ${value}`);
	});

	it('should ignore missing user variable', () => {
		// Given
		const plugin = dotEnvHTMLPlugin().transformIndexHtml;
		const html = 'Hello, import.meta' + '.env.VITE_MISSING_KEY';
		loadEnv.mockReturnValue(({ 'VITE_SOME_KEY': '123' }))

		// When
		const actual = plugin(html);

		// Then
		expect(actual).toBe('Hello, import.meta' + '.env.VITE_MISSING_KEY');
	});


	it('should ignore user variable not prefixed with VITE_', () => {
		// Given
		const plugin = dotEnvHTMLPlugin().transformIndexHtml;
		const html = 'Hello, import.meta' + '.env.DB_PASSWORD';
		loadEnv.mockReturnValue(({ 'DB_PASSWORD': 'foobar' }))

		// When
		const actual = plugin(html);

		// Then
		expect(actual).toBe('Hello, import.meta' + '.env.DB_PASSWORD');
	});
});

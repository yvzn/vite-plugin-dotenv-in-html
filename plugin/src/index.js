/*
   Copyright 2021-2022 Yvan Razafindramanana

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { loadEnv } from "vite";

/**
 * A simple ViteJS plugin to process .env variables in index.html.
 *
 * @param {string} mode production, development, etc.
 * @returns a vite plugin definition
 */
export default function dotEnvHTMLPlugin(mode) {
	return {
		name: "vite-plugin-dotenv-in-html",
		transformIndexHtml(html) {
			const env = loadEnv(mode, process.cwd());
			return html.replace(
				/import\.meta\.env\.([A-Z0-9_]+)/g,
				replacerFunction(env)
			);
		},
	};
}

function replacerFunction(env) {
	return function (match, $1) {
		if ($1 in env && shouldTransform($1)) {
			return env[$1];
		}
		return match;
	}
}

function shouldTransform(key) {
	return isUserVariable(key) || isBuiltinVariable(key);
}

function isUserVariable(key) {
	// To prevent accidentally leaking env variables to the client,
	// only variables prefixed with VITE_ are exposed to your Vite-processed code.
	// https://vitejs.dev/guide/env-and-mode.html#env-files
	return key.startsWith("VITE_");
}

function isBuiltinVariable(key) {
	return ["MODE", "BASE_URL", "PROD", "DEV"].includes(key);
}

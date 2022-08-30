# ViteJS plugin: _.env in HTML_

A simple ViteJS plugin to replace _.env_ variables in `index.html`.

(i.e. `import.meta.env.VITE_` variables).

## Installation

```sh
npm install --save-dev vite-plugin-dotenv-in-html
```

## Usage

1. Update `vite.config.js` to support [Conditional config](https://vitejs.dev/.config/#conditional-config)

- i.e. use the `defineConfig` overload that exports a function

2. Then add the following to your `vite.config.js`.

```js
import dotEnvHTMLPlugin from 'vite-plugin-dotenv-in-html';

export default defineConfig(({ mode }) => {
	return {
		plugins: [dotEnvHTMLPlugin(mode)],
	};
});
```

## Important note

Only `import.meta.env.VITE_` variables and built-in variables are replaced:

> To prevent accidentally leaking env variables to the client,
> only variables prefixed with VITE_ are exposed to Vite-processed code.
> https://vitejs.dev/guide/env-and-mode.html#env-files

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)

Copyright 2022 Yvan Razafindramanana

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

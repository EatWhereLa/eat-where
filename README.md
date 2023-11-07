# eat-where-la

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Setting up the project repository on local machine

1. Make sure you have `node`@20 and `pnpm` installed in your local machine
2. Run this command to install them using volta as the package manager
```
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node@20

# install pnpm
volta install pnpm
```
3. Ensure you have a [supabase](https://supabase.com/) project created and retrieve the API url and key under `project settings > API > Project URL / Project API keys`
4. Ensure you have an AWS account with AWS Cognito configured along with an App Client (Everything default)


### Make sure to populate the `.env` file based on the `.env.example` provided in the repository

```
VITE_SUPABASE_URL=<your-supabase-api-url>
VITE_SUPABASE_KEY=<your-supabase-public-api-key>
VITE_COGNITO_USER_POOL=<your-cognito-pool-id>
VITE_COGNITO_CLIENT=<your-cognito-app-client-id>
VITE_COOKIE_DOMAIN="localhost" for dev and your hosted domain URL for production
VITE_MAPS_API_KEY=<your-maps-api-key>
VITE_API_URL=<your-api-url>
```

## Project Setup

```sh
pnpm i
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

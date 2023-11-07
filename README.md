# eat-where

## Setting up the project repository on local machine

1. Make sure you have `node`@20 and [pnpm](https://pnpm.io/installation) installed in your local machine

2. Run this command to install them using volta as the package manager
```
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node@20

# install pnpm
volta install pnpm
```
3. Ensure that you have a [Google Maps API](https://developers.google.com/maps) Key
4. Ensure you have a [supabase](https://supabase.com/) project created and retrieve the API url and key under `project settings > API > Project URL / Project API keys`
5. Ensure you have an AWS account with AWS Cognito configured along with an App Client (Everything default)

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

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).


# About

This repository contains the frontend code for `holopass`. The stack:

- SvelteKit
- TypeScript
- TailwindCSS + DaisyUI
- Supabase for authentication, storage, and real-time events

## Developing

First populate your `.env.local` file.

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

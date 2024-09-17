# About

This repository contains the frontend code for `holopass`. The stack:

- SvelteKit
- TypeScript
- TailwindCSS + DaisyUI
- Supabase for authentication, storage, and real-time events

## Developing

1. Populate your `.env.local` file by copying `.env.example`. Ask @DaniruKun for the values.
2. Install `pnpm` and install dependencies with `pnpm install`
3. Start the dev server with `pnpm dev` and log in using Discord

At the moment, the app always uses the production Supabase instance, and the prod Discord app for Oauth.

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

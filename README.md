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

### Setting up Discord OAuth

To configure local Supabase to handle Discord logins:

0. Ensure your local Supabase instance is stopped.
1. Add the following to your `supabase/config.toml`:

```toml
[auth.external.discord]
enabled = true
client_id = "env(SUPABASE_AUTH_EXTERNAL_DISCORD_CLIENT_ID)"
secret = "env(SUPABASE_AUTH_EXTERNAL_DISCORD_SECRET)"
redirect_uri = "env(SUPABASE_AUTH_REDIRECT_URI)"
```

- You may need to set `auth.site_url` to match your `pnpm run dev` local, like `http://localhost:5173`.

2. Create a new application in the [Discord developer portal](https://discord.com/developers/applications), or reach out to @DaniruKun to fetch the prod values.
3. Fetch the client ID and client secret, and paste them into a `.env` file (NOT `.env.local`, because `supabase` / `npx supabase` won't read it otherwise) with the respective keys in step 1.
4. Add the following to your "Redirects" section in the Discord dev portal:

```
http://127.0.0.1:54321/auth/v1/callback
```

(Supabase is finicky with localhost, so we add both to be safe.)

Your `.env` file should look like this:

```
SUPABASE_AUTH_EXTERNAL_DISCORD_CLIENT_ID=<your client id>
SUPABASE_AUTH_EXTERNAL_DISCORD_SECRET=<your client secret>
SUPABASE_AUTH_REDIRECT_URI="http://127.0.0.1:54321/auth/v1/callback"
```

5. Launch your local Supabase instance.

```sh
npx supabase start
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Updating database schema via Supabase migrations

Once you've updated the schema, use the following command in local dev to regenerate the `database.types.ts` file with the types used by the database.

```bash
npx supabase gen types typescript --local > database.types.ts
# --> make sure the generated file is UTF-8... it likes to pull UTF-16 LE on Windows...
# then run:
npx prettier --write .\src\lib\database.types.ts
```

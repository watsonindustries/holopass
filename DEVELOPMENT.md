# HoloPass Development Guide

This document contains developer information for working with the HoloPass frontend.

## Tech Stack

- SvelteKit
- TypeScript
- TailwindCSS + DaisyUI
- Supabase for authentication, storage, and real-time events

## Getting Started

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

## Working with Badges and Geolocation Data

Users can check into events if they are within 1 mile / 1.6 km of its location, during its runtime.

### Querying badge data

A helpful query to view event location data in more helpful terms:

```sql
select
  id,
  name,
  type,
  st_x(location::geometry) as long,
  st_y(location::geometry) as lat,
  external_url,
  event_start,
  event_end
from badges;
```

### Inserting new badges into Supabase

The current best way to insert badges with geolocation data is to use SQL.

- Go and get the precise lat/long coordinates of the event location. With PostGIS, you will specify like so: `ST_POINT(longitude latitude)`
- You can specify the precise date-time for both `event_start` and `event_end` using ISO format: `YYYY-MM-DD HH:mm:ss(+|-)00:00` (for the timezone after the `ss` seconds, two examples: Eastern Standard Time (EST) is GMT `-05:00`, Japan Standard Time (JST) is GMT `+09:00`)

Example (batch insert):

```sql
insert into public.badges
  (name, type, location, external_url, event_start, event_end)
values
  ('hololive English 2nd Concert -Breaking Dimensions-',
    'concert',
    st_point(-73.957268, 40.645969),
    'https://breakingdimensions.hololivepro.com/'
    '2024-08-24 21:00:00+00:00'::timestamp,
    '2024-08-26 00:00:00+00:00'::timestamp),
  ('HoloLis',
    'meetup',
    st_point(-73.94581, 40.807475),
    '',
    '2024-01-01 09:00:00+00:00'::timestamp,
    '2024-01-02 09:00:00+00:00'::timestamp),
  ('hololive meet taipei',
    'official_event',
    st_point(-73.945826, 40.80629),
    '',
    '2024-01-01 09:00:00+00:00'::timestamp,
    '2024-01-02 09:00:00+00:00'::timestamp),
  ("John Hololive's Grand Tour 1st Fes"
    'official_event',
    st_point(-73.94581, 40.807475),
    'https://hololivepro.com/en/',
    '2024-12-08 19:00:00+00:00'::timestamp,
    '2024-12-10 19:00:00+00:00'::timestamp)
```

You can use a tool like https://www.gps-coordinates.net/ to get the lat/long of an event location.

### Updating badge data

To update badge data, you can use the following query:

```sql
update badges
set
  location = st_point(longitude, latitude),
where id = 'badge id';
``` 

### Migrations

To create a new migration:

```bash
npx supabase migration new <migration_name>
```

To apply migrations:

```bash
npx supabase up
```

To migrate the remote database:

```bash
pnpx supabase migration up --linked
```

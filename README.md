# MR-QR

MR-QR is a Next.js application for QR generation and smart link management.
This project mirrors the RUPEEZ stack for authentication and Supabase integration.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- Email/password + Google OAuth login

## Note

This project intentionally excludes PWA configuration and assets.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Auth + Supabase

- Callback route: `/auth/callback`
- Login route: `/login`
- Session protection is handled via `proxy.ts` and `lib/supabase/middleware.ts`

## Supabase Local

Supabase config and migrations are under `supabase/`.
Initial migration is preserved from RUPEEZ and can be changed later as needed.

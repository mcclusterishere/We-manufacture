# WE Manufacturing

Public-facing site-selection and manufacturing project hub for WE.

## Purpose

This site gives municipalities, economic-development organizations, utilities, property owners, workforce partners, and state agencies one source of truth for WE's Phase 1 U.S. assembly project.

Current planning assumptions:

- Pre-production connected small-mobility company
- Approximately 125cc-class street motorcycle platform
- Embedded telematics, software, and connected ownership/fleet capabilities
- Approximately 10–15 initial Phase 1 jobs
- Existing 10,000–20,000 sq. ft. industrial/manufacturing building preferred
- Preliminary $1M–$3M total project envelope, subject to technical and financing validation
- Connecticut and Georgia currently under evaluation

## Stack

- Next.js 16 / React 19
- TypeScript
- Supabase intake storage
- GitHub Actions CI
- Intended deployment: Vercel

## Site-selection intake

The public form submits to `/api/site-selection`, which validates the payload and writes into `public.we_site_submissions` in the existing McCluster Supabase project.

Security model:

- Row Level Security enabled
- `anon` / `authenticated` roles have INSERT only
- No public SELECT, UPDATE, or DELETE access
- Server route performs field validation and normalization
- Honeypot field blocks basic automated spam

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Checks:

```bash
npm run typecheck
npm run build
```

## Environment variables

The deployment may set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

The current route includes the project's public Supabase URL and publishable key as deployment-safe fallbacks. Never add a Supabase service-role key to this repository or expose one to the browser.

## Project contact

Matthew McCluster  
matthew@mccluster.org

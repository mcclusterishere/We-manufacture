# MCCLUSTER CONTROL PLANE — READ THIS FIRST

This repository (`mcclusterishere/We-manufacture`) is a **product** satellite of the McCluster control plane.
Default branch: `main`.

# McCluster satellite — read this before you touch anything

This repository is a **satellite** of the McCluster control plane.

Canonical law lives in the control repo. If this file and that file disagree, the control repo wins.

- Control repo: https://github.com/mcclusterishere/mccluster
- Agent law: https://github.com/mcclusterishere/mccluster/blob/main/AGENTS.md
- Ecosystem map: https://github.com/mcclusterishere/mccluster/blob/main/docs/control-plane/ECOSYSTEM.md
- Cloudflare project / Worker: `mccluster`
- Public edge: `matthew.mccluster.org` / `mccluster.org`
- API: `https://api.mccluster.org`
- Data: Supabase `zmnhbrjyhxzhkxmhkexs`
- Tenant slug: `we-manufacture`
- App key: `we-manufacture-web`

There is no Worker named `mccluster-core`. Do not create one.

## What you are allowed to do here

- Product UI, brand, and local features for THIS satellite.
- Call McCluster APIs / Supabase tables that already exist.
- Submit inquiries, site packages, and events into the McCluster plane (never as a second source of truth).

## What you must not do

- Create a new auth, database, admin, billing, Worker, or social scheduler.
- Auto-push GitHub Actions onto a feature branch (`git push` from CI onto an open PR).
- Rewrite a shipping page unless the owner named that file.
- "Rebuild the backend" inside this repo. The backend is McCluster.
- Write to a second Supabase project. The rogue `fxbkvcrfbbcmrrupdcjt` path is retired. Intake goes to `https://api.mccluster.org/v1/inquiries` with `org=we-manufacture`.

## If you are ChatGPT, Claude, Codex, Cursor, Gemini, or Copilot

You keep failing this ecosystem by treating every repo as greenfield. It is not. McCluster is the plane. Read `CLAUDE.md` next. Then work.

Local product notes, if any, belong below this block. Do not delete this block.

## Never draw a logo

The artwork the owner supplies is the only source of truth for any mark, forever. Do not trace, approximate, reconstruct, recolour, or composite one. Cropping a supplied file is fine; adding a shape it does not contain is drawing. If the variant you need does not exist, ask for it.

The supplied kit in this repo:

| File | What it is |
| --- | --- |
| `public/brand/we-icon.png` | the app icon |
| `public/brand/we-logo.png` | the full lockup |
| `public/brand/we-mark.png` | the wrench, gradient |
| `public/brand/we-mark-white.png` | the wrench, white |

If you find a hand-drawn `we-icon.svg` of five rectangles: delete it, do not reference it.

## Deployment law

- **Never deploy this project to Vercel.** Whip Equipped web properties use Cloudflare.
- `whipequipped.com` is the canonical public domain for this site.
- Preserve existing email DNS while changing web DNS. Do not alter MX, SPF, DKIM, or DMARC records as part of a web deployment.

## Local product law

- This is the public WE 125 / WE Manufacture site: product, line, list, and municipal site-selection.
- Inquiries and site packages proxy through `/api/inquiries` and `/api/site-selection` to McCluster. They are worked from Control (`we-manufacture.html`, inbox, CRM).
- Do not keep a localStorage CRM, a second leads table, or a parallel admin.

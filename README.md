# WE Manufacture

**Present this URL — not the GitHub source tree:**

# [https://mcclusterishere.github.io/We-manufacture/](https://mcclusterishere.github.io/We-manufacture/)

`github.com/mcclusterishere/We-manufacture` is the repo. The live site is GitHub Pages on `main`.

WE 125 — a city motorcycle assembled in America, connected from the harness.

This repo is a satellite of McCluster Control. Auth, inbox, CRM, and the operator desk live on the plane. This site renders the product and files the list.

## Plane

| Piece | Canonical |
| --- | --- |
| Control repo | `mcclusterishere/mccluster` |
| API | `https://api.mccluster.org` |
| Tenant | `we-manufacture` |
| App | `we-manufacture-web` |
| Data | Supabase `zmnhbrjyhxzhkxmhkexs` |
| Operator desk | [matthew.mccluster.org/we-manufacture.html](https://matthew.mccluster.org/we-manufacture.html) |
| Public site | [mcclusterishere.github.io/We-manufacture](https://mcclusterishere.github.io/We-manufacture/) |

Public forms POST to `https://api.mccluster.org/v1/inquiries` with `org=we-manufacture`. Do not add a second database.

## Stack

- Next.js 16 / React 19
- TypeScript
- Tailwind v4
- GitHub Actions CI + GitHub Pages from `main`

## Pages

- `/` — the bike
- `/platform` — the 125
- `/build` — the line
- `/interest` — the list
- `/site` — municipal / site-selection package

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

## Contact

Matthew McCluster  
matthew@mccluster.org

# WE Manufacture

Public site for Whip Equipped: the WE 125 vehicle, connected mobility systems, autonomy research, fleet operations, and the U.S. manufacturing path.

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

Public forms POST to `/api/inquiries` and `/api/site-selection`, which forward to `POST /v1/inquiries` with `org=we-manufacture`. Do not add a second database.

## Stack

- Next.js 16 / React 19
- TypeScript
- Tailwind v4
- GitHub Actions CI
- Deployment: Cloudflare only. Do not use Vercel for this project.

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
matthew@whipequipped.com

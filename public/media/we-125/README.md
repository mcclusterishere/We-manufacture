# WE 125 — hero visuals

Product imagery for the WE 125 platform. Served by Next.js from `public/`, so
the public path is `/media/we-125/<file>`.

These are concept renders, not photographs of a built unit. Anything published
from this directory must be labelled as a render until prototype photography
from the Phase 1 build is available, at which point these are replaced in place.

## Current files

| File | Shot | Size | Background |
| --- | --- | --- | --- |
| `we-125-front-three-quarter-urban.png` | front 3/4 | 1672 × 941 | urban sunset scene, city skyline |
| `we-125-side-profile-studio.png` | full side profile | 1672 × 941 | studio grey |
| `we-125-rear-three-quarter-studio.png` | rear 3/4 | 1672 × 941 | studio grey |
| `we-125-cutout-side-profile.png` | side profile | 1448 × 1086 | **transparent** (RGBA, 54% alpha-zero) |
| `we-125-detail-front-end.png` | headlight / fairing / bars detail crop | 1448 × 1086 | studio grey |

## Still outstanding

- Flagship hero: front 3/4 on a clean, simple background. The urban shot above
  is the only front 3/4 on hand and reads as a lifestyle scene, not a launch
  image.
- Mid-body / tank / branding detail crop
- Rear / seat / tail detail crop
- Rider image (scale and use context)
- Fleet / lineup image (multiple units)
- Optimized derivatives: WebP and resized variants. The files here are
  full-resolution masters and are committed as-is; re-encoding the cutout must
  preserve its alpha channel.

## Rules

The WE wrench mark and `WE 125` lockup appearing on these renders come from the
owner's artwork. Per `AGENTS.md` in the control repo, no mark in this directory
may be drawn, traced, recoloured, or composited onto a shape the supplied file
does not already contain. Cropping is fine; adding is not.

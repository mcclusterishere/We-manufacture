# WE 125 — hero visuals

Product imagery for the WE 125 platform. Served by Next.js from `public/`, so
the public path is `/media/we-125/<file>`.

These are concept renders, not photographs of a built unit. Anything published
from this directory must be labelled as a render until prototype photography
from the Phase 1 build is available, at which point these are replaced in place.

## Product shots

| File | Shot | Size | Background |
| --- | --- | --- | --- |
| `we-125-side-profile-studio.png` | full side profile | 1672 × 941 | studio grey |
| `we-125-rear-three-quarter-studio.png` | rear 3/4 | 1672 × 941 | studio grey |
| `we-125-cutout-side-profile.png` | side profile | 1448 × 1086 | **transparent** (RGBA, 54% alpha-zero) |

## Detail crops

| File | Shot | Size | Background |
| --- | --- | --- | --- |
| `we-125-detail-front-end.png` | headlight, fairing, bars | 1448 × 1086 | studio grey |
| `we-125-detail-mid-body.png` | tank, wrench mark, `WE 125` decal, engine | 1448 × 1086 | studio grey |
| `we-125-detail-tail.png` | tail light, seat, plate, exhaust can | 1448 × 1086 | studio grey |

## Lifestyle scenes

| File | Shot | Size | Scene |
| --- | --- | --- | --- |
| `we-125-front-three-quarter-urban.png` | front 3/4 | 1672 × 941 | elevated deck, skyline at dusk, lit wall |
| `we-125-front-three-quarter-curbside.png` | front 3/4 | 1672 × 941 | street curbside, wet pavement, sunset |
| `we-125-rider-curbside.png` | rider seated, front 3/4 | 1672 × 941 | same curbside location |
| `we-125-fleet-lineup-curbside.png` | five units in a row | 1672 × 941 | plaza, same location family |

The three curbside scenes share a location and light, so they cut together as a
sequence. The rider is helmeted and in full gear with no identifying features.

## Still outstanding

- Flagship hero: front 3/4 on a clean, simple background. Both front 3/4 shots
  on hand are lifestyle scenes, so the launch-image slot is still unfilled.
- Brand assets — logo lockups, mark, favicon, app icon. Not in this repository
  at all yet; the supplied kit currently lives in the control repo under
  `assets/img/` (`we-logo.png`, `we-logo-dark.png`, `we-icon*.png`,
  `we-mark.png`, `we-mark-white.png`).
- Optimized derivatives: WebP and resized variants. The files here are
  full-resolution masters and are committed as-is; re-encoding the cutout must
  preserve its alpha channel.

## Rules

The WE wrench mark and `WE 125` lockup appearing on these renders come from the
owner's artwork. Per `AGENTS.md` in the control repo, no mark in this directory
may be drawn, traced, recoloured, or composited onto a shape the supplied file
does not already contain. Cropping is fine; adding is not.

Signage and wall copy visible inside the lifestyle scenes ("RIDE A BRIGHTER
TOMORROW", "MORE RIDERS A BRIGHTER TOMORROW", "FLEET RENTAL MOBILITY A CLEANER
CITY") is set dressing generated as part of each render. It is not approved
brand copy and should not be lifted into site text or treated as a tagline.

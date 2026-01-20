# Copilot Instructions

## App shape

- Next.js 15 (App Router) + TypeScript; tailwindcss v4 + tw-animate; Biome for lint/format.
- Data via Prisma/PostgreSQL (Neon adapter in prod); Prisma client output in `src/prisma/generated`.
- Auth handled by Better Auth (`src/lib/auth`); middleware protects `/admin` and redirects to `/auth/sign-in`.
- i18n with next-intl (locales: `de`, `en`); locale is read from `NEXT_LOCALE` cookie via `src/services/locale.ts`.
- UI primitives live under `src/components/ui`; shared layouts under `src/components/layouts`; feature UIs under `src/components/features`.
- Public dealer site at `/(website)/[profileSlug]`; embed widget at `/embed/[profileSlug]`; admin area under `/admin`.

## Conventions

- Prefer server actions in `src/lib/actions` for DB mutations; keep Prisma calls inside actions or API routes.
- Keep types in `src/lib/types/*.d.ts`, validators in `src/lib/validators`, constants in `src/lib/constants`.
- Use `cn` from `src/lib/utils` for class merging; avoid inline string concat for classNames.
- Stick to tailwind utility-first styling; respect existing light/dark CSS vars in `globals.css`.
- Use zod schemas from validators; surface errors via `sonner` toasts where applicable.
- When adjusting car/profile/location flows, ensure listing flag, image CID handling, and location main flag logic remain correct.
- Reuse shared car details component (`src/components/features/car-details`) across contexts; keep print styles intact.
- Localization: wrap user-facing text with `useTranslations`/`getTranslations`; add keys to `src/lib/i18n/messages/*`.

## Tooling & commands

- Format/lint: `npm run format` (biome format), `npm run lint` (biome check).
- Dev server: `npm run dev`; build: `npm run build` (turbopack); Prisma: `npx prisma migrate dev`, `npx prisma generate`, `npx prisma studio`.

## Environment

- Required env: `DATABASE_URL`, `BETTER_AUTH_URL`, `PINATA_JWT`, `PINATA_GATEWAY`, `NEXT_PUBLIC_APP_URL` (for embed/links).
- Pinata uploads rely on JWT/gateway; deleting cars should unpin associated CIDs.

## Testing/QA hints

- For embed/public pages, verify listed-only cars and theme query (`?theme=dark`) still work.
- Opening hours endpoints should round-trip UI ↔ DB formats; revalidate affected paths when saving.
- Auth flows: sign-in/up via Better Auth; ensure session-dependent actions use `auth.api.getSession` and respect middleware redirect.

## Accessibility & UX

- Maintain keyboard nav and focus states on dialogs, tables, and gallery; keep print styles for car details (`.printable`, `.no-print`).
- Avoid introducing non-ASCII text unless required by locale content.

# Skandiora content dashboard (Sanity Studio)

Editors change website content here — company details, page headlines, FAQs, founder, testimonials, gallery and MBBS destinations. Page layouts and design stay in the website code.

- **Studio:** hosted free by Sanity at `https://skandiora.sanity.studio`; `yoursite.com/studio` redirects there.
- **Project:** `n2374y3w`, dataset `production`.
- **Website side:** content is read in `lib/cms/`. Every field falls back to the built-in content in `data/`, so an empty field or a Sanity outage never blanks a page.

## Go-live steps (in this order)

1. **CORS** — sanity.io/manage → API → CORS origins: add `http://localhost:3000` and the live site URL, both with *Allow credentials*.
2. **Import the current content** (once):
   - sanity.io/manage → API → Tokens → *Add API token*, name `Content import`, permission **Editor**.
   - Put it in the website's `.env.local` as `SANITY_API_WRITE_TOKEN=…` (never commit it).
   - From this `studio/` folder: `npx sanity exec scripts/import-content.ts -- --dry-run` to preview, then without `--dry-run` to import. Safe to re-run: nothing existing is overwritten or duplicated.
   - Delete the token afterwards (sanity.io/manage → API → Tokens) — it is only needed for the import.
3. **Deploy the Studio:** `npx sanity login`, then `npm run deploy` (hostname `skandiora`). Add the printed `appId` to `sanity.cli.ts` under `deployment`.
4. **Website environment variables** (hosting provider, and `.env.local` for development) — see `../.env.example`:
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`. Redeploy the website.
5. **Publish webhook** — sanity.io/manage → API → Webhooks → *Create webhook*:
   - URL: `https://<live-site>/api/revalidate` · Dataset: `production` · Trigger on: Create, Update, Delete
   - Filter: leave empty · HTTP method: POST · Secret: the same value as `SANITY_REVALIDATE_SECRET`
   - After this, a published change appears on the site on the next page load.
6. **Invite editors** — sanity.io/manage → Members → Invite, role **Editor**.

> Import (step 2) before switching the live site to Sanity (step 4): testimonials follow Sanity exactly, so an empty dataset would hide that section.

## Everyday development

```bash
npm install        # first time only
npm run dev        # Studio at http://localhost:3333
npm run build      # check the schema compiles
npm run deploy     # publish Studio changes (schema edits) to skandiora.sanity.studio
```

Schema lives in `schemaTypes/`; the menu is in `structure.ts`. Pages and settings are single documents (fixed IDs such as `homePage`); services can be edited but not created or deleted, because their layouts live in the website code. If you add a field, also read it in `lib/cms/content.ts` with a fallback.

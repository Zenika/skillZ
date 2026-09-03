# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SkillZ** is a skill management platform for Zenika employees — tracks competencies, certifications, and helps match profiles with missions. The repo contains a Next.js 15 web app, a Slack bot (`/bot-slack`), and Hasura + PostgreSQL data infrastructure.

## Commands

```bash
# Development
npm run dev                   # Start dev server (localhost:3000)
npm run generate:local        # Regenerate TypeScript types from Hasura schema (dotenv)
npm run generate              # Same, uses env vars directly

# Testing
npm run test:unit             # All unit tests
npm run test:unit -- --testPathPattern="SearchBar"   # Single test file
npm run test:unit -- --testNamePattern="renders correctly"  # Single test by name
npm run cypress:open          # E2E tests (interactive)
npm run cypress:run           # E2E tests (headless) — requires build:e2e + start:e2e first

# Lint & format
npm run lint && npm run format   # Check
npm run lint:fix && npm run format:fix  # Fix

# Local infra (Hasura + PostgreSQL)
docker compose up -d
npm run hasura migrate apply && npm run hasura metadata apply && npm run hasura seed apply
npm run hasura console        # Web UI for schema dev — always use this, not raw http://localhost:8080
```

## Architecture

### GraphQL / Apollo Flow

GraphQL operations live in `/src/graphql/{queries,mutations}/` as hand-written `.ts` files. Running `npm run generate` introspects the Hasura schema and outputs `/src/generated/graphql.tsx` — **never edit this file**. It contains all React hooks (`useGetSkillsQuery`, `useUpdateSkillMutation`, etc.) and TypeScript types. Components import hooks from there.

Apollo Client is initialized in `GraphQLProvider.tsx` and includes the Auth0 JWT token in every request automatically.

### Authentication (Auth0)

`src/env.ts` validates required `NEXT_PUBLIC_AUTH0_*` env vars at startup (throws if missing). The login flow goes: `/login.tsx` → Auth0 → `/auth.tsx` → home. `AuthProvider.tsx` wraps the entire app.

### Providers

All global state lives in context providers (`/src/providers/`), stacked in `_app.tsx`:
- `GraphQLProvider` — Apollo Client
- `AuthProvider` — Auth0 session
- `DarkModeProvider` — light/dark toggle, persisted in localStorage
- `I18nProvider` — en/fr translations from `/i18n/`
- `TutorialModeProvider` — auto-activated for users with 0 skills
- `AdminProvider` — admin feature toggles

### Data Referentials

Master data (skills, certifications, agencies, categories, tags, topics) lives in `/hasura/seeds/*.sql`. A GitHub Actions workflow (`.github/workflows/update-referentials.yml`) runs weekly on Mondays to fetch approved data from `skills.zenika.com` via `/scripts/update-*-referentiel.mjs` and opens a PR with updated seed files.

### Component Organization

Components follow atomic design: `atoms/` → `molecules/` → `organisms/` → `templates/`. Unit tests mirror this in `/test/unit/`.

## Business Logic Rules

Documented in `/doc/rg.md` — reference rule codes in code comments when implementing features:
- **MG_TRENDING_SKILL_LIMIT**: 10 trending skills shown before search
- **MG_NEW_USER**: New users must select an agency before using the app
- **MG_TUTORIAL_MODE**: Activated automatically for users with 0 skills

## Environment Variables

Required vars (validated at startup in `src/env.ts`):
- `NEXT_PUBLIC_GRAPHQL_URL` — Hasura GraphQL endpoint
- `NEXT_PUBLIC_BASE_URL` — App URL
- `NEXT_PUBLIC_AUTH0_DOMAIN`, `NEXT_PUBLIC_AUTH0_CLIENT_ID`, `NEXT_PUBLIC_AUTH0_AUDIENCE`

Infra vars (not validated by app, needed for Docker/Hasura):
- `HASURA_ADMIN_SECRET`, `SKILLZ_GRAPHQL_JWT_SECRET`, `HASURA_ACHIEVEMENTS_ENDPOINT`, `NEXT_API_BEARER_TOKEN`

E2E tests require `.env.test` and `cypress.env.json` with test user credentials; the test user must have a clean DB state before each run.

## Key Notes

- **TypeScript strict mode is off** (`strict: false` in tsconfig.json) — be mindful of implicit `any`.
- After any Hasura schema change, run `npm run generate:local` to keep types in sync.
- Prettier config: 4-space indent, no semicolons, single quotes, trailing commas (es5).

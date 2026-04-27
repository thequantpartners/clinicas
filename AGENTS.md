# AGENTS.md

## Project Context

IA Consultor App is a SaaS MVP for pymes in Peru and Latam. The product interviews business owners about their processes, detects operational leaks with AI, and generates two reports:

- Free light PDF
- Paid complete PDF

The main monetization path is consulting. The PDF should expose problems, recommend AI solutions, and create demand for implementation services.

## Target User

- Small and medium businesses
- Peru first
- Latam later
- Non-technical owners or managers
- Businesses with manual processes, weak follow-up, poor visibility, or operational inefficiencies

## MVP Scope

Build the smallest usable web product that validates:

- Users complete a guided diagnostic
- AI identifies useful business leaks
- Users understand the light report
- Users are willing to pay for the complete report
- Some users request consulting help

Avoid enterprise features, complex admin panels, multi-tenant complexity, and advanced analytics until validation.

## Core Flow

1. User lands on simple marketing page
2. User starts diagnostic
3. App asks structured business questions
4. AI analyzes answers
5. App generates free light report
6. User sees locked complete report preview
7. User pays once
8. App releases complete PDF
9. User can request consulting

## Required Features

- Landing page
- Basic auth
- Guided diagnostic form or chat
- AI analysis with structured output
- Free PDF light generation
- Paid PDF complete generation
- One-time payment integration
- Report unlock after payment
- Simple diagnosis history

## Out Of Scope For MVP

- Subscriptions
- Team accounts
- Multi-workspace support
- Advanced CRM
- Complex dashboards
- Automated WhatsApp agents
- Full no-code automation builder
- Custom report editor
- Mobile app

## Product Rules

- Optimize for speed of validation
- Prefer clear workflows over clever UI
- Keep business language simple
- Use Peru/Latam context
- Recommend practical low-cost tools
- Make every report actionable
- Always include next steps
- Always create a consulting upsell path

## AI Rules

AI output must be structured, not free-form only.

Every diagnosis should produce:

- Business summary
- Main process issues
- Detected leaks
- Impact level
- Recommended AI solutions
- Priority order
- Roadmap 30/60/90 days
- Consulting CTA

Use JSON or schema validation before rendering reports.

## PDF Rules

Light PDF:

- Short
- Free
- Useful but incomplete
- Shows main leaks
- Teases complete report

Complete PDF:

- Detailed
- Paid
- Actionable
- Prioritized
- Includes roadmap
- Includes recommended tools
- Includes consulting CTA

## Technical Direction

Recommended stack unless project decides otherwise:

- Frontend: Next.js
- Styling: Tailwind CSS
- Backend: Next.js API routes or server actions
- Database: PostgreSQL
- ORM: Prisma
- Auth: Better Auth or NextAuth
- AI: OpenAI API
- Payments: Mercado Pago or Culqi
- PDF: server-side HTML-to-PDF
- Storage: S3-compatible storage

## Data Model Draft

Minimum entities:

- User
- Diagnosis
- Answer
- Report
- Payment

Diagnosis owns answers and reports. Payment unlocks the complete report.

## Development Principles

- MVP first
- Small modules
- Typed data
- Server-side validation
- No premature abstractions
- No unrelated refactors
- No fake completed features
- Persist important project decisions in docs

## Current Planning File

Use this file as the MVP checklist:

- `ia-consultor-plan.md`

Keep it updated when scope changes.

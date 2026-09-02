<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio Project Rules

## Architecture & Folder Structure
This project strictly follows a feature-based architecture to separate concerns:
- `src/app`: Next.js app router. Thin layer, primarily handling routes and layouts. NO LOGIC here.
- `src/features`: Domain logic lives here. Grouped by feature (e.g., projects, contact, about, home). Each feature has its own components, data, types, and utilities.
- `src/components`: TRUE cross-feature shared UI only (e.g., UI library components like Button, Input) and layout components (e.g., Navbar, Footer).
- `src/lib`: Generic, feature-agnostic utilities, constants, and metadata SEO helpers.
- `src/hooks`: Only truly shared hooks.
- `src/types`: Only truly global types.
- `src/config`: Site configuration, nav links, and social links.

## Coding Standards & Quality
- **Zero Lint & Build Errors:** Code must compile without any linting or build errors before being finalized.
- **Best Practices:** Always follow standard React/Next.js best practices (e.g., proper hook usage, memoization where necessary, accessibility).
- **Clean Architecture:** Maintain strict separation of concerns, keeping domain logic (features) isolated from UI presentation (components).
- **Code Reusability:** Build generic, highly reusable UI components. Abstract shared logic into custom hooks or utility functions.

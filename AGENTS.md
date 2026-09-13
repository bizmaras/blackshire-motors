# Blackshire Motors — Agent Delegation & Specialization Guidelines

This repository utilizes a multi-agent specialized architecture for development, optimization, data integrity, and security.

## Active Project Agents

### 1. Frontend & UI/UX Specialist (`frontend_engineer`)
- **Scope**: React (TypeScript), Tailwind CSS, Framer Motion, responsive design (Mobile 375px & Desktop).
- **Standards**: Zero horizontal overflow (`overflow-x-clip`), fluid typography, accessible button targets, dark luxury theme consistency (#070709, gold/amber accents).
- **Key Files**: `src/App.tsx`, `src/components/*`, `index.html`.

### 2. Performance & SEO Director (`performance_seo_agent`)
- **Scope**: Google Lighthouse score perfection (Performance, Accessibility, Best Practices, SEO, Agentic Browsing: target 100% / 3/3).
- **Standards**: Core Web Vitals (LCP < 2.5s, CLS = 0, FID/INP optimal), image preloading, structured data (Schema.org JSON-LD AutoDealer/AutoRepair), `llms.txt` compliance.
- **Key Files**: `public/llms.txt`, `public/robots.txt`, `public/sitemap.xml`, `vercel.json`.

### 3. Security & Quality Assurance (`security_qa_agent`)
- **Scope**: Vulnerability assessments, CSP headers, XSS prevention, sanitized form submissions, safe external links (`rel="noopener noreferrer"`).
- **Standards**: Strict Content-Type sniffing prevention, Frame Options (DENY), clean permissions policy.
- **Key Files**: `vercel.json`, form handlers in `src/components/*`.

### 4. Inventory & Data Specialist (`inventory_data_agent`)
- **Scope**: Vehicle inventory dataset management, pricing accuracy, CARFAX records, vehicle specifications, filter logic.
- **Standards**: Validated JSON schemas, proper image URLs, accurate tax calculations (0% Delaware sales tax).
- **Key Files**: `blackshire_real_inventory.json`, `src_vehicles_ready.json`, `scraped_inventory.json`.

## Multi-Agent Workflow Protocol
1. **Delegation**: When complex tasks are received, the primary orchestrator delegates subtasks to the appropriate specialized subagents concurrently.
2. **Verification**: Code changes must be built and verified with `npm run build` and automated Lighthouse / linters before reporting back.
3. **Documentation**: Any schema or structural changes must be reflected in `llms.txt` and relevant schema markup.

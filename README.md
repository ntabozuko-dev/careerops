# CareerOps

**Recruitment Intelligence & Job Application Analytics Platform**

> From tracking applications to understanding recruitment outcomes.

**Status:** Planning / early development  
**Repository:** [ntabozuko-dev/careerops](https://github.com/ntabozuko-dev/careerops)  
**License:** Not yet selected

## Overview

CareerOps is a planned full-stack web application for tracking job applications, monitoring recruitment pipelines, and analysing job-search performance. It aims to turn scattered application records into actionable insights through a private, interactive dashboard.

The project serves two purposes:

1. **Practical:** Organise job applications, follow-ups, and outcomes in one place.
2. **Engineering:** Demonstrate modern frontend development, relational database design, analytics, security, testing, documentation, and cloud deployment.

> **Development notice:** This README describes the intended product. The features below are planned unless explicitly marked as complete. There is no production deployment yet.

## Problem Statement

Job seekers often apply through several websites and communicate with multiple recruiters. A spreadsheet can record submissions, but it is less convenient for preserving recruitment histories and understanding which roles, application sources, or CV versions generate interviews.

CareerOps will provide structured application records, historical status events, visual analytics, and actionable follow-up reminders—all in a lightweight, browser-based interface.

## Project Objectives

- Centralise job applications and recruitment activities.
- Track an application's progression without losing earlier status changes.
- Measure screening, interview, and offer conversion rates.
- Compare recruitment outcomes across career tracks, CV versions, and application sources.
- Highlight overdue follow-ups and upcoming recruitment actions.
- Protect private data with authentication and database access controls.
- Deploy on services with a viable free-tier option.
- Maintain the software through issue tracking, pull requests, automated tests, and documentation.

## Planned MVP Features

### Application Management

- Add, view, edit, search, and filter applications.
- Record company, role, location, source, job URL, application date, and CV version.
- Assign recruitment statuses such as *Saved*, *Applied*, *Screening*, *Assessment*, *Interview*, *Offer*, *Rejected*, and *Withdrawn*.
- Record notes and next actions.

### Recruitment History

- Preserve every status change with a timestamp.
- Record employer contacts, assessments, and interviews.
- Keep closed and withdrawn applications distinguishable from pending applications.

### Analytics Dashboard

- Display application counts and conversion rates.
- Visualise the recruitment funnel and application trends.
- Break down outcomes by career track, CV version, and application source.
- Analyse employer response times where response dates are known.
- Filter metrics by application date or cohort.

### Follow-up Management

- Record follow-up dates and next actions.
- Highlight overdue actions and upcoming assessments or interviews.

### Privacy and Data Portability

- Restrict personal records to the authenticated owner.
- Support CSV export for backup and portability.
- Use synthetic records for any public portfolio demonstration.

## Proposed Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React + TypeScript | Interactive, type-safe UI |
| Build tool | Vite | Development and production builds |
| Styling | Tailwind CSS | Responsive layout and components |
| Charts | Recharts | Recruitment analytics visualisation |
| Database | PostgreSQL (Supabase) | Relational data storage |
| Auth / data API | Supabase | Authentication and controlled data access |
| Hosting | Cloudflare Pages | Static frontend hosting |
| Unit tests | Vitest | Logic and component testing |
| Browser tests | Playwright | End-to-end workflows |
| Version control / CI | GitHub + GitHub Actions | Issues, PRs, and automated checks |

The stack may be adjusted if implementation or free-tier constraints warrant it. Free tiers are subject to provider limits and policy changes.

## Proposed Architecture

```text
               +----------------------------+
               | Browser: React + TypeScript|
               | UI, forms, charts, analytics|
               +-------------+--------------+
                             |
                        HTTPS / SDK
                             |
               +-------------v--------------+
               | Supabase Auth + Data API   |
               +-------------+--------------+
                             |
               +-------------v--------------+
               | PostgreSQL                 |
               | Row Level Security (RLS)  |
               | Applications / Events     |
               | Activities / CV Versions  |
               +----------------------------+

GitHub repository -- CI checks --> Cloudflare Pages deployment
```

**Design choice:** The first version will rely on managed database and authentication services rather than a custom backend server. This keeps the MVP small while still providing practical experience with API integration, access controls, and relational data modelling.

## Initial Data Model

| Entity | Responsibility |
| --- | --- |
| `applications` | Main job application details and current status |
| `status_events` | Immutable history of recruitment status transitions |
| `activities` | Recruitment contacts, events, notes, and next actions |
| `cv_versions` | Resume variants and their target job families |

Application records will belong to an authenticated user. Database policies will be designed to prevent users from reading or modifying records they do not own.

## Recruitment Metrics

Definitions matter: an application may reach screening and later be rejected. Status-history data ensures that the original screening event still counts.

| Metric | Definition |
| --- | --- |
| Screening conversion | Applications that reached screening / submitted applications |
| Interview conversion | Applications that reached interview / submitted applications |
| Employer response rate | Submitted applications receiving a response / submitted applications |
| Average time to first response | Average elapsed time from submission to first recorded employer response |
| Follow-up backlog | Outstanding next actions with dates earlier than today |

Analytics will account for unknown dates and small samples. Early insights should be interpreted as observed trends, not predictions of hiring success.

## Security and Privacy

- **Private by default:** Real application data will not appear in the public repository.
- **Authentication:** Access to personal records will require sign-in.
- **Authorisation:** PostgreSQL Row Level Security will enforce record ownership.
- **No secrets in Git:** Environment-specific credentials and secret keys must never be committed.
- **Client credentials:** Only frontend-safe, publishable credentials may be used in browser code, together with correctly configured RLS.
- **Demo data:** Public portfolio screenshots or demonstrations must use synthetic records.
- **Backups:** CSV export will provide a user-controlled copy of application records.

## Development Roadmap

### Milestone 1 — Planning and Architecture

- [ ] Finalise functional and non-functional requirements.
- [ ] Establish the GitHub Project board and issue backlog.
- [ ] Create interface wireframes and an initial database ERD.
- [ ] Record key architecture decisions.

### Milestone 2 — Core Application

- [ ] Initialise the React + TypeScript project.
- [ ] Configure Supabase and version-controlled migrations.
- [ ] Implement authentication and RLS policies.
- [ ] Build application CRUD operations.
- [ ] Record application status-history events.

### Milestone 3 — Dashboard and Analytics

- [ ] Implement conversion-rate calculations.
- [ ] Add charts and date filters.
- [ ] Add follow-up tracking.
- [ ] Add CSV export.

### Milestone 4 — Testing and Quality

- [ ] Unit-test metric calculations and validation rules.
- [ ] Integration-test persistence and access control.
- [ ] Run browser-based tests of critical workflows.
- [ ] Verify responsive layouts and accessibility basics.

### Milestone 5 — Deployment and Documentation

- [ ] Configure CI checks and frontend hosting.
- [ ] Deploy and verify the application.
- [ ] Document local setup and environment variables.
- [ ] Add real application screenshots with private details removed.
- [ ] Prepare a read-only demo with synthetic data.

### Post-MVP Enhancements

- [ ] CSV import for historical applications.
- [ ] Kanban-style application view.
- [ ] Advanced cohort comparisons and rules-based insights.
- [ ] Job-description skills comparison.

## Development Workflow

CareerOps will use an issue-driven GitHub workflow:

```text
GitHub Issue -> Feature Branch -> Code + Tests -> Pull Request
             -> Review / Checks -> Merge to main -> Deploy
```

Each substantial issue should document its purpose, acceptance criteria, and verification steps. The `main` branch is intended to remain the stable integration baseline.

## Getting Started

**The application scaffold has not been committed yet.** Local installation and startup commands will be added as part of Milestone 2. Until then, there is no runnable application to install.

Once implemented, this section will cover:

1. Prerequisites and supported Node.js version.
2. Cloning the repository and installing dependencies.
3. Configuring a local `.env` file from an example template.
4. Applying database migrations.
5. Running the development server and tests.

## Documentation

Detailed artefacts will live in the `docs/` directory as they are completed, including:

- Requirements specification
- Architecture and data-flow diagrams
- Database entity-relationship diagram
- Architecture decision records
- Test strategy and test results
- Deployment guide

## Portfolio Value

The project is intended to demonstrate end-to-end software engineering: requirements analysis, frontend development, database design, authentication and authorisation, data analytics, automated testing, CI/CD, and technical documentation.

## Maintainer

Maintained by [ntabozuko-dev](https://github.com/ntabozuko-dev).

---

**CareerOps — From tracking applications to understanding recruitment outcomes.**

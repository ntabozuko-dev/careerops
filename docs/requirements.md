# CareerOps — MVP Requirements Specification

**Version:** 0.1 (requirements baseline in review)  
**Source:** GitHub Issue [#1](https://github.com/ntabozuko-dev/careerops/issues/1)  
**Project:** [CareerOps Development Board](https://github.com/users/ntabozuko-dev/projects/1)  
**Status:** FR-02 and FR-03 approved through guided requirements review; remainder of MVP specification pending.

## 1. Purpose and boundary

CareerOps is a privacy-first web application for tracking job applications and analysing recruitment outcomes. This version captures approved, testable contracts for **recruitment status management** (FR-02) and **recruitment analytics** (FR-03). This is **not** a completed Software Requirements Specification (SRS): FR-01, additional functional requirements, non-functional requirements, and full traceability still require independent review under Issue #1.

The requirements are technology-neutral. Database entities and implementation design are specified separately in architecture and data-model work.

## 2. Terms and business definitions

| Term | Operational definition |
| --- | --- |
| Saved application | Vacancy recorded without a confirmed submission; excluded from submitted-application metric denominators. |
| Submitted application | An application with a recorded submission date and stage of Applied or later, including later closed outcomes. |
| Employer response | A substantive communication about the candidacy, including a screening invitation, assessment/interview invitation, actual hiring decision, or rejection notice. Mere receipt/delivery confirmations and generic acknowledgements do not count. A decision counts even if it was sent automatically. |
| Screening | A recorded, explicit progression to an initial candidate-assessment/screening step, not merely a generic acknowledgement or an assumption of employer interest. An interview is distinct from screening. |
| Current status | The latest user-recorded recruitment stage or outcome. |
| Status history | Timestamped transitions reflecting recorded stages and outcomes; previous transitions remain available after subsequent changes. |
| Employer response deadline | An explicit deadline communicated by an employer for hearing back about an application. It is not the vacancy's application-closing date. |
| Presumed unsuccessful | A **derived informational indicator**, not a recorded rejection, when an employer response deadline has been reached and no substantive response has been recorded. |
| Closed application | An application explicitly marked closed by the user. A closure is distinct from a confirmed employer rejection. |

**Recruitment stages/outcomes (initial vocabulary):** Saved, Applied, Screening, Assessment, Interview, Offer, Rejected, Withdrawn, and user-closed. Exact UI labels and transition constraints will be validated when the complete MVP specification is consolidated.

## 3. FR-02 — Recruitment status management

**Priority:** Must Have  
**User story:** As a job seeker, I want to update an application's recruitment status, retain its progression history, and identify employer response deadlines that have expired, so that I can track the actual outcome without mistaking silence for confirmed rejection.

### Acceptance criteria

- **FR-02-AC01 — Retrieve and update:** Given an authenticated owner with a saved or submitted application, when they select and update its status using an allowed stage/outcome, then the application displays the newly recorded status after saving and reloading. Unauthorised users must not be able to read or modify it.
- **FR-02-AC02 — Status visibility:** Each displayed application shows a human-readable current-status label with a consistent visual indicator. Colour must not be the sole means of distinguishing statuses.
- **FR-02-AC03 — Historical integrity:** Every genuine status transition records the previous and new status and the transition timestamp. Changing the current status must not erase earlier screening, assessment, or interview progression.
- **FR-02-AC04 — Deadline capture:** When filing or editing an application, the user can record an employer-specified **response** deadline as an exact date or a duration in calendar days from the recorded submission date. An advertisement-closing date is **not** treated as a response deadline.
- **FR-02-AC05 — Deadline indicator:** Given a **submitted, open** application with a recorded employer response deadline, when the current local date **reaches or exceeds** that deadline and no substantive employer response has been recorded, then the application displays a `Presumed Unsuccessful` indicator **without altering its recorded status**. This indicator may be calculated when the application is read; a background database mutation is not required for the MVP.
- **FR-02-AC06 — Indicator clearing:** The indicator must no longer display once the user records a substantive employer response or explicitly closes the application. An unrelated edit (e.g. a note or job title correction) **must not** clear it.
- **FR-02-AC07 — Missing deadline:** When an employer response deadline is not supplied, CareerOps must not flag presumed failure based solely on elapsed time.

### Verification scenarios

| Scenario | Expected result |
| --- | --- |
| Employer response deadline is tomorrow | No presumed-unsuccessful indicator. |
| Current local date equals deadline; no substantive response recorded | Show indicator; preserve current status. |
| Deadline passed and an employer later invites screening | Clear indicator; record the employer response and screening progression. |
| Deadline passed and user edits unrelated notes | Indicator remains. |
| Deadline passed and user explicitly closes application | Clear indicator; retain status history. |
| Job advertisement closes but no response deadline exists | Do not infer a presumed unsuccessful outcome. |
| User changes status after screening to rejected | Current status is Rejected; earlier screening event remains in history. |

**Date interpretation:** MVP deadline comparisons use calendar dates in the user's configured timezone, with the flag active on the deadline date as specified above. This convention can be re-evaluated during UX testing.

## 4. FR-03 — Recruitment analytics

**Priority:** Must Have  
**User story:** As a job seeker, I want to review recruitment responses and progression, both by current application status and by historical stages reached, so that I can identify which application strategies produce screening and interview opportunities.

### Acceptance criteria

- **FR-03-AC01 — Dashboard access:** Given an authenticated user with application records, when they open the analytics dashboard, then CareerOps displays readable numerical summaries and graphical views based **only on the user's own records**.
- **FR-03-AC02A — Employer response rate:** Display the percentage of **distinct submitted applications** with at least one recorded substantive employer response, divided by the number of submitted applications in the selected cohort, multiplied by 100. Exclude receipt/delivery acknowledgements and saved-but-not-submitted applications from the numerator/denominator respectively. A substantive hiring decision counts even if delivered by automated email.
- **FR-03-AC02B — Screening conversion rate:** Display the percentage of **distinct submitted applications** with a recorded Screening event, divided by the number of submitted applications in the selected cohort, multiplied by 100. A screening is not automatically inferred from an interview event unless the screening event was recorded.
- **FR-03-AC03 — Filtering:** Users can filter dashboard results by submitted-application cohort/date range, job title, industry, and job category. Combined filters apply consistently to both numerators and denominators. Missing metadata can be represented as Unknown/Uncategorised rather than silently excluded.
- **FR-03-AC04A — Current status distribution:** Show the number of applications whose **current recorded status** is each supported stage or outcome.
- **FR-03-AC04B — Historical conversion funnel:** Separately show counts of **distinct submitted applications ever recorded as having reached** Applied, Screening, Interview, and Offer. Later progression, rejection, or closure must not remove an application's earlier stage attainment. Each application is counted at most once per stage.
- **FR-03-AC05 — Zero-data behaviour:** When a selected cohort contains zero submitted applications, percentages display `N/A` (or an equivalent no-data state) instead of dividing by zero or presenting a misleading percentage.
- **FR-03-AC06 — Analytics semantics:** A computed `Presumed Unsuccessful` indicator is not counted as a confirmed rejection or as an employer response. Metric explanations and chart labels must make their respective counting rules understandable.

### Equations

```text
Employer response rate (%) =
    100 × distinct submitted applications with substantive response
          / distinct submitted applications

Screening conversion rate (%) =
    100 × distinct submitted applications with recorded screening event
          / distinct submitted applications
```

**Illustrative example:** Of 20 submitted applications, 8 receive substantive employer responses and 3 reach screening: response rate = 40%; screening conversion = 15%. These numbers are examples, not real CareerOps data.

### Verification scenarios

| Scenario | Expected result |
| --- | --- |
| 20 submitted, 8 substantive responses, 3 screening events | Response rate 40%; screening conversion 15%. |
| An automated receipt acknowledgement is recorded | Does not increase employer response rate. |
| An automatically sent rejection decision is recorded | Increases substantive response count; does not imply screening. |
| Same application receives multiple substantive messages | Count once in employer-response numerator. |
| Same application has repeated screening events | Count once in screening numerator and funnel. |
| Application reaches Screening → Interview → Rejected | Current-status chart shows Rejected; historical funnel still counts Screening and Interview. |
| One application skips directly from Applied to Interview | Count recorded stages; do not fabricate a Screening event. |
| No submitted applications match selected filters | Show clear empty state and N/A for rates. |

## 5. Requirement dependencies and traceability

| Requirement | Intended persisted evidence | Primary validation |
| --- | --- | --- |
| FR-02-AC01–AC03 | Application current status and timestamped status-transition history | Integration / permission tests |
| FR-02-AC04–AC07 | Employer deadline, submission date, substantive response events, explicit user closure | Unit tests for date rules; integration tests for persistence |
| FR-03-AC02A | Submitted-application set and qualifying employer-response events | Unit tests of numerator / denominator; integration tests for query |
| FR-03-AC02B, AC04B | Historical recorded stage transitions | Unit tests for distinct counting; integration tests for stage history |
| FR-03-AC03–AC06 | Filtering dimensions and application / response / status events | Unit, integration, and browser tests |

## 6. Remaining work under Issue #1

- [ ] Formalise FR-01 for application entry, editing, data validation and retrieval.
- [ ] Independently author the remaining MVP user stories (e.g. follow-ups, data portability, authentication/privacy) and acceptance criteria.
- [ ] Define non-functional requirements (security, accessibility, responsiveness, reliability, no-cost infrastructure constraints) with verifiable thresholds where appropriate.
- [ ] Agree on mandatory input fields, error behaviour and required validation.
- [ ] Resolve whether Stage `Assessment` includes screening tests or technical tests and how the dashboard groups stages.
- [ ] Consolidate requirements into a single traceability and approval register.
- [ ] Add tests and implementation references as development progresses.

### Out of scope for MVP

Automated job scraping, email inbox ingestion, browser extension capture, generative AI/LLM recommendations, and predictive hiring claims.

---

**Review note:** FR-02 and FR-03 capture the user's accepted intent after three graduated reviews. This document is submitted for review via a **draft pull request**; Issue #1 should stay open until the complete MVP specification is approved.

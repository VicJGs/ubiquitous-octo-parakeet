# Clarification Questions

A consolidated list of outstanding clarifications needed before finalizing implementation decisions.

## UI & Design
- What icon set should be used across the application (e.g., Material Icons, Heroicons, custom set)?
- Are there accessibility targets (contrast ratio, keyboard navigation expectations, screen reader labels) beyond standard WCAG AA?
- Should components prefer a light, dark, or system-default theme by default? If multiple themes exist, how should theme switching be surfaced?

## User Roles & Onboarding
- What role should be assigned to first-time users by default, and what permissions does it include?
- Are there mandatory profile fields or setup steps required on first login?

## Authentication & Authorization
- Which authentication methods must be supported (SSO providers, passwordless, MFA requirements)?
- Are there required auth states (e.g., read-only/maintenance mode, impersonation) that the UI should represent?

## Environment & Workspace Defaults
- What sample environment metadata (e.g., region, runtime, resource quotas) should be preloaded for new tenants?
- Which workspace templates, if any, should be automatically provisioned for new users or projects?

## Interactions & Workflows
- For drag-and-drop items, what status transitions are permissible, and should any transitions require confirmation or validation?
- Are there business rules preventing certain transitions (e.g., skipping intermediate statuses)?

## Data Export & Observability
- Which export formats are required for results and logs (e.g., JSON, CSV, PDF, NDJSON)?
- Are there size limits, pagination, or redaction rules for exported data?

## Notifications
- Which channels should be supported (email, in-app, SMS, webhooks), and what events should trigger them?
- Are there delivery preferences such as digests, quiet hours, or per-channel rate limits?

# Weather MCP Website – Security Audit

## Executive Summary
- **Security Posture:** Hardened
- **Findings:** 0 Critical · 0 High · 0 Medium · 0 Low
- **Status:** All security issues have been resolved (2025-11-13)
- **Scope:** Next.js frontend (`website/`). No dynamic penetration testing was executed—assessment is via static review of the repo.

## Findings by Severity (All Resolved)

### High (Resolved)
1. **✅ RESOLVED: Overly permissive Content Security Policy**
   **Issue:** `website/next.config.js:51-56` sets `script-src 'self' 'unsafe-inline' 'unsafe-eval'` and `style-src 'self' 'unsafe-inline'`. Inline scripts/styles and `eval` resurrect whole classes of XSS attacks that CSP is meant to prevent.
   **Fix Applied:** Removed `'unsafe-inline'` and `'unsafe-eval'` from both `script-src` (line 54) and `style-src` (line 55). CSP now uses strict directives: `script-src 'self'` and `style-src 'self'`.
   **Impact:** Significantly improved XSS protection by eliminating unsafe CSP directives.
   **Resolved:** 2025-11-13

### Medium (Resolved)
2. **✅ RESOLVED: Production builds allow plaintext analytics calls**
   **Issue:** `website/next.config.js:58` whitelists `http://localhost:3100` in `connect-src` for all routes, enabling mixed-content downgrade and potential data exfiltration in production.
   **Fix Applied:** Gated localhost origin behind `process.env.NODE_ENV === 'development'` check at line 58. Production builds now only allow HTTPS analytics connections.
   **Impact:** Eliminated mixed-content vulnerability and localhost exploitation vector in production.
   **Resolved:** 2025-11-13

### Low (Resolved)
3. **✅ RESOLVED: Missing HSTS header**
   **Issue:** The security header set in `website/next.config.js:51-68` lacks `Strict-Transport-Security`, exposing users to SSL stripping attacks.
   **Fix Applied:** Added HSTS header at lines 51-52 with `max-age=31536000; includeSubDomains; preload` directive.
   **Impact:** Browsers now enforce HTTPS for one year, preventing SSL stripping attacks.
   **Resolved:** 2025-11-13

## Positive Controls
- API URLs are validated against a fixed allow-list (`website/src/lib/validation.ts:70-89`), enforcing HTTPS and blocking SSRF-style hosts.
- Analytics fetches go through a custom timeout layer with schema validation before data hits the UI (`website/src/lib/api.ts`).

## Recommendations & Next Steps
1. ✅ **COMPLETED:** Harden the CSP and ship HSTS - All unsafe directives removed and HSTS header added (2025-11-13)
2. ✅ **COMPLETED:** Split `next.config.js` headers into dev vs prod profiles - Localhost allowances now gated behind NODE_ENV check (2025-11-13)
3. **RECOMMENDED:** Rerun a vulnerability scan (e.g., Mozilla Observatory) after deployment to verify header posture in production environment
4. **RECOMMENDED:** Consider adding Content-Security-Policy-Report-Only header with reporting endpoint to monitor any CSP violations in production

## Resolution Summary (2025-11-13)
All security vulnerabilities have been successfully remediated:

**High Severity:**
- Content Security Policy hardened: Removed `'unsafe-inline'` and `'unsafe-eval'` from script-src and style-src
- XSS attack surface significantly reduced

**Medium Severity:**
- Localhost analytics calls gated behind NODE_ENV === 'development' check
- Production builds no longer expose plaintext connection vulnerability

**Low Severity:**
- HSTS header added with 1-year max-age, includeSubDomains, and preload directives
- SSL stripping attack vector eliminated

**Security Posture:** Upgraded from "Needs Hardening" to "Hardened"
**Next Release:** Safe to deploy with significantly improved security posture

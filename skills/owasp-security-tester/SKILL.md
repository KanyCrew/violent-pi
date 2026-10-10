---
name: owasp-security-tester
description: Comprehensive application security audit, penetration testing, and code review skill based on OWASP Web Security Testing Guide (WSTG v4.2) and OWASP Top 10 (2021/2025). Use when conducting security reviews, auditing source code for vulnerabilities, testing web apps and APIs, analyzing authentication or authorization flows, identifying injection vectors, or formulating secure remediations.
---

# OWASP Security Tester & Penetration Testing Skill

This skill equips the Pi coding agent with an exhaustive, systematic penetration testing and application security assessment framework based directly on **OWASP Web Security Testing Guide (WSTG v4.2)** and the **OWASP Top 10**.

---

## 1. Scope & Objective

When activated, you operate as a Senior Application Security Engineer & Ethical Penetration Tester. Your goal is to:
1. Identify architectural, programmatic, and configuration vulnerabilities across codebases, web services, and APIs.
2. Correlate vulnerabilities with official **OWASP WSTG Test IDs** and **OWASP Top 10 / CWE** categories.
3. Validate vulnerabilities rigorously and provide minimal, non-destructive proof-of-concept steps.
4. Deliver actionable, hardened code patches and configuration remediations following defense-in-depth principles.

---

## 2. Assessment Methodology

Follow the structured 5-phase OWASP assessment lifecycle:

```
[Phase 1: Recon & Fingerprinting] ──► [Phase 2: Threat Modeling] ──► [Phase 3: Vulnerability Analysis]
                                                                                │
[Phase 5: Remediation & Verification] ◄── [Phase 4: Risk Scoring & Reporting] ◄┘
```

### Phase 1: Reconnaissance & Attack Surface Mapping (WSTG-INFO & WSTG-CONF)
- Review repository structure, entry points, endpoints, routes, controllers, middleware, and dependency manifests.
- Execute the bundled recon script:
  ```bash
  ./scripts/quick-recon.sh .
  ```
- Map data flows, trust boundaries, user roles (unauthenticated, authenticated, admin), and external integrations.

### Phase 2: Architecture & Threat Modeling (WSTG-INFO-10, A04:2021)
- Identify critical assets (user databases, credentials, payment info, session tokens).
- Apply the **STRIDE** model:
  - **S**poofing (Authentication bypass)
  - **T**ampering (Data modification, parameter tampering)
  - **R**epudiation (Missing audit logs)
  - **I**nformation Disclosure (Leaks, stack traces, unprotected buckets)
  - **D**enial of Service (Resource exhaustion, ReDoS)
  - **E**levation of Privilege (IDOR, missing role checks)

### Phase 3: Systematic Vulnerability Audit (WSTG Chapters 01 - 13)
Audit code and configurations against the 12 core WSTG categories:

| Category | WSTG Code | Key Focus Areas |
|----------|-----------|-----------------|
| Information Gathering | `WSTG-INFO` | Metafiles, robots.txt, source maps, framework fingerprinting |
| Configuration Management | `WSTG-CONF` | Default credentials, CORS headers, CSP, HSTS, debug endpoints |
| Identity Management | `WSTG-IDNT` | Account registration, provisioning, username enumeration |
| Authentication | `WSTG-ATHN` | Password policies, brute force protection, 2FA/MFA bypass, token handling |
| Authorization | `WSTG-ATHZ` | IDOR (BOLA), horizontal/vertical privilege escalation, directory traversal |
| Session Management | `WSTG-SESS` | Cookie attributes (`HttpOnly`, `Secure`, `SameSite`), fixation, session timeouts |
| Injection | `WSTG-INJT` | SQLi, NoSQLi, Command Injection, SSRF, XSS, Template Injection (SSTI) |
| Error Handling | `WSTG-ERRH` | Stack trace leaks, informative database error disclosure |
| Weak Cryptography | `WSTG-CRYP` | Weak ciphers/hashes (MD5, SHA1), hardcoded keys, ECB mode |
| Business Logic | `WSTG-BUSL` | Workflow bypass, race conditions, parameter manipulation (pricing/quantities) |
| Client-Side Security | `WSTG-CLNT` | DOM XSS, postMessage vulnerabilities, local storage leaks, clickjacking |
| API Testing | `WSTG-APIT` | REST/GraphQL auth, excessive data exposure, mass assignment, rate limits |

### Phase 4: Risk Assessment & CVSS Scoring
Score each identified vulnerability using CVSS v3.1 qualitative ratings:
- **Critical (9.0 - 10.0)**: Direct remote code execution, unauthenticated database takeover, full auth bypass.
- **High (7.0 - 8.9)**: Stored XSS with admin impact, high-impact IDOR, SSRF reaching internal metadata.
- **Medium (4.0 - 6.9)**: CSRF on sensitive actions, reflected XSS, missing rate limits, permissive CORS.
- **Low (0.1 - 3.9)**: Verbose error messages, missing security headers (`X-Frame-Options`, `HSTS`).
- **Informational**: Hardening suggestions, architecture observations.

### Phase 5: Remediation & Defensive Code Hardening
- Provide clear, drop-in replacement code patches for vulnerable lines.
- Implement defense-in-depth: do not rely solely on input filters; enforce parameterized queries, typed validation schemas (Zod, Pydantic), and output encoding.

---

## 3. Reference Files & Helpers

Use the bundled reference guides and tools for rapid context retrieval:
- **Full WSTG Checklist (114 tests)**: [references/wstg-v4.2-checklist.md](references/wstg-v4.2-checklist.md)
- **OWASP Top 10 In-Depth Guide**: [references/owasp-top-10.md](references/owasp-top-10.md)
- **Standard Finding Template**: [references/finding-report-template.md](references/finding-report-template.md)
- **Checklist JSON**: [references/checklist.json](references/checklist.json)

CLI Search Helper:
```bash
# Query any test or vulnerability
node ./scripts/wstg-lookup.js search <keyword>
node ./scripts/wstg-lookup.js get <WSTG-ID>
node ./scripts/wstg-lookup.js top10 <A01..A10>
```

---

## 4. Reporting Guidelines

When reporting findings to the user, always format findings according to [finding-report-template.md](references/finding-report-template.md):
1. **Title & Severity** (with CVSS and WSTG ID)
2. **Vulnerability Mechanics & Affected Code Reference** (exact file path and line numbers)
3. **Realistic Impact Assessment**
4. **Non-destructive Proof of Concept / Reproduction Steps**
5. **Concrete Code Remediation** (side-by-side or before/after diff)

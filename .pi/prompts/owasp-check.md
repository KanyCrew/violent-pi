---
description: Evaluate codebase against specific OWASP WSTG Test ID or Top 10 category
argument-hint: "<WSTG-ID-or-Top10-Category>"
---
Execute an in-depth security verification focused specifically on OWASP requirement: $1

Instructions:
1. Consult the reference documentation for $1 in `.pi/skills/owasp-security-tester/references/`.
2. Inspect the codebase for compliance and potential weaknesses related to $1.
3. If vulnerabilities or non-compliant patterns exist:
   - Detail the flaw and exact lines of code.
   - Assign CVSS v3.1 rating.
   - Provide safe verification steps.
   - Supply the corrected, hardened implementation.
4. If the code is properly secured against $1, explain the existing defenses and verify their robustness.

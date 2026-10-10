---
description: Perform comprehensive OWASP WSTG and Top 10 security audit
argument-hint: "[target-path-or-scope]"
---
Perform a thorough Application Security and Code Audit on: ${1:-the current repository}

Methodology:
1. Identify all attack surfaces, entry points, public endpoints, and untrusted inputs.
2. Trace data flows from inputs to critical execution sinks (database queries, system commands, file operations, templating, reflection, deserialization).
3. Check against the OWASP Top 10 (A01-A10) and OWASP WSTG v4.2 categories.
4. Format each identified vulnerability using the standard template:
   - Severity & CVSS v3.1 score
   - OWASP Category & WSTG Test ID
   - CWE ID
   - Location (file and line numbers)
   - Detailed Description & Impact
   - Non-destructive Proof of Concept / Reproduction Steps
   - Production-ready Remediation Code Diff

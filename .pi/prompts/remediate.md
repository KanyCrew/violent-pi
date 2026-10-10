---
description: Generate hardened remediation code patches for discovered vulnerabilities
argument-hint: "<finding-or-vulnerability>"
---
Provide production-ready, secure remediation patches for: $1

Requirements:
1. Identify the root cause mechanism of the vulnerability.
2. Provide a side-by-side or unified diff showing the vulnerable vs. patched code.
3. Ensure the fix follows defense-in-depth:
   - Strong typing and strict input schema validation (e.g. Zod, Pydantic)
   - Parameterized queries or prepared statements
   - Context-aware output encoding / escaping
   - Strict authorization checks verifying resource ownership
4. Explain how the fix resolves the vulnerability without breaking existing functionality.
5. Provide automated unit/regression test cases verifying the patch.

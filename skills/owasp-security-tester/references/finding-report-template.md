# Security Vulnerability Finding Report Template

Use this template to document vulnerabilities discovered during security audits, code reviews, and penetration tests.

---

## [FINDING-001]: [Concise Finding Title, e.g., Unauthenticated SQL Injection in Order Lookup]

### Metadata
- **Severity**: Critical | High | Medium | Low | Informational
- **CVSS v3.1 Score**: e.g., `8.6 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N)`
- **OWASP Category**: e.g., `A03:2021 - Injection`
- **WSTG Test ID**: e.g., `WSTG-INJT-05 (Testing for SQL Injection)`
- **CWE**: e.g., `CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')`
- **Affected Target / Component**: e.g., `src/controllers/orderController.ts:L45-L52` / `POST /api/v1/orders/track`

---

### Description
Provide a clear, detailed technical description of the vulnerability, explaining why it exists and what architectural or coding flaw allows it to occur.

*Example:*
The `trackOrder` handler in `src/controllers/orderController.ts` directly concatenates the user-supplied `orderId` parameter into a raw SQL query string without input validation or parameterized placeholders.

---

### Impact
Detail the practical security impact should an attacker exploit this vulnerability. Explain consequences to Confidentiality, Integrity, and Availability.

*Example:*
An unauthenticated external attacker can manipulate query syntax to extract arbitrary database records including customer credentials, personal data, and internal tokens, or bypass authentication logic.

---

### Proof of Concept / Reproduction Steps
Step-by-step instructions or minimal non-destructive reproduction payload demonstrating the flaw safely.

1. Issue a request with a benign probe or single quote:
   ```http
   POST /api/v1/orders/track HTTP/1.1
   Host: example.internal
   Content-Type: application/json

   { "orderId": "ORD-123' OR 1=1--" }
   ```
2. Observe database error syntax or boolean differential response proving dynamic query interpolation.

---

### Remediation & Fix

#### Recommended Strategy
Explain the correct architectural or programmatic remediation approach.

#### Code Remediation Example
**Vulnerable Code:**
```typescript
// Vulnerable
const result = await db.query(
  `SELECT * FROM orders WHERE id = '${req.body.orderId}'`
);
```

**Remediated Code:**
```typescript
// Secure: Using parameterized queries
const result = await db.query(
  `SELECT * FROM orders WHERE id = $1`,
  [req.body.orderId]
);
```

---

### Verification & Testing
How to verify that the fix is effective and has not introduced regressions:
- Run unit / integration test with test payload.
- Verify prepared statement execution via database audit logs.

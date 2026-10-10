# OWASP Top 10 Application Security Risks Reference

Comprehensive reference guide for the OWASP Top 10 web application security risks, detailing vulnerability mechanisms, attack vectors, audit checklists, and defensive remediations.

---

## A01:2021 – Broken Access Control

### Description
Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data, or performing a business function outside the user's limits.

### Common Weaknesses & CWEs
- **CWE-200**: Exposure of Sensitive Information to an Unauthorized Actor
- **CWE-201**: Insertion of Sensitive Information into Sent Data
- **CWE-352**: Cross-Site Request Forgery (CSRF)
- **CWE-566**: Authorization Bypass Through User-Controlled SQL Primary Key (IDOR)
- **CWE-639**: Authorization Bypass Through User-Controlled Key

### Key Attack Vectors & Audit Points
- **IDOR (Insecure Direct Object References)**: Modifying parameter IDs (e.g., `GET /api/user?id=105` to `106`) to access unauthorized records.
- **Path Traversal / LFI**: Supplying `../` or encoded equivalents in file requests to read sensitive filesystem assets.
- **Missing Function Level Access Control**: Accessing privileged administrative endpoints directly without role checks (e.g., `/admin/deleteUser`).
- **CORS Misconfiguration**: Overly permissive `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true`.
- **JWT / Token Parameter Tampering**: Tampering with claims, replaying tokens, or lack of signature validation.

### Remediation & Defense
- Adopt **Deny by Default** access control models.
- Enforce record ownership and authorization checks in server-side controllers or middleware on every single request.
- Disable web server directory listing.
- Log access control failures and alert administrators on repeated failures.
- Implement rate limiting on API endpoints to mitigate automated brute-force attacks.

---

## A02:2021 – Cryptographic Failures

### Description
Previously known as "Sensitive Data Exposure". Focuses on failures related to cryptography (or lack thereof), which frequently leads to sensitive data exposure or system compromise.

### Common Weaknesses & CWEs
- **CWE-259**: Use of Hard-coded Password
- **CWE-327**: Use of a Broken or Risky Cryptographic Algorithm (e.g., MD5, SHA1, DES, RC4)
- **CWE-331**: Insufficient Entropy
- **CWE-312**: Cleartext Storage of Sensitive Information
- **CWE-319**: Cleartext Transmission of Sensitive Information

### Key Attack Vectors & Audit Points
- Transmitting sensitive data (passwords, tokens, PII) over unencrypted channels (HTTP, plain FTP/SMTP).
- Using legacy cryptographic primitives (e.g., MD5/SHA1 for signatures/passwords; ECB mode for AES).
- Insecure password storage (storing plaintext passwords or unsalted fast hashes instead of bcrypt, argon2id, or scrypt).
- Hard-coded private keys, certificates, or API secrets inside source code repositories or client-side assets.
- Missing HSTS (`Strict-Transport-Security`) headers allowing SSL stripping.

### Remediation & Defense
- Classify data processed, stored, or transmitted; identify privacy/compliance requirements (GDPR, PCI-DSS, HIPAA).
- Apply strong encryption in transit: TLS 1.3 (or modern TLS 1.2) with forward secrecy ciphers, and enforce HSTS.
- Store passwords using modern, memory-hard adaptive hashing algorithms (`Argon2id`, `scrypt`, or `bcrypt`) with unique per-user salts.
- Use authenticated encryption modes such as `AES-256-GCM` or `ChaCha20-Poly1305`.
- Never hardcode credentials; load secrets securely via environment variables or secret vaults.

---

## A03:2021 – Injection

### Description
Injection occurs when untrusted user input is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

### Common Weaknesses & CWEs
- **CWE-79**: Cross-site Scripting (XSS)
- **CWE-89**: SQL Injection (SQLi)
- **CWE-78**: OS Command Injection
- **CWE-94**: Improper Control of Generation of Code (Code Injection)
- **CWE-917**: Expression Language Injection (SSTI / EL Injection)

### Key Attack Vectors & Audit Points
- **SQLi**: Concatenating dynamic query strings instead of parameterized queries / prepared statements (e.g. `SELECT * FROM users WHERE name = '` + input + `'`).
- **Command Injection**: Passing user input directly into system execution functions (`exec()`, `system()`, `popen()`, `child_process.exec()`).
- **Cross-Site Scripting (XSS)**: Reflected, Stored, or DOM-based XSS where unescaped input is rendered in web contexts.
- **SSTI / Template Injection**: User-controlled template strings in Jinja2, Twig, Freemarker, Thymeleaf leading to remote execution.
- **NoSQL / LDAP / XPath Injection**: Unsanitized parameters passed to MongoDB/LDAP query objects.

### Remediation & Defense
- **Parameterized queries**: Always use parameterized statements, prepared statements, or secure ORMs.
- **Context-aware output encoding**: Encode untrusted data before rendering in HTML, JS, CSS, or URL contexts (e.g., DOMPurify, standard templating engines with auto-escape).
- **Avoid OS execution wrappers**: If system execution cannot be avoided, use parameterized APIs with strict argument separation (e.g. `child_process.execFile` with an argument array).
- Implement positive ("allowlist") server-side input validation.

---

## A04:2021 – Insecure Design

### Description
Insecure design focuses on risks related to design and architectural flaws. A secure implementation cannot fix an inherently insecure design. Threat modeling, secure design patterns, and reference architectures are essential.

### Common Weaknesses & CWEs
- **CWE-209**: Generation of Error Message Containing Sensitive Information
- **CWE-256**: Unprotected Storage of Credentials
- **CWE-501**: Trust Boundary Violation
- **CWE-657**: Violation of Secure Design Principles

### Key Attack Vectors & Audit Points
- Lack of rate limiting on password reset, OTP validation, or sensitive transactions, permitting automated abuse.
- Business logic flows that assume client-side enforcement (e.g., price or coupon parameters sent and accepted from client).
- Unlimited resource consumption: unconstrained file upload sizes, missing pagination limits, uncontrolled regex parsing (ReDoS).
- Flawed credential recovery questions or predictable password reset tokens.

### Remediation & Defense
- Integrate **Threat Modeling** (STRIDE, PASTA) early in design phases.
- Establish secure development lifecycle (SDLC) standards with design pattern libraries.
- Limit resource consumption per tenant/user (rate limiting, payload limits, pagination constraints).
- Isolate system tiers and enforce trust boundaries.

---

## A05:2021 – Security Misconfiguration

### Description
Security misconfiguration is the most common vulnerability across web applications, often resulting from default configurations, ad-hoc setups, verbose error messages, or unhardened cloud settings.

### Common Weaknesses & CWEs
- **CWE-16**: Configuration
- **CWE-611**: XML External Entity (XXE) Processing
- **CWE-1004**: Sensitive Cookie Without 'HttpOnly' Flag
- **CWE-942**: Permissive Cross-Domain Policy with Untrusted Domains

### Key Attack Vectors & Audit Points
- Default credentials on databases, admin interfaces, cloud consoles, or framework test accounts.
- Unnecessary features, endpoints, sample files, or documentation left enabled in production (e.g., `/debug`, Swagger UI without auth).
- Missing or misconfigured security headers: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`.
- Verbose stack traces displayed to end users disclosing underlying paths, database schemas, and package versions.
- Cloud storage buckets (S3, GCS) configured with public read/write permissions.

### Remediation & Defense
- Implement repeatable hardening procedures and automated Infrastructure as Code (IaC) verification.
- Remove or disable unused components, sample files, and documentation.
- Implement comprehensive security response headers (`CSP`, `HSTS`, `X-Content-Type-Options`, `Referrer-Policy`).
- Disable detailed error stack traces in production environments.

---

## A06:2021 – Vulnerable and Outdated Components

### Description
Applications often include libraries, frameworks, and modules that contain known vulnerabilities (CVEs). Attackers monitor public disclosure sources to exploit outdated components.

### Common Weaknesses & CWEs
- **CWE-1104**: Use of Unmaintained Third-Party Components
- **CWE-937**: Using Components with Known Vulnerabilities

### Key Attack Vectors & Audit Points
- Using dependencies with published CVSS 7+ CVEs.
- Not auditing direct and transitive dependencies (`npm audit`, `pip audit`, `cargo audit`, Snyk, Dependabot).
- Unmaintained dependencies with no security patches for multiple years.
- Framework versions past End-Of-Life (EOL).

### Remediation & Defense
- Maintain an accurate Software Bill of Materials (SBOM).
- Monitor vulnerabilities via automated tools in CI/CD pipelines (`npm audit`, `trivy`, `dependabot`).
- Only obtain components from official, signed repositories.
- Keep dependencies updated regularly; retire dependencies that are no longer maintained.

---

## A07:2021 – Identification and Authentication Failures

### Description
Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks such as credential stuffing, brute force, and session hijacking.

### Common Weaknesses & CWEs
- **CWE-287**: Improper Authentication
- **CWE-384**: Session Fixation
- **CWE-798**: Use of Hard-coded Credentials
- **CWE-307**: Improper Restriction of Excessive Authentication Attempts

### Key Attack Vectors & Audit Points
- Permitting automated attacks such as credential stuffing or brute force due to missing rate limiting or CAPTCHA.
- Permitting weak or common passwords (e.g., failing to check against HaveIBeenPwned or top password lists).
- Insecure password recovery or credential reset flows (predictable tokens, leaky verification hints).
- Ineffective session invalidation: session tokens remain valid after logout or password change.
- Session fixation: failing to issue a new session token upon successful login.

### Remediation & Defense
- Implement multi-factor authentication (MFA/2FA) for sensitive applications.
- Enforce rate limiting and account lockout/delay policies against brute-force attacks.
- Enforce minimum password complexity and check against known breached password corpuses.
- Regenerate session IDs upon privilege transition or login.
- Invalidate sessions on logout and enforce idle/absolute session timeouts.

---

## A08:2021 – Software and Data Integrity Failures

### Description
Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. This includes untrusted CI/CD pipelines, unverified auto-updates, and insecure deserialization.

### Common Weaknesses & CWEs
- **CWE-494**: Download of Code Without Integrity Check
- **CWE-502**: Deserialization of Untrusted Data
- **CWE-829**: Inclusion of Functionality from Untrusted Control Sphere

### Key Attack Vectors & Audit Points
- Insecure deserialization: deserializing untrusted binary/object formats (Java `ObjectInputStream`, Python `pickle`, PHP `unserialize()`, YAML unsafe loaders) resulting in RCE.
- Supply chain poisoning: fetching dependencies from untrusted sources or without integrity hashes (`Subresource Integrity` (SRI) on frontend scripts).
- Insecure CI/CD pipelines where unvetted commits or pull requests trigger privileged deployment workflows.

### Remediation & Defense
- Use digital signatures and hash checks (SRI) to verify data and software integrity.
- Avoid passing untrusted inputs into native deserialization routines. Prefer standard serialization formats (JSON, Protocol Buffers) with strict schema validation.
- Implement signing and review mechanisms for CI/CD deployment pipelines.

---

## A09:2021 – Security Logging and Monitoring Failures

### Description
Without logging and monitoring, security breaches cannot be detected, investigated, or contained. Sufficient logging, detection, monitoring, and active response are essential to stop ongoing intrusions.

### Common Weaknesses & CWEs
- **CWE-117**: Improper Output Neutralization for Logs (Log Injection / CRLF)
- **CWE-778**: Insufficient Logging
- **CWE-223**: Omission of Security-relevant Information

### Key Attack Vectors & Audit Points
- Failure to log auditable security events: logins, failed logins, access control failures, server-side input validation failures.
- Logs stored locally only, vulnerable to tampering by an attacker with host access.
- Logs containing sensitive data in plaintext (passwords, payment cards, session tokens).
- Log injection: attackers injecting CRLF sequences (`\r\n`) to forge log entries or poison log analytics.

### Remediation & Defense
- Log all login, access control, and server-side validation failures with sufficient user context.
- Ensure logs are formatted consistently (e.g. JSON) and sanitized against CRLF injection.
- Ship logs securely to a centralized, tamper-resistant SIEM / monitoring system.
- Establish real-time alerting for suspicious anomalies or repeated brute-force activities.

---

## A10:2021 – Server-Side Request Forgery (SSRF)

### Description
SSRF flaws occur whenever a web application fetches a remote resource without validating the user-supplied URL. Attackers can coerce the application into sending a crafted request to an unexpected destination, even when protected by a firewall or VPN.

### Common Weaknesses & CWEs
- **CWE-918**: Server-Side Request Forgery (SSRF)

### Key Attack Vectors & Audit Points
- Webhooks, file import utilities, URL preview generators, or PDF converters accepting arbitrary user-supplied URLs.
- Accessing internal cloud metadata endpoints: `http://169.254.169.254/latest/meta-data/` on AWS/GCP/Azure.
- Probing internal RFC 1918 private IP subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.1`).
- Bypassing naive blocklists via DNS rebinding, IPv6 representations (`[::1]`), decimal/hex IP formats (`2130706433`).

### Remediation & Defense
- Enforce strict allowlists of acceptable URL schemes (e.g., `https` only), ports, and domains.
- Resolve domain names to IP addresses prior to requesting and verify that the destination IP does not belong to private, loopback, or link-local ranges.
- Disable HTTP redirections on outbound client requests.
- Block access to cloud metadata services (e.g., enforce IMDSv2 with token hops = 1 on AWS).

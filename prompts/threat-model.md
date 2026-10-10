---
description: Perform STRIDE threat modeling on architecture and data flows
argument-hint: "[architecture-or-subsystem]"
---
Develop a comprehensive Threat Model for: ${1:-the system architecture}

Methodology:
1. **Architecture Decomposition**: Identify key components, processes, data stores, external entities, and trust boundaries.
2. **STRIDE Analysis Matrix**:
   - **Spoofing**: Can an attacker forge identities or tokens?
   - **Tampering**: Can in-transit or stored data be manipulated?
   - **Repudiation**: Are critical actions logged with non-repudiation?
   - **Information Disclosure**: Where can sensitive data leak?
   - **Denial of Service**: Can resources be exhausted?
   - **Elevation of Privilege**: Can an unprivileged user gain admin capabilities?
3. **Risk Scoring**: Evaluate threats using DREAD or CVSS criteria.
4. **Countermeasures**: Detail architectural and technical mitigations mapped to OWASP Proactive Controls.

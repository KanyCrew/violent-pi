# Changelog

All notable changes to the `violent-pi` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-10

### Added
- **Pi Skill**: `owasp-security-tester` compliant with the Agent Skills standard (`SKILL.md`).
- **OWASP WSTG v4.2 Integration**: Curated catalog of all 114 test IDs in `wstg-v4.2-checklist.md` and `checklist.json`.
- **OWASP Top 10 (2021/2025) Reference**: Complete guide covering A01-A10 with CWE mappings and remediations.
- **Pi TypeScript Extension**: `cybersec-mode.ts` supporting per-turn system prompt injection via `before_agent_start`.
- **Operating Profiles**: 4 selectable cybersecurity profiles (`pentest`, `audit`, `api`, `threat`).
- **Slash Commands**:
  - `/cybersec`: Mode toggle and profile switcher.
  - `/owasp`: Instant lookup for WSTG tests and Top 10 categories.
  - `/threatmodel`: Activates STRIDE threat modeling mode.
- **Prompt Templates**:
  - `/audit [target]`
  - `/owasp-check <ID>`
  - `/pentest [scenario]`
  - `/threat-model [architecture]`
  - `/remediate <vulnerability>`
- **Helper Scripts**:
  - `wstg-lookup.js`: Fast CLI lookup tool for WSTG tests.
  - `quick-recon.sh`: Non-destructive attack surface and code sink reconnaissance script.
- **Package Manifest**: Full Pi package format supporting npm distribution and Pi Marketplace auto-discovery via the `pi-package` keyword.

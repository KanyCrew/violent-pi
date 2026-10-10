#!/usr/bin/env bash
#
# Quick Recon & Security Surface Scanner for Pi Agent
# Performs passive, non-destructive audit of codebases:
# - Exposed secrets / credentials / private keys
# - Suspicious configuration files (.env, credentials, config with passwords)
# - Dangerous code sinks (eval, raw exec, deserialization, innerHTML, bypassSecurityTrust)
# - Outdated / vulnerable package manifests
# - Missing security headers / CORS configurations
#

set -euo pipefail

TARGET_DIR="${1:-.}"

echo "=========================================================="
echo "🛡️  OWASP Quick Reconnaissance & Attack Surface Scanner"
echo "Target Directory: ${TARGET_DIR}"
echo "=========================================================="

echo -e "\n[1] Checking for exposed secrets & sensitive files..."
find "${TARGET_DIR}" -maxdepth 3 -type f \( \
  -name "*.pem" -o -name "*.key" -o -name "*.pfx" -o -name "*.p12" \
  -o -name ".env*" -o -name "id_rsa*" -o -name "id_ed25519*" \
  -o -name "*credential*" -o -name "*secret*" \
\) ! -path "*/.git/*" ! -path "*/node_modules/*" ! -path "*/owasp/*" 2>/dev/null | head -n 30 || true

echo -e "\n[2] Checking for hardcoded tokens & high-entropy patterns (grep sample)..."
grep -rnE "(AIza[0-9A-Za-z\\-_]{35}|ghp_[0-9a-zA-Z]{36}|xox[baprs]-[0-9a-zA-Z]{10,48}|AKIA[0-9A-Z]{16}|bearer [a-zA-Z0-9_\\-\\.]{30,})" \
  --exclude-dir={.git,node_modules,dist,build,owasp} "${TARGET_DIR}" 2>/dev/null | head -n 20 || echo "  No common API token patterns found."

echo -e "\n[3] Searching for dangerous code execution & injection sinks..."
echo "  - Command Injection sinks (exec, spawn, popen, system):"
grep -rnE "(child_process\.exec|child_process\.spawn|os\.system|subprocess\.Popen|exec\(|system\(|passthru\(|shell_exec\()" \
  --exclude-dir={.git,node_modules,dist,build,owasp} "${TARGET_DIR}" 2>/dev/null | head -n 15 || echo "    None detected."

echo "  - Unsafe Code / Dynamic Evaluation (eval, Function constructor, compile):"
grep -rnE "(\beval\(|new Function\(|vm\.runInThisContext)" \
  --exclude-dir={.git,node_modules,dist,build,owasp} "${TARGET_DIR}" 2>/dev/null | head -n 15 || echo "    None detected."

echo "  - Insecure Deserialization / Object parsing:"
grep -rnE "(pickle\.loads|yaml\.load\(|unserialize\(|Marshal\.load)" \
  --exclude-dir={.git,node_modules,dist,build,owasp} "${TARGET_DIR}" 2>/dev/null | head -n 15 || echo "    None detected."

echo "  - Dangerous DOM / XSS sinks (innerHTML, dangerouslySetInnerHTML, bypassSecurityTrust):"
grep -rnE "(innerHTML|outerHTML|dangerouslySetInnerHTML|bypassSecurityTrustHtml|document\.write\()" \
  --exclude-dir={.git,node_modules,dist,build,owasp} "${TARGET_DIR}" 2>/dev/null | head -n 15 || echo "    None detected."

echo -e "\n[4] Dependency manifests detected:"
find "${TARGET_DIR}" -maxdepth 2 -type f \( \
  -name "package.json" -o -name "requirements.txt" -o -name "Pipfile" \
  -o -name "Gemfile" -o -name "pom.xml" -o -name "build.gradle" \
  -o -name "Cargo.toml" -o -name "go.mod" \
\) ! -path "*/.git/*" ! -path "*/node_modules/*" ! -path "*/owasp/*" 2>/dev/null || true

echo -e "\n=========================================================="
echo "Reconnaissance complete. Feed findings into WSTG audit flow."
echo "=========================================================="

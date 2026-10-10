#!/usr/bin/env bash
#
# Global Installer for Violent-Pi Cybersecurity Suite
# Installs skills, extensions, and prompts into ~/.pi/agent/
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
TARGET_PI_DIR="${HOME}/.pi/agent"

echo "=========================================================="
echo "🛡️  Violent-Pi Global Installer"
echo "Target directory: ${TARGET_PI_DIR}"
echo "=========================================================="

mkdir -p "${TARGET_PI_DIR}/skills"
mkdir -p "${TARGET_PI_DIR}/extensions"
mkdir -p "${TARGET_PI_DIR}/prompts"

# 1. Install Skill
echo "[+] Installing owasp-security-tester skill..."
cp -R "${REPO_DIR}/.pi/skills/owasp-security-tester" "${TARGET_PI_DIR}/skills/"

# 2. Install Extension
echo "[+] Installing cybersec-mode.ts extension..."
cp "${REPO_DIR}/.pi/extensions/cybersec-mode.ts" "${TARGET_PI_DIR}/extensions/"

# 3. Install Prompts
echo "[+] Installing prompt templates (/audit, /owasp-check, /pentest, /threat-model, /remediate)..."
cp "${REPO_DIR}/.pi/prompts/"*.md "${TARGET_PI_DIR}/prompts/"

# 4. Optional System Prompt replacement
echo ""
echo "Note regarding SYSTEM.md:"
echo "The extension 'cybersec-mode.ts' already dynamically overrides and injects the"
echo "Cybersecurity Penetration Tester system prompt whenever CyberSec mode is enabled."
echo "If you ALSO want to permanently replace ~/.pi/agent/SYSTEM.md globally:"
echo "  cp ${REPO_DIR}/.pi/SYSTEM.md ~/.pi/agent/SYSTEM.md"
echo ""

echo "=========================================================="
echo "✅ Violent-Pi suite installed successfully!"
echo "You can now run 'pi' in any directory and use:"
echo "  - /skill:owasp-security-tester"
echo "  - /cybersec [on|off|status|pentest|audit|api|threat]"
echo "  - /owasp <search-term-or-id>"
echo "  - /audit [path]"
echo "  - /threatmodel"
echo "  - /pentest, /threat-model, /owasp-check, /remediate"
echo "=========================================================="

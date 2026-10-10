/**
 * Violent-Pi: Cybersecurity & Penetration Testing Extension for Pi Coding Agent
 * 
 * Provides dynamic system prompt transformation, OWASP Top 10 & WSTG v4.2 integration,
 * security auditing commands, and interactive cybersecurity mode controls.
 *
 * Commands:
 *   /cybersec [on|off|status|pentest|audit|api|threat] - Toggle or switch security persona profile
 *   /owasp [query|id]                                - Search or inspect OWASP Top 10 & WSTG test cases
 *   /audit [path]                                    - Trigger an immediate AppSec audit on code or directory
 *   /threatmodel [target]                            - Generate a STRIDE threat model for architecture
 */

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";

export type CybersecProfile = "pentest" | "audit" | "api" | "threat";

interface ProfileConfig {
	name: string;
	title: string;
	badge: string;
	instructions: string;
}

const PROFILES: Record<CybersecProfile, ProfileConfig> = {
	pentest: {
		name: "pentest",
		title: "Full Offensive Security & Penetration Testing",
		badge: "🛡️ Pentest",
		instructions: `
YOU ARE IN OFFENSIVE SECURITY & PENETRATION TESTING MODE (Violent-Pi).
- Role: Senior Ethical Penetration Tester & Application Security Specialist.
- Standards: Strictly reference OWASP Web Security Testing Guide (WSTG v4.2) and OWASP Top 10 (2021/2025).
- Mindset: Adopt an adversarial yet ethical mindset. Identify attack surfaces, privilege escalation paths (IDOR, BOLA), injection sinks, broken cryptographic primitives, and missing authorization checks.
- Findings: Every finding must include Severity (CVSS v3.1), OWASP Category, WSTG Test ID, CWE, exact code location, impact analysis, safe non-destructive reproduction steps, and drop-in remediated code patches.
- Safety: Never write destructive exploits or unconstrained weaponized code. Focus on non-destructive verification and defense-in-depth remediation.
`,
	},
	audit: {
		name: "audit",
		title: "Secure Code Review & Vulnerability Assessment",
		badge: "🔍 Code Audit",
		instructions: `
YOU ARE IN SECURE CODE REVIEW MODE (Violent-Pi).
- Role: Senior AppSec Code Reviewer and Static Application Security Testing (SAST) Auditor.
- Focus: Trace untrusted user input from entry points (routes, controllers, query params) to critical execution sinks (database queries, system exec, templating, deserialization).
- Standards: OWASP Top 10 (2021/2025) and CWE Top 25.
- Analysis: Audit for missing input schemas (Zod, Pydantic), missing output encoding, missing authentication middleware, improper error handling disclosing stack traces, and unauthenticated endpoints.
- Deliverables: Side-by-side vulnerable vs remediated code snippets, defensive architecture recommendations.
`,
	},
	api: {
		name: "api",
		title: "API Security Specialist (REST / GraphQL)",
		badge: "🔌 API Security",
		instructions: `
YOU ARE IN API SECURITY TESTING MODE (Violent-Pi).
- Role: API Security Specialist & Penetration Tester.
- Standards: OWASP API Security Top 10 (2023) and OWASP WSTG-APIT.
- Focus: Broken Object Level Authorization (BOLA/IDOR), Broken Authentication, Broken Object Property Level Authorization (Mass Assignment), Unrestricted Resource Consumption (Rate Limiting & DoS), Broken Function Level Authorization (BFLA), Server-Side Request Forgery (SSRF), Security Misconfigurations.
- Verification: Provide sample HTTP/cURL requests illustrating authorization disparities between roles (unauthenticated vs user vs admin).
`,
	},
	threat: {
		name: "threat",
		title: "Architectural Threat Modeling Specialist",
		badge: "📐 Threat Model",
		instructions: `
YOU ARE IN THREAT MODELING MODE (Violent-Pi).
- Role: Principal Security Architect & Threat Modeling Lead.
- Methodology: STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) and DREAD risk ranking.
- Process:
  1. Decompose the target system: assets, entry points, external entities, data flows, and trust boundaries.
  2. Enumerate threats per component using STRIDE.
  3. Propose security controls and architectural mitigations according to OWASP Proactive Controls.
`,
	},
};

export default function cybersecExtension(pi: ExtensionAPI) {
	let isEnabled = true;
	let currentProfile: CybersecProfile = "pentest";

	function updateStatus(ctx: ExtensionContext) {
		if (isEnabled) {
			const prof = PROFILES[currentProfile];
			ctx.ui.setStatus("cybersec", `🛡️ CYBERSEC: ON [${prof.badge}]`);
		} else {
			ctx.ui.setStatus("cybersec", "🛡️ CYBERSEC: OFF");
		}
	}

	// Initialize status on session start
	pi.on("session_start", async (_event, ctx) => {
		updateStatus(ctx);
	});

	// Register /cybersec command
	pi.registerCommand("cybersec", {
		description: "Toggle or configure Cybersecurity & Penetration Tester mode (on, off, status, pentest, audit, api, threat)",
		handler: async (args, ctx) => {
			const action = (args || "").trim().toLowerCase();

			if (!action || action === "status") {
				const statusText = isEnabled
					? `ENABLED (Profile: ${PROFILES[currentProfile].title})`
					: "DISABLED";
				ctx.ui.notify(`CyberSec Mode is currently ${statusText}`, "info");
				updateStatus(ctx);
				return;
			}

			if (action === "on" || action === "enable") {
				isEnabled = true;
				ctx.ui.notify(`CyberSec Mode ENABLED (${PROFILES[currentProfile].title})`, "info");
				updateStatus(ctx);
				return;
			}

			if (action === "off" || action === "disable") {
				isEnabled = false;
				ctx.ui.notify("CyberSec Mode DISABLED (reverted to default coding agent prompt)", "info");
				updateStatus(ctx);
				return;
			}

			if (action in PROFILES) {
				currentProfile = action as CybersecProfile;
				isEnabled = true;
				ctx.ui.notify(`Switched to profile: ${PROFILES[currentProfile].title}`, "info");
				updateStatus(ctx);
				return;
			}

			ctx.ui.notify(
				`Unknown option "${action}". Available: on, off, status, pentest, audit, api, threat`,
				"error"
			);
		},
	});

	// Register /owasp lookup command
	pi.registerCommand("owasp", {
		description: "Search or inspect OWASP Top 10 and WSTG v4.2 test cases (e.g. /owasp A01 or /owasp WSTG-INJT-05)",
		handler: async (args, ctx) => {
			const query = (args || "").trim();
			if (!query) {
				ctx.ui.notify("Usage: /owasp <keyword or ID> (e.g. /owasp A01, /owasp sql, /owasp WSTG-ATHZ-02)", "info");
				return;
			}

			// Path to bundled checklist.json
			const candidates = [
				path.resolve(__dirname, "../skills/owasp-security-tester/references/checklist.json"),
				path.resolve(__dirname, "../../skills/owasp-security-tester/references/checklist.json"),
				path.resolve(ctx.cwd, "skills/owasp-security-tester/references/checklist.json"),
				path.resolve(ctx.cwd, ".pi/skills/owasp-security-tester/references/checklist.json"),
				path.resolve(ctx.cwd, "owasp/owasp-wstg/checklists/checklist.json"),
			];

			let checklistData: any = null;
			for (const p of candidates) {
				if (fs.existsSync(p)) {
					try {
						checklistData = JSON.parse(fs.readFileSync(p, "utf8"));
						break;
					} catch {
						// ignore
					}
				}
			}

			if (!checklistData) {
				ctx.ui.notify("OWASP checklist data not found in local workspace paths.", "error");
				return;
			}

			const upperQuery = query.toUpperCase();
			const results: Array<{ id: string; name: string; cat: string; objectives: string[] }> = [];

			for (const [catName, cat] of Object.entries<any>(checklistData.categories)) {
				for (const t of cat.tests) {
					if (
						t.id.toUpperCase().includes(upperQuery) ||
						t.name.toUpperCase().includes(upperQuery) ||
						(t.objectives || []).some((o: string) => o.toUpperCase().includes(upperQuery))
					) {
						results.push({
							id: t.id,
							name: t.name,
							cat: `${cat.id} (${catName})`,
							objectives: t.objectives || [],
						});
					}
				}
			}

			if (results.length === 0) {
				ctx.ui.notify(`No WSTG tests matching "${query}".`, "warning");
				return;
			}

			if (results.length === 1) {
				const r = results[0];
				ctx.ui.notify(
					`[${r.id}] ${r.name}\nCategory: ${r.cat}\nObjective: ${r.objectives[0] || "N/A"}`,
					"info"
				);
			} else {
				const summary = results.slice(0, 5).map(r => `• ${r.id}: ${r.name}`).join("\n");
				const extra = results.length > 5 ? `\n...and ${results.length - 5} more.` : "";
				ctx.ui.notify(`Found ${results.length} WSTG tests:\n${summary}${extra}`, "info");
			}
		},
	});

	// Register /threatmodel helper command
	pi.registerCommand("threatmodel", {
		description: "Switch to threat modeling profile and prepare STRIDE analysis",
		handler: async (args, ctx) => {
			currentProfile = "threat";
			isEnabled = true;
			updateStatus(ctx);
			ctx.ui.notify(`Threat Modeling Mode activated. Provide system description or architecture.`, "info");
		},
	});

	// Hook before_agent_start to dynamically transform system prompt
	pi.on("before_agent_start", async (event, ctx) => {
		updateStatus(ctx);

		if (!isEnabled) {
			return undefined;
		}

		const prof = PROFILES[currentProfile];

		// Check if a dedicated SYSTEM.md exists in current workspace or package root
		const customSystemPaths = [
			path.resolve(ctx.cwd, ".pi/SYSTEM.md"),
			path.resolve(ctx.cwd, "SYSTEM.md"),
			path.resolve(__dirname, "../SYSTEM.md"),
			path.resolve(__dirname, "../../SYSTEM.md"),
		];
		let baseSystemPrompt = "";

		for (const p of customSystemPaths) {
			if (fs.existsSync(p)) {
				try {
					baseSystemPrompt = fs.readFileSync(p, "utf8");
					break;
				} catch {
					// continue
				}
			}
		}

		// Build enriched cybersecurity system prompt
		const enrichedPrompt = `
${baseSystemPrompt || event.systemPrompt}

================================================================================
ACTIVE SECURITY PERSONA: ${prof.title}
================================================================================
${prof.instructions}

AUDIT GUIDELINES:
1. Always evaluate code against OWASP Top 10 (2021/2025) and WSTG v4.2 methodologies.
2. Structure findings with Severity, CVSS v3.1, WSTG Test ID, and CWE.
3. Provide concrete, drop-in remediations and hardened code diffs.
4. Maintain high defensive ethics: safe verification steps only, no destructive testing.
================================================================================
`;

		return {
			systemPrompt: enrichedPrompt,
		};
	});
}

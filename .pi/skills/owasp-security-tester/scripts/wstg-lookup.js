#!/usr/bin/env node
/**
 * WSTG / OWASP Top 10 Fast CLI Lookup Tool
 * 
 * Usage:
 *   node wstg-lookup.js list
 *   node wstg-lookup.js search <keyword>
 *   node wstg-lookup.js get <WSTG-ID>
 *   node wstg-lookup.js top10 [A01..A10]
 */

const fs = require('fs');
const path = require('path');

function findChecklistPath() {
  const candidates = [
    path.resolve(__dirname, '../../../../owasp/owasp-wstg/checklists/checklist.json'),
    path.resolve(process.cwd(), 'owasp/owasp-wstg/checklists/checklist.json'),
    path.resolve(__dirname, '../references/checklist.json')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function loadChecklist() {
  const p = findChecklistPath();
  if (!p) {
    console.error(`Checklist not found in search paths.`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const args = process.argv.slice(2);
const command = args[0] || 'list';
const query = args[1] || '';

const top10Map = {
  'A01': 'A01:2021 - Broken Access Control',
  'A02': 'A02:2021 - Cryptographic Failures',
  'A03': 'A03:2021 - Injection',
  'A04': 'A04:2021 - Insecure Design',
  'A05': 'A05:2021 - Security Misconfiguration',
  'A06': 'A06:2021 - Vulnerable and Outdated Components',
  'A07': 'A07:2021 - Identification and Authentication Failures',
  'A08': 'A08:2021 - Software and Data Integrity Failures',
  'A09': 'A09:2021 - Security Logging and Monitoring Failures',
  'A10': 'A10:2021 - Server-Side Request Forgery (SSRF)'
};

switch (command.toLowerCase()) {
  case 'top10': {
    if (query) {
      const key = query.toUpperCase();
      const match = Object.entries(top10Map).find(([k, v]) => k === key || v.toUpperCase().includes(key));
      if (match) {
        console.log(`\n=== ${match[1]} ===`);
        console.log(`Reference: .pi/skills/owasp-security-tester/references/owasp-top-10.md`);
      } else {
        console.log(`No match for ${query} in OWASP Top 10.`);
      }
    } else {
      console.log('\n=== OWASP Top 10 (2021) Categories ===');
      for (const [k, v] of Object.entries(top10Map)) {
        console.log(`  [${k}] ${v}`);
      }
    }
    break;
  }

  case 'list': {
    const data = loadChecklist();
    console.log('\n=== OWASP WSTG v4.2 Testing Categories ===');
    for (const [name, cat] of Object.entries(data.categories)) {
      console.log(`  [${cat.id}] ${name} (${cat.tests.length} tests)`);
    }
    console.log('\nTo search tests: node wstg-lookup.js search <keyword>');
    console.log('To view test details: node wstg-lookup.js get <WSTG-ID>');
    break;
  }

  case 'get': {
    if (!query) {
      console.error('Error: Please provide a WSTG ID (e.g. WSTG-INJT-01)');
      process.exit(1);
    }
    const targetId = query.toUpperCase();
    const data = loadChecklist();
    let found = null;
    let foundCat = '';

    for (const [catName, cat] of Object.entries(data.categories)) {
      for (const t of cat.tests) {
        if (t.id.toUpperCase() === targetId) {
          found = t;
          foundCat = `${cat.id} - ${catName}`;
          break;
        }
      }
      if (found) break;
    }

    if (found) {
      console.log(`\n========================================`);
      console.log(`ID:        ${found.id}`);
      console.log(`Name:      ${found.name}`);
      console.log(`Category:  ${foundCat}`);
      console.log(`Reference: ${found.reference}`);
      console.log(`Objectives:`);
      for (const obj of found.objectives || []) {
        if (obj) console.log(`  - ${obj}`);
      }
      console.log(`========================================\n`);
    } else {
      console.log(`No WSTG test found with ID: ${targetId}`);
    }
    break;
  }

  case 'search': {
    if (!query) {
      console.error('Error: Please provide a search term (e.g. sql, auth, cors, cookie)');
      process.exit(1);
    }
    const term = query.toLowerCase();
    const data = loadChecklist();
    const results = [];

    for (const [catName, cat] of Object.entries(data.categories)) {
      for (const t of cat.tests) {
        const matchName = t.name.toLowerCase().includes(term);
        const matchId = t.id.toLowerCase().includes(term);
        const matchObj = (t.objectives || []).some(o => o.toLowerCase().includes(term));
        if (matchName || matchId || matchObj) {
          results.push({ ...t, category: cat.id });
        }
      }
    }

    console.log(`\nFound ${results.length} tests matching "${query}":\n`);
    for (const r of results) {
      console.log(`  [${r.id}] ${r.name}`);
    }
    console.log('');
    break;
  }

  default:
    console.log('Unknown command. Available: list, search <query>, get <id>, top10 [id]');
}

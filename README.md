# Violent-Pi: OWASP Cybersecurity & Penetration Testing Suite for Pi Coder

**Violent-Pi** trasforma **Pi Coding Agent** in un assistente avanzato per **Penetration Testing**, **Application Security (AppSec)** e **Secure Code Review**, basato direttamente sulle metodologie ufficiali **OWASP Web Security Testing Guide (WSTG v4.2)** e **OWASP Top 10 (2021/2025)**.

---

## 📦 Contenuto del Repository

```
violent-pi/
├── owasp/
│   ├── owasp-top-10/              # Repository ufficiale OWASP Top 10 (2021 + 2025 drafts)
│   └── owasp-wstg/                # Repository ufficiale OWASP Web Security Testing Guide (WSTG v4.2)
├── .pi/
│   ├── SYSTEM.md                  # System prompt completo per sostituire quello predefinito di Pi
│   ├── APPEND_SYSTEM.md           # Prompt modulare aggiuntivo (da appendere al prompt base)
│   ├── settings.json              # Configurazione locale Pi con skills, estensioni e prompt
│   ├── extensions/
│   │   └── cybersec-mode.ts       # Plugin / Estensione TypeScript con comandi e override dinamico
│   ├── prompts/
│   │   ├── audit.md               # Template /audit [target/path]
│   │   ├── owasp-check.md         # Template /owasp-check <WSTG-ID o Top 10>
│   │   ├── pentest.md             # Template /pentest [target/scenario]
│   │   ├── threat-model.md        # Template /threat-model [architettura]
│   │   └── remediate.md           # Template /remediate <vulnerabilità>
│   └── skills/
│       └── owasp-security-tester/ # Skill standard conforme ad Agent Skills (agentskills.io)
│           ├── SKILL.md           # Definizione, metodologia e istruzioni della skill
│           ├── references/
│           │   ├── wstg-v4.2-checklist.md   # Catalogo completo dei 114 test WSTG v4.2
│           │   ├── owasp-top-10.md          # Guida dettagliata A01-A10 con CWE e mitigazioni
│           │   ├── finding-report-template.md # Template standard per report di vulnerabilità
│           │   └── checklist.json           # Database JSON ufficiale delle checklist WSTG
│           └── scripts/
│               ├── wstg-lookup.js           # Utility CLI rapida per ricerca WSTG e Top 10
│               └── quick-recon.sh           # Script di ricognizione passiva della superficie di attacco
└── scripts/
    └── install-global.sh          # Script per installare la suite globalmente in ~/.pi/agent/
```

---

## 🚀 Funzionalità Principali

### 1. Skill Pi Coder: `owasp-security-tester`
Conforme alle specifiche [Agent Skills](https://agentskills.io/specification).
- **Auto-discovery**: Pi rileva automaticamente la descrizione della skill nel system prompt e carica l'intero `SKILL.md` su richiesta.
- **Invocazione esplicita**: Puoi attivarla in qualsiasi momento digitando:
  ```bash
  /skill:owasp-security-tester
  ```
- **Riferimenti inclusi**:
  - `wstg-v4.2-checklist.md`: 114 test suddivisi nelle 12 categorie (`WSTG-INFO`, `WSTG-CONF`, `WSTG-IDNT`, `WSTG-ATHN`, `WSTG-ATHZ`, `WSTG-SESS`, `WSTG-INJT`, `WSTG-ERRH`, `WSTG-CRYP`, `WSTG-BUSL`, `WSTG-CLNT`, `WSTG-APIT`).
  - `owasp-top-10.md`: analisi completa da A01 (Broken Access Control) ad A10 (SSRF).
  - `finding-report-template.md`: schema formattato per report conformi a standard industriali (CVSS v3.1, CWE, Proof of Concept non distruttiva e patch).

### 2. Estensione / Plugin TypeScript: `cybersec-mode.ts`
Estensione caricata nativamente tramite il sistema di lifecycle events di Pi (`before_agent_start`, `session_start`).
- **Sostituzione dinamica del System Prompt**: Inietta o sostituisce il system prompt di Pi ad ogni turno, applicando l'identità di Penetration Tester e le linee guida OWASP.
- **Indicatori di stato**: Mostra un badge nella barra di stato TUI: `🛡️ CYBERSEC: ON [🛡️ Pentest]`.
- **Comandi registrati**:
  - `/cybersec`: visualizza lo stato attuale.
  - `/cybersec [on|off]`: abilita o disabilita al volo la modalità cybersecurity.
  - `/cybersec [pentest|audit|api|threat]`: cambia profilo operativo:
    - `pentest`: Offensive security, penetration testing ed ethical hacking.
    - `audit`: Secure code review, SAST e analisi dei sink di esecuzione.
    - `api`: Specifico per REST e GraphQL (BOLA/IDOR, mass assignment, rate limiting).
    - `threat`: Threat modeling architetturale (STRIDE e DREAD).
  - `/owasp <termine o ID>`: ricerca istantanea nel database WSTG (es. `/owasp sql`, `/owasp A01`, `/owasp WSTG-ATHZ-02`).
  - `/threatmodel`: attiva direttamente la modalità threat modeling.

### 3. Sostituzione nativa del System Prompt (`SYSTEM.md` & `APPEND_SYSTEM.md`)
Pi supporta nativamente file markdown per personalizzare o rimpiazzare il system prompt:
- **`.pi/SYSTEM.md`**: Sostituisce integralmente il prompt predefinito del coding agent con un prompt da Senior AppSec Engineer / Ethical Hacker.
- **`.pi/APPEND_SYSTEM.md`**: Appende le direttive di sicurezza a fine prompt senza rimuovere le istruzioni base.

### 4. Template di Prompt Rapidi (`.pi/prompts/`)
- `/audit [target]`: esegue un audit di sicurezza completo sulla codebase o su un file specifico.
- `/owasp-check <ID>`: analizza la conformità rispetto a un ID WSTG o categoria Top 10.
- `/pentest [scenario]`: esegue una simulazione avversariale e penetration test.
- `/threat-model [sistema]`: modella le minacce architetturali secondo la matrice STRIDE.
- `/remediate <vulnerabilità>`: genera patch sicure pronte all'uso e side-by-side diff.

---

## 🛠️ Come Utilizzare

### Uso Locale nel Progetto `violent-pi`
Poiché la cartella `.pi/` è configurata nel repository, avviando `pi` direttamente in questa cartella:
```bash
cd /Users/maxbozza/Documents/Progetti/violent-pi
pi
```
Pi caricherà automaticamente:
- L'estensione `cybersec-mode.ts`
- La skill `owasp-security-tester`
- Tutti i template in `.pi/prompts/`
- Il system prompt custom `.pi/SYSTEM.md`

### Installazione Globale (disponibile in qualsiasi cartella)
La suite è già stata copiata anche nel tuo profilo globale `~/.pi/agent/`. Se in futuro aggiorni i file, puoi sincronizzarli con un comando:
```bash
./scripts/install-global.sh
```

---

## 🔍 Utility da Linea di Comando

All'interno della skill sono disponibili due strumenti CLI autonomi:

1. **Ricerca OWASP WSTG e Top 10 (`wstg-lookup.js`)**:
   ```bash
   node .pi/skills/owasp-security-tester/scripts/wstg-lookup.js list
   node .pi/skills/owasp-security-tester/scripts/wstg-lookup.js search sql
   node .pi/skills/owasp-security-tester/scripts/wstg-lookup.js get WSTG-INJT-05
   node .pi/skills/owasp-security-tester/scripts/wstg-lookup.js top10 A01
   ```

2. **Ricognizione e scansione passiva della superficie di attacco (`quick-recon.sh`)**:
   ```bash
   .pi/skills/owasp-security-tester/scripts/quick-recon.sh /path/to/target/project
   ```
   Rileva chiavi private, token API, file `.env`, sink pericolosi (`eval`, `exec`, deserializzazione non sicura, `innerHTML`) e manifest di dipendenze.

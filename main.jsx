:root {
  --bg: #0b0f14;
  --surface: #131a21;
  --surface-raised: #182029;
  --border: #232c36;
  --text: #e8edf2;
  --text-muted: #7c8896;

  --accent-verified: #2dd4bf;
  --accent-flagged: #f0594b;
  --accent-pending: #f5a623;

  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
}

#root {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: var(--font-body);
  cursor: pointer;
}

input,
select {
  font-family: var(--font-body);
}

::selection {
  background: var(--accent-verified);
  color: #0b0f14;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.12s ease, opacity 0.12s ease;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background: var(--accent-verified);
  color: #04201c;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}

.btn-ghost:hover {
  border-color: var(--text-muted);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.input-group label {
  font-size: 13px;
  color: var(--text-muted);
}

.input-group input,
.input-group select {
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  color: var(--text);
  font-size: 14px;
}

.input-group input:focus,
.input-group select:focus {
  outline: 2px solid var(--accent-verified);
  outline-offset: 1px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}

td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 13px;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
}

.status-chip.present {
  background: rgba(45, 212, 191, 0.12);
  color: var(--accent-verified);
}

.status-chip.flagged {
  background: rgba(240, 89, 75, 0.12);
  color: var(--accent-flagged);
}

.status-chip.pending {
  background: rgba(245, 166, 35, 0.12);
  color: var(--accent-pending);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

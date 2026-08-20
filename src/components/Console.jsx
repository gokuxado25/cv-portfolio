import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, SKILLS, CONTACT, STATUS, T } from '../data/content.js';

// Consola flotante con comandos de administración de sistemas.
export default function Console({ lang }) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const banner = lang === 'es'
    ? "Consola de sistemas · escribe 'help' para empezar."
    : "Systems console · type 'help' to start.";

  useEffect(() => { setHistory([{ type: 'sys', text: banner }]); /* eslint-disable-next-line */ }, [lang]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history, open]);

  function exec(raw) {
    const cmd = (raw || '').trim();
    const low = cmd.toLowerCase();
    const out = [{ type: 'cmd', text: cmd }];
    if (!cmd) { setHistory((h) => [...h, ...out]); return; }

    if (low === 'help') {
      out.push({ type: 'out', text: 'whoami · uptime · systemctl status · ls projects/ · skills --list · cat experience.log · contact · clear' });
    } else if (low === 'whoami') {
      out.push({ type: 'out', text: T[lang].role + ' — ' + CONTACT.location });
    } else if (low === 'uptime') {
      out.push({ type: 'ok', text: lang === 'es' ? ' 8 años en operaciones técnicas · carga: estable · caídas: las mínimas' : ' 8 years in technical operations · load: stable · outages: minimal' });
    } else if (low === 'systemctl status' || low === 'systemctl') {
      STATUS.forEach((s) => out.push({ type: 'ok', text: '● ' + s[lang].title + '  —  ' + s[lang].state }));
    } else if (low === 'ls' || low === 'ls projects/' || low === 'ls projects') {
      PROJECTS.forEach((p) => out.push({ type: 'out', text: 'drwxr-xr-x  ' + p.repo }));
    } else if (low === 'skills --list' || low === 'skills') {
      SKILLS.forEach((s) => out.push({ type: 'out', text: s[lang] + ': ' + s.items.join(', ') }));
    } else if (low === 'cat experience.log') {
      out.push({ type: 'out', text: lang === 'es'
        ? '2017–2025 · Operaciones 24/7 · 2025– · Soporte IT (Cartronic / Prosegur Activa)'
        : '2017–2025 · 24/7 operations · 2025– · IT Support (Cartronic / Prosegur Activa)' });
    } else if (low === 'contact') {
      out.push({ type: 'out', text: CONTACT.email + ' · ' + CONTACT.phoneDisplay });
      out.push({ type: 'out', text: CONTACT.github + ' · ' + CONTACT.linkedin });
    } else if (low === 'clear') {
      setHistory([]); return;
    } else if (low.startsWith('sudo')) {
      out.push({ type: 'warn', text: lang === 'es' ? 'Buen intento 😏 (pero hago backups)' : 'Nice try 😏 (but I do backups)' });
    } else {
      out.push({ type: 'err', text: (lang === 'es' ? 'comando no encontrado: ' : 'command not found: ') + cmd });
    }
    setHistory((h) => [...h, ...out]);
  }

  function onSubmit(e) { e.preventDefault(); exec(input); setInput(''); }

  const quick = ['whoami', 'uptime', 'systemctl status', 'skills --list'];
  const colorOf = { cmd: 'text-ink', out: 'text-ink-dim', err: 'text-crit', ok: 'text-ok', warn: 'text-warn', info: 'text-info', sys: 'text-info' };

  return (
    <>
      <button className="con-launch" onClick={() => setOpen(true)} aria-label="Abrir consola">
        <span className="ping" />
        {lang === 'es' ? '> consola' : '> console'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative w-full sm:max-w-xl card overflow-hidden rounded-b-none sm:rounded-xl">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="mono text-xs text-konoha">sysadmin@infra:~$</span>
                <button onClick={() => setOpen(false)} className="mono text-[11px] text-ink-mute hover:text-crit uppercase tracking-wider">
                  {lang === 'es' ? 'cerrar' : 'close'} ✕
                </button>
              </div>
              <div className="h-64 sm:h-72 overflow-y-auto px-4 py-3 mono text-[12.5px] leading-relaxed">
                {history.map((l, i) => (
                  <div key={i} className={colorOf[l.type]}>
                    {l.type === 'cmd' ? <span className="text-ok">{'> '}</span> : null}{l.text}
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2">
                {quick.map((q) => (
                  <button key={q} onClick={() => exec(q)}
                    className="mono text-[10.5px] text-ink-dim border border-line rounded px-2 py-1 hover:border-ok hover:text-ok transition-colors">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-2.5">
                <span className="text-ok mono text-sm">$</span>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                  spellCheck={false} autoComplete="off"
                  className="flex-1 bg-transparent mono text-sm text-ink outline-none placeholder:text-ink-mute"
                  placeholder={lang === 'es' ? 'escribe un comando…' : 'type a command…'} />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

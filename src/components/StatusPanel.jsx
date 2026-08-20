import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STATUS, STATE_LABEL, T } from '../data/content.js';

const dotColor = { up: 'bg-ok', guard: 'bg-info', watch: 'bg-warn' };
const txtColor = { up: 'text-ok', guard: 'text-info', watch: 'text-warn' };

function uptime(seed) {
  // uptime "decorativo" estable por id
  const days = 30 + (seed % 320);
  return days + 'd';
}

export default function StatusPanel({ lang }) {
  const [count, setCount] = useState(0);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (count >= STATUS.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 360);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="pulse-dot" />
          <span className="mono text-xs text-ink uppercase tracking-wider">{T[lang].feedTitle}</span>
        </div>
        <span className="mono text-[10px] text-ink-mute uppercase tracking-widest">{T[lang].feedSub}</span>
      </div>

      <div className="space-y-2.5">
        <AnimatePresence>
          {STATUS.slice(0, count).map((a, i) => {
            const L = a[lang];
            const isOpen = openId === a.id;
            const stLabel = STATE_LABEL[a.sev];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
                className="rounded-lg border border-line bg-panel-2/60"
              >
                <button onClick={() => setOpenId(isOpen ? null : a.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor[a.sev]}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-ink leading-snug">{L.title}</div>
                    <div className="mono text-[11px] text-ink-dim mt-0.5 truncate">{L.src}</div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className={`mono text-[10px] font-bold ${txtColor[a.sev]}`}>{L.state}</span>
                    <span className="mono text-[10px] text-ink-mute mt-0.5">up {uptime(i * 47 + a.id.length)}</span>
                  </div>
                  <span className="mono text-[10px] text-ink-mute shrink-0">{isOpen ? '▴' : '▾'}</span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }} className="overflow-hidden">
                      <div className="px-3 pb-3 pt-1 border-t border-line/60 mx-3">
                        <p className="text-[12.5px] text-ink-dim mt-2 leading-relaxed">{L.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mono text-[10px] text-ink-mute mt-3 text-center">
        {lang === 'es' ? '↑ toca un sistema para ver el detalle' : '↑ tap a system to expand'}
      </div>
    </div>
  );
}

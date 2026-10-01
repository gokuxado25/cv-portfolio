import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/content.js';

// Fórmulas para calcular la fuerza del deslizamiento (swipe)
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Projects({ lang }) {
  const [current, setCurrent] = useState(0);
  const p = PROJECTS[current];

  // Función para pasar de página cíclicamente al arrastrar
  const paginate = (direction) => {
    let nextIndex = current + direction;
    if (nextIndex < 0) nextIndex = PROJECTS.length - 1;
    if (nextIndex >= PROJECTS.length) nextIndex = 0;
    setCurrent(nextIndex);
  };

  const formatUrlForDisplay = (url) => {
    if (url === '#') return 'Proyecto local / offline';
    try {
      const u = new URL(url);
      return u.hostname.replace('www.', '') + u.pathname;
    } catch {
      return url;
    }
  };

  return (
    <div className="card overflow-hidden select-none">
      {/* Cabecera tipo Terminal */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-ink/5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        
        {p.url && p.url !== '#' && (
          <div className="mono text-[11px] text-ink-mute flex items-center gap-1.5 truncate max-w-[150px] sm:max-w-none">
            {formatUrlForDisplay(p.url)}
          </div>
        )}
      </div>

      {/* Área interactiva de Arrastre (Swipe / Drag) */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              // Detecta si deslizas a la izquierda o derecha
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1); // Siguiente
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1); // Anterior
              }
            }}
            className="p-5 sm:p-6 min-h-[180px] flex flex-col"
          >
            <div className="flex justify-between items-start mb-3 gap-2">
              <div className="mono text-[11px] uppercase tracking-wider text-amber mt-1">
                {p[lang].tag}
              </div>
              
              {/* BOTÓN GIGANTE DE ENLACE */}
              {p.url && p.url !== '#' && (
                <a 
                  href={p.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-info/20 text-info border border-info/50 px-3 py-1.5 rounded-full hover:bg-info hover:text-bg hover:scale-105 transition-all shadow-[0_0_10px_rgba(52,211,153,0.1)] hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] z-10 cursor-pointer shrink-0"
                >
                  Ver Proyecto
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            <h3 className="display text-xl font-bold text-ink mb-3 flex items-center gap-2">
              <span className="text-info font-mono font-normal">$</span> {p.repo}
            </h3>
            
            <p className="text-[14px] text-ink-dim leading-relaxed mb-5 flex-1">
              {p[lang].desc}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {p.stack.map((s) => (
                <span key={s} className="mono text-[10px] text-ink-mute border border-line rounded px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Paginación */}
      <div className="border-t border-line px-4 py-3 bg-ink/5 flex justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-info shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'w-2 bg-line hover:bg-ink-mute'
            }`}
            aria-label={`Ver proyecto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { PROJECTS } from '../data/content.js';

export default function Projects({ lang }) {
  const [current, setCurrent] = useState(0);
  const p = PROJECTS[current];

  // Función para formatear el enlace para que se vea limpio en pantalla (sin el https://)
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
    <div className="card overflow-hidden">
      {/* Cabecera tipo Terminal / Editor */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-ink/5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        
        {/* ENLACE EXTERNO MEJORADO E INTERACTIVO */}
        {p.url && p.url !== '#' && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[11px] text-ink-mute flex items-center gap-1.5 hover:text-info transition-colors group cursor-pointer"
            title={`Abrir ${p.repo}`}
          >
            <span className="truncate max-w-[150px] sm:max-w-none">
              {formatUrlForDisplay(p.url)}
            </span>
            <svg 
              className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      <div className="p-5 sm:p-6 min-h-[160px]">
        <div className="mono text-[11px] uppercase tracking-wider text-amber mb-2">{p[lang].tag}</div>
        <h3 className="display text-xl font-bold text-ink mb-3 flex items-center gap-2">
          <span className="text-info font-mono font-normal">$</span> {p.repo}
        </h3>
        <p className="text-[14px] text-ink-dim leading-relaxed mb-5 min-h-[3rem]">{p[lang].desc}</p>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="mono text-[10px] text-ink-mute border border-line rounded px-2 py-1">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Paginación */}
      <div className="border-t border-line px-4 py-3 bg-ink/5 flex justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-info' : 'w-2 bg-line hover:bg-ink-mute'
            }`}
            aria-label={`Ver proyecto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

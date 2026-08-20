import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
//  Intro de arranque: Secuencia de infraestructura real.
//  Narrativa: Alta disponibilidad, CCNA, Sistemas y Hardware.
// ─────────────────────────────────────────────────────────────

const SEQ = {
  es: {
    title: 'CORE-INFRA-01 · secuencia de inicio',
    boot: [
      { t: 'CORE-INFRA-01 · cold boot sequence initiated', c: 'dim', d: 240 },
      { t: '[ OK ] Hardware core · voltajes y micro-componentes verificados', c: 'ok', d: 220 },
      { t: '[ OK ] Protocolos TCP/IP, VLANs y Routing (Cisco) · ESTABLE', c: 'ok', d: 240 },
      { t: '[ OK ] Active Directory y Políticas GPO · SINCRONIZADO', c: 'ok', d: 240 },
      { t: '[ OK ] Firewall perimetral y ACLs de seguridad · APLICADOS', c: 'ok', d: 240 },
      { t: '[ ·· ] Desplegando red de CCTV y control de accesos…', c: 'info', d: 460 },
    ],
    check: [
      { t: '[ OK ] Telemetría de red y ancho de banda · ÓPTIMO', c: 'ok', d: 300 },
      { t: '[ OK ] Entornos virtuales y nodos de contingencia · EN LÍNEA', c: 'ok', d: 300 },
      { t: '[ OK ] Sistemas de backup y redundancia · INTEGRIDAD AL 100%', c: 'ok', d: 300 },
    ],
    meterLabel: 'DISPONIBILIDAD (UPTIME)', okStatus: 'SISTEMA OPERATIVO',
    finalGlitch: 'INFRAESTRUCTURA ESTABLE',
    reveal: {
      eyebrow: '// infraestructura en marcha',
      body: [
        ['Todo lo que acabas de ver arrancar —enrutamiento de datos, servidores físicos, firewalls y monitorización— <b>no se gestiona solo</b>.', false],
        ['Detrás de una red que no cae y una empresa que no se detiene, hay una arquitectura robusta, hardware meticulosamente configurado y un control absoluto del entorno.', true],
      ],
      tag: 'disponibilidad 99.9% · el trabajo crítico que sostiene el negocio',
      closing: 'Si un Administrador de Redes y Sistemas hace su trabajo a la perfección, los demás pensarán que la tecnología funciona por arte de magia.',
      sign: '— Dihenrry Barbaran Cotrina · Administrador de Redes y Sistemas / Soporte IT',
      cta: 'Acceder a la infraestructura ▸',
    },
  },
  en: {
    title: 'CORE-INFRA-01 · boot sequence',
    boot: [
      { t: 'CORE-INFRA-01 · cold boot sequence initiated', c: 'dim', d: 240 },
      { t: '[ OK ] Core hardware · voltages and micro-components verified', c: 'ok', d: 220 },
      { t: '[ OK ] TCP/IP, VLANs & Routing protocols (Cisco) · STABLE', c: 'ok', d: 240 },
      { t: '[ OK ] Active Directory & GPO Policies · SYNCED', c: 'ok', d: 240 },
      { t: '[ OK ] Perimeter firewall & security ACLs · APPLIED', c: 'ok', d: 240 },
      { t: '[ ·· ] Deploying CCTV network & access controls…', c: 'info', d: 460 },
    ],
    check: [
      { t: '[ OK ] Network telemetry & bandwidth · OPTIMAL', c: 'ok', d: 300 },
      { t: '[ OK ] Virtual environments & contingency nodes · ONLINE', c: 'ok', d: 300 },
      { t: '[ OK ] Backup & redundancy systems · 100% INTEGRITY', c: 'ok', d: 300 },
    ],
    meterLabel: 'UPTIME AVAILABILITY', okStatus: 'SYSTEM OPERATIONAL',
    finalGlitch: 'INFRASTRUCTURE STABLE',
    reveal: {
      eyebrow: '// infrastructure online',
      body: [
        ['Everything you just watched boot up —data routing, physical servers, firewalls, and monitoring— <b>does not run itself</b>.', false],
        ['Behind a network that never goes down and a business that never stops, there is robust architecture, meticulously configured hardware, and absolute control of the environment.', true],
      ],
      tag: '99.9% uptime · the critical work that sustains the business',
      closing: 'If a Network & Systems Administrator does their job flawlessly, everyone else will think technology works by magic.',
      sign: '— Dihenrry Barbaran Cotrina · Network & Systems Administrator / IT Support',
      cta: 'Access infrastructure ▸',
    },
  },
};

const colorClass = { ok: 'text-ok', info: 'text-info', warn: 'text-warn', crit: 'text-crit', dim: 'text-ink-dim', ink: 'text-ink' };

export default function Theater({ lang, setLang, onDone }) {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState('console');
  const [pct, setPct] = useState(null);
  const [status, setStatus] = useState(null);

  const cancelled = useRef(false);
  const timers = useRef([]);
  const endRef = useRef(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  const wait = (ms) => new Promise((r) => { timers.current.push(setTimeout(r, ms)); });

  useEffect(() => {
    cancelled.current = false;
    run();
    return () => { cancelled.current = true; timers.current.forEach(clearTimeout); timers.current = []; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [lines]);

  async function run() {
    const S = () => SEQ[langRef.current];
    for (const l of S().boot) { if (cancelled.current) return; setLines((p) => [...p, l]); await wait(l.d); }
    // medidor de disponibilidad subiendo a 100%
    setPct(0);
    for (let p = 0; p <= 100; p += 4) { if (cancelled.current) return; setPct(p); await wait(40); }
    await wait(250);
    for (const l of S().check) { if (cancelled.current) return; setLines((p) => [...p, l]); await wait(l.d); }
    setStatus(S().finalGlitch);
    await wait(1500);
    if (cancelled.current) return;
    setPhase('reveal');
    window.scrollTo(0, 0);
  }

  function skip() {
    cancelled.current = true;
    timers.current.forEach(clearTimeout);
    onDone();
  }

  const S = SEQ[lang];

  return (
    <motion.div className="fixed inset-0 z-[80] bg-bg overflow-y-auto" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
      <style>{`
        .th-meter{height:8px;border:1px solid #1e2a3a;border-radius:6px;overflow:hidden;background:#0d141e;margin-top:18px;}
        .th-meter > i{display:block;height:100%;background:rgb(var(--c-ok-rgb));transition:width .1s linear;}
        .th-glitch{position:relative;display:inline-block;}
        .th-glitch::before,.th-glitch::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;}
        .th-glitch::before{color:#78d2eb;transform:translate(2px,-1px);opacity:.6;clip-path:inset(0 0 55% 0);}
        .th-glitch::after{color:#ff7a3d;transform:translate(-2px,1px);opacity:.5;clip-path:inset(55% 0 0 0);}
      `}</style>

      <div className="fixed top-3.5 left-3.5 z-[85] flex items-center gap-1 border border-line rounded-lg p-0.5 mono text-[11px]">
        {['es', 'en'].map((l) => (
          <button key={l} onClick={() => setLang(l)}
            className={`px-2 py-1 rounded-md ${lang === l ? 'bg-line text-ink' : 'text-ink-mute'}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <button onClick={skip}
        className="fixed top-3.5 right-3.5 z-[85] mono text-[11px] tracking-widest uppercase text-ink-mute hover:text-ink-dim border border-line rounded-md px-2.5 py-1.5 transition-colors">
        {lang === 'es' ? 'saltar ▸' : 'skip ▸'}
      </button>

      {phase === 'console' && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-crit" />
              <span className="h-2.5 w-2.5 rounded-full bg-warn" />
              <span className="h-2.5 w-2.5 rounded-full bg-ok" />
              <span className="mono text-xs text-ink-dim ml-1.5">{S.title}</span>
            </div>
            <div>
              {lines.map((l, i) => (
                <div key={i} className={`mono text-[13.5px] leading-relaxed whitespace-pre-wrap break-words ${colorClass[l.c]}`}>{l.t}</div>
              ))}
              <span className="cursor align-middle" />
              <div ref={endRef} />
            </div>
            {pct !== null && (
              <>
                <div className="th-meter"><i style={{ width: pct + '%' }} /></div>
                <div className="flex justify-between mono text-[11px] text-ink-dim mt-1.5">
                  <span>{S.meterLabel}</span>
                  <span>{pct}%</span>
                </div>
              </>
            )}
            {status && (
              <div className="mono font-bold text-center mt-10" style={{ fontSize: 'clamp(18px,4.5vw,32px)' }}>
                <span className="th-glitch text-ok" data-t={status}>{status}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center px-7">
          <div className="max-w-2xl w-full">
            <div className="mono text-xs uppercase tracking-[0.2em] text-ok mb-4">{S.reveal.eyebrow}</div>
            {S.reveal.body.map((b, i) => (
              <p key={i} className={`leading-relaxed mb-3.5 ${b[1] ? 'text-ink-dim text-[15px]' : 'text-ink'}`}
                 style={{ fontSize: b[1] ? undefined : 'clamp(16px,2.6vw,21px)' }}
                 dangerouslySetInnerHTML={{ __html: b[0] }} />
            ))}
            <div className="mono text-[12.5px] text-info border border-line rounded-md px-3 py-2 inline-block my-2">{S.reveal.tag}</div>
            <p className="text-ink leading-relaxed mb-2" style={{ fontSize: 'clamp(16px,2.6vw,21px)' }}
               dangerouslySetInnerHTML={{ __html: S.reveal.closing }} />
            <div className="mono text-[13px] text-konoha mt-3">{S.reveal.sign}</div>
            <button onClick={onDone}
              className="mt-7 inline-flex items-center gap-2.5 bg-ok text-bg border-none rounded-lg px-5 py-3.5 mono font-bold text-[15px] hover:-translate-y-px transition-transform"
              style={{ boxShadow: '0 8px 24px rgba(59,158,255,0.22)' }}>
              {S.reveal.cta}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

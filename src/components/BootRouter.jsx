import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BootRouter({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // idle, booting, granted, message
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startBoot = async () => {
    setPhase('booting');

    // Efecto de barra de progreso ultra rápida y caótica
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + Math.floor(Math.random() * 20) + 5;
      });
    }, 120);

    // Logs rápidos simulando carga de módulos críticos (sin que haya que leerlos)
    const rapidLogs = [
      "[ OK ] INICIALIZANDO NÚCLEO DEL SISTEMA",
      "[ OK ] CARGANDO MÓDULOS DE RED (CISCO IOS)",
      "[ WARN ] DETECTADA ANOMALÍA EN PUERTO 443... AISLANDO",
      "[ OK ] TRÁFICO ENCRIPTADO... AES-256 ACTIVO",
      "[ OK ] SINCRONIZANDO TABLAS DE ENRUTAMIENTO BGP",
      "[ OK ] CONECTANDO CON SERVIDORES DE MADRID",
      "[ OK ] BYPASS DE SEGURIDAD COMPLETADO",
      "[ OK ] ENLACE ESTABLECIDO A 10Gbps"
    ];

    for (let i = 0; i < rapidLogs.length; i++) {
      setLogs((prev) => [...prev, rapidLogs[i]]);
      await sleep(150); // Muy rápido, efecto visual
    }

    await sleep(400);
    setPhase('granted'); // Pantallazo de ACCESO CONCEDIDO
    
    await sleep(1200);
    setPhase('message'); // El mensaje final con impacto
    
    await sleep(4000);
    onComplete(); // Entramos a la web
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono overflow-hidden">
      
      {/* Fondo de cuadrícula sutil y viñeta oscura */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />

      <AnimatePresence>
        {phase === 'idle' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 2, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.5 }}
            onClick={startBoot}
            className="relative px-8 py-4 bg-transparent border-2 border-ok text-ok font-bold text-lg tracking-[0.3em] uppercase overflow-hidden group"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">[ INICIAR SISTEMA ]</span>
            <div className="absolute inset-0 bg-ok translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            {/* Resplandor externo */}
            <div className="absolute -inset-2 bg-ok/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        )}

        {phase === 'booting' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-4xl p-6 sm:p-10 flex flex-col gap-6"
          >
            {/* Línea de escáner láser bajando por la pantalla */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1 bg-ok/50 shadow-[0_0_20px_var(--color-ok)] z-50 pointer-events-none"
            />

            {/* Cabecera del panel */}
            <div className="flex justify-between items-end border-b border-ok/30 pb-2">
              <div>
                <div className="text-ok/50 text-xs tracking-widest mb-1">SEC_LEVEL_ALPHA</div>
                <div className="text-ok text-xl sm:text-2xl font-bold tracking-wider">DIHENRRY_INFRA_SYS</div>
              </div>
              <div className="text-right">
                <div className="text-ok text-3xl sm:text-4xl font-bold">{progress}%</div>
              </div>
            </div>

            {/* Barra de progreso masiva */}
            <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden border border-ok/20">
              <motion.div 
                className="h-full bg-ok shadow-[0_0_15px_var(--color-ok)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            {/* Consola de logs rápidos (Visual) */}
            <div className="h-40 sm:h-56 bg-gray-950 border border-ok/20 p-4 overflow-hidden rounded relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-gray-950 pointer-events-none" />
              <div className="text-ok/80 text-xs sm:text-sm leading-loose opacity-90 flex flex-col justify-end h-full">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('WARN') ? 'text-yellow-400 font-bold' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'granted' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex items-center justify-center bg-ok"
          >
            <div className="text-black text-4xl sm:text-7xl font-bold tracking-tighter uppercase animate-pulse">
              Acceso Concedido
            </div>
          </motion.div>
        )}

        {phase === 'message' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center p-8 text-center"
          >
            <p className="text-2xl sm:text-4xl text-white font-light tracking-wide max-w-4xl leading-relaxed">
              "Todo lo que acabas de ver arrancar <br/>
              <span className="text-ok font-bold drop-shadow-[0_0_10px_var(--color-ok)]">
                —enrutamiento, servidores y seguridad—
              </span><br/>
              no se gestiona solo."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

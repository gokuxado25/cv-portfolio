import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BootRouter({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // idle, zooming, booting, message
  const [logs, setLogs] = useState([]);
  const endRef = useRef(null);

  // Auto-scroll para la terminal
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startBoot = async () => {
    setPhase('zooming');
    await sleep(800); // Tiempo del zoom
    setPhase('booting');

    const bootSequence = [
      "Cisco IOS Software, C2960X Software (C2960X-UNIVERSALK9-M), Version 15.2(7)E4",
      "Copyright (c) 1986-2026 by Cisco Systems, Inc.",
      "Compiled Mon 30-Sep-26 13:48 by sysadmin",
      "POST: System Board Test : Passed",
      "POST: Memory Test : Passed",
      "Initializing flashfs... Done.",
      "Loading routing tables... OK",
      "Bringing up interface GigabitEthernet0/1... UP",
      "Bringing up interface vlan 10... UP",
    ];

    // Simular escritura línea por línea
    for (const line of bootSequence) {
      setLogs((prev) => [...prev, line]);
      await sleep(Math.random() * 400 + 150); // Tiempo aleatorio para mayor realismo
    }

    await sleep(600);
    setLogs((prev) => [...prev, "", "[!] Verificando conexión exterior (Enviando paquetes ICMP)..."]);
    await sleep(800);
    
    // Simular el paquete que va y vuelve
    const pings = [
      "Reply from 8.8.8.8: bytes=32 time=4ms TTL=118",
      "Reply from 8.8.8.8: bytes=32 time=3ms TTL=118",
      "Reply from 8.8.8.8: bytes=32 time=4ms TTL=118"
    ];

    for (const ping of pings) {
      setLogs((prev) => [...prev, ping]);
      await sleep(500);
    }

    setLogs((prev) => [...prev, "Estadísticas de ping: Enviados = 3, Recibidos = 3, Perdidos = 0 (0% pérdida)"]);
    await sleep(1000);
    setLogs((prev) => [...prev, "[OK] Enlace seguro establecido. Redirigiendo tráfico..."]);
    
    await sleep(1200);
    setPhase('message');
    
    // Dejar el mensaje final en pantalla unos segundos antes de entrar a la web
    await sleep(4500);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center font-mono text-sm sm:text-base overflow-hidden">
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ scale: 3, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={startBoot}
            className="px-6 py-3 border border-ok text-ok rounded shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:bg-ok hover:text-black transition-all tracking-widest uppercase"
          >
            [ Iniciar Conexión ]
          </motion.button>
        )}

        {phase === 'booting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl h-full sm:h-3/4 p-6 sm:p-10 text-ok flex flex-col"
          >
            <div className="flex-1 overflow-y-auto opacity-90 leading-relaxed space-y-1">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="h-6 mt-2 flex items-center">
              <span className="animate-pulse w-2 h-5 bg-ok block"></span>
            </div>
          </motion.div>
        )}

        {phase === 'message' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center p-8 bg-[#050505] text-center"
          >
            <p className="text-xl sm:text-3xl text-white font-light tracking-wide max-w-4xl leading-relaxed">
              "Todo lo que acabas de ver arrancar <br/>
              <span className="text-ok font-semibold">—enrutamiento de datos, servidores físicos, firewalls y monitorización—</span><br/>
              no se gestiona solo."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BootRouter({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // idle, booting, active, zoom, message
  const [logs, setLogs] = useState([]);
  const [portLeds, setPortLeds] = useState(Array(24).fill('off')); // off, amber, green
  const [sysLed, setSysLed] = useState('off');

  const startBoot = async () => {
    setPhase('booting');
    setSysLed('amber');
    
    // 1. Simular arranque de hardware (LED System parpadea)
    await sleep(600);
    setSysLed('amber-blink');
    setLogs(["[ BIOS ] Iniciando secuencia POST... OK"]);
    await sleep(800);
    
    // 2. Encendido de todos los puertos (como hacen los switches reales al arrancar)
    setLogs((p) => [...p, "[ BIOS ] Verificando interfaces físicas..."]);
    setPortLeds(Array(24).fill('amber'));
    await sleep(600);
    setPortLeds(Array(24).fill('green'));
    await sleep(400);
    setPortLeds(Array(24).fill('off'));
    
    // 3. Carga del Sistema Operativo
    setSysLed('green-blink');
    const bootSteps = [
      "Cisco IOS Software, C2960X Software (C2960X-UNIVERSALK9-M)",
      "Cargando memoria flash... OK",
      "Inicializando VLANs y STP... OK",
      "Levantando interfaces GigabitEthernet... DONE"
    ];
    
    for (let step of bootSteps) {
      await sleep(500);
      setLogs((p) => [...p, step]);
    }
    setSysLed('green');

    // 4. Animación de "Tráfico de Red" (Simulando el viaje del paquete)
    setPhase('active');
    setLogs((p) => [...p, "\n[ RED ] Enrutando paquete: PC -> Switch -> Firewall -> Servidor"]);
    
    // Efecto de ola de LEDs (el paquete viajando)
    for (let i = 0; i < 24; i++) {
      setPortLeds((prev) => {
        const next = [...prev];
        next[i] = 'green-blink';
        if (i > 0) next[i - 1] = 'off';
        return next;
      });
      await sleep(100);
    }
    
    // Dejamos un par de puertos conectados parpadeando
    setPortLeds((prev) => {
      const next = Array(24).fill('off');
      next[0] = 'green-blink'; // PC
      next[11] = 'green';      // Uplink Router
      next[23] = 'green-blink'; // Servidor
      return next;
    });

    await sleep(1500);
    setLogs((p) => [...p, "[ OK ] Conexión establecida. Accediendo al sistema..."]);
    
    await sleep(1000);
    setPhase('zoom');
    
    await sleep(1000);
    setPhase('message');
    
    await sleep(4500);
    onComplete();
  };

  // Renderizador de colores para LEDs realistas
  const getLedStyle = (state) => {
    switch (state) {
      case 'amber': return 'bg-yellow-500 shadow-[0_0_8px_#eab308]';
      case 'amber-blink': return 'bg-yellow-500 shadow-[0_0_8px_#eab308] animate-pulse';
      case 'green': return 'bg-green-500 shadow-[0_0_10px_#22c55e]';
      case 'green-blink': return 'bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse';
      default: return 'bg-gray-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center font-mono overflow-hidden">
      
      {/* RACK BACKGROUND (Los rieles de los lados) */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-gray-950 to-gray-900 border-r border-gray-800 flex flex-col justify-around items-center">
        {[...Array(20)].map((_, i) => <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-black shadow-inner" />)}
      </div>
      <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-gray-950 to-gray-900 border-l border-gray-800 flex flex-col justify-around items-center">
        {[...Array(20)].map((_, i) => <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-black shadow-inner" />)}
      </div>

      <AnimatePresence>
        {phase === 'idle' && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={startBoot}
            className="absolute bottom-20 z-50 px-8 py-3 bg-gray-900 border border-gray-700 text-gray-300 rounded shadow-2xl hover:bg-gray-800 hover:text-white transition-all tracking-widest uppercase font-bold"
          >
            [ Encender Equipo ]
          </motion.button>
        )}

        {(phase !== 'message' && phase !== 'zoom') && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 5, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: phase === 'zoom' ? 1.5 : 0.5, ease: "easeInOut" }}
            className="relative w-full max-w-5xl px-12 sm:px-24"
          >
            {/* SWITCH CHASSIS REALISTA */}
            <div className="w-full h-32 sm:h-40 bg-gradient-to-b from-[#3a3f44] via-[#2a2d32] to-[#1a1c1f] rounded-sm border border-[#555] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center px-4 sm:px-6 relative">
              
              {/* Branding / SYST LEDs */}
              <div className="flex flex-col mr-6 w-24">
                <span className="font-sans text-[10px] sm:text-xs font-bold text-gray-300 tracking-wider">CISCO-LIKE</span>
                <span className="font-sans text-[8px] text-gray-500 mb-3">CATALYST 24G</span>
                
                <div className="flex items-center gap-2 text-[8px] text-gray-400">
                  <div className={`w-2 h-2 rounded-full ${getLedStyle(sysLed)}`} /> SYST
                </div>
              </div>

              {/* Console Port (RJ45 detallado) */}
              <div className="mr-8 flex flex-col items-center">
                <span className="text-[8px] text-cyan-500 mb-1">CONSOLE</span>
                <div className="w-8 h-8 bg-black border-2 border-gray-600 rounded-sm relative flex justify-center shadow-[inset_0_3px_6px_rgba(0,0,0,1)]">
                  <div className="w-3 h-2 bg-gray-800 absolute top-0 rounded-b-sm" /> {/* Pestaña del clip */}
                  <div className="absolute inset-0 border border-cyan-500/30 rounded-sm pointer-events-none" />
                </div>
              </div>

              {/* 24 Ports Array */}
              <div className="flex-1 grid grid-cols-12 gap-x-1 sm:gap-x-2 gap-y-1 sm:gap-y-2">
                {portLeds.map((ledState, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Número del puerto arriba/abajo dependiendo de la fila */}
                    {i < 12 && <span className="text-[7px] text-gray-500 mb-0.5">{i + 1}</span>}
                    
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#0a0a0c] border border-gray-600 rounded-sm relative flex justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,1)]">
                      <div className="w-2.5 h-1.5 sm:w-3 sm:h-2 bg-gray-800 absolute top-0 rounded-b-[1px]" />
                      
                      {/* Leds del puerto */}
                      <div className="absolute -top-1 sm:-top-1.5 left-0.5 flex gap-1">
                        <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${getLedStyle(ledState)}`} />
                      </div>
                    </div>

                    {i >= 12 && <span className="text-[7px] text-gray-500 mt-0.5">{i + 1}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* CONSOLA DE TEXTO (Superpuesta como un holograma o terminal) */}
            {phase !== 'idle' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-48 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-black/80 backdrop-blur-md border border-cyan-900/50 p-4 rounded-lg shadow-[0_0_30px_rgba(8,145,178,0.2)]"
              >
                <div className="flex gap-2 mb-2 border-b border-gray-800 pb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  <span className="text-[10px] text-gray-500 ml-2">COM3 - PuTTY (9600 baud)</span>
                </div>
                <div className="text-cyan-500 text-xs sm:text-sm leading-relaxed h-32 overflow-hidden flex flex-col justify-end">
                  {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                  <div className="animate-pulse">_</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* MENSAJE FINAL */}
        {phase === 'message' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center p-6 text-center z-50 bg-[#050505]"
          >
            <div>
              <h1 className="text-2xl sm:text-4xl text-gray-200 font-light tracking-wide max-w-4xl leading-relaxed mb-6 font-sans">
                "Todo lo que acabas de ver arrancar <br/>
                <span className="text-ok font-bold drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                  —enrutamiento de datos, servidores físicos, firewalls y monitorización—
                </span><br/>
                no se gestiona solo."
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BootRouter({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // idle, rack, network, message
  const [logs, setLogs] = useState([]);
  const [portLeds, setPortLeds] = useState(Array(24).fill('off'));
  const [sysLed, setSysLed] = useState('off');
  const [netPhase, setNetPhase] = useState(-1);
  const [netText, setNetText] = useState("");

  const startBoot = async () => {
    // Fase 1: Arranque del Rack
    setPhase('rack');
    setSysLed('amber');
    await sleep(800);
    setSysLed('amber-blink');
    setLogs(["[ BIOS ] Iniciando secuencia POST... OK"]);
    await sleep(1000);
    
    setLogs((p) => [...p, "[ BIOS ] Verificando interfaces físicas..."]);
    setPortLeds(Array(24).fill('amber'));
    await sleep(800);
    setPortLeds(Array(24).fill('green'));
    await sleep(500);
    setPortLeds(Array(24).fill('off'));
    
    setSysLed('green-blink');
    const bootSteps = [
      "Cisco IOS Software, C2960X Software",
      "Cargando memoria flash... OK",
      "Levantando interfaces GigabitEthernet... DONE"
    ];
    for (let step of bootSteps) {
      await sleep(600);
      setLogs((p) => [...p, step]);
    }
    setSysLed('green');
    await sleep(1000);

    // Fase 2: Viaje del paquete por la Red
    setPhase('network');
    await sleep(800);

    const nodesOut = [
      "El paquete inicia en el PC del usuario.",
      "El Switch Core aísla la VLAN.",
      "El Router BGP define la ruta óptima.",
      "El Firewall Perimetral inspecciona la conexión.",
      "El Servidor Físico recibe la solicitud web."
    ];

    // Animación de Ida (Naranja)
    for (let i = 0; i < nodesOut.length; i++) {
      setNetPhase(i);
      setNetText(nodesOut[i]);
      await sleep(1500);
    }

    setNetText("Procesando respuesta en el Servidor...");
    await sleep(1200);

    // Animación de Vuelta (Verde)
    setNetText("La respuesta vuelve por el mismo camino.");
    for (let i = nodesOut.length - 1; i >= 0; i--) {
      setNetPhase(i + 10); // Le sumamos 10 para que el código sepa que es el viaje de vuelta
      await sleep(1200);
    }

    await sleep(1000);
    
    // Fase 3: Mensaje Final
    setPhase('message');
    await sleep(5500);
    onComplete();
  };

  const getLedStyle = (state) => {
    switch (state) {
      case 'amber': return 'bg-yellow-500 shadow-[0_0_8px_#eab308]';
      case 'amber-blink': return 'bg-yellow-500 shadow-[0_0_8px_#eab308] animate-pulse';
      case 'green': return 'bg-green-500 shadow-[0_0_10px_#22c55e]';
      case 'green-blink': return 'bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse';
      default: return 'bg-gray-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]';
    }
  };

  const networkNodes = ['PC', 'Switch', 'Router', 'Firewall', 'Servidor'];

  return (
    <div className="fixed inset-0 z-[100] bg-[#020408] flex items-center justify-center font-mono overflow-hidden">
      <AnimatePresence mode="wait">
        
        {phase === 'idle' && (
          <motion.button
            key="btn"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={startBoot}
            className="absolute bottom-20 z-50 px-8 py-3 bg-gray-900 border border-green-500 text-green-500 rounded shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:bg-green-900/30 transition-all tracking-widest uppercase font-bold"
          >
            [ Iniciar Sistema ]
          </motion.button>
        )}

        {phase === 'rack' && (
          <motion.div
            key="rack"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 3, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-5xl px-12 sm:px-24"
          >
            {/* Chasis del Switch */}
            <div className="w-full h-32 sm:h-40 bg-gradient-to-b from-[#2a2f35] to-[#0f1115] rounded-sm border border-[#555] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center px-4 sm:px-6 relative">
              <div className="flex flex-col mr-6 w-24">
                <span className="font-sans text-[10px] sm:text-xs font-bold text-gray-300 tracking-wider">DIHENRRY_INFRA</span>
                <span className="font-sans text-[8px] text-green-500 mb-3">CATALYST CORE</span>
                <div className="flex items-center gap-2 text-[8px] text-gray-400">
                  <div className={`w-2 h-2 rounded-full ${getLedStyle(sysLed)}`} /> SYST
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-12 gap-x-1 sm:gap-x-2 gap-y-1 sm:gap-y-2">
                {portLeds.map((ledState, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#050608] border border-gray-700 rounded-sm relative flex justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,1)]">
                      <div className={`absolute top-1 w-1.5 h-1.5 rounded-full ${getLedStyle(ledState)}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Terminal Flotante */}
            <div className="absolute top-48 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-black/80 backdrop-blur-md border border-green-900/50 p-4 rounded shadow-[0_0_30px_rgba(34,197,94,0.1)]">
              <div className="text-green-500 text-xs sm:text-sm leading-relaxed h-32 flex flex-col justify-end">
                {logs.map((log, i) => <div key={i}>{log}</div>)}
                <div className="animate-pulse">_</div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#020408]"
          >
            <div className="text-green-500 text-lg sm:text-2xl mb-20 h-10 font-bold text-center drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
              {netText}
            </div>
            
            <div className="flex items-center justify-center w-full max-w-5xl relative mt-10">
              <div className="absolute left-10 right-10 h-1 bg-gray-800 z-0" />
              
              {networkNodes.map((node, i) => {
                const isActive = netPhase === i || netPhase === 10 + i;
                const isReturn = netPhase >= 10;
                
                return (
                  <div key={node} className="relative z-10 flex-1 flex flex-col items-center">
                    <motion.div 
                      animate={{ 
                        backgroundColor: isActive ? (isReturn ? '#22c55e' : '#f97316') : '#111827',
                        borderColor: isActive ? (isReturn ? '#22c55e' : '#f97316') : '#374151',
                        boxShadow: isActive ? (isReturn ? '0 0 30px #22c55e' : '0 0 30px #f97316') : 'none',
                        y: isActive ? -15 : 0
                      }}
                      className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg border-2 flex items-center justify-center mb-4 transition-colors duration-300"
                    >
                      {isActive && (
                        <div className="w-3 h-3 bg-white rounded-full animate-ping absolute" />
                      )}
                    </motion.div>
                    <span className={`text-[10px] sm:text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {node}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {phase === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center p-6 text-center z-50 bg-[#020408]"
          >
            <h1 className="text-xl sm:text-4xl text-gray-200 font-light tracking-wide max-w-4xl leading-relaxed font-sans">
              "Todo lo que acabas de ver arrancar <br/>
              <span className="text-green-500 font-bold drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                —enrutamiento de datos, servidores, firewalls y monitorización—
              </span><br/>
              no se gestiona solo."
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

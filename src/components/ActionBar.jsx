import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT } from '../data/content.js';

export default function ActionBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Evitar errores si los datos tardan en cargar
  if (!CONTACT) return null;

  const menuItems = [
    { 
      title: 'Cita / Meet', 
      href: CONTACT.cal || '#', 
      gradientFrom: '#80FF72', gradientTo: '#7EE8FA',
      icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    { 
      title: 'WhatsApp', 
      href: CONTACT.phone ? `https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}` : '#', 
      gradientFrom: '#25D366', gradientTo: '#128C7E',
      icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
    },
    { 
      title: 'Correo', 
      href: `mailto:${CONTACT.email}`, 
      gradientFrom: '#56CCF2', gradientTo: '#2F80ED',
      icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    { 
      title: 'LinkedIn', 
      href: CONTACT.linkedin || '#', 
      gradientFrom: '#0077b5', gradientTo: '#00a0dc',
      icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" /></svg>
    },
    { 
      title: 'GitHub', 
      href: CONTACT.github || '#', 
      gradientFrom: '#a955ff', gradientTo: '#ea51ff',
      icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
    },
    { 
      title: 'Ver CV', 
      href: CONTACT.cvES || '#', 
      gradientFrom: '#FF9966', gradientTo: '#FF5E62',
      icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    }
  ];

  // Las físicas exactas que usa Apple para sus interfaces
  const springPhysics = { type: "spring", stiffness: 400, damping: 25 };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex gap-2 sm:gap-3 p-2 bg-[#05080c]/80 backdrop-blur-md border border-gray-800 rounded-full shadow-2xl items-center">
        {menuItems.map((item, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <motion.li 
              key={idx}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative"
            >
              <motion.a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--gradient-from': item.gradientFrom, '--gradient-to': item.gradientTo }}
                className="relative flex items-center justify-center rounded-full bg-[#111820] border border-gray-800 overflow-hidden cursor-pointer"
                initial={false}
                // Aquí controlamos la expansión (de 50px a 140px)
                animate={{ width: isHovered ? 140 : 50, height: 50 }}
                transition={springPhysics}
              >
                {/* Fondo gradiente al pasar el ratón */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))]"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Resplandor externo (Blur glow) */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px]"
                  initial={false}
                  animate={{ opacity: isHovered ? 0.6 : 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* El icono desaparece con efecto elástico */}
                <motion.div
                  className="absolute z-10 flex items-center justify-center"
                  initial={false}
                  animate={{ 
                    scale: isHovered ? 0 : 1, 
                    color: isHovered ? "#ffffff" : "#9ca3af" 
                  }}
                  transition={springPhysics}
                >
                  {item.icon}
                </motion.div>

                {/* El texto aparece con efecto elástico */}
                <motion.span
                  className="absolute z-10 text-white font-bold tracking-widest text-[11px] uppercase whitespace-nowrap"
                  initial={false}
                  animate={{ 
                    scale: isHovered ? 1 : 0, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={springPhysics}
                >
                  {item.title}
                </motion.span>
              </motion.a>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

import { useEffect } from 'react';

export default function BootRouter({ onComplete }) {
  useEffect(() => {
    // Escucha el mensaje que envía el archivo 3D al hacer clic en el botón
    const handleMessage = (event) => {
      if (event.data === 'intro_done') {
        onComplete();
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <iframe 
        src="/intro.html" 
        className="w-full h-full border-none outline-none"
        title="Secuencia de Arranque 3D"
      />
    </div>
  );
}

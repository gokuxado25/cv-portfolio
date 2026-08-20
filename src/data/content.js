// ─────────────────────────────────────────────────────────────
//  Portfolio INFRAESTRUCTURA / SISTEMAS — contenido bilingüe (ES/EN)
//  Única fuente de verdad.
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  name: 'Dihenrry Barbaran Cotrina',
  email: 'Dihenrry2004@gmail.com',
  phone: '+34 624472455',
  phoneDisplay: '+34 624 472 455',
  location: 'Madrid, España',
  github: 'https://github.com/gokuxado25',
  linkedin: 'https://www.linkedin.com/in/dihenrry-barbaran-16607139a/',
  cal: 'https://calendar.app.google/m3bmKbGKDfSJzoDu6',
  web: 'https://dnbcotrina.wixsite.com/porfolio-dihenrry',
  cvES: '/CV-Dihenrry-ES.pdf',
  cvEN: '/CV-Dihenrry-ES.pdf',
};

// Panel de estado de sistemas (equivalente al feed de alertas del SOC).
// status: 'up' (operativo) | 'guard' (protegiendo) | 'watch' (monitorizando)
export const STATUS = [
  {
    id: 'SYS-NET', sev: 'up',
    es: { title: 'Redes y Routing · Cisco CCNA', src: 'Cisco, Planet, Sagemcom', state: 'OPERATIVO',
          detail: 'Configuración de equipos de red, switching y routing. Diseño de infraestructura y conectividad.' },
    en: { title: 'Networking & Routing · Cisco CCNA', src: 'Cisco, Planet, Sagemcom', state: 'OPERATIONAL',
          detail: 'Network equipment configuration, switching and routing. Infrastructure and connectivity design.' },
  },
  {
    id: 'SYS-HW', sev: 'up',
    es: { title: 'Hardware & Soporte Físico', src: 'Ensamblaje, reparación, microsoldadura', state: 'OPERATIVO',
          detail: 'Montaje de equipos, reparación a nivel componente, micro-soldadura y configuración avanzada (BIOS, Wake-on-LAN).' },
    en: { title: 'Hardware & Physical Support', src: 'Assembly, repair, micro-soldering', state: 'OPERATIONAL',
          detail: 'Custom PC building, component-level repair, micro-soldering and advanced configuration (BIOS, Wake-on-LAN).' },
  },
  {
    id: 'SYS-CCTV', sev: 'watch',
    es: { title: 'Sistemas CCTV y AV', src: 'Arecont Vision, instalaciones', state: 'MONITORIZANDO',
          detail: 'Diseño y configuración de circuitos cerrados de televisión, distribución de sonido y seguridad física.' },
    en: { title: 'CCTV & AV Systems', src: 'Arecont Vision, installations', state: 'WATCHING',
          detail: 'Design and configuration of closed-circuit television, sound distribution and physical security.' },
  },
  {
    id: 'SYS-AD', sev: 'up',
    es: { title: 'Sistemas · Active Directory', src: 'Usuarios, GPOs, Soporte', state: 'OPERATIVO',
          detail: 'Administración de dominio: usuarios, grupos y políticas. Soporte técnico directo al usuario final.' },
    en: { title: 'Systems · Active Directory', src: 'Users, GPOs, Support', state: 'OPERATIONAL',
          detail: 'Domain administration: users, groups and policies. Direct technical support to end-users.' },
  },
  {
    id: 'SYS-EDU', sev: 'guard',
    es: { title: 'Concienciación y Ciberseguridad', src: 'Cruz Roja · Voluntariado', state: 'PROTEGIENDO',
          detail: 'Diseño de talleres, gamificación y dinámicas sobre ciberseguridad, prevención y seguridad.' },
    en: { title: 'Awareness & Cybersecurity', src: 'Red Cross · Volunteering', state: 'GUARDING',
          detail: 'Design of workshops, gamification and dynamics on cybersecurity, prevention and safety.' },
  },
];

export const PROJECTS = [
  {
    repo: 'ZEROFAKE-App',
    url: 'https://sites.google.com/alu.escuni.es/zero-fails/inicio?authuser=0',
    stack: ['Ciberseguridad', 'Diseño Visual', 'Presentaciones'],
    es: {
      tag: 'Ciberseguridad · Concepto',
      desc: 'Conceptualización y creación de materiales visuales para la aplicación de ciberseguridad ZEROFAKE. Diseño de material promocional y presentaciones enfocadas en la seguridad del usuario.',
    },
    en: {
      tag: 'Cybersecurity · Concept',
      desc: 'Conceptualization and creation of materials visual for the ZEROFAKE cybersecurity application. Design of promotional material and presentations focused on user safety.',
    },
  },
  {
    repo: 'Portafolio-Wix',
    url: 'https://dnbcotrina.wixsite.com/porfolio-dihenrry/inicio',
    stack: ['Wix', 'Portafolio', 'Proyectos Previos'],
    es: {
      tag: 'Portafolio Web · Antiguo',
      desc: 'Recopilación de proyectos anteriores, prácticas y trabajos realizados durante mi formación en sistemas y telecomunicaciones.',
    },
    en: {
      tag: 'Web Portfolio · Legacy',
      desc: 'Collection of previous projects, internships, and work carried out during my training in systems and telecommunications.',
    },
  },
  {
    repo: 'Rosenholm-Castle-Infra',
    url: '#',
    stack: ['CCTV', 'Diseño 3D', 'Infraestructura', 'Audio'],
    es: {
      tag: 'Diseño de Infraestructura',
      desc: 'Diseño de instalaciones técnicas para la adaptación del Castillo de Rosenholm como espacio de eventos. Planificación de ubicación de cámaras CCTV, distribución de sonido e infraestructura de aparcamiento mediante modelado 3D.',
    },
    en: {
      tag: 'Infrastructure Design',
      desc: 'Design of technical installations for the adaptation of Rosenholm Castle as an event space. Planning of CCTV camera placement, sound distribution and parking infrastructure using 3D modeling.',
    },
  },
  {
    repo: 'CruzRoja-EduTech',
    url: '#',
    stack: ['Educación', 'Gamificación', 'Genially', 'Ciberseguridad'],
    es: {
      tag: 'Educación · Voluntariado',
      desc: 'Creación de juegos interactivos, quizzes y talleres prácticos para enseñar ciberseguridad, uso seguro de redes y primeros auxilios a jóvenes dentro del programa de Cruz Roja.',
    },
    en: {
      tag: 'Education · Volunteering',
      desc: 'Creation of interactive games, quizzes and practical workshops to teach cybersecurity, safe network usage and first aid to young people within the Red Cross program.',
    },
  },
];

export const SKILLS = [
  { es: 'Redes y Comunicaciones', en: 'Networking & Comms', items: ['Cisco', 'Routing', 'Switching', 'LAN/WAN', 'Configuración de Switches'] },
  { es: 'Sistemas', en: 'Systems', items: ['Active Directory', 'Windows', 'macOS', 'Soporte Técnico'] },
  { es: 'Hardware', en: 'Hardware', items: ['Ensamblaje PC', 'Reparación', 'Micro-soldadura', 'Mantenimiento'] },
  { es: 'Seguridad Física', en: 'Physical Security', items: ['CCTV', 'Arecont Vision', 'Instalaciones Técnicas'] },
  { es: 'Herramientas Digitales', en: 'Digital Tools', items: ['Genially', 'Modelado 3D (Básico)', 'Edición de vídeo'] },
];

export const CERTS = [
  { name: 'Cisco CCNA', state: 'done' },
  { name: 'FP Superior (STI) · Telecomunicaciones e Informática', state: 'done' },
];

export const T = {
  es: {
    role: 'Técnico de Telecomunicaciones e Informática',
    feedTitle: 'Estado de sistemas',
    feedSub: 'Monitorización en vivo',
    hookLabel: '// el perfil',
    hook:
      'Técnico superior en Sistemas de Telecomunicación e Informáticos con certificación Cisco CCNA. Combino la pasión por el hardware —desde el ensamblaje hasta la micro-soldadura— con la configuración de redes y sistemas. Me encanta entender cómo funcionan las cosas por dentro y compartir ese conocimiento.',
    sectionProjects: 'Proyectos y Trabajos',
    sectionProjectsSub: 'Teoría aplicada a la práctica',
    sectionExp: 'Trayectoria',
    sectionGoal: 'Hacia dónde voy',
    goalText:
      'Mi objetivo es seguir creciendo en el área de infraestructura de redes y ciberseguridad. Busco aplicar mis conocimientos de Cisco y sistemas en entornos empresariales, combinando mi perfil técnico con mis habilidades de comunicación adquiridas en el voluntariado.',
    sectionSkills: 'Stack técnico',
    sectionCerts: 'Formación y certificaciones',
    expItems: [
      {
        role: 'Técnico en Infraestructura y Sistemas (Prácticas)',
        org: 'Sector IT / Telecomunicaciones',
        period: '2026',
        desc: 'Administración básica de Active Directory, configuración de redes y soporte técnico directo a usuarios. Participación en el diseño, instalación y configuración de sistemas de videovigilancia (CCTV) e infraestructura de telecomunicaciones.',
      },
      {
        role: 'Voluntario de Juventud · Facilitador de Talleres',
        org: 'Cruz Roja',
        period: '2026 – act.',
        desc: 'Diseño y facilitación de talleres educativos para jóvenes. Creación de contenido interactivo (gamificación) centrado en ciberseguridad, uso responsable de la tecnología, participación juvenil y primeros auxilios.',
      }
    ],
    save: 'Guardar contacto',
    schedule: 'Contactar',
    cv: 'Descargar CV',
    statusReady: 'todos los sistemas operativos',
  },
  en: {
    role: 'Telecommunications & IT Technician',
    feedTitle: 'Systems status',
    feedSub: 'Live monitoring',
    hookLabel: '// the profile',
    hook:
      'Higher Technician in Telecommunications and IT Systems with Cisco CCNA certification. I combine a passion for hardware—from assembly to micro-soldering—with network and systems configuration. I love understanding how things work on the inside and sharing that knowledge.',
    sectionProjects: 'Projects & Work',
    sectionProjectsSub: 'Theory applied to practice',
    sectionExp: 'Track record',
    sectionGoal: 'Where I am heading',
    goalText:
      'My goal is to continue growing in the area of network infrastructure and cybersecurity. I am looking to apply my Cisco and systems knowledge in corporate environments, combining my technical profile with the communication skills acquired through volunteering.',
    sectionSkills: 'Tech stack',
    sectionCerts: 'Training & certifications',
    expItems: [
      {
        role: 'IT & Infrastructure Technician (Internship)',
        org: 'IT / Telecom Sector',
        period: '2026',
        desc: 'Basic Active Directory administration, network configuration and direct technical support to users. Participation in the design, installation and configuration of video surveillance systems (CCTV) and telecommunications infrastructure.',
      },
      {
        role: 'Youth Volunteer · Workshop Facilitator',
        org: 'Red Cross',
        period: '2026 – present',
        desc: 'Design and facilitation of educational workshops for young people. Creation of interactive content (gamification) focused on cybersecurity, responsible use of technology, youth participation and first aid.',
      }
    ],
    save: 'Save contact',
    schedule: 'Contact',
    cv: 'Download CV',
    statusReady: 'all systems operational',
  },
};

export const STATE_LABEL = {
  up: { es: 'OPERATIVO', en: 'OPERATIONAL', color: 'ok' },
  guard: { es: 'PROTEGIENDO', en: 'GUARDING', color: 'info' },
  watch: { es: 'MONITORIZANDO', en: 'WATCHING', color: 'watching' },
};

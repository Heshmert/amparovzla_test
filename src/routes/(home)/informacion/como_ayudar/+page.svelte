<!-- ─── SNIPPET SVELTE 5: TARJETA DE PERFIL INTERNO ─── -->
{#snippet perfilCard(rol, titulo, descripcion)}
    <div class="p-8 bg-white border border-stone-200 rounded-none hover:border-blue-700 transition-colors group">
        <span class="text-[10px] font-black text-blue-700 uppercase mb-4 block tracking-widest group-hover:text-stone-900 transition-colors">
            {rol}
        </span>
        <h3 class="text-sm font-black text-slate-900 uppercase mb-3 tracking-tight">
            {titulo}
        </h3>
        <p class="text-xs text-stone-600 leading-relaxed">
            {descripcion}
        </p>
    </div>
{/snippet}


<!-- ─── HERO: LA PROMESA DE AYUDA ─── -->
<section id="hero" class="relative w-full min-h-[60vh] flex items-center py-20 bg-stone-900 overflow-hidden border-b border-stone-800 rounded-none">
    <!-- Fondo decorativo -->
    <div class="absolute inset-0 bg-[url('/hero.avif')] opacity-10 bg-cover bg-center"></div>
    
    <!-- Contenido -->
    <div class="relative z-10 px-6 md:px-20 max-w-4xl w-full">
        <span class="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4 block">
            Red de Colaboración
        </span>
        
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-6">
            Cada talento<br class="hidden md:block"/> suma una solución
        </h1>
        
        <p class="text-xs md:text-sm text-stone-400 font-medium leading-relaxed max-w-2xl">
            Para salir adelante necesitamos que cada quien ponga lo que sabe hacer sobre la mesa. No buscamos solo manos vacías; queremos organizar lo que mejor sabe hacer cada uno para ayudar de verdad en las comunidades. Mira cómo tu oficio o profesión puede ser el motor que levante a un sector.
        </p>
    </div>
</section>


<!-- ─── SECCIÓN: PERFILES DE ACCIÓN ─── -->
<section class="px-6 md:px-20 py-16 bg-stone-50 rounded-none">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {@render perfilCard(
            "Artistas",
            "Acompañamiento y Aliento",
            "Músicos, pintores, diseñadores o muralistas. El arte acompaña el alma cuando las cosas se ponen difíciles. Nos ayudan a llevar ánimo a los espacios comunitarios, pintar carteles claros que informen a los vecinos y dejar un registro bonito de cómo nos apoyamos entre todos."
        )}

        {@render perfilCard(
            "Ingenieros",
            "Trabajo Práctico y Seguro",
            "Gente que sepa de construcción, electricidad, redes o soporte técnico. Su conocimiento nos ayuda a revisar que un lugar sea seguro antes de usarlo como acopio, armar rutas lógicas de distribución y resolver problemas prácticos en el terreno para evitar accidentes."
        )}

        {@render perfilCard(
            "Administradores",
            "Cuentas Claras e Inventarios",
            "Personas ordenadas para llevar números. El orden lo es todo para que la ayuda funcione y no se pierda nada. Nos ayudan a contar cada caja que llega, saber qué hace falta en cada sector y asegurar que todo se entregue con total transparencia a los vecinos."
        )}

        {@render perfilCard(
            "Abogados",
            "Orientación y Resguardo",
            "Profesionales del derecho que nos guíen. Nos ayudan a proteger los datos personales de la gente que se registra en el censo, dar asesoría básica a las familias que lo han perdido todo y cuidar que cada centro comunitario trabaje bajo reglas seguras."
        )}

        {@render perfilCard(
            "Personal de Salud",
            "Cuidado de la Vida",
            "Médicos, enfermeros, paramédicos o estudiantes de salud. Son la primera línea en el terreno. Nos ayudan a revisar a los vecinos que llegan cansados o heridos, organizar las medicinas donadas y atender cualquier emergencia o consulta básica de inmediato."
        )}

        {@render perfilCard(
            "Desarrolladores",
            "Soporte y Herramientas Digitales",
            "Programadores y técnicos. La tecnología nos permite llegar a miles de personas sin desorganizarnos. Si sabes de código, nos das una mano enorme manteniendo AmparoVZLA en pie para que el mapa de los centros de acopio y el censo civil nunca fallen."
        )}

        {@render perfilCard(
            "Diseño y Prensa",
            "Información Real para la Gente",
            "Comunicadores, fotógrafos y diseñadores visuales. Nos ayudan a contar la verdad de lo que pasa en las comunidades, armar avisos sencillos que se entiendan rápido en redes sociales o volantes impresos, y orientar a la gente sobre dónde buscar auxilio."
        )}

    </div>
</section>
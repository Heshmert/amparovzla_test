<!-- ─── RECURSOS REUTILIZABLES (SNIPPETS SVELTE 5) ─── -->
{#snippet pilarCard(numero, categoria, titulo, descripcion)}
    <div class="bg-white p-8 border border-stone-200 hover:border-blue-600 transition-colors rounded-none">
        <span class="block text-[10px] font-black text-blue-700 uppercase mb-4 tracking-widest">{numero}. {categoria}</span>
        <h3 class="text-sm font-black text-slate-900 uppercase mb-3">{titulo}</h3>
        <p class="text-xs text-stone-600 leading-relaxed">{descripcion}</p>
    </div>
{/snippet}

{#snippet moduloProgreso(titulo, descripcion)}
    <div class="p-6 border border-stone-200 bg-stone-50/50 rounded-none">
        <span class="block text-[9px] font-black text-amber-600 uppercase mb-2">En proceso</span>
        <h4 class="text-sm font-black text-slate-900 uppercase mb-1">{titulo}</h4>
        <p class="text-[10px] text-stone-500 leading-relaxed">{descripcion}</p>
    </div>
{/snippet}


<!-- ─── HERO: LA PROMESA (ÍNTEGRO) ─── -->
<section id="hero" class="relative w-full min-h-screen flex items-center overflow-hidden border-b border-stone-200">
    <!-- IMAGEN DE FONDO CON ENTINTADO -->
    <div class="absolute inset-0 bg-[url('/img/hero_info.jpg')] bg-cover bg-center"></div>

    <div class="absolute inset-0 bg-blue-950/60"></div>
    <!-- CONTENIDO -->
    <div class="relative z-10 px-6 md:px-20 w-full max-w-6xl">
        <div class="max-w-4xl space-y-8">
            <h1 class="text-5xl md:text-[80px] font-black text-white tracking-tighter uppercase leading-[0.9]">
                Unidos por la<br/>
                <span class="text-amber-400">Ayuda Humana</span>
            </h1>

            <p class="text-sm md:text-lg text-stone-100 font-medium leading-relaxed max-w-2xl">
                AmparoVZLA es nuestra promisa, una herramienta técnica, abierta y sin fines de lucro, diseñada para garantizar que cada esfuerzo logístico, cada insumo y cada mano amiga llegue exactamente donde hace falta para proteger la vida y la dignidad en nuestra nación.
            </p>

        </div>
    </div>
</section>


<!-- ─── PILARES DE TRABAJO (TEXTOS OPTIMIZADOS) ─── -->
<section class="py-16 px-6 md:px-20 bg-stone-50 border-b border-stone-200">
    <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {@render pilarCard(
                "01", 
                "Logística", 
                "Recursos e insumos", 
                "No es solo anotar cajas en un almacén. Llevamos el control desde que las cosas llegan para que los centros de apoyo y los vecinos sepan con qué se cuenta de verdad, sin enredos."
            )}
            
            {@render pilarCard(
                "02", 
                "Voluntariado", 
                "Personas que ayudan", 
                "Sumamos las manos y las ganas de nuestra gente. Organizamos las tareas según lo que cada quien sabe hacer mejor para avanzar rápido en los acopios y evitar perder el tiempo."
            )}
            
            {@render pilarCard(
                "03", 
                "Información", 
                "Centros Verificados", 
                "Aquí solo vas a ver lugares de ayuda que ya confirmamos en el terreno que están abiertos y funcionando. Información real para que nadie pierda el viaje."
            )}
        </div>
    </div>
</section>


<!-- ─── NUEVA SECCIÓN: CÓMO AYUDAR ─── -->
<section class="py-16 px-6 md:px-20 bg-white border-b border-stone-200">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div class="md:col-span-8 space-y-3">
            <span class="text-[10px] font-black text-blue-700 uppercase tracking-widest block">Acción Colectiva</span>
            <h2 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">Aquí nadie sobra, cada mano cuenta</h2>
            <p class="text-xs text-stone-600 leading-relaxed max-w-2xl">
                No importa si tienes un carro o una moto para mover cajas, si sabes de cocina, medicina u organización, o si simplemente tienes un par de horas libres a la semana. El trabajo en las comunidades es mucho y cualquier ayuda, por pequeña que parezca, le cambia el día a una familia entera.
            </p>
        </div>
        <div class="md:col-span-4 md:text-right">
            <a href="informacion/como_ayudar" class="inline-block bg-stone-900 text-white font-bold uppercase text-xs px-6 py-4 tracking-widest rounded-none hover:bg-stone-800 transition-all">
                Ver cómo colaborar
            </a>
        </div>
    </div>
</section>


<!-- ─── CENSO DE PERSONAS (ÍNTEGRO) ─── -->
<section class="bg-slate-900 text-white p-10 md:p-20 border-l-8 border-amber-500 shadow-2xl">
    <div class="max-w-4xl">
        <div class="flex items-center gap-4 mb-6">
           <h2 class="text-lg font-black uppercase text-amber-500 tracking-widest">Nuestra Red de Seguridad</h2>
        </div>

        <h1 class="text-3xl md:text-5xl font-black uppercase mb-8 text-white tracking-tighter leading-none">
            Censo de Personas: <br/>Nadie se queda atrás
        </h1>

        <p class="text-xs md:text-sm text-stone-300 leading-relaxed mb-10 max-w-2xl">
            La información oportuna es el primer paso hacia la calma. Our censo no es solo un registro; es el corazón de nuestra red de protección. Al centralizar reportes de estatus y ubicaciones, transformamos el miedo en orden. Registrarse es un acto de solidaridad que permite a nuestras brigadas optimizar la búsqueda y asegurar que la ayuda llegue donde la familia la necesita.
        </p>

        <div class="flex flex-wrap gap-4">
            <a href="/buscame#registrar" class="bg-amber-500 text-slate-900 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all">
                Registrar
            </a>
            <a href="/buscame#personas" class="border border-white/20 text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Buscar
            </a>
        </div>
    </div>
</section>


<!-- ─── DESARROLLO Y MAPA DE RUTA (TEXTOS OPTIMIZADOS) ─── -->
<section class="py-20 px-6 md:px-20 bg-white border-t border-stone-100">
    <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-12 gap-12">

            <!-- Columna de Contexto Humano -->
            <div class="lg:col-span-5 space-y-6">
                <h3 class="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                    Haciendo las cosas bien,<br/>aunque todo corra
                </h3>
                <p class="text-xs text-stone-600 leading-relaxed">
                    Sabemos perfectamente que en la urgencia todo hace falta para ayer. Por eso mismo, nos tomamos el desarrollo muy en serio: para asegurar que la plataforma no se caiga ni falle cuando la gente más la necesite. Cada módulo que agregamos nace de lo que vemos que hace falta resolver de verdad en el día a día en nuestras comunidades.
                </p>
                <p class="text-xs text-stone-500 italic">
                    Gracias por la paciencia. Trabajamos a diario para que cada funcionalidad nueva multiplique lo que podemos hacer juntos en el terreno.
                </p>
            </div>

            <!-- Módulos de Desarrollo usando Snippets -->
            <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {@render moduloProgreso(
                    "Rescate Animal", 
                    "Para ubicar zonas en riesgo y coordinar atención médica y refugio para los animales que también nos necesitan."
                )}

                {@render moduloProgreso(
                    "Logística de Transporte", 
                    "Para organizar los carros, motos y camiones de los vecinos, moviendo la ayuda rápido entre parroquias."
                )}

                {@render moduloProgreso(
                    "Gestión de Refugios", 
                    "Control sencillo de los espacios comunitarios disponibles, qué familias están allí y qué insumos urgentes les faltan."
                )}

                {@render moduloProgreso(
                    "Brigadas de Rescate", 
                    "Para organizar a los equipos que dan respuesta en el terreno y saber exactamente en qué punto están trabajando."
                )}

                {@render moduloProgreso(
                    "Centros de Salud", 
                    "Mapeo de los centros médicos y ambulatorios activos, sus necesidades críticas y la situación de los pacientes."
                )}
            </div>
        </div>
    </div>
</section>
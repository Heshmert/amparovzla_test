<script>
    // Componente Svelte 5 para la página informativa de AMPARO

  import Hero from "$lib/components/Hero.svelte";

</script>

{#snippet pilarCard(numero, categoria, titulo, descripcion)}
    <div class="bg-white p-8 border-2 border-stone-200 hover:border-stone-900 transition-colors rounded-none flex flex-col justify-between h-full group">
        <div class="space-y-4">
            <span class="block text-[10px] font-black text-blue-700 uppercase tracking-widest font-mono">
                {numero} // {categoria}
            </span>
            <h3 class="text-sm font-black text-stone-900 uppercase tracking-tight group-hover:text-blue-700 transition-colors">
                {titulo}
            </h3>
            <p class="text-xs text-stone-600 leading-relaxed font-mono uppercase text-[11px]">
                {descripcion}
            </p>
        </div>
    </div>
{/snippet}

{#snippet pilarProgreso(titulo, descripcion)}
    <div class="p-6 border border-stone-200 bg-stone-50 rounded-none flex flex-col justify-between hover:border-stone-900 transition-colors">
        <div class="space-y-2">
            <span class="inline-block text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 uppercase tracking-wider font-mono">
                Se está armando
            </span>
            <h4 class="text-xs font-black text-stone-900 uppercase">{titulo}</h4>
            <p class="text-[10px] text-stone-600 leading-relaxed font-mono uppercase text-[11px]">{descripcion}</p>
        </div>
    </div>
{/snippet}


<Hero 
    titulo="Unidos por la"
    palabraResaltante="ayuda vecinal"
    descripcion="AmparoVZLA es nuestro compromiso: un esfuerzo de vecinos, transparente y sin ganar un centavo, pensado para que la comida, las medicinas y el transporte lleguen directo a las familias que más lo necesitan en momentos difíciles."
    tag="Quiénes somos"
    imagen="/img/hero_informacion.webp"
    claseTextoResaltado="text-red-500"
    claseTag="bg-amber-500 text-stone-950 font-black"
    claseBordeDesc="border-red-500"
/>


<section class="py-20 px-6 md:px-20 bg-stone-100 border-b border-stone-200">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <div class="border-b-4 border-stone-900 pb-2 flex justify-between items-end">
            <span class="text-[11px] font-black text-stone-900 uppercase tracking-widest font-mono">En qué trabajamos</span>
            <span class="text-[9px] font-mono text-stone-400 uppercase">Tres pilares clave</span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {@render pilarCard(
                "01", 
                "Control y transparencia", 
                "Cuentas claras con lo que llega", 
                "No anotamos cajas para guardarlas. Sabemos qué entra y qué sale para que los vecinos y los centros de acopio organicen la ayuda real, sin pérdidas."
            )}
            
            {@render pilarCard(
                "02", 
                "Organización local", 
                "Gente dispuesta a dar una mano", 
                "Sumamos las ganas de colaborar de cada persona. Nos organizamos según lo que cada quien sabe hacer bien para avanzar sin perder el tiempo."
            )}
            
            {@render pilarCard(
                "03", 
                "Verificación real", 
                "Saber que la ayuda está activa", 
                "Aquí solo mostramos los puntos de acopio y centros que nosotros mismos o los vecinos de la cuadra confirman que están abiertos y funcionando."
            )}
        </div>
    </div>
</section>


<section class="py-20 px-6 md:px-20 bg-stone-50 border-b border-stone-200">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-6 space-y-6">
            <span class="text-[10px] font-black text-white bg-blue-700 px-3 py-1 uppercase inline-block tracking-widest font-mono rounded-none">
                El sentido de esto
            </span>
            <h2 class="text-4xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter leading-none">
                Hecho por vecinos, para vecinos.
            </h2>
            <p class="text-xs text-stone-700 leading-relaxed font-sans max-w-lg">
                Este proyecto no pertenece a ninguna oficina lejana ni tiene intereses escondidos. Nace en las calles de nuestras parroquias. La idea es sencilla: si un vecino tiene comida para compartir, y otro tiene una moto para moverla, nosotros ponemos el canal directo para que se encuentren. 
            </p>
            <div class="border-l-4 border-blue-700 pl-4 py-1 italic text-xs text-stone-600 font-mono uppercase">
                "Cuidarnos entre nosotros es la mejor forma de salir adelante."
            </div>
        </div>

        <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-8 bg-white border-2 border-stone-900 rounded-none space-y-3">
                <div class="w-6 h-6 bg-amber-400 flex items-center justify-center font-mono text-xs font-black text-stone-900 rounded-none">1</div>
                <h3 class="text-xs font-black uppercase text-stone-900 tracking-tight">Sin intermediarios</h3>
                <p class="text-[10px] text-stone-600 font-mono uppercase leading-relaxed">
                    Las donaciones van directo de la mano que las ofrece al centro o la familia que las necesita.
                </p>
            </div>
            <div class="p-8 bg-stone-900 text-white rounded-none space-y-3">
                <div class="w-6 h-6 bg-blue-700 flex items-center justify-center font-mono text-xs font-black text-white rounded-none">2</div>
                <h3 class="text-xs font-black uppercase text-amber-400 tracking-tight">Cero misterios</h3>
                <p class="text-[10px] text-stone-300 font-mono uppercase leading-relaxed">
                    Cualquiera puede revisar qué hace falta y qué se ha entregado en cada punto. Confianza total.
                </p>
            </div>
        </div>

    </div>
</section>


<section class="py-20 px-6 md:px-20 bg-white border-b border-stone-200">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50 border-2 border-stone-900 p-8 md:p-12 rounded-none shadow-xs">
        <div class="lg:col-span-8 space-y-4">
            <span class="text-[10px] font-black text-blue-700 uppercase tracking-widest block font-mono">AYUDA COMUNITARIA</span>
            <h2 class="text-3xl md:text-4xl font-black text-stone-900 uppercase tracking-tighter leading-none">Aquí nadie sobra, cada mano cuenta</h2>
            <p class="text-xs text-stone-700 leading-relaxed max-w-2xl">
                No importa si tienes un carro o una moto para mover cajas, si sabes de cocina, medicina u organización, o si simplemente tienes un par de horas libres a la semana. El trabajo en las comunidades es mucho y cualquier ayuda, por pequeña que parezca, le cambia el día a una familia entera.
            </p>
        </div>
        <div class="lg:col-span-4 lg:text-right">
            <a href="informacion/como_ayudar" class="inline-block bg-blue-700 text-white font-black uppercase text-[10px] px-8 py-4 tracking-widest rounded-none hover:bg-stone-900 transition-all border border-transparent hover:border-stone-900 w-full text-center lg:w-auto">
                Quiero colaborar
            </a>
        </div>
    </div>
</section>


<section class="bg-stone-950 text-white p-8 md:p-20 border-l-8 border-amber-500 rounded-none relative overflow-hidden">
    <div class="max-w-4xl space-y-8 relative z-10">
        <div class="flex items-center gap-4">
            <h2 class="text-xs font-black uppercase text-amber-400 tracking-widest font-mono">Nuestra Red de Seguridad</h2>
        </div>

        <h2 class="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none">
            Censo de Personas: <br class="hidden md:inline"/>Nadie se queda atrás
        </h2>

        <p class="text-xs md:text-sm text-stone-300 leading-relaxed max-w-2xl font-mono uppercase text-[11px]">
            Saber quiénes somos y dónde estamos nos da tranquilidad a todos. Este censo no es un control frío en papel; es el corazón de nuestra organización. Al registrar la situación y el lugar de cada vecino, ayudamos a que las brigadas de apoyo sepan a dónde ir y qué llevar exactamente. Registrarse o buscar a un ser querido es cuidarnos la espalda entre todos.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="/buscame#registrar" class="bg-amber-400 text-stone-950 px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-stone-950 transition-all rounded-none text-center">
                Registrar Vecino
            </a>
            <a href="/buscame#personas" class="border border-white/20 text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all rounded-none text-center">
                Buscar Vecino
            </a>
        </div>
    </div>
</section>


<section class="py-20 px-6 md:px-20 bg-stone-100 border-t border-stone-200">
    <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-12 gap-12 items-start">

            <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                <span class="text-[10px] font-black text-white bg-stone-900 px-3 py-1 uppercase inline-block tracking-widest font-mono rounded-none">
                    Cosas en camino
                </span>
                <h3 class="text-4xl md:text-5xl font-black text-stone-900 uppercase tracking-tighter leading-none">
                    Haciendo las cosas bien, aunque todo corra
                </h3>
                <p class="text-xs text-stone-600 leading-relaxed font-sans">
                    Sabemos perfectamente que en la urgencia todo hace falta para ayer. Por eso mismo, nos tomamos el trabajo técnico muy en serio: para asegurar que esta herramienta no se caiga ni falle cuando la gente más la necesite. Cada nueva ayuda que diseñamos nace de lo que vemos que hace falta resolver en el día a día en nuestras comunidades.
                </p>
                <p class="text-xs text-stone-500 italic font-mono uppercase text-[11px]">
                    Gracias por la paciencia. Trabajamos a diario para que cada herramienta nueva multiplique lo que podemos lograr juntos en el terreno.
                </p>
            </div>

            <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {@render pilarProgreso(
                    "Apoyo y Refugio Animal", 
                    "Para saber qué zonas están en riesgo y organizar el cuidado, la medicina y el cobijo de los animales que también nos necesitan."
                )}

                {@render pilarProgreso(
                    "Organizar Carros y Motos", 
                    "Para coordinar de forma limpia a los vecinos que tienen transporte, moviendo la comida y las medicinas de forma rápida y segura."
                )}

                {@render pilarProgreso(
                    "Casas de Abrigo y Refugio", 
                    "Un registro sencillo para saber qué espacios comunitarios están activos, qué familias están allí y qué insumos les faltan con urgencia."
                )}

                {@render pilarProgreso(
                    "Equipos de Apoyo en Calle", 
                    "Para organizar a las personas que se mueven en el terreno, distribuyendo las tareas y sabiendo en qué punto está trabajando cada quien."
                )}

                {@render pilarProgreso(
                    "Ambulatorios y Salud", 
                    "Un mapa directo de los centros de salud y ambulatorios activos, sus necesidades críticas y cómo podemos arrimar el hombro."
                )}
            </div>
        </div>
    </div>
</section>
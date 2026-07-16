<script>
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
            <p class="text-[10px] text-c text-stone-600 leading-relaxed font-mono uppercase text-[11px]">{descripcion}</p>
        </div>
    </div>
{/snippet}


<Hero 
    titulo="Unidos por la"
    palabraResaltante="ayuda humana"
    descripcion="Nuestro compromiso: un esfuerzo de solemne, transparente y sin ganar un centavo, pensado para que la comida, las medicinas y la ayuda lleguen directo a las familias que más lo necesitan en momentos difíciles."
    tag="Quiénes somos"
    imagen="/img/hero_informacion.webp"
    claseTextoResaltado="text-cyan-500"
    claseTag="bg-emerald-500 text-stone-950 font-black"
    claseBordeDesc="border-emerald-500"
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
                "No anotamos cajas para guardarlas. Sabemos qué entra y qué sale para que los centros de acopio organicen la ayuda de manera eficiente"
            )}
            
            {@render pilarCard(
                "02", 
                "Talentos", 
                "Gente dispuesta a dar una mano", 
                "Sumamos las ganas de colaborar de cada persona. Nos organizamos según lo que cada quien sabe hacer bien para avanzar sin perder el tiempo."
            )}
            
            {@render pilarCard(
                "03", 
                "Verificación real", 
                "Saber que la ayuda está activa", 
                "Aquí solo mostramos los puntos de acopio y centros que nuestro equipo se ha encargado de verificar, para que tengas seguridad de que la ayuda es real."
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
                Hecho por nosotros, para todos.
            </h2>
            <p class="text-xs text-stone-700 leading-relaxed font-sans max-w-lg">
                Este proyecto no pertenece a ninguna oficina lejana ni tiene intereses escondidos. Nace por el deseo de ayudar. La idea es sencilla: si un persona tiene algo para compartir, y hay un centro que pueda facilitar su gestion uso o envio, nosotros ponemos el canal directo para que se encuentren. 
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
                    Las donaciones van directo de la mano que las ofrece al centro de acopio que las gestiona.
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
            <a href="informacion/talentos" class="bg-blue-700 text-white font-black uppercase text-xs px-8 py-4 tracking-widest rounded-none hover:bg-stone-900 transition-all border border-transparent hover:border-stone-900 w-full text-center lg:w-auto flex justify-center items-center gap-3">
                Quiero colaborar <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-handshake-icon lucide-handshake"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>
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
            <a href="/buscame" class="bg-amber-400 text-stone-950 px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-stone-950 transition-all rounded-none text-center">
                Registrar Vecino
            </a>
            <a href="/buscame" class="border border-white/20 text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all rounded-none text-center flex justify-center items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg> Buscar Vecino
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
                    Gracias por la paciencia. Trabajamos a diario para que cada herramienta nueva multiplique lo que podemos lograr juntos.
                </p>
            </div>

            <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {@render pilarProgreso(
                    "Apoyo y Refugio Animal", 
                    "Para ubicar a las mascotas y animales que quedaron desprotegidos, organizando atención médica y lugares seguros donde puedan quedarse."
                )}

                {@render pilarProgreso(
                    "Salud Mental y Escucha", 
                    "Para conectar a psicólogos voluntarios con las personas que necesitan desahogarse, recibir apoyo emocional o calmar los nervios en momentos duros."
                )}

                {@render pilarProgreso(
                    "Casas de Abrigo y Refugios", 
                    "Un control claro de los espacios solidarios activos, cuántas familias caben en ellos y qué cobijas, ropa o insumos les faltan con urgencia."
                )}

                {@render pilarProgreso(
                    "Comida Comunitarias", 
                    "Para organizar los centros que reparten alimentos, saber dónde hacen falta platos calientes y canalizar las donaciones directo a las familias."
                )}
            </div>
        </div>
    </div>
</section>
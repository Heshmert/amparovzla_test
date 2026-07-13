<script>
    // ─── LÓGICA DEL CARRUSEL DE ENFOQUES ACTUALES ───
    let slideActivo = $state(0);
    let deTocado = $state(false); // Controla la pausa en hover o focus
    
    const enfoques = [
        {
            etiqueta: "CUIDAR NUESTRAS PLAYAS",
            titulo: "STOP A LOS ESCOMBROS EN EL MAR",
            desc: "Queremos frenar por completo el bote de desechos y escombros en nuestras costas. Cuidar nuestro mar es tarea de todos hoy mismo.",
            bg: "bg-emerald-900",
            texto: "text-emerald-100"
        },
        {
            etiqueta: "CUIDAR A LOS MÁS PEQUEÑOS",
            titulo: "LOS NIÑOS SON LA PRIORIDAD",
            desc: "Nos estamos asegurando de que la comida, la atención y la ropa limpia lleguen primero a los niños que están en los refugios.",
            bg: "bg-amber-600",
            texto: "text-amber-50"
        },
        {
            etiqueta: "APOYO CONTINUO",
            titulo: "ACOMPAÑAR A QUIENES PERDIERON TODO",
            desc: "Seguimos llevando almuerzos, ropa seca y un espacio seguro para dormir a todas las familias que tuvimos que evacuar de las zonas de riesgo.",
            bg: "bg-blue-800",
            texto: "text-blue-50"
        },
        {
            etiqueta: "DONACIONES ACTIVAS",
            titulo: "LA AYUDA NO PUEDE PARAR EN LOS CENTROS",
            desc: "Los puntos de acopio siguen abiertos esperando lo que puedas compartir. Cada kilo de comida o medicina cuenta para sostener a los vecinos.",
            bg: "bg-red-700",
            texto: "text-red-50"
        }
    ];

    // Rotación cada 8 segundos, se detiene si hay hover o focus
    $effect(() => {
        const intervalo = setInterval(() => {
            if (!deTocado) {
                slideActivo = (slideActivo + 1) % enfoques.length;
            }
        }, 8000);
        return () => clearInterval(intervalo);
    });
</script>

<!-- ─── RECURSOS REUTILIZABLES (SNIPPETS SVELTE 5) ─── -->
{#snippet moduloCard(numero, titulo, descripcion, esProximamente = false)}
    <div class="p-8 border-2 flex flex-col justify-between transition-all rounded-none h-full 
        {esProximamente ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-200 hover:border-stone-900'}"
    >
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <span class="text-4xl font-black font-mono {esProximamente ? 'text-stone-700' : 'text-stone-200'}">{numero}</span>
                {#if esProximamente}
                    <span class="text-[9px] font-black uppercase text-stone-900 bg-amber-400 px-2 py-0.5 tracking-wider font-mono">Muy Pronto</span>
                {/if}
            </div>
            <h3 class="text-xs font-black uppercase tracking-tight {esProximamente ? 'text-amber-400' : 'text-stone-900'}">{titulo}</h3>
            <p class="text-xs leading-relaxed font-mono uppercase text-[11px] {esProximamente ? 'text-stone-400' : 'text-stone-600'}">{descripcion}</p>
        </div>
    </div>
{/snippet}


<!-- ─── NO TOCAR: SECCIÓN HERO EXACTAMENTE IGUAL ─── -->
<section id="hero" class="relative w-full min-h-screen overflow-hidden inset-0 bg-[url('/img/hero_index.webp')] bg-cover bg-center">

    <!-- CONTENIDO -->
    <div class="relative z-10 px-4 py-16 md:py-32 flex flex-col justify-center items-center text-center">
        <h1 class="flex flex-col gap-2 w-full max-w-4xl items-center">
            
            <!-- TÍTULO: Uso de 'vw' en móvil para que siempre ocupe el máximo ancho posible sin romperse -->
            <span class="text-[16vw] sm:text-[120px] md:text-[160px] font-black text-white leading-[0.8] tracking-tighter uppercase drop-shadow-lg">
                AMPARO
            </span>

            <!-- FRANJAS: Ancho restringido al 75% en móvil para que nunca superen el ancho del título -->
            <div class="flex flex-col md:flex-row w-[75%] sm:w-[60%] md:w-full md:max-w-lg mx-auto text-white font-black uppercase tracking-[0.2em] mt-6 md:mt-8 gap-y-1 md:gap-y-0 md:gap-x-0.5">
                <div class="flex-1 bg-amber-500 py-2 md:py-3 text-[9px] md:text-[10px] flex items-center justify-center">
                    Unidad
                </div>
                <div class="flex-1 bg-blue-700 py-2 md:py-3 text-[9px] md:text-[10px] flex items-center justify-center">
                    Acción
                </div>
                <div class="flex-1 bg-red-700 py-2 md:py-3 text-[9px] md:text-[10px] flex items-center justify-center">
                    Respuesta
                </div>
            </div>

            <!-- BOTONES: Colores de la bandera (amigables), integrados al estilo -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-[85%] sm:w-auto">
                <!-- Botón Secundario (Borde y Letras Amarillas, Fondo Nulo) -->
                <a href="/buscame" class="border border-amber-400 text-amber-400 bg-transparent px-8 py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 hover:text-slate-900 transition">
                    Búscame
                </a>
                
                <!-- Botón Primario (Azul) -->
                <a href="/ingresar" class="bg-blue-700 text-white px-8 py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition">
                    Ingresar al Sistema
                </a>
            </div>
        </h1>
        
        <!-- SUBTÍTULO -->
        <p class="text-stone-200 mt-12 max-w-sm text-[10px] font-bold uppercase tracking-widest px-4 leading-relaxed">
            Plataforma autónoma para la gestión y organización de ayuda civil en Venezuela.
        </p>
    </div>
</section>
<!-- ─── FIN DE SECCIÓN HERO ─── -->


<!-- ─── SECCIÓN: BANNER CARRUSEL CON PAUSA AUTOMÁTICA EN HOVER/FOCUS ─── -->
<section 
    onmouseenter={() => deTocado = true}
    onmouseleave={() => deTocado = false}
    onfocusin={() => deTocado = true}
    onfocusout={() => deTocado = false}
    class="w-full text-white font-sans transition-colors duration-500 outline-none {enfoques[slideActivo].bg}"
    tabindex="0"
>
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[140px]">
        
        <!-- Lado Izquierdo: Texto del Banner -->
        <div class="md:col-span-9 p-6 md:p-8 flex flex-col justify-center space-y-2">
            <div class="flex items-center gap-3">
                <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-stone-900/40 text-white rounded-none font-mono">
                    {enfoques[slideActivo].etiqueta}
                </span>
                <span class="text-[9px] font-mono font-black opacity-60">LO QUE ESTÁ PASANDO HOY</span>
            </div>
            <h2 class="text-lg md:text-2xl font-black uppercase tracking-tight text-white leading-none">
                {enfoques[slideActivo].titulo}
            </h2>
            <p class="text-xs max-w-3xl leading-relaxed opacity-90 {enfoques[slideActivo].texto}">
                {enfoques[slideActivo].desc}
            </p>
        </div>

        <!-- Lado Derecho: Controles para saltar de noticia -->
        <div class="md:col-span-3 bg-stone-950/20 grid grid-cols-4 md:grid-cols-1 md:grid-rows-4 border-t md:border-t-0 md:border-l border-white/10 shrink-0">
            {#each enfoques as enfoque, idx}
                <button 
                    onclick={() => slideActivo = idx}
                    type="button"
                    class="p-3 text-center md:text-left font-mono text-[9px] font-black uppercase tracking-wider transition-all rounded-none flex items-center justify-center md:justify-between
                    {slideActivo === idx ? 'bg-white text-stone-900 border-l-0 md:border-l-4 border-stone-900 font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'}"
                >
                    <span class="hidden md:inline">{enfoque.titulo.split(' ')[0]}...</span>
                    <span class="font-sans text-[10px]">{idx + 1}</span>
                </button>
            {/each}
        </div>

    </div>
</section>


<!-- ─── PROPÓSITO: LA VISIÓN (ASIMÉTRICO CON LENGUAJE LIMPIDÓ) ─── -->
<section class="py-20 px-6 md:px-20 bg-stone-50 border-b border-stone-200">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <span class="text-[10px] font-black text-white bg-blue-700 px-3 py-1 uppercase inline-block tracking-widest font-mono rounded-none">
                Para qué estamos aquí
            </span>
            <h2 class="text-4xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter leading-none">
                Organizar la esperanza para no dejar a nadie atrás.
            </h2>
            <div class="text-[11px] font-black text-stone-400 uppercase tracking-widest border-t-2 border-stone-900 pt-4 font-mono">
                "La organización es la máxima expresión de la solidaridad."
            </div>
        </div>

        <div class="lg:col-span-7 space-y-6 bg-white p-8 md:p-12 border-2 border-stone-900 shadow-2xl rounded-none">
            
            <div class="space-y-3 bg-stone-50 p-6 border border-stone-200 rounded-none">
                <h3 class="text-xs font-black text-stone-900 uppercase tracking-tight flex items-center gap-2 font-mono">
                    <span class="w-2.5 h-2.5 bg-blue-700 block rounded-none"></span> POR QUÉ TRABAJAMOS JUNTOS
                </h3>
                <p class="text-xs text-stone-700 leading-relaxed font-sans">
                    Sabemos que cuando las cosas se complican, la fuerza real sale de los mismos vecinos. AmparoVenezuela no es una lista de nombres en papel; es la herramienta para que lo que tú dones o el tiempo que ofrezcas llegue directo al lugar exacto donde hace falta, sin perder el control y sin dar vueltas.
                </p>
            </div>

            <div class="space-y-3 bg-stone-50 p-6 border border-stone-200 rounded-none">
                <h3 class="text-xs font-black text-stone-900 uppercase tracking-tight flex items-center gap-2 font-mono">
                    <span class="w-2.5 h-2.5 bg-amber-500 block rounded-none"></span> TRANSPARENCIA Y CONFIANZA
                </h3>
                <p class="text-xs text-stone-700 leading-relaxed font-sans">
                    Queremos que se vea el trabajo real y las soluciones que nosotros mismos construimos en el barrio. Al tener las cuentas claras y la información al día, cuidamos lo que es de todos y creamos confianza entre nosotros. Con orden y transparencia, nos sostenemos la mano.
                </p>
            </div>
            
        </div>
    </div>
</section>


<!-- ─── SECCIÓN: CONVOCATORIA (BLOQUE DE COLOR AZUL SÓLIDO HUMANO) ─── -->
<section class="py-20 px-6 md:px-20 bg-blue-900 text-white border-b-8 border-stone-900">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <!-- Lado izquierdo: El enfoque en el voluntario -->
        <div class="space-y-6">
            <span class="text-[10px] font-black text-stone-900 bg-amber-400 px-3 py-1 uppercase inline-block tracking-widest font-mono rounded-none">
                SÚMATE COMO VOLUNTARIO
            </span>
            <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                La fuerza está en la unión de los vecinos
            </h2>
            <p class="text-xs text-blue-100 leading-relaxed max-w-md font-sans">
                No necesitamos superhéroes, necesitamos vecinos dispuestos a sumar. La verdadera capacidad de respuesta no está en las computadoras, sino en la gente que se organiza en cada calle para identificar quién necesita una mano y cómo hacérsela llegar de inmediato.
            </p>
            <div class="pt-2">
                <a href="/registro" class="bg-stone-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors rounded-none border border-transparent hover:border-stone-900">
                    Quiero ayudar a mis vecinos
                </a>
            </div>
        </div>
        
        <!-- Lado derecho: Propósito común -->
        <div class="border-2 border-white bg-blue-950 p-8 flex flex-col justify-center items-start gap-4 rounded-none shadow-2xl">
            <span class="text-[9px] font-black uppercase tracking-widest text-amber-400 font-mono">NUESTRO OBJETIVO HOY</span>
            <h3 class="text-xl font-black uppercase tracking-tight text-white font-sans">SABER QUIÉNES SOMOS Y DÓNDE ESTAMOS</h3>
            <p class="text-xs text-blue-200 leading-relaxed font-mono uppercase text-[11px]">
                Estamos armando una lista clara de los centros de ayuda y registrando a las personas que quieren dar una mano. Lo primero es saber cuántos somos y en qué zona podemos colaborar. Si tienes un espacio libre o quieres donar unas horas de tu tiempo, te necesitamos.
            </p>
        </div>
        
    </div>
</section>


<!-- ─── CÓMO NOS ORGANIZAMOS (HERRAMIENTAS CON BORDE SÓLIDO INTERACTIVO) ─── -->
<section class="py-20 px-6 md:px-20 bg-stone-100">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <div class="border-b-4 border-stone-900 pb-2 flex justify-between items-end">
            <span class="text-[11px] font-black text-stone-900 uppercase tracking-widest font-mono">CÓMO NOS ORGANIZAMOS</span>
            <span class="text-[9px] font-mono text-stone-400 uppercase">OPCIONES DISPONIBLES</span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {@render moduloCard(
                "01", 
                "Registra tu ayuda", 
                "Cualquier persona puede anotar aquí las cosas que tiene listas para donar. El sistema revisa en qué zona estás para avisarle al centro que le quede más cerca."
            )}
            
            {@render moduloCard(
                "02", 
                "Cuentas claras en los centros", 
                "Una herramienta sencilla para que cada centro de acopio sepa exactamente qué tiene, qué cosas van a vencer y qué se está entregando, sin papeleo complicado."
            )}
            
            <!-- TARJETA OSCURA DE ALTO CONTRASTE PARA PRÓXIMAMENTE -->
            {@render moduloCard(
                "03", 
                "Transporte comunitario", 
                "Estamos organizando un grupo de vecinos con carros, motos y camiones para mover las donaciones rápido y seguro a los lugares donde más haga falta.", 
                true
            )}
        </div>
        
    </div>
</section>
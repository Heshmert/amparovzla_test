<!-- ─── RECURSOS REUTILIZABLES (SNIPPETS SVELTE 5) ─── -->
{#snippet indicadorCard(etiqueta, numero, unidad, descripcion, colorBorde)}
    <!-- Añadimos un borde superior de color dinámico para romper el blanco -->
    <div class="p-8 bg-white border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between hover:bg-stone-50 transition-colors group rounded-none border-t-4 {colorBorde}">
        <div class="space-y-2">
            <span class="text-[10px] font-black text-stone-400 uppercase tracking-widest block">{etiqueta}</span>
            <div class="flex items-baseline gap-1.5">
                <span class="text-6xl font-black text-stone-900 tracking-tighter transition-transform group-hover:scale-105 duration-200">{numero}</span>
                <span class="text-[10px] font-black text-stone-500 uppercase tracking-wider">{unidad}</span>
            </div>
        </div>
        <p class="text-[10px] text-stone-500 font-bold uppercase tracking-wide mt-6 pt-4 border-t border-stone-100">
            {descripcion}
        </p>
    </div>
{/snippet}

{#snippet moduloCard(numero, titulo, descripcion, esProximamente = false)}
    <!-- Si es próximamente, usamos contraste invertido (Oscuro) para que resalte muchísimo -->
    <div class="p-8 border flex flex-col justify-between transition-all rounded-none h-full 
        {esProximamente ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 hover:border-blue-700'}"
    >
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <span class="text-3xl font-black {esProximamente ? 'text-stone-600' : 'text-stone-300'}">{numero}</span>
                {#if esProximamente}
                    <span class="text-[9px] font-black uppercase text-slate-900 bg-amber-500 px-2 py-0.5 tracking-wider">En Desarrollo</span>
                {/if}
            </div>
            <h3 class="text-sm font-black uppercase tracking-tight {esProximamente ? 'text-white' : 'text-slate-900'}">{titulo}</h3>
            <p class="text-xs leading-relaxed {esProximamente ? 'text-stone-400' : 'text-stone-600'}">{descripcion}</p>
        </div>
    </div>
{/snippet}


<section id="hero" class="relative w-full min-h-screen border-b border-stone-200 overflow-hidden rounded-none">
    <!-- IMAGEN DE FONDO -->
    <div class="absolute inset-0 bg-[url('/img/hero_index.jpg')] bg-cover bg-center"></div>
    <div class="absolute inset-0 bg-blue-950/60"></div>

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
<!-- ─── SECCIÓN DE INDICADORES (CON ACENTOS TRICOLOR) ─── -->
<!-- <section class="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-stone-200 bg-white">
    {@render indicadorCard("Red de Apoyo", "12", "Puntos", "Centros activos. Espacios abiertos para recibir y organizar.", "border-t-amber-500")}
    {@render indicadorCard("Voluntad", "84", "Manos", "Voluntarios activos. Vecinos organizados cuidando de otros.", "border-t-blue-700")}
    {@render indicadorCard("Impacto Humano", "4.2k", "Acciones", "Ayudas entregadas. Soluciones reales directo en el terreno.", "border-t-red-700")}
</section> -->


<!-- ─── PROPÓSITO: LA VISIÓN (ASIMÉTRICO) ─── -->
<section class="py-20 px-6 md:px-20 bg-stone-50 border-b border-stone-200">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <span class="text-[10px] font-black text-blue-700 bg-blue-100/70 px-2 py-1 uppercase inline-block tracking-widest">Nuestra Misión</span>
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                Organizar la esperanza para no dejar a nadie atrás.
            </h2>
            <div class="text-[11px] font-black text-stone-400 uppercase tracking-widest border-t border-stone-200 pt-4 italic">
                "La organización es la máxima expresión de la solidaridad."
            </div>
        </div>

        <div class="lg:col-span-7 space-y-12 bg-white p-8 md:p-12 border border-stone-200 shadow-sm">
            <div class="space-y-3">
                <h3 class="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-blue-700 block"></span> Por qué nos organizamos
                </h3>
                <p class="text-xs text-stone-600 leading-relaxed">
                    Sabemos que cuando las cosas se complican, la fuerza real sale de los mismos vecinos. AmparoVenezuela no es una lista de nombres en papel; es la herramienta para que lo que tú dones o el tiempo que ofrezcas llegue directo al lugar exacto donde hace falta, sin perder el control y sin dar vueltas.
                </p>
            </div>

            <div class="space-y-3">
                <h3 class="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-amber-500 block"></span> Seguimos Adelante
                </h3>
                <p class="text-xs text-stone-600 leading-relaxed">
                    Queremos que se vea el trabajo real y las soluciones que nosotros mismos construimos en el barrio. Al tener las cuentas claras y la información al día, cuidamos lo que es de todos y creamos confianza entre nosotros. Con orden y transparencia, nos sostenemos la mano.
                </p>
            </div>
        </div>
    </div>
</section>


<!-- ─── NUEVA SECCIÓN: TRANSPARENCIA Y DATOS (ROMPE EL BLANCO) ─── -->
<section class="py-20 px-6 md:px-20 bg-blue-900 text-white border-b border-blue-950">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Lado izquierdo: El enfoque en el voluntario -->
        <div class="space-y-6">
            <span class="text-[10px] font-black text-amber-400 uppercase tracking-widest border border-amber-400/30 px-2 py-1 inline-block">Convocatoria</span>
            <h2 class="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                La fuerza de la gente organizada
            </h2>
            <p class="text-xs text-blue-100 leading-relaxed max-w-md">
                No necesitamos superhéroes, necesitamos vecinos dispuestos a sumar. La verdadera capacidad de respuesta no está en los sistemas, sino en la gente que se organiza en cada parroquia para identificar quién necesita una mano y cómo hacérsela llegar.
            </p>
            <a href="/registro" class="bg-amber-500 text-slate-900 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-colors mt-4">
                Únete a la Red
            </a>
        </div>
        
        <!-- Lado derecho: El mensaje sobre el propósito común -->
        <div class="border border-blue-800 bg-blue-950/50 p-8 flex flex-col justify-center items-start gap-4">
            <span class="text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">Nuestro objetivo actual</span>
            <h3 class="text-lg font-black uppercase">Primero: El contacto humano</h3>
            <p class="text-xs text-blue-200 leading-relaxed">
                Estamos centrados en crear el directorio de puntos de apoyo y en registrar a cada persona que quiere colaborar. El primer paso es saber cuántos somos y dónde estamos desplegados. Si tienes un espacio o quieres aportar tu tiempo, este es el momento de organizarnos.
            </p>
        </div>
    </div>
</section>


<!-- ─── ESTRUCTURA DE TRABAJO ─── -->
<section class="py-20 px-6 md:px-20 bg-stone-100">
    <div class="max-w-6xl mx-auto space-y-8">
        <div class="border-b border-stone-300 pb-4">
            <span class="text-[10px] font-black text-stone-500 uppercase tracking-widest">Flujo Operativo</span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {@render moduloCard(
                "01", 
                "Tu aporte cuenta", 
                "Cualquier persona puede registrar lo que tiene para ayudar. El sistema revisa en tiempo real dónde estás y qué tienes para llevarlo rápido a donde urge."
            )}
            
            {@render moduloCard(
                "02", 
                "Control de Almacén", 
                "Herramienta directa para los centros. Inventario al día, control de fechas de vencimiento, qué lote entra y qué sale para evitar descuidos."
            )}
            
            <!-- TARJETA OSCURA DE ALTO CONTRASTE PARA PRÓXIMAMENTE -->
            {@render moduloCard(
                "03", 
                "Mover la ayuda", 
                "Estamos armando este módulo para coordinar rutas de carros, motos y camiones de los vecinos, asegurando que los insumos viajen seguros.", 
                true
            )}
        </div>
    </div>
</section>
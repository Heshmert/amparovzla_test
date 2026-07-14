<script>
    // Usamos las runas de Svelte 5 para recibir propiedades
    let { 
        titulo, 
        palabraResaltante = "", 
        descripcion = "", 
        imagen,
        tag = "",
        
        // Clases para variar los colores del texto y la etiqueta
        claseTextoResaltado = "text-amber-400",  // Color de la palabra clave
        claseTag = "bg-blue-700 text-white",     // Fondo y texto de la etiqueta
        claseBordeDesc = "border-amber-400",     // Borde izquierdo de la descripción
        
        children 
    } = $props();
</script>

<section 
    id="hero" 
    class="relative w-full min-h-[65vh] md:min-h-[75vh] flex items-end overflow-hidden bg-cover bg-center border-b border-stone-300 pt-20 md:pt-28"
    style="background-image: url('{imagen}');"
>
    <!-- Contenedor de contenido con empuje inferior asimétrico -->
    <div class="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col justify-end">
        
        <div class="max-w-4xl space-y-6">
            
            <!-- Etiqueta de la sección -->
            {#if tag}
                <div class="flex items-center">
                    <span class="font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-none {claseTag}">
                        {tag}
                    </span>
                </div>
            {/if}

            <!-- Título con corte dinámico -->
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                {titulo}
                {#if palabraResaltante}
                    <br class="hidden sm:inline" /> 
                    <span class="{claseTextoResaltado} block sm:inline">{palabraResaltante}</span>
                {/if}
            </h1>
            
            <!-- Descripción con borde de color variable -->
            {#if descripcion}
                <p class="text-xs md:text-sm text-stone-200 font-mono uppercase tracking-wider max-w-2xl border-l-4 {claseBordeDesc} pl-4 leading-relaxed">
                    {descripcion}
                </p>
            {/if}

            <!-- Bloque dinámico para contenido adicional -->
            {#if children}
                <div class="pt-2">
                    {@render children()}
                </div>
            {/if}

        </div>
    </div>

    <!-- Franja tricolor fija (Amarillo, Azul y Rojo) en la base -->
    <div class="absolute bottom-0 left-0 right-0 h-1.5 flex z-20">
        <div class="flex-1 bg-amber-500"></div>
        <div class="flex-1 bg-blue-700"></div>
        <div class="flex-1 bg-red-755 bg-red-700"></div>
    </div>
</section>
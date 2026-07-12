<script>
    let { data } = $props();
    
    // Control reactivo del Dialog Detallado
    let dialogRef = $state();
    let centroSeleccionado = $state(null);

    function abrirDetalle(centro) {
        centroSeleccionado = centro;
        dialogRef.showModal();
    }
</script>

<section id="hero" class="relative w-full border min-h-[70vh] flex items-center rounded-none overflow-hidden bg-stone-900">
    <div class="absolute inset-0 bg-[url('/hero.avif')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>

    <div class="absolute inset-0 bg-blue-950/60"></div>
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 text-white">
        <div class="lg:col-span-8 p-6 md:p-10 flex flex-col justify-center space-y-4 border-b lg:border-b-0 lg:border-r border-stone-800">
            <div class="space-y-1">
                <h1 class="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-stone-50">
                    Puntos de Recepción
                </h1>
            </div>
            <p class="text-xs md:text-sm text-stone-300 max-w-2xl font-normal leading-relaxed border-l border-stone-500 pl-4">
                Índice civil de centros distribuidos para la coordinación de contingencias. Directorio de acceso público para la verificación de locaciones e inventarios base.
            </p>
        </div>

        <div class="lg:col-span-4 bg-stone-950/30 p-6 md:p-10 flex flex-col justify-center font-mono">
            <span class="text-[9px] font-black uppercase text-stone-400 tracking-wider block mb-1">Restricción de Datos</span>
            <p class="text-[11px] text-stone-400 leading-normal uppercase">
                Los datos de contacto y direcciones exactas mostrados pertenecen exclusivamente a los establecimientos validados por las entidades civiles registradas.
            </p>
        </div>
    </div>
</section>

<section class="mt-6 space-y-4">
    <div class="p-3 bg-white border border-stone-200 rounded-none flex items-center justify-between">
        <span class="text-[10px] font-black uppercase text-stone-900 tracking-wider">
            Establecimientos Registrados en la Plataforma
        </span>
    </div>

    {#await data.streamed.centros}
        <div class="grid grid-cols-1 gap-1 md:hidden">
            {#each Array(3) as _}
                <div class="bg-white border border-stone-200 p-4 rounded-none animate-pulse h-16"></div>
            {/each}
        </div>
        <div class="hidden md:block bg-white border border-stone-200 h-32 animate-pulse rounded-none"></div>
    {:then listaCentros}
        {#if listaCentros.length === 0}
            <div class="bg-white border border-stone-200 text-center p-12 rounded-none">
                <p class="text-[10px] font-black text-stone-400 uppercase tracking-wider">
                    No se han encontrado centros de recepción validados en el sistema.
                </p>
            </div>
        {:else}
            
            <div class="block md:hidden divide-y divide-stone-200 bg-white border border-stone-200 rounded-none shadow-xs">
                {#each listaCentros as centro}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div onclick={() => abrirDetalle(centro)} class="p-3.5 space-y-2 hover:bg-stone-50 transition cursor-pointer active:bg-stone-100">
                        <div class="flex justify-between items-start gap-4">
                            <p class="font-black text-xs text-stone-900 uppercase tracking-tight leading-tight">{centro.nombre}</p>
                            <span class="text-[9px] font-mono font-bold uppercase text-stone-400 whitespace-nowrap">Ver ficha</span>
                        </div>
                        <div class="text-[10px] text-stone-500 font-bold uppercase font-mono tracking-wide">
                            {centro.estado} <span class="text-stone-300">/</span> {centro.municipio}
                        </div>
                    </div>
                {/each}
            </div>

            <div class="hidden md:block bg-white border border-stone-200 rounded-none overflow-hidden shadow-xs">
                <table class="w-full text-left text-xs border-collapse m-0">
                    <thead>
                        <tr class="bg-stone-50 font-black uppercase text-stone-900 tracking-wider text-[10px] border-b border-stone-200">
                            <th class="p-3.5 pl-4 w-1/3">Nombre del Establecimiento</th>
                            <th class="p-3.5">Estado</th>
                            <th class="p-3.5">Municipio</th>
                            <th class="p-3.5">Parroquia / Sector</th>
                            <th class="p-3.5 pr-4 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-stone-200 bg-white text-stone-800">
                        {#each listaCentros as centro}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                            <tr onclick={() => abrirDetalle(centro)} class="hover:bg-stone-50 transition cursor-pointer group">
                                <td class="p-3.5 pl-4">
                                    <span class="font-black text-stone-900 uppercase tracking-tight text-xs block">{centro.nombre}</span>
                                </td>
                                <td class="p-3.5 font-bold uppercase text-stone-600">{centro.estado}</td>
                                <td class="p-3.5 uppercase text-stone-600">{centro.municipio}</td>
                                <td class="p-3.5 uppercase text-stone-500 font-mono text-[11px]">{centro.localidad}</td>
                                <td class="p-3.5 pr-4 text-right">
                                    <span class="inline-block border border-stone-900 bg-stone-900 text-white font-bold text-[10px] uppercase px-3 py-1 tracking-wider rounded-none group-hover:bg-blue-700 group-hover:border-blue-700 transition">
                                        Consultar
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    {/await}
</section>

<dialog bind:this={dialogRef} class="backdrop:bg-stone-900/40 backdrop:backdrop-blur-xs m-auto bg-white border border-stone-900 rounded-none w-[94%] max-w-xl p-0 shadow-2xl">
    {#if centroSeleccionado}
        <div class="bg-stone-900 text-white p-4 flex justify-between items-center rounded-none">
            <div class="space-y-0.5">
                <span class="text-[9px] font-black text-stone-400 uppercase tracking-widest block font-mono">Registro Logístico</span>
                <h3 class="text-xs font-black uppercase tracking-tight text-white">{centroSeleccionado.nombre}</h3>
            </div>
            <button onclick={() => dialogRef.close()} type="button" class="text-stone-400 hover:text-white font-black text-sm p-1 transition">✕</button>
        </div>
        <div class="p-4 space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50 p-3 border border-stone-200 font-mono text-stone-700">
                <div>
                    <span class="block text-[9px] font-black text-stone-400 uppercase">Contacto Directo</span>
                    <p class="font-bold text-stone-900 text-xs mt-0.5">📞 {centroSeleccionado.telefonoPrincipal}</p>
                </div>
                <div>
                    <span class="block text-[9px] font-black text-stone-400 uppercase">Identificador Enlace</span>
                    <p class="text-stone-500 text-[10px] truncate mt-0.5">{centroSeleccionado.id.toUpperCase()}</p>
                </div>
            </div>
            <div class="space-y-1">
                <span class="block text-[9px] font-black text-stone-400 uppercase">Ubicación Coordinada</span>
                <p class="text-stone-900 font-bold uppercase text-[11px]">
                    Edo. {centroSeleccionado.estado}, Mun. {centroSeleccionado.municipio}, Parroquia {centroSeleccionado.localidad}
                </p>
                <div class="text-stone-700 bg-stone-50 p-3 border border-stone-200 text-[11px] font-mono uppercase leading-relaxed">
                    <span class="font-sans font-black text-[9px] text-stone-400 block mb-1">Indicaciones Geográficas:</span>
                    "{centroSeleccionado.direccionExacta}"
                </div>
            </div>

            {#if centroSeleccionado.latitud && centroSeleccionado.longitud}
                <div class="space-y-1">
                    <span class="block text-[9px] font-black text-stone-400 uppercase">Localización Satelital</span>
                    <div class="w-full h-48 bg-stone-100 border border-stone-200 rounded-none overflow-hidden">
                        <iframe 
                            title="Ubicación Geográfica"
                            width="100%" 
                            height="100%" 
                            frameborder="0" 
                            scrolling="no" 
                            marginheight="0" 
                            marginwidth="0" 
                            src="https://maps.google.com/maps?q={centroSeleccionado.latitud},{centroSeleccionado.longitud}&z=16&output=embed"
                            class="filter grayscale opacity-90 contrast-125">
                        </iframe>
                    </div>
                </div>
            {/if}
        </div>

        <div class="p-3 border-t border-stone-200 bg-stone-50 flex">
            <button onclick={() => dialogRef.close()} type="button" 
                class="w-full bg-stone-900 text-white p-2 text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition rounded-none">
                Cerrar Ventana
            </button>
        </div>
    {/if}
</dialog>
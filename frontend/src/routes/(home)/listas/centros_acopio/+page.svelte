<script>
  import Hero from "$lib/components/Hero.svelte";
  import Proximamente from "$lib/components/Proximamente.svelte";

    // let { data } = $props();
    
    // // Control reactivo del Dialog Detallado
    // let dialogRef = $state();
    // let centroSeleccionado = $state(null);

    // function abrirDetalle(centro) {
    //     centroSeleccionado = centro;
    //     dialogRef.showModal();
    // }
</script>
 
<Hero 
    titulo="Puntos de"
    palabraResaltante="recepción"
    descripcion="Aquí reunimos los centros que están activos recibiendo colaboración en cada zona. Un mapa directo para que sepas a dónde ir a llevar tu ayuda y qué es lo que más hace falta en el terreno."
    tag="Centros de ayuda"
    imagen="/img/hero_acopio.webp"
    claseTextoResaltado="text-amber-400"
    claseTag="bg-blue-700 text-white"
    claseBordeDesc="border-amber-400"
>
    <!-- Tarjeta informativa derecha adaptada al diseño asimétrico -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left">
        <div class="lg:col-span-4 bg-stone-950/20 p-6 border border-stone-800 space-y-2">
            <span class="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">
                Solo sitios confirmados
            </span>
            <p class="text-[11px] text-stone-300 leading-relaxed uppercase font-mono">
                Las direcciones y teléfonos que vas a ver aquí son de locales y casas que nosotros mismos o los vecinos organizados ya fuimos a verificar en persona.
            </p>
        </div>
    </div>
</Hero>


<Proximamente 
    seccion="Listado de centros de Acopio" 
    mensaje="Estamos trabajando en terminar aspectos de seguridad y funcionamiento para conectar este apartado de forma segura y eficiente a nuestra base de datos" 
  />
<!-- <section class="mt-6 space-y-4">
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
</section> -->

<!-- <dialog bind:this={dialogRef} class="backdrop:bg-stone-900/40 backdrop:backdrop-blur-xs m-auto bg-white border border-stone-900 rounded-none w-[94%] max-w-xl p-0 shadow-2xl">
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
</dialog> -->
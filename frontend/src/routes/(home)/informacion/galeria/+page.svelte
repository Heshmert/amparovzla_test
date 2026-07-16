<script>
  import Hero from "$lib/components/Hero.svelte";
  import archivosEvidencias from '$lib/data/evidencias.json';
  let itemActivo = $state(null);
</script>

<Hero 
    titulo="Archivo"
    palabraResaltante="documental"
    descripcion="Nuestras fotos de la calle. Guardamos este registro para que no se olvide lo que pasó y todo quede documentado de forma transparente."
    tag="Registro visual"
    imagen="/img/hero_galeria.webp"
    claseTextoResaltado="text-emerald-400"
    claseTag="bg-emerald-800 text-white"
    claseBordeDesc="border-emerald-400"
>
    <!-- Detalle de envío de fotos por Instagram -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 w-full text-left">
        
        <div class="md:col-span-6">
            <span class="text-xm font-bold uppercase text-emerald-400 tracking-wider block font-mono">
                ¿Tienes fotos de lo que pasó?
            </span>
            <p class="text-[11px] text-stone-300 leading-relaxed max-w-md">
                Si tienes fotos o videos que sirvan para documentar las cosas que pasaron en tu cuadra, mándanos un mensaje directo por nuestro Instagram (@amparo.vzla). Así nos ayudamos a tener un registro real de todo.
            </p>
        </div>

        <div class="md:col-span-6">
            <span class="text-xs font-black uppercase text-stone-400 tracking-wider block font-mono">
                Por favor, mándanos estos detalles:
            </span>
            <ul class="text-[10px] text-stone-200 space-y-1.5 uppercase font-bold font-mono">
                <li class="flex items-center gap-2">
                    Lugar exacto (parroquia y sector)
                </li>
                <li class="flex items-center gap-2">
                    Quién tomó la foto (para darte el crédito)
                </li>
                <li class="flex items-center gap-2">
                    Qué día y a qué hora fue
                </li>
                <li class="flex items-center gap-2">
                    Qué estaba pasando en ese momento
                </li>
            </ul>
        </div>

    </div>
</Hero>

<div class="w-full bg-amber-50 border-b border-stone-200 p-4 font-mono">
  <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
    <span class="text-[10px] font-black uppercase text-amber-800 tracking-wider">Aviso de acceso y propiedad</span>
    <p class="text-[11px] text-stone-700 uppercase leading-tight">
      Todo el material gráfico e informativo alojado en este registro es de <span class="font-black">uso público, gratuito y libre.</span> Queda autorizado su uso para fines informativos, de auditoría social o difusión humanitaria.
    </p>
  </div>
</div>

<section class="w-full bg-stone-50 p-4">
  {#await archivosEvidencias}
    <div class="p-10 text-center border border-stone-200 bg-white rounded-none">
      <span class="text-[10px] font-black uppercase text-stone-400">Accediendo al almacenamiento local...</span>
    </div>
  {:then listaEvidencias}
    <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
{#each listaEvidencias as item (item.rutaImagen)}
  {@const esActivo = itemActivo === item.rutaImagen}

  <div 
    role="button"
    tabindex="0"
    onclick={() => itemActivo = esActivo ? null : item.rutaImagen}
    onkeydown={(e) => e.key === 'Enter' && (itemActivo = esActivo ? null : item.rutaImagen)}
    class="break-inside-avoid bg-stone-900 border border-stone-200 rounded-none overflow-hidden relative group mb-4 select-none cursor-pointer outline-hidden"
  >
    
    <a 
      href={item.rutaImagen} 
      download
      onclick={(e) => e.stopPropagation()}
      class="absolute top-3 right-3 z-20 bg-stone-950/90 border border-stone-700 text-stone-200 p-2 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-stone-900 hover:border-white flex items-center justify-center"
      class:opacity-100={esActivo}
      title="DESCARGAR"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="w-3.5 h-3.5" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2.5" 
        stroke-linecap="square" 
        stroke-linejoin="miter"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </a>

    <img 
      src={item.rutaImagen} 
      alt={item.sitio} 
      loading="lazy"
      decoding="async"
      class="w-full h-auto block filter grayscale group-hover:grayscale-0 transition-all duration-300"
      class:grayscale-0={esActivo}
    />

    <div 
      class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white font-mono text-[11px]"
      class:opacity-100={esActivo}
    >
      
      <div 
        class="space-y-2 pointer-events-none translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
        class:translate-y-0={esActivo}
      >
        
        <div>
          <span class="text-[8px] font-black text-stone-400 uppercase block mb-0.5">Ubicación / Sitio</span>
          <span class="text-stone-100 uppercase font-bold leading-tight block">{item.sitio}</span>
        </div>

        <div class="grid grid-cols-2 gap-2 border-t border-stone-800 pt-1.5">
          <div>
            <span class="text-[8px] font-black text-stone-400 uppercase block">Autor</span>
            <span class="text-stone-300 uppercase text-[10px] font-medium block truncate">
              {item.autor || "Anónimo"}
            </span>
          </div>
          <div>
            <span class="text-[8px] font-black text-stone-400 uppercase block">Registro</span>
            <span class="text-stone-300 uppercase text-[10px] font-medium block">
              {item.fecha || "--/--/----"} {item.hora ? `[${item.hora}]` : ''}
            </span>
          </div>
        </div>

        {#if item.descripcion}
          <div class="border-t border-stone-800 pt-1.5 font-sans text-stone-300 normal-case leading-tight text-xs max-h-20 overflow-hidden text-ellipsis">
            {item.descripcion}
          </div>
        {/if}
        
      </div>

    </div>
  </div>
{/each}
    </div>
  {/await}
</section>
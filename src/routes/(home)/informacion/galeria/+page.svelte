<script>
  let { data } = $props();
</script>

<section id="hero" class="relative w-full border flex items-center rounded-none bg-stone-900">
    <div class="absolute inset-0 bg-[url('/img/hero_info.jpg')] bg-cover bg-center"></div>

    <div class="absolute inset-0 bg-blue-950/60"></div>
  <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 text-white w-full">
    <div class="lg:col-span-8 p-6 md:p-10 flex flex-col justify-center space-y-4 border-b lg:border-b-0 lg:border-r border-stone-800">
      <div class="space-y-1">
        <h1 class="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-stone-50">
          Archivo Documental
        </h1>
      </div>
      <p class="text-xs md:text-sm text-stone-300 max-w-2xl font-normal leading-relaxed border-l border-stone-500 pl-4">
        Registro fotográfico. Este módulo funciona exclusivamente como evidencia visual e histórica de los eventos sucedidos.
      </p>
    </div>

    <div class="lg:col-span-4 bg-stone-950/40 p-6 md:p-10 flex flex-col justify-center font-mono">
      <span class="text-[10px] font-black uppercase text-amber-500 tracking-wider block mb-2">Recepción de Evidencias</span>
      <p class="text-[11px] text-stone-400 leading-normal mb-4">
        Si dispone de material visual que evidencia parte de los echos sucedidos, remita los archivos vía mensaje directo en Instagram en donde puede incluir:
      </p>
      <ul class="text-[10px] text-stone-300 space-y-1 uppercase font-bold border-t border-stone-800 pt-3">
        <li>Nombre exacto del sitio (Ubicacion)</li>
        <li>Autor de la imagen</li>
        <li>Fecha y hora del acontecimiento</li>
        <li>Breve descripción del hecho</li>
      </ul>
    </div>
  </div>
</section>

<div class="w-full bg-amber-50 border-b border-stone-200 p-4 font-mono">
  <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
    <span class="text-[10px] font-black uppercase text-amber-800 tracking-wider">Aviso de acceso y propiedad</span>
    <p class="text-[11px] text-stone-700 uppercase leading-tight">
      Todo el material gráfico e informativo alojado en este registro es de <span class="font-black">uso público, gratuito y libre.</span> Queda autorizado su uso para fines informativos, de auditoría social o difusión humanitaria.
    </p>
  </div>
</div>

<section class="w-full bg-stone-50 p-4">
  {#await data.registros}
    <div class="p-10 text-center border border-stone-200 bg-white rounded-none">
      <span class="text-[10px] font-black uppercase text-stone-400">Accediendo al almacenamiento local...</span>
    </div>
  {:then listaEvidencias}
    <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
{#each listaEvidencias as item (item.rutaImagen)}
  <div class="break-inside-avoid bg-stone-900 border border-stone-200 rounded-none overflow-hidden relative group mb-4 select-none">
    <!-- Botón Técnico de Descarga (Esquina Superior Derecha) -->
    <a 
      href={item.rutaImagen} 
      download
      class="absolute top-3 right-3 z-20 bg-stone-950/90 border border-stone-700 text-stone-200 p-2 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-stone-900 hover:border-white flex items-center justify-center"
      title="DESCARGAR ARCHIVO"
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
    />

    <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white font-mono text-[11px]">
      
      <div class="space-y-2 pointer-events-none translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        
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
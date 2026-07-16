<script>
  // Props nativos en Svelte 5
  let { 
    seccion = "Esta sección", 
    mensaje = "Estamos terminando de acomodar las cosas aquí para que funcione de manera limpia y sin caídas." 
  } = $props();
</script>

<div class=" bg-stone-50 p-6 md:p-12 rounded-none flex flex-col justify-between gap-12 min-h-[350px]">
  
  <!-- Cabecera Asimétrica -->
  <div class="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-stone-200 pb-6">
    <div>
      <!-- Acento de atención en Amarillo/Amber (Estado Pendiente) -->
      <span class="bg-amber-400 text-stone-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-none">
        Muy Pronto
      </span>
      <h2 class="mt-4 text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-900 leading-none">
        {seccion}
      </h2>
    </div>
    
    <!-- Tipografía masiva de fondo -->
    <div class="text-[12vw] sm:text-[70px] font-black text-stone-200 leading-none select-none tracking-tighter">
      EN PROCESO
    </div>
  </div>

  <!-- Contenido y mensaje directo -->
  <div class="max-w-xl">
    <p class="text-sm md:text-base text-stone-700 font-medium leading-relaxed">
      {mensaje}
    </p>
    <p class="mt-4 text-xs text-stone-400 uppercase tracking-wider font-black">
      Estamos trabajando a paso firme. Volvemos pronto.
    </p>
  </div>

</div>
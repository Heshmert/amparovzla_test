<script>
  import { page } from '$app/state';
</script>

<div class="min-h-screen bg-stone-50 flex flex-col justify-between p-6 md:p-12">
  
  <div class="flex justify-between items-center border-b border-stone-200 pb-6">
    <span class="bg-red-700 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-none">
      Alerta de Sistema
    </span>
  </div>

  <div class="my-auto flex flex-col gap-6 max-w-2xl">
    <h1 class="text-[20vw] sm:text-[120px] font-black text-stone-950 leading-none tracking-tighter select-none">
      {page.status}
    </h1>
    
    <div class="border-l-4 border-red-700 pl-6">
      <h2 class="text-xl md:text-2xl font-black uppercase tracking-tight text-stone-900">
        Algo falló en la conexión
      </h2>
      <p class="mt-2 text-sm md:text-base text-stone-600 font-medium leading-relaxed">
        {page.error?.message || "No pudimos sincronizar los datos de esta sección. Verifica tu conexión de datos o vuelve a intentarlo."}
      </p>
    </div>

    <div class="mt-4 flex flex-wrap gap-4">
      <a 
        href="/" 
        class="inline-block border-2 border-stone-900 bg-stone-900 text-stone-50 hover:bg-stone-800 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-none text-center transition-colors"
      >
        Volver a la página principal
      </a>
      <button 
        onclick={() => location.reload()} 
        class="inline-block border-2 border-stone-900 bg-transparent text-stone-900 hover:bg-stone-200 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-none text-center transition-colors"
      >
        Reintentar carga
      </button>
    </div>
  </div>

  <div class="h-1.5 w-full bg-stone-950 flex rounded-none overflow-hidden mt-12">
    <div class="w-1/3 bg-amber-400"></div>
    <div class="w-1/3 bg-blue-700"></div>
    <div class="w-1/3 bg-red-700"></div>
  </div>
</div>
<script>
  let { data, children } = $props();
  let desplegado = $state(false);
  import { PUBLIC_API_URL } from '$env/static/public';


</script>  

<header class="top-0 z-50 w-full bg-slate-950 backdrop-blur-md shadow-xl">
    <div class="p-4 mx-auto flex gap-4 items-center  md:px-8">
        <a href="/" class="flex items-center">
          <img src="/img/logos/logo_borde.png" alt="amparovzla" width="40" />
        </a>
        <a href="/docs" class="bg-slate-800 text-stone-50 px-2 py-0.5 text-xs font-black uppercase tracking-widest rounded-none">
          Documentación
        </a>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-1.5 flex z-20">
        <div class="flex-1 bg-amber-500"></div>
        <div class="flex-1 bg-blue-700"></div>
        <div class="flex-1 bg-red-700"></div>
    </div>

</header>

<div class="min-h-screen flex flex-col md:flex-row">
  <aside class="w-full md:w-64 bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200 p-4 md:p-6 flex flex-col gap-4 md:gap-6">
    
    <div class="flex justify-between items-center md:block">
      <button 
        onclick={() => desplegado = !desplegado} 
        class="md:hidden border border-stone-900 bg-white text-stone-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-none hover:bg-stone-100 transition-colors"
      >
        {desplegado ? 'Ocultar Temas' : 'Mostrar Temas'}
      </button>
    </div>

    <nav class="flex-col gap-1 border-t border-stone-200 pt-4 {desplegado ? 'flex' : 'hidden'} md:flex">
      {#each data.menuDocs as item}
        <a 
          href="/docs/{item.slug}" 
          onclick={() => desplegado = false} /* Cierra el menú automáticamente al hacer clic en un tema */
          class="text-xs uppercase tracking-wider font-black py-1.5 px-2 hover:bg-stone-200 text-stone-600 hover:text-stone-900 rounded-none transition-colors"
        >
          {item.meta.title}
        </a>
      {/each}
    </nav>
  </aside>

  <main class="flex-1 p-6 md:p-12 max-w-4xl">
    {@render children()}
  </main>
</div>
<script>
  let { data } = $props();
  let Content = $derived(data.content);
</script>

<article class="max-w-3xl mx-auto p-6 md:p-12 min-h-screen flex flex-col justify-between">
  <div class="pt-16">
    
    <div class="border-b border-stone-200 pb-6 my-8">
      <h1 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-900">
        {data.meta.title}
      </h1>
      <p class="text-stone-500 text-sm mt-2 font-medium">
        {data.meta.description}
      </p>
    </div>

    <div class="contenido-bruto-markdown">
      <Content />
        <a href="/informacion/talentos" class="flex justify-end items-center gap-2 hover:gap-4 transition-all text-xs font-black uppercase tracking-wider text-stone-700/80 hover:text-stone-900/80">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg> Volver a la lista de Talentos
      </a>
    </div>
  </div>

</article>

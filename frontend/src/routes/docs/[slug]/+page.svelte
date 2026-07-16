<script>
  let { data } = $props();
  let Content = $derived(data.content);
</script>

<article class="prose prose-stone max-w-none text-stone-800 text-sm md:text-base">
  <h1 class="text-3xl md:text-4xl font-black uppercase tracking-tight text-stone-900 border-b border-stone-200 pb-4 mb-6">
    {data.meta.title}
  </h1>
  <div class="contenido-bruto-markdown">
    <Content />
  </div>
</article>
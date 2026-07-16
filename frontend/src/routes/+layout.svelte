<script>
    import '../global.css';
    import favicon from '$lib/assets/favicon.svg';
    export const prerender = true;

    let { children } = $props();
    let menuAbierto = $state(false);
    
</script>  

<svelte:head>
    <link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

    <main class="flex-1">
        {@render children()}
    </main>

<style>
:global(section) {
    padding: clamp(1rem, 5vw, 3rem);
}

:global(#hero) {
    padding-top: 4rem;
    height: min(100vh);
}
  
    :global(.contenido-bruto-markdown h2) {
    font-size: 1.35rem;
    font-weight: 900;
    text-transform: uppercase;
    tracking-content: tight;
    color: #1c1917; /* stone-900 */
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

    :global(.contenido-bruto-markdown h3) {
    font-size: 1.1rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #1c1917;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

    :global(.contenido-bruto-markdown p) {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #292524; /* stone-800 */
  }

  /* Listas organizadas y visibles */
  :global(.contenido-bruto-markdown  ul) {
    list-style-type: disc;
    margin-left: 1.25rem;
    margin-bottom: 1.25rem;
  }

  :global(.contenido-bruto-markdown  ol) {
    list-style-type: decimal;
    margin-left: 1.25rem;
    margin-bottom: 1.25rem;
  }

  :global(.contenido-bruto-markdown li) {
    margin-bottom: 0.4rem;
    padding-left: 0.25rem;
  }

  :global(.contenido-bruto-markdown  strong) {
    font-weight: 800;
    color: #1c1917;
  }

  /* Separadores sutiles (Líneas finas de la Ficha de Estilo) */
  :global(.contenido-bruto-markdown  hr) {
    border: 0;
    border-top: 1px solid #e7e5e4; /* border-stone-200 */
    margin: 2rem 0;
  }
</style>
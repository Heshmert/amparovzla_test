<script>
  import Hero from "$lib/components/Hero.svelte";

  let { data } = $props();

  // Patrón de ancho alterno (2+1, 1+2) que se repite perfectamente cada 4 artículos
  const obtenerConfigMosaico = (index) => {
    const patron = index % 4;
    
    if (patron === 0 || patron === 3) {
      // Tarjeta Ancha (toma 2 columnas de la grilla)
      return {
        claseColumna: "md:col-span-2 min-h-[280px] md:min-h-[320px] p-6 md:p-10",
        claseTitulo: "text-2xl md:text-3xl lg:text-4xl leading-none",
        claseDesc: "text-xs md:text-sm mt-3 line-clamp-2 md:line-clamp-3"
      };
    } else {
      // Tarjeta Estándar (toma 1 columna de la grilla)
      return {
        claseColumna: "md:col-span-1 min-h-[280px] md:min-h-[320px] p-6 md:p-8",
        claseTitulo: "text-xl md:text-2xl leading-tight",
        claseDesc: "text-xs mt-3 line-clamp-4"
      };
    }
  };
</script>

<Hero 
  titulo="Prensa y"
  palabraResaltante="Artículos"
  descripcion="Entérate de las novedades de forma segura y corroborada de lo que sucede."
  tag="Bitácora y Novedades"
  imagen="/img/hero_informacion.webp"
  claseTextoResaltado="text-emerald-500"
  claseTag="bg-blue-500 text-stone-950 font-black"
  claseBordeDesc="border-blue-500"
/>

<!-- Contenedor del Mosaico Balanceado -->
<section class="max-w-none mx-auto py-6 px-4 md:px-0">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
    {#each data.posts as post, i}
      <!-- Calculamos el ancho de forma reactiva -->
      {@const config = obtenerConfigMosaico(i)}

      <a 
        href="/blog/{post.slug}" 
        class="flex flex-col justify-between group transition-all duration-200 rounded-none {post.meta.bg || 'bg-stone-900'} {post.meta.texto || 'text-stone-50'} {config.claseColumna}"
      >
        <div>
          <!-- Etiqueta de la publicación -->
          <span class="text-[10px] font-black uppercase tracking-widest bg-stone-950/20 px-2.5 py-1 inline-block">
            {post.meta.etiqueta}
          </span>

          <!-- Título -->
          <h2 class="font-black uppercase tracking-tight mt-5 group-hover:underline {config.claseTitulo}">
            {post.meta.title}
          </h2>

          <!-- Descripción -->
          <p class="font-medium opacity-90 {config.claseDesc}">
            {post.meta.description}
          </p>
        </div>

        <!-- Botón de acción inferior -->
        <span class="flex items-center gap-2 group-hover:gap-4 transition-all text-[10px] font-black uppercase tracking-wider mt-6">
          Leer artículo completo 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right">
            <path d="M18 8L22 12L18 16"/>
            <path d="M2 12H22"/>
          </svg>
        </span>
      </a>
    {/each}
  </div>
</section>
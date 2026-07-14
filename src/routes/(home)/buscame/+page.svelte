<script>
    import FichaPersona from '$lib/components/FichaPersona.svelte';
    import FormPersonas from '$lib/components/forms/FormPersonas.svelte';
  import Hero from '$lib/components/Hero.svelte';
    import TablaPersonas from '$lib/components/tablas/TablaPersonas.svelte';

    let { data, form = $bindable() } = $props();

    let modalAbierto = $state(false);
    let personaSeleccionada = $state(null);

    function abrirModal(p) {
        personaSeleccionada = p;
        modalAbierto = true;
    }
</script>

<Hero 
    titulo="Búscame: saber"
    palabraResaltante="que estamos bien"
    descripcion="Una herramienta vecinal para saber el estado de nuestra gente en momentos difíciles. Aquí puedes registrar a los vecinos de tu sector o buscar a tus seres queridos para tener calma."
    tag="Red de personas"
    imagen="/img/hero_buscame.webp"
    claseTextoResaltado="text-amber-400"
    claseTag="bg-blue-700 text-white"
    claseBordeDesc="border-amber-400"
>
    <!-- Bloque de advertencia civil sobre duplicados -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left">
        <div class="lg:col-span-4 bg-stone-950/20 p-6 border border-stone-800 space-y-2">
            <span class="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">
                Suma datos con cuidado
            </span>
            <p class="text-[11px] text-stone-300 leading-relaxed uppercase font-mono">
                Usa el formulario de abajo para registrar a un vecino. Por favor, revisa primero la tabla de búsqueda para confirmar que nadie lo haya anotado antes.
            </p>
        </div>
    </div>
</Hero>

<div class="w-full bg-blue-100 p-4 font-sans">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
        
        <!-- Etiqueta con fondo sólido azul y texto blanco -->
        <span class="bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none shrink-0 text-center">
            Descargar Ficha
        </span>
        
        <!-- Texto explicativo en tamaño normal -->
        <p class="text-xs text-stone-900 leading-normal">
            Si la persona está registrada como <span class="font-bold">desaparecida, herida o en un refugio</span>, dentro de su expediente estará disponible esta opción para bajar una imagen con sus datos lista para compartir en redes sociales.
        </p>
        
    </div>
</div>

<section>
<FormPersonas bind:form={form} estatusPersona={data.estatusPersona} />

<TablaPersonas {data} coincidencias={form?.coincidencias} onVerExpediente={abrirModal} />
</section>

<FichaPersona persona={personaSeleccionada} bind:open={modalAbierto} />
<script>
    import FichaPersona from '$lib/components/FichaPersona.svelte';
    import FormPersonas from '$lib/components/forms/FormPersonas.svelte';
    import TablaPersonas from '$lib/components/tablas/TablaPersonas.svelte';

    let { data, form = $bindable() } = $props();

    let modalAbierto = $state(false);
    let personaSeleccionada = $state(null);

    function abrirModal(p) {
        personaSeleccionada = p;
        modalAbierto = true;
    }
</script>

<section id="hero" class="relative w-full border min-h-[70vh] flex items-center  overflow-hidden inset-0 bg-[url('/img/hero_buscame.webp')] bg-cover bg-center">

    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 text-white">
        <div class="lg:col-span-8 p-6 md:p-10 flex flex-col justify-center space-y-4 border-b lg:border-b-0 lg:border-r border-stone-800">
            <div class="space-y-1">
                <h1 class="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-stone-50">
                    Búscame
                </h1>
            </div>
            <p class="text-xs md:text-sm text-stone-300 max-w-2xl font-normal leading-relaxed border-l border-stone-500 pl-4">
                Índice público de contingencia para la localización, reporte y seguimiento de ciudadanos. Módulo habilitado exclusivamente para el registro y consulta directa de la población.
            </p>
        </div>

        <div class="lg:col-span-4 bg-stone-950/30 p-6 md:p-10 flex flex-col justify-center font-mono">
            <span class="text-[9px] font-black uppercase text-stone-400 tracking-wider block mb-1">Acceso de Escritura Abierto</span>
            <p class="text-[11px] text-stone-400 leading-normal uppercase">
                Utilice el panel inferior para ingresar los datos físicos u operativos de una persona. Evite duplicar registros si ya existen coincidencias en la tabla de datos.
            </p>
        </div>
    </div>
</section>

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
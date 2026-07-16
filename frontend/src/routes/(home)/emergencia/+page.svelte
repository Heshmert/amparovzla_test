<script>
  import Hero from "$lib/components/Hero.svelte";

    // Datos fijos en el frontend
    const lineasAyuda = [
        {
            id: "emergencia-1",
            nombre: "VEN 911 (Emergencias Generales)",
            numero: "911",
            donde: "Todo el país",
            tipo: "critico",
            enQueAyudan: "Llama aquí si hay un accidente en la calle, un choque, un robo o si necesitas policías y ambulancias rápido."
        },
        {
            id: "emergencia-2",
            nombre: "Protección Civil",
            numero: "0212-6627074",
            donde: "Todo el país",
            tipo: "riesgo",
            enQueAyudan: "Ayuda si hay inundaciones por lluvias, árboles caídos, temblores o si una casa o pared está en peligro de caerse."
        },
        {
            id: "emergencia-3",
            nombre: "Bomberos Universitarios UCV",
            numero: "0212-6052222",
            donde: "Caracas y Miranda",
            tipo: "critico",
            enQueAyudan: "Apagan incendios, rescatan personas atrapadas y dan primeros auxilios si alguien se pone muy grave."
        },
        {
            id: "emergencia-4",
            nombre: "Cruz Roja Venezolana",
            numero: "0212-5781122",
            donde: "Todo el país",
            tipo: "critico",
            enQueAyudan: "Te ayudan con ambulancias, curaciones, médicos de emergencia y a buscar sangre si estás en el hospital."
        },
        {
            id: "emergencia-5",
            nombre: "Cáritas de Venezuela",
            numero: "0212-4433153",
            donde: "Todo el país",
            tipo: "social",
            enQueAyudan: "Tienen comedores públicos, dan comida a los niños que lo necesitan y reparten bolsas de alimentos en los sectores vulnerables."
        },
        {
            id: "emergencia-6",
            nombre: "Bomberos de Caracas",
            numero: "0212-5454545",
            donde: "Caracas",
            tipo: "critico",
            enQueAyudan: "Rescate en accidentes de tránsito, cables eléctricos sueltos, fuegos en casas y escapes de gas."
        }
    ];

    // Estilos industriales de estado (Rojo para crítico, Ámbar para riesgo, Blue para acción/social)
    const estilosPorTipo = {
        critico: {
            texto: "text-red-600",
            boton: "bg-red-600 hover:bg-red-700"
        },
        riesgo: {
            texto: "text-amber-600",
            boton: "bg-amber-600 hover:bg-amber-700"
        },
        social: {
            texto: "text-blue-700",
            boton: "bg-blue-700 hover:bg-blue-800"
        }
    };

    // Reactividad en Svelte 5
    let loQueBusca = $state("");

    let resultadoFiltrado = $derived(
        lineasAyuda.filter(item => {
            const texto = loQueBusca.toLowerCase();
            return item.nombre.toLowerCase().includes(texto) || 
                   item.enQueAyudan.toLowerCase().includes(texto) ||
                   item.donde.toLowerCase().includes(texto);
        })
    );
</script>
{#snippet tarjetaAyuda(item)}
    {@const estilo = estilosPorTipo[item.tipo] || { texto: "text-stone-900", boton: "bg-stone-900" }}
    
    <div class="bg-white border border-stone-200 p-4 rounded-none flex flex-col justify-between space-y-4 hover:border-stone-400 transition-colors">
        <div class="space-y-2">
            
            <div class="flex items-center justify-between font-mono text-[9px] font-black text-stone-400 uppercase tracking-wider">
                <span>Lugar de atención</span>
                <span class="text-stone-900 bg-stone-100 px-1.5 py-0.5">{item.donde}</span>
            </div>

            <h2 class="text-xs font-black uppercase tracking-tight font-sans leading-tight {estilo.texto}">
                {item.nombre}
            </h2>

            <div class="text-2xl md:text-3xl font-black text-stone-900 tracking-tighter font-mono pt-1">
                {item.numero}
            </div>

            <p class="text-xs text-stone-600 font-sans normal-case leading-normal pt-2 border-t border-stone-100">
                {item.enQueAyudan}
            </p>
        </div>

        <div class="pt-2">
            <a 
                href="tel:{item.numero}" 
                class="w-full block text-white font-bold uppercase text-[11px] text-center py-3 rounded-none transition-colors select-none tracking-wider {estilo.boton}"
            >
                Llamar Ahora
            </a>
        </div>
    </div>
{/snippet}

<Hero 
    titulo="Números de"
    palabraResaltante="emergencia"
    descripcion="Si tienes una urgencia o necesitas ayuda rápida en tu comunidad, busca en esta lista. Puedes llamar directamente tocando el botón de cada tarjeta desde tu teléfono celular."
    tag="Números útiles"
    imagen="/img/hero_emergencia.webp"
    claseTextoResaltado="text-red-500"
    claseTag="bg-red-700 text-white"
    claseBordeDesc="border-red-500"
>
    <!-- Buscador limpio sin clases de diseño redundantes (el CSS global se encarga) -->
    <div class="space-y-2 max-w-xl mt-4">
        <label for="buscador" class="text-[10px] font-black text-stone-300 uppercase tracking-wider block font-mono">
            ¿Qué tipo de ayuda necesitas encontrar?
        </label>
        <input 
            id="buscador"
            type="text" 
            bind:value={loQueBusca}
            placeholder="Escribe lo que buscas (ej. bomberos, agua, ambulancia, policía)..."
            class="w-full"
        />
    </div>
</Hero>

<section id="lista-emergencias" class="w-full p-4 md:p-6 bg-white rounded-none">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#if resultadoFiltrado.length === 0}
            <div class="col-span-full p-8 text-center border border-stone-200 bg-stone-50 font-mono text-[10px] font-black text-stone-400 uppercase">
                No encontramos ningún número con esa palabra. Intenta escribir otra cosa más sencilla.
            </div>
        {:else}
            {#each resultadoFiltrado as item (item.id)}
                {@render tarjetaAyuda(item)}
            {/each}
        {/if}
    </div>
</section>
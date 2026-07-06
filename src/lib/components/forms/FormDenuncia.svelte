<script>
    import { enhance } from '$app/forms';
    let { data } = $props();

    let estadoSeleccionado = $state('');
    let municipioSeleccionado = $state('');
    let localidadSeleccionada = $state('');

    // Reactividad pura de 3 niveles con $derived
    let listaMunicipios = $derived(
        data.geografia?.find(e => e.estado === estadoSeleccionado)?.municipios || []
    );

    let listaParroquias = $derived(
        listaMunicipios.find(m => m.municipio === municipioSeleccionado)?.parroquias || []
    );

    // Limpieza en cascada ante alteraciones superiores
    $effect(() => {
        if (estadoSeleccionado) {
            municipioSeleccionado = '';
            localidadSeleccionada = '';
        }
    });

    $effect(() => {
        if (municipioSeleccionado) {
            localidadSeleccionada = '';
        }
    });
</script>

<form method="POST" action="?/registrarDenuncia" use:enhance class="bg-white p-4 border border-stone-200 rounded-none flex flex-col justify-between space-y-4 h-full">
    <div class="space-y-3">
        <div>
            <h2 class="text-xs font-black text-stone-900 uppercase tracking-wider">Denuncias</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div class="space-y-1">
                <label for="titulo" class="text-[10px] font-black text-stone-500 uppercase">Incidencia</label>
                <input type="text" id="titulo" name="titulo" required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-bold uppercase rounded-none focus:outline-none" />
            </div>
            <div class="space-y-1">
                <label for="categoria" class="text-[10px] font-black text-stone-500 uppercase">Categoría</label>
                <select id="categoria" name="categoria" required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-bold uppercase rounded-none focus:outline-none">
                    {#each data.categoriaDenuncia || [] as cat}
                        <option value={cat}>{cat}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="p-2 bg-stone-50 border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-none">
            <div class="space-y-1">
                <label for="estado" class="text-[9px] font-black text-stone-400 uppercase">Estado</label>
                <select id="estado" name="estado" bind:value={estadoSeleccionado} required class="w-full border border-stone-200 bg-white p-1 text-[11px] font-bold uppercase rounded-none focus:outline-none">
                    <option value="">SELECCIONE</option>
                    {#each data.geografia || [] as est}
                        <option value={est.estado}>{est.estado}</option>
                    {/each}
                </select>
            </div>

            <div class="space-y-1">
                <label for="municipio" class="text-[9px] font-black text-stone-400 uppercase">Municipio</label>
                <select id="municipio" name="municipio" bind:value={municipioSeleccionado} required disabled={!estadoSeleccionado} class="w-full border border-stone-200 bg-white p-1 text-[11px] font-bold uppercase rounded-none focus:outline-none disabled:bg-stone-200/50 disabled:opacity-60">
                    <option value="">SELECCIONE</option>
                    {#each listaMunicipios as mun}
                        <option value={mun.municipio}>{mun.municipio}</option>
                    {/each}
                </select>
            </div>

            <div class="space-y-1">
                <label for="parroquia" class="text-[9px] font-black text-stone-400 uppercase">Parroquia</label>
                <select id="parroquia" name="localidad" bind:value={localidadSeleccionada} required disabled={!municipioSeleccionado} class="w-full border border-stone-200 bg-white p-1 text-[11px] font-bold uppercase rounded-none focus:outline-none disabled:bg-stone-200/50 disabled:opacity-60">
                    <option value="">SELECCIONE</option>
                    {#each listaParroquias as par}
                        <option value={par}>{par}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="space-y-1">
            <label for="descripcion" class="text-[10px] font-black text-stone-500 uppercase">Hechos Observados</label>
            <textarea id="descripcion" name="descripcion" required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-mono text-stone-900 focus:outline-none rounded-none h-20 resize-none"></textarea>
        </div>
    </div>

    <div class="flex justify-end pt-2">
        <button type="submit" class="bg-stone-900 text-white px-5 py-2 text-xs font-bold uppercase rounded-none tracking-wider hover:bg-black transition">
            Denunciar
        </button>
    </div>
</form>
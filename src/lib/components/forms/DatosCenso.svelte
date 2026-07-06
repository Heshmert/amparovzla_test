<script>
    import { enhance } from '$app/forms';
    import venezuelaData from '$lib/data/venezuela.json';

    let { perfilPromesa, personaAsociadaPromesa, estatusPersona } = $props();

    let estadoSeleccionado = $state('');
    let municipioSeleccionado = $state('');
    let localidadSeleccionada = $state('');

    $effect(() => {
        personaAsociadaPromesa.then(persona => {
            if (persona) {
                estadoSeleccionado = persona.estado || '';
                municipioSeleccionado = persona.municipio || '';
                localidadSeleccionada = persona.localidad || '';
            }
        });
    });

    // Filtrado reactivo síncrono de 3 niveles utilizando $derived
    let municipiosDisponibles = $derived(
        venezuelaData.find(e => e.estado === estadoSeleccionado)?.municipios || []
    );
    let parroquiasDisponibles = $derived(
        municipiosDisponibles.find(m => m.municipio === municipioSeleccionado)?.parroquias || []
    );
</script>

<div class="space-y-4">
    {#await Promise.all([perfilPromesa, personaAsociadaPromesa])}
        <div class="bg-white border border-stone-200 p-4 rounded-none space-y-3 animate-pulse">
            <div class="h-3 bg-stone-200 w-1/3 rounded-none"></div>
            <div class="h-10 bg-stone-100 rounded-none"></div>
        </div>
    {:then [perfil, persona]}
        <!-- Alerta de Exclusión del Censo -->
        {#if !perfil.personaId}
            <div class="bg-amber-50 border border-amber-200 p-3 text-amber-800 text-[10px] font-black uppercase tracking-wide rounded-none flex items-center gap-2">
                ⚠️ ATENCIÓN: Esta cuenta no está vinculada al Censo Nacional. Complete la localización territorial para sincronizar su estado operativo.
            </div>
        {/if}

        <!-- Bloque 3: Sincronización Territorial Geográfica -->
        <div class="bg-white border border-stone-200 p-4 rounded-none w-full">
            <h3 class="text-[10px] font-black uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2 mb-4">
                3. Ubicación Territorial Geográfica (Sincronización Censo)
            </h3>
            <form method="POST" action="?/sincronizarCenso" use:enhance class="space-y-4">
                <div class="space-y-1">
                    <label for="estatusPersona" class="text-[10px] font-black uppercase text-stone-600">Estatus Operativo del Sujeto</label>
                    <select name="estatusPersona" value={persona?.estatus || 'ESTABLE'} class="w-full border border-stone-200 bg-stone-50 p-2 text-xs font-black focus:outline-none focus:border-stone-900 rounded-none">
                        {#each estatusPersona as est}
                            <option value={est}>{est.toUpperCase()}</option>
                        {/each}
                    </select>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="space-y-1">
                        <label for="estado" class="text-[10px] font-black uppercase text-stone-600">Estado</label>
                        <select name="estado" bind:value={estadoSeleccionado} onchange={() => { municipioSeleccionado = ''; localidadSeleccionada = ''; }} required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs focus:outline-none focus:border-stone-900 rounded-none">
                            <option value="">SELECCIONE ESTADO</option>
                            {#each venezuelaData as est}
                                <option value={est.estado}>{est.estado.toUpperCase()}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label for="municipio" class="text-[10px] font-black uppercase text-stone-600">Municipio</label>
                        <select name="municipio" bind:value={municipioSeleccionado} onchange={() => { localidadSeleccionada = ''; }} required disabled={!estadoSeleccionado} class="w-full border border-stone-200 bg-stone-50 p-2 text-xs focus:outline-none focus:border-stone-900 rounded-none disabled:opacity-50">
                            <option value="">SELECCIONE MUNICIPIO</option>
                            {#each municipiosDisponibles as mun}
                                <option value={mun.municipio}>{mun.municipio.toUpperCase()}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label for="localidad" class="text-[10px] font-black uppercase text-stone-600">Parroquia / Localidad</label>
                        <select name="localidad" bind:value={localidadSeleccionada} required disabled={!municipioSeleccionado} class="w-full border border-stone-200 bg-stone-50 p-2 text-xs focus:outline-none focus:border-stone-900 rounded-none disabled:opacity-50">
                            <option value="">SELECCIONE PARROQUIA</option>
                            {#each parroquiasDisponibles as par}
                                <option value={par}>{par.toUpperCase()}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="space-y-1">
                    <label for="direccionExacta" class="text-[10px] font-black uppercase text-stone-600">Dirección Domiciliaria Exacta</label>
                    <textarea name="direccionExacta" rows="3" required class="w-full border border-stone-200 bg-stone-50 p-2 text-xs focus:outline-none focus:border-stone-900 rounded-none uppercase font-medium">{persona?.direccionExacta || ''}</textarea>
                </div>

                <div class="flex justify-end">
                    <button type="submit" class="bg-stone-900 hover:bg-stone-800 text-white font-black uppercase text-[10px] tracking-wider px-5 py-2.5 rounded-none transition">
                        Sincronizar Ubicación Territorial
                    </button>
                </div>
            </form>
        </div>
    {/await}
</div>
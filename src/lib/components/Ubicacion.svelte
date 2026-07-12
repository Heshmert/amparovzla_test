<script>
    import Mapa from '$lib/data/venezuela.json';

    let estado = $state(null);
    let municipio = $state(null);
    let parroquia = $state(null);

    $effect(() => {
        if (estado) {
            municipio = null;
            parroquia = null;
        }
    });

    $effect(() => {
        if (municipio) {
            parroquia = null;
        }
    });
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <!-- Estado -->
    <div>
        <label for="estado" class=" text-[10px] font-black uppercase  mb-1">Estado</label>
        <select bind:value={estado} id="estado" name="estado">
            <option value={null}>SELECCIONE</option>
            {#each Mapa as est}
                <option value={est}>{est.estado}</option>
            {/each}
        </select>
    </div>

    <!-- Municipio -->
    <div>
        <label for="municipio" class=" text-[10px] font-black uppercase  mb-1">Municipio</label>
        <select bind:value={municipio} id="municipio" name="municipio" disabled={!estado} >
            <option value={null}>SELECCIONE</option>
            {#if estado}
                {#each estado.municipios as mun}
                    <option value={mun}>{mun.municipio}</option>
                {/each}
            {/if}
        </select>
    </div>

    <!-- Parroquia -->
    <div>
        <label for="parroquia" class=" text-[10px] font-black uppercase  mb-1">Parroquia</label>
        <select bind:value={parroquia} id="parroquia" name="localidad" disabled={!municipio}>
            <option value={null}>SELECCIONE</option>
            {#if municipio}
                {#each municipio.parroquias as par}
                    <option value={par}>{par}</option>
                {/each}
            {/if}
        </select>
    </div>
</div>
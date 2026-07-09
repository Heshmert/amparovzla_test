<script>
    import { enhance } from '$app/forms';
    import venezuelaData from '$lib/data/venezuela.json';

    let { form, data } = $props();
    let dialogRef = $state(null);
    let estadoSeleccionado = $state('');
    let municipioSeleccionado = $state('');
    let latitud = $state('8.000000');
    let longitud = $state('-66.000000');
    let cargando = $state(false);
    let solicitudProcesada = $state(null);
    let mapElement = $state(null);
    let map = null;
    let marker = null;

    let municipiosFiltrados = $derived(estadoSeleccionado ? venezuelaData.find(e => e.estado === estadoSeleccionado)?.municipios || [] : []);
    let parroquiasFiltradas = $derived(municipioSeleccionado ? municipiosFiltrados.find(m => m.municipio === municipioSeleccionado)?.parroquias || [] : []);

    function abrirModal() {
        dialogRef?.showModal();
        requestAnimationFrame(() => {
            if (typeof window !== 'undefined' && window.L && mapElement) {
                if (!map) {
                    map = window.L.map(mapElement).setView([8.0, -66.0], 6);
                    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                    map.on('click', (e) => {
                        latitud = e.latlng.lat.toFixed(6);
                        longitud = e.latlng.lng.toFixed(6);
                        if (marker) marker.setLatLng(e.latlng);
                        else marker = window.L.marker(e.latlng).addTo(map);
                    });
                }
                map.invalidateSize();
            }
        });
    }
</script>

<dialog bind:this={dialogRef} class="m-auto w-[90%] max-w-4xl bg-white p-6 shadow-2xl rounded-none border border-stone-200 backdrop:bg-stone-900/60 backdrop-blur-sm">
    {#if solicitudProcesada}
        <div class="text-center py-10 space-y-4">
            <h3 class="font-black text-xs text-emerald-800 uppercase">Registrado con éxito</h3>
            <p class="text-xs font-mono bg-stone-100 p-2 border border-stone-200">{solicitudProcesada}</p>
            <a href="https://t.me/share/url?url={solicitudProcesada}" target="_blank" class="inline-block bg-[#229ED9] text-white px-6 py-2 font-black uppercase text-[10px]">Enviar a Telegram</a>
        </div>
    {:else}
        <form method="POST" action="?/crearEntidad" use:enhance={() => {
            cargando = true;
            return async ({ update, result }) => {
                await update(); 
                cargando = false;
                if (result.type === 'success') solicitudProcesada = result.data.codigo;
            };
        }} class="space-y-4">
            
            <h3 class="font-black uppercase text-[10px] border-b border-stone-200 pb-2 mb-4 text-stone-600">Postular Organización</h3>

            {#if form?.error}
                <div class="bg-red-50 text-red-700 border border-red-200 p-2 text-[10px] font-black uppercase">⚠️ {form.error}</div>
            {/if}

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                    <label for="nombre" class="text-[10px] font-black uppercase text-stone-600">Nombre</label>
                    <input name="nombre" required class="w-full border border-stone-200 p-2 text-xs uppercase focus:outline-none focus:border-stone-400" />
                </div>

                <div class="space-y-1">
                    <label for="tipo" class="text-[10px] font-black uppercase text-stone-600">Tipo</label>
                        <select name="tipo" class="w-full border border-stone-200 p-2 text-xs uppercase focus:outline-none focus:border-stone-400 bg-white" required>
                            <option value="" disabled selected>SELECCIONE...</option>
                            
                            {#if data.tipoEntidad}
                                {#each data.tipoEntidad as tipo}
                                    <!-- Como es un array de strings, el valor y la etiqueta son la variable 'tipo' -->
                                    <option value={tipo}>{tipo}</option>
                                {/each}
                            {/if}
                        </select>
                </div>

                <div class="space-y-1">
                    <label class="text-[10px] font-black uppercase text-stone-600">Teléfonos (Principal/Secundario)</label>
                    <div class="grid grid-cols-2 gap-2">
                        <input name="telefonoPrincipal" required class="border border-stone-200 p-2 text-xs focus:outline-none focus:border-stone-400" placeholder="Principal" />
                        <input name="telefonoSecundario" class="border border-stone-200 p-2 text-xs focus:outline-none focus:border-stone-400" placeholder="Secundario" />
                    </div>
                </div>

                <div class="space-y-1">
                    <label for="emailContacto" class="text-[10px] font-black uppercase text-stone-600">Email</label>
                    <input name="emailContacto" type="email" required class="w-full border border-stone-200 p-2 text-xs focus:outline-none focus:border-stone-400" />
                </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
                <select bind:value={estadoSeleccionado} name="estado" class="border border-stone-200 p-2 text-xs uppercase focus:outline-none" required>
                    <option value="">ESTADO</option>
                    {#each venezuelaData as e}<option value={e.estado}>{e.estado}</option>{/each}
                </select>
                <select bind:value={municipioSeleccionado} name="municipio" class="border border-stone-200 p-2 text-xs uppercase focus:outline-none" required disabled={!estadoSeleccionado}>
                    <option value="">MUNICIPIO</option>
                    {#each municipiosFiltrados as m}<option value={m.municipio}>{m.municipio}</option>{/each}
                </select>
                <select name="localidad" class="border border-stone-200 p-2 text-xs uppercase focus:outline-none" required disabled={!municipioSeleccionado}>
                    <option value="">PARROQUIA</option>
                    {#each parroquiasFiltradas as p}<option value={p}>{p}</option>{/each}
                </select>
            </div>
            
            <textarea name="direccionExacta" placeholder="Dirección exacta" class="w-full border border-stone-200 p-2 text-xs focus:outline-none focus:border-stone-400 h-20" required></textarea>

            <div class="flex flex-col gap-2">
                <div bind:this={mapElement} class="w-full h-40 bg-stone-50 border border-stone-200"></div>
                <div class="grid grid-cols-2 gap-2 text-[9px] font-mono text-stone-400">
                    <div class="bg-stone-50 p-1 border border-stone-200">LAT: {latitud}</div>
                    <div class="bg-stone-50 p-1 border border-stone-200">LNG: {longitud}</div>
                </div>
                <input type="hidden" name="latitud" value={latitud} />
                <input type="hidden" name="longitud" value={longitud} />
            </div>

            <button type="submit" disabled={cargando} class="w-full bg-stone-900 text-white p-3 font-black uppercase text-xs hover:bg-stone-800 transition">
                {cargando ? 'REGISTRANDO...' : 'Registrar Organización'}
            </button>
        </form>
    {/if}
</dialog>

    <div class="bg-white border border-stone-200 p-6 md:p-8 rounded-none shadow-xs space-y-4 md:space-y-0 md:flex md:items-start md:justify-between">
        <div class="space-y-2">
            <h1 class="text-2xl md:text-4xl font-black text-stone-900 uppercase tracking-tight">
                Esperamos que te encuentres bien
            </h1>
            <p class="text-xs md:text-sm text-stone-600 max-w-2xl font-medium leading-relaxed">
                Plataforma para la coordinación civil de contingencias. Desde aquí puedes registrar aportes, gestionar solicitudes reportar novedades en tiempo real.
            </p>
        </div>
        <div class="pt-2 md:pt-0 shrink-0">
            {#if data.user && data.user.rol !== 'ENCARGADO' && data.user.rol !== 'ADMIN'}
                <button onclick={abrirModal} type="button" class="bg-stone-900 text-white font-black uppercase text-xs p-3 hover:bg-stone-800 transition rounded-none">
            Postular Organización
</button>
            {/if}
        </div>
    </div>





    <div class="bg-stone-900 text-white p-6 rounded-none shadow-xs space-y-4">
        <div class="border-b border-stone-800 pb-3">
            <span class="text-[9px] font-black uppercase text-amber-500 tracking-wider">En Desarrollo</span>
            <h3 class="text-base font-black uppercase tracking-tight">Próximos Módulos de la Plataforma</h3>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            

            <div class="p-4 bg-stone-850 border border-stone-800 space-y-2">
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-black uppercase tracking-wider text-emerald-400">Atención Animal</span>
                </div>
                <p class="text-xs font-bold text-stone-200">AMOR ANIMAL</p>
                <p class="text-[11px] text-stone-400 leading-normal">Refugios para mascotas extraviadas, atención veterinaria de emergencia y bancos de alimento animal.</p>
            </div>



            <div class="p-4 bg-stone-850 border border-stone-800 space-y-2">
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-black uppercase tracking-wider text-purple-400">Control</span>
                </div>
                <p class="text-xs font-bold text-stone-200">GESTION DE SERVICIOS</p>
                <p class="text-[11px] text-stone-400 leading-normal">ofrece servicios de salud mental, entretenimiento, rescate entre otros</p>
            </div>

        </div>
    </div>

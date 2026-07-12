<script>
    import { enhance } from '$app/forms';
  import Header from '$lib/components/Header.svelte';
  import Ubicacion from '$lib/components/Ubicacion.svelte';
    import actualizaciones from '$lib/data/actualizaciones.json';

    let { form, data } = $props();
    let dialogRef = $state(null);
    let latitud = $state('8.000000');
    let longitud = $state('-66.000000');
    let cargando = $state(false);
    let solicitudProcesada = $state(null);
    let mapElement = $state(null);
    let map = null;
    let marker = null;

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

            <Ubicacion />
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

<Header
titulo="Esperamos que te encuentres bien"
descripcion=""
info=""
/>




<section id="bitacora-cambios" class="w-full bg-stone-50 border border-stone-200 p-6 rounded-none space-y-6">
    
    <div class="flex pb-4 border-b border-stone-200">
        <div class="bg-blue-700 p-3 text-white">
            <div>
                <h3 class="text-xs font-black uppercase tracking-tight">
                    Descubre lo nuevo en la plataforma
                </h3>
            </div>

        </div>
        <div class="pt-2 md:pt-0 shrink-0">
            {#if data.user && data.user.rol !== 'ENCARGADO' && data.user.rol !== 'ADMIN'}
                <button onclick={abrirModal} type="button" class="bg-stone-900 text-white font-black uppercase text-xs p-3 hover:bg-stone-800 transition rounded-none">
                    Postular Organización
                </button>
            {/if}
        </div>
        
    </div>

    <div class="w-full space-y-4 font-sans">
    {#each actualizaciones as item (item.titulo + item.fecha)}
        <div class="p-6 border rounded-none flex flex-col md:flex-row gap-6 justify-between items-start
            {item.categoria === 'Novedad' ? 'bg-emerald-600 border-emerald-700 text-white' : 
             item.categoria === 'Arreglo' ? 'bg-red-600 border-red-700 text-white' : 
             'bg-amber-400 border-amber-500 text-stone-950'}">
            
            <div class="space-y-3 md:w-48 w-full flex-shrink-0">
                <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border border-current rounded-none">
                        {item.categoria}
                    </span>
                    <span class="text-[10px] font-mono font-bold opacity-80">
                        {item.fecha}
                    </span>
                </div>
                
                <div class="text-[11px] font-mono uppercase tracking-wider font-black opacity-90">
                    {item.referencia}
                    <br />
                    <span class="text-[10px] font-mono font-bold opacity-80">
                        {item.autor}
                </span>
                </div>
                
            </div>

            <div class="space-y-1.5 flex-1 w-full md:border-l md:border-current/20 md:pl-6">
                <h4 class="text-sm font-black uppercase tracking-tight leading-tight">
                    {item.titulo}
                </h4>
                <p class="text-xs normal-case leading-relaxed font-medium opacity-95">
                    {item.descripcion}
                </p>
                
               
            </div>

        </div>
    {/each}
</div>
</section>
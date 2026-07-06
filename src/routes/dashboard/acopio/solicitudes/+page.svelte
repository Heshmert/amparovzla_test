<script>
    import { enhance } from '$app/forms';
    import Header from '$lib/components/Header.svelte';

    let { data, form } = $props();

    // Estado de la navegación interna por pestañas
    let tabActivo = $state('GLOBALES'); 
    let loteSeleccionado = $state(null);

    // Estado del formulario dinámico reactivo
    let filasFormulario = $state([{ categoria: '', recursoId: '', cantidad: 1 }]);

    function agregarFilaAlForm() {
        filasFormulario.push({ categoria: '', recursoId: '', cantidad: 1 });
    }

    function removerFilaDelForm(index) {
        if (filasFormulario.length > 1) {
            filasFormulario.splice(index, 1);
        }
    }

    // Comprobación limpia: si ya está seleccionado en OTRA fila, lo ocultamos por completo
    function esRecursoYaSeleccionado(recursoId, filaIndexActual) {
        if (!recursoId) return false;
        return filasFormulario.some((f, idx) => idx !== filaIndexActual && f.recursoId === recursoId);
    }

    // Transformador y agrupador estricto para reconstruir la lógica de lotes en la vista
    function agruparPorLote(listaPlana) {
        const grupos = {};
        listaPlana.forEach(item => {
            if (!grupos[item.lote]) {
                grupos[item.lote] = {
                    lote: item.lote,
                    codigo: item.codigo.split('-').slice(0, 2).join('-'),
                    centroNombre: item.centroNombre,
                    ubicacionCorta: `${item.estado} — ${item.municipio}`,
                    estado: item.estado,
                    municipio: item.municipio,
                    localidad: item.localidad,
                    direccionExacta: item.direccionExacta,
                    latitud: item.latitud,
                    longitud: item.longitud,
                    estatus: item.estatus,
                    createdAt: item.createdAt,
                    telefonoPrincipal: item.telefonoPrincipal,
                    telefonoSecundario: item.telefonoSecundario,
                    emailContacto: item.emailContacto,
                    descripcion: item.descripcion || 'Sin observaciones cargadas.',
                    items: []
                };
            }
            grupos[item.lote].items.push({
                recurso: item.recursoNombre,
                categoria: item.recursoCategoria,
                cantidad: item.cantidad
            });
        });
        return Object.values(grupos);
    }
</script>

<Header 
    titulo="Centro de Distribución e Insumos" 
    descripcion="Monitoreo, registro e intercambio masivo de recursos asistenciales organizados por lotes de carga." 
    info=""
    error={form?.error}
    exito={form?.exito}
/>


<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
    
    <div class="bg-white border border-stone-200 p-4 rounded-none space-y-4">
        <h3 class="text-[10px] font-black uppercase tracking-wider text-stone-900 bg-stone-50 p-2 border-l-2 border-stone-900">
            Nuevo Requerimiento (Lote)
        </h3>

        <form method="POST" action="?/crearSolicitudAgrupada" use:enhance={() => {
            return async ({ update }) => {
                await update();
                filasFormulario = [{ categoria: '', recursoId: '', cantidad: 1 }];
            };
        }} class="space-y-4">
            
            {#await data.streamed.recursos}
                <p class="text-[10px] text-stone-400 uppercase animate-pulse">Sincronizando clasificaciones...</p>
            {:then listaMaestraRecursos}
                <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {#each filasFormulario as fila, i}
                        <div class="p-2 bg-stone-50/60 border border-stone-200 space-y-2 relative">
                            
                            {#if filasFormulario.length > 1}
                                <button type="button" onclick={() => removerFilaDelForm(i)} class="absolute top-1 right-1 bg-stone-900 text-white font-bold w-5 h-5 flex items-center justify-center text-xs rounded-none hover:bg-stone-800 transition-colors" title="Remover Línea">
                                    -
                                </button>
                            {/if}

                            <div>
                                <label class="text-[9px] font-black text-stone-500 uppercase block mb-0.5">Categoría General</label>
                                <select bind:value={fila.categoria} onclick={() => fila.recursoId = ''} required class="w-full border border-stone-200 p-1 text-[11px] rounded-none focus:outline-none focus:border-stone-900 bg-white uppercase">
                                    <option value="">SELECCIONE...</option>
                                    <option value="MEDICAMENTO">MEDICAMENTO</option>
                                    <option value="ALIMENTOS">ALIMENTOS</option>
                                    <option value="VESTIMENTA">VESTIMENTA</option>
                                    <option value="HERRAMIENTAS">HERRAMIENTAS / LOGÍSTICA</option>
                                </select>
                            </div>

                            <div class="grid grid-cols-12 gap-1">
                                <div class="col-span-9">
                                    <label class="text-[9px] font-black text-stone-500 uppercase block mb-0.5">Especificación del Insumo</label>
                                    <select name="recursoId" bind:value={fila.recursoId} disabled={!fila.categoria} required class="w-full border border-stone-200 p-1 text-[11px] rounded-none focus:outline-none focus:border-stone-900 bg-white disabled:opacity-40 uppercase">
                                        <option value="">SELECCIONE INSUMO...</option>
                                        {#each listaMaestraRecursos.filter(r => r.categoria === fila.categoria && !esRecursoYaSeleccionado(r.id, i)) as r}
                                            <option value={r.id}>{r.nombre}</option>
                                        {/each}
                                    </select>
                                </div>
                                <div class="col-span-3">
                                    <label class="text-[9px] font-black text-stone-500 uppercase block mb-0.5">Cant.</label>
                                    <input type="number" name="cantidad" bind:value={fila.cantidad} min="1" required class="w-full border border-stone-200 p-1 text-[11px] rounded-none text-center focus:outline-none focus:border-stone-900 bg-white" />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/await}

            <button type="button" onclick={agregarFilaAlForm} class="w-full border border-dashed border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900 py-1 text-[9px] font-black uppercase rounded-none transition-colors">
                + Añadir Item Al Bloque
            </button>

            <div class="space-y-1">
                <label class="text-[10px] font-black uppercase text-stone-600">Justificación Técnica o Situacional</label>
                <textarea name="descripcion" placeholder="Indique prioridades operativas..." class="w-full border border-stone-200 bg-stone-50 p-2 text-xs h-16 focus:outline-none focus:border-stone-900 rounded-none uppercase"></textarea>
            </div>

            <button type="submit" class="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold uppercase text-[10px] p-2.5 tracking-wide rounded-none transition-colors">
                Insertar Solicitud Colectiva
            </button>
        </form>
    </div>

    <div class="lg:col-span-2 bg-white border border-stone-200 p-4 rounded-none space-y-4">
        
        <div class="flex border-b border-stone-200 bg-stone-50 p-1 gap-1">
            <button onclick={() => tabActivo = 'GLOBALES'} class="px-3 py-1.5 text-[10px] font-black uppercase rounded-none tracking-tight transition-all {tabActivo === 'GLOBALES' ? 'bg-white border-x border-t border-stone-200 text-stone-900 font-black' : 'text-stone-500 hover:text-stone-900'}">
                Requerimientos Externos
            </button>
            <button onclick={() => tabActivo = 'MIS_SOLICITUDES'} class="px-3 py-1.5 text-[10px] font-black uppercase rounded-none tracking-tight transition-all {tabActivo === 'MIS_SOLICITUDES' ? 'bg-white border-x border-t border-stone-200 text-stone-900 font-black' : 'text-stone-500 hover:text-stone-900'}">
                Mis Solicitudes Emitidas
            </button>
            <button onclick={() => tabActivo = 'FINALIZADAS'} class="px-3 py-1.5 text-[10px] font-black uppercase rounded-none tracking-tight transition-all {tabActivo === 'FINALIZADAS' ? 'bg-white border-x border-t border-stone-200 text-stone-900 font-black' : 'text-stone-500 hover:text-stone-900'}">
                Histórico Cerrado (Nacional)
            </button>
        </div>

        <div class="pt-1">
            {#if tabActivo === 'GLOBALES'}
                {#await data.streamed.globalesActivas}
                    <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest animate-pulse p-4 text-center">Leyendo registros activos en la red...</p>
                {:then lista}
                    {@const lotes = agruparPorLote(lista)}
                    {#if lotes.length === 0}
                        <p class="text-xs italic text-stone-400 p-2 uppercase">No se registran solicitudes externas pendientes de procesamiento.</p>
                    {:else}
                        {@render tablaSolicitudes(lotes, false)}
                    {/if}
                {/await}
            {:else}
                {#if tabActivo === 'MIS_SOLICITUDES'}
                    {#await data.streamed.misSolicitudes}
                        <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest animate-pulse p-4 text-center">Compilando solicitudes locales...</p>
                    {:then lista}
                        {@const lotes = agruparPorLote(lista)}
                        {#if lotes.length === 0}
                            <p class="text-xs italic text-stone-400 p-2 uppercase">Usted no posee requerimientos activos generados.</p>
                        {:else}
                            {@render tablaSolicitudes(lotes, true)}
                        {/if}
                    {/await}
                {:else}
                    {#await data.streamed.finalizadas}
                        <p class="text-[10px] font-black text-stone-400 uppercase tracking-widest animate-pulse p-4 text-center">Buscando histórico consolidado...</p>
                    {:then lista}
                        {@const lotes = agruparPorLote(lista)}
                        {#if lotes.length === 0}
                            <p class="text-xs italic text-stone-400 p-2 uppercase">No se localizan lotes cerrados en este periodo.</p>
                        {:else}
                            {@render tablaSolicitudes(lotes, false)}
                        {/if}
                    {/await}
                {/if}
            {/if}
        </div>
    </div>
</div>

{#snippet tablaSolicitudes(lotes, permitirFinalizar)}
    <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
            <thead class="bg-stone-50 border-b border-stone-200 text-[10px] font-black text-stone-600 uppercase tracking-wider">
                <tr>
                    <th class="p-2">ID Lote</th>
                    <th class="p-2">Centro Solicitante</th>
                    <th class="p-2">Ubicación Primaria</th>
                    <th class="p-2">Insumos Solicitados</th>
                    <th class="p-2 text-right">Acciones</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-stone-100 text-xs uppercase font-medium">
                {#each lotes as lote}
                    <tr class="hover:bg-stone-50/60 transition-colors">
                        <td class="p-2 font-mono font-bold text-stone-900">{lote.codigo}</td>
                        <td class="p-2 text-stone-900 tracking-tight">{lote.centroNombre}</td>
                        <td class="p-2 text-[11px] text-stone-500 font-mono">{lote.ubicacionCorta}</td>
                        <td class="p-2">
                            <div class="flex flex-wrap gap-1">
                                {#each lote.items as item}
                                    <span class="bg-stone-100 border border-stone-200 px-1 text-[9px] font-black text-stone-700">
                                        {item.cantidad} x {item.recurso}
                                    </span>
                                {/each}
                            </div>
                        </td>
                        <td class="p-2 text-right space-x-2 whitespace-nowrap">
                            <button onclick={() => loteSeleccionado = lote} class="text-blue-700 font-bold hover:underline text-[10px]">VER MÁS</button>
                            {#if permitirFinalizar && lote.estatus === 'PENDIENTE'}
                                <form method="POST" action="?/finalizarLote" use:enhance class="inline">
                                    <input type="hidden" name="lote" value={lote.lote} />
                                    <button type="submit" class="text-emerald-700 font-black hover:underline text-[10px]">FINALIZAR</button>
                                </form>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div class="flex justify-between items-center pt-4 border-t border-stone-200 mt-2">
        <span class="text-[9px] font-mono text-stone-400 uppercase tracking-tight">Segmento de Carga: Página {data.pagina} (Max 100 Filas)</span>
        <div class="flex gap-1">
            <a href="?page={data.pagina - 1}" class="bg-stone-950 text-white font-black text-[10px] uppercase p-1 px-3.5 tracking-tighter rounded-none transition-all hover:bg-stone-800 {data.pagina <= 1 ? 'opacity-20 pointer-events-none' : ''}">
                ANTERIOR
            </a>
            <a href="?page={data.pagina + 1}" class="bg-stone-950 text-white font-black text-[10px] uppercase p-1 px-3.5 tracking-tighter rounded-none transition-all hover:bg-stone-800">
                SIGUIENTE
            </a>
        </div>
    </div>
{/snippet}

{#if loteSeleccionado}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
        <div class="bg-white p-5 w-full max-w-xl border border-stone-200 shadow-2xl rounded-none space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div class="border-b border-stone-200 pb-2 flex justify-between items-center">
                <h4 class="font-black text-[10px] uppercase tracking-wider text-stone-500">Expediente de Transacciones Logísticas</h4>
                <span class="font-mono text-[10px] px-2 py-0.5 bg-stone-900 text-white font-bold">{loteSeleccionado.codigo}</span>
            </div>

            <div class="space-y-1">
                <span class="font-black uppercase text-[10px] text-stone-900 block border-b border-stone-100 pb-0.5">Canales de Enlace y Contacto</span>
                <div class="bg-stone-50 border border-stone-200 p-2 text-xs space-y-1.5 font-mono">
                    <p><span class="font-black uppercase text-[9px] text-stone-400 block">Centro Solicitante:</span> <span class="font-bold text-stone-900 text-xs">{loteSeleccionado.centroNombre}</span></p>
                    <p><span class="font-black uppercase text-[9px] text-stone-400 block">Teléfono de Contacto Principal (Requerido):</span> <span class="font-bold text-stone-900">{loteSeleccionado.telefonoPrincipal}</span></p>
                    
                    {#if loteSeleccionado.telefonoSecundario}
                        <p><span class="font-black uppercase text-[9px] text-stone-400 block">Teléfono Alternativo / Secundario:</span> <span class="text-stone-700">{loteSeleccionado.telefonoSecundario}</span></p>
                    {/if}
                    
                    {#if loteSeleccionado.emailContacto}
                        <p><span class="font-black uppercase text-[9px] text-stone-400 block">Dirección Electrónica Institucional:</span> <span class="text-stone-700 lowercase">{loteSeleccionado.emailContacto}</span></p>
                    {/if}
                </div>
            </div>

            <div class="space-y-1">
                <span class="font-black uppercase text-[10px] text-stone-900 block border-b border-stone-100 pb-0.5">Desglose Geopolítico y Coordenadas</span>
                <ul class="bg-stone-50 border border-stone-200 p-2 text-[11px] font-mono list-none space-y-1 uppercase">
                    <li><span class="font-black text-stone-400 text-[9px] mr-1">[ESTADO]:</span> <span class="text-stone-900 font-bold">{loteSeleccionado.estado}</span></li>
                    <li><span class="font-black text-stone-400 text-[9px] mr-1">[MUNICIPIO]:</span> <span class="text-stone-900 font-bold">{loteSeleccionado.municipio}</span></li>
                    <li><span class="font-black text-stone-400 text-[9px] mr-1">[PARROQUIA / LOCALIDAD]:</span> <span class="text-stone-800">{loteSeleccionado.localidad}</span></li>
                    <li><span class="font-black text-stone-400 text-[9px] mr-1">[DIRECCIÓN EXACTA]:</span> <span class="text-stone-700 block normal-case mt-0.5 bg-white p-1.5 border border-stone-100">{loteSeleccionado.direccionExacta}</span></li>
                    
                    {#if loteSeleccionado.latitud && loteSeleccionado.longitud}
                        <li class="pt-1 border-t border-stone-200/60"><span class="font-black text-stone-400 text-[9px] mr-1">[COORDENADAS RADAR]:</span> <span class="text-stone-900 font-bold">{loteSeleccionado.latitud} , {loteSeleccionado.longitud}</span></li>
                    {/if}
                </ul>
            </div>

            <div class="space-y-1">
                <span class="font-black uppercase text-[9px] text-stone-400 block">Notas de Campo Adicionales:</span>
                <span class="italic text-stone-600 block bg-stone-50 p-2 border border-stone-100 uppercase text-xs font-mono">{loteSeleccionado.descripcion}</span>
            </div>

            <div class="space-y-1.5">
                <span class="font-black uppercase text-[10px] text-stone-900 block border-b border-stone-100 pb-0.5">Inventario Consolidado del Lote</span>
                <table class="w-full text-left border-collapse border border-stone-200 text-[11px]">
                    <thead class="bg-stone-50 text-[9px] font-black text-stone-500 uppercase">
                        <tr>
                            <th class="p-1.5 border border-stone-200">Ítem / Insumo</th>
                            <th class="p-1.5 border border-stone-200">Clasificación</th>
                            <th class="p-1.5 border border-stone-200 text-center">Cant.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each loteSeleccionado.items as item}
                            <tr class="border-b border-stone-100 uppercase font-mono">
                                <td class="p-1.5 font-bold text-stone-800">{item.recurso}</td>
                                <td class="p-1.5 text-[10px] text-stone-500">{item.categoria}</td>
                                <td class="p-1.5 text-center font-bold text-stone-900 bg-stone-50/50">{item.cantidad}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <div class="p-3 bg-stone-900 text-stone-50 border border-stone-800 text-[10px] font-bold uppercase tracking-tight leading-normal rounded-none font-mono">
                ⚠️ AVISO OPERACIONAL: Actualmente la asignación de vehículos y el control logístico de transporte se gestiona por fuera de la plataforma. Nos encontramos desarrollando el módulo de vinculación automatizado de flotas. Debe comunicarse directamente con los números telefónicos arriba provistos para acordar los traslados de manera independiente.
            </div>

            <button onclick={() => loteSeleccionado = null} class="w-full bg-stone-900 hover:bg-stone-800 text-white py-2 uppercase font-black text-[10px] tracking-wide transition-colors rounded-none">
                Cerrar Monitor de Expediente
            </button>
        </div>
    </div>
{/if}
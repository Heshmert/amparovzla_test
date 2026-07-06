<!-- IngresoDonacion.svelte -->
<script>
    import { enhance } from '$app/forms';

    // Props estructuradas mediante Svelte 5 runes
    let { listaRecursos = [], form } = $props();

    // Estados reactivos internos del flujo
    let fase = $state('busqueda'); // 'busqueda' | 'recursos'
    let donante = $state(null);
    let cedulaInput = $state('');
    let cargandoBuscar = $state(false);
    let cargandoGuardar = $state(false);

    // Listado dinámico de filas de recursos donados
    let filas = $state([
        { recursoId: '', cantidad: 1 }
    ]);

    // Validación reactiva en tiempo de diseño
    let formularioValido = $derived(
        filas.length > 0 && filas.every(f => f.recursoId !== '' && f.cantidad > 0)
    );

    function agregarFila() {
        filas.push({ recursoId: '', cantidad: 1 });
    }

    function eliminarFila(index) {
        if (filas.length > 1) {
            filas.splice(index, 1);
        }
    }

    function resetearFlujo() {
        fase = 'busqueda';
        donante = null;
        cedulaInput = '';
        filas = [{ recursoId: '', cantidad: 1 }];
    }

    // Interceptamos la respuesta del servidor usando la potencia de use:enhance
    function manejarRespuestaBusqueda() {
        cargandoBuscar = true;
        return async ({ result, update }) => {
            await update({ reset: false });
            cargandoBuscar = false;
            
            if (result.data?.donanteEncontrado) {
                donante = result.data.donanteEncontrado;
                fase = 'recursos';
            }
        };
    }

    function manejarRespuestaGuardar() {
        cargandoGuardar = true;
        return async ({ result, update }) => {
            await update();
            cargandoGuardar = false;
            if (result.type === 'success' || result.data?.exito) {
                resetearFlujo();
            }
        };
    }
</script>

<div class="bg-white border border-stone-200 p-4 rounded-none w-full max-w-2xl mx-auto">
    <!-- Encabezado Estilo Industrial -->
    <div class="border-b border-stone-200 pb-2 mb-4 flex justify-between items-center">
        <h2 class="text-xs font-black uppercase tracking-wider text-stone-900 font-mono">
            📥 Recepción de Recursos (Inyección por Donación)
        </h2>
        {#if fase === 'recursos'}
            <button type="button" onclick={resetearFlujo} class="text-[10px] font-black uppercase text-blue-700 hover:underline">
                ← Cambiar Donante
            </button>
        {/if}
    </div>

    <!-- FASE 1: BÚSQUEDA Y VERIFICACIÓN DEL DONANTE -->
    {#if fase === 'busqueda'}
        <form method="POST" action="?/verificarDonante" use:enhance={manejarRespuestaBusqueda} class="space-y-3">
            <div class="space-y-1">
                <label for="cedula" class="text-[10px] font-black uppercase text-stone-500 block font-mono">
                    Cédula de Identidad del Donante:
                </label>
                <div class="flex gap-1">
                    <span class="bg-stone-100 border border-stone-200 px-3 py-1.5 text-xs font-bold text-stone-600 font-mono flex items-center rounded-none">V-</span>
                    <input 
                        type="text" 
                        id="cedula"
                        name="cedula" 
                        bind:value={cedulaInput}
                        required
                        placeholder="24123456" 
                        class="w-full border border-stone-200 bg-white p-1.5 text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-stone-900 rounded-none uppercase"
                    />
                </div>
            </div>

            {#if form?.errorBuscar}
                <div class="p-2 bg-red-50 border border-red-200 text-red-700 text-[10px] font-black uppercase rounded-none font-mono">
                    ⚠️ {form.errorBuscar}: {form.mensaje || ''}
                </div>
                {#if form.cedulaNoEncontrada}
                    <div class="bg-stone-50 p-2 border border-stone-200 text-xs">
                        <p class="text-stone-600 font-medium mb-1">Para continuar, este ciudadano debe estar registrado en el sistema.</p>
                        <a href="/personas/nuevo?cedula={form.cedulaNoEncontrada}" class="text-[10px] bg-stone-950 text-white font-black uppercase px-2 py-1 inline-block hover:bg-stone-800 rounded-none tracking-tight">
                            ➡️ Ir al Censo de Personas
                        </a>
                    </div>
                {/if}
            {/if}

            <button 
                type="submit" 
                disabled={cargandoBuscar || !cedulaInput}
                class="w-full bg-stone-900 text-white py-2 text-[10px] font-black uppercase tracking-wider hover:bg-black rounded-none disabled:bg-stone-200 disabled:text-stone-400 transition"
            >
                {cargandoBuscar ? 'Consultando Censo General...' : 'Verificar e Identificar Donante'}
            </button>
        </form>

    <!-- FASE 2: CARGA MASIVA DE MATERIALES -->
    {:else if fase === 'recursos' && donante}
        <div class="bg-stone-50 p-2 border border-stone-200 mb-4 text-xs font-mono">
            <span class="text-[9px] font-black text-stone-400 block uppercase">DONANTE ASIGNADO</span>
            <div class="flex justify-between items-center">
                <span class="font-black text-stone-900 uppercase">{donante.nombre} {donante.apellido || ''}</span>
                <span class="text-stone-500 font-bold">V-{donante.cedula}</span>
            </div>
        </div>

        <form method="POST" action="?/registrarDonacionMasiva" use:enhance={manejarRespuestaGuardar} class="space-y-4">
            <!-- Valores ocultos obligatorios para empaquetar el envío -->
            <input type="hidden" name="personasId" value={donante.id} />
            <input type="hidden" name="items" value={JSON.stringify(filas)} />

            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-[10px] font-black uppercase text-stone-500 font-mono block">Recursos a Agregar:</span>
                    <button type="button" onclick={agregarFila} class="text-[9px] bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 font-black uppercase px-2 py-0.5 rounded-none font-mono">
                        ➕ Añadir Ítem
                    </button>
                </div>

                <!-- Tabla de filas dinámicas de alta densidad -->
                <div class="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                    {#each filas as fila, i}
                        <div class="flex items-center gap-1 bg-white border border-stone-200 p-1">
                            <div class="w-8 h-6 bg-stone-50 border-r border-stone-200 flex items-center justify-center text-[10px] font-mono font-black text-stone-400">
                                #{i + 1}
                            </div>
                            
                            <select 
                                bind:value={fila.recursoId}
                                required
                                class="flex-1 border-0 bg-transparent p-1 text-xs font-bold text-stone-900 focus:outline-none rounded-none uppercase font-mono"
                            >
                                <option value="" disabled selected>SELECCIONE UN RECURSO...</option>
                                {#each listaRecursos as rec}
                                    <option value={rec.id}>{rec.nombre} ({rec.categoria})</option>
                                {/each}
                            </select>

                            <input 
                                type="number" 
                                min="1" 
                                bind:value={fila.cantidad}
                                required
                                placeholder="Cant"
                                class="w-16 border-l border-stone-200 bg-transparent p-1 text-xs font-mono font-black text-right text-stone-900 focus:outline-none"
                            />

                            <button 
                                type="button" 
                                onclick={() => eliminarFila(i)}
                                disabled={filas.length === 1}
                                class="p-1 text-stone-400 hover:text-red-700 disabled:opacity-20 transition"
                                title="Eliminar fila"
                            >
                                ✕
                            </button>
                        </div>
                    {/each}
                </div>
            </div>

            <button 
                type="submit" 
                disabled={cargandoGuardar || !formularioValido}
                class="w-full bg-stone-900 text-white py-2.5 text-[10px] font-black uppercase tracking-wider hover:bg-black rounded-none disabled:bg-stone-200 disabled:text-stone-400 transition"
            >
                {cargandoGuardar ? 'Registrando en Libros...' : 'Confirmar e Inyectar Donación Masiva'}
            </button>
        </form>
    {/if}
</div>
<script>
    import html2canvas from 'html2canvas';
    import { tick } from 'svelte';

    let { persona, open = $bindable(false) } = $props();
    let dialogRef = $state(null);
    let exportRef = $state(null);
    let procesandoImagen = $state(false);

    $effect(() => {
        if (!dialogRef) return;
        if (open) {
            if (!dialogRef.open) dialogRef.showModal();
        } else {
            if (dialogRef.open) dialogRef.close();
        }
    });

    async function generarReporteImagen() {
        if (!persona || persona.estatus === 'BIEN' || procesandoImagen) return;
        
        procesandoImagen = true;
        
        try {
            await tick();

            if (!exportRef) {
                alert("Error: El contenedor de exportación no está listo.");
                return;
            }

            const canvas = await html2canvas(exportRef, {
                width: 1080,
                height: 1350,
                scale: 1, 
                useCORS: true, 
                allowTaint: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const link = document.createElement('a');
            link.download = `ALERTA_${persona.estatus}_${persona.nombre}_${persona.apellido}.png`.toUpperCase();
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error detallado de html2canvas:", error);
            alert(`Error al generar la imagen: ${error.message}`);
        } finally {
            procesandoImagen = false;
        }
    }
</script>

<dialog 
    bind:this={dialogRef} 
    onclose={() => open = false}
    class="backdrop:bg-stone-900/40 backdrop:backdrop-blur-xs m-auto bg-white border border-stone-900 rounded-none w-[95%] max-w-4xl p-0 shadow-2xl"
>
    {#if persona}
        <div class="bg-slate-900 text-white p-4 flex justify-between items-center rounded-none border-b border-stone-800">
            <h3 class="text-xs font-black uppercase tracking-tight">Expediente de Población Civil</h3>
            <button onclick={() => open = false} type="button" class="text-stone-400 hover:text-white font-black text-sm transition-colors">✕</button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-12 text-xs font-sans text-stone-900">
            
            <div class="p-4 space-y-4 md:col-span-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-stone-700 bg-stone-50 p-3 border border-stone-200 rounded-none">
                        <div class="space-y-0.5">
                            <span class="block text-[9px] font-black text-stone-400 uppercase">Ciudadano</span>
                            <p class="font-bold text-stone-900 uppercase text-xs">{persona.nombre} {persona.apellido}</p>
                        </div>
                        <div class="space-y-0.5">
                            <span class="block text-[9px] font-black text-stone-400 uppercase">Características</span>
                            <p class="text-stone-800 text-[11px] font-bold uppercase">
                                {persona.genero === 'M' ? 'MASCULINO' : 'FEMENINO'} | {persona.fechaNacimiento || 'N/A'}
                            </p>
                        </div>
                        <div class="space-y-0.5">
                            <span class="block text-[9px] font-black text-stone-400 uppercase">Estatus</span>
                            <div>
                                <span class="inline-block px-2 py-0.5 bg-stone-900 text-white text-[9px] font-black uppercase rounded-none">
                                    {persona.estatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <span class="block text-[9px] font-black text-stone-400 uppercase">Ubicación</span>
                        <p class="text-stone-900 font-bold uppercase text-[11px]">
                            Edo. {persona.estado} <span class="text-stone-300 font-mono">/</span> Mun. {persona.municipio || 'N/A'} <span class="text-stone-300 font-mono">/</span> Parroquia {persona.localidad || 'N/A'}
                        </p>
                        <div class="text-stone-700 bg-stone-50 p-2.5 border border-stone-200 font-mono text-[11px] uppercase rounded-none">
                            <span class="font-sans font-black text-[9px] text-stone-400 block">Dirección Exacta:</span>
                            "{persona.direccionExacta || 'SIN INDICACIÓN'}"
                        </div>
                    </div>

                    <div class="space-y-1">
                        <span class="block text-[9px] font-black text-stone-400 uppercase">Descripción</span>
                        <p class="bg-stone-50 p-3 border border-stone-200 text-stone-800 text-[11px] whitespace-pre-wrap uppercase leading-tight font-mono rounded-none max-h-36 overflow-y-auto">
                            {persona.caracteristicas}
                        </p>
                    </div>
                </div>

                {#if persona.estatus !== 'BIEN'}
                    <div class="pt-4 border-t border-stone-100 hidden md:block">
                        <button 
                            onclick={generarReporteImagen} 
                            type="button" 
                            disabled={procesandoImagen}
                            class="bg-blue-700 text-white px-5 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 disabled:bg-stone-400 transition rounded-none shadow-sm"
                        >
                            {procesandoImagen ? 'PROCESANDO REPORTE...' : 'DESCARGAR FICHA DE ALERTA (PNG)'}
                        </button>
                    </div>
                {/if}
            </div>

            <div class="md:col-span-5 bg-stone-50 flex flex-col justify-between p-4 space-y-3">
                <span class="block text-[9px] font-black text-stone-400 uppercase">Fotografía de Identificación</span>
                
                <div class="w-full flex-1 min-h-[260px] md:min-h-0 border border-stone-200 bg-white overflow-hidden flex items-center justify-center rounded-none relative">
                    {#if persona.img}
                        <img src={persona.img} crossorigin="anonymous" alt="Identificación del ciudadano" class="absolute inset-0 w-full h-full object-cover" />
                    {:else}
                        <div class="text-center font-mono text-stone-400 text-[10px] font-bold uppercase p-4">
                            Imagen no proporcionada
                        </div>
                    {/if}
                </div>

                {#if persona.estatus !== 'BIEN'}
                    <div class="block md:hidden pt-2">
                        <button 
                            onclick={generarReporteImagen} 
                            type="button" 
                            disabled={procesandoImagen}
                            class="w-full bg-blue-700 text-white py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 disabled:bg-stone-400 transition rounded-none text-center"
                        >
                            {procesandoImagen ? 'PROCESANDO REPORTE...' : 'DESCARGAR FICHA DE ALERTA'}
                        </button>
                    </div>
                {/if}
            </div>

        </div>
    {/if}
</dialog>

{#if persona && persona.estatus !== 'BIEN'}
    <div 
        bind:this={exportRef}
        style="background-color: #ffffff; color: #0c0a09; border: 32px solid #0c0a09; box-sizing: border-box;"
        class="absolute top-0 left-[-9999px] w-[1080px] h-[1350px] p-12 flex flex-col justify-between select-none font-sans pointer-events-none overflow-hidden"
    >
        <!-- Encabezado de Alerta -->
        <div class="w-full flex justify-between items-end pb-6" style="border-bottom: 8px solid #0c0a09;">
            <div class="space-y-1">
                <span style="letter-spacing: 0.25em; color: #78716c;" class="text-xs font-mono font-black uppercase block">RED HUMANITARIA VAMOSVZLA</span>
                <h2 style="font-size: 48px; line-height: 1; color: #0c0a09;" class="font-black tracking-tighter uppercase m-0">
                    FICHA DE ALERTA CIVIL
                </h2>
            </div>
            <div style="background-color: #dc2626; color: #ffffff;" class="px-6 py-3 font-mono text-2xl font-black uppercase tracking-widest">
                {persona.estatus}
            </div>
        </div>

        <!-- Bloque Central -->
        <div class="grid grid-cols-12 gap-10 my-8 items-stretch flex-1">
            
            <!-- Izquierda: Fotografía Hero + Nombre Gigante -->
            <div class="col-span-6 flex flex-col justify-between">
                <div style="border: 4px solid #0c0a09; background-color: #f5f5f4;" class="w-full h-[680px] relative overflow-hidden">
                    {#if persona.img}
                        <img src={persona.img} crossorigin="anonymous" alt="Imagen Afiche" class="absolute inset-0 w-full h-full object-cover" />
                    {:else}
                        <div style="color: #a8a29e;" class="w-full h-full flex items-center justify-center font-mono text-base uppercase font-black p-12 text-center">
                            SIN REGISTRO FOTOGRÁFICO EN EL EXPEDIENTE
                        </div>
                    {/if}
                </div>
                
                <div class="mt-6 space-y-1">
                    <span style="color: #78716c; letter-spacing: 0.1em;" class="text-[11px] font-mono font-black uppercase block">CIUDADANO A LOCALIZAR / IDENTIFICAR:</span>
                    <h1 style="font-size: 42px; line-height: 1.1; color: #0c0a09;" class="font-black uppercase tracking-tight">
                        {persona.nombre} <br/>{persona.apellido}
                    </h1>
                </div>
            </div>

            <!-- Derecha: Datos Estructurados -->
            <div class="col-span-6 flex flex-col justify-between space-y-6">
                
                <!-- Tabla de Datos Físicos -->
                <div class="w-full">
                    <div style="background-color: #0c0a09; color: #ffffff;" class="px-4 py-2 text-[11px] font-black uppercase tracking-wider font-mono">
                        01. ESPECIFICACIONES BIOMÉTRICAS
                    </div>
                    <table class="w-full" style="border-collapse: collapse; border-bottom: 2px solid #0c0a09;">
                        <tbody>
                            <tr style="border-bottom: 1px solid #e7e5e4;">
                                <td style="color: #78716c;" class="py-3 font-mono text-[11px] font-black uppercase w-1/3">GÉNERO:</td>
                                <td style="color: #0c0a09;" class="py-3 font-sans text-sm font-bold uppercase">{persona.genero === 'M' ? 'MASCULINO' : 'FEMENINO'}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e7e5e4;">
                                <td style="color: #78716c;" class="py-3 font-mono text-[11px] font-black uppercase">NACIMIENTO:</td>
                                <td style="color: #0c0a09;" class="py-3 font-sans text-sm font-bold uppercase font-mono">{persona.fechaNacimiento || 'NO REGISTRADO'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Bloque: Ubicación -->
                <div class="w-full">
                    <div style="background-color: #0c0a09; color: #ffffff;" class="px-4 py-2 text-[11px] font-black uppercase tracking-wider font-mono">
                        02. ÁREA GEOGRÁFICA DEL SUCESO
                    </div>
                    <div style="background-color: #f5f5f4; border: 2px solid #0c0a09; border-top: 0;" class="p-4 space-y-3">
                        <div>
                            <span style="color: #78716c;" class="text-[10px] font-mono font-black uppercase block">JURISDICCIÓN:</span>
                            <p style="color: #0c0a09;" class="text-base font-black uppercase m-0">
                                EDO. {persona.estado} / MUN. {persona.municipio || 'N/A'}
                            </p>
                            <p style="color: #44403c;" class="text-xs font-bold uppercase m-0 mt-0.5">
                                PARROQUIA: {persona.localidad || 'N/A'}
                            </p>
                        </div>
                        <div style="background-color: #ffffff; border: 1px solid #e7e5e4;" class="p-3 font-mono text-xs uppercase">
                            <span style="color: #a8a29e;" class="font-sans font-black text-[9px] block mb-1">PUNTO DE REFERENCIA DIRECTO:</span>
                            "{persona.direccionExacta || 'SIN DETALLES DE DIRECCIÓN EN EL REPORTE'}"
                        </div>
                    </div>
                </div>

                <!-- Código Verificación -->
                <div style="border: 1px solid #e7e5e4; color: #a8a29e;" class="p-4 font-mono text-[10px] uppercase flex justify-between items-center">
                    <span>REF-ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    <span>SVELTE5_PROD_OUTPUT</span>
                </div>
            </div>
        </div>

        <!-- Bloque Inferior: Detalles -->
        <div class="w-full">
            <div style="background-color: #0c0a09; color: #ffffff;" class="px-4 py-2 text-[11px] font-black uppercase tracking-wider font-mono">
                03. DETALLES Y HECHOS OPERACIONALES REGISTRADOS
            </div>
            <div style="border: 2px solid #0c0a09; border-top: 0;" class="p-6 min-h-[160px] flex items-start">
                <p style="font-size: 15px; line-height: 1.5; color: #1c1917;" class="font-mono uppercase m-0 whitespace-pre-wrap">
                    {persona.caracteristicas || 'EL EXPEDIENTE CIVIL NO CUENTA CON ANOTACIONES FÍSICAS NI DE HECHOS ADICIONALES HASTA LA FECHA DE IMPRESIÓN.'}
                </p>
            </div>
        </div>

        <!-- Pie de Ficha -->
        <div style="border-top: 4px solid #0c0a09; color: #78716c;" class="pt-4 flex justify-between items-center font-mono text-xs">
            <div class="flex items-center space-x-2">
                <span style="background-color: #0c0a09; color: #ffffff;" class="px-1.5 py-0.5 text-[9px] font-black">INFO</span>
                <span style="color: #0c0a09;" class="font-bold uppercase tracking-wider">DOCUMENTO OFICIAL PARA CANALES PÚBLICOS E IMPRENTA</span>
            </div>
            <span style="color: #0c0a09;" class="font-black">VAMOS VENEZUELA 2026</span>
        </div>
    </div>
{/if}
<script>
    let { persona, open = $bindable(false) } = $props();
    
    let dialogRef = $state(null);

    $effect(() => {
        if (!dialogRef) return;
        if (open) {
            if (!dialogRef.open) dialogRef.showModal();
        } else {
            if (dialogRef.open) dialogRef.close();
        }
    });
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
                            <span class="font-sans font-black text-[9px] text-stone-400 block">Direccion Exacta:</span>
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

                <div class="pt-4 border-t border-stone-100 text-left hidden md:block">
                    <button onclick={() => open = false} type="button" class="bg-stone-900 text-white px-5 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition rounded-none">
                        Cerrar
                    </button>
                </div>
            </div>

            <div class="md:col-span-5 bg-stone-50 flex flex-col justify-between p-4 space-y-3">
                <span class="block text-[9px] font-black text-stone-400 uppercase">Fotografía de Identificación</span>
                
                <div class="w-full flex-1 min-h-[260px] md:min-h-0 border border-stone-200 bg-white overflow-hidden flex items-center justify-center rounded-none relative">
                    {#if persona.img}
                        <img src={persona.img} alt="Identificación del ciudadano" class="absolute inset-0 w-full h-full object-cover" />
                    {:else}
                        <div class="text-center font-mono text-stone-400 text-[10px] font-bold uppercase p-4">
                            Imagen no proporcionada
                        </div>
                    {/if}
                </div>

                <div class="block md:hidden pt-2">
                    <button onclick={() => open = false} type="button" class="w-full bg-stone-900 text-white py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition rounded-none">
                        Cerrar
                    </button>
                </div>
            </div>

        </div>
    {/if}
</dialog>